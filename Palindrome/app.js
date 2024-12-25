const button = document.getElementById('check-btn');
const result = document.getElementById('result');
const input = document.getElementById("text-input");

const compare = (word) => {
  word = word.toLowerCase();
  const alphanumeric = word.match(/[a-z0-9]/g);
  return alphanumeric.join('') === alphanumeric.reverse().join('');
}

const isPalindrome = () => {
  const word = input.value;
  if (word == '') {
    return alert("Please input a value");
  } else if(compare(word)) {
      return result.innerHTML = `<strong>${word}</strong> is a palindrome`;
  } else {
      return result.innerHTML = `<strong>${word}</strong> is not a palindrome`;
  }
}

button.addEventListener("click", isPalindrome);