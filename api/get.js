const mcd = require('./_crawler/mcd')
const db = require('./_db')
const dayjs = require('dayjs')

module.exports = async (req, res) => {
  const latest = await db.getLatest()
  
  // 若無爬蟲記錄
  if (!latest) {
    return res.status(200).send(await runCrawlerAndWrite())
  }
  
  const { timestamp, json } = latest
  
  if (!getIsExpired(timestamp) && latest) {
    return res.status(200).send(JSON.parse(json))  // 自資料庫取最近一筆
  } else {
    try {
      return res.status(200).send(await runCrawlerAndWrite())
    } catch (err) {
      db.caughtError(err)
      return res.status(200).send(JSON.parse(json))
    }
  }
}

async function runCrawlerAndWrite () {
  const data = await mcd.getSet()  // 執行爬蟲
  db.write(data)  // 寫入資料庫
  return data
}

function getIsExpired (timestamp) {
  const ttl = 12  // unit: hrs
  return dayjs().diff(dayjs(timestamp),'h') > ttl
}