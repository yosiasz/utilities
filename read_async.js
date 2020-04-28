var fs = require('fs');
var path = require('path');
// In newer Node.js versions where process is already global this isn't necessary.
var process = require("process");

var folder = "C:/jsons";
var mergedFiles = new Array();
  

// Loop through all the files in the temp directory
(async ()=>{
        
    try {
        const files = await fs.promises.readdir( folder );

        for(  let file of files ) {
          let jsonFile = path.join(folder, file);
            
            const stat = await fs.promises.stat( jsonFile );

            //console.log(jsonFile, jsonFile.indexOf('merged.json'));
            
            if (stat.isFile() && jsonFile.indexOf('.json')>=0) {
                fs.readFile(jsonFile, 'utf8', (err, jsonString) => {
                  if (err) {
                      console.log("File read failed:", err)
                      return
                  }
                  
                  //mergedFiles.push(JSON.stringify(jsonString));
                  //mergedFiles.concat(jsonString);
                  mergedFiles.push(jsonString);
                  
              })
            } 
        } //for loop
        
        console.log('ZooomZoom', mergedFiles);
        //const customer = JSON.parse(mergedFiles) ;

        var stringJson = JSON.stringify(mergedFiles);
        
        var mergedFile = path.join(folder, 'merged.json');

        fs.writeFile(mergedFile, stringJson, err => {
          if (err) {
              console.log('Error writing file', err)
          } else {
              console.log('Successfully wrote file')
          }
      })
    }
    catch( e ) {
        // Catch anything bad that happens
        console.error( "We've thrown! Whoops!", e );
    }
})();