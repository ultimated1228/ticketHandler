const logoutFormHandler = async (event) => {
    event.preventDefault();


     
        const response = await fetch('/api/users', {
            method: 'DELETE',
            
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            window.location.replace('/');
        } else {
            alert('Failed to Sign up.');
        }
    
};


document
    .querySelector('#logout')
    .addEventListener('click', logoutFormHandler);


    
    
