import React from "react";
import "./App.css";
import { fetchAllRepositories } from "../services/github_graphql";

const githubToken = process.env.REACT_APP_GITHUB_TOKEN;

export function App() {
  React.useEffect(() => {
    if (githubToken) {
      fetchAllRepositories(githubToken, "etopritika")
        .then((data:any) => {
          console.log(data)
        })
    } else {
      console.error('GitHub token is not defined');
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
