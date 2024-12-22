// initialization

const RESPONSIVE_WIDTH = 1024;

let headerWhiteBg = false;
let isHeaderCollapsed = window.innerWidth < RESPONSIVE_WIDTH;
const collapseBtn = document.getElementById("collapse-btn");
const collapseHeaderItems = document.getElementById("collapsed-header-items");

function onHeaderClickOutside(e) {
    if (!collapseHeaderItems.contains(e.target)) {
        toggleHeader();
    }
}

function toggleHeader() {
    if (isHeaderCollapsed) {
        collapseHeaderItems.classList.add("opacity-100");
        collapseHeaderItems.style.width = "60vw";
        collapseBtn.classList.remove("bi-list");
        collapseBtn.classList.add("bi-x", "max-lg:tw-fixed");
        isHeaderCollapsed = false;

        setTimeout(() => window.addEventListener("click", onHeaderClickOutside), 1);
    } else {
        collapseHeaderItems.classList.remove("opacity-100");
        collapseHeaderItems.style.width = "0vw";
        collapseBtn.classList.remove("bi-x", "max-lg:tw-fixed");
        collapseBtn.classList.add("bi-list");
        isHeaderCollapsed = true;
        window.removeEventListener("click", onHeaderClickOutside);
    }
}

function responsive() {
    if (window.innerWidth > RESPONSIVE_WIDTH) {
        collapseHeaderItems.style.width = "";
    } else {
        isHeaderCollapsed = true;
    }
}

let resizeTimeout;
window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(responsive, 100); // Throttle resize events
});

/**
 * Animations
 */

gsap.registerPlugin(ScrollTrigger);

const isMobile = window.innerWidth < RESPONSIVE_WIDTH;
const animationDuration = isMobile ? 0.5 : 0.8; // Shorter duration for mobile

gsap.to(".reveal-hero-text", {
    opacity: 0,
    y: "100%",
});

window.addEventListener("load", () => {
    // animate from initial position
    gsap.to(".reveal-hero-text", {
        opacity: 1,
        y: "0%",
        duration: animationDuration,
        stagger: 0.5,
    });
});

// ------------- reveal section animations ---------------

const sections = gsap.utils.toArray("section");

if (!isMobile) { // Skip animations on mobile
    sections.forEach((sec) => {
        const revealUptimeline = gsap.timeline({
            paused: true,
            scrollTrigger: {
                trigger: sec,
                start: "10% 80%", // top of trigger hits the top of viewport
                end: "20% 90%",
            }
        });

        const staggerAmount = isMobile ? 0 : 0.2; // No stagger on mobile

        revealUptimeline.to(sec.querySelectorAll(".reveal-up"), {
            opacity: 1,
            duration: animationDuration,
            y: "0%",
            stagger: staggerAmount,
        });
    });
}
