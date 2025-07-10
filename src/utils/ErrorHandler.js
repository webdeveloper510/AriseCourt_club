
/**
 * Function that will show axios error
 * @param {Object} err 
 */
export const _ErrorHandler = (err, name) => {
    console.log('Error in ', name || '', err.response?.data)
    if (err.response) {
        if (err.response.status == 413)
            alert('Attachment size should be less than 5MB');
        else if (err?.response?.data?.err)
            alert(JSON.stringify(err?.response?.data?.err));
        else if (err?.response?.data?.error)
            alert(err?.response?.data?.error);
        else if (err.response.data)
            alert(JSON.stringify(err.response.data));
        else {
            alert('Something is going wrong. Please try again');
        }
    }
    else if (err.request) {
        alert('Server is not responding. Please try again');
    }
    else {
        alert(err);
    }
}