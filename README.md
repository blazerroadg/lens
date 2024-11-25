```

@Controller('reports')
export class ReportsController {
    constructor(private readonly reportsService: ReportsService) {}

    @Get('inhouse')
    async getInhouseReport(
        @Query('startDate') startDate?: string,
        @Query('endDate') endDate?: string,
        @Query('dc') dc?: number,
        @Query('department') department?: number,
        @Query('jobcode') jobcode?: number,
        @Query('jobcodeType') jobcodeType?: string,
        @Query('dcType') dcType?: string,
        @Query('region') region?: string,
        @Query('shift') shift?: number,
        @Query('schedule') schedule?: number,
        @Query('throughputCode') throughputCode?: number
    ): Promise<any> {
        const params = {
            startDate,
            endDate,
            dc,
            department,
            jobcode,
            jobcodeType,
            dcType,
            region,
            shift,
            schedule,
            throughputCode,
        };
        return await this.reportsService.getInhouseReport(params);
    }
}

@Injectable()
export class ReportsService {
    constructor(private readonly dataSource: DataSource) {}

    async getInhouseReport(params: any): Promise<any[]> {
        try {
            const queryParams = [
                params.startDate || null,
                params.endDate || null,
                params.dc || null,
                params.department || null,
                params.jobcode || null,
                params.jobcodeType || null,
                params.dcType || null,
                params.region || null,
                params.shift || null,
                params.schedule || null,
                params.throughputCode || null,
            ];

            const result = await this.dataSource.query(
                `EXEC spGetInhouseReport 
                @startDate = @0, 
                @endDate = @1, 
                @dc = @2, 
                @department = @3, 
                @jobcode = @4, 
                @jobcodeType = @5, 
                @dcType = @6, 
                @region = @7, 
                @shift = @8, 
                @schedule = @9, 
                @throughputCode = @10`,
                queryParams
            );

            return result;
        } catch (error) {
            console.error('Error executing stored procedure', error);
            throw error;
        }
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
