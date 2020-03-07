const dayjs = require('dayjs')

const menuKey= 'menu'
const ttl = 24

// 儲存資料至 localStorage
export function save (content) {
  const json = JSON.stringify({
    timestamp: +new Date(),
    content,
  })
  localStorage.setItem(menuKey, json)
}

// 讀取資料，若到期則返回 null
export function load () {
  const data = localStorage.getItem(menuKey)
  if (!data || data === 'null') return null
  
  const { timestamp, content } = JSON.parse(data)
  return getIsExpired(timestamp)
    ? null
    : content
}

function getIsExpired (timestamp) {
  return dayjs().diff(dayjs(timestamp),'h') > ttl
}