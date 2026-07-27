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

let a = '';
let b = '';
let operator = '';

const buttons = Array.from(document.querySelectorAll('button'));
const display = document.querySelector('.display');

buttons.forEach(button => {
    button.value = button.textContent;
    button.addEventListener('click', (e) => {
        const value = e.target.value;
        const isOperator = value === '+' || value === '-' || value === '/' ||
            value === '*';
        if (a && isOperator) {
            operator = value;
            if (a && b) {
                a = (operate(+a, +b, operator));
                b = '';
                display.textContent = a;
            }
        }
        if (!operator && !isOperator) {
            a += value;
            display.textContent = a;
        }
        if (operator && !isOperator && value !== '=') {
            b += value;
            display.textContent = b;
        }
        if (value === '=' && a && b && operator) {
            a = (operate(+a, +b, operator));
            b = '';
            display.textContent = a;
        }
    })
})