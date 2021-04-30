import Api from './Api'

export default{
    getDepartments: async() => {
        let page = 'api/department/getDepartments';
        return Api().get(page);
    },
    getBranches: async(department) => {
        let page = '/api/department/getDepartmentBranchesByDepartmentName';
        return Api().post(page, department);
    },
    getOtherBranches: async(department) => {
        let page = '/api/department/getDepartmentOtherBranchesByDepartmentName';
        return Api().post(page, department);
    }
} 