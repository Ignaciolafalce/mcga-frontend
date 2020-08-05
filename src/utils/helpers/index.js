import moment from 'moment';

export const isNullOrEmty = (property) => {
    if(!property || property === ""){
        return true;
    }
    return false;
}

export const formatDateToString = (timestamp)=>{
    return moment.unix(parseInt(timestamp)).format('L');
}