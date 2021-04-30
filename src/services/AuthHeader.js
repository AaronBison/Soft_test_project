export default function authHeader() {
    let userid = localStorage.getItem('userid');
    let token = localStorage.getItem('token');

    if (userid && token) {
      return { Authorization: 'Bearer ' + token};
    } else {
      return {};
    }
  }