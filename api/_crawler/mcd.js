const axios = require('axios')
const cheerio = require('cheerio')
const dayjs = require('dayjs')
const HtmlTableToJson = require('html-table-to-json')
const fs = require('fs')
const AFHConvert = require('ascii-fullwidth-halfwidth-convert')
const converter = new AFHConvert()

// 取得套餐
async function getSet () {
  const { data: html } = await axios.get('https://yoti.life/mcdonalds-menu/')
  const $ = cheerio.load(html, { ignoreWhitespace: true })
  const updatedDate = +dayjs($('header time').attr('datetime'))
  const crawledDate = +new Date()
  const sections = getSections($('h2, table'), ['查詢', '歡樂送', '得來速', '點點卡', '1+1', '甜心卡', '兒童餐', '分享盒', '單點', 'McCafé'])
   
  const content = sections.map(parseSection)
  
  return {
    updatedDate,
    crawledDate,
    content,
    source: {
      name: 'yoti.life',
      url: 'https://yoti.life/mcdonalds-menud/',
    },
    i: process.env.firebase
  }
}

// 取得各段落 (h2~table...)
function getSections (dom, exclude = []) {
  const list = []
  
  Array.from(dom).forEach((el) => {
    if (el.name === 'h2') {
      list.push({
        title: parseTitle(cheerio.load(el).text())
      })
    } else if (el.name === 'table') {
      const current = list[list.length - 1]
      
      if (cheerio.load(el)('tr').length > 1) {
        if (!current.tables) current.tables = [el]
        else current.tables.push(el)
      }
    }
  })
  
  return list
    .filter(i => i.tables)
    .filter(i => !exclude.some(keyword => i.title.includes(keyword)))
}

// 解析段落
function parseSection ({ tables, title }) {
  const hashTable = {}
  const result = []
  
  tables
    .map(table => {
      const $ = cheerio.load(table)
      const header = Array.from($('tr:first-child td')).map(i => purifyString($(i).text()))
 
      const json = JSON.stringify(HtmlTableToJson.parse($.html()).results.flat())
      const jsonWithoutLinebreak = json.replace(/\\n/g, '')
      const body = JSON.parse(jsonWithoutLinebreak)

      return { header, body }
    })
    .filter(({ body }) => body.length > 1)
    .map(({ header, body }) => {
      return body.map((i, index) => {
        // 沒有編號的主餐
        if (i.編號 === 'NEW' && !hashTable[i.主餐]) {
          hashTable[i.主餐] = `NEW${index + 1}`
        }
        
        const content = header
          .filter(name => !['編號', '主餐'].some(i => i === name))
          .reduce((o, key) => {
            o[key] = parsePriceText(i[key])
            return o
          }, {})
        
        const no = hashTable[i.主餐] ? hashTable[i.主餐] : parseSetNumber(i.編號)
        const main = i.主餐
        
        return { no, main, content }
      })
    })
    .flat()
    .forEach(i => {   // 合併同編號項目
      if (!result.some(r => i.no === r.no)) {
        result.push(i)
      } else {
        const found = result.find(r => i.no === r.no)
        found.content = { ...found.content, ...i.content }
      }
    })
    
  return { title, content: result }
}

function purifyString (text) {
  return text.replace(/\n/g, '').trim()
}

// 解析價格字串
function parsePriceText (text) {
  return +text.trim().replace(/\$/g, '')
}

// 解析 h2 標題字串
function parseTitle (text) {
  const keywords = [/價格/g, /價錢/g, /麥當勞/g, /！/g]
  keywords.forEach(keyword => text = text.replace(keyword, ''))
  return text.trim()
}

// 解析套餐號碼字串
function parseSetNumber (text) {
  return +converter.toHalfWidth(text).replace(/號/g, '')
}

module.exports.getSet = getSet