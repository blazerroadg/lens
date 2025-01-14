


```
import axios from 'axios';
import { BASE_PATH_TPR } from '../utils/Constant';

const axiosInstance = axios.create({
  baseURL: BASE_PATH_TPR,
  withCredentials: true, // Ensure cookies are sent with requests
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (token) {
      prom.resolve(token);
    } else {
      prom.reject(error);
    }
  });
  failedQueue = [];
};

axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = getCookie('access_token'); // Replace this with your function to get the cookie
    const isTokenExpired = checkTokenExpiry(accessToken); // Check token expiration

    if (isTokenExpired) {
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const response = await axios.post(`${BASE_PATH_TPR}/auth/refresh`, {}, { withCredentials: true });
          const newAccessToken = response.data.access_token;

          // Update the cookie or store the token
          setCookie('access_token', newAccessToken); // Replace this with your cookie-setting logic

          processQueue(null, newAccessToken);
        } catch (err) {
          processQueue(err, null);
          throw err;
        } finally {
          isRefreshing = false;
        }
      }

      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: (token: string) => {
            if (config.headers) {
              config.headers['Authorization'] = `Bearer ${token}`;
            }
            resolve(config);
          },
          reject: (err: any) => {
            reject(err);
          },
        });
      });
    }

    // Add the token to the headers
    if (accessToken && config.headers) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized! Redirecting to login...');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

// Helper Functions
function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}

function setCookie(name: string, value: string): void {
  document.cookie = `${name}=${value}; path=/;`;
}

function checkTokenExpiry(token: string | null): boolean {
  if (!token) return true; // No token means it's expired or invalid
  const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
  const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
  return payload.exp < currentTime;
}


```


# Getting Started with Create React App

# LIVE DEMO
https://lens-20b4b.web.app/

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
z
### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
