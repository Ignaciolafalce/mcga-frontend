import moment from 'moment';

export const isNullOrEmty = (property) => {
    if(!property || property === ""){
        return true;
    }
    return false;
}

export const formatDateToString = (timestamp)=>{
    // console.log(moment(parseInt(timestamp)));
    // return moment(timestamp).format('L');
    return moment.unix(parseInt(timestamp)).format('L');
}