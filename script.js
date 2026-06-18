document.addEventListener("DOMContentLoaded", () => {

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
            delay = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            delay = 400;
        }

        setTimeout(typeEffect, delay);
    }


    typeEffect();


    const navMenu = document.getElementById("nav-menu");
    const navToggle = document.getElementById("nav-toggle");
    const navLinks = document.querySelectorAll(".nav-link");

    if (navToggle && navMenu) {
        navToggle.addEventListener("click", () => {
            navMenu.classList.toggle("active");

            const icon = navToggle.querySelector("i");
            if (icon.classList.contains("fa-bars-staggered")) {
                icon.className = "fa-solid fa-xmark";
            } else {
                icon.className = "fa-solid fa-bars-staggered";
            }
        });
    }


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


    const stats = document.querySelectorAll(".stat-number");
    const statObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = +entry.target.getAttribute("data-target");
                const duration = 1500;
                const startTime = performance.now();

                function updateCount(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const easeValue = progress * (2 - progress);

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


    const backToTop = document.getElementById("back-to-top");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 400) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }
    });


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

            const originalBtnContent = btnSubmit.innerHTML;
            btnSubmit.disabled = true;
            btnSubmit.innerHTML = `
                <span>Opening Gmail...</span>
                <i class="fa-solid fa-circle-notch fa-spin"></i>
            `;
            formResult.textContent = "";

            try {
                // Construct subject and body for Gmail
                const subject = `Portfolio Contact from ${name}`;
                const body = `Hello Phiraneish A.T,\n\nYou have received a new message via your portfolio contact form:\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
                
                // Construct direct Gmail Compose link
                const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=phiraneish2006@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                
                // Open Gmail in a new tab
                window.open(gmailUrl, "_blank");

                btnSubmit.innerHTML = `
                    <span>Opened!</span>
                    <i class="fa-solid fa-check"></i>
                `;
                btnSubmit.style.background = "linear-gradient(135deg, #10b981, #059669)";
                btnSubmit.style.boxShadow = "0 4px 15px rgba(16, 185, 129, 0.4)";

                formResult.textContent = "Gmail composer opened in a new tab! ✓";
                formResult.style.color = "#10b981";
                contactForm.reset();
            } catch (error) {
                btnSubmit.innerHTML = `
                    <span>Failed</span>
                    <i class="fa-solid fa-xmark"></i>
                `;
                btnSubmit.style.background = "linear-gradient(135deg, #ef4444, #dc2626)";
                btnSubmit.style.boxShadow = "0 4px 15px rgba(239, 68, 68, 0.4)";

                formResult.textContent = "Could not open Gmail. Please try again or email directly.";
                formResult.style.color = "#ef4444";
            }

            setTimeout(() => {
                btnSubmit.disabled = false;
                btnSubmit.innerHTML = originalBtnContent;
                btnSubmit.style.background = "";
                btnSubmit.style.boxShadow = "";
                formResult.textContent = "";
            }, 3500);
        });
    }
});