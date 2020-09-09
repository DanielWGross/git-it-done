const getUserRepos = async () => {
  const response = await fetch("https://api.github.com/users/octocat/repos");
  const data = await response.json();
  console.log(data);
};

getUserRepos();
