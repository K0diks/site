document.addEventListener('DOMContentLoaded', () => {
    let count = parseInt(localStorage.getItem('clickCount')) || 0
    let click1 = parseInt(localStorage.getItem('clickValue')) || 1
    let priceclick1 = parseInt(localStorage.getItem('clickPrice')) || 50
    let autoclickerLevel = parseInt(localStorage.getItem('autoclickerLevel')) || 0
    let autoclickerRate = parseInt(localStorage.getItem('autoclickerRate')) || 1
    let autoclickerPrice = 1000 // Цена для покупки автокликера

    const counterDisplay = document.getElementById('text-of-click1')
    const clickButton = document.getElementById('button-of-click1')
    const updateButton = document.getElementById('button-of-update1')
    const autoUpdateButton = document.getElementById('button-of-auto-upgrade')
    const autoclickerButton = document.getElementById('button-of-autoclicker') // Кнопка покупки автокликера
    const updateDisplay = document.getElementById('display-of-update1')
    const jdunDisplay = document.getElementById('display-of-jdun1')

    updateDisplays()

    clickButton.addEventListener('click', () => {
        count += click1
        updateDisplays()
        saveData()
    })

    updateButton.addEventListener('click', () => {
        tryUpgrade()
    })

    autoUpdateButton.addEventListener('click', () => {
        let upgrades = 0
        while (count >= priceclick1) {
            upgrades++
            click1++
            count -= priceclick1
            priceclick1 += 50
        }

        if (upgrades > 0) {
            alert(`Авто-обновление завершено!\nПовышено ${upgrades} раз(а).\nТеперь +${click1}`)
        } else {
            alert("Недостаточно монет для авто-обновления")
        }

        updateDisplays()
        saveData()
    })

    // Кнопка покупки автокликера
    autoclickerButton.addEventListener('click', () => {
        if (count >= autoclickerPrice) {
            count -= autoclickerPrice
            autoclickerLevel++
            autoclickerRate *= 2 // Увеличиваем скорость автокликера
            autoclickerPrice *= 2 // Увеличиваем цену автокликера для следующей покупки
            alert(`Автокликер куплен! Уровень: ${autoclickerLevel}, скорость: ${autoclickerRate} кликов/секунду`)
            updateDisplays()
            saveData()
        } else {
            alert("Недостаточно ждунчиков для покупки автокликера")
        }
    })

    // Функция обновления данных
    function tryUpgrade() {
        if (count >= priceclick1) {
            click1++
            count -= priceclick1
            priceclick1 += 50
            alert("Теперь +" + click1)
            updateDisplays()
            saveData()
        } else {
            alert("Недостаточно монет")
        }
    }

    // Обновление отображения интерфейса
    function updateDisplays() {
        counterDisplay.textContent = `${count} ${getClickText(count)}`
        updateDisplay.textContent = "Цена " + priceclick1 + " ждунчиков"
        jdunDisplay.textContent = "Ждун: " + getJdunMood(count)
        // Отображаем информацию об автокликере
        document.getElementById('autoclicker-level').textContent = `Уровень автокликера: ${autoclickerLevel}`
        document.getElementById('autoclicker-rate').textContent = `Скорость автокликера: ${autoclickerRate} кликов/сек`
        document.getElementById('autoclicker-price').textContent = `Цена автокликера: ${autoclickerPrice} ждунчиков`
    }

    // Функция для склонения "ждунчик"
    function getClickText(count) {
        if (count % 10 === 1 && count % 100 !== 11) {
            return 'ждунчик'
        } else if ((count % 10 >= 2 && count % 10 <= 4) && (count % 100 < 12 || count % 100 > 14)) {
            return 'ждунчика'
        } else {
            return 'ждунчиков'
        }
    }

    // Функция для настроек настроения ждуна
    function getJdunMood(count) {
        if (count >= 1000000) {
            return "Ждун самый веселый на планете!"
        } else if (count >= 100000) {
            return "Ждун веселый!"
        } else if (count >= 10000) {
            return "Ждун рад!"
        } else if (count >= 1000) {
            return "Ждун немного рад!"
        } else {
            return "Ждун ждёт!"
        }
    }

    // Сохранение данных в localStorage
    function saveData() {
        localStorage.setItem('clickCount', count)
        localStorage.setItem('clickValue', click1)
        localStorage.setItem('clickPrice', priceclick1)
        localStorage.setItem('autoclickerLevel', autoclickerLevel)
        localStorage.setItem('autoclickerRate', autoclickerRate)
    }

    // Автокликер
    setInterval(() => {
        if (autoclickerLevel > 0) {
            count += autoclickerRate // увеличиваем клики по скорости автокликера
            updateDisplays()
            saveData()
        }
    }, 1000) // Автокликер будет кликать каждую секунду
})
