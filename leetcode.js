const axios = require("axios");
const config = require("./config.json");

async function fetchProblemDetails(titleSlug) {
  const graphqlUrl = "https://leetcode.com/graphql";
  const query = `
        query getProblemDetails($titleSlug: String!) {
            question(titleSlug: $titleSlug) {
                questionId
                title
                difficulty
                topicTags {
                    name
                }
            }
        }
    `;

  try {
    const response = await axios.post(graphqlUrl, {
      query,
      variables: { titleSlug },
    });

    const question = response.data.data.question;

    return {
      id: question.questionId,
      name: question.title,
      difficulty: question.difficulty,
      tags: question.topicTags.map((tag) => tag.name),
    };
  } catch (error) {
    console.error("Error fetching problem details:", error.message);
    return null;
  }
}

async function fetchLeetCodeSubmissions() {
  const graphqlUrl = "https://leetcode.com/graphql";
  const query = `
        query recentAcSubmissions($username: String!) {
            recentAcSubmissionList(username: $username) {
                title
                titleSlug
                timestamp
            }
        }
    `;

  try {
    const response = await axios.post(graphqlUrl, {
      query,
      variables: {
        username: config.leetcodeUsername,
      },
    });

    const submissions = response.data.data.recentAcSubmissionList;

    // Fetch additional details for each submission
    const detailedSubmissions = [];
    for (const submission of submissions) {
      const details = await fetchProblemDetails(submission.titleSlug);
      if (details) {
        detailedSubmissions.push({
          name: details.name,
          link: `https://leetcode.com/problems/${submission.titleSlug}`,
          date: new Date(submission.timestamp * 1000).toISOString(),
          status: "Accepted",
          difficulty: details.difficulty,
          tags: details.tags,
          problemNumber: details.id,
        });
      }
    }

    return detailedSubmissions;
  } catch (error) {
    console.error("Error fetching LeetCode submissions:", error.message);
    return [];
  }
}

function filterTodaySubmissions(submissions) {
  const startOfToday = new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate()));
  const endOfToday = new Date(startOfToday);
  endOfToday.setUTCDate(startOfToday.getUTCDate() + 1);

  const resp = submissions.filter((submission) => {
      const submissionDate = new Date(submission.date); // LeetCode timestamps are in seconds
      return submissionDate >= startOfToday && submissionDate < endOfToday;
  });
  return resp;
}


module.exports = {
  fetchLeetCodeSubmissions,
  filterTodaySubmissions
}