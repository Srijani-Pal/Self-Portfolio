document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Animate skill bars when they enter the viewport
    const skillLevels = document.querySelectorAll('.skill-level');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.5 // 50% of the element must be visible
    };

    const skillObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillLevelElement = entry.target;
                const skillPercentage = skillLevelElement.getAttribute('data-skill-level');
                
                skillLevelElement.style.width = skillPercentage + '%';

                // Add percentage text inside the bar
                const percentageText = document.createElement('span');
                percentageText.className = 'percentage-text';
                percentageText.textContent = skillPercentage + '%';
                skillLevelElement.appendChild(percentageText);

                observer.unobserve(skillLevelElement); // Stop observing once animated
            }
        });
    }, observerOptions);

    skillLevels.forEach(skillLevel => {
        skillObserver.observe(skillLevel);
    });

    // Update current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();
});