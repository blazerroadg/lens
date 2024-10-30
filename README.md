```
CREATE TABLE Requests (
    id INT PRIMARY KEY IDENTITY(1,1),
    dc_code VARCHAR(4) NOT NULL,
    request_number VARCHAR(6) NOT NULL UNIQUE
);
CREATE PROCEDURE GenerateRequestNumber
    @dc_code VARCHAR(4),
    @request_number VARCHAR(6) OUTPUT
AS
BEGIN
    DECLARE @lastTwoDigits VARCHAR(2)
    DECLARE @nextSequence INT
    SET @lastTwoDigits = RIGHT(@dc_code, 2)
    
    -- Find the max sequence number for the given DC
    SELECT @nextSequence = COALESCE(MAX(CAST(SUBSTRING(request_number, 3, 4) AS INT)), 0) + 1
    FROM Requests
    WHERE RIGHT(dc_code, 2) = @lastTwoDigits

    -- Format the request number as per the example
    SET @request_number = @lastTwoDigits + FORMAT(@nextSequence, 'D4')
    
    -- Insert the new request into the Requests table
    INSERT INTO Requests (dc_code, request_number)
    VALUES (@dc_code, @request_number)
END





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
