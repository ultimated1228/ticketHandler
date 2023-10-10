const signupFormHandler = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value.trim();
    const firstName = document.querySelector('#firstname').value.trim();
    const lastName = document.querySelector('#lastname').value.trim();

    if (email && password&& firstName&& lastName) {
        const response = await fetch('/api/users/signup', {
            method: 'POST',
            body: JSON.stringify({ email, password, firstName, lastName }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            window.location.replace('/');
        } else {
            alert('Failed to Sign up.');
        }
    }
};


document
    .querySelector('#signup-form')
    .addEventListener('click', signupFormHandler);


    
    
