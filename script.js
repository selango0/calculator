
class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear; // reset input
  }

  // clear all the different variables and delete displayed values
  clear() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
  }
  // delete a single number/operation
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }
  // When a user clicks on a number, append to display
  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return;
    this.currentOperand = this.currentOperand + number;
    //this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  // When user chooses an operation
  chooseOperation(operation) {
   if (this.currentOperand === '') return;
   if (this.previousOperand !== '') {
     this.compute();
   }
   this.operation = operation;
   this.previousOperand = this.currentOperand;
   this.currentOperand = '';
  }

  // Takes values, computes, and displays the result
  compute() {
    var computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    // check for undefined values
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
      case '+':
        computation = prev + current;
        break;
      case '-':
        computation = prev - current;
        break;
      case '*':
        computation = prev * current;
        break;
      case '÷':
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = '';
  }


  // Make numbers more definitive/formatted
  getDisplayNumber(number) {
  }

  // Update values inside of the output
  updateDisplay() {
    this.currentOperandTextElement.innerText = this.currentOperand;
  }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});


operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener('click', button => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearButton.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
});

deleteButton.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
});
