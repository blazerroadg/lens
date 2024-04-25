import * as functions from "firebase-functions";
import axios, {isAxiosError} from "axios";
import {config} from "./config";
import * as cors from "cors";

const corsHandler = cors({origin: true});

export const fetchCommitsForRepo = functions.https.onRequest(
  async (request, response) => {
    corsHandler(request, response, async () => {
      const orgName = request.query.orgName as string;
      const repoName = request.query.repoName as string;

      if (!orgName || !repoName) {
        response
          .status(400)
          .send("Organization name and repository name are required.");
        return;
      }
      const {gitHubToken} = config;

      const apiUrl = `https://api.github.com/repos/${orgName}/${repoName}/commits?per_page=30`;

      try {
        const axiosResponse = await axios.get(apiUrl, {
          headers: {
            Authorization: `token ${gitHubToken}`,
            Accept: "application/vnd.github.v3+json",
          },
        });

        const commits = axiosResponse.data.map((commit: any) => ({
          author: commit.commit.author.name,
          message: commit.commit.message,
          url: commit.html_url,
        }));
        response.send(commits);
      } catch (error) {
        if (isAxiosError(error)) {
          console.error(
            `Failed to fetch commits for repository ${repoName}:`,
            error.response?.status
          );
        } else {
          console.error(`Unexpected error: ${error}`);
        }
        response
          .status(500)
          .send("Failed to fetch commits due to server error.");
      }
    });
  }
);
