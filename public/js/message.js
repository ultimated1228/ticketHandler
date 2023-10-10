

const submitMessage = async (event) => {
    event.preventDefault();

    const ticketId = window.location.pathname.split('/').pop()

    const message = document.querySelector('#message-input');
    const hiddenBox = document.querySelector('#is-hidden-input');
    console.log(message);
    console.log(hiddenBox);
    console.log(ticketId);
    console.log(hiddenBox.checked);

    if (message.value.length) {
        const response = await fetch(`/api/logs/`, {
            method: 'POST',
            body: JSON.stringify({
                message: message.value,
                isHidden: hiddenBox.checked,
                ticketId: ticketId 
            }),

            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            // const data = await response.json();
            // appendNewMessage(data);
            location.reload()
        } else {
            alert('Message failed to post');
        }
    };
};



document.getElementById('submitMessageForm').addEventListener('click', submitMessage);

