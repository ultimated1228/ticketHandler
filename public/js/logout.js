const logoutNavItem = document.querySelector('#log-out');

const handleLogout = async () => {
  const confirmed = confirm('Are you sure you want to log out?');

  if (!confirmed) {
    return; 
  }

  try {
    const response = await fetch('/api/users/logout', {
      method: 'POST',
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
