import React from "react";
import "./App.css";
import { fetchGithubData } from "../services/github_graphql";

export function App() {
  React.useEffect(() => {
    const githubToken = process.env.REACT_APP_GITHUB_TOKEN;

    if (githubToken) {
      fetchGithubData(githubToken)
        .then((data) => {
          console.log(data)
        })
        .catch((error) => {
        
        });
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
