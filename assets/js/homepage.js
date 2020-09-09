const getUserRepos = async (user) => {
  const response = await fetch(`https://api.github.com/users/${user}/repos`);
  const data = await response.json();
  console.log(data);
};

getUserRepos("DanielWGross");
