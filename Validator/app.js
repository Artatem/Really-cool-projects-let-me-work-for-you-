const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");
const result = document.getElementById("results");
const number = document.getElementById("user-input");

const left = document.getElementById("left-side");

/*VALIDATOR*/
const check = () => {
  let input = number.value;
  if (input.length == 0) {
    return alert("Please provide a phone number");
  }

  const regexp = /(1{0,1})(\s)?(\-)?(\(\d{3}\)|\d{3})(\s)?(\-)?(\d{3})(\s)?(\-)?(\d{4})/gm;
  let matchedNumber = input.match(regexp);
  if (matchedNumber !== null && matchedNumber.join(" ") == input) {
    return (result.innerHTML = `Valid US number: </br>${input}`);
  } else {
    return (result.innerHTML = `Invalid US number: </br> ${input}`);
  }
};

const clear = () => {
  return (result.innerHTML = "");
};

checkBtn.addEventListener("click", check);
clearBtn.addEventListener("click", clear);


/*ANIMATIONS*/
const handleMove = (e) => {
  left.style.width = `${(e.clientX / window.innerWidth) * 100}%`;
};
document.onmousemove = (e) => handleMove(e);
document.ontouchmove = (e) => handleMove(e.touches[0]);

number.addEventListener("input", () => {
  if (number.value !== "") {
    number.classList.add("input_filled");
  } else {
    number.classList.remove("input_filled");
  }
});
