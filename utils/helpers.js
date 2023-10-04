module.exports = {
    format_time: (date) => {
        return date.toLocaleTimeString();
    },
    format_date: (date) => {
        return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
    },
    formatTimestamp: (date) =>{
        return `${(new Date(date).getHours() % 12 || 12)}:${new Date(date).getMinutes()} ${new Date(date).getHours() >=12 ? 'PM' : 'AM'} `;
    }
};


