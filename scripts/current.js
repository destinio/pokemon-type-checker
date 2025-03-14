import * as cheerio from 'cheerio'

async function getData() {
  const response = await fetch('https://leekduck.com/boss/')
  const data = await response.text()
  return data
}

async function getBossData() {
  const data = await getData()
  const $ = cheerio.load(data)

  const sections = []
  let currentSection = null

  $('.list li').each((_, el) => {
    const item = $(el)

    if (item.hasClass('header-li')) {
      // Create new section
      currentSection = {
        tier: item.text().trim(), // Extract tier from the header
        bosses: [],
      }
      sections.push(currentSection)
    } else if (item.hasClass('boss-item') && currentSection) {
      // Extract boss details from .boss-border
      const bossBorder = item.find('.boss-border')
      const bossName = bossBorder.find('.boss-name').text().trim()
      const mainCP = bossBorder.find('.boss-2').text().replace('CP ', '').trim()
      const boostedCP = bossBorder
        .find('.boosted-cp')
        .text()
        .replace('CP ', '')
        .trim()

      // Extract weather conditions
      const weatherConditions = bossBorder
        .find('.boss-weather img')
        .map((_, el) => $(el).attr('title'))
        .get()

      // Add boss data to the section
      currentSection.bosses.push({
        name: bossName || item.text().trim(), // Fallback if no boss-border found
        mainCP,
        boostedCP,
        weather: weatherConditions,
      })
    }
  })

  return sections
}

getBossData().then(data => {
  console.log(JSON.stringify(data))
})
