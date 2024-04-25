import * as functions from "firebase-functions";
import axios, {isAxiosError} from "axios";
import * as cors from "cors";

import {config} from "./config";

const corsHandler = cors({origin: true});

export const getReposSortedByForks = functions.https.onRequest(
  async (request, response) => {
    corsHandler(request, response, async () => {
      const orgName = request.query.orgName as string;
      const {gitHubToken} = config;

      if (!orgName) {
        response.status(400).send("Organization name is required.");
        return;
      }

      const apiUrl = `https://api.github.com/orgs/${orgName}/repos`;

      try {
        const axiosResponse = await axios.get(apiUrl, {
          headers: {
            Authorization: `token ${gitHubToken}`,
            Accept: "application/vnd.github.v3+json",
          },
        });

        const sortedRepos = axiosResponse.data.sort(
          (a: any, b: any) => b.forks_count - a.forks_count
        );
        response.send(sortedRepos);
      } catch (error) {
        if (isAxiosError(error)) {
          console.error(
            "Failed to fetch repositories:",
            error.response?.status
          );
          response
            .status(500)
            .send("Failed to fetch repositories due to server error.");
        } else {
          console.error(`Unexpected error: ${error}`);
          response.status(500).send("Unexpected server error.");
        }
      }
    });
  }
);
