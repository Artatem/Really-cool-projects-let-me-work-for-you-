const card = document.getElementById("card");
const gloss = document.getElementById("gloss");

card.addEventListener("mousemove", (e) => {
  const pointerX = e.clientX;
  const pointerY = e.clientY;
  const cardRect = card.getBoundingClientRect();

  const halfWidth = cardRect.width / 2;
  const halfHeight = cardRect.height / 2;

  const cardCenterX = cardRect.left + halfWidth;
  const cardCenterY = cardRect.top + halfHeight;

  const deltaX = pointerX - cardCenterX;
  const deltaY = pointerY - cardCenterY;

  const distanceToCenter = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
  const maxDistance = Math.max(halfWidth, halfHeight);

  const degree = (distanceToCenter * 10) / maxDistance;
  const rx = deltaY / halfHeight;
  const ry = deltaX / halfWidth;

  card.style.transform = `perspective(400px) rotate3d(${-rx}, ${ry}, 0, ${degree}deg)`;

  gloss.style.transform = `translate(${-ry * 100}%, ${-rx * 100}%) scale(2.4)`;
  gloss.style.opacity = (distanceToCenter * 0.6) / maxDistance;
});

card.addEventListener("mouseleave", () => {
  card.style.transform = null;
  gloss.style.opacity = 0;
});

/*converter function*/
const convertBtn = document.getElementById("convert-btn");
convertBtn.addEventListener("click", convert);
const output = document.getElementById("output");
const res = document.querySelector(".hidden");
function convert() {
  let number = document.getElementById("number").value;

  res.style.opacity = 1;

  if (number.length == 0) {
    return (output.innerHTML = "Please enter a valid number");
  }
  if (number < 1) {
    return (output.innerHTML =
      "Please enter a number greater than or equal to 1");
  }
  if (number > 3999) {
    return (output.innerHTML =
      "Please enter a number less than or equal to 3999");
  }

  let ans = [
    { threshold: 1000, char: "M" },
    { threshold: 900, char: "CM" },
    { threshold: 500, char: "D" },
    { threshold: 400, char: "CD" },
    { threshold: 100, char: "C" },
    { threshold: 90, char: "XC" },
    { threshold: 50, char: "L" },
    { threshold: 40, char: "XL" },
    { threshold: 10, char: "X" },
    { threshold: 9, char: "IX" },
    { threshold: 5, char: "V" },
    { threshold: 4, char: "IV" },
    { threshold: 1, char: "I" }
  ].reduce(function (prev, curr, idx, arr) {
    while (number >= curr.threshold) {
      prev += curr.char;
      number -= curr.threshold;
    }

    return prev;
  }, "");

  return (output.innerHTML = `<strong>${ans}</strong>`);
}

/*converter animation*/
let converter = document.getElementById("converter");
const letters = "MDCXLIV";
let interval = null;

converter.onmouseover = (event) => {
  conv(event);
};

function conv(event) {
  let iteration = 0;

  clearInterval(interval);

  interval = setInterval(() => {
    event.target.innerText = event.target.innerText
      .split("")
      .map((letter, index) => {
        if (index < iteration) {
          return event.target.dataset.value[index];
        }

        return letters[Math.floor(Math.random() * 6)];
      })
      .join("");

    if (iteration >= event.target.dataset.value.length) {
      clearInterval(interval);
    }

    iteration += 1 / 3;
  }, 80);
}
