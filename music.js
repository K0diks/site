document.addEventListener('DOMContentLoaded', () => {
    const music = document.getElementById('background-music')
    const toggleButton = document.getElementById('music-toggle')
    const changeButton = document.getElementById('music-change')
    const trackNameDisplay = document.getElementById('track-name')

    const tracks = [
        { name: 'Out Of Time Man', file: 'music.mp3' },
        { name: 'Just waiting', file: 'music2.mp3' },
        { name: 'Relax of track', file: 'music3.mp3' }
    ]

    let currentTrack = parseInt(localStorage.getItem('currentTrack')) || 0
    let isPlaying = localStorage.getItem('musicPlaying') === 'true'

    function setTrack(index) {
        music.src = tracks[index].file
        trackNameDisplay.textContent = `🎵 Трек: ${tracks[index].name}`
        localStorage.setItem('currentTrack', index)
    }

    setTrack(currentTrack)
    music.volume = 1

    function playMusic() {
        music.play()
        toggleButton.textContent = 'Выключить музыку'
        isPlaying = true
        localStorage.setItem('musicPlaying', 'true')
    }

    function pauseWithFade() {
        const fadeInterval = setInterval(() => {
            if (music.volume > 0.05) {
                music.volume -= 0.05
            } else {
                clearInterval(fadeInterval)
                music.volume = 1
                music.pause()
                toggleButton.textContent = 'Включить музыку'
                isPlaying = false
                localStorage.setItem('musicPlaying', 'false')
            }
        }, 100)
    }

    if (isPlaying) {
        music.play().catch(() => console.log('Автостарт заблокирован'))
        toggleButton.textContent = 'Выключить музыку'
    }

    toggleButton.addEventListener('click', () => {
        if (isPlaying) {
            pauseWithFade()
        } else {
            playMusic()
        }
    })

    changeButton.addEventListener('click', () => {
        currentTrack = (currentTrack + 1) % tracks.length
        setTrack(currentTrack)
        if (isPlaying) {
            music.play()
        }
    })
})
