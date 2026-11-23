// ==================== ПРЕЛОАДЕР ====================
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('preloader').classList.add('hidden');
    initParticles();
    animateStats();
  }, 2000);
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
        setTimeout(() => page.classList.add('active'), 100);
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
  const numberOfParticles = 100;

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = Math.random() * 0.5 - 0.25;
      this.speedY = Math.random() * 0.5 - 0.25;
      this.color = Math.random() > 0.8 ? 'rgba(138, 3, 3, 0.6)' : 'rgba(100, 100, 100, 0.3)';
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

  for (let i = 0; i < numberOfParticles; i++) {
    particlesArray.push(new Particle());
  }

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

// ==================== АНИМАЦИЯ СТАТИСТИКИ ====================
function animateStats() {
  const stats = document.querySelectorAll('.stat-num');
  stats.forEach(stat => {
    const target = +stat.getAttribute('data-count');
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCount = () => {
      current += increment;
      if (current < target) {
        stat.innerText = Math.ceil(current);
        requestAnimationFrame(updateCount);
      } else {
        stat.innerText = target;
      }
    };
    
    // Запуск при прокрутке
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        updateCount();
        observer.disconnect();
      }
    });
    observer.observe(stat);
  });
}

// ==================== ПЕРСОНАЖИ ====================
const characters = [
  {
    name: "Далтон Ламберт",
    role: "Студент / Ключ",
    body: "Теперь ему 18 лет. Он пытается забыть детские кошмары, но Красная дверь возвращается в его снах. Его способность к астральным проекциям усиливается, делая его главной мишенью."
  },
  {
    name: "Джош Ламберт",
    role: "Отец / Бывший проводник",
    body: "Он поклялся никогда больше не входить в Астрал. Но когда его сын оказывается в опасности, Джош вынужден признать: тьма, живущая в нём, никогда не уходила. Она просто ждала."
  },
  {
    name: "Ренай Ламберт",
    role: "Мать / Якорь",
    body: "Единственная, кто всегда возвращал их обратно. Теперь она должна удерживать семью вместе, когда реальность начинает рушиться, а границы между мирами стираются."
  },
  {
    name: "Паркер Крейн",
    role: "Зло / Красное лицо",
    body: "Он не исчез. Он терпелив. Он знает все их страхи, все их воспоминания. И он знает, что рано или поздно кто-то из них снова откроет дверь. Изнутри."
  }
];

const charsGrid = document.getElementById('charsGrid');
characters.forEach((char, index) => {
  const card = document.createElement('div');
  card.className = 'char-card';
  card.innerHTML = `<h3>${char.name}</h3><div class="role">${char.role}</div>`;
  card.addEventListener('click', () => openModal(char));
  charsGrid.appendChild(card);
});

const modal = document.getElementById('charModal');
const modalClose = document.getElementById('modalClose');

function openModal(char) {
  document.getElementById('modalName').innerText = char.name;
  document.getElementById('modalRole').innerText = char.role;
  document.getElementById('modalBody').innerHTML = `<p>${char.body}</p>`;
  modal.classList.add('active');
}

modalClose.addEventListener('click', () => modal.classList.remove('active'));
modal.addEventListener('click', (e) => {
  if (e.target === modal) modal.classList.remove('active');
});

// ==================== КВИЗ ====================
const quizData = [
  { q: "Ты слышишь шёпот, когда остаёшься один в тишине?", options: ["Да, постоянно", "Иногда", "Никогда"] },
  { q: "Какой цвет ты видишь, закрывая глаза?", options: ["Красный", "Чёрный", "Белый"] },
  { q: "Ты помнишь свои детские кошмары?", options: ["Слишком хорошо", "Смутно", "Нет"] },
  { q: "Если бы ты вошёл в Астрал, что бы ты взял с собой?", options: ["Фотографию семьи", "Ничего", "Зеркало"] },
  { q: "Ты чувствуешь присутствие кого-то в комнате прямо сейчас?", options: ["Да", "Нет", "Не хочу отвечать"] }
];

let currentQuestion = 0;
let score = 0;

document.getElementById('startQuiz').addEventListener('click', () => {
  document.getElementById('startQuiz').classList.add('hidden');
  document.getElementById('quizContent').classList.remove('hidden');
  showQuestion();
});

function showQuestion() {
  const container = document.getElementById('quizContent');
  if (currentQuestion >= quizData.length) {
    showResult();
    return;
  }
  
  const q = quizData[currentQuestion];
  let html = `<div class="quiz-question">${currentQuestion + 1}. ${q.q}</div><div class="quiz-options">`;
  
  q.options.forEach(opt => {
    html += `<button class="quiz-option" onclick="answerQuiz('${opt}')">${opt}</button>`;
  });
  html += `</div>`;
  container.innerHTML = html;
}

function answerQuiz(ans) {
  if (ans === "Да, постоянно" || ans === "Красный" || ans === "Слишком хорошо" || ans === "Зеркало" || ans === "Да") {
    score += 2;
  } else if (ans === "Иногда" || ans === "Чёрный" || ans === "Смутно" || ans === "Фотографию семьи") {
    score += 1;
  }
  currentQuestion++;
  showQuestion();
}

function showResult() {
  document.getElementById('quizContent').classList.add('hidden');
  const resultDiv = document.getElementById('quizResult');
  resultDiv.classList.remove('hidden');
  
  let resultText = "";
  if (score >= 8) {
    resultText = "Ты уже в Астрале. Оно знает твоё имя.";
  } else if (score >= 5) {
    resultText = "Ты — Проводник. Ты чувствуешь грань, но ещё можешь вернуться.";
  } else {
    resultText = "Ты — Хранитель. Твой разум защищён, но не надолго.";
  }
  
  resultDiv.innerHTML = `<div class="quiz-result">${resultText}</div><button class="btn-start" onclick="location.reload()" style="margin-top:20px;">Пройти снова</button>`;
}

// ==================== ИГРА С КРАСНОЙ ДВЕРЬЮ ====================
let doorClicks = 0;
const bigDoor = document.getElementById('bigDoor');
const doorMessage = document.getElementById('doorMessage');
const doorCount = document.getElementById('doorCount');
const doorFace = document.getElementById('doorFace');

const creepyMessages = [
  "Дверь заперта.",
  "Слышен шёпот...",
  "Оно знает твоё имя.",
  "Не оборачивайся.",
  "ТЫ УЖЕ ВНУТРИ.",
  "ПОМОГИТЕ МНЕ",
  "ОНО СМОТРИТ ЧЕРЕЗ ПЛЕЧО"
];

const creepyFaces = ["?", "☠", "👁", "◉", "҉", "X"];

bigDoor.addEventListener('click', () => {
  doorClicks++;
  doorCount.innerText = doorClicks;
  
  // Эффект тряски
  bigDoor.classList.add('shake');
  setTimeout(() => bigDoor.classList.remove('shake'), 500);
  
  // Изменение сообщения
  if (doorClicks <= creepyMessages.length) {
    doorMessage.innerText = creepyMessages[doorClicks - 1];
  } else {
    doorMessage.innerText = "ДВЕРЬ БОЛЬШЕ НЕ ОТКРОЕТСЯ. ПОЗДНО.";
    doorMessage.style.color = "#ff0000";
    doorMessage.style.textShadow = "0 0 10px red";
  }
  
  // Изменение лица на двери
  if (doorClicks > 2) {
    const faceIndex = Math.min(Math.floor((doorClicks - 2) / 2), creepyFaces.length - 1);
    doorFace.innerText = creepyFaces[faceIndex];
    doorFace.style.color = doorClicks > 5 ? "#ff0000" : "rgba(0,0,0,0.5)";
  }
  
  // Скример-эффект на 7-м клике
  if (doorClicks === 7) {
    document.body.style.animation = "shake 0.5s cubic-bezier(.36,.07,.19,.97) both";
    document.querySelector('.vignette').style.background = "radial-gradient(circle, rgba(255,0,0,0.2) 0%, rgba(0,0,0,0.9) 100%)";
    setTimeout(() => {
      document.body.style.animation = "";
      document.querySelector('.vignette').style.background = "radial-gradient(circle, transparent 50%, rgba(0,0,0,0.8) 100%)";
    }, 500);
  }
});

// ==================== ГЛИТЧ ЭФФЕКТ ПРИ ДВИЖЕНИИ МЫШИ ====================
document.addEventListener('mousemove', (e) => {
  if (Math.random() > 0.98) {
    const glitch = document.createElement('div');
    glitch.style.position = 'fixed';
    glitch.style.left = e.clientX + 'px';
    glitch.style.top = e.clientY + 'px';
    glitch.style.width = '20px';
    glitch.style.height = '2px';
    glitch.style.background = 'var(--bright-red)';
    glitch.style.pointerEvents = 'none';
    glitch.style.zIndex = '9999';
    document.body.appendChild(glitch);
    setTimeout(() => glitch.remove(), 100);
  }
});
