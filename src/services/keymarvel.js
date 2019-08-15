import { md5 } from 'pure-md5';

export const url = 'http://gateway.marvel.com/v1/public/';

class KeyMarvel {
  getPublicKey = () => localStorage.getItem('publicKey');

  getPrivateKey = () => localStorage.getItem('privateKey');

  setPublicKey = key => localStorage.setItem('publicKey', key);

  setPrivateKey = key => localStorage.setItem('privateKey', key);

  isAuthenticated = () =>
    localStorage.getItem('privateKey') &&
    localStorage.getItem('publicKey') &&
    localStorage.getItem('Auth');

  logout = () => {
    localStorage.removeItem('publicKey');
    localStorage.removeItem('privateKey');
    localStorage.setItem('Auth', false);
  };

  getApiParams = () => {
    const ts = new Date().getTime();

    return {
      ts,
      apikey: this.getPublicKey(),
      hash: md5(`${ts}${this.getPrivateKey()}${this.getPublicKey()}`),
    };
  };
}

export default new KeyMarvel();
