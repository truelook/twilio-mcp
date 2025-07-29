#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const SPEC_DIR = path.join(__dirname, '..', 'segment-oai', 'spec');
const JSON_FILE = path.join(SPEC_DIR, 'openapi.json');
const YAML_FILE = path.join(SPEC_DIR, 'openapi.yaml');

function convertJsonToYaml() {
  try {
    // Check if JSON file exists
    if (!fs.existsSync(JSON_FILE)) {
      console.log('No openapi.json found - skipping conversion');
      return;
    }

    console.log('Converting openapi.json to openapi.yaml...');

    // Read JSON file
    const jsonContent = fs.readFileSync(JSON_FILE, 'utf8');
    const jsonObj = JSON.parse(jsonContent);

    // Convert to YAML
    const yamlContent = yaml.dump(jsonObj, { 
      lineWidth: -1,
      noRefs: true,
      skipInvalid: false
    });

    // Write YAML file
    fs.writeFileSync(YAML_FILE, yamlContent);

    console.log('✅ Successfully converted openapi.json to openapi.yaml');

    // Remove the JSON file to avoid confusion
    fs.unlinkSync(JSON_FILE);
    console.log('🗑️  Removed openapi.json (keeping only YAML version)');

  } catch (error) {
    console.error('❌ Error converting OpenAPI spec:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  convertJsonToYaml();
}

module.exports = convertJsonToYaml;