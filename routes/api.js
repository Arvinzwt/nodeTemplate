const express = require('express');
const router = express.Router();
const {jsPDF} = require("jspdf"); // will automatically load the node version
const puppeteer = require('puppeteer');

// (process.argv.slice(2),{number: ["deviceScaleFactor"], boolean: ["displayHeaderFooter"], string: ["url", "fileName", "headerTemplate","footerTemplate","top","bottom","left","right","devices"]});

// /* GET users listing. */
// router.get('/', function (req, res, next) {
//     res.send('respond with a resource');
// });
//
// router.post('/pdfCreate', function (req, res, next) {
//     const doc = new jsPDF();
//     doc.text("Hello world!", 10, 10);
//     doc.save("./public/file/a4.pdf"); // will save the file in the current working directory
//
//     res.send({
//         url: '/file/a4.pdf'
//     });
// })

router.post('/pdfCreate', async function (req, res, next) {
    let args = req.body

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(args['url'], {
        waitUntil: 'networkidle2',
    });

    await page.pdf({path: './public/file/hn.pdf', format: 'a4'});

    await browser.close();

    res.send({
        url: '/file/hn.pdf'
    })
})


module.exports = router;
