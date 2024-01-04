import React from "react";
import Notiflix from "notiflix";
import "./App.css";
import { fetchAllRepositories } from "../../services/github_graphql";
import type { Repository } from "../../types/repository";
import DropdownList from "../DropdownList/DropdownList";

const githubToken = process.env.REACT_APP_GITHUB_TOKEN;

export function App() {
  const [repoList, setRepoList] = React.useState<Repository[]>([]);

  React.useEffect(() => {
    if (githubToken) {
      fetchAllRepositories(githubToken, "etopritika").then(
        (data: Repository[]) => {
          setRepoList(data.reverse());
        }
      );
    } else {
      Notiflix.Notify.failure("GitHub token is not defined");
    }
  }, []);

  return (
    <div className="App-container">
      <DropdownList list={repoList}/>
    </div>
  );
}
