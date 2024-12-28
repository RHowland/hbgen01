const fs = require("fs");
const path = require("path");
const handlebars = require("handlebars");


//Path for the JSON data files
const dataFilePath = path.join(__dirname, "inputfiles", "datafile01.json");

//Path for the Template files.
const templateFilePath = path.join(__dirname, "templates", "template01.hbs");

// Path for the output files to be saved
const outputDir = path.join(__dirname, "outputfiles", "24-12-26");

// Output path and the file name to which the processed file must be saved 
const outputFilePath = path.join(outputDir, "template01.txt");

// Read the JSON file from the dataFilePath and parse the JSON data to JS Object
const data = JSON.parse(fs.readFileSync(dataFilePath, "utf-8"));

// Read the template file and store it in the templateContent
const templateContent = fs.readFileSync(templateFilePath, "utf-8");

// Compile the handlebars file and save the processed template into the template variable and pass the data to get the OutputContent
const template = handlebars.compile(templateContent);
const outputContent = template(data);

// If the output filepath not exist then create one
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}
// Write the output to outputFile
fs.writeFileSync(outputFilePath, outputContent, "utf-8");

console.log(`Template generated successfully: ${outputFilePath}`);