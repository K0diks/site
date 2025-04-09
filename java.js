document.addEventListener('DOMContentLoaded', () => {
            // Загружаем сохраненные данные из localStorage
            let count = parseInt(localStorage.getItem('clickCount')) || 0; // Количество кликов
            let click1 = parseInt(localStorage.getItem('clickValue')) || 1; // Значение клика
            let priceclick1 = parseInt(localStorage.getItem('clickPrice')) || 50; // Цена обновления

            const counterDisplay = document.getElementById('text-of-click1');
            const clickButton = document.getElementById('button-of-click1');
            const updateButton = document.getElementById('button-of-update1');
            const updateDisplay = document.getElementById('display-of-update1');

            updateDisplays();

            clickButton.addEventListener('click', () => {
                count += click1;
                updateDisplays();
                saveData(); 
            });

            updateButton.addEventListener('click', () => {
                if (count >= priceclick1) {
                    click1++;
                    count -= priceclick1;
                    priceclick1 += 50; 
                    alert("Теперь +" + click1);
                    updateDisplays();
                    saveData(); 
                } else {
                    alert("Недостаточно монет");
                }
            });

            function updateDisplays() {
                counterDisplay.textContent = `${count} ${getClickText(count)}`;
                updateDisplay.textContent = "Цена " + priceclick1 + " кликов";
            }

            function getClickText(count) {
                if (count % 10 === 1 && count % 100 !== 11) {
                    return 'клик';
                } else if ((count % 10 >= 2 && count % 10 <= 4) && (count % 100 < 12 || count % 100 > 14)) {
                    return 'клика';
                } else {
                    return 'кликов';
                }
            }

            function saveData() {
                localStorage.setItem('clickCount', count);
                localStorage.setItem('clickValue', click1);
                localStorage.setItem('clickPrice', priceclick1);
            }
        });
