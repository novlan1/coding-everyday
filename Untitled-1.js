// /**
//  * @typedef Commit
//  * @property {string} id - commit id
//  * @property {Commit} parent - parent reference
//  */

// /**
//  * @param {Commit} head
//  * @param {Commit} mergeHead
//  * @return {Commit}
//  */
// function getBestCommonAncestor(head, mergeHead) {
//   // TODO
//   let headList = getList(head, [])
//   let mergeHeadList = getList(mergeHead, [])

//   const res = {}
//   const totalList= [...headList, ...mergeHeadList]
//   for (let item of totalList) {
    
//     if (res[item]) {
//       console.log(item)
//       return item
//     } else {
//       res[item] = 1
//     }
//   }

//   for (let i = 0, len = headList.length; i < len; i++) {
//     if (mergeHeadList.includes(headList[i])) {
//       console.log(headList[i])
//       return headList[i]
//     }
//   }
//   return null
// }


// function getList(head, res) {
//   while (head && head.id) {
//     res.push(head.id)
//     head = head.parent
//   }
//   return res
// }


// // test case
// const A = { id: 'A', parent: [] };
// const B = { id: 'B', parent: [A] };
// const C = { id: 'C', parent: [B] };
// const D = { id: 'D', parent: [B, A] };
// const E = { id: 'E', parent: [C, B] };

// getBestCommonAncestor(A, B); // A
// getBestCommonAncestor(D, E); // B


function solution(n) {
  let cols = []
  for (let i = 0; i < n ;i ++) {
    cols.push(0)
  }
  let dia1 = []
  let dia2 = []

  for (let i = 0; i < 2 * n - 1; i++) {
    dia1.push(0)
    dia2.push(0)
  }
  queens = new Set()
  let res = []
  backtrack()

  function couldPlace(row, col) {
    return !(cols[col] + dia1[row - col] + dia2[row + col])
  }
  function placeQueen(row, col) {
    queens.add(`${row}-${col}`)
    cols[col] = 1
    dia1[row - col] = 1
    dia2[row + col] = 1
  }

  function removeQueen(row, col) {
    queens.delete(`${row}-${col}`)
    cols[col] = 0
    dia1[row - col] = 0
    dia2[row + col] = 0
  }

  function addSolution() {
    let solution = []
    let _list = Array.from(queens).map(item => {
      return item.split('-')
    })
    _list.sort((a, b) => {
      return a[0] - b[0]
    })
    for (let item of _list) {
      let temp = []
      for (let i = 0; i < n; i ++) {
        temp.push('.')
      }
      temp[+item[1]] = 'Q'
      solution.push(temp.join(''))
    }
    res.push(solution)
  }

  function backtrack(row = 0) {
    for (let col = 0; col < n; col++) {
      if (couldPlace(row, col)) {
        placeQueen(row, col)
        if (row + 1 === n) {
          addSolution()
        } else {
          backtrack(row + 1)
        }
        removeQueen(row, col)
      }
    }
  }

  return res
}

const res = solution(4)
console.log(res)