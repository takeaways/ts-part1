import add from './002_utile.js';
let timeoutPromise = new Promise((res, rej) => {
    setTimeout(() => {
        res("1 sec");
    }, 1000);
});
timeoutPromise.then(console.log);
const value = add(10, 20);
console.log(value);
//# sourceMappingURL=001_hello.js.map