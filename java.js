document.addEventListener('DOMContentLoaded', () => {
            let count = 0;

            const counterDisplay = document.getElementById('text-of-click1');
            const clickButton = document.getElementById('button-of-click1');

            clickButton.addEventListener('click', () => {
                count = count + 100;
                counterDisplay.textContent = `${count} ${getClickText(count)}`;
            });

            function getClickText(count) {
                if (count % 10 === 1 && count % 100 !== 11) {
                    return 'клик';
                } else if ((count % 10 >= 2 && count % 10 <= 4) && (count % 100 < 12 || count % 100 > 14)) {
                    return 'клика';
                } else {
                    return 'кликов';
                }
            }
        });
