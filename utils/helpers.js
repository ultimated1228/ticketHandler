module.exports = {
    format_time: (date) => {
        return date.toLocaleTimeString();
    },
    format_date: (date) => {
        return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
    },
    findDiff: (newValues, { oldValues }) => {
        if (!newValues || !oldValues) {
            return 0;
          }
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
    formatTimestamp: (date) => {
        return `${(new Date(date).getHours() % 12 || 12)}:${new Date(date).getMinutes()} ${new Date(date).getHours() >= 12 ? 'PM' : 'AM'} `;
    },
    urgencyColor: (urgency) => {
        if (urgency === 'Low') return 'green-500';
        if (urgency === 'Medium') return 'yellow-500';
        if (urgency === 'High') return 'red-500';
    },

    determineShowHide: (value) => {
        return value === true ? "hidden" : "shown";
    },

    // Helper function to determine alignment class
    determineAlignment: (log, currentUser) => {
        if (log.type === 'Modified') {
            return 'text-center';
        } else if (currentUser && currentUser.id === log.userId) {
            return 'text-right';
        } else {
            return 'text-left';
        }
    },
};
