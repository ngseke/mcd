const configKey= 'config'
 
export function save (content) {
  const json = JSON.stringify(content)
  localStorage.setItem(configKey, json)
}
 
export function load () {
  const data = localStorage.getItem(configKey)
  return data
    ? JSON.parse(data)
    : {}
}
 