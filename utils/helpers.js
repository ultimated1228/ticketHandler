module.exports = {
    format_time: (date) => {
        return date.toLocaleTimeString();
    },
    format_date: (date) => {
        return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
    },
    findDiff: (newValues, { oldValues }) => {
        const newKeys = Object.keys(newValues)
        const oldKeys = Object.keys(oldValues)
        if (newKeys.length != oldKeys.length) return 0;
        let output = [];
        for (var key of newKeys) {
            const valueFrom = newValues[key];    // Compare from newvalue
            const valueAgainst = oldValues[key]; // Against oldvalue
            if (valueFrom != valueAgainst) {
                output.push(
                    `${key} was changed from ${oldValues[key]} to ${newValues[key]}`
                )
            }
        }
        if (output.length == 0) return 0;
        return output;
    },
    formatTimestamp: (date) =>{
        return `${(new Date(date).getHours() % 12 || 12)}:${new Date(date).getMinutes()} ${new Date(date).getHours() >=12 ? 'PM' : 'AM'} `;
    }
};
