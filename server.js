const http = require("http");

const fs = require("fs");


const csvToJson = (csv) => {
    csv=csv.replace(/\r/g,'');
    const [headerLine, ...products] = csv.trim().split('\n');
    const headers = headerLine.split(',');
    return products.map(product => {
        const values = product.split(',');
        const obj = {};
        headers.forEach((header, i) => {
            obj[header] = values[i];
        });
        return obj;
    });
};

fs.readFile('./ProductsV2.csv', 'utf-8', (err, data) => {
    if (err) {
        console.log("Error reading CSV file", err);
        return;
    }
    const jsonData = csvToJson(data);
    http.createServer((req, res) => {
        if (req.url === '/') {
            res.writeHead(200, { 'Content-type': 'application/json' });
            res.end(JSON.stringify(jsonData, null, 2));
        }
        else {
            res.writeHead(404, { 'Content-type': 'text/plain' });
            res.end("Not found");
        }
    }).listen(8000);
})
