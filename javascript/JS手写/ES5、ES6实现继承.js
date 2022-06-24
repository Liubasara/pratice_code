/**
 * @param {Function} Child 
 * @param {Function} Parent 
 */
function extendES5(Child, Parent) {
  if (typeof Child !== 'function' || typeof Parent !== 'function') throw new Error('not a function')
  /** @type {PropertyDescriptor} constructor */
  const descriptor = {
    value: Child,
    configurable: true,
    enumerable: false,
    writable: true
  }
  Child.prototype = Object.create(Parent.prototype, {
    constructor: descriptor
  })
  return Child
}


; (() => {
  console.log('--------------ES5 extends---------------------')
  function Parent() {
    this.p = 'p'
  }
  function Child() {
    Parent.apply(this, arguments)
    this.c = 'c'
  }
  extendES5(Child, Parent)
  const child = new Child()
  console.log('p:', child.p)
  console.log('c:', child.c)
  console.log('instance of Child:', child instanceof Child)
  console.log('instance of Parent:', child instanceof Parent)
})()

/**
 * @param {Function} Child 
 * @param {Function} Parent 
 */
 function extendES6(Child, Parent) {
  if (typeof Child !== 'function' || typeof Parent !== 'function') throw new Error('not a function')
  Object.setPrototypeOf(Child.prototype, Parent.prototype)
  return Child
}

; (() => {
  console.log('--------------ES6 extends---------------------')
  function Parent() {
    this.p = 'p'
  }
  function Child() {
    Parent.apply(this, arguments)
    this.c = 'c'
  }
  extendES6(Child, Parent)
  const child = new Child()
  console.log('p:', child.p)
  console.log('c:', child.c)
  console.log('instance of Child:', child instanceof Child)
  console.log('instance of Parent:', child instanceof Parent)
})()