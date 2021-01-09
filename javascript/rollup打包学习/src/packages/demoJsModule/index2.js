export default demoModule2 = async () => {
  await Promise.resolve('demo2')
  console.log('Hi.I am a demo module2.', Object.assign({}, { a: 1}))
}
