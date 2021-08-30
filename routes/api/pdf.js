const express = require('express');
const router = express.Router();
const puppeteer = require('puppeteer');

router.post('/pdfCreate', async function (req, res, next) {
    let args = req.body

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(args['url'], {
        waitUntil: 'networkidle2',
    });
    await page.pdf({
        path: `./public/file/${args['fileName']}`,
        format: 'a4',
        printBackground: true,//打印背景图片
        margin: {
            top: args['top'],
            bottom: args['bottom'],
            left: args['left'],
            right: args['right']
        },
    });

    await browser.close();

    res.send({
        url: `/file/${args['fileName']}`,
    })
})


module.exports = router;
