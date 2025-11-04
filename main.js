const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');

let currentInput = '';
let previousInput = '';
let operator = null;

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if (value === 'C') {
      clearAll();
      return;
    }

    if (value === '=') {
      calculate();
      return;
    }

    if (['+', '-', '×', '÷'].includes(value)) {
      handleOperator(value);
      return;
    }

    if (value === '.') {
      if (!currentInput.includes('.')) {
        currentInput += value;
      }
    } else {
      currentInput += value;
    }

    updateDisplay(currentInput);
  });
});

function updateDisplay(value) {
  display.textContent = value || '0';
}

function handleOperator(op) {
  if (currentInput === '' && previousInput === '') return;
  if (previousInput && currentInput) calculate();

  operator = op;
  previousInput = currentInput;
  currentInput = '';
}

function calculate() {
  if (!operator || !currentInput || !previousInput) return;

  const num1 = parseFloat(previousInput);
  const num2 = parseFloat(currentInput);
  let result;

  switch (operator) {
    case '+': result = num1 + num2; break;
    case '-': result = num1 - num2; break;
    case '×': result = num1 * num2; break;
    case '÷': result = num2 === 0 ? 'Помилка' : num1 / num2; break;
  }

  updateDisplay(result);
  previousInput = result.toString();
  currentInput = '';
  operator = null;
}

function clearAll() {
  currentInput = '';
  previousInput = '';
  operator = null;
  updateDisplay('0');
}

updateDisplay('0');