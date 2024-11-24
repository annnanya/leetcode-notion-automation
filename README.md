# LeetCode Notion Automation

## Overview
The **LeetCode Notion Automation** project automates the process of adding LeetCode submissions to a Notion database. It fetches the accepted submissions of a specified user from LeetCode using the public GraphQL API, filters the submissions for the current day, and adds them to a Notion database.

## Features
- Automatically fetches accepted submissions from LeetCode.
- Filters submissions for the current day.
- Adds submissions to a Notion database.
- Scheduled to run daily at 23:30 UTC using GitHub Actions.

## Prerequisites
- **Node.js**: Ensure you have Node.js (version 16 or above) installed on your machine.
- **Git**: Ensure you have Git installed for cloning the repository.
- **Notion Account**: Create a Notion account if you don’t have one.
- **LeetCode Account**: Create a LeetCode account if you don’t have one.

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/msn2106/leetcode-notion-automation.git
cd leetcode-notion-automation
```

### 2. Install Dependencies
Run the following command to install the required dependencies:
```bash
npm install
```

### 3. Configure Your Credentials
Create a config.json file in the root directory of the project with the following structure:
```json
{
  "leetcodeUsername": "your_leetcode_username",
  "notionApiKey": "your_notion_integration_token",
  "NOTION_DATABASE_NAME": "LeetCode Problems",
  "notionParentPageId": "your_notion_parent_page_id"
}
```
- leetcodeUsername: Your LeetCode username.
- notionApiKey: Your Notion integration token. You can create an integration in Notion and get the token from there.
- NOTION_DATABASE_NAME: The name of the database where submissions will be added.
- notionParentPageId: (Optional) The ID of the parent page where the database will be created.

### 4. Set Up Notion Integration
Go to your Notion workspace.
Create a new integration from Notion Integrations.
Copy the integration token and paste it into the notionApiKey field in config.json.
Share the database with the integration by going to the database settings and inviting the integration.

### 5. Testing the Script Locally
You can run the script locally to test if everything is set up correctly:
```bash
node index.js
```

This will fetch the recent accepted submissions and add them to your Notion database.

### 6. Set Up GitHub Actions for Daily Automation
To automate the process, you can set up GitHub Actions to run the script daily.

Go to your GitHub repository.
Navigate to Settings > Secrets and variables > Actions.
Click on New repository secret and add the following secrets:
LEETCODE_USERNAME: Your LeetCode username.
NOTION_API_KEY: Your Notion integration token.
NOTION_DATABASE_NAME: The name of the database (optional, can be hardcoded).
NOTION_PARENT_PAGE_ID: The ID of the parent page (optional, can be hardcoded).

### 7. Configure the GitHub Actions Workflow
The workflow file is already set up to run daily at 23:30 UTC. You can find it in the .github/workflows/daily-update.yml file. You may customize the schedule according to your preferences.

### 8. Commit and Push Your Changes
After setting everything up, commit your changes and push them to your GitHub repository:
```bash
git add .
git commit -m "Setup LeetCode Notion Automation"
git push origin main
```

### 9. Usage
Once everything is set up and the GitHub Actions workflow is configured, the script will run daily at the specified time, fetching the current day's accepted submissions from LeetCode and adding them to your Notion database.

Viewing Your Notion Database
You can view your submissions in the specified Notion database. The database will contain the following fields:

- Problem Name: The name of the problem.
- Problem Number: The ID of the problem.
- Link: A link to the problem on LeetCode.
- Submission Date: The date of the submission.
- Tags: Tags associated with the problem.
- Difficulty: The difficulty level of the problem.
- Status: The status of the submission (Accepted).

### 10. Contributing 
#### Contributing Contributions are welcome! If you would like to contribute to this project, please follow these steps:
- 1. Fork the Repository: Click on the "Fork" button at the top right of the repository page to create your own copy of the project.
- 2. Create a New Branch: Create a new branch for your feature or bug fix:
```bash
git checkout -b feature/your-feature-name
```
- 3. Make Your Changes: Implement your changes and ensure that the code is well-tested.
- 4. Commit Your Changes: Commit your changes with a descriptive message:
```bash
git commit -m "Add feature: your feature description"
```
- 5. Push to Your Fork: Push your changes to your forked repository:
```bash
git push origin feature/your-feature-name
```
- 6. Create a Pull Request: Go to the original repository and create a pull request from your forked repository.

### 11. License
This project is licensed under the MIT License. See the LICENSE file for details.

### 12. Acknowledgments
Thanks to the LeetCode team for providing the public GraphQL API.
Thanks to the Notion team for their API, which allows seamless integration with external applications.

### 13. Contact
For any questions or feedback, feel free to reach out via GitHub Issues or contact me directly at [msn2106@gmail.com].