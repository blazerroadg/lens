```

using System;
using System.Globalization;

public override void Input0_ProcessInputRow(Input0Buffer Row)
{
    // Split the RawData string by the '~' delimiter
    string[] records = Row.RawData.Split('~');
    
    DateTime? clockInTime = null;
    DateTime? clockOutTime = null;
    DateTime? mealStartTime = null;
    DateTime? mealEndTime = null;

    // Loop through each separated record to identify event types and timestamps
    foreach (string record in records)
    {
        // Skip empty or whitespace-only records
        if (string.IsNullOrWhiteSpace(record))
            continue;

        // Parse Date and Time from the record
        if (record.Length >= 18)
        {
            string date = record.Substring(4, 8);  // Extract date (e.g., "20120111")
            string time = record.Substring(12, 6); // Extract time (e.g., "085700")
            DateTime dateTime;

            // Convert the date and time strings to a DateTime object
            if (DateTime.TryParseExact(date + time, "yyyyMMddHHmmss", CultureInfo.InvariantCulture, DateTimeStyles.None, out dateTime))
            {
                // Determine the Event Type and assign to the correct variable
                if (record.EndsWith("01"))
                {
                    clockInTime = dateTime;
                }
                else if (record.EndsWith("02"))
                {
                    clockOutTime = dateTime;
                }
                else if (record.EndsWith("06"))
                {
                    if (record.Contains("TTCODE=MEAL"))
                    {
                        mealStartTime = dateTime;
                    }
                    else if (record.Contains("TTCODE=WRK"))
                    {
                        mealEndTime = dateTime;
                    }
                }
            }
        }
    }

    // Calculate Net Working Hours if Clock In and Clock Out are present
    if (clockInTime.HasValue && clockOutTime.HasValue)
    {
        TimeSpan totalWorkDuration = clockOutTime.Value - clockInTime.Value;
        TimeSpan mealDuration = TimeSpan.Zero;

        // Calculate Meal Duration if Meal Start and End times are present
        if (mealStartTime.HasValue && mealEndTime.HasValue)
        {
            mealDuration = mealEndTime.Value - mealStartTime.Value;
        }

        // Calculate Net Working Hours (Total Work Duration - Meal Duration)
        TimeSpan netWorkingHours = totalWorkDuration - mealDuration;

        // Output the result as total working hours in hours
        Output0Buffer.AddRow();
        Output0Buffer.WorkingHours = netWorkingHours.TotalHours;
    }
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
