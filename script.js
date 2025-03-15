document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    let currentInput = '';
    let operator = '';
    let firstOperand = null;
    let isNewOperation = true;

    document.querySelectorAll('.buttons button').forEach(button => {
        button.addEventListener('click', () => {
            const value = button.textContent;

            if (!isNaN(value) || value === '.') { // Numbers and dot
                if (isNewOperation) {
                    currentInput = value;
                    isNewOperation = false;
                } else {
                    if (value === '.' && currentInput.includes('.')) return;
                    currentInput += value;
                }
                display.value = currentInput;
            } 
            else if (['+', '-', '×', '/'].includes(value)) { // Operators
                if (currentInput !== '') {
                    if (operator && !isNewOperation) {
                        calculate();
                    }
                    firstOperand = parseFloat(currentInput);
                    operator = value;
                    currentInput = '';
                    display.value = `${firstOperand} ${operator}`;
                }
            } 
            else if (value === '=') { // Equals
                if (currentInput !== '' && operator && firstOperand !== null) {
                    calculate();
                }
            } 
            else if (value === 'C') { // Clear
                currentInput = '';
                operator = '';
                firstOperand = null;
                isNewOperation = true;
                display.value = '0';
            }
        });
    });

    function calculate() {
        const secondOperand = parseFloat(currentInput);
        let result = 0;
        switch (operator) {
            case '+': result = firstOperand + secondOperand; break;
            case '-': result = firstOperand - secondOperand; break;
            case '×': result = firstOperand * secondOperand; break;
            case '/': 
                if (secondOperand === 0) {
                    display.value = 'Error';
                    reset();
                    return;
                }
                result = firstOperand / secondOperand;
                break;
        }
        currentInput = Number.isInteger(result) ? result.toString() : result.toFixed(2);
        operator = '';
        firstOperand = null;
        isNewOperation = true;
        display.value = currentInput;
    }

    function reset() {
        currentInput = '';
        operator = '';
        firstOperand = null;
        isNewOperation = true;
    }
});