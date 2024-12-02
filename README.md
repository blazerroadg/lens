```

const gridOptions = {
  getRowStyle: params => {
    if (params.node.group) {
      return { background: '#f0f0f0', fontWeight: 'bold', color: '#000' };
    } else if (params.data && params.data.summary) {
      return { background: '#f7df8f', fontWeight: 'bold', borderTop: '1px solid #ccc' };
    }
    return null;
  },
};


const groupColumn = {
  headerName: 'Group',
  field: 'group',
  cellRenderer: 'agGroupCellRenderer',
  cellRendererParams: {
    innerRenderer: params => {
      return `<span style="color: #000; font-weight: bold;">${params.value}</span>`;
    },
  },
};

const rowData = [
  { group: 'SSTK Receiving Area', jobCode: '2030', volume: 26523, hours: 108, isSummary: false },
  { group: 'SSTK Receiving Area', jobCode: 'TOTAL', volume: 26523, hours: 108, isSummary: true },
];
const columnDefs = [
  { headerName: 'Job Code', field: 'jobCode', cellStyle: { textAlign: 'left' } },
  { headerName: 'Volume', field: 'volume', cellStyle: { fontWeight: 'bold', textAlign: 'right' } },
];
const gridOptions = {
  pinnedBottomRowData: [{ jobCode: 'TOTAL', volume: 26523, hours: 108 }],
};
.ag-theme-custom .ag-header-cell {
  background-color: #f7df8f;
  font-weight: bold;
}
.ag-theme-custom .ag-row {
  border-bottom: 1px solid #ccc;
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
