const isOlderThanOneYear = (dateToCheck) => {
    // Get today's date
    const today = new Date();
    
    // Create a date one year ago from today
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(today.getFullYear() - 1);

    // Convert the input date to a Date object
    const inputDate = new Date(dateToCheck);

    // Check if the input date is earlier than one year ago
    return inputDate < oneYearAgo;
}
 
export default isOlderThanOneYear