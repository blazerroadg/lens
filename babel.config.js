import assert from 'assert';
import jwt_decode from 'jwt-decode';
import passport from 'passport';
import { Strategy as OAuth2Strategy } from 'passport-oauth2';
import cookieSession from 'cookie-session';
import dotenv from 'dotenv';
import axios from 'axios';
import MainApiModel from '../Api/User/Model';
import getSecretWithCloudId from '../akeylessUtil';

dotenv.config();

async function installPassport(app: any) {
  app.use(
    cookieSession({
      name: process.env.pingFedCookieName,
      maxAge: 24 * 60 * 60 * 1000,
      keys: ['COMP_BACKEND_COOKIE_SESSION_KEY1'],
      httpOnly: false,
    })
  );

  const clientSecret = await getSecretWithCloudId();
  passport.use(
    new OAuth2Strategy(
      {
        authorizationURL: `https://${process.env.authorizationDomain}.wal-mart.com/as/authorization.oauth2?client_id=${process.env.pingFedClient}&redirect_uri=${process.env.pingFedRedirectURL}&response_type=code&scope=openid`,
        tokenURL: `https://${process.env.pingFedEnv}.wal-mart.com/as/token.oauth2`,
        clientID: process.env.pingFedClient as string,
        clientSecret: clientSecret ?? (process.env.pingFedClientHash as string),
        callbackURL: process.env.pingFedRedirectURL as string,
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log(jwt_decode(accessToken), 'accessToken');
        done(null, { accessToken });
      }
    )
  );

  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((userinfo, done) => {
    debugger;
    done(null, userinfo);
  });

  passport.deserializeUser((userinfo, done) => {
    //debugger;
    done(null, userinfo);
  });

  app.get(
    '/sso',
    passport.authenticate('oauth2', {
      session: true,
      failureRedirect: '/login',
    }),
    (req, res) => {
      console.log('Referer: ' + req.headers.referer);
      console.log('Token: ', req.user.accessToken);
      res.redirect(`${process.env.redirectRoute}?ats=${req.user.accessToken}`);
    }
  );

  app.get(
    '/authCheck',
    async (req, res) => {
      const user = await MainApiModel.getUserById(req.user.userid);
      if (user?.length === 0) {
        res.clearCookie(process.env.pingFedCookieName).send('Unauthorized');
      } else {
        const options: { domain?: string } = {};
        if (process.env.secure === '1') {
          options.domain = `auction.${process.env.pingFedEnv}.xxx.com`;
        }
        res.cookie('auth-token', req.user.accessToken, options);
        res.redirect(process.env.redirectRoute);
      }
    }
  );
}

export = installPassport;
