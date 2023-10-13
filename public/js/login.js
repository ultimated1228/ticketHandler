const loginFormHandler = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value.trim();

    if (email && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            window.location.replace('/');
        } else {
            alert('Failed to log in.');
        }
    }
};


document
    .querySelector('#login-form')
    .addEventListener('submit', loginFormHandler);


    
    
const clientDemoLink = document.getElementById('client-demo-link');
const techDemoLink = document.getElementById('tech-demo-link');

clientDemoLink.addEventListener('click', () => {
    document.getElementById('email').value = 'democlient@cryptoforge.com';
    document.getElementById('password').value = 'democlient';
});

techDemoLink.addEventListener('click', () => {
    document.getElementById('email').value = 'demotech@cryptoforge.com';
    document.getElementById('password').value = 'demotech';
});