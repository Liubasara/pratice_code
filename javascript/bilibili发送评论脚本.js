/**
 * 发送脚本
 * @param {string} text 
 */
function insertExpired (text) {
  function deleteAll () {
    document.execCommand('selectAll')
    document.execCommand('delete')
  }
  const textarea = document.querySelector('textarea[name=msg]')
  const submitBtn = document.querySelector('button.comment-submit[type=submit]')
  textarea.focus()
  deleteAll()
  document.execCommand('insertText', null, text)
  submitBtn.click()
}

insertExpired('test\n\n123')