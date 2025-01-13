


```
import { Injectable, NestMiddleware } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

@Injectable()
export class CookieParserMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    cookieParser()(req, res, next); // Parse cookies
  }
}
import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies?.['your-cookie-name']; // Replace 'your-cookie-name' with your cookie name

    if (!token) {
      throw new HttpException('Unauthorized: Token missing', HttpStatus.UNAUTHORIZED);
    }

    const isValid = await this.authService.validateToken(token);
    if (!isValid) {
      throw new HttpException('Unauthorized: Invalid token', HttpStatus.UNAUTHORIZED);
    }

    return true; // Allow access if the token is valid
  }
}
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AuthService {
  async validateToken(token: string): Promise<boolean> {
    try {
      const response = await axios.get('https://your-validation-service.com/validate', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true, // Include cookies in the request
      });

      return response.status === 200; // Adjust this logic based on the response format
    } catch (error) {
      console.error('Token validation failed:', error.message);
      return false;
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
