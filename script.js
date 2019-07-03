// base calculations between 2 numbers
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
const power = (a, b) => Math.pow(a, b);

const result = document.querySelector('#result');
const nums = document.querySelectorAll(".btn-num");
const operators = document.querySelectorAll(".btn-operator");
const misc = document.querySelectorAll(".btn-top");

let firstOperand = '';
let secondOperand = '';
let currOperator = '';
let operated = false;

result.textContent = '0';

nums.forEach((num) => num.addEventListener('click', () => numButtonHandler(num.textContent)));
operators.forEach((op) => op.addEventListener('click', () => opButtonHandler(op.textContent)));
misc.forEach((m) => m.addEventListener('click', () => miscButtonHandler(m.textContent)));

const checkResize = () => {
  if (result.textContent.length >= 10) {
    result.style.fontSize = 14.5 / (power(result.textContent.length,1.28)*0.35) + 'vw';
  } else {
    result.style.fontSize = '3vw';
  }
}

function displayNum(num) {
  if (result.textContent==='0' && num != '0') {
    result.textContent = Number(num);
  } else {
  	if (num.length < 10 || Number.isInteger(Number(num))) {
  		result.textContent = Number(num);
  	} else {
  		let fixed = '' + Number(num).toFixed(3);
  		result.textContent = fixed;
  	}
 }
 checkResize()
}

function numButtonHandler(num) {
  if (!operated) {
    firstOperand += num;
    displayNum(firstOperand);
  } else {
    secondOperand += num;
    displayNum(secondOperand);
  }
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
// 14 + 5 - (9 -- should be 19)
// 12 - 3 + (15 -- should be 9)
// 14 + 5 = 19 + 2 - (17 -- should be 21)
function opButtonHandler(op) {
  operated = true;
  console.log(firstOperand);
  console.log(secondOperand);
  if (op != '=') {
    currOperator = op;
    if (secondOperand) {
      firstOperand = '' + operate(currOperator, Number(firstOperand), Number(secondOperand));
      displayNum(firstOperand)
      secondOperand = ''
    }
  } else {
    if (secondOperand) {
      firstOperand = '' + operate(currOperator, Number(firstOperand), Number(secondOperand));
      displayNum(firstOperand);
      secondOperand = ''; // repetitive
    } else {
      firstOperand = result.textContent;
    }
    currOperator = '';
  }
}

function miscButtonHandler(op) {
  switch (op) {
    case 'AC': {
      displayNum('0');
      firstOperand = '';
      secondOperand = '';
      currOperator = '';
      operated = false;
      break;
    }
  }
}
