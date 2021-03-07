const PY = require('./py.js')

/**
 * 拼音首字母排序并分类
 * @param {array} arr 名字数组
 */
export function pySegSort(arr) {
  let letters ="ABCDEFGHJKLMNOPQRSTWXYZ*".split('');
  let segs = {};
  let indexedList = []
  // 创建一个以26个为key的对象
  letters.forEach(item => {
    segs[item] = [];	
  })
  arr.forEach(item => {
    // 取姓氏并返回姓氏的拼音首字母
    let a = PY.ConvertPinyin(item).substr(0,1)
    // 在A-z之中写入对应字母的对象数组中，否则传入*对象数组里
    let reg = new RegExp(/[A-z]/)
    reg.test(a) ? segs[a.toLocaleUpperCase()].push(item) :segs['*'].push(item)
    
  })
  // 循环segs对象，转换为indexList组件需要的格式
  for (const [key, value] of Object.entries(segs)) {
    value.length && indexedList.push({letter: key, data: value})
}
  indexedList.forEach(item => {
    if(item.data.length > 1) {
    // 这里是给相同拼音首字母进行排序
      item.data = item.data.sort((a,b) => {return a.localeCompare(b)})
    }
  })
  return indexedList;
}

/**
 * 获取当前时间
 */
export const formatDate = () => {
  let date = new Date()
  var y = date.getFullYear()
  var m = date.getMonth() + 1
  m = m < 10 ? '0' + m : m
  var d = date.getDate()
  d = d < 10 ? ('0' + d) : d
  return y + '-' + m + '-' + d
}