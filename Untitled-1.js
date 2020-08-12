/**
 * @typedef Commit
 * @property {string} id - commit id
 * @property {Commit} parent - parent reference
 */

/**
 * @param {Commit} head
 * @param {Commit} mergeHead
 * @return {Commit}
 */
function getBestCommonAncestor(head, mergeHead) {
  // TODO
  let headList = getList(head, [])
  let mergeHeadList = getList(mergeHead, [])

  const res = {}
  const totalList= [...headList, ...mergeHeadList]
  for (let item of totalList) {
    
    if (res[item]) {
      console.log(item)
      return item
    } else {
      res[item] = 1
    }
  }

  for (let i = 0, len = headList.length; i < len; i++) {
    if (mergeHeadList.includes(headList[i])) {
      console.log(headList[i])
      return headList[i]
    }
  }
  return null
}


function getList(head, res) {
  while (head && head.id) {
    res.push(head.id)
    head = head.parent
  }
  return res
}


// test case
const A = { id: 'A', parent: [] };
const B = { id: 'B', parent: [A] };
const C = { id: 'C', parent: [B] };
const D = { id: 'D', parent: [B, A] };
const E = { id: 'E', parent: [C, B] };

getBestCommonAncestor(A, B); // A
getBestCommonAncestor(D, E); // B
