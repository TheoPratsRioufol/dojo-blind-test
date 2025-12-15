import { mkdir, writeFile } from "fs/promises";

import openapi from "../openapi.json" assert { type: 'json' };

const targetDirectory = "src/lib/spotify/model";

async function generateSpotifyClient() {
  console.log("\nLaunched generate-spotify-client script");
  console.log('Generating Spotify client from OpenApi spec file...\n')
  await mkdir(targetDirectory, { recursive: true }); // Generate target directory

  const schemas = openapi.components.schemas;
  const typesToGenerate = Object.keys(schemas);

  for (const typeName of typesToGenerate) {
    const typeSchema = schemas[typeName];
    generateType(typeName, typeSchema);
  }
}

function generateType(typeName, typeSchema) {  
  console.log(`Generating type ${typeName}...`);

  const generatedCode = getGeneratedCode(typeName, typeSchema);

  writeFile(`${targetDirectory}/${typeName}.ts`, generatedCode);
}

function getGeneratedCode(typeName, typeSchema) {
  const [generatedType, localTypeToImports] = getGeneratedType(typeSchema);
  let header = localTypeToImports != null ? Array.from(localTypeToImports).map((key) => `import { ${key} } from "./${key}";`).join('\n')+"\n\n" : ""
  return `${header}export type ${typeName} = ${generatedType};`;
}


function getGeneratedType(typeSchema) {
  const schemaType = typeSchema.type;
  let localTypeToImports = new Set();

  if (typeSchema.$ref != undefined) {
    // Handle Reference
    let ptype = typeSchema["$ref"].split("/").at(-1)
    localTypeToImports.add(ptype)
    return [`${ptype}`, localTypeToImports]
  }

  if (typeSchema.oneOf != undefined) {
    // Handle oneOff type
    //console.log("ONE OFF", typeSchema.oneOf)
    let oflist = new Array()
      for (const oneOfType of typeSchema.oneOf) {
        const [ptype2, tti] = getGeneratedType(oneOfType)
        oflist.push(ptype2)
        localTypeToImports = new Set([...localTypeToImports, ...tti]) // merge the import
      }
    return ["("+oflist.join(" | ")+")", localTypeToImports]
  }

  if (typeSchema.allOf != undefined) {
    let alllist = new Array()
    for (const allOfType of typeSchema.allOf) {
      const [ptype2, tti] = getGeneratedType(allOfType)
      localTypeToImports = new Set([...localTypeToImports, ...tti]) // merge the import
      alllist.push(ptype2)
    }
    return [alllist.join(" & "), localTypeToImports]
  }


  // TO DO: Generate typescript code from schema
  switch (schemaType) {
    case "number":
      return ["number", localTypeToImports]

    case "integer":
      return ["number", localTypeToImports]

    case "string":
      if (typeSchema.enum != undefined) {
        return [Array.from(typeSchema.enum).map((key) => `"${key}"`).join(' | '), localTypeToImports]
      }
      return ["string", localTypeToImports]

    case "boolean":
      return ["boolean", localTypeToImports]

    case "array":
      const [ptype, tti] = getGeneratedType(typeSchema.items)
      localTypeToImports = new Set([...localTypeToImports, ...tti]) // merge the import
      return [`${ptype}[]`, localTypeToImports]

    case "object":
      if (Object.hasOwn(typeSchema, "properties")) {
        let out = "{\n"
        let requiredF = ""
        for (const propType of Object.keys(typeSchema.properties)) {
          // Test if the field is required
          requiredF = (typeSchema.required != undefined) && typeSchema.required.includes(propType) ? "" : "?"
          //console.log(propType,"-->",typeSchema.properties[propType])
          const [ptype, tti] = getGeneratedType(typeSchema.properties[propType])
          localTypeToImports = new Set([...localTypeToImports, ...tti]) // merge the import
          out += `  ${propType}${requiredF}: ${ptype},\n`
        }
        out += "}"
        return [out, localTypeToImports]
      }

      return ["object", localTypeToImports]

    default:
      return ["", localTypeToImports]
  }
}

generateSpotifyClient();