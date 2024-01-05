import React from "react";
import "./App.css";
import { fetchAllRepositories } from "../../services/github_graphql";
import type { Repository } from "../../types/repository";
import DropdownList from "../DropdownList/DropdownList";

export function App() {
  const [repoList, setRepoList] = React.useState<Repository[]>([]);

  React.useEffect(() => {
    fetchAllRepositories().then((data: Repository[]) => {
      setRepoList(data.reverse());
    });
  }, []);

  return (
    <div className="App-container">
      <DropdownList list={repoList} />
    </div>
  );
}
