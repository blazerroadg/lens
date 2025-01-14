


```
async refreshAccessToken(refreshToken: string): Promise<any> {
  try {
    const params = new URLSearchParams();
    params.append('grant_type', 'refresh_token');
    params.append('refresh_token', refreshToken);
    params.append('client_id', process.env.pingFedClient);
    params.append('client_secret', process.env.pingFedSecret);

    const response = await axios.post(
      `https://pfed${process.env.pingFedEnv}.walmart.com/as/token.oauth2`,
      params,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error refreshing access token:', error);
    throw new UnauthorizedException('Could not refresh access token');
  }
}


@Get('refresh-token')
@ApiOperation({ summary: 'Refresh the access token' })
async refreshToken(@Req() req: Request, @Res() res: Response): Promise<any> {
  try {
    const refreshToken = req.cookies['refresh_token'];
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token is missing');
    }

    const newTokens = await this.oauthStartegy.refreshAccessToken(refreshToken);

    // Set the new tokens in cookies
    res.cookie('access_token', newTokens.access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
    res.cookie('refresh_token', newTokens.refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });

    return res.status(200).send({ message: 'Token refreshed successfully' });
  } catch (error) {
    console.error('Error refreshing token:', error);
    throw new UnauthorizedException('Could not refresh token');
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
