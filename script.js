// HappyMyTrip - Main JavaScript

// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
  });

  // Close menu when clicking on a link
  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      hamburger.classList.remove('active');
    });
  });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
  } else {
    navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
  }
});

// Tab switching for search forms
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const targetTab = btn.getAttribute('data-tab');
    
    // Remove active class from all buttons and contents
    tabBtns.forEach(b => b.classList.remove('active'));
    tabContents.forEach(c => c.classList.remove('active'));
    
    // Add active class to clicked button and corresponding content
    btn.classList.add('active');
    const targetContent = document.getElementById(targetTab);
    if (targetContent) {
      targetContent.classList.add('active');
    }
  });
});

// Filter functionality for destinations and packages
const filterBtns = document.querySelectorAll('.filter-btn');
const filterItems = document.querySelectorAll('[data-category]');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const filterValue = btn.getAttribute('data-filter');
    
    // Update active button
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    // Filter items
    filterItems.forEach(item => {
      if (filterValue === 'all' || item.getAttribute('data-category').includes(filterValue)) {
        item.style.display = 'block';
        item.style.animation = 'fadeIn 0.5s';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// Form validation
const forms = document.querySelectorAll('form');

forms.forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(form);
    
    // Basic validation
    let isValid = true;
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    
    inputs.forEach(input => {
      if (!input.value.trim()) {
        isValid = false;
        input.style.borderColor = 'red';
        
        // Reset border color after 2 seconds
        setTimeout(() => {
          input.style.borderColor = '';
        }, 2000);
      }
    });
    
    if (isValid) {
      // Show success message
      alert('Thank you! Your request has been submitted successfully. We will contact you soon.');
      form.reset();
    } else {
      alert('Please fill in all required fields.');
    }
  });
});

// Newsletter subscription
const newsletterForm = document.querySelector('.newsletter-form');

if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input[type="email"]').value;
    
    if (email) {
      alert(`Thank you for subscribing! We'll send travel deals to ${email}`);
      newsletterForm.reset();
    }
  });
}

// Scroll reveal animation
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe elements for scroll animation
document.querySelectorAll('.service-card, .destination-card, .testimonial-card, .package-card').forEach(el => {
  observer.observe(el);
});

// Set current year in footer
const yearElement = document.querySelector('.footer-bottom p');
if (yearElement) {
  const currentYear = new Date().getFullYear();
  yearElement.textContent = `© ${currentYear} HappyMyTrip. All rights reserved.`;
}

// Image lazy loading fallback
document.querySelectorAll('img[data-src]').forEach(img => {
  img.src = img.getAttribute('data-src');
  img.removeAttribute('data-src');
});

// Price formatter
function formatPrice(price) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price);
}

// Date picker min date (today)
const dateInputs = document.querySelectorAll('input[type="date"]');
const today = new Date().toISOString().split('T')[0];

dateInputs.forEach(input => {
  input.setAttribute('min', today);
});

// Search form enhancement
const searchForms = document.querySelectorAll('.search-form');

searchForms.forEach(form => {
  const departureInput = form.querySelector('input[type="date"]:first-of-type');
  const returnInput = form.querySelector('input[type="date"]:last-of-type');
  
  if (departureInput && returnInput) {
    departureInput.addEventListener('change', () => {
      returnInput.setAttribute('min', departureInput.value);
    });
  }
});

// Testimonial slider (if needed)
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-card');

function showTestimonial(index) {
  testimonials.forEach((testimonial, i) => {
    if (i === index) {
      testimonial.style.display = 'block';
    } else {
      testimonial.style.display = 'none';
    }
  });
}

// Auto-rotate testimonials (optional)
if (testimonials.length > 0) {
  setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    // showTestimonial(currentTestimonial);
  }, 5000);
}

// Back to top button
const backToTopBtn = document.createElement('button');
backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTopBtn.className = 'back-to-top';
backToTopBtn.style.cssText = `
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  background: var(--primary-color);
  color: var(--secondary-color);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: none;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
  transition: all 0.3s;
  z-index: 999;
`;

document.body.appendChild(backToTopBtn);

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopBtn.style.display = 'flex';
  } else {
    backToTopBtn.style.display = 'none';
  }
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

backToTopBtn.addEventListener('mouseenter', () => {
  backToTopBtn.style.transform = 'translateY(-5px)';
});

backToTopBtn.addEventListener('mouseleave', () => {
  backToTopBtn.style.transform = 'translateY(0)';
});

console.log('HappyMyTrip website loaded successfully! ✈️');
console.log('Brand Color: #ffce07');