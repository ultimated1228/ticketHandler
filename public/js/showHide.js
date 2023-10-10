document.addEventListener('click', (event) => {
    const button = event.target.closest('.swapShowHide');
    
    if (button) {
        const spanElement = button.querySelector('span');

        if (spanElement.classList.contains('hide')) {
            spanElement.classList.remove('hide');
            spanElement.classList.add('show');
        } else {
            spanElement.classList.remove('show');
            spanElement.classList.add('hide');
        }
    }
});
