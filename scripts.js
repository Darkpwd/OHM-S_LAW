// Theme toggle functionality
const themeToggle = document.querySelector(".theme-toggle");
const body = document.body;

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  themeToggle.textContent = body.classList.contains("dark-mode") ? "☀️" : "🌙";
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Calculator functionality
function calculate(type) {
  const voltage = parseFloat(document.getElementById("voltage").value);
  const current = parseFloat(document.getElementById("current").value);
  const resistance = parseFloat(document.getElementById("resistance").value);
  const resultDiv = document.getElementById("result");
  const powerDiv = document.getElementById("power-result");
  let result;
  let power;

  switch (type) {
    case "voltage":
      if (!isNaN(current) && !isNaN(resistance)) {
        result = current * resistance;
        power = result * current;
        resultDiv.textContent = `Voltage = ${result.toFixed(2)} V`;
        powerDiv.textContent = `Power (P) = ${power.toFixed(2)} Watts`;
        updateCircuitVisualization(result, current, resistance);
      } else {
        resultDiv.textContent = "Please enter current and resistance values";
      }
      break;
    case "current":
      if (!isNaN(voltage) && !isNaN(resistance)) {
        result = voltage / resistance;
        power = voltage * result;
        resultDiv.textContent = `Current = ${result.toFixed(2)} A`;
        powerDiv.textContent = `Power (P) = ${power.toFixed(2)} Watts`;
        updateCircuitVisualization(voltage, result, resistance);
      } else {
        resultDiv.textContent = "Please enter voltage and resistance values";
      }
      break;
    case "resistance":
      if (!isNaN(voltage) && !isNaN(current)) {
        result = voltage / current;
        power = voltage * current;
        resultDiv.textContent = `Resistance = ${result.toFixed(2)} Ω`;
        powerDiv.textContent = `Power (P) = ${power.toFixed(2)} Watts`;
        updateCircuitVisualization(voltage, current, result);
      } else {
        resultDiv.textContent = "Please enter voltage and current values";
      }
      break;
  }
}

// Interactive Circuit Animation
const canvas = document.getElementById("circuit-canvas");
const ctx = canvas.getContext("2d");
let animationFrame;

function updateCircuitVisualization(voltage, current, resistance) {
  if (!canvas) return;

  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  // Cancel previous animation
  if (animationFrame) {
    cancelAnimationFrame(animationFrame);
  }

  const electrons = [];
  const electronCount = Math.min(Math.ceil(current * 10), 50);

  for (let i = 0; i < electronCount; i++) {
    electrons.push({
      x: Math.random() * canvas.width,
      y: canvas.height / 2,
      speed: current * 2,
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw circuit
    ctx.beginPath();
    ctx.moveTo(50, canvas.height / 2);
    ctx.lineTo(canvas.width - 50, canvas.height / 2);
    ctx.strokeStyle = "#2563eb";
    ctx.lineWidth = 3;
    ctx.stroke();

    // Draw electrons
    electrons.forEach((electron) => {
      ctx.beginPath();
      ctx.arc(electron.x, electron.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = "#f59e0b";
      ctx.fill();

      electron.x += electron.speed;
      if (electron.x > canvas.width - 50) {
        electron.x = 50;
      }
    });

    animationFrame = requestAnimationFrame(animate);
  }

  animate();
}

// Interactive demo controls
const voltageSlider = document.getElementById("voltage-slider");
const resistanceSlider = document.getElementById("resistance-slider");
const voltageValue = document.getElementById("voltage-value");
const resistanceValue = document.getElementById("resistance-value");
const currentReading = document.getElementById("current-reading");
const powerReading = document.getElementById("power-reading");

function updateInteractiveDemo() {
  const voltage = parseFloat(voltageSlider.value);
  const resistance = parseFloat(resistanceSlider.value);
  const current = voltage / resistance;
  const power = voltage * current;

  voltageValue.textContent = voltage.toFixed(1) + "V";
  resistanceValue.textContent = resistance.toFixed(0) + "Ω";
  currentReading.textContent = current.toFixed(3) + "A";
  powerReading.textContent = power.toFixed(2) + "W";

  updateCircuitAnimation(voltage, current);
}

voltageSlider.addEventListener("input", updateInteractiveDemo);
resistanceSlider.addEventListener("input", updateInteractiveDemo);

// Example loading
function loadExample(type) {
  const examples = {
    led: {
      voltage: 5,
      current: 0.02,
      resistance: 150,
    },
    battery: {
      voltage: 9,
      current: 0.09,
      resistance: 100,
    },
    charger: {
      voltage: 5,
      current: 2,
      resistance: 2.5,
    },
  };

  const example = examples[type];
  document.getElementById("voltage").value = example.voltage;
  document.getElementById("current").value = example.current;
  document.getElementById("resistance").value = example.resistance;

  calculate("voltage");
  document.querySelector("#calculator").scrollIntoView({ behavior: "smooth" });
}

// Circuit animation
function updateCircuitAnimation(voltage, current) {
  const circuitAnimation = document.getElementById("circuit-animation");
  if (!circuitAnimation) return;

  // Clear previous animation
  circuitAnimation.innerHTML = "";

  // Create electron particles
  const particleCount = Math.min(Math.ceil(current * 10), 20);

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "electron-particle";
    particle.style.cssText = `
            position: absolute;
            width: 8px;
            height: 8px;
            background-color: #f59e0b;
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            animation: flow ${2 / current}s linear infinite;
            animation-delay: ${(i / particleCount) * (2 / current)}s;
        `;
    circuitAnimation.appendChild(particle);
  }
}

// Resource modal
function showResourceModal(type) {
  const modal = document.getElementById("resource-modal");
  const content = document.getElementById("modal-content");
  const resources = {
    basics: {
      title: "Electronics Basics",
      content: `
                <h3>Understanding Electronic Components</h3>
                <ul>
                    <li>Resistors: Control current flow</li>
                    <li>Capacitors: Store electrical charge</li>
                    <li>Inductors: Store energy in magnetic fields</li>
                </ul>
            `,
    },
    safety: {
      title: "Safety Guidelines",
      content: `
                <h3>Working Safely with Electronics</h3>
                <ul>
                    <li>Always disconnect power before working on circuits</li>
                    <li>Use appropriate safety equipment</li>
                    <li>Never exceed component ratings</li>
                </ul>
            `,
    },
    calculations: {
      title: "Advanced Calculations",
      content: `
                <h3>Beyond Ohm's Law</h3>
                <ul>
                    <li>Power calculations: P = V × I</li>
                    <li>Energy consumption: E = P × t</li>
                    <li>Heat dissipation: P = I²R</li>
                </ul>
            `,
    },
  };

  const resource = resources[type];
  content.innerHTML = `
        <h2>${resource.title}</h2>
        ${resource.content}
    `;
  modal.style.display = "block";
}

// Close modal
document.querySelector(".close-modal").addEventListener("click", () => {
  document.getElementById("resource-modal").style.display = "none";
});

window.addEventListener("click", (e) => {
  const modal = document.getElementById("resource-modal");
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// Add animation to example cards on scroll
const observerOptions = {
  threshold: 0.2,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

document.querySelectorAll(".example-card").forEach((card) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(20px)";
  card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  observer.observe(card);
});

// Highlight active navigation section
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-links a");

  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (window.pageYOffset >= sectionTop - 100) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").substring(1) === current) {
      link.classList.add("active");
    }
  });
});
