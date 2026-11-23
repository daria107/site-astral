// ==================== КАСТОМНЫЙ КУРСОР И ФОНАРИК ====================
const cursorDot = document.getElementById('cursorDot');
const cursorOutline = document.getElementById('cursorOutline');
const flashlight = document.getElementById('flashlight');

window.addEventListener('mousemove', (e) => {
  const posX = e.clientX;
  const posY = e.clientY;

  // Курсор
  cursorDot.style.left = `${posX}px`;
  cursorDot.style.top = `${posY}px`;
  
  // Плавное следование обводки
  cursorOutline.animate({
    left: `${posX}px`,
    top: `${posY}px`
  }, { duration: 500, fill: "forwards" });

  // Фонарик
  flashlight.style.setProperty('--x', `${posX}px`);
  flashlight.style.setProperty('--y', `${posY}px`);
});

// Эффект при наведении на интерактивные элементы
const hoverables = document.querySelectorAll('a, button, .tarot-card, .big-door-3d, .freq-slider');
hoverables.forEach(el => {
  el.addEventListener('mouseenter', () => cursorOutline.classList.add('hovered'));
  el.addEventListener('mouseleave', () => cursorOutline.classList.remove('hovered'));
});

// Активация фонарика при скролле
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    document.body.classList.add('scrolled');
  } else {
    document.body.classList.remove('scrolled');
  }
});

// ==================== ПРЕЛОАДЕР И SCRAMBLE ЭФФЕКТ ====================
class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = '!<>-_\\/[]{}—=+*^?#________';
    this.update = this.update.bind(this);
  }
  setText(newText) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise((resolve) => this.resolve = resolve);
    this.queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      this.queue.push({ from, to, start, end });
    }
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }
  update() {
    let output = '';
    let complete = 0;
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += `<span class="red-text">${char}</span>`;
      } else {
        output += from;
      }
    }
    this.el.innerHTML = output;
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }
  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}

// Применяем scramble к элементам с атрибутом data-scramble
document.querySelectorAll('[data-scramble]').forEach(el => {
  const fx = new TextScramble(el);
  const originalText = el.getAttribute('data-scramble');
  
  el.addEventListener('mouseenter', () => {
    fx.setText(originalText);
  });
});

window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('preloader').classList.add('hidden');
    initParticles();
    initScrollReveal();
  }, 2500);
});

// ==================== НАВИГАЦИЯ ====================
const navLinks = document.querySelectorAll('#nav a');
const pages = document.querySelectorAll('.page');

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetPage = link.getAttribute('data-page');
    
    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    
    pages.forEach(page => {
      page.classList.remove('active');
      if (page.id === targetPage) {
        setTimeout(() => {
          page.classList.add('active');
          // Перезапуск анимаций скролла для новой страницы
          initScrollReveal(); 
        }, 100);
      }
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

// ==================== ЧАСТИЦЫ (CANVAS) ====================
function initParticles() {
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particlesArray = [];
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2;
      this.speedX = Math.random() * 0.4 - 0.2;
      this.speedY = Math.random() * 0.4 - 0.2;
      this.color = Math.random() > 0.9 ? 'rgba(255, 0, 60, 0.4)' : 'rgba(100, 100, 100, 0.2)';
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x > canvas.width) this.x = 0;
      if (this.x < 0) this.x = canvas.width;
      if (this.y > canvas.height) this.y = 0;
      if (this.y < 0) this.y = canvas.height;
    }
    draw() {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  for (let i = 0; i < 120; i++) particlesArray.push(new Particle());

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update();
      particlesArray[i].draw();
    }
    requestAnimationFrame(animate);
  }
  animate();

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

// ==================== SCROLL REVEAL ====================
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
}

// ==================== ПЕРСОНАЖИ (ТАРО) ====================
const characters = [
  {
    name: "Далтон Ламберт",
    role: "Ключ",
    icon: "🗝️",
    desc: "18 лет. Его разум — мост между мирами. Он думал, что избавился от демонов, но они просто научились притворяться его воспоминаниями.",
    secret: "Секрет: Он уже не просыпается по-настоящему."
  },
  {
    name: "Джош Ламберт",
    role: "Проводник",
    icon: "🕯️",
    desc: "Отец, нарушивший клятву. Его связь с Астралом глубже, чем он признаёт. Тьма в нём не спит, она ждала подходящего момента.",
    secret: "Секрет: Он слышит шёпот даже днём."
  },
  {
    name: "Ренай Ламберт",
    role: "Якорь",
    icon: "⚓",
    desc: "Единственная сила, удерживающая семью в реальности. Её интуиция обострилась до боли, она чувствует холод за секунду до появления призрака.",
    secret: "Секрет: Она видит мёртвых в отражениях."
  },
  {
    name: "Сущность",
    role: "Хозяин Двери",
    icon: "👁️",
    desc: "Оно не имеет имени. Оно питается страхом привязанности. Оно носит лица тех, кого вы любите, чтобы вы открыли дверь добровольно.",
    secret: "Секрет: Оно уже находится в комнате."
  }
];

const charsGrid = document.getElementById('charsGrid');
characters.forEach(char => {
  const card = document.createElement('div');
  card.className = 'tarot-card';
  card.innerHTML = `
    <div class="tarot-front">
      <div class="tarot-icon">${char.icon}</div>
      <div class="tarot-name">${char.name}</div>
      <div class="tarot-role">${char.role}</div>
    </div>
    <div class="tarot-back">
      <h4>Истинная Суть</h4>
      <p>${char.desc}</p>
      <div class="tarot-secret">${char.secret}</div>
    </div>
  `;
  charsGrid.appendChild(card);
});

// ==================== ИНТЕРАКТИВ 1: SPIRIT BOX ====================
const freqSlider = document.getElementById('freqSlider');
const freqDisplay = document.getElementById('freqDisplay');
const spiritMessage = document.getElementById('spiritMessage');

const creepyMessages = [
  "Я вижу тебя...", "Помоги мне", "Оно здесь", "Не закрывай глаза", 
  "Холодно...", "Мы ждём", "Обернись", "Дверь открыта"
];

freqSlider.addEventListener('input', (e) => {
  const val = e.target.value;
  // Генерируем "шумящую" частоту
  const freq = (val * 0.88 + Math.random() * 2).toFixed(1);
  freqDisplay.innerText = `${freq} MHz`;
  
  // Эффект помех
  freqDisplay.style.opacity = 0.5 + Math.random() * 0.5;
  
  // Если частота близка к "нужной" (например, кратно 15 или 100)
  if (val % 15 === 0 || val == 100) {
    spiritMessage.classList.add('active');
    const msg = creepyMessages[Math.floor(Math.random() * creepyMessages.length)];
    spiritMessage.innerText = msg;
    
    // Визуальный глитч экрана
    document.body.style.transform = `translateX(${Math.random() * 4 - 2}px)`;
    setTimeout(() => document.body.style.transform = 'none', 100);
  } else {
    spiritMessage.classList.remove('active');
    spiritMessage.innerText = "Только белый шум...";
  }
});

// ==================== ИНТЕРАКТИВ 2: 3D КРАСНАЯ ДВЕРЬ ====================
let doorClicks = 0;
const bigDoor3d = document.getElementById('bigDoor3d');
const doorMessage3d = document.getElementById('doorMessage3d');
const doorCount3d = document.getElementById('doorCount3d');

const doorStates = [
  "Дверь заперта. Постучите.",
  "Слышен скрежет изнутри...",
  "Щель расширяется. Тянет холодом.",
  "ТЫ УЖЕ ВНУТРИ.",
  "ОНО СМОТРИТ НА ТЕБЯ.",
  "ПОЗДНО. ДВЕРЬ НЕ ЗАКРОЕТСЯ.",
  "ДОБРО ПОЖАЛОВАТЬ ДОМОЙ."
];

bigDoor3d.addEventListener('click', () => {
  if (doorClicks >= 6) return; // Максимум открытий
  
  doorClicks++;
  doorCount3d.innerText = doorClicks;
  
  // Убираем предыдущие классы открытия
  bigDoor3d.classList.remove('open-1', 'open-2', 'open-3');
  
  // Добавляем новый уровень открытия
  if (doorClicks <= 2) bigDoor3d.classList.add('open-1');
  else if (doorClicks <= 4) bigDoor3d.classList.add('open-2');
  else bigDoor3d.classList.add('open-3');
  
  // Обновляем текст
  doorMessage3d.innerText = doorStates[doorClicks];
  doorMessage3d.style.color = doorClicks >= 4 ? 'var(--neon-red)' : 'var(--ash-gray)';
  
  // Эффект тряски на 5-м клике
  if (doorClicks === 5) {
    document.querySelector('.door-game-card').style.animation = 'shake 0.5s';
    setTimeout(() => {
      document.querySelector('.door-game-card').style.animation = '';
    }, 500);
  }
});
