/* =========================================================
   ZAIN IT SOLUTIONS
   MAIN JAVASCRIPT
========================================================= */


/* =========================================================
   DOM ELEMENTS
========================================================= */

const header = document.getElementById("header");
const mobileMenu = document.getElementById("mobileMenu");
const navigation = document.getElementById("navigation");


/* =========================================================
   HEADER SCROLL EFFECT
========================================================= */

function handleHeaderScroll() {

    if (!header) return;

    if (window.scrollY > 30) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

}

window.addEventListener("scroll", handleHeaderScroll);

handleHeaderScroll();


/* =========================================================
   MOBILE MENU
========================================================= */

if (mobileMenu && navigation) {

    mobileMenu.addEventListener("click", () => {

        navigation.classList.toggle("open");

        const icon = mobileMenu.querySelector("i");

        if (!icon) return;

        if (navigation.classList.contains("open")) {

            icon.classList.remove("fa-bars");

            icon.classList.add("fa-xmark");

            mobileMenu.setAttribute(
                "aria-label",
                "Close Menu"
            );

        } else {

            icon.classList.remove("fa-xmark");

            icon.classList.add("fa-bars");

            mobileMenu.setAttribute(
                "aria-label",
                "Open Menu"
            );

        }

    });

}


/* =========================================================
   CLOSE MOBILE MENU AFTER CLICK
========================================================= */

document.querySelectorAll(".navigation a")
    .forEach(link => {

        link.addEventListener("click", () => {

            if (!navigation) return;

            navigation.classList.remove("open");

            if (mobileMenu) {

                const icon =
                    mobileMenu.querySelector("i");

                if (icon) {

                    icon.classList.remove("fa-xmark");

                    icon.classList.add("fa-bars");

                }

                mobileMenu.setAttribute(
                    "aria-label",
                    "Open Menu"
                );

            }

        });

    });


/* =========================================================
   CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
========================================================= */

document.addEventListener("click", (event) => {

    if (!navigation || !mobileMenu) return;

    const clickedInsideMenu =
        navigation.contains(event.target);

    const clickedMenuButton =
        mobileMenu.contains(event.target);

    if (
        navigation.classList.contains("open") &&
        !clickedInsideMenu &&
        !clickedMenuButton
    ) {

        navigation.classList.remove("open");

        const icon =
            mobileMenu.querySelector("i");

        if (icon) {

            icon.classList.remove("fa-xmark");

            icon.classList.add("fa-bars");

        }

        mobileMenu.setAttribute(
            "aria-label",
            "Open Menu"
        );

    }

});


/* =========================================================
   CLOSE MOBILE MENU ON RESIZE
========================================================= */

window.addEventListener("resize", () => {

    if (
        window.innerWidth > 900 &&
        navigation
    ) {

        navigation.classList.remove("open");

        if (mobileMenu) {

            const icon =
                mobileMenu.querySelector("i");

            if (icon) {

                icon.classList.remove("fa-xmark");

                icon.classList.add("fa-bars");

            }

            mobileMenu.setAttribute(
                "aria-label",
                "Open Menu"
            );

        }

    }

});


/* =========================================================
   FAQ ACCORDION
========================================================= */

const faqItems =
    document.querySelectorAll(".faq-item");


faqItems.forEach(item => {

    const question =
        item.querySelector(".faq-question");

    const answer =
        item.querySelector(".faq-answer");

    if (!question || !answer) return;


    question.addEventListener("click", () => {

        const isActive =
            item.classList.contains("active");


        /* Close all other FAQ items */

        faqItems.forEach(otherItem => {

            if (otherItem !== item) {

                otherItem.classList.remove("active");

                const otherAnswer =
                    otherItem.querySelector(".faq-answer");

                if (otherAnswer) {

                    otherAnswer.style.maxHeight = null;

                }

            }

        });


        /* Toggle current item */

        if (isActive) {

            item.classList.remove("active");

            answer.style.maxHeight = null;

        } else {

            item.classList.add("active");

            answer.style.maxHeight =
                answer.scrollHeight + "px";

        }

    });

});


/* =========================================================
   REVEAL ON SCROLL
========================================================= */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(

        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },

        {
            threshold: 0.12
        }

    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =========================================================
   ACTIVE NAVIGATION ON SCROLL
========================================================= */

const sections =
    document.querySelectorAll("section[id]");

const navLinks =
    document.querySelectorAll(".navigation a");


function updateActiveNavigation() {

    let currentSection = "";


    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 150;

        const sectionHeight =
            section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        const href =
            link.getAttribute("href");

        if (
            href === "#" + currentSection
        ) {

            link.classList.add("active");

        }

    });

}


window.addEventListener(
    "scroll",
    updateActiveNavigation
);

updateActiveNavigation();


/* =========================================================
   SMOOTH SCROLL
========================================================= */

document.querySelectorAll('a[href^="#"]')
    .forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");


            if (
                !targetId ||
                targetId === "#"
            ) {

                return;

            }


            const target =
                document.querySelector(targetId);


            if (!target) return;


            event.preventDefault();


            const headerHeight =
                header
                    ? header.offsetHeight
                    : 0;


            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;


            window.scrollTo({

                top: targetPosition,

                behavior: "smooth"

            });

        });

    });


/* =========================================================
   BUTTON RIPPLE EFFECT
========================================================= */

document.querySelectorAll(".btn")
    .forEach(button => {

        button.addEventListener("click", function(event) {

            const ripple =
                document.createElement("span");

            const rect =
                this.getBoundingClientRect();

            const size =
                Math.max(
                    rect.width,
                    rect.height
                );


            ripple.style.width =
                size + "px";

            ripple.style.height =
                size + "px";

            ripple.style.position =
                "absolute";

            ripple.style.left =
                (event.clientX - rect.left - size / 2) +
                "px";

            ripple.style.top =
                (event.clientY - rect.top - size / 2) +
                "px";

            ripple.style.borderRadius =
                "50%";

            ripple.style.background =
                "rgba(255,255,255,0.15)";

            ripple.style.transform =
                "scale(0)";

            ripple.style.pointerEvents =
                "none";

            ripple.style.animation =
                "buttonRipple 0.6s ease-out";


            this.style.position =
                "relative";

            this.style.overflow =
                "hidden";


            this.appendChild(ripple);


            setTimeout(() => {

                ripple.remove();

            }, 600);

        });

    });


/* =========================================================
   ADD RIPPLE ANIMATION
========================================================= */

const rippleStyle =
    document.createElement("style");

rippleStyle.textContent = `

    @keyframes buttonRipple {

        0% {
            transform: scale(0);
            opacity: 1;
        }

        100% {
            transform: scale(2);
            opacity: 0;
        }

    }

`;

document.head.appendChild(rippleStyle);


/* =========================================================
   FLOATING CARDS
========================================================= */

const floatingCards =
    document.querySelectorAll(".floating-card");


floatingCards.forEach((card, index) => {

    const direction =
        index % 2 === 0 ? 1 : -1;


    let startTime = null;


    function floatAnimation(timestamp) {

        if (!startTime) {
            startTime = timestamp;
        }


        const elapsed =
            timestamp - startTime;


        const movement =
            Math.sin(elapsed / 1200) * 7 * direction;


        card.style.transform =
            `translateY(${movement}px)`;


        requestAnimationFrame(
            floatAnimation
        );

    }


    requestAnimationFrame(
        floatAnimation
    );

});


/* =========================================================
   HERO PARALLAX
========================================================= */

const hero =
    document.querySelector(".hero");

const heroBackground =
    document.querySelector(".hero-background");


if (hero && heroBackground) {

    window.addEventListener("scroll", () => {

        const scroll =
            window.scrollY;


        if (scroll < hero.offsetHeight) {

            heroBackground.style.transform =
                `translateY(${scroll * 0.15}px)`;

        }

    });

}


/* =========================================================
   IMAGE LOAD EFFECT
========================================================= */

const images =
    document.querySelectorAll("img");


images.forEach(image => {

    image.addEventListener("load", () => {

        image.classList.add("loaded");

    });

});


/* =========================================================
   EXTERNAL LINKS
========================================================= */

document.querySelectorAll(
    'a[target="_blank"]'
).forEach(link => {

    link.setAttribute(
        "rel",
        "noopener noreferrer"
    );

});


/* =========================================================
   CURRENT YEAR
========================================================= */

const copyrightText =
    document.querySelector(".copyright span");


if (copyrightText) {

    const currentYear =
        new Date().getFullYear();


    copyrightText.innerHTML =
        `© ${currentYear} Zain. All Rights Reserved.`;

}


/* =========================================================
   PREVENT EMPTY HASH LINKS
========================================================= */

document.querySelectorAll('a[href="#"]')
    .forEach(link => {

        link.addEventListener("click", event => {

            event.preventDefault();

        });

    });


/* =========================================================
   CONSOLE MESSAGE
========================================================= */

console.log(
    "%c ZAIN IT SOLUTIONS ",
    "background:#1685ff;color:#fff;padding:8px 14px;border-radius:6px;font-weight:800;"
);

console.log(
    "Website initialized successfully."
);