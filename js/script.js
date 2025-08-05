/**
 * Nedits Edition - Enhanced Main JavaScript File
 * Clean rewrite with all animations and functionality preserved
 */

// Initialize AOS animation library
AOS.init({
  duration: 800,
  easing: 'ease-in-out',
  once: true
});

// Add spinner animation styles
document.head.insertAdjacentHTML('beforeend', `
  <style>
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    .spinner {
      animation: spin 1s linear infinite;
      width: 20px;
      height: 20px;
      margin-right: 10px;
    }
    .spinner circle {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: 0;
      stroke-linecap: round;
    }
    @keyframes pulse {
      0% { transform: translate(-50%, -50%) scale(1); opacity: 0.7; }
      50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.9; }
      100% { transform: translate(-50%, -50%) scale(1); opacity: 0.7; }
    }
  </style>
`);

// Main initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initTypewriterEffect();
  initHeroSlideshow();
  initServicesCarousel();
  initAboutAnimations();
  initSectionHeadings();
  initSmoothScrolling();
  initSkillsSection();
  initAchievementsCounters();
  initJourneySection();
  initTestimonialsCarousel();
  handleContactForm();
  initFooter();
});

// ======================================
// COMPONENT INITIALIZATION FUNCTIONS
// ======================================

function initTypewriterEffect() {
  const aboutText = document.getElementById('about-text');
  if (!aboutText) return;
  
  const fullText = aboutText.textContent.trim();
  aboutText.textContent = '';
  
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      let i = 0;
      const type = () => {
        if (i < fullText.length) {
          aboutText.textContent += fullText.charAt(i++);
          setTimeout(type, 25);
        }
      };
      type();
      observer.disconnect();
    }
  }, { threshold: 0.1 });
  
  observer.observe(aboutText);
}

function initHeroSlideshow() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  
  const images = [
    'images/hero-bg1.jpg',
    'images/hero-bg2.jpg',
    'images/hero-bg3.jpg',
    'images/hero-bg4.jpg',
    'images/hero-bg5.jpg',
    'images/hero-bg6.jpg'
  ];
  
  let currentIndex = 0;
  
  const changeBackground = () => {
    hero.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.4), url('${images[currentIndex]}')`;
    currentIndex = (currentIndex + 1) % images.length;
  };
  
  changeBackground();
  setInterval(changeBackground, 3000);
}

function initServicesCarousel() {
  document.querySelectorAll('.services-category').forEach(container => {
    const carousel = container.querySelector('.services-carousel');
    const cards = Array.from(carousel.querySelectorAll('.service-card'));
    if (!cards.length) return;
    
    let currentIndex = 0;
    let interval;
    
    const updateCards = () => {
      cards.forEach((card, i) => {
        card.classList.remove('center', 'left', 'right', 'active');
        
        const leftIndex = (currentIndex - 1 + cards.length) % cards.length;
        const rightIndex = (currentIndex + 1) % cards.length;
        
        if (i === currentIndex) {
          card.classList.add('center');
          card.style.transform = 'translate(-50%, -50%) scale(1.1)';
        } else if (i === leftIndex) {
          card.classList.add('left');
          card.style.transform = 'translate(-150%, -50%) scale(0.7)';
        } else if (i === rightIndex) {
          card.classList.add('right');
          card.style.transform = 'translate(50%, -50%) scale(0.7)';
        }
      });
    };
    
    const startCarousel = () => {
      interval = setInterval(() => {
        currentIndex = (currentIndex + 1) % cards.length;
        updateCards();
      }, 3000);
    };
    
    carousel.addEventListener('click', (e) => {
      const card = e.target.closest('.service-card');
      if (!card) return;
      
      clearInterval(interval);
      currentIndex = cards.indexOf(card);
      updateCards();
      startCarousel();
    });
    
    updateCards();
    startCarousel();
  });
}

function initAboutAnimations() {
  document.querySelectorAll('#about [data-anim]').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease-out';
    
    new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }
    }, { threshold: 0.2 }).observe(el);
  });
}

function initSectionHeadings() {
  document.querySelectorAll('.section h2').forEach(heading => {
    heading.style.opacity = '0';
    heading.style.transform = 'translateY(20px)';
    heading.style.transition = 'all 0.6s ease-out';
    
    new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        heading.style.opacity = '1';
        heading.style.transform = 'translateY(0)';
      }
    }, { threshold: 0.3 }).observe(heading);
  });
}

function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

function initSkillsSection() {
  const skillsSection = document.getElementById('skills');
  if (!skillsSection) return;
  
  // Central circle animation
  const centralCircle = document.querySelector('.central-circle');
  if (centralCircle) {
    centralCircle.querySelector('.circle-pulse').style.animation = 'pulse 2s infinite';
    
    centralCircle.addEventListener('click', () => {
      centralCircle.style.transform = 'translate(-50%, -50%) scale(0.95)';
      setTimeout(() => {
        centralCircle.style.transform = 'translate(-50%, -50%)';
      }, 200);
    });
  }
  
  // Skill cards animation
  document.querySelectorAll('.skill-category').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = `translateY(${20 + (index * 5)}px)`;
    card.style.transition = `all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.1}s`;
    
    new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }
    }, { threshold: 0.1 }).observe(card);
    
    // Hover effects
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'scale(1.05) translateY(-5px)';
      card.querySelector('.skill-icon').style.background = '#7b0091';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
      card.querySelector('.skill-icon').style.background = 'rgba(123, 0, 145, 0.1)';
    });
  });
}

function initAchievementsCounters() {
  const section = document.getElementById('achievements');
  if (!section) return;
  
  new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      animateCounter('clientsCounter', 150, 4000);
      animateCounter('projectsCounter', 300, 4000);
      animateCounter('experienceCounter', 5, 2000);
      animateCounter('successRateCounter', 98, 3000);
    }
  }, { threshold: 0.3 }).observe(section);
}

function animateCounter(id, target, duration) {
  const element = document.getElementById(id);
  if (!element) return;
  
  let start = 0;
  const increment = target / (duration / 16);
  const suffix = id === 'successRateCounter' ? '%' : '+';
  
  const update = () => {
    start += increment;
    if (start < target) {
      element.textContent = Math.floor(start);
      requestAnimationFrame(update);
    } else {
      element.textContent = target + suffix;
    }
  };
  
  update();
}

function initJourneySection() {
  document.querySelectorAll('.timeline-item').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
    
    new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
      }
    }, { threshold: 0.2 }).observe(item);
  });
}

function initTestimonialsCarousel() {
  const carousel = document.querySelector('.testimonials-carousel');
  if (!carousel) return;
  
  const cards = document.querySelectorAll('.testimonial-card');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  const dotsContainer = document.querySelector('.carousel-dots');
  
  let currentIndex = 0;
  let interval;
  
  const updateCarousel = () => {
    const cardWidth = cards[0].offsetWidth + 30;
    carousel.scrollTo({
      left: cardWidth * currentIndex,
      behavior: 'smooth'
    });
    updateDots();
  };
  
  const updateDots = () => {
    document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  };
  
  const createDots = () => {
    dotsContainer.innerHTML = '';
    cards.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.className = 'carousel-dot';
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => {
        currentIndex = i;
        updateCarousel();
      });
      dotsContainer.appendChild(dot);
    });
  };
  
  const startAutoScroll = () => {
    interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % cards.length;
      updateCarousel();
    }, 5000);
  };
  
  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    updateCarousel();
  });
  
  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % cards.length;
    updateCarousel();
  });
  
  carousel.addEventListener('mouseenter', () => clearInterval(interval));
  carousel.addEventListener('mouseleave', startAutoScroll);
  
  createDots();
  startAutoScroll();
}

function handleContactForm() {
  const form = document.getElementById('neditsContactForm');
  if (!form) return;
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('.submit-btn');
    const originalHTML = submitBtn.innerHTML;
    
    submitBtn.innerHTML = `
      <svg class="spinner" viewBox="0 0 50 50">
        <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" stroke-width="5"></circle>
      </svg>
      Sending...
    `;
    
    setTimeout(() => {
      submitBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
        Message Sent!
      `;
      form.reset();
      
      setTimeout(() => {
        submitBtn.innerHTML = originalHTML;
      }, 3000);
    }, 1500);
  });
}

function initFooter() {
  // Current year
  document.getElementById('current-year').textContent = new Date().getFullYear();
  
  // Newsletter form
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const submitBtn = this.querySelector('button');
      const originalHTML = submitBtn.innerHTML;
      
      submitBtn.innerHTML = `
        <svg class="spinner" viewBox="0 0 50 50">
          <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" stroke-width="5"></circle>
        </svg>
      `;
      
      setTimeout(() => {
        submitBtn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        `;
        
        const successMsg = document.createElement('p');
        successMsg.className = 'newsletter-success';
        successMsg.textContent = 'Thanks for subscribing!';
        this.appendChild(successMsg);
        
        setTimeout(() => {
          submitBtn.innerHTML = originalHTML;
          successMsg.remove();
        }, 3000);
      }, 1500);
    });
  }
}
