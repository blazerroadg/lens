```

import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const ReportTable = () => {
  const columnDefs = [
    { headerName: 'Job Code', field: 'jobCode', width: 200 },
    { headerName: 'Volume', field: 'volume', valueFormatter: params => params.value.toLocaleString(), width: 120 },
    { headerName: 'Hours', field: 'hours', width: 100 },
    { headerName: 'Plan', field: 'plan', width: 100 },
    { headerName: 'CPH', field: 'cph', width: 100 },
  ];

  const rowData = [
    { group: 'SSTK Receiving Area', jobCode: '2030 1002', volume: 26523, hours: 108, plan: 33, cph: 265.23, isSummary: false },
    { group: 'SSTK Receiving Area', jobCode: '2030 1030', volume: 1924, hours: 50, plan: 12, cph: 56.58, isSummary: false },
    { group: 'SSTK Receiving Area', jobCode: 'TOTAL', volume: 28447, hours: 158, plan: 45, cph: 321.81, isSummary: true },
    { group: 'DA Receiving Area', jobCode: '2030 1040', volume: 8841, hours: 36, plan: 11, cph: 88.41, isSummary: false },
    { group: 'DA Receiving Area', jobCode: 'TOTAL', volume: 8841, hours: 36, plan: 11, cph: 88.41, isSummary: true },
  ];

  const gridOptions = {
    getRowStyle: params => {
      if (params.node.group) {
        return { backgroundColor: '#f0f0f0', fontWeight: 'bold', borderBottom: '2px solid #ddd' };
      } else if (params.data && params.data.isSummary) {
        return { backgroundColor: '#f7df8f', fontWeight: 'bold', borderTop: '1px solid #000' };
      }
      return null;
    },
  };

  const autoGroupColumnDef = {
    headerName: 'Group',
    cellRendererParams: {
      suppressCount: false,
      innerRenderer: params => `<span style="font-weight: bold;">${params.value}</span>`,
    },
  };

  return (
    <div
      className="ag-theme-alpine"
      style={{
        height: '600px',
        width: '100%',
      }}
    >
      <AgGridReact
        columnDefs={columnDefs}
        rowData={rowData}
        gridOptions={gridOptions}
        autoGroupColumnDef={autoGroupColumnDef}
        groupUseEntireRow
        groupDefaultExpanded={-1}
      />
    </div>
  );
};

export default ReportTable;





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
