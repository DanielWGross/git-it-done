const getRepoIssues = async (repo) => {
  const apiUrl = `https://api.github.com/repos/${repo}/issues?direction=asc`;
  const response = await fetch(apiUrl).catch(() =>
    alert("Unable to connect GitHub")
  );
  if (response.ok) {
    const data = await response.json();
    co;
  } else {
    alert(`Error: ${response.statusText}`);
  }
};

getRepoIssues("facebook/react");
