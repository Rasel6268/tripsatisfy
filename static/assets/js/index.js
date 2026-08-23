document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.airline-container');
    const leftButton = document.querySelector('.nav-button.left');
    const rightButton = document.querySelector('.nav-button.right');

    const cardWidth = document.querySelector('.airline-card').offsetWidth;
    const containerWidth = container.offsetWidth;
    const totalWidth = container.scrollWidth;
    let scrollAmount = 0;

    function updateScrollPosition() {
        container.scrollLeft = scrollAmount;
    }

    leftButton.addEventListener('click', () => {
        scrollAmount = Math.max(scrollAmount - cardWidth, 0);
        updateScrollPosition();
    });

    rightButton.addEventListener('click', () => {
        scrollAmount = Math.min(scrollAmount + cardWidth, totalWidth - containerWidth);
        updateScrollPosition();
    });
});