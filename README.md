


```

import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";

// Import all components
import Login from "./Login";
import Callback from "./Callback";
import VerifyEdit from "./VerifyEdit";
import Associate from "./Associate";
import TeamLeads from "./TeamLeads";
import KipAdmin from "./KipAdmin";
import KipView from "./KipView";
import KipApprove from "./KipApprove";
import SetUser from "./SetUser";
import KipList from "./KipList";
import NationalManager from "./NationalManager";
import BulkEntry from "./BulkEntry";
import SwipReport from "./SwipReport";
import InhouseReport from "./InhouseReport";
import ReportTable from "./ReportTable";
import ProtectedRoute from "./ProtectedRoute";

// Mapping of paths to components
const routeComponents = {
  "/": Login,
  "/callback": Callback,
  "/dashboard": VerifyEdit,
  "/associate": Associate,
  "/teamlead": TeamLeads,
  "/kpi": KipAdmin,
  "/kpi/view/:id": KipView,
  "/kpi/approve/:id": KipApprove,
  "/kpi/setuser/:id": SetUser,
  "/kpi/list": KipList,
  "/national-manager": NationalManager,
  "/bulkentry": BulkEntry,
  "/verifiedit": VerifyEdit,
  "/kpi/swipe-report": SwipReport,
  "/kpi/inhouse-report": InhouseReport,
  "/kpi/test-report": ReportTable
};

// Recursive function to extract all route paths from nested structure
const extractRoutes = (routes, parentPath = "") => {
  let extractedRoutes = [];

  routes.forEach(route => {
    const fullPath = `${parentPath}${route.path}`; // Construct full path

    extractedRoutes.push(fullPath);

    if (route.children && Array.isArray(route.children)) {
      extractedRoutes = [...extractedRoutes, ...extractRoutes(route.children, fullPath)];
    }
  });

  return extractedRoutes;
};

const DynamicRoutes = () => {
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    // Fetch route configuration from API
    axios.get("https://your-api-endpoint.com/routes") // Replace with your actual API URL
      .then(response => {
        const extractedRoutes = extractRoutes(response.data);
        const validRoutes = extractedRoutes.filter(path => routeComponents[path]); // Only include known routes
        setRoutes(validRoutes);
      })
      .catch(error => {
        console.error("Error fetching routes:", error);
      });
  }, []);

  return (
    <Routes>
      {routes.map((path, index) => {
        const Component = routeComponents[path];
        return Component ? (
          <Route key={index} path={path} element={<Component />} />
        ) : null;
      })}
    </Routes>
  );
};

export default DynamicRoutes;

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
