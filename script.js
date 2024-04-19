let firstNum ;
let operator;
let secondNum;
let memo = [];

const add = (x,y) => x + y;
const subtract = (x,y) => x - y;
const multiply = (x,y) => x * y;
const divide = (x,y) => x / y;


function operate(operator,firstNum,secondNum){
    if (operator == '+'){
        return add(firstNum,secondNum);
    }else if (operator == '-'){
        return subtract(firstNum,secondNum);
    }else if (operator == '*'){
        return multiply(firstNum,secondNum);
    }else if (operator == '/'){
        return divide(firstNum,secondNum);
    }

}

let display=document.querySelector('#display');
const operandBtns = document.querySelectorAll('.operand');
operandBtns.forEach((number)=>{
    number.addEventListener('click',()=>{
        display.textContent = number.textContent;
        memo.unshift(display.textContent);
    })
})

const operatorBtns = document.querySelectorAll('.operator')
