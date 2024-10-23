```
public override void Input0_ProcessInputRow(Input0Buffer Row)
{
    // Sample input format:
    // XX2022041503000001~XX2022041507000002~XX2022041512000006 (Clock In, Clock Out, Meal/Break)
    
    string[] records = Row.wrks_clocks.Split('~');
    DateTime clockIn = DateTime.MinValue;
    DateTime clockOut = DateTime.MinValue;
    TimeSpan mealDuration = TimeSpan.Zero;

    foreach (string record in records)
    {
        // Extract type and time from the record
        string type = record.Substring(record.Length - 2, 2); // Last 2 chars
        string timeString = record.Substring(2, 14); // YYYYMMDDHHMMSS format
        
        // Convert to DateTime
        DateTime time = DateTime.ParseExact(timeString, "yyyyMMddHHmmss", null);

        if (type == "01") // Clock In
        {
            clockIn = time;
        }
        else if (type == "02") // Clock Out
        {
            clockOut = time;
        }
        else if (type == "06") // Meal/Break
        {
            // Assuming each meal/break entry indicates a span from start to end.
            DateTime mealStart = time;
            DateTime mealEnd = clockOut; // Replace with actual end time from record parsing
            mealDuration += (mealEnd - mealStart);
        }
    }

    if (clockIn != DateTime.MinValue && clockOut != DateTime.MinValue)
    {
        TimeSpan totalWorkTime = clockOut - clockIn - mealDuration;
        Row.TotalHours = (decimal)totalWorkTime.TotalHours;
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
