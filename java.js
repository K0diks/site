    document.addEventListener('DOMContentLoaded', () => {
        let count = 0;

        const counterDisplay = document.getElementById('text-of-click1');
        const clickButton = document.getElementById('button-of-click1');

        clickButton.addEventListener('click', () => {
            count++;
            counterDisplay.textContent = count + " клики";
        });
    });
