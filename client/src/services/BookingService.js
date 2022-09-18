import Api from './Api'

export async function bookDesk(){
    return Api.post('bookDesk')
}