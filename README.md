---

# GitHub Issue Tracker Project

## Beginning of work

To run the project on your local computer, follow these steps:

- **1.Install dependencies:** npm install

- **2.Set up a GitHub token:**

Open the .env file.
Replace the placeholder for REACT_APP_GITHUB_TOKEN with your personal GitHub API access token.

- **3.Launch the application:** npm start

## Overview

The GitHub Issue Tracker project is a comprehensive solution for managing tasks within a GitHub repository. It empowers users to seamlessly view, add, and handle issues leveraging the GitHub GraphQL API. To use this tracker, add your GitHub token to the .env file.

## Functionality

- **Repository Loading:** Load repositories from GitHub using GraphQL.
- **Fetching Issues for a Repository:** Retrieve a list of issues for a specific repository using the GitHub API.
- **Adding Comments:** Easily add comments to individual issues.

## Project Structure

- **src/:** Application code
  - **components/:** React components
  - **services/:** Services for API interaction
  - **types/:** Data types and interfaces

## Technologies Used

- React.js
- GraphQL
- Ant Design

## Author

Dmitriy Prytyka

---
