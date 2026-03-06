document.addEventListener('DOMContentLoaded', () => {
    const numberInput = document.getElementById('number');
    const customBaseInput = document.getElementById('custom-base');
    const baseBtns = document.querySelectorAll('.base-btn');
    const calculateBtn = document.getElementById('calculate');
    const resultContainer = document.getElementById('result-container');
    const resultValue = document.getElementById('result-value');
    let currentBase = '10';
    baseBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            baseBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentBase = btn.dataset.base;
            if (currentBase === 'custom') {
                customBaseInput.style.display = 'block';
                customBaseInput.focus();
            } else {
                customBaseInput.style.display = 'none';
            }
            resultContainer.classList.remove('show');
        });
    });
    const calculateAntilog = () => {
        const x = parseFloat(numberInput.value);
        let b;
        if (currentBase === '10') {
            b = 10;
        } else if (currentBase === 'e') {
            b = Math.E;
        } else {
            b = parseFloat(customBaseInput.value);
        }
        if (isNaN(x) || isNaN(b)) {
            showError('Please enter valid numbers');
            return;
        }
        if (b <= 0 || b === 1) {
            showError('Base must be > 0 and ≠ 1');
            return;
        }
        const result = Math.pow(b, x);
        let formattedResult;
        if (result > 1e12 || (result < 1e-6 && result !== 0)) {
            formattedResult = result.toExponential(4);
        } else {
            formattedResult = Number(result.toFixed(6)).toString();
        }
        displayResult(formattedResult);
    };
    const displayResult = (val) => {
        resultValue.textContent = val;
        resultContainer.classList.add('show');
        calculateBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            calculateBtn.style.transform = 'translateY(-3px)';
        }, 100);
    };
    const showError = (msg) => {
        resultValue.textContent = 'Error';
        resultValue.style.color = '#ff4b2b';
        resultContainer.classList.add('show');
        resultContainer.animate([
            { transform: 'translateX(-10px)' },
            { transform: 'translateX(10px)' },
            { transform: 'translateX(-10px)' },
            { transform: 'translateX(0)' }
        ], { duration: 300 });
        setTimeout(() => {
            resultValue.style.color = 'var(--accent)';
        }, 2000);
    };
    calculateBtn.addEventListener('click', calculateAntilog);
    [numberInput, customBaseInput].forEach(el => {
        el.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') calculateAntilog();
        });
    });
});