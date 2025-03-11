


```
CREATE VIEW vw_TotalWorkHours AS
WITH ParsedClockData AS (
    SELECT 
        wrks_clocks,
        value AS record,
        PARSENAME(REPLACE(value, '&', '.'), 3) AS event_time,  -- Extract Time
        PARSENAME(REPLACE(value, '&', '.'), 2) AS event_date,  -- Extract Date
        PARSENAME(REPLACE(value, '&', '.'), 1) AS event_type   -- Extract Event Type
    FROM (
        SELECT wrks_clocks, 
               STRING_SPLIT(wrks_clocks, '~')  -- Split by "~" to separate records
        FROM WORK_SUMMARY
    ) AS SplitData
),
ProcessedTimes AS (
    SELECT 
        wrks_clocks,
        event_date,
        event_time,
        event_type,
        TRY_CAST(CONVERT(DATETIME, event_date + ' ' + event_time, 112) AS DATETIME) AS event_datetime
    FROM ParsedClockData
),
GroupedTimes AS (
    SELECT 
        wrks_clocks,
        MAX(CASE WHEN event_type LIKE '%ClockTag=P%' THEN event_datetime END) AS ClockInTime,
        MAX(CASE WHEN event_type LIKE '%ClockTag=F%' THEN event_datetime END) AS ClockOutTime,
        MAX(CASE WHEN event_type LIKE '%TCODE=MEAL%' THEN event_datetime END) AS MealStartTime,
        MAX(CASE WHEN event_type LIKE '%TCODE=MRK%' THEN event_datetime END) AS MealEndTime
    FROM ProcessedTimes
    GROUP BY wrks_clocks
)
SELECT 
    wrks_clocks,
    ClockInTime,
    ClockOutTime,
    MealStartTime,
    MealEndTime,
    DATEDIFF(MINUTE, ClockInTime, ClockOutTime) / 60.0 AS TotalWorkHours,
    DATEDIFF(MINUTE, MealStartTime, MealEndTime) / 60.0 AS MealDuration,
    (DATEDIFF(MINUTE, ClockInTime, ClockOutTime) - DATEDIFF(MINUTE, MealStartTime, MealEndTime)) / 60.0 AS NetWorkHours
FROM GroupedTimes;


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
