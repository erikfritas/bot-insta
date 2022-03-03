const chromium = require('chrome-aws-lambda')
const puppeteer = require('puppeteer-core')

exports.handler = async (event, context) => {

    const browser = await puppeteer.launch({
        args: chromium.args,
        executablePath: process.env.CHROME_EXECUTABLE_PATH || await chromium.executablePath,
        headless: true
    })

    const page = await browser.newPage()

    await page.goto('https://instagram.com/', {
        waitUntil: 'networkidle2'
    })

    const title = await page.title()

    await browser.close()

    return {
        statusCode: 200,
        body: JSON.stringify({
            status: 'Ok',
            page: {
                title
            }
        })
    }
}
