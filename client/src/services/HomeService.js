import Api from './Api'

export async function getFilters(){
    return Api.get('getDropdownsForDesks');
}

export async function fetchBookingData(request){
    return Api.post('bookings',request);
}
