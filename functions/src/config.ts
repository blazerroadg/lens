import * as functions from "firebase-functions";

export const config = {
  gitHubToken: functions.config().lens.github_token,
};
