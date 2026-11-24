document.addEventListener('DOMContentLoaded', () => {

    // ============ ПРЕЛОАДЕР ============
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('hidden');
        setTimeout(whisperLoop, 8000);
    }, 3600);

    // ============ ШЁПОТ ============
    const whispers = [
        "Ты слышишь это?",
        "Они уже здесь.",
        "Не оглядывайся.",
        "Долтон...",
        "Красная дверь открыта.",
        "Tiptoe through the tulips...",
        "Не верь своим глазам.",
        "Кто-то стоит за тобой."
    ];

    function whisperLoop() {
        const el = document.createElement('div');
        el.textContent = whispers[Math.floor(Math.random() * whispers.length)];
        el.style.cssText = `
            position:fixed; bottom:24px; left:24px;
            color:#8a1010; font-family:'Special Elite',monospace;
            font-size:0.78rem; opacity:0; transition:opacity 2s;
            z-index:1000; pointer-events:none;
            letter-spacing:1px;
            text-shadow: 0 0 10px rgba(138,10,10,0.6);
        `;
        document.body.appendChild(el);
        setTimeout(() => { el.style.opacity = '0.65'; }, 150);
        setTimeout(() => {
            el.style.opacity = '0';
            setTimeout(() => el.remove(), 2200);
        }, 9000);
        setTimeout(whisperLoop, Math.random() * 18000 + 12000);
    }

    // ============ ИНТЕРАКТИВ: НАЙДИ ДОЛТОНА ============
    const grid = document.getElementById('scan-grid');
    const result = document.getElementById('scan-result');
    const targetIndex = Math.floor(Math.random() * 25);

    for (let i = 0; i < 25; i++) {
        const cell = document.createElement('div');
        cell.className = 'scan-cell static';
        cell.dataset.index = i;
        cell.addEventListener('click', () => {
            if (i === targetIndex) {
                cell.classList.add('found');
                cell.textContent = '☠';
                result.textContent = 'Долтон найден. Но он не один.';
                document.querySelectorAll('.scan-cell').forEach(c => {
                    if (c !== cell) {
                        c.style.opacity = '0.25';
                        c.style.pointerEvents = 'none';
                    }
                });
            } else {
                cell.style.background = '#1a0505';
                cell.textContent = '·';
                result.textContent = 'Здесь пусто. Или почти пусто.';
                result.style.color = '#6a6560';
            }
        });
        grid.appendChild(cell);
    }

    // ============ ИНТЕРАКТИВ: ДИАГНОСТИКА ============
    let score = 0;
    let currentQ = 1;
    const quiz = document.getElementById('quiz');
    const quizResult = document.getElementById('quiz-result');

    quiz.addEventListener('click', (e) => {
        if (e.target.tagName !== 'BUTTON') return;
        if (e.target.dataset.a === 'yes') score++;

        const currentBlock = document.querySelector(`.quiz-question[data-q="${currentQ}"]`);
        currentBlock.style.display = 'none';
        currentQ++;

        const nextBlock = document.querySelector(`.quiz-question[data-q="${currentQ}"]`);
        if (nextBlock) {
            nextBlock.style.display = 'block';
        } else {
            if (score >= 2) {
                quizResult.textContent = 'ОНИ УЖЕ ВНУТРИ';
                quizResult.style.color = '#ff2020';
                quizResult.style.textShadow = '0 0 30px rgba(255,0,0,0.8)';
            } else {
                quizResult.textContent = 'Ты ещё чист. Пока.';
                quizResult.style.color = '#666';
            }
        }
    });

    // ============ ПАРАЛЛАКС ============
    const hero = document.querySelector('.hero');
    const nav = document.getElementById('nav');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        if (hero && scrolled < window.innerHeight) {
            hero.style.transform = `translateY(${scrolled * 0.2}px)`;
            hero.style.opacity = 1 - scrolled / (window.innerHeight * 0.9);
        }
        nav.style.opacity = scrolled > 700 ? '0.35' : '1';
    });

    // ============ КРАСНЫЕ "ИСКРЫ" ============
    setInterval(() => {
        const spark = document.createElement('div');
        spark.style.cssText = `
            position:fixed;
            top:${Math.random()*100}vh;
            left:${Math.random()*100}vw;
            width:2px; height:2px;
            background:#b01515;
            z-index:9996;
            pointer-events:none;
            opacity:0.5;
            border-radius:50%;
            box-shadow:0 0 10px #b01515;
            transition: opacity 2s;
        `;
        document.body.appendChild(spark);
        setTimeout(() => { spark.style.opacity = '0'; }, 900);
        setTimeout(() => spark.remove(), 2500);
    }, 2800);

    // ============ ПОЯВЛЕНИЕ ЭЛЕМЕНТОВ ПРИ СКРОЛЛЕ ============
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.descent-step, .dossier, .fran-item, .interactive-block').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });

});