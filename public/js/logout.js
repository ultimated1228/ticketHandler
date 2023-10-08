const logoutNavItem = document.querySelector('#log-out');

const handleLogout = async () => {
  
  try {
    const response = await fetch('/api/users', {
      method: 'DELETE',
    });

    if (response.ok) {
      window.location.replace('/login');
    } else {
      if (response.status === 401) {
        alert('Please log in again');
      } else {
        alert('Failed to logout');
      }
    }
  } catch (error) {
    console.error('Error during logout', error);
    alert('An error occurred during logout');
  }
};

logoutNavItem.addEventListener('click', handleLogout);
