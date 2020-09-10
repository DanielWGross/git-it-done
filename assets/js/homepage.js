const userFormEl = document.querySelector("#user-form");
const nameInputEl = document.querySelector("#username");

const isEmpty = (arr) => !Array.isArray(arr) || arr.length === 0;

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

const displayRepos = (repos, searchTerm) => {
  const repoSearchTerm = document.querySelector("#repo-search-term");
  const repoContainerEl = document.querySelector("#repos-container");
  repoContainerEl.textContent = "";
  repoSearchTerm.textContent = searchTerm;

  if (isEmpty(repos)) {
    repoContainerEl.textContent = "No repositories found.";
    return;
  }

  repos.forEach((repo) => {
    const repoName = `${repo.owner.login}/${repo.name} `;

    const repoEl = document.createElement("a");
    repoEl.setAttribute("href", `./single-repo.html?repo=${repoName}`);
    repoEl.classList = "list-item flex-row justify-space-between align-center";

    const titleEl = document.createElement("span");
    titleEl.textContent = repoName;

    const statusEl = document.createElement("span");
    statusEl.classList = "flex-row align-center";

    statusEl.innerHTML =
      repo.open_issues_count > 0
        ? `<i class='fas fa-times status-icon icon-danger'></i> ${repo.open_issues_count} issue(s)`
        : `<i class='fas fa-check-square status-icon icon-success'></i>`;

    repoEl.appendChild(titleEl);
    repoEl.appendChild(statusEl);
    repoContainerEl.appendChild(repoEl);
  });
};

const getUserRepos = async (user) => {
  //   const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const targetUrl = `https://api.github.com/users/${user}/repos`;
  const response = await fetch(targetUrl).catch(() =>
    alert("Unable to connect GitHub")
  );
  if (response.ok) {
    const data = await response.json();
    displayRepos(data, user);
  } else {
    alert(`Error: ${response.statusText}`);
  }
};

const getFeaturedRepos = async (language) => {
  const targetUrl = `https://api.github.com/search/repositories?q=${language}+is:featured&sort=help-wanted-issues`;

  fetch(targetUrl);
};

getFeaturedRepos("javascript");

userFormEl.addEventListener("submit", formSubmitHandler);
