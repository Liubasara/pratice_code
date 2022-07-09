
/**
 * 题目描述
 * 已知一个二维数组 nums ,存储着上下级的关系。其中第一个元素代表员工 employee,第二个元素代表老板 manager。当 manage 为 -1 时，代表没有上级了。最后通过 Json 的格式，输出上下级的关系。
*
 * 输入：nums = [[1,5],[2,6],[5,6],[6,-1],[4,-1]]
*
 * 输出：[
  {
    id: 4
  },
  {
    id: 6,
    subs: [
      {
        id: 2
      },
      {
        id: 5,
        subs: [
          {
            id: 1
          }
        ]
      }
    ]
  }
]
 */

/**
 * @typedef {Array<{ id: number, subs?: GetRelationReturn }>} GetRelationReturn
 * @typedef {(nums: Array<[number, number]>, boss: number) => GetRelationReturn} GetRelation
 * @type {GetRelation}
 */
function getRelation(nums, boss = -1) {
  const numsLen = nums.length
  function dfs(curBoss) {
    const res = []
    for (let i = 0; i < numsLen; i++) {
      const numI = nums[i]
      const [theEmployee, theBoss] = numI
      if (theBoss === curBoss) {
        let curr = dfs(theEmployee)
        res.push(...curr)
      }
    }
    if (res.length === 0) {
      return [{ id: curBoss }]
    } else {
      return [{ id: curBoss, subs: res }]
    }
  }
  return dfs(boss)
}

console.log(JSON.stringify(getRelation([[1, 5], [2, 6], [5, 6], [6, -1], [4, -1]]), null, '  '))
