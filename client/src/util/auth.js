import axios from 'axios';

let API_URL = '/api/auth/';
if (process.env.NODE_ENV === 'production') {
  API_URL = 'https://dailytalk.herokuapp.com/api/auth/';
}
console.log(API_URL);
class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + 'signin', {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  signup(username, email, password) {
    console.log(username, email, password);
    return axios.post(API_URL + 'signup', {
      username,
      email,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}

export default new AuthService();
