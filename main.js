document.getElementById('issueInputForm').addEventListener('submit', submitIssue);

function submitIssue(e) {
  const getInputValue = id => document.getElementById(id).value;
  const description = getInputValue('issueDescription');
  const severity = getInputValue('issueSeverity');
  const assignedTo = getInputValue('issueAssignedTo');
  const id = Math.floor(Math.random()*100000000) + '';
  const status = 'Open';

  const issue = { id, description, severity, assignedTo, status };
  let issues = [];
  if (localStorage.getItem('issues')){
    issues = JSON.parse(localStorage.getItem('issues'));
  }
  issues.push(issue);
  localStorage.setItem('issues', JSON.stringify(issues));

  document.getElementById('issueInputForm').reset();
  fetchIssues();
  e.preventDefault();
  totalIssues();
}
const setStatusClosed = (event, id) => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const currentIssue = issues.find(issue => issue.id == id);
  currentIssue.status = 'Closed';
  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
  document.getElementById(`issue-title-${id}`).style.textDecoration = "line-through"
}

const deleteIssue = (event, id) => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const remainingIssues = issues.filter( issue => issue.id != id );
  localStorage.setItem('issues', JSON.stringify(remainingIssues));
  document.getElementById(`issue-card-${id}`).style.display = 'none';
  totalIssues();
}

function totalIssues() {
  const allIssues = JSON.parse(localStorage.getItem("issues"));
  let issuesNum = 0;
  if (allIssues == null) {
    issuesNum = 0;
  } else {
    for (var i = 0; i < allIssues.length; i++) {
      issuesNum++;
    }
  }
  document.getElementById("total-issues").innerText = `/${issuesNum}`
};
totalIssues();

const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const issuesList = document.getElementById('issuesList');
  issuesList.innerHTML = '';

  for (var i = 0; i < issues.length; i++) {
    const {id, description, severity, assignedTo, status} = issues[i];

    issuesList.innerHTML +=   `<div class="well" id="issue-card-${id}">
                              <h6>Issue ID: ${id} </h6>
                              <p><span class="label label-info"> ${status} </span></p>
                              <h3 id="issue-title-${id}"> ${description} </h3>
                              <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                              <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                              <a href="#" onclick="setStatusClosed(event, ${id})" class="btn btn-warning">Close</a>
                              <a href="#" onclick="deleteIssue(event, ${id})" class="btn btn-danger">Delete</a>
                              </div>`;
  }
}

if (localStorage.getItem("issues") != null) {
  document.body.addEventListener("load", fetchIssues());
}