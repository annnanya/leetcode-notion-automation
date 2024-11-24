
const config = require("./config.json");
const { fetchLeetCodeSubmissions, filterTodaySubmissions } = require('./leetcode.js');
const { getOrCreateNotionDatabase, addSubmissionsToNotion } = require("./notion.js");

async function main() {
  const submissions = await fetchLeetCodeSubmissions();
  console.log(`Recent AC Submissions found : ${submissions.length}`);
  const currentDaySubmissions = filterTodaySubmissions(submissions);
  console.log(`Current Day AC Submissions found : ${currentDaySubmissions.length}`);
  if (!currentDaySubmissions.length) {
    console.log("No submissions found.");
    return;
  }

  const databaseId = await getOrCreateNotionDatabase();
  await addSubmissionsToNotion(databaseId, currentDaySubmissions);
  console.log(`Current Day Submissions added to Notion. Submissions: ${JSON.stringify(currentDaySubmissions)}`);
}

main();