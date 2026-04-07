/**
 * Interactive Photo Widget
 * Directional eye-tracking photo that follows the mouse cursor.
 * Click to toggle between tongue/blush expressions.
 */
function initPhotoWidget(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const image = container.querySelector('.photo-widget__image');
    if (!image) return;

    let isHovering = false;
    let isClicking = false;
    let clickCount = 0;

    const images = {
        center: 'images/center.webp',
        centerBlush: 'images/centerblush.webp',
        centerTongue: 'images/centertongue.webp',
        up: 'images/up.webp',
        down: 'images/down.webp',
        left: 'images/left.webp',
        right: 'images/right.webp',
        upLeft: 'images/upleft.webp',
        upRight: 'images/upright.webp',
        downLeft: 'images/downleft.webp',
        downRight: 'images/downright.webp'
    };

    // Preload images
    Object.values(images).forEach(src => {
        const img = new Image();
        img.src = src;
    });

    // Mouse Move — directional tracking
    document.addEventListener('mousemove', (e) => {
        if (isHovering) return;

        const rect = image.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;
        let angle = Math.atan2(dy, dx) * (180 / Math.PI);

        let direction = 'center';

        if (angle >= -22.5 && angle < 22.5) {
            direction = 'right';
        } else if (angle >= 22.5 && angle < 67.5) {
            direction = 'downRight';
        } else if (angle >= 67.5 && angle < 112.5) {
            direction = 'down';
        } else if (angle >= 112.5 && angle < 157.5) {
            direction = 'downLeft';
        } else if (angle >= 157.5 || angle < -157.5) {
            direction = 'left';
        } else if (angle >= -157.5 && angle < -112.5) {
            direction = 'upLeft';
        } else if (angle >= -112.5 && angle < -67.5) {
            direction = 'up';
        } else if (angle >= -67.5 && angle < -22.5) {
            direction = 'upRight';
        }

        const newSrc = images[direction];
        if (newSrc && !image.src.endsWith(newSrc)) {
            image.src = newSrc;
        }
    });

    // Hover — center face
    container.addEventListener('mouseenter', () => {
        isHovering = true;
        if (!isClicking) {
            image.src = images.center;
        }
    });

    container.addEventListener('mouseleave', () => {
        isHovering = false;
        isClicking = false;
    });

    // Click — toggle tongue/blush
    container.addEventListener('mousedown', () => {
        isClicking = true;
        clickCount++;
        if (clickCount % 2 !== 0) {
            image.src = images.centerTongue;
        } else {
            image.src = images.centerBlush;
        }
    });

    document.addEventListener('mouseup', () => {
        if (isClicking) {
            isClicking = false;
            if (isHovering) {
                image.src = images.center;
            }
        }
    });
}
