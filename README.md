```
 // src/config/configuration.ts
export default () => ({
  sso: {
    pingFedEnv: process.env.pingFedEnv,
    pingFedClient: process.env.pingFedClient,
    pingFedClientHash: process.env.pingFedClientHash,
    pingFedRedirectURL: process.env.pingFedRedirectURL,
    pingFedCookieName: process.env.pingFedCookieName,
    clientCookieName: process.env.clientCookieName,
    cookieDomain: process.env.cookieDomain,
    redirectRoute: process.env.redirectRoute,
    redirectWFRoute: process.env.redirectWFRoute,
    akeylessAccessId: process.env.akeylessAccessId,
    akeylessKey: process.env.akeylessKey,
  },
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    server: process.env.MSSQL_CA_WEB_SERVER,
    port: parseInt(process.env.MSSQL_CA_WEB_PORT, 10) || 1433,
    database: process.env.MSSQL_CA_WEB_DATABASE,
    domain: process.env.MSSQL_CA_WEB_DOMAIN,
    user: process.env.MSSQL_CA_WEB_USERID,
    password: process.env.MSSQL_CA_WEB_PASSWORD,
  },
});


// src/config/config.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true, // Makes the ConfigService available globally
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class CustomConfigModule {}

// src/app.module.ts
import { Module } from '@nestjs/common';
import { CustomConfigModule } from './config/config.module';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [CustomConfigModule],
})
export class AppModule {
  constructor(private configService: ConfigService) {
    const ssoConfig = this.configService.get('sso');
    const dbConfig = this.configService.get('database');
    const appPort = this.configService.get<number>('port');

    console.log('SSO Configuration:', ssoConfig);
    console.log('Database Configuration:', dbConfig);
    console.log('Application Port:', appPort);
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
