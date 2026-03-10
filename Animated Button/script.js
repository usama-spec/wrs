document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('ultimate-btn');
    const btnText = button.querySelector('.btn-text');

    button.addEventListener('click', () => {
        if (button.classList.contains('loading')) return;

        button.classList.add('loading');

        setTimeout(() => {
            button.classList.remove('loading');
            const originalText = btnText.textContent;
            btnText.textContent = 'Success!';
            button.style.background = '#22c55e';
            setTimeout(() => {
                btnText.textContent = originalText;
                button.style.background = '';
            }, 2000);
        }, 3000);
    });
});