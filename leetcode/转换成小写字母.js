/**
 * @param {string} str
 * @return {string}
 */
var toLowerCase = function(str) {
  // return str.toLowerCase()
  let result = ''
    const len = str.length
    for(let i=0;i<len;i++){
        let ascll = str.charCodeAt(i)
        if(ascll>=65 && ascll<= 90){
            result += String.fromCharCode(ascll+32)
        }else{
            result += String.fromCharCode(ascll)
        }								
    }
    return result
}