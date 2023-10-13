document.addEventListener('DOMContentLoaded', function () {
    const claimButtons = document.querySelectorAll('.claim-button');

    claimButtons.forEach((button) => {
        button.addEventListener('click', async (event) => {
            event.preventDefault();
            const ticketId = event.currentTarget.getAttribute('data-ticket-id');
            try {
                const response = await fetch(`/api/tickets/assign-tech/${ticketId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({}),
                });

                if (response.ok) {
                    location.replace("/");
                    console.info('Ticket Claimed');
                } else {
                    console.error('Error claiming the ticket');
                }
            } catch (error) {
                console.error('An error occurred:', error);
            }
        });
    });
});