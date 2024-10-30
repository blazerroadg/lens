```

async generateRequestNumber(dcCode: string): Promise<string> {
        return await this.dataSource.transaction(async (manager) => {
            const lastTwoDigits = dcCode.slice(-2);

            // Fetch the latest sequence number for the given `dcCode`
            const lastRequest = await manager
                .createQueryBuilder(Request, 'request')
                .where("RIGHT(request.dcCode, 2) = :lastTwoDigits", { lastTwoDigits })
                .orderBy("request.requestNumber", "DESC")
                .getOne();

            // Determine the next sequence number
            let nextSequence: number;
            if (lastRequest) {
                // Extract the numeric part of the last request number and increment it
                const lastSequence = parseInt(lastRequest.requestNumber.slice(2));
                nextSequence = lastSequence + 1;
            } else {
                // Start with 1 if no previous request exists for the given dcCode
                nextSequence = 1;
            }

            // Determine the minimum digit length (starts with 3 digits)
            const sequenceLength = Math.max(3, String(nextSequence).length);

            // Format the request number as per the requirement, adjusting digits dynamically
            const requestNumber = `${lastTwoDigits}${String(nextSequence).padStart(sequenceLength, '0')}`;

            // Save the new request
            const newRequest = manager.create(Request, { dcCode, requestNumber });
            await manager.save(newRequest);

            return requestNumber;
        });
    }

@Get('generate')
    async generateRequestNumber(@Query('dcCode') dcCode: string): Promise<string> {
        return await this.requestService.generateRequestNumber(dcCode);
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
