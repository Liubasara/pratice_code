// 搬运自代码: https://juejin.im/pin/5e4bbe77e51d454a483ab5f9

// 思路: 对 for 循环和 if else 组合的一种改进，对一些使用数字来决定状态的代码，若需要统计其中每个状态的数量时，可以使用这种方法
const [taskTodo, taskDone] = [{'task_status': 0}, {'task_status': 1}].reduce((acc, cur) => {
  // task_status === 0  taskTodo += 1
  // task_status === 1 taskDone += 1
  acc[cur['task_status']] += 1
  return acc
}, [0, 0])