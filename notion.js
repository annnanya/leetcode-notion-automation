
const config = require("./config.json");
const { Client } = require("@notionhq/client");

const notion = new Client({ auth: config.notionApiKey });

async function getOrCreateNotionDatabase() {
  try {
    // List databases to check existence
    const databases = await notion.search({
      query: config.NOTION_DATABASE_NAME,
    });
    if (databases.results.length > 0) return databases.results[0].id;

    // Create new database
    const response = await notion.databases.create({
      parent: { type: "page_id", page_id: config.notionParentPageId },
      title: [{ type: "text", text: { content: config.NOTION_DATABASE_NAME } }],
      properties: {
        Name: { title: {} },
        Link: { url: {} },
        Status: {
          select: {
            options: [
              { name: "Accepted", color: "green" },
              { name: "Wrong Answer", color: "red" },
            ],
          },
        },
        Date: { date: {} },
      },
    });

    return response.id;
  } catch (error) {
    console.error("Error setting up Notion database:", error);
    throw error;
  }
}

async function addSubmissionToNotion(databaseId, submission) {
  try {
    await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        // Correctly define the Problem Name field (as a title)
        "Problem Name": {
          title: [
            {
              text: { content: submission.name || "Untitled Problem" }, // Provide fallback if name is missing
            },
          ],
        },
        // Correctly define the Problem Number field (as a number)
        "Problem Number": {
          number: parseInt(submission.problemNumber) || null, // Ensure null if no problem number is provided
        },
        // Correctly define the Link field (as a URL)
        Link: {
          url: submission.link || null, // Ensure null if no link is provided
        },
        // Correctly define the Submission Date field (as a date)
        "Submission Date": {
          date: submission.date
            ? { start: submission.date } // Ensure date is properly structured
            : null,
        },
        // Correctly define the Tags field (as a multi-select)
        Tags: {
          multi_select: submission.tags
            ? submission.tags.map((tag) => ({ name: tag }))
            : [],
        },
        // Correctly define the Difficulty field (as a select)
        Difficulty: {
          select: submission.difficulty
            ? { name: submission.difficulty }
            : null,
        },
        // Correctly define the Status field (as a select)
        Status: {
          select: submission.status ? { name: submission.status } : null,
        },
      },
    });

    console.log(`Added "${submission.name}" to Notion successfully.`);
  } catch (error) {
    console.error("Error adding submission to Notion:", error.message);
  }
}

async function addSubmissionsToNotion(databaseId, submissions) {
  for (const submission of submissions) {
    await addSubmissionToNotion(databaseId, submission);
  }
}

module.exports = {
  getOrCreateNotionDatabase,
  addSubmissionsToNotion
}