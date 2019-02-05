const { config } = require('./config')
const puppeteer = require('puppeteer')

async function start () {
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--disable-notifications']
  })

  const page = await browser.newPage()

  await page.goto(config.facebook.baseUrl)

  await page.type('#email', config.facebook.username)
  await page.type('#pass', config.facebook.password)

  await page.click('#loginbutton')

  await page.waitFor(3000)

  let postsUrl = []

  for (let groupUrl of config.facebook.groups) {
    await page.goto(groupUrl)

    await page.waitFor(3000)

    const links = await page.evaluate(_ => {
      return Array.from(document.querySelectorAll('.userContentWrapper abbr')).map(item => item.parentElement.href)
    })

    postsUrl = [...postsUrl, ...links]
  }

  for (let postUrl of postsUrl) {
    await page.goto(postUrl)
    await page.waitFor(2000)

    await page.click('[contenteditable]')

    await page.keyboard.type(config.facebook.commentText, { delay: 100 })
    await page.keyboard.press('Enter')

    await page.waitFor(2000)
  }

  await browser.close()
}

start()
