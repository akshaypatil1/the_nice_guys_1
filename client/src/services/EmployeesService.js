import Api from './Api'

export async function getEmployees(){
    return Api.get('employee')
}