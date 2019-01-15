import { isObject, isArray } from './base'

export function getArrayKey(arr, v) {
  let findKey = -1
  if (isArray(arr) || isObject(arr)) {
    for (const key in arr) {
      if (arr[key] === v) {
        findKey = key
        break
      }
    }
  }
  return findKey
}

export function unique(arr) {
  return arr.filter((v, i, a) => a.indexOf(v) === i)
}

export function filterA1has(a1, a2) {
  return a1.reduce((res, next) => {
    getArrayKey(a2, next) === -1 && res.push(next)
    return res
  }, [])
}

export function bothHas(a1, a2) {
  let all = unique([...a1, ...a2]),
    bothLose = [...filterA1has(a1, a2), ...filterA1has(a2, a1)]
  return filterA1has(all, bothLose)
}

export function bubleSort(arr) {
  const len = arr.length
  for (let i = len - 1; i > 0; i--)
    for (let j = 0; j < i; j++)
      arr[j] > arr[j + 1] && ([arr[j], arr[j + 1]] = [arr[j + 1], arr[j]])
  return arr
}

//theBest([d1, d2], Math.max, date => date.valueOf())
export function theBest(arr, compare, by = x => x) {
  if (!arr.length) return
  return arr.reduce((best, next) => {
    const pair = [by(next), next]
    if (!best) return pair
    else if (compare.apply(null, [best[0], pair[0]]) === best[0]) return best
    else return pair
  }, null)[1]
}

export function buildTree(
  arr,
  map = {
    value: 'id',
    label: 'name',
    parent: 'parentId'
  }
) {
  let tmp = {},
    tree = []
  arr.forEach(item => {
    item.value = item.value || item[map.value]
    item.label = item.label || item[map.label]
    tmp[item.value] = item
  })
  Object.keys(tmp).forEach(key => {
    let v = tmp[key]
    if (v[map.parent] != 0) {
      let arr = tmp[v[map.parent]].children || []
      arr.push(v)
      tmp[v[map.parent]].children = arr
    } else {
      tree.push(v)
    }
  })
  return tree
}
