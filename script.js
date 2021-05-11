class Calculator {
    constructor(prevOperandTextEl, currOperandTextEl) {
        this.prevOperandTextEl = prevOperandTextEl;
        this.currOperandTextEl = currOperandTextEl;
        this.clear();
    }

    clear() {
        this.prevOperand = '';
        this.currOperand = '';
        this.operation = undefined;
    }

    delete() {
        this.currOperand = this.currOperand.toString().slice(0, -1);
    }

    chooseOperation(operation) {
        if (this.currOperand == '') return;
        if (!this.prevOperand == '') {
            this.compute();
        }

        this.operation = operation;
        this.prevOperand = this.currOperand + operation;
        this.currOperand = '';
    }

    compute() {
        let computation;
        let prev = parseFloat(this.prevOperand);
        let curr = parseFloat(this.currOperand);

        if (isNaN(prev) || isNaN(curr)) return;

        switch (this.operation) {
            case '+':
                computation = prev + curr;
                break;
            case '-':
                computation = prev - curr;
                break;
            case '*':
                computation = prev * curr;
                break;
            case '/':
                computation = prev / curr;
                break;
            default:
                return;
        }
        this.currOperand = Math.round(computation * 100000000) / 100000000;
        this.operation = undefined;
        this.prevOperand = '';
    }

    appendNumber(number) {
        if (number === '.' && this.currOperand.includes('.')) return;
        if (number === '.' && this.currOperand == '') {
            this.currOperand = '0' + number.toString();
            return;
        }
        this.currOperand = this.currOperand.toString() + number.toString();
    }

    getDisplayNumber(number) {
        let stringNumber = number.toString();
        let integerDigits = parseFloat(stringNumber.split('.')[0]);
        let decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;

        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('ru', { maximumFractionDigits: 0 })
        }

        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        this.currOperandTextEl.innerText = this.getDisplayNumber(this.currOperand);
        this.prevOperandTextEl.innerText = this.getDisplayNumber(this.prevOperand);
    }
}

const numberBtns = document.querySelectorAll('[data-numbers]');
const operators = document.querySelectorAll('[data-operations]');
const allClearBtn = document.querySelector('[data-all-clear]');
const deleteBtn = document.querySelector('[data-delete]');
const equalsBtn = document.querySelector('[data-equals]');
const prevOperandTextEl = document.querySelector('[data-previous-operand]');
const currOperandTextEl = document.querySelector('[data-current-operand]');

let calculator = new Calculator(prevOperandTextEl, currOperandTextEl);

numberBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        calculator.appendNumber(btn.innerText);
        calculator.updateDisplay();
    })
})

operators.forEach(btn => {
    btn.addEventListener('click', () => {
        calculator.chooseOperation(btn.innerText);
        calculator.updateDisplay();
    })
})

allClearBtn.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
})

equalsBtn.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
})

deleteBtn.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
})