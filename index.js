// Image collections for each category
const images = {
    top: [
        'images/top/1.jpg',
        'images/top/2.jpg',
        'images/top/3.jpg'
    ],
    shirt: [
        'images/shirt/1.jpg',
        'images/shirt/2.jpg',
        'images/shirt/3.jpg'
    ],
    pants: [
        'images/pants/1.jpg',
        'images/pants/2.jpg',
        'images/pants/3.jpg'
    ],
    shoes: [
        'images/shoes/1.jpg',
        'images/shoes/2.jpg',
        'images/shoes/3.jpg'
    ]
};

// Current indices (1-based for display)
let currentIndices = {
    top: 1,
    shirt: 1,
    pants: 1,
    shoes: 1
};

// Initialize from URL parameters
function initFromURL() {
    const params = new URLSearchParams(window.location.search);
    
    ['top', 'shirt', 'pants', 'shoes'].forEach(category => {
        const value = params.get(category);
        if (value) {
            const index = parseInt(value);
            if (index >= 1 && index <= images[category].length) {
                currentIndices[category] = index;
            }
        }
    });
    
    updateAllDisplays();
}

// Update URL with current indices
function updateURL() {
    const params = new URLSearchParams();
    params.set('top', currentIndices.top);
    params.set('shirt', currentIndices.shirt);
    params.set('pants', currentIndices.pants);
    params.set('shoes', currentIndices.shoes);
    
    const newURL = window.location.pathname + '?' + params.toString();
    window.history.pushState({}, '', newURL);
}

// Change image for a category
function changeImage(category, direction) {
    const totalImages = images[category].length;
    currentIndices[category] += direction;
    
    // Loop around
    if (currentIndices[category] > totalImages) {
        currentIndices[category] = 1;
    } else if (currentIndices[category] < 1) {
        currentIndices[category] = totalImages;
    }
    
    updateDisplay(category);
    updateURL();
}

// Update display for a specific category
function updateDisplay(category) {
    const img = document.getElementById(`${category}-image`);
    img.src = images[category][currentIndices[category] - 1];
}

// Update all displays
function updateAllDisplays() {
    ['top', 'shirt', 'pants', 'shoes'].forEach(category => {
        updateDisplay(category);
    });
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', initFromURL);