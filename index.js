<script>
/* ------------------------------------------
   STAR BACKGROUND ANIMATION
------------------------------------------- */
const canvas = document.getElementById("star-canvas");
const ctx = canvas.getContext("2d");

let stars = [];
const numStars = 150;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

class Star {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2;
        this.speedX = (Math.random() - 0.5) * 0.2;
        this.speedY = (Math.random() - 0.5) * 0.2;
        this.opacity = Math.random();
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap movement
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;

        // Twinkle effect
        this.opacity += (Math.random() - 0.5) * 0.05;
        this.opacity = Math.min(Math.max(this.opacity, 0.1), 1);
    }

    draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initStars() {
    stars = [];
    for (let i = 0; i < numStars; i++) {
        stars.push(new Star());
    }
}

function animateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => {
        star.update();
        star.draw();
    });
    requestAnimationFrame(animateStars);
}

window.addEventListener("resize", () => {
    resizeCanvas();
    initStars();
});

resizeCanvas();
initStars();
animateStars();


/* ------------------------------------------
   COUNTER (STATS) ANIMATION
------------------------------------------- */
const stats = document.querySelectorAll(".stat-item h2");
const aboutSection = document.querySelector(".about-section");
let statsStarted = false;

function startCount(el) {
    const target = +el.dataset.target;
    let current = 0;

    // Duration = 1500ms → smooth
    const increment = Math.ceil(target / 80);

    const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(counter);
        }
        el.textContent = current + "+";
    }, 20);
}

// Trigger when section is visible
function handleScroll() {
    const sectionTop = aboutSection.offsetTop;
    const scrollPos = window.scrollY + window.innerHeight;

    if (scrollPos > sectionTop + 100 && !statsStarted) {
        stats.forEach(num => startCount(num));
        statsStarted = true;
    }
}

window.addEventListener("scroll", handleScroll);



</script>
