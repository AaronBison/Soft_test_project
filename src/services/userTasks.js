import Api from './Api'
import authHeader from './AuthHeader';

export default{
    updateUser: async(user) => {
        let page = 'api/user/updateUserById';
        return Api().put(page, user, { headers: authHeader() });
    },
    getUsersEmail: async() => {
        let page = 'api/user/getUsersByEmailAddress';
        return Api().get(page, { headers: authHeader() });
    },
    getUserEmail: async(emailAddress) => {
        let page = 'api/user/getUserByEmailAddress';
        return Api().post(page, emailAddress,{ headers: authHeader() });
    },
    deleteUserEmail: async(emailAddress) => {
        let page = 'api/user/deleteUserByEmailAddress';
        return Api().put(page, emailAddress , { headers: authHeader() });
    },
    addDepartment: async(department) => {
        let page = 'api/department/addDepartment';
        return Api().post(page, department , { headers: authHeader() });
    },
    getDepartment: async(department) => {
        let page = 'api/department/getDepartment';
        return Api().post(page, department , { headers: authHeader() });
    },
    getDepartmentsDepartmentName: async() => {
        let page = 'api/department/getDepartmentsByDepartmentName';
        return Api().get(page, { headers: authHeader() });
    },
    updateDepartment: async(department) => {
        let page = 'api/department/updateDepartment';
        return Api().post(page, department , { headers: authHeader() });
    },
    addBranch: async(branch) => {
        let page = 'api/branch/addBranch';
        return Api().post(page, branch , { headers: authHeader() });
    },
    getBranchesName:async() => {
        let page = 'api/branch/getBranchesName';
        return Api().get(page,{headers: authHeader()});
    },
    getBranchByName:async(branchName) => {
        let page = 'api/branch/getBaranchByName';
        return Api().post(page, branchName , { headers: authHeader() });
    },
    updateBranch:async(branch) => {
        let page = 'api/branch/updateBranch';
        return Api().post(page, branch , { headers: authHeader() });
    },
    addOtherBranch: async(otherBranch) => {
        let page = 'api/othersBranch/addOthersBranch';
        return Api().post(page, otherBranch , { headers: authHeader() });
    }
}