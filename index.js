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
const titleAnimationDuration = 0.3; // Faster duration for title section
const contentAnimationDuration = 0.4; // Slightly longer for other content

// Animate title section immediately on load
window.addEventListener("load", () => {
    // Animate title text
    gsap.to(".reveal-hero-text", {
        opacity: 1,
        y: "0%",
        duration: titleAnimationDuration,
        stagger: 0.1, // Quick stagger for a dynamic effect
    });

    // Animate other sections with scroll trigger
    const sections = gsap.utils.toArray(".reveal-up");
    sections.forEach((sec) => {
        gsap.from(sec, {
            opacity: 0,
            y: "50%", // Start from below
            duration: contentAnimationDuration,
            scrollTrigger: {
                trigger: sec,
                start: "top bottom", // Trigger when top of section hits bottom of viewport
                toggleActions: "play none none reverse", // Play on enter, reverse on leave
            }
        });
    });
});
