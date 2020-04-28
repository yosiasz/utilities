var fs = require('fs');
var path = require('path');
// In newer Node.js versions where process is already global this isn't necessary.
var process = require("process");

var folder = "C:/jsons";

// Loop through all the files in the temp directory
(async ()=>{
    
    try {
        const files = await fs.promises.readdir( folder );

        for( const file of files ) {
            var jsonFile = path.join(folder, file);
            const stat = await fs.promises.stat( jsonFile );
            if (stat.isFile() && jsonFile.indexOf('.json')>=0) {
                console.log(jsonFile);
            } 
        }
    }
    catch( e ) {
        // Catch anything bad that happens
        console.error( "We've thrown! Whoops!", e );
    }
})();
/* 
fs.promises.readdir(folder, function (err, files) {
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

      }    
    });

  });
}); */