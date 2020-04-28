var fs = require('fs');
var path = require('path');
// In newer Node.js versions where process is already global this isn't necessary.
var process = require("process");

var folder = "C:/jsons";

fs.readdir(folder, function (err, files) {
  if (err) {
    console.error("Could not list the directory.", err);
    process.exit(1);
  }
  
  files.forEach(function (file, index) {
    var jsonFile = path.join(folder, file);
  
    fs.stat(jsonFile, function (error, stat) {
      if (error) {
        console.error("Error stating file.", error);
        return;
      }

      if (stat.isFile() && jsonFile.indexOf('.json')>=0) {
        //var json = JSON.parse(jsonFile);
        fs.readFile(jsonFile, 'utf8', (err, jsonString) => {
          if (err) {
              console.log("Error reading file from disk:", err)
              return
          }
          try {
              const customer = JSON.parse(jsonString)
              console.log("Customer address is:", customer.address) // => "Customer address is: Infinity Loop Drive"
            } catch(err) {
                console.log('Error parsing JSON string:', err)
            }
        })

        console.log( "'%s' is a json file.", jsonFile );
      }    
    });

  });
}); 