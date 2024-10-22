```
;


WITH Punches AS (
    SELECT
        User_ID,
        Date,
        MIN(CASE WHEN Record_Type = 'In Punch' THEN Swipe_Time END) AS In_Punch,
        MAX(CASE WHEN Record_Type = 'Out Punch' THEN Swipe_Time END) AS Out_Punch
    FROM your_table
    GROUP BY User_ID, Date
),
Breaks AS (
    SELECT
        User_ID,
        Date,
        SUM(DATEDIFF(MINUTE, Punch_To_Break, Return_From_Break)) AS Break_Duration
    FROM (
        SELECT
            User_ID,
            Date,
            MIN(CASE WHEN Record_Type = 'Punch to Break' THEN Swipe_Time END) AS Punch_To_Break,
            MAX(CASE WHEN Record_Type = 'Return from Break' THEN Swipe_Time END) AS Return_From_Break
        FROM your_table
        WHERE Record_Type IN ('Punch to Break', 'Return from Break')
        GROUP BY User_ID, Date, Record_Type
    ) AS BreakPairs
    WHERE Punch_To_Break IS NOT NULL AND Return_From_Break IS NOT NULL
    GROUP BY User_ID, Date
)
SELECT
    p.User_ID,
    p.Date,
    DATEDIFF(MINUTE, p.In_Punch, p.Out_Punch) - COALESCE(b.Break_Duration, 0) AS Total_Working_Minutes,
    (DATEDIFF(MINUTE, p.In_Punch, p.Out_Punch) - COALESCE(b.Break_Duration, 0)) / 60.0 AS Total_Working_Hours
FROM Punches p
LEFT JOIN Breaks b ON p.User_ID = b.User_ID AND p.Date = b.Date;



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
