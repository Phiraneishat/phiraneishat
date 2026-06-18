document.addEventListener("DOMContentLoaded", () => {
    // 1. Typewriter Effect
    const words = ["Full Stack Developer", "AI Enthusiast", "Software Systems Student"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingElement = document.getElementById("typing");

    function typeEffect() {
        if (!typingElement) return;

        const currentWord = words[wordIndex];
        if (isDeleting) {
            typingElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let delay = isDeleting ? 40 : 80;

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            delay = 2000; // pause at peak
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            delay = 400; // pause before typing next
        }

        setTimeout(typeEffect, delay);
    }
    
    // Start typewriter
    typeEffect();

    // 2. Mobile Menu Toggle
    const navMenu = document.getElementById("nav-menu");
    const navToggle = document.getElementById("nav-toggle");
    const navLinks = document.querySelectorAll(".nav-link");

    if (navToggle && navMenu) {
        navToggle.addEventListener("click", () => {
            navMenu.classList.toggle("active");
            // Change toggle icon
            const icon = navToggle.querySelector("i");
            if (icon.classList.contains("fa-bars-staggered")) {
                icon.className = "fa-solid fa-xmark";
            } else {
                icon.className = "fa-solid fa-bars-staggered";
            }
        });
    }

    // Close menu when links are clicked
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (navMenu) {
                navMenu.classList.remove("active");
            }
            if (navToggle) {
                const icon = navToggle.querySelector("i");
                if (icon) icon.className = "fa-solid fa-bars-staggered";
            }
        });
    });

    // 3. Scroll Reveal System
    const revealElements = document.querySelectorAll(".scroll-reveal");
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("reveal-visible");
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // 4. Stats Counter Animation
    const stats = document.querySelectorAll(".stat-number");
    const statObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = +entry.target.getAttribute("data-target");
                const duration = 1500; // 1.5 seconds animation
                const startTime = performance.now();
                
                function updateCount(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const easeValue = progress * (2 - progress); // Ease out quad
                    
                    entry.target.textContent = Math.floor(easeValue * target);
                    
                    if (progress < 1) {
                        requestAnimationFrame(updateCount);
                    } else {
                        entry.target.textContent = target + "+";
                    }
                }
                
                requestAnimationFrame(updateCount);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => statObserver.observe(stat));

    // 5. Active Link Highlight on Scroll
    const sections = document.querySelectorAll("section[id]");
    
    function highlightNav() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute("id");
            const navLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);
            
            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add("active-link");
                } else {
                    navLink.classList.remove("active-link");
                }
            }
        });
    }
    
    window.addEventListener("scroll", highlightNav);

    // 6. Back to Top Button
    const backToTop = document.getElementById("back-to-top");
    
    window.addEventListener("scroll", () => {
        if (window.scrollY > 400) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }
    });

    // 7. Form Submission Handling with Animation
    const contactForm = document.getElementById("contact-form");
    const formResult = document.getElementById("form-result");
    const btnSubmit = document.getElementById("btn-submit");

    if (contactForm && formResult && btnSubmit) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const message = document.getElementById("message").value.trim();
            
            if (!name || !email || !message) {
                formResult.textContent = "Please fill out all fields.";
                formResult.style.color = "#ef4444";
                return;
            }
            
            // Set loading state on button
            const originalBtnContent = btnSubmit.innerHTML;
            btnSubmit.disabled = true;
            btnSubmit.innerHTML = `
                <span>Sending...</span>
                <i class="fa-solid fa-circle-notch fa-spin"></i>
            `;
            formResult.textContent = "";

            // Simulate form submission API call
            setTimeout(() => {
                // Success State
                btnSubmit.innerHTML = `
                    <span>Sent!</span>
                    <i class="fa-solid fa-check"></i>
                `;
                btnSubmit.style.background = "linear-gradient(135deg, #10b981, #059669)";
                btnSubmit.style.boxShadow = "0 4px 15px rgba(16, 185, 129, 0.4)";
                
                formResult.textContent = "Thank you! Your message has been sent successfully. ✓";
                formResult.style.color = "#10b981";
                
                contactForm.reset();

                // Reset button after 3 seconds
                setTimeout(() => {
                    btnSubmit.disabled = false;
                    btnSubmit.innerHTML = originalBtnContent;
                    btnSubmit.style.background = "";
                    btnSubmit.style.boxShadow = "";
                    formResult.textContent = "";
                }, 3500);
            }, 1800);
        });
    }
});