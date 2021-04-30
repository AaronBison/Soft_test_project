import Api from './Api'
import authHeader from './AuthHeader';

export default{
    
    loginVerification: async(user) => {
        let page = 'api/auth/signin';
        return Api().post(page, user);
    },
    getUser: async(id) => {
        let page = 'api/user/getUserById';
        return Api().post(page, id,{ headers: authHeader() });
    },
    registerUser: async(user) => {
        let page = 'api/auth/registration';
        return Api().post(page, user, { headers: authHeader() });
    },
    addPassword: async(password) => {
        let page = 'api/auth/password';
        return Api().post(page, password);
    }
    
}