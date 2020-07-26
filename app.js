const puppeter = require('puppeteer')

// To read instagram page

async function start() {

  async function loadMore(page, selector) {
    const moreButton = await page.$(selector)
    if (moreButton) {
      console.log("More");
      await moreButton.click()
      await page.waitFor(selector, { timeout: 3000 }).catch(() => { console.log("timeout") })
      await loadMore(page, selector)
  }
}
// To read insta comments

async function getComments(page, selector) {
  const comments = await page.$$eval(selector, links => links.map(link => link.innerText))
  return comments
}

  const browser = await puppeter.launch()
  const page = await browser.newPage()
  await page.goto('https://www.instagram.com/p/CDAIpkGpEoL/')

  await loadMore(page, '.dCJp8');
  const arrobas = await getComments(page, '.C4VMK span a')
  const counted = count(arrobas)
  const sorted = sort(counted)
  sorted.forEach(arroba=> { console.log(arroba) })

  await browser.close()
}

// To count repeated at sing

function count(arrobas) {
  const count = {}
  arrobas.forEach(arroba => { count[arroba] = (count[arroba] || 0) + 1 })
  return count
}

// to order

function sort(counted) {
  const entries = Object.entries(counted)
  const sorted = entries.sort((a,b) => b[1] - a[1])
  console.log(sorted);  
}

start()
