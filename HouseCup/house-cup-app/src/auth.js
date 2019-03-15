import auth0 from 'auth0-js';

const LOGIN_SUCCESS_PAGE = '/publicPage';
const LOGIN_FAILURE_PAGE = '/';

export default class Auth {
      auth0 = new auth0.WebAuth({
        domain: 'venky-yagatilee.auth0.com',
        clientID: '81ir02UDdeAaVWtecoDe3lux9Z0X3gB0',
        redirectUri: 'https://localhost:3000/callback',
        audience: 'https://venky-yagatilee.auth0.com/userinfo',
        responseType: 'token id_token',
        scope: 'openid'
      });

     login = () => {
       this.auth0.authorize();
     }

     handleAuthentication = () => {
      this.auth0.parseHash((err, authResults) => {
        if (authResults && authResults.accessToken && authResults.idToken) {
          let expiresAt = JSON.stringify(
            authResults.expiresIn * 1000 + new Date().getTime() );
          localStorage.setItem('access_token', authResults.accessToken);
          localStorage.setItem('id_token', authResults.idToken);
          localStorage.setItem('expires_at', expiresAt);
          location.hash = '';
          location.pathname = LOGIN_SUCCESS_PAGE;
        } else if (err) {
          location.pathname = LOGIN_FAILURE_PAGE;
          console.log(err);
        }
      });
     }

     isAuthenticated = () => {

     }

};