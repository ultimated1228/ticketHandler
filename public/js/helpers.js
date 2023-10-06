export const makeRequest = async (url, method, body = {}) => {
    const response = await fetch(url, {
        method,
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    const data = await response.json();

    return data;
};
export const urgencyColor = (urgency) => {
    if (urgency === 'Low') return 'green-500';
    if (urgency === 'Medium') return 'yellow-500';
    if (urgency === 'High') return 'red-500';
};

export const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};