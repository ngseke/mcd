const firebase = require('firebase')

const firebaseConfig = JSON.parse(process.env.firebase)
firebase.initializeApp(firebaseConfig)

const database = firebase.database()

// 寫入本次爬蟲結果
const write = async (data) => {
  const newDateRef = database.ref('menu/').push()
  
  return newDateRef.set({
    timestamp: data.crawledDate,
    json: JSON.stringify(data),
  })
}

// 讀取最近一次的結果
const getLatest = async () => {
  const ref = database.ref('menu/')
  const snap = await ref.orderByChild('timestamp').limitToLast(1).once('value')
  const list = snap.val()
  if (!list) return null
  
  const key = Object.keys(list)[0].toString()
  
  return list[key]
}

// 記錄爬蟲失敗
const caughtError = async (e) => {
  const ref = database.ref(`log/${+new Date()}`)
  
  return ref.set({
    e: JSON.stringify(e, 0, 2),
  })
}

module.exports = {
  database,
  write,
  caughtError,
  getLatest,
}