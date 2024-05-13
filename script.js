let firstNum ;
let operator;
let secondNum;
let memoOperator = [];

const add = (x,y) => Number(x) + Number(y);
const subtract = (x,y) => Number(x) - Number(y);
const multiply = (x,y) => Number(x) * Number(y);
const divide = (x,y) => Number(x) / Number(y);
const percent = (x,y) => (Number(y)/100)*Number(x);


function operate(operator,firstNum,secondNum){
    if (operator == '+'){
        return add(firstNum,secondNum);
    }else if (operator == '-'){
        return subtract(firstNum,secondNum);
    }else if (operator == '*'){
        return multiply(firstNum,secondNum);
    }else if (operator == '/'){
        return divide(firstNum,secondNum);
    }else if (operator == '%'){
        return percent(firstNum,secondNum);
    }
};

let counter=0;
const display=document.querySelector('#display');
display.textContent = '0';
const operandBtns = document.querySelectorAll('.operand');
operandBtns.forEach((number)=>{ //this method displays the numbers on the calculator display
    number.addEventListener('click',()=>{

        if ((counter>0)&&(!(secondNum === undefined))){
            display.textContent += number.textContent;
            secondNum = display.textContent;
        }
        if ((counter>0)&&(secondNum === undefined)&&(!(display.textContent == '0.'))){
            display.textContent = number.textContent;
            secondNum = number.textContent;
        }
        if ((counter === 0) && (!(display.textContent === '0'))){
            display.textContent += number.textContent;
            firstNum = display.textContent;
        }
        if ((display.textContent === '0')&&(counter === 0)){
            display.textContent = number.textContent;
            firstNum = display.textContent;
        }
    })
});

const operatorBtns = document.querySelectorAll('.operator');
operatorBtns.forEach((operator)=>{
    operator.addEventListener('click',()=>{
        if(!(firstNum===undefined)){
            counter++;
            memoOperator[counter-1] = operator.textContent;
                if ((counter>=2)&&!(secondNum===undefined)){
                    let result= operate(memoOperator[counter-2],firstNum,secondNum);
                    firstNum= result;
                    display.textContent = firstNum;
                    secondNum = undefined;
                }
        }
    })
});

const equal = document.querySelector('#equal');
equal.addEventListener('click',()=>{
    if ((counter>0)&&(!(secondNum === undefined))){
        let lastOperator = memoOperator[memoOperator.length - 1];
        let equalResult = operate(lastOperator,firstNum,secondNum);
        firstNum = equalResult;
        display.textContent = firstNum;
        secondNum = undefined;
    }
});

const clearBtn = document.querySelector('#clear');
clearBtn.addEventListener('click',()=>{
    firstNum = undefined;
    secondNum = undefined;
    memoOperator = [];
    counter = 0;
    display.textContent = '0';
});

const signBtn = document.querySelector('#sign');
signBtn.addEventListener('click',()=>{
    if (!(firstNum === undefined)&&(secondNum === undefined)){
       display.textContent = Number(display.textContent) * -1;
       firstNum = firstNum * -1;
    }
    if (!(firstNum === undefined)&&!(secondNum === undefined)){
        display.textContent = Number(display.textContent) * -1;
        secondNum = secondNum * -1;
     }
});

const decimalBtn = document.querySelector('#decimal');
decimalBtn.addEventListener('click',()=>{
    if (display.textContent == 0){
        display.textContent += decimalBtn.textContent;
    }
    if ((counter === 0)&&(Number.isInteger(+firstNum))){
        display.textContent += decimalBtn.textContent;
    }
    if ((counter>0)&&(Number.isInteger(+secondNum))){
        display.textContent += decimalBtn.textContent;
    }
    if ((counter>0)&&(secondNum === undefined)){
        display.textContent = '0'+decimalBtn.textContent;
        secondNum = display.textContent
    }
})

// theme change feature

const toggle = document.querySelector('#toggle')
const mainContainer= document.querySelector('#main-container');
const calContainer = document.querySelector('#calculator-container');
const header = document.querySelector('#title-theme-container')
const title = document.querySelector('#title');
const theme = document.querySelector('#theme');
//display is already declared 
const btnContainer = document.querySelector('#btn-container');
const btns = document.querySelectorAll('.sign, .operator, .operand, .decimal');

toggle.addEventListener('change',(event)=>{
    if (event.target.checked) {
       mainContainer.style.backgroundColor = 'hsl(0, 0%, 90%)';
       calContainer.style.backgroundColor = 'hsl(0, 0%, 90%)';
       header.style.backgroundColor = 'hsl(0, 0%, 90%)';
       title.style.color = 'hsl(60, 10%, 19%)';
       theme.style.color = 'hsl(60, 10%, 19%)';
       display.style.backgroundColor = 'hsl(0, 0%, 93%)';
       display.style.color = 'hsl(221, 14%, 31%)';
       btnContainer.style.backgroundColor = 'hsl(0, 5%, 81%)';
       btns.forEach((btn)=>{
        btn.style.backgroundColor = 'hsl(45, 7%, 89%)';
        btn.style.color = 'hsl(60, 10%, 19%)';
       })
    }else{
       mainContainer.style.backgroundColor = 'hsl(222, 26%, 31%)';
       calContainer.style.backgroundColor = 'hsl(222, 26%, 31%)';
       header.style.backgroundColor = 'hsl(222, 26%, 31%)';
       title.style.color = 'hsl(180,0%,100%)';
       theme.style.color = 'hsl(180,0%,100%)';
       display.style.backgroundColor = 'hsl(223, 31%, 20%)';
       display.style.color = 'hsl(180,0%,100%)';
       btnContainer.style.backgroundColor = 'hsl(223, 31%, 20%)';
       btns.forEach((btn)=>{
        btn.style.backgroundColor = 'hsl(30, 25%, 89%)';
        btn.style.color = 'hsl(221, 14%, 31%)';
       })
    }
})


