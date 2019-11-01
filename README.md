# 타입스크립트의 개요

1. 오픈소스 프로그래밍 언어
1. 자바스크립트의 상위 집합으로 ECMA스크립트의 최신 표준을 지원
1. 정적인 언어로 컴파일 시간에 타입을 검사
1. 장점
    -   강력한 타입으로 대규모 애플리케이션 개발에 용이
    -   유명한 자바스크립트 라이브러리와의 편리한 사용
    -   개발 도구에서 강력한 지원

### 타입스크립트 시작하기
1. npm install -g typescript [컴파일러 설치]
2. tsc index.ts -----> index.js [tsc 명령어를 통해 컴파일러 실행 시킬 수 있다.]
3. tsc index.ts --target es6
4. tsc 001_hello.ts --module commonjs --target es6

### 타입스크립트 컴파일 옵션 파일 만들기
1. 자바스크립트로 설정될 때 어떻게 될지 설정 할 수 있습니다.
<pre>
<code>
tsconfig.json
{
    "include":[
        컴파일할 파일들...
    ],
    "exclude:[
        컴파일 제외할 파일들...
    ],
    "compilerOptions":{
        컴파일 옵션들...
        "module":모듈시스템,
        "rootDir":
        "outDir":"컴파일 파일들의 위치",
        "target":컴파일 버전,
        "sourceMap": true,
        "removeComments": true, 주석제거
        "noImplicitAny": true, 어떤 형태의 타입이든 올 수 있다를 방지!! 타입을 무조건
    }
}
</code>
</pre>

### 타입스크립트의 기본 타입 001
1. 타입을 고정하기 위한 타입 어노테이션 
2. [let / const] score : number (숫자형만 넣을 수 있다)
<pre>
<code>
var v1 = 1; // var 키워드는 함수 단위의 스코프를 가진다
let v2 = 1;
const v3 = 3;

function outer(){
    var score = 1;
    function inner(){
        console.log(score) // undefined
        var score = 0 ;
        console.log(score) // 0
    }
    inner();
    console.log(score); // 1;
}

outer();


function outer1(){
    if(true){
        var score = 0;
    }

    //var 키워드는 함수 단위의 스코프를 가지기 때문에 var i 선언 호이스팅 발생 i ==> 3이 된다 
    for(var i = 0 ; i < 3 ; i++){
        setTimeout(()=>{
            console.log(i);
        },i*1000)
    }

    console.log(score); //0
}

outer1(); // 3
</code>
</pre>

### 타입스크립트의 기본 타입002
-   타입 어노테이션 let 변수명 : number ...
1. number
2. string
3. boolean
4. undefined
5. null
6. object
7. symbol
    -   Symbol(); 유니크한 값이 생성된다
8. any
9. list 만들기 : string[] / any[]
10. 인라인 타입
    -   let user1 : {name:string, score:number};
    -   user1 = {name:'hong', score:13}

11. 튜플
    -   let tuple: [number, string];

### 인터페이스
1. interface라는 키워드를 통해서 정의 한다.
2. interface가 가져야 하는 행위 / 속성만을 기술 할 수 있다.
3. interface 속성을 필수가 아닌 값으로 표현하고 싶을때는 ?: 로 사용
<pre>
<code>
    interface TV{
        turnOn():boolean;
        turnOff():void;
    }

    const myTv: TV = {
        turnOn(){
            return true;
        },
        turnOff(){

        }
    }

    function tryTurnOn(tv:TV){
        tv.turnOn();
    }
    tryTurnOn(myTv);

//데이터 타입만
    interface Cell{
        row: number;
        col: number;
        piece?: Piece;
    }

    interface Piece{
        move(from: Cell, to: Cell): boolean;
    }

    function createBoard(){
        const cells: Cell[] = [];
        for(let row = 0 ; row < 4 ; row++){
            for(let col = 0 ; col < 3 ; col++ ){
                cells.push({ row, col })
            }
        }
        return cells;
    }

    const board = createBoard();
    board[0].piece = {
        move(from: Cell, to: Cell){
            return true;
        }
    }

</code>
</pre>

### 함수형 타입
1. 반환 되는 타입을 작성 할 수 있다.
2. 함수의 오버로딩 =
<pre>
<code>
    function add(x: number, y: number):number{
        return x + y;
    }
    const result = add(1, 2);

    function buildUserInfo(name?: string, email?: string){
        return {name, email};
    }
    const user = buildUserInfo();

    function buildUserInfo(name = "-", email = "-"){
        return {name, email};
    }
    const user = buildUserInfo();

    const add2 = (a: number, b: number): number => a  + b;

// 오버로드 ( 함수의 시그니처 )
    interface Storage{a: string;}
    interface ColdStorage{b: string;}
    function store(type: "통조림"): Storage
    function store(type: "아이스크림"): ColdStorage

    function store(type: "통조림" | "아이스크립"){
        if(type === "통조림")
            return { a: "통조림"}
        else if(type === "아이스크림")
            return { b: "아이스크립"}
        else
            throw new Error('unsupported type');
    }

    const s = store("통조림");
    s.a

</code>
</pre>

### enum 타입
1. 열거형
2. 순서가 중요하다
<pre>
<code>
enum StarbuksGrade {
    WELCOME = 0,
    DD = 3,
    GREEN = 1,
    GOLD = 2
}

function getDiscount(v: StarbucksGrad): number{
    switch(v){
        case StarbucksGrad.WELCOME:
            return 0;
        case StarbucksGrad.GREEN:
            return 5;
        case StarbucksGrad.GOLD:
            return 10;
    }
}

console.log(getDiscount(StarbucksGrade.GREEN))
</code>
</pre>


### 클래스 001
<pre>
<code>
    class Cart{
        constructor(user){
            this.user = user;
            this.store = {};
        }

        put(id, product){
            this.store[id] = product;
        }

        get(id){
            return this.store[id]
        }
    }

    const cart1 = new Cart({name:'honh'});

// typescript

    interface User{
        name: string
    }
    interface Product{
        id: string;
        price: number;
    }

    class Cart{
        //protected user: User;
        private store: object;

        constructor(protected user: User){
            //this.user = user;
            this.store = {};
        }

        put(id: string, product: Product){
            this.store[id] = product;
        }

        get(id: string){
            return this.store[id]
        }
    }

    const cart1 = new Cart({name:'honh'});
    
    class PromotionCart extends Card {
        addPromotion(){
            this.user // protect 접근 가능
        }
    }

    const cart2 = new PromotionCard({name:'hong'});

</code>
</pre>


### 클래스 002
1. interface 를 통한 클래스 만들기.
2. absctract 키워드를 이용한 클래스.
<pre>
<code>
    interface Person{
        name: string;
        say(message: string): void;
    }

    interface Programmer{
        writeCode(requirement: string): string;
    }

    class KoreanProgrammer implements Person, Progrmmer{
        constructor(public name: string){

        }

        say(message: string = "hi") : void{
            console.log(message)
        }

        writeCode(requirement: string): string{
            return requirement + '.....';
        }

    }

    const hong = new KoreamProgrammer('hong');
    hong.say("Hello"); // Hello
    hong.writeCode("make somthing special"); // make somthing special .....
    hong.loveKimchi(); // love ~ kimchi


//abstract (추상 클래스)상속받는 클래스에서는 무조건 해당 키워드가 있는 부분을 구현 해야 한다
    abstact class Korean implements Person {

        public absctract jumin: number;

        constructor(public name: string){}
        say(msg: string): void{
            console.log(msg)
        }

        absctract loveKimchi(): void;
    }

    class KoreanProgrammer extends Korean implements Programmer{
        constructor(public name: string, public jumin: number){
            super(name);
        }

        say(message: string = "hi") : void{
            console.log(message)
        }

        writeCode(requirement: string): string{
            return requirement + '.....';
        }

        loveKimchi(){
            console.log('love ~ kimchi');
        }
    }



</code>
</pre>
