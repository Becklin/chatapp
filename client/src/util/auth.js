import axios from 'axios';

let API_URL = 'https://localhost:5000/api/auth/';
if (process.env.NODE_ENV === 'production') {
  API_URL = 'https://dailytalk.herokuapp.com/api/auth/';
}
class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + 'signin', {
        username,
        password,
      })
      .then((response) => {
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
    return axios.post(API_URL + 'signup', {
      username,
      email,
      password,
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}

export default new AuthService();
