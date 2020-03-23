/**
874. 模拟行走机器人
机器人在一个无限大小的网格上行走，从点 (0, 0) 处开始出发，面向北方。该机器人可以接收以下三种类型的命令：

-2：向左转 90 度
-1：向右转 90 度
1 <= x <= 9：向前移动 x 个单位长度
在网格上有一些格子被视为障碍物。

第 i 个障碍物位于网格点  (obstacles[i][0], obstacles[i][1])

如果机器人试图走到障碍物上方，那么它将停留在障碍物的前一个网格方块上，但仍然可以继续该路线的其余部分。

返回从原点到机器人的最大欧式距离的平方。

 

示例 1：

输入: commands = [4,-1,3], obstacles = []
输出: 25
解释: 机器人将会到达 (3, 4)
示例 2：

输入: commands = [4,-1,4,-2,4], obstacles = [[2,4]]
输出: 65
解释: 机器人在左转走到 (1, 8) 之前将被困在 (1, 4) 处
*/

/**
 * @param {number[]} commands
 * @param {number[][]} obstacles
 * @return {number}
 */
 
/**
 * @param {number[]} commands
 * @param {number[][]} obstacles
 * @return {number}
 */

/**
思路：
作者：keon-2
链接：https://leetcode-cn.com/problems/walking-robot-simulation/solution/jsjie-fa-chao-98-by-keon-2/
*/
var robotSim = function(commands, obstacles) {
    let obstaclesSet = new Set();
    for (let i = 0; i < obstacles.length; i++) {
        let str = obstacles[i][0] + "," + obstacles[i][1];
        obstaclesSet.add(str);
    }
    let dx = [0, 1, 0, -1];
    let dy = [1, 0, -1, 0];
    let x = 0;
    let y = 0;    //  从原点开始出发，用x,y来记录当前位置
    let di = 0;   // 标志当前应该往哪个方向走，0表示往北，1表示往右，2表示往下，3表示往左，关键一点
    let ans = 0;
    for (let j = 0; j < commands.length; j++) {
        if (commands[j] === -2) {    // 向左转90度
            di = (di + 3) % 4;
        } else if (commands[j] === -1) {    // 向右转90度
            di = (di + 1) % 4;
        } else {
            for (let k = 0; k < commands[j]; k++) {
                let nx = x + dx[di];
                let ny = y + dy[di];
                let code = nx + "," + ny;
                if (!obstaclesSet.has(code)) {
                    x = nx;
                    y = ny;
                    ans = Math.max(ans, x*x + y*y);
                } else {
                    break;        // 遇到障碍，跳出本次命令，接着走下一步
                }
            }
        }
    }
    return ans;
};

