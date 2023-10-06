document.getElementById('saveChangesBtn').addEventListener('click', async () => {
    try {
      const ticketId = currentTicketId;
  
      const formData = {
        subject: document.getElementById('subject').value,
        description: document.getElementById('description').value,
        urgency: document.getElementById('urgency').value,
        status: document.getElementById('status').value,
      };
  
      //call to update the ticket
      const response = await fetch(`/api/ticket/${ticketId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        console.log('Ticket updated successfully');
      } else {
        console.error('Failed to update ticket:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating ticket:', error);
    }
  });
  