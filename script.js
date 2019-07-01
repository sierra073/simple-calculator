// base calculations between 2 numbers
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

const result = document.querySelector('#result');
const nums = document.querySelectorAll(".btn-num");
const operators = document.querySelectorAll(".btn-operator");
const misc = document.querySelectorAll(".btn-top");

let firstOperand = '';
let secondOperand = '';
let currOperator = '';
let operated = false;

result.textContent = 0;
nums.forEach((num) => num.addEventListener('click', () => numButtonHandler(num.textContent)));
operators.forEach((op) => op.addEventListener('click', () => opButtonHandler(op.textContent)));
misc.forEach((m) => m.addEventListener('click', () => miscButtonHandler(m.textContent)));

const checkResize = () => {
  if (result.textContent.length >= 10) {
    result.style.fontSize = 14.5 / (result.textContent.length*.58) + 'vw';
  }
}

function displayNum(num) {
  if (result.textContent==='0' && num != '0') {
    result.textContent = Number(num);
  } else {
  	if (num.length < 10) {
  		result.textContent = Number(num);
  	} else {
  		let fixed = '' + Number(num).toFixed(3);
  		if (fixed.length < 10) {
  			result.textContent = fixed;
  		}
  	}
   checkResize()
 }
}

function numButtonHandler(num) {
  console.log(num);
  console.log(firstOperand);
  console.log(secondOperand);
  if (!operated) {
    firstOperand += num;
    displayNum(firstOperand);
  } else {
    if (!secondOperand) {
      secondOperand += num;
    }
    displayNum(secondOperand);
  }
  console.log(firstOperand);
  console.log(secondOperand);
}

function operate(op, a, b) {
    switch (op) {
    case '+':
      return add(a, b);
    case '-':
      return subtract(a, b);
    case 'x':
      return multiply(a, b);
    case '÷':
      return divide(a, b);
  }
}

function opButtonHandler(op) {
  console.log(operated);
  console.log(currOperator);
  operated = true;
  if (op != '=') {
    currOperator = op;
    if (secondOperand) {
      firstOperand = '' + operate(currOperator, Number(firstOperand), Number(secondOperand));
      secondOperand = ''
    }
  } else {
    console.log('here');
    console.log(operate(currOperator, Number(firstOperand), Number(secondOperand)));
    res = '' + operate(currOperator, Number(firstOperand), Number(secondOperand));
    displayNum(res);
    firstOperand = res;
    secondOperand = '';
    currOperator = '';
  }
}
