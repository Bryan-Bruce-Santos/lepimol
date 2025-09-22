// script.js - Interatividade do Portal LEpiMol

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initSmoothScroll();
  initDynamicHeader();
  initPostFilter();
  initFormValidation();
  initScrollAnimations();
  initCounters();
});

// 1. Menu Hambúrguer Responsivo
function initMobileMenu() {
  const navToggle = document.getElementById('nav-toggle');
  const navList = document.querySelector('.nav-list');
  if (!navToggle || !navList) return;

  // Mostra/esconde o menu
  navToggle.addEventListener('change', () => {
    navList.style.display = navToggle.checked ? 'flex' : '';
  });

  // Fecha o menu ao clicar em um link
  navList.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' && window.innerWidth <= 768) {
      navToggle.checked = false;
      navList.style.display = '';
    }
  });
}


// 2. Navegação Suave para âncoras
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId.length > 1) {
        document.querySelector(targetId).scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
}

// 3. Header Dinâmico
function initDynamicHeader() {
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('solid');
    } else {
      header.classList.remove('solid');
    }
  });
}

// 4. Filtro de Publicações
function initPostFilter() {
  const filtros = document.querySelectorAll('.filtro');
  const posts = document.querySelectorAll('.post');
  filtros.forEach(filtro => {
    filtro.addEventListener('click', function() {
      filtros.forEach(f => f.classList.remove('ativo'));
      this.classList.add('ativo');
      const categoria = this.getAttribute('data-categoria');
      posts.forEach(post => {
        const postCategoria = post.getAttribute('data-categoria');
        post.style.display = (categoria === 'todas' || postCategoria === categoria) ? 'flex' : 'none';
      });
    });
  });
}

// 5. Validação de Formulário (simples)
function initFormValidation() {
  const form = document.querySelector('.form-contato');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Mensagem enviada com sucesso! (Isso é uma simulação)');
      form.reset();
    });
  }
}

// 6. Animações On-Scroll
function initScrollAnimations() {
  const elements = document.querySelectorAll('.fade-in-on-scroll');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  elements.forEach(el => observer.observe(el));
}

// 7. Animação dos Contadores
function initCounters() {
    const contadores = document.querySelectorAll('.contador');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const contador = entry.target;
                const alvo = +contador.getAttribute('data-alvo');
                let valor = 0;
                const incremento = Math.ceil(alvo / 100); 
                const animar = () => {
                    valor += incremento;
                    if (valor > alvo) valor = alvo;
                    contador.textContent = valor;
                    if (valor < alvo) {
                        setTimeout(animar, 20);
                    }
                };
                animar();
                observer.unobserve(contador);
            }
        });
    }, { threshold: 0.8 }); 
    contadores.forEach(contador => {
        observer.observe(contador);
    });
}

