const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");
const themeToggle = document.getElementById("themeToggle");

let input = "";
let memory = 0;

// Update display
function updateDisplay(value) {
  display.value = value;
}

// Button click handling
buttons.forEach(btn => {
  const val = btn.dataset.value;
  const action = btn.dataset.action;
  const func = btn.dataset.func;

  btn.addEventListener("click", () => {
    if (val) handleInput(val);
    if (action) handleMemory(action);
    if (func) handleFunction(func);
  });
});

function handleInput(value) {
  if (value === "C") {
    input = "";
    updateDisplay("");
  } else if (value === "DEL") {
    input = input.slice(0, -1);
    updateDisplay(input);
  } else if (value === "=") {
    try {
      const result = Function("return " + input.replace(/×/g, "*").replace(/÷/g, "/"))();
      updateDisplay(result);
      input = result.toString();
    } catch {
      updateDisplay("Error");
      input = "";
    }
  } else {
    input += value;
    updateDisplay(input);
  }
}

// Memory handling
function handleMemory(action) {
  if (action === "MC") memory = 0;
  if (action === "MR") updateDisplay(memory);
  if (action === "M+") memory += parseFloat(display.value) || 0;
  if (action === "M-") memory -= parseFloat(display.value) || 0;
}

// Scientific operations
function handleFunction(f) {
  let val = parseFloat(display.value);
  if (isNaN(val)) return;
  switch (f) {
    case "sqrt": val = Math.sqrt(val); break;
    case "square": val = Math.pow(val, 2); break;
    case "pi": input += Math.PI.toFixed(4); updateDisplay(input); return;
    case "sin": val = Math.sin(val * Math.PI / 180); break;
    case "cos": val = Math.cos(val * Math.PI / 180); break;
    case "tan": val = Math.tan(val * Math.PI / 180); break;
  }
  input = val.toString();
  updateDisplay(input);
}

// Keyboard input
window.addEventListener("keydown", e => {
  const key = e.key;
  if (/\d|\+|\-|\*|\/|\./.test(key)) {
    input += key;
    updateDisplay(input);
  } else if (key === "Enter") {
    try {
      const result = Function("return " + input)();
      updateDisplay(result);
      input = result.toString();
    } catch {
      updateDisplay("Error");
      input = "";
    }
  } else if (key === "Backspace") {
    input = input.slice(0, -1);
    updateDisplay(input);
  } else if (key === "Escape") {
    input = "";
    updateDisplay("");
  }
});

// Dark/Light mode toggle
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  themeToggle.textContent = document.body.classList.contains("light") ? "☀️" : "🌙";
});
