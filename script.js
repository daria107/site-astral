/* ============================================
   АСТРАЛ 5: КРАСНАЯ ДВЕРЬ — Скрипт сайта
   ============================================ */

/* ---------- Прелоадер ---------- */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('preloader').classList.add('hidden');
  }, 1400);
});

/* ---------- Данные персонажей ---------- */
const characters = [
  {
    name: 'Далтон Ламберт',
    role: 'Студент · Главный герой',
    initial: 'Д',
    short: '18-летний студент, который с детства был связан с Астралом. Теперь он видит красную дверь во снах — и голос, который её охраняет.',
    full: [
      'В детстве Далтон был тем, кого похитили в Астрал. Тогда он вернулся. Теперь он вырос и пытается жить обычной жизнью — но сны возвращаются, а с ними возвращается и то, что его похитило.',
      'Далтон — единственный, кто может закрыть красную дверь. Но для этого ему нужно открыть её самому. И это самое страшное, что он может сделать.'
    ],
    fact: 'В фильме взрослого Далтона играет тот же актёр, что и ребёнка в первой части, — только спустя десять лет.'
  },
  {
    name: 'Джош Ламберт',
    role: 'Отец · Хранитель тайны',
    initial: 'Дж',
    short: 'Отец Далтона. Двадцать лет назад он вошёл в Астрал, чтобы спасти сына. И с тех пор не рассказывал, что там видел.',
    full: [
      'Джош закрыл дверь, но не уничтожил её. Он знает: то, что за дверью, не умирает — оно ждёт. Все эти годы он жил с этим знанием, не позволяя себе расслабиться ни на секунду.',
      'Когда Далтон начинает видеть дверь, Джош понимает: его время истекло. И теперь ему придётся снова войти в место, которое он поклялся никогда не посещать.'
    ],
    fact: 'Фраза Джоша «Я закрыл её. Двадцать лет назад» — единственная реплика, которую актёр произнёс без дубля. Режиссёр оставил первый вариант.'
  },
  {
    name: 'Элис Ламберт',
    role: 'Медиум · Мать',
    initial: 'Э',
    short: 'Жена Джоша, медиум. Она чувствует Астрал так же, как другие чувствуют холод. И она знает: красная дверь — не единственная.',
    full: [
      'Элис никогда не была в Астрале — но всегда чувствовала его. Она видела сны, которые не принадлежали ей, и слышала шёпот, который не был человеческим.',
      'Именно она первой понимает, что дверь открыта, и что за ней — не пустота. И именно она решает, кто из семьи войдёт первым.'
    ],
    fact: 'Сцена, где Элис стоит перед красной дверью и не решается её открыть, снималась в реальном доме, где, по словам съёмочной группы, «что-то было не так». Актёры отказались оставаться там после заката.'
  },
  {
    name: 'Красная дверь',
    role: 'Портал · Сущность',
    initial: '●',
    short: 'Дверь, которую невозможно забыть. Она есть в каждом сне. Она ведёт туда, откуда не все возвращаются.',
    full: [
      'Красная дверь — не просто портал. Это память. Она хранит всё, что было заперто за ней: страхи, лица, голоса. Чем дольше она закрыта, тем сильнее то, что за ней.',
      'В фильме дверь так и не получает объяснения. Она просто есть — как есть страх. И как страх, она никогда не исчезает полностью.'
    ],
    fact: 'Красную дверь для съёмок построили в трёх экземплярах: одна для крупных планов, одна для сцен с актёрами и одна уменьшенная — для снов. Все три после съёмок были уничтожены.'
  },
  {
    name: 'Тот, кто за дверью',
    role: 'Сущность · Антагонист',
    initial: '?',
    short: 'Он ждал двадцать лет. Он знает имена всех членов семьи. И теперь у него есть лицо, которое они узнают.',
    full: [
      'Фильм не называет его по имени. Он — то, что осталось от прошлого визита в Астрал. Он помнит всё: голоса, шаги, лица. И он хочет вернуться.',
      'В финале он выходит за дверь — и оказывается, что у него есть лицо. Лицо, которое семья Ламберт знает слишком хорошо.'
    ],
    fact: 'Лицо сущности в финале — не актёр и не графика. Это отражение зрителя: сцена снята так, что каждый видит в нём что-то своё. Этот приём режиссёр подсмотрел в старых зеркальных галереях.'
  }
];

/* ---------- Данные теста ---------- */
const quizData = [
  {
    q: 'Сколько лет прошло с событий первого фильма?',
    opts: ['5 лет', '10 лет', '20 лет', '30 лет'],
    correct: 2
  },
  {
    q: 'Кто из семьи Ламберт первым начинает видеть красную дверь?',
    opts: ['Джош', 'Элис', 'Далтон', 'Все одновременно'],
    correct: 2
  },
  {
    q: 'Кем является Элис?',
    opts: ['Врачом', 'Медиумом', 'Учителем', 'Психологом'],
    correct: 1
  },
  {
    q: 'Что находится за красной дверью?',
    opts: ['Пустота', 'Выход', 'Тот, кто ждал двадцать лет', 'Прошлое семьи'],
    correct: 2
  },
  {
    q: 'Что нужно сделать, чтобы закрыть дверь навсегда?',
    opts: ['Сжечь дом', 'Войти в Астрал всей семьёй', 'Забыть о ней', 'Найти другое лицо'],
    correct: 1
  }
];

/* ============================================
   НАВИГАЦИЯ ПО СТРАНИЦАМ
   ============================================ */
const navLinks = document.querySelectorAll('#nav a');
const pages = document.querySelectorAll('.page');

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = link.dataset.page;
    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    pages.forEach(p => p.classList.remove('active'));
    document.getElementById(target).classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

/* ============================================
   ПЕРСОНАЖИ — карточки и модалка
   ============================================ */
const charsGrid = document.getElementById('charsGrid');
const modal = document.getElementById('charModal');
const modalName = document.getElementById('modalName');
const modalRole = document.getElementById('modalRole');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');

characters.forEach((c, i) => {
  const card = document.createElement('div');
  card.className = 'char';
  card.style.animationDelay = (i * 0.08) + 's';
  card.innerHTML = `
    <div class="avatar">${c.initial}</div>
    <h3>${c.name}</h3>
    <div class="role">${c.role}</div>
    <p>${c.short}</p>
    <div class="hint">Подробнее →</div>
  `;
  card.addEventListener('click', () => openChar(c));
  charsGrid.appendChild(card);
});

function openChar(c) {
  modalName.textContent = c.name;
  modalRole.textContent = c.role;
  modalBody.innerHTML = c.full.map(p => `<p>${p}</p>`).join('') +
    `<div class="fact"><b>Факт</b>${c.fact}</div>`;
  modal.classList.add('open');
}

modalClose.addEventListener('click', () => modal.classList.remove('open'));
modal.addEventListener('click', e => {
  if (e.target === modal) modal.classList.remove('open');
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') modal.classList.remove('open');
});

/* ============================================
   ТЕСТ
   ============================================ */
const quizContainer = document.getElementById('quizContainer');
let quizIndex = 0;
let quizScore = 0;
let quizAnswered = false;

function renderQuiz() {
  if (quizIndex >= quizData.length) {
    renderQuizResult();
    return;
  }
  const q = quizData[quizIndex];
  quizContainer.innerHTML = `
    <div class="quiz-progress">Вопрос ${quizIndex + 1} / ${quizData.length}</div>
    <div class="quiz-q">${q.q}</div>
    <div class="quiz-opts">
      ${q.opts.map((o, i) => `<button data-i="${i}">${o}</button>`).join('')}
    </div>
  `;
  quizContainer.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => handleAnswer(parseInt(btn.dataset.i), btn));
  });
  quizAnswered = false;
}

function handleAnswer(i, btn) {
  if (quizAnswered) return;
  quizAnswered = true;
  const q = quizData[quizIndex];
  const buttons = quizContainer.querySelectorAll('button');
  buttons.forEach(b => b.disabled = true);

  if (i === q.correct) {
    btn.classList.add('correct');
    quizScore++;
  } else {
    btn.classList.add('wrong');
    buttons[q.correct].classList.add('correct');
  }

  setTimeout(() => {
    quizIndex++;
    renderQuiz();
  }, 1000);
}

function renderQuizResult() {
  const total = quizData.length;
  let verdict = '';
  if (quizScore === total) verdict = 'Ты был бы тем, кто закрыл дверь. Но ценой — остаться снаружи.';
  else if (quizScore >= 3) verdict = 'Ты бы вошёл в Астрал. И, возможно, вернулся бы.';
  else verdict = 'Дверь открыта. Ты видишь то, что за ней. И оно видит тебя.';

  quizContainer.innerHTML = `
    <div class="quiz-result">
      <div class="score">${quizScore} / ${total}</div>
      <p>${verdict}</p>
      <button class="btn" id="quizRestart">Пройти заново</button>
    </div>
  `;
  document.getElementById('quizRestart').addEventListener('click', () => {
    quizIndex = 0;
    quizScore = 0;
    renderQuiz();
  });
}

renderQuiz();

/* ============================================
   КРАСНАЯ ДВЕРЬ — интерактив
   ============================================ */
const bigDoor = document.getElementById('bigDoor');
const doorFace = document.getElementById('doorFace');
const doorMessage = document.getElementById('doorMessage');
const doorCountEl = document.getElementById('doorCount');

const doorFaces = ['?', 'Я', 'ТЫ', 'ОН', 'НЕТ', '○', '✕', '∞', 'МЫ', 'ТЬМА'];
const doorMessages = [
  'За дверью — тишина. Но она <span class="hl">дышит</span>.',
  'Ты слышишь голос. Он зовёт тебя по имени.',
  'Там никого нет. Но кто-то только что <span class="hl">отошёл</span> от двери.',
  'Красный свет. Он не от лампы. Он <span class="hl">оттуда</span>.',
  'Ты видишь лицо. Оно знакомо. Но ты не помнишь, <span class="hl">откуда</span>.',
  'Дверь закрылась сама. Ты не касался её. <span class="hl">Кто-то другой</span> сделал это.',
  'За дверью — комната. В комнате — ты. <span class="hl">Спишь</span>.',
  'Голос говорит: «Ещё раз». И дверь <span class="hl">открывается снова</span>.',
  'Ты слышишь шаги за спиной. Но ты стоишь <span class="hl">спиной к двери</span>.',
  'Кто-то стучит изнутри. <span class="hl">Три раза</span>. Потом ещё три.',
  'Ты видишь свою руку на ручке. Но ты <span class="hl">не тянулся</span> к ней.',
  'Дверь шепчет твоё имя. Она <span class="hl">знает</span>, как тебя зовут.'
];

let doorOpen = false;
let doorCount = 0;

bigDoor.addEventListener('click', () => {
  doorOpen = !doorOpen;
  bigDoor.classList.toggle('open', doorOpen);

  if (doorOpen) {
    doorCount++;
    doorCountEl.textContent = doorCount;

    doorFace.textContent = doorFaces[Math.floor(Math.random() * doorFaces.length)];
    doorMessage.innerHTML = doorMessages[Math.floor(Math.random() * doorMessages.length)];

    // лёгкая тряска
    bigDoor.style.animation = 'none';
    setTimeout(() => {
      bigDoor.style.animation = 'doorShake .3s';
    }, 10);

    // звуковой «отклик» через вибрацию (если поддерживается)
    if (navigator.vibrate) navigator.vibrate(60);
  } else {
    doorMessage.innerHTML = 'Дверь закрыта. Но она <span class="hl">помнит</span>, что ты её открывал.';
  }
});

// Добавляем анимацию тряски через JS
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
  @keyframes doorShake {
    0%, 100% { transform: perspective(800px) rotateY(-75deg) translate(0,0); }
    25% { transform: perspective(800px) rotateY(-75deg) translate(-4px, 2px); }
    75% { transform: perspective(800px) rotateY(-75deg) translate(4px, -2px); }
  }
`;
document.head.appendChild(shakeStyle);

/* ============================================
   АНИМАЦИЯ СЧЁТЧИКОВ (stats)
   ============================================ */
const statNums = document.querySelectorAll('.stat-num');
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.count);
      let current = 0;
      const step = Math.max(1, Math.floor(target / 30));
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        el.textContent = current;
      }, 40);
      statsObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

statNums.forEach(el => statsObserver.observe(el));

/* ============================================
   ЧАСТИЦЫ НА ФОНЕ (canvas)
   ============================================ */
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];
let W, H;

function resizeCanvas() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.size = Math.random() * 2 + 0.5;
    this.speedY = -(Math.random() * 0.3 + 0.05);
    this.speedX = (Math.random() - 0.5) * 0.2;
    this.opacity = Math.random() * 0.5 + 0.1;
    this.color = Math.random() > 0.5 ? '224,30,36' : '106,61,122';
    this.life = Math.random() * 400 + 200;
  }
  update() {
    this.y += this.speedY;
    this.x += this.speedX;
    this.life--;
    if (this.y < -10 || this.life <= 0) this.reset();
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
    ctx.shadowBlur = 10;
    ctx.shadowColor = `rgba(${this.color}, 0.8)`;
    ctx.fill();
    ctx.shadowBlur = 0;
  }
}

for (let i = 0; i < 60; i++) {
  particles.push(new Particle());
}

function animateParticles() {
  ctx.clearRect(0, 0, W, H);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();

/* ============================================
   ПАРАЛЛАКС МЫШИ (hero)
   ============================================ */
const hero = document.querySelector('.hero');
if (hero) {
  hero.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 15;
    const y = (e.clientY / window.innerHeight - 0.5) * 15;
    const fog = hero.querySelector('.hero-fog');
    const orn = hero.querySelector('.door-ornament');
    if (fog) fog.style.transform = `translate(${x}px, ${y}px)`;
    if (orn) orn.style.transform = `translate(${x * 0.4}px, ${y * 0.4}px)`;
  });
}

/* ============================================
   ПОЯВЛЕНИЕ ЭЛЕМЕНТОВ ПРИ СКРОЛЛЕ
   ============================================ */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.plot-text, .plot-visual, .quote-block, .stat, .game-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity .8s ease, transform .8s cubic-bezier(.2,.6,.3,1)';
  revealObserver.observe(el);
});

/* ============================================
   КОНСОЛЬНЫЙ ПАСХАЛЬНЫЙ ПРИВЕТ
   ============================================ */
console.log('%cАСТРАЛ 5: КРАСНАЯ ДВЕРЬ', 'color:#e01e24;font-size:22px;font-weight:900;text-shadow:0 0 20px #ff2a2a;');
console.log('%cДверь открыта. Ты уже внутри.', 'color:#80707a;font-size:13px;font-style:italic;');