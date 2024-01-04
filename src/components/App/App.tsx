import React from "react";
import "./App.css";
import { fetchAllRepositories } from "../../services/github_graphql";
import type { Repository } from "../../types/repository";
import DropdownList from "../DropdownList/DropdownList";

const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export function App() {
  const [repoList, setRepoList] = React.useState<Repository[]>([]);

  React.useEffect(() => {
    if(GITHUB_TOKEN){
      fetchAllRepositories(GITHUB_TOKEN, "etopritika").then(
        (data: Repository[]) => {
          setRepoList(data.reverse());
        }
      );
    }
  }, []);

  return (
    <div className="App-container">
      <DropdownList list={repoList} />
    </div>
  );
}
