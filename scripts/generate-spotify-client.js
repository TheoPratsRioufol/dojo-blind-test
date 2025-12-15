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
  const generatedType = getGeneratedType(typeSchema);

  return `export type ${typeName} = ${generatedType};`;
}

function getGeneratedType(typeSchema) {
  const schemaType = typeSchema.type;

  // TO DO: Generate typescript code from schema
  switch (schemaType) {
    case "number":
      return "number"
    case "integer":
      return "number"
    case "string":
      return "string"
    case "boolean":
      return "boolean"
    case "array":
    case "object":
      if (Object.hasOwn(typeSchema, "properties")) {
        let out = "{\n"
        let requiredF = ""
        for (const propType of Object.keys(typeSchema.properties)) {
          // Test if field if required
          requiredF = (typeSchema.required != undefined) && typeSchema.required.includes(propType) ? "" : "?"
          out += `  ${propType}${requiredF}: ${getGeneratedType(typeSchema.properties[propType])},\n`
        }
        out += "}"
        return out
      }
      return "object"
    default:
      return "";
  }
}

generateSpotifyClient();