function add(a, b) {
    return a + b;
}

function substract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(a, b, operator) {
    let result;
    switch (operator) {
        case '+':
            result = add(a, b);
            break;
        case '-':
            result = substract(a, b);
            break;
        case '*':
            result = multiply(a, b);
            break;
        case '/':
            result = divide(a, b);
            break;
    }
    return result;
}

let leftNumber = '';
let rightNumber = '';
let operator;

const buttons = Array.from(document.querySelectorAll('button'));
const display = document.querySelector('.display');

buttons.forEach(button => {
    button.addEventListener('click', handleClick);
})

function handleClick(e) {
    const value = e.target.textContent;
    if (value === 'CE') {
        clearCalculator();
    } else if (['+', '-', '*', '/'].includes(value)) {
        handleOperator(value);
    } else if (value === '=') {
        calculate();
    } else {
        handleNumber(value);
    }
}

function clearCalculator() {
    leftNumber = '';
    rightNumber = '';
    display.textContent = 0;
}

function handleOperator(value) {
    if (rightNumber) {
        leftNumber = (operate(+leftNumber, +rightNumber, operator));
        rightNumber = '';
        display.textContent = leftNumber;
    }
    operator = value;
}

function calculate() {
    leftNumber = (operate(+leftNumber, +rightNumber, operator));
    rightNumber = '';
    display.textContent = leftNumber;
}

function handleNumber(value) {
    if (operator) {
        rightNumber += value;
        display.textContent = rightNumber;
    } else {
        leftNumber += value;
        display.textContent = leftNumber;
    }
}
