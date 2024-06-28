```
// auth/oauth2.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-oauth2';
import * as jwtDecode from 'jwt-decode';
import { AuthService } from './auth.service';

@Injectable()
export class OAuth2Strategy extends PassportStrategy(Strategy, 'oauth2') {
  constructor(private readonly authService: AuthService) {
    super({
      authorizationURL: `https://pfed${process.env.pingFedEnv}.walmart.com/as/authorization.oauth2`,
      tokenURL: `https://pfed${process.env.pingFedEnv}.walmart.com/as/token.oauth2`,
      clientID: process.env.pingFedClient,
      clientSecret: process.env.pingFedClientHash,
      callbackURL: process.env.pingFedRedirectURL,
      proxy: true,
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: Function) {
    console.log('I am inside passport USE');
    console.log('ENV: ' + process.env.pingFedEnv);
    console.log('Token: ' + accessToken);
    const decodedToken = jwtDecode(accessToken);
    console.log('userId: ', decodedToken['userid']);
    const user = { userid: decodedToken['userid'], accessToken };

    return done(null, user);
  }
}


// auth/auth.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  // Implement your custom logic here if needed
}


// auth/auth.module.ts
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { OAuth2Strategy } from './oauth2.strategy';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'oauth2' })],
  providers: [AuthService, OAuth2Strategy],
  exports: [AuthService],
})
export class AuthModule {}


// auth/auth.controller.ts
import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  @Get('login')
  @UseGuards(AuthGuard('oauth2'))
  login() {
    // Initiates OAuth2 login flow
  }

  @Get('callback')
  @UseGuards(AuthGuard('oauth2'))
  callback(@Req() req) {
    // Handles the callback from the OAuth2 provider
    return req.user;
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
