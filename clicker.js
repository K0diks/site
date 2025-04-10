document.addEventListener('DOMContentLoaded', () => {
    let count = parseInt(localStorage.getItem('clickCount')) || 0
    let click1 = parseInt(localStorage.getItem('clickValue')) || 1
    let priceclick1 = parseInt(localStorage.getItem('clickPrice')) || 50

    const counterDisplay = document.getElementById('text-of-click1')
    const clickButton = document.getElementById('button-of-click1')
    const updateButton = document.getElementById('button-of-update1')
    const autoUpdateButton = document.getElementById('button-of-auto-upgrade')
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

    function updateDisplays() {
        counterDisplay.textContent = `${count} ${getClickText(count)}`
        updateDisplay.textContent = "Цена " + priceclick1 + " кликов"
        updateJdunMood(count)
    }

    function getClickText(count) {
        if (count % 10 === 1 && count % 100 !== 11) {
            return 'клик'
        } else if ((count % 10 >= 2 && count % 10 <= 4) && (count % 100 < 12 || count % 100 > 14)) {
            return 'клика'
        } else {
            return 'кликов'
        }
    }

    function updateJdunMood(count) {
        if (count >= 1000000) {
            jdunDisplay.textContent = "Ждун самый веселый на планете!"   
        }
        else if (count >= 100000) {
            jdunDisplay.textContent = "Ждун веселый!"
        } else if (count >= 10000) {
            jdunDisplay.textContent = "Ждун рад!"
        } else if (count >= 1000) {
            jdunDisplay.textContent = "Ждун не много рад!"
        } else {
            jdunDisplay.textContent = "Ждун ждёт!"
        }
    }



    function saveData() {
        localStorage.setItem('clickCount', count)
        localStorage.setItem('clickValue', click1)
        localStorage.setItem('clickPrice', priceclick1)
    }
})
