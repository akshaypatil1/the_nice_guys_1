import Api from './Api'

export async function getFilters(){
    return Api.get('getDropdownsForDesks');
}