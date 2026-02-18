const hearts = ['💕', '💖', '💗', '💓', '💞', '❤️', '💘'];
const nicknames = ['киса', 'зая', 'любимая', 'милая', 'пуся', 'солнышко', 'сладкая', 'красивая', 'малышка', 'настюшенька'];
const phrases = [
    'я люблю тебя',
    'я очень сильно тебя люблю',
    'хочу всегда быть с тобой',
    'ты самая лучшая',
    'ты самая милая',
    'думаю о тебе всегда,',
    'я люблю очень тебя',
    'ты мое счастье',
    'ты самая красивая',
];
let isLoading = true;

const isMobile = window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const isSmallScreen = window.innerWidth <= 480;

function createParticles(x, y) {
    if (!isMobile) {
        const particleCount = isSmallScreen ? 4 : (isMobile ? 6 : 10);
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.animationDelay = (i * 0.06) + 's';
            document.body.appendChild(particle);
            
            setTimeout(() => particle.remove(), 1400);
        }
    }
}

function createSparkles(x, y) {
    if (!isMobile) {
        const sparkleSymbols = ['✨', '⭐', '💫', '✦'];
        const sparkleCount = isSmallScreen ? 2 : (isMobile ? 4 : 6);
        for (let i = 0; i < sparkleCount; i++) {
            const sparkle = document.createElement('div');
            sparkle.classList.add('sparkle');
            sparkle.textContent = sparkleSymbols[Math.floor(Math.random() * sparkleSymbols.length)];
            sparkle.style.left = (x + (Math.random() - 0.5) * 60) + 'px';
            sparkle.style.top = (y + (Math.random() - 0.5) * 60) + 'px';
            sparkle.style.animationDelay = (i * 0.08) + 's';
            document.body.appendChild(sparkle);
            
            setTimeout(() => sparkle.remove(), 1600);
        }
    }
}

function createConfetti() {
    const confettiSymbols = ['💕', '💖', '💗', '💓', '💞', '❤️', '✨', '⭐'];
    const confettiCount = isSmallScreen ? 25 : (isMobile ? 35 : 50);
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.textContent = confettiSymbols[Math.floor(Math.random() * confettiSymbols.length)];
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = '-50px';
        confetti.style.fontSize = (Math.random() * 1.5 + 0.8) + 'rem';
        confetti.style.setProperty('--tx', (Math.random() - 0.5) * 300 + 'px');
        confetti.style.animationDelay = (i * 0.05) + 's';
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 3000);
    }
}

function createGlow(x, y) {
    const glow = document.createElement('div');
    glow.classList.add('glow');
    glow.style.left = (x - 100) + 'px';
    glow.style.top = (y - 100) + 'px';
    document.body.appendChild(glow);
    
    setTimeout(() => glow.remove(), 1000);
}

function createLightBeam(x, y) {
    const beam = document.createElement('div');
    beam.classList.add('light-beam');
    beam.style.left = (x - 2) + 'px';
    beam.style.top = (y - 100) + 'px';
    beam.style.width = '4px';
    beam.style.height = '200px';
    beam.style.transformOrigin = 'top center';
    document.body.appendChild(beam);
    
    setTimeout(() => beam.remove(), 1200);
}

function updateCounter(count, startTime) {
    const counter = document.getElementById('counter');
    const now = new Date();
    const elapsed = Math.floor((now - startTime) / 1000);
    
    let timeText = '';
    if (elapsed < 60) {
        timeText = elapsed + ' сек';
    } else {
        const minutes = Math.floor(elapsed / 60);
        const seconds = elapsed % 60;
        timeText = minutes + ' мин ' + seconds + ' сек';
    }
    
    counter.textContent = '❤️ сказал это уже ' + count + ' раз | говорю это уже ' + timeText;
}

function openSurprise() {
    const hiddenContent = document.getElementById('hiddenContent');
    const closeBtn = document.getElementById('closeBtn');
    const counter = document.getElementById('counter');
    const messagesContainer = document.getElementById('messagesContainer');
    const animationContainer = document.getElementById('animationContainer');
    const kissEffect = document.getElementById('kissEffect');
    const card = document.querySelector('.card');

    // Скрываем главный экран
    if (card) {
        card.style.opacity = '0';
        card.style.visibility = 'hidden';
    }

    hiddenContent.classList.add('active');
    closeBtn.classList.add('active');

    // Анимация целования длится 3.5 секунды (2 сек ходьба + 1.5 поцелуй)
    setTimeout(() => {
        if (!hiddenContent.classList.contains('active')) return;
        
        // Confetti эффект при поцелуе!
        createConfetti();
        
        // Скрываем сцену и показываем сообщения
        animationContainer.style.display = 'none';
        messagesContainer.style.display = 'flex';
        
        // Показываем счетчик
        counter.classList.add('active');
        const startTime = new Date();
        let messageCount = 0;

        // Взрыв эффектов в центре
        createParticles(window.innerWidth / 2, window.innerHeight / 2);
        createSparkles(window.innerWidth / 2, window.innerHeight / 2);
        createGlow(window.innerWidth / 2, window.innerHeight / 2);

        // Обновляем счетчик времени каждую секунду
        const timerInterval = setInterval(() => {
            if (!hiddenContent.classList.contains('active')) {
                clearInterval(timerInterval);
                return;
            }
            updateCounter(messageCount, startTime);
        }, 1000);

        // Бесконечный поток сообщений
        let messageIndex = 0;
        const messageInterval = isMobile ? 1500 : 800; // Больше времени для чтения
        const messageTimer = setInterval(() => {
            if (!hiddenContent.classList.contains('active')) {
                clearInterval(messageTimer);
                clearInterval(timerInterval);
                return;
            }

            const nickname = nicknames[Math.floor(Math.random() * nicknames.length)];
            const heart1 = hearts[Math.floor(Math.random() * hearts.length)];
            const heart2 = hearts[Math.floor(Math.random() * hearts.length)];

            const message = document.createElement('div');
            message.classList.add('message');
            const phrase = phrases[Math.floor(Math.random() * phrases.length)];
            message.textContent = heart1 + ' ' + phrase + ' ' + nickname + ' ' + heart2;
            message.style.animationDelay = '0s';
            
            // По центру экрана
            message.style.position = 'fixed';
            message.style.left = '50%';
            message.style.top = '50%';
            message.style.transform = 'translate(-50%, -50%)';
            
            messagesContainer.appendChild(message);

            // Эффекты от сообщения
            const x = window.innerWidth / 2;
            const y = window.innerHeight / 2;

            createGlow(x, y);
            
            if (!isMobile) {
                createLightBeam(x, y);
            }
            
            if (messageIndex % 2 === 0) {
                createParticles(x, y);
            } else {
                createSparkles(x, y);
            }

            // Ограничиваем видимые сообщения - одно за раз
            const messages = messagesContainer.querySelectorAll('.message');
            if (messages.length > 1) {
                messages[0].remove();
            }

            messageCount++;
            updateCounter(messageCount, startTime);
            messageIndex++;
        }, messageInterval);

    }, 1555);
}

function closeSurprise() {
    const hiddenContent = document.getElementById('hiddenContent');
    const closeBtn = document.getElementById('closeBtn');
    const counter = document.getElementById('counter');
    const animationContainer = document.getElementById('animationContainer');
    const messagesContainer = document.getElementById('messagesContainer');
    const card = document.querySelector('.card');
    
    // Показываем главный экран обратно
    if (card) {
        card.style.opacity = '1';
        card.style.visibility = 'visible';
    }
    
    hiddenContent.classList.remove('active');
    closeBtn.classList.remove('active');
    counter.classList.remove('active');
    animationContainer.style.display = 'flex';
    messagesContainer.style.display = 'none';
    messagesContainer.innerHTML = '';
    isLoading = true;
}

// Закрытие по Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.getElementById('hiddenContent').classList.contains('active')) {
        closeSurprise();
    }
});

// Свайп для мобильных устройств (закрытие свайпом вниз)
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartY = e.changedTouches[0].screenY;
}, false);

document.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].screenY;
    const swipeDistance = touchEndY - touchStartY;
    
    // Если свайп вниз больше 100px - закрываем
    if (swipeDistance > 100 && document.getElementById('hiddenContent').classList.contains('active')) {
        closeSurprise();
    }
}, false);
