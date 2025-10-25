// Image collections for each category
const images = {
    top: [
        'images/top/1.jpeg',
        'images/top/2.jpeg',
        'images/top/3.jpeg',
        'images/top/4.jpeg',
        'images/top/5.jpeg',
        'images/top/6.jpeg',
        'images/top/7.jpeg'
    ],
    bottom: [
        'images/bottom/1.jpeg',
        'images/bottom/2.jpeg',
        'images/bottom/3.jpeg',
        'images/bottom/4.jpeg',
        'images/bottom/5.jpeg'
    ]
};

// Current indices (1-based for display)
let currentIndices = {
    top: 1,
    bottom: 1
};

// Initialize from URL parameters
function initFromURL() {
    const params = new URLSearchParams(window.location.search);
    
    ['top', 'bottom'].forEach(category => {
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
    params.set('bottom', currentIndices.shirt);
    
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
    ['top', 'bottom'].forEach(category => {
        updateDisplay(category);
    });
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', initFromURL);