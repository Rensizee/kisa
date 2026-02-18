const hearts = ['💕', '💖', '💗', '💓', '💞', '❤️', '💘'];
const nicknames = ['киса', 'зая', 'любимая', 'милая', 'пуся', 'солнышко', 'сладкая', 'красивая', 'малышка', 'настюшенька'];
const nicknames_t = ['кисы', 'зайки', 'любимой', 'милой', 'самой красивой', 'прекрасной', 'сладкой', 'красивой', 'малышки', 'настюши', 'настюшеньки'];
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
            const fullText = heart1 + ' ' + phrase + ' ' + nickname + ' ' + heart2;
            message.style.animationDelay = '0s';

            // positioning handled by `.messages-container` (stacked, centered)

            // inner span for typed text
            const textSpan = document.createElement('span');
            textSpan.className = 'message-text';
            message.appendChild(textSpan);

            messagesContainer.appendChild(message);

            // mark as typing so css keeps it visible
            message.classList.add('typing');

            // typing speed (ms per char)
            const charDelay = isMobile ? 70 : 30;

            // type the text into the span
            typeText(textSpan, fullText, charDelay, () => {
                // after finished typing: hide caret and clear typing state
                textSpan.classList.add('done');
                message.classList.remove('typing');

                // schedule fade-out + removal so message stays visible longer
                const holdTime = isMobile ? 3000 : 4500; // ms to keep after typing
                setTimeout(() => {
                    message.classList.add('fade-out');
                    // remove from DOM after fade transition
                    setTimeout(() => {
                        if (message.parentElement) message.remove();
                    }, 440);
                }, holdTime);
            });

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

            // (old immediate-removal removed) messages will be removed after typing+hold

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

function openGallery() {
    const galleryContainer = document.getElementById('galleryContainer');
    const card = document.querySelector('.card');

    if (card) {
        card.style.opacity = '0';
        card.style.visibility = 'hidden';
    }
    galleryContainer.classList.add('active');
}

function closeGallery() {
    const galleryContainer = document.getElementById('galleryContainer');
    const card = document.querySelector('.card');

    if (card) {
        card.style.opacity = '1';
        card.style.visibility = 'visible';
    }
    galleryContainer.classList.remove('active');
}

// Закрытие по Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (document.getElementById('hiddenContent').classList.contains('active')) {
            closeSurprise();
        }
        if (document.getElementById('galleryContainer').classList.contains('active')) {
            closeGallery();
        }
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

/* --- Small decorative features: floating hearts and cycling tagline --- */
function spawnFloatingHeart() {
    const container = document.getElementById('floatingHearts');
    if (!container) return;

    const heart = document.createElement('div');
    heart.className = 'heart-floating';
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];

    // Random horizontal position, biased toward center
    const x = (window.innerWidth / 2) + (Math.random() - 0.5) * (window.innerWidth * 0.6);
    const y = window.innerHeight - (Math.random() * 80 + 30);
    heart.style.left = Math.max(6, Math.min(window.innerWidth - 40, x)) + 'px';
    heart.style.top = y + 'px';
    heart.style.fontSize = (Math.random() * 0.6 + 0.9) + 'rem';
    heart.style.opacity = 0.95;

    container.appendChild(heart);
    setTimeout(() => heart.remove(), 6200);
}

let floatingInterval = null;
function startFloatingHearts() {
    if (floatingInterval) return;
    // spawn one immediately, then periodically
    spawnFloatingHeart();
    floatingInterval = setInterval(spawnFloatingHeart, 1600 + Math.random() * 1200);
}

function stopFloatingHearts() {
    if (floatingInterval) {
        clearInterval(floatingInterval);
        floatingInterval = null;
    }
}

/* Tagline cycling (type names after "для") */
function startTaglineCycle() {
    const tagEl = document.getElementById('tagline');
    if (!tagEl) return;

    // Use the existing `nicknames` array so it types 'киса', 'зая', etc.
    const items = Array.isArray(nicknames_t) && nicknames_t.length ? nicknames_t.slice() : ['киса'];
    let idx = 0;
    let charIdx = 0;
    let deleting = false;

    function tick() {
        const text = items[idx];
        if (!deleting) {
            tagEl.textContent = text.slice(0, ++charIdx);
            if (charIdx === text.length) {
                deleting = true;
                setTimeout(tick, 900);
                return;
            }
        } else {
            tagEl.textContent = text.slice(0, --charIdx);
            if (charIdx === 0) {
                deleting = false;
                idx = (idx + 1) % items.length;
            }
        }
        setTimeout(tick, deleting ? 40 : 90);
    }
    tick();
}

// Start small decorations after DOM content loaded
document.addEventListener('DOMContentLoaded', () => {
    startFloatingHearts();
    startTaglineCycle();

    const interactiveHeart = document.getElementById('interactive-heart');
    if (interactiveHeart) {
        interactiveHeart.addEventListener('click', (e) => {
            const rect = interactiveHeart.getBoundingClientRect();
            // Get the center of the button
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;

            // Create a burst of hearts
            for (let i = 0; i < 15; i++) {
                createFlyingHeart(x, y);
            }
        });
    }
});

function createFlyingHeart(x, y) {
    const heart = document.createElement('div');
    heart.classList.add('flying-heart');
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];

    // Randomize starting position slightly around the button's center
    const offsetX = (Math.random() - 0.5) * 50;
    const offsetY = (Math.random() - 0.5) * 50;

    heart.style.left = `${x + offsetX}px`;
    heart.style.top = `${y + offsetY}px`;
    
    // Add variety to the animation
    heart.style.animationDuration = `${Math.random() * 0.8 + 1.2}s`; // 1.2s to 2.0s
    heart.style.fontSize = `${Math.random() * 12 + 16}px`; // 16px to 28px

    document.body.appendChild(heart);

    // Remove the heart after the animation is done
    setTimeout(() => {
        heart.remove();
    }, 2000); // Should match the longest animation time
}


// Simple function to type text into an element char-by-char
function typeText(el, text, delay = 30, onComplete) {
    let i = 0;
    function next() {
        if (i <= text.length) {
            el.textContent = text.slice(0, i);
            i++;
            setTimeout(next, delay + Math.random() * (delay * 0.25));
        } else {
            if (typeof onComplete === 'function') onComplete();
        }
    }
    next();
}
