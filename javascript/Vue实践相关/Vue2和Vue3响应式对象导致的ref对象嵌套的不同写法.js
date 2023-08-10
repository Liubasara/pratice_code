import { ref, set } from 'vue-demi'

const props = ref({ propsA: null })
const propsA = ref({ a: 1 })

// Vue3 start
// props.value.propsA = propsA
// console.log(props.value.propsA.a) // 1
// Vue3 end

// Vue2 start
set(props.value, 'propsA', propsA)
console.log(props.value.propsA.a) // 1
// Vue2 end
