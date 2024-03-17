import { chromium } from 'playwright-chromium'
import fs from 'fs'
import delay from 'delay'

async function runBrowser() {
    const browser = await chromium.launch({
        headless: false,
        acceptDownloads: true, // permission download
        channel: 'chrome',
        launchOptions: {
            executablePath: '/usr/bin/google-chrome',
        },
    })
    return { browser}
}

const maxBtn = '//*[@id="__next"]/div[2]/div[3]/div/div[2]/div[3]/div/div[2]/div[2]/div/div[1]/div[3]/div[4]';

const market = '//*[@id="__next"]/div[2]/div[3]/div/div[2]/div[3]/div/div[2]/div[1]/div[2]/div/div';
const buyTab = '//*[@id="__next"]/div[2]/div[3]/div/div[2]/div[3]/div/div[1]/div[1]'
const buyBtn = '//*[@id="__next"]/div[2]/div[3]/div/div[2]/div[3]/div/div[2]/div[2]/div/button';

const sellTab = '//*[@id="__next"]/div[2]/div[3]/div/div[2]/div[3]/div/div[1]/div[2]';
const sellBtn = '//*[@id="__next"]/div[2]/div[3]/div/div[2]/div[3]/div/div[2]/div[2]/div/button';

(async () => {
    const yourdelay = 3000 //bisa diganti delay terserah
    while (true) {
        const { browser } = await runBrowser()
        try {
            const context = await browser.newContext();
            const cookies = fs.readFileSync('cookies.json', 'utf8')
            const deserializedCookies = JSON.parse(cookies)
            await context.addCookies(deserializedCookies)
            const page = await context.newPage();
            await page.goto(`https://backpack.exchange/trade/JUP_USDC`) // bisa di ganti url terserah
            await page.waitForSelector('//*[@id="__next"]/div[2]/div[3]/div/div[2]/div[3]/div/div[2]/div[1]/div[1]/div/div')
            await page.click(market)
            while (true){
                await delay(yourdelay)
                await page.click(maxBtn)
                await delay(yourdelay)
                await page.click(buyBtn)
                console.log('buy max')
                await delay(yourdelay)
                await page.click(sellTab)
                await delay(yourdelay)
                await page.click(maxBtn)
                await delay(yourdelay)
                await page.click(sellBtn)
                console.log('sell max')
                await delay(yourdelay)
                await page.click(buyTab)
            }
        } catch (err) {
            console.log(err)
            await browser.close()
        }
    }
})()
