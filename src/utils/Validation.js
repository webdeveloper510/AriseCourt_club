// import { getNumberType, parsePhoneNumberFromString } from 'libphonenumber-js';

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const isValidEmail = (email) => {
    emailRegex.lastIndex = 0;
    return emailRegex.test(email);
};

export const isValidName = (name) => {
    return /^[a-z ]+$/gi.test(name);
};
export const isValidUsername = (text) => {
    return /^[a-z0-9]+$/gi.test(text);
};

export const isValidNumber = (text) => {
    return /^[0-9 ]+$/gi.test(text);
};

export const isValidAmount = (text) => {
    return /^[0-9]*\.?[0-9]*$/.test(text);
};

export const isValidPassport = (text) => {
    return /^[0-9a-z]+$/gi.test(text);
};

export const isValidPhone = (phone) => {
    return /^[+][(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]$/.test(phone);
};
export const isEmail = (text) => {
    return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(text);
};

export function isValidURL(text) {
    return /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,6}(\/\S*)*$/i.test(text);

}


// export function validatePhoneNumber(phoneNumber) {
//     const parsedNumber = parsePhoneNumberFromString(phoneNumber);

//     if (parsedNumber) {
//         const isValid = parsedNumber.isValid();
//         const phoneCode = parsedNumber.countryCallingCode;
//         const country = parsedNumber.country;

//         return {
//             isValid,
//             phoneCode,
//             country,
//             phoneNumber
//         };
//     }

//     return {
//         isValid: false,
//         phoneCode: null,
//         country: null,
//     };
// }