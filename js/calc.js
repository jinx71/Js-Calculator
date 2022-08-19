// Variable Declaration
const display = document.getElementById('display');
const activeOperator = document.getElementById('activeOperator');
const keys = document.getElementsByTagName('button');

// Calculator Object
const calcObj = {
    numberOne: 0,
    numberTwo: 0,
    operator: '',
    displayString: '',
    result: '',
}
// Display Clear Function
function displayClear() {
    display.innerText = '0.0';
    activeOperator.innerText = '';
    return;
}
// Decimal Point Check
function isDecimal(pressedKey) {
    if (pressedKey === '.') {
        return true;
    }
    return false;
}
// Equal Sign Check
function isEqual(pressedKey) {
    if (pressedKey === '=') {
        console.log('is equal')
        return true;
    }
    console.log('not equal')
    return false
}
// Percentage sign check
function isPercent(pressedKey) {
    if (pressedKey === '%') {
        return true;
    }
    return false;
}
// Add, Sub, Mul, Div Sign Check
function isOperator(pressedKey) {
    if (isNaN(pressedKey) && pressedKey !== '.' && pressedKey !== '=') {
        return true;
    }
    return false;
}
// Number Button Check
function isNumber(pressedKey) {
    if (!isNaN(pressedKey)) {
        return true;
    }
    return false;
}


// Main calculator Function. Here all the calculations are done and returend.
function calculate(numberOne, numberTwo, operator) {
    if (operator === '+') {
        return (numberOne + numberTwo);
    }
    else if (operator === '-') {
        return (numberOne - numberTwo);
    }
    else if (operator === '⨉') {
        if (calcObj.parcent) {
            return (numberOne * (numberTwo / 100));
        }
        return (numberOne * numberTwo);
    }
    else if (operator === '÷') {
        return (numberOne / numberTwo);
    }
    else if (operator === '%') {
        return (numberOne * (numberTwo / 100));
    }
}
// display update and calculator object updater function. Here all the logics are built and all other functions are getting called.
function updateDisplay(pressedKey) {
    if (isOperator(pressedKey) && pressedKey !== '%') {
        console.log(pressedKey === '+/-');
        if (pressedKey === '+/-') {
            calcObj.numberOne = -Math.abs(parseFloat(calcObj.displayString));
            calcObj.displayString = '-' + calcObj.displayString;
            display.innerText = calcObj.displayString;
            activeOperator.innerText = calcObj.operator;
        }
        else {
            calcObj.numberOne = parseFloat(calcObj.displayString);
            display.innerText = '';
            calcObj.displayString = '';
            activeOperator.innerText = calcObj.operator;
            if (pressedKey === 'C') {
                calcObj.operator = '';
            }
            calcObj.operator = pressedKey;
            activeOperator.innerText = calcObj.operator;
        }
    }
    else if (isNumber(pressedKey)) {
        if (calcObj.displayString === '') {
            display.innerText = '';
            calcObj.displayString += pressedKey;
            display.innerText += pressedKey;
        }
        else if (calcObj.displayString === '0.0') {
            display.innerText = '';
            calcObj.displayString = '';
            calcObj.displayString = pressedKey;
            display.innerText += pressedKey;
        }
        else {
            calcObj.displayString += pressedKey;
            display.innerText += pressedKey;
        }

    }
    else if (isDecimal(pressedKey)) {
        calcObj.displayString += pressedKey;
        display.innerText += pressedKey;
    }
    else if (isEqual(pressedKey)) {
        calcObj.numberTwo = parseFloat(calcObj.displayString);
        calcObj.result = calculate(calcObj.numberOne, calcObj.numberTwo, calcObj.operator);
        // calcObj.result = calcObj.result;
        if (JSON.stringify(calcObj.result).length <= 7) {
            display.innerText = calcObj.result;
            calcObj.operator = pressedKey;
            activeOperator.innerText = calcObj.operator;
            calcObj.displayString = '';
        }
        else {
            display.innerText = 'Out of Limit';
        }

    }
    else if (isPercent(pressedKey)) {
        calcObj.numberTwo = parseFloat(calcObj.displayString);
        calcObj.operator = pressedKey;
        activeOperator.innerText = calcObj.operator;
        calcObj.result = calculate(calcObj.numberOne, calcObj.numberTwo, calcObj.operator);
        display.innerText = calcObj.result;
        calcObj.displayString = '';
    }
    else {
        displayClear();
    }

}
// Clear button event listener.
clear.addEventListener('click', function () {
    displayClear();
    calcObj.displayString = '';
    calcObj.operator = '';
    calcObj.numberOne = 0;
    calcObj.numberTwo = 0;
    calcObj.result = 0;
});
// Button click for of loop eventlistener.
for (key of keys) {
    key.addEventListener('click', function (event) {
        if (calcObj.displayString.length <= 7) {
            let pressedKey = event.target.innerText;
            updateDisplay(pressedKey);
            // console.log(calcObj)
        }
        else {
            display.innerText = 'Out of Limit';
        }
    })
}