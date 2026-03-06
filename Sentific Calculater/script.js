const display = document.getElementById('display');
const historyDisplay = document.getElementById('history');

let currentInput = document.getElementById('display-input').value;
let currentExpression = '';
let shouldResetDisplay = false;

function pushSymbol(symbol) {
    if (currentInput === '0' || shouldResetDisplay) {
        if (symbol === '.') {
            currentInput += '0.';
        } else if (symbol === 'π') {
            currentInput += Math.PI.toString();
        } else if (symbol === 'e') {
            currentInput += Math.E.toString();
        } else if (symbol === 'EXP') {
            currentInput += '0*10^';
        } else {
            currentInput += symbol;
        }
        shouldResetDisplay = false;
    } else {
        console.log("there");
        if (symbol === 'π') {
            currentInput += Math.PI;
        } else if (symbol === 'e') {
            currentInput += Math.E;
        } else if (symbol === 'EXP') {
            currentInput += '*10^';
        } else {
            currentInput += symbol;
        }
    }
    updateDisplay();
}

function pushFunction(func) {
    if (currentInput === '0' || shouldResetDisplay) {
        currentInput += func;
        shouldResetDisplay = false;
    } else {
        currentInput += func;
    }
    updateDisplay();
}

function clearDisplay() {
    currentInput = '0';
    currentExpression = '';
    historyDisplay.innerText = '';
    updateDisplay();
}

function backspace() {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = '0';
    }
    updateDisplay();
}

function updateDisplay() {
    // Limit display length or font size if too long
    if (currentInput.length > 15) {
        display.style.fontSize = '1.5rem';
    } else {
        display.style.fontSize = '2.2rem';
    }

    display.innerText = currentInput;
    document.getElementById('display-input').value = currentInput;
}

function calculate() {
    try {
        let expression = currentInput;

        // Save to history before transformation
        historyDisplay.innerText = expression + ' =';

        // Transform expression for JS eval or Math operations
        // Replace visual symbols with math equivalents
        let processedExpression = expression
            .replace(/×/g, '*')
            .replace(/÷/g, '/')
            .replace(/−/g, '-')
            .replace(/\^/g, '**')
            .replace(/sin\(/g, 'Math.sin(')
            .replace(/cos\(/g, 'Math.cos(')
            .replace(/tan\(/g, 'Math.tan(')
            .replace(/log\(/g, 'Math.log10(')
            .replace(/ln\(/g, 'Math.log(')
            .replace(/sqrt\(/g, 'Math.sqrt(');

        // Note: sin/cos/tan expect radians. 
        // We could add a toggle for Degree/Radian, but let's stick to Radians for now as per standard Math lib.
        // If we wanted degrees: Math.sin(x * Math.PI / 180)

        // Using Function constructor as a safer alternative to eval for simple math
        const result = new Function('return ' + processedExpression)();

        if (isNaN(result) || !isFinite(result)) {
            currentInput = 'Error';
        } else {
            // Format result to avoid very long decimals
            currentInput = Number(result.toFixed(8)).toString();
        }

    } catch (error) {
        currentInput = 'Error';
        console.error(error);
    }

    updateDisplay();
    shouldResetDisplay = true;
}

// Keyboard Support
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') pushSymbol(e.key);
    if (e.key === '.') pushSymbol('.');
    if (e.key === '+') pushSymbol('+');
    if (e.key === '-') pushSymbol('−');
    if (e.key === '*') pushSymbol('×');
    if (e.key === '/') pushSymbol('÷');
    if (e.key === '(') pushSymbol('(');
    if (e.key === ')') pushSymbol(')');
    if (e.key === 'Enter' || e.key === '=') calculate();
    if (e.key === 'Escape') clearDisplay();
    if (e.key === 'Backspace') backspace();
});