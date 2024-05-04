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
let display=document.querySelector('#display');
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
