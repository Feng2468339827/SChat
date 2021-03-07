function *a() {
  yield setTimeout(() => {
    console.log('delay')
  }, 1000);
  console.log(123)
}
let b = a()
console.log(b)
console.log(b.next())