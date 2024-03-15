const fs = require('fs')

fs.readFile("./test-data/allplayers.json", function(err, data) {

    if (err) throw err;

    const dd = JSON.parse(data);
    console.log(Array.isArray(dd['players']));
});