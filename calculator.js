class Calculator {
    constructor() {
        this.currentExpression = '';
        this.currentResult = '0';
        this.history = JSON.parse(localStorage.getItem('calcHistory')) || [];
        this.justCalculated = false;
        this.init();
    }

    inputNumber(num) {
        // 如果刚计算完，清空结果
        if (this.justCalculated) {
            this.currentResult = '0';
            this.justCalculated = false;
        }
        
        if (this.currentResult === '0' && num !== '.') {
            this.currentResult = num;
        } else {
            this.currentResult += num;
        }
        this.updateDisplay();
        if (typeof soundManager !== 'undefined' && soundManager) {
            soundManager.speakNumber(num);
        }
    }

    inputOperator(op) {
        // 如果刚计算完，清空表达式，但保留结果作为下一次计算的起点
        if (this.justCalculated) {
            this.currentExpression = '';
            this.justCalculated = false;
        }
        
        this.currentExpression += this.currentResult + op;
        this.currentResult = '0';
        this.updateDisplay();
        if (typeof soundManager !== 'undefined' && soundManager) {
            soundManager.speakOperator(op);
        }
    }

    calculate() {
        try {
            const expression = this.currentExpression + this.currentResult;
            if (expression.includes('/0')) {
                this.currentResult = '不能除以零';
                this.updateDisplay();
                this.justCalculated = true;
                return;
            }
            const result = eval(expression);
            this.saveHistory(expression, result);
            this.currentExpression = '';
            this.currentResult = result.toString();
            this.updateDisplay();
            this.justCalculated = true;
            if (typeof soundManager !== 'undefined' && soundManager) {
                // 播报"等于"+结果，例如："等于8"
                soundManager.speakNumber('等于' + result.toString());
            }
        } catch (error) {
            this.currentResult = '错误';
            this.updateDisplay();
            this.justCalculated = true;
        }
    }

    clear() {
        this.currentExpression = '';
        this.currentResult = '0';
        this.justCalculated = false;
        this.updateDisplay();
    }

    delete() {
        if (this.currentResult.length > 1) {
            this.currentResult = this.currentResult.slice(0, -1);
        } else {
            this.currentResult = '0';
        }
        this.updateDisplay();
    }

    saveHistory(expression, result) {
        const record = {
            expression: expression,
            result: result,
            date: new Date().toLocaleString()
        };
        this.history.unshift(record);
        if (this.history.length > 10) {
            this.history = this.history.slice(0, 10);
        }
        localStorage.setItem('calcHistory', JSON.stringify(this.history));
        this.updateHistoryDisplay();
    }

    updateDisplay() {
        const expressionElement = document.getElementById('calcExpression');
        const resultElement = document.getElementById('calcResult');
        if (expressionElement) {
            expressionElement.textContent = this.currentExpression;
        }
        if (resultElement) {
            resultElement.textContent = this.currentResult;
        }
    }

    updateHistoryDisplay() {
        const historyList = document.getElementById('calcHistoryList');
        if (!historyList) return;
        historyList.innerHTML = '';
        this.history.forEach(record => {
            const item = document.createElement('div');
            item.className = 'history-item';
            item.innerHTML = `
                <strong>${record.expression}</strong> = ${record.result}
                <small>(${record.date})</small>
            `;
            historyList.appendChild(item);
        });
    }

    init() {
        this.updateDisplay();
        this.updateHistoryDisplay();
        this.bindEvents();
    }

    bindEvents() {
        document.querySelectorAll('.calc-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const number = btn.dataset.number;
                const operator = btn.dataset.operator;
                const action = btn.dataset.action;
                if (number) {
                    this.inputNumber(number);
                } else if (operator) {
                    this.inputOperator(operator);
                } else if (action === 'calculate') {
                    this.calculate();
                } else if (action === 'clear') {
                    this.clear();
                } else if (action === 'delete') {
                    this.delete();
                }
            });
            btn.addEventListener('touchstart', (e) => {
                e.preventDefault();
                btn.click();
            });
        });
    }
}

let calculator;

function initCalculator() {
    calculator = new Calculator();
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initCalculator, 100);
});