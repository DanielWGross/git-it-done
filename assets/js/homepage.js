const userFormEl = document.querySelector("#user-form");
const nameInputEl = document.querySelector("#username");

const formSubmitHandler = (event) => {
  event.preventDefault();
  const username = nameInputEl.value.trim();

  if (username) {
    getUserRepos(username);
    nameInputEl.value = "";
  } else {
    alert("Please enter a GitHub username");
  }
};

const getUserRepos = async (user) => {
  const response = await fetch(`https://api.github.com/users/${user}/repos`);
  const data = await response.json();
  console.log(data);
};

userFormEl.addEventListener("submit", formSubmitHandler);
