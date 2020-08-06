import moment from 'moment';

export const isNullOrEmty = (property) => {
    if(!property || property === ""){
        return true;
    }
    return false;
}

export const isEmailValid = (email) => {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

export const formatDateToString = (timestamp)=>{
    return moment.unix(parseInt(timestamp)).format('L');
}