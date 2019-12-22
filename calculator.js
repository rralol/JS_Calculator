let memory = '';
let opCode = null;
let firstNumber = null;
let displayString = '0';
let commaPressed = false;
let lastPressedWasFunction = false;
let negativeNumber = false;


const add = (a, b) => a+b;
const sub = (a, b) => a-b;
const mul = (a, b) => a*b;
const div = (a, b) => (b == 0) ? "DIV ERROR" : a/b;

const operate = (op, a, b) => {
    let opCode = op.charCodeAt();
    if (opCode == 43) return add(a, b);
    else if (opCode == 42) return mul(a, b);
    else if (opCode == 45) return sub(a, b);
    else if (opCode == 47) return div(a, b);
};

const updateDisplay = () => {
    display.textContent = displayString;
    savedDisplay.textContent = memory;
};

const clearCalculator = () => {
    displayString = '0';
    memory = '';
    firstNumber = null;
    opCode = null;
    commaPressed = false;
    negativeNumber = false;
    updateDisplay();
};

const equal = () => {
    if(firstNumber && opCode) {
        memory = '';
        displayString = String(operate(opCode, Number(firstNumber), Number(displayString)));
        firstNumber = null;
        updateDisplay();
    }
};

const removeLastFromDisplay = () => {
    if(displayString.charCodeAt(displayString.length-1) == 46) commaPressed = false;
    displayString = displayString.slice(0, -1);
    if(displayString.length == 0) displayString = '0';
    else if (displayString.charCodeAt(displayString.length-1) == 45) {
        displayString = '0';
        negativeNumber = false;
    }
    updateDisplay();
};

const setNegative = () => {
    if(!negativeNumber) {
        displayString = '-' + displayString;
        negativeNumber = true;
    }
    else {
        displayString = displayString.slice(1);
        negativeNumber= false;
    }
    updateDisplay();
};

const writeComma = () => {
    if (!commaPressed && displayString.length > 0) {
        displayString+= '.';
        commaPressed = true;
    }
    updateDisplay();
};

const writeNumber = (e) => {
    lastPressedWasFunction = false;
    if(displayString.length == 1 && displayString[displayString.length-1] == '0' && e.target.id == 0) ;
    else if (displayString.length == 1 && displayString[displayString.length-1] == '0') displayString = e.target.id;
    else if (displayString == '-0') {
        displayString = displayString.slice(0,-1);
        displayString += e.target.id;
    }
    else displayString += e.target.id;
    updateDisplay();
};

const writeFunction = (e) => {
    if (lastPressedWasFunction) {
        memory = memory.slice(0, -1);
        opCode = e.target.id;
        memory += e.target.id;
    }
    else {
        if (!firstNumber) {
            firstNumber = displayString;
            opCode = e.target.id;
            memory += displayString + e.target.id;
        }
        else {
            memory = operate(opCode, Number(firstNumber), Number(displayString));
            if (memory != "DIV ERROR") {
                firstNumber = memory;
                opCode = e.target.id;
                memory += e.target.id;
            }
        }
    }
    lastPressedWasFunction = true;
    negativeNumber = false;
    commaPressed = false;
    displayString = '0';  
    updateDisplay();
};

const numberButtons = document.querySelectorAll('.numberbutton');
numberButtons.forEach(number => number.addEventListener('click', writeNumber));

const functionButtons = document.querySelectorAll('.functionbutton');
functionButtons.forEach(button => button.addEventListener('click', writeFunction));

const savedDisplay = document.querySelector('#memory');
savedDisplay.textContent = memory;

const display = document.querySelector('#maindisplay');

display.textContent = displayString;