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

  // TO DO: Generate typescript code from schema
  switch (schemaType) {
    case "number":
      return ["number", localTypeToImports]

    case "integer":
      return ["number", localTypeToImports]

    case "string":
      return ["string", localTypeToImports]

    case "boolean":
      return ["boolean", localTypeToImports]

    case "array":
      return ["", localTypeToImports]

    case "object":
      if (Object.hasOwn(typeSchema, "properties")) {
        let out = "{\n"
        let requiredF = ""
        let ptype = ""
        for (const propType of Object.keys(typeSchema.properties)) {
          // Test if the field is required
          requiredF = (typeSchema.required != undefined) && typeSchema.required.includes(propType) ? "" : "?"
          // Test if the type if referenced to another
          if (typeSchema.properties[propType]["$ref"] != undefined) {
            ptype = typeSchema.properties[propType]["$ref"].split("/").at(-1)
            localTypeToImports.add(ptype)
          } else {
            let [ptype2, tti] = getGeneratedType(typeSchema.properties[propType])
            ptype = ptype2
            if (tti != undefined) {
              localTypeToImports = new Set([...localTypeToImports, ...tti]) // merge the import
            }
          }
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