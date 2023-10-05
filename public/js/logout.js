document.getElementById('logoutBtn').addEventListener('click', async () => {
    try {
      //api call to log out the user
      const response = await fetch('/api/user/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        // Redirect to the login page after successful logout
        window.location.href = '/Login';
      } else {
        console.error('Failed to log out:', response.statusText);
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  });
  