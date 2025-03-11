


```
CREATE VIEW vw_TotalWorkHours AS
WITH ParsedClockData AS (
    -- Step 1: Split wrks_clocks by '~' (assuming ~ separates entries)
    SELECT 
        ws.wrks_clocks, 
        TRIM(value) AS record
    FROM WORK_SUMMARY AS ws
    CROSS APPLY STRING_SPLIT(ws.wrks_clocks, '~') AS SplitData
),
ProcessedTimes AS (
    -- Step 2: Extract ActionTime and EventType
    SELECT 
        wrks_clocks,
        
        -- Extract ActionTime (14-digit datetime in YYYYMMDDHHMMSS format)
        TRY_CAST(
            SUBSTRING(record, CHARINDEX('ActionTime=', record) + 11, 14) AS DATETIME
        ) AS EventDateTime,
        
        -- Identify event type (Clock In, Clock Out, Meal Start, Meal End)
        CASE 
            WHEN record LIKE '%ClockTag=P%' THEN 'ClockIn'
            WHEN record LIKE '%ClockTag=F%' THEN 'ClockOut'
            WHEN record LIKE '%TCODE=MEAL%' THEN 'MealStart'
            WHEN record LIKE '%TCODE=MRK%' THEN 'MealEnd'
            ELSE NULL 
        END AS EventType
    FROM ParsedClockData
    WHERE record LIKE '%ActionTime=%' -- Ensure only valid entries are processed
),
GroupedTimes AS (
    -- Step 3: Pivot the extracted data to get one row per shift
    SELECT 
        wrks_clocks,
        MAX(CASE WHEN EventType = 'ClockIn' THEN EventDateTime END) AS ClockInTime,
        MAX(CASE WHEN EventType = 'ClockOut' THEN EventDateTime END) AS ClockOutTime,
        MAX(CASE WHEN EventType = 'MealStart' THEN EventDateTime END) AS MealStartTime,
        MAX(CASE WHEN EventType = 'MealEnd' THEN EventDateTime END) AS MealEndTime
    FROM ProcessedTimes
    GROUP BY wrks_clocks
)
-- Step 4: Compute Work Hours
SELECT 
    wrks_clocks,
    ClockInTime,
    ClockOutTime,
    MealStartTime,
    MealEndTime,
    
    -- Total work duration
    DATEDIFF(MINUTE, ClockInTime, ClockOutTime) / 60.0 AS TotalWorkHours,
    
    -- Meal break duration
    DATEDIFF(MINUTE, MealStartTime, MealEndTime) / 60.0 AS MealDuration,
    
    -- Net work hours (Total Work - Meal Breaks)
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
