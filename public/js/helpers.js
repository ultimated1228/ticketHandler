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