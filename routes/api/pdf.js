const express = require('express');
const router = express.Router();
const {jsPDF} = require("jspdf"); // will automatically load the node version
const puppeteer = require('puppeteer');

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
