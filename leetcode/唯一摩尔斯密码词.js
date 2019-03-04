/**
 * @param {string[]} words
 * @return {number}
 */
var uniqueMorseRepresentations = function(words) {
    const mo = { a: ".-", b: "-...", c: "-.-.", d: "-..", e: ".", f: "..-.", g: "--.", h: "....", i: "..", j: ".---", k: "-.-", l: ".-..", m: "--", n: "-.", o: "---", p: ".--.", q: "--.-", r: ".-.", s: "...", t: "-", u: "..-", v: "...-", w: ".--", x: "-..-", y: "-.--", z: "--.." };
    const resultMap = {};
    for(let j=0; j < words.length; j++ ) {
        let moItem = '';
        for(let i= 0; i< words[j].length; i++) {
            moItem += mo[words[j][i]]
        }
        resultMap[moItem] = 1;
    }
    return Object.keys(resultMap).length
}
