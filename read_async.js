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
              fs.readFile(jsonFile, 'utf8', (err, jsonString) => {
                if (err) {
                    console.log("File read failed:", err)
                    return
                }
                console.log('File data:', jsonString) 
            })
            } 
        }
    }
    catch( e ) {
        // Catch anything bad that happens
        console.error( "We've thrown! Whoops!", e );
    }
})();