import React from "react";
import "./App.css";
import { fetchAllRepositories } from "../../services/github_graphql";
import type { Repository } from "../../types/repository";
import type { Issue } from "../../types/issue";
import DropdownList from "../DropdownList/DropdownList";
import IssuesList from "../IssuesList/IssuesList";

const App: React.FC = () => {
  const [repoList, setRepoList] = React.useState<Repository[]>([]);
  const [issueList, setIssues] = React.useState<Issue[]>([]);
  const [isChosenRepo, setChose] = React.useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState<boolean>(false);
  const [repositoryName, setRepositoryName] = React.useState<string>("");

  React.useEffect(() => {
    fetchAllRepositories().then((data: Repository[]) => {
      setRepoList(data.reverse());
    });
  }, []);

  const handleIssuesChange = (newIssues: Issue[]) => {
    setIssues(newIssues);
  };

  const handleChooseRepo = (isChosen: boolean) => {
    setChose(isChosen);
    if (!isChosen) {
      setIssues([]);
    }
  };

  const handleOpen = (isOpen: boolean) => {
    setIsDropdownOpen(isOpen);
  };

  const handleRepoName = (repoName: string) => {
    setRepositoryName(repoName);
  }

  let content;

  if (issueList.length > 0) {
    content = <IssuesList list={issueList} repoName={repositoryName}/>;
  } else if (issueList.length === 0 && isChosenRepo) {
    content = <p>No issues available</p>;
  } else {
    content = <p>Chose repository</p>;
  }

  let contentClasses = "";
  if (isDropdownOpen) {
    contentClasses = "content-dropdown-open";
  }

  return (
    <div className="App-container">
      <DropdownList
        list={repoList}
        onIssuesChange={handleIssuesChange}
        onChose={handleChooseRepo}
        onOpen={handleOpen}
        repoName={handleRepoName}
      />
      <div className={`content ${contentClasses}`}>{content}</div>
    </div>
  );
};

export { App };
