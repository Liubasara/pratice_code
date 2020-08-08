// 该脚本用于每次选择 500 个网盘文件
/** 
  eg.
    var exam = new TrashBaiduPan()
    exam.selectElementByNum(exam.limit)
    // 此时自动选择了500个内容，点击进行存储
    exam.selectElementByNum(exam.limit)
    exam.cancleElemntByNum(exam.limit)
    // 此时选择了下一500个内容，点击进行存储，循环直至选择完所有文件
*/
class TrashBaiduPan {
  constructor ({limit = 500} = {}) {
    this.allElemCanSelect = document.querySelectorAll(`dd[class='g-clearfix AuPKyz open-enable']`).length
    this.limit = limit
    this.lastIndex = 0
  }
  // 对未选择的第一个进行选择
  selectFirstElem () {
    document.querySelectorAll(`dd[class='g-clearfix AuPKyz open-enable']`)[0].querySelector('.EOGexf').click()
  }
  // 对已选择的第一个选项取消选择
  cancleFirstSelectedElem () {
    document.querySelectorAll('.JS-item-active')[0].querySelector('.EOGexf').click()
  }
  selectElementByNum (num) {
    for (let i = 0; i < num; i++) {
      this.selectFirstElem()
    }
    this.lastIndex += num
  }
  cancleElemntByNum (num) {
    for (let i = 0; i < num; i++) {
      this.cancleFirstSelectedElem()
    }
  }
}