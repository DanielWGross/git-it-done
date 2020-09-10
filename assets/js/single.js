const isEmpty = (arr) => !Array.isArray(arr) || arr.length === 0;

const getRepoIssues = async (repo) => {
  const apiUrl = `https://api.github.com/repos/${repo}/issues?direction=asc`;
  const response = await fetch(apiUrl).catch(() =>
    alert("Unable to connect GitHub")
  );
  if (response.ok) {
    const data = await response.json();
    displayIssues(data);

    if (response.headers.get("Link")) {
      displayWarning(repo);
    }
  } else {
    alert(`Error: ${response.statusText}`);
  }
};

const displayIssues = (issues) => {
  const issuesContainerEl = document.querySelector("#issues-container");

  if (isEmpty(issues)) {
    issuesContainerEl.textContent = "This repo has no open issues!";
    return;
  }

  issues.forEach((issue) => {
    const issueEl = document.createElement("a");
    issueEl.classList = "list-item flex-row justify-space-between align-center";
    issueEl.setAttribute("href", issue.html_url);
    issueEl.setAttribute("target", "_blank");

    const titleEl = document.createElement("span");
    titleEl.textContent = issue.title;
    issueEl.appendChild(titleEl);

    const typeEl = document.createElement("span");

    typeEl.textContent = issue.pull_request ? "(Pull request)" : "(Issue)";

    issueEl.appendChild(typeEl);
    issuesContainerEl.appendChild(issueEl);
  });
};

const displayWarning = (repo) => {
  const limitWarningEl = document.querySelector("#limit-warning");
  limitWarningEl.textContent = "To see more than 30 issues, visit ";
  const linkEl = document.createElement("a");
  linkEl.textContent = "See More Issues on GitHub.com";
  linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");
  linkEl.setAttribute("target", "_blank");
  limitWarningEl.appendChild(linkEl);
};

getRepoIssues("angular/angular");
