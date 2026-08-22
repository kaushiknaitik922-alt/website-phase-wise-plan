import { chromium } from 'playwright'

const [,, url, out, width = '1366', height = '900', full = 'true'] = process.argv
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--no-proxy-server'] })
const page = await browser.newPage({ viewport: { width: Number(width), height: Number(height) } })
const errors = []
page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()) })
page.on('pageerror', (err) => errors.push(String(err)))
await page.goto(url, { waitUntil: 'load', timeout: 30000 })
await page.waitForTimeout(700)
await page.screenshot({ path: out, fullPage: full === 'true' })
await browser.close()
if (errors.length) console.log('CONSOLE ERRORS:\n' + errors.join('\n'))
else console.log('no console errors')
