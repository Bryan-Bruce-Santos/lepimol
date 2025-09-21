// script.js - Interatividade do Portal LEpiMol

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initSmoothScroll();
  initDynamicHeader();
  initPostFilter();
  initPartnersSlider();
  initFormValidation();
  initBackToTop();
  initScrollAnimations();
});

// 1. Menu Hambúrguer Responsivo
function initMobileMenu() {
  const navToggle = document.getElementById('nav-toggle');
  const navList = document.querySelector('.nav-list');
  const navLinks = document.querySelectorAll('.nav-list a');
  if (!navToggle || !navList) return;

  navToggle.addEventListener('change', () => {
    navList.style.display = navToggle.checked ? 'flex' : '';
    document.body.classList.toggle('menu-open', navToggle.checked);
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        navToggle.checked = false;
        navList.style.display = '';
        document.body.classList.remove('menu-open');
      }
    });
  });
}

// 2. Navegação Suave
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href.length > 1 && document.querySelector(href)) {
        e.preventDefault();
        document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// 3. Header Dinâmico com debounce
function initDynamicHeader() {
  const header = document.querySelector('header');
  let lastScroll = 0;
  function onScroll() {
    const scrollY = window.scrollY;
    if (scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    lastScroll = scrollY;
  }
  window.addEventListener('scroll', debounce(onScroll, 80));
  onScroll();
}

// 4. Filtro de Publicações com animação suave
function initPostFilter() {
  const filtros = document.querySelectorAll('.filtro');
  const posts = document.querySelectorAll('.post');
  filtros.forEach(filtro => {
    filtro.addEventListener('click', function() {
      filtros.forEach(f => f.classList.remove('active', 'ativo'));
      this.classList.add('active', 'ativo');
      const categoria = this.getAttribute('data-categoria');
      posts.forEach(post => {
        const postCategoria = post.getAttribute('data-categoria');
        if (categoria === 'todas' || postCategoria === categoria) {
          post.classList.remove('filtered-out');
          post.classList.add('filtered-in');
          setTimeout(() => {
            post.style.display = 'block';
          }, 10);
        } else {
          post.classList.remove('filtered-in');
          post.classList.add('filtered-out');
          setTimeout(() => {
            post.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

// 5. Slider de Parceiros
function initPartnersSlider() {
  const carrossel = document.querySelector('.carrossel-logos');
  if (!carrossel) return;
  let intervalId;
  let isHovered = false;

  function slide() {
    if (isHovered) return;
    const first = carrossel.firstElementChild;
    carrossel.appendChild(first.cloneNode(true));
    first.classList.add('slide-out');
    setTimeout(() => {
      carrossel.removeChild(first);
    }, 600);
  }

  carrossel.addEventListener('mouseenter', () => { isHovered = true; });
  carrossel.addEventListener('mouseleave', () => { isHovered = false; });

  intervalId = setInterval(slide, 2200);
}

// 6. Validação de Formulário
function initFormValidation() {
  const form = document.querySelector('.form-contato');
  if (!form) return;
  const nome = form.querySelector('#nome');
  const email = form.querySelector('#email');
  const mensagem = form.querySelector('#mensagem');
  const btn = form.querySelector('button[type="submit"]');

  function validateNome() {
    if (nome.value.trim().length < 3) {
      nome.setCustomValidity('Digite seu nome completo.');
      nome.classList.add('invalid');
      return false;
    } else {
      nome.setCustomValidity('');
      nome.classList.remove('invalid');
      return true;
    }
  }
  function validateEmail() {
    const regex = /^[\w-.]+@[\w-]+\.[a-z]{2,}$/i;
    if (!regex.test(email.value.trim())) {
      email.setCustomValidity('Digite um e-mail válido.');
      email.classList.add('invalid');
      return false;
    } else {
      email.setCustomValidity('');
      email.classList.remove('invalid');
      return true;
    }
  }
  function validateMensagem() {
    if (mensagem.value.trim().length < 10) {
      mensagem.setCustomValidity('Digite uma mensagem mais detalhada.');
      mensagem.classList.add('invalid');
      return false;
    } else {
      mensagem.setCustomValidity('');
      mensagem.classList.remove('invalid');
      return true;
    }
  }

  nome.addEventListener('input', validateNome);
  email.addEventListener('input', validateEmail);
  mensagem.addEventListener('input', validateMensagem);

  form.addEventListener('submit', function(e) {
    let valid = validateNome() & validateEmail() & validateMensagem();
    if (!valid) {
      e.preventDefault();
      return;
    }
    btn.disabled = true;
    btn.textContent = 'Enviando...';
    setTimeout(() => {
      btn.disabled = false;
      btn.textContent = 'Enviar';
      form.reset();
      alert('Mensagem enviada com sucesso!');
    }, 1200);
  });
}

// 7. Botão Voltar ao Topo
function initBackToTop() {
  let btn = document.getElementById('backToTopBtn');
  if (!btn) {
    btn = document.createElement('button');
    btn.id = 'backToTopBtn';
    btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    btn.setAttribute('aria-label', 'Voltar ao topo');
    btn.style.display = 'none';
    document.body.appendChild(btn);
  }
  btn.className = 'back-to-top';
  window.addEventListener('scroll', debounce(() => {
    if (window.scrollY > 350) {
      btn.style.display = 'block';
      setTimeout(() => btn.classList.add('visible'), 10);
    } else {
      btn.classList.remove('visible');
      setTimeout(() => btn.style.display = 'none', 300);
    }
  }, 80));
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// 8. Animações On-Scroll
function initScrollAnimations() {
  function revealOnScroll() {
    const elements = document.querySelectorAll('.fade-in-on-scroll');
    const windowBottom = window.innerHeight + window.scrollY;
    elements.forEach(el => {
      const rect = el.getBoundingClientRect();
      const elTop = rect.top + window.scrollY;
      if (windowBottom > elTop + 60) {
        el.classList.add('visible');
      }
    });
  }
  window.addEventListener('scroll', debounce(revealOnScroll, 60));
  revealOnScroll();
}

// Debounce utilitário
function debounce(fn, delay) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(this, args), delay);
  };
}

// Estilo do botão voltar ao topo
const style = document.createElement('style');
style.innerHTML = `
.back-to-top {
  position: fixed;
  right: 2rem;
  bottom: 2rem;
  background: #00695c;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  font-size: 1.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.13);
  opacity: 0;
  pointer-events: none;
  z-index: 999;
  transition: opacity 0.3s, transform 0.3s;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
.back-to-top.visible {
  opacity: 1;
  pointer-events: auto;
  transform: translateY(-8px) scale(1.08);
}
.back-to-top:focus {
  outline: 2px solid #4db6ac;
}
.back-to-top i {
  pointer-events: none;
}
.form-contato input.invalid, .form-contato textarea.invalid {
  border-color: #e53935;
  background: #ffebee;
}
`;
document.head.appendChild(style);
		 // Fade-in on scroll para cards e estatísticas
		 function handleFadeInOnScroll() {
			 const elements = document.querySelectorAll('.fade-in-on-scroll');
			 const windowBottom = window.innerHeight + window.scrollY;
			 elements.forEach(el => {
				 const rect = el.getBoundingClientRect();
				 const elTop = rect.top + window.scrollY;
				 if (windowBottom > elTop + 60) {
					 el.classList.add('visible');
				 }
			 });
		 }
		 window.addEventListener('scroll', handleFadeInOnScroll);
		 window.addEventListener('DOMContentLoaded', handleFadeInOnScroll);

		 // Simular loading/skeleton dos cards de publicações
		 document.addEventListener('DOMContentLoaded', function() {
			 setTimeout(function() {
				 document.querySelectorAll('.grade-posts .post').forEach(function(post) {
					 const skeleton = post.querySelector('.skeleton');
					 const img = post.querySelector('img');
					 const content = post.querySelector('.post-content');
					 if (skeleton && img && content) {
						 skeleton.style.display = 'none';
						 img.style.display = 'block';
						 content.style.display = 'flex';
					 }
				 });
			 }, 1200);
		 });
	// Header fixo com fundo sólido ao rolar
	window.addEventListener('scroll', function() {
	  const header = document.querySelector('header');
	  if (window.scrollY > 30) {
		header.classList.add('solid');
	  } else {
		header.classList.remove('solid');
	  }
	});

	// Filtro de posts
	document.addEventListener('DOMContentLoaded', function() {
		const filtros = document.querySelectorAll('.filtro');
		const posts = document.querySelectorAll('.post');
		filtros.forEach(filtro => {
			filtro.addEventListener('click', function() {
				filtros.forEach(f => f.classList.remove('ativo'));
				this.classList.add('ativo');
				const categoria = this.getAttribute('data-categoria');
				posts.forEach(post => {
					if (categoria === 'todas' || post.getAttribute('data-categoria') === categoria) {
						post.style.display = 'block';
					} else {
						post.style.display = 'none';
					}
				});
			});
		});
		// Animação dos contadores
		const contadores = document.querySelectorAll('.contador');
		contadores.forEach(contador => {
			const alvo = +contador.getAttribute('data-alvo');
			let valor = 0;
			const incremento = Math.ceil(alvo / 100);
			function animar() {
				valor += incremento;
				if (valor > alvo) valor = alvo;
				contador.textContent = valor;
				if (valor < alvo) {
					setTimeout(animar, 30);
				}
			}
			animar();
		});
	});