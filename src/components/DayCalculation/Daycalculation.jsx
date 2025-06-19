export const DayCalculation = (fromDate, toDate) => {
    const today = new Date();
    const end = new Date(toDate);

    // Calculate time difference in milliseconds
    const timeDiff = end.getTime() - today.getTime();

    // Convert milliseconds to full days
    const daysLeft = Math.max(0, Math.ceil(timeDiff / (1000 * 60 * 60 * 24)));

    return daysLeft
}

export const formatedDate = (dateString) => {
    const date = new Date(dateString);
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const day = days[date.getDay()];
    const dateNum = String(date.getDate()).padStart(2, '0');
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day}, ${dateNum} ${month} ${year}`;
};