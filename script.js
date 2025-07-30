// Configuration - Update these values with the actual name
const TARGET_FIRST_NAME = "nabila"; // Replace with the actual first name
const TARGET_LAST_NAME = "goutandi";     // Replace with the actual last name

// Special message to display
const SPECIAL_MESSAGE = `
Tu es quelqu'un de vraiment spécial et unique. \n
Ton sourire illumine ma journée, et ta présence rend chaque moment plus beau. \n
J'avais l'idée de faire un éssai d'appli de message vite fait 😁!\n
N'hésite pas à me dire si tu as aimé ou non!\n
Je tenais simplement à te dire à quel point toi et tes débats sont très intéressants. \n
Merci d'être toi. 💖✨
\n Va voir mon portfolio si tu veux voir mes autres projets! : https://scsboy.github.io/Portfolio/
`;

// Gestionnaire de navigation des animations
function initAnimationCarousel() {
    const animations = document.querySelectorAll('.lottie-animation');
    const prevBtn = document.querySelector('.animation-prev');
    const nextBtn = document.querySelector('.animation-next');
    let currentIndex = 0;

    function showAnimation(index) {
        // Masquer toutes les animations
        animations.forEach(anim => anim.classList.remove('active'));
        
        // Ajuster l'index si nécessaire
        if (index >= animations.length) {
            currentIndex = 0;
        } else if (index < 0) {
            currentIndex = animations.length - 1;
        } else {
            currentIndex = index;
        }
        
        // Afficher l'animation actuelle
        animations[currentIndex].classList.add('active');
    }

    // Navigation précédente
    prevBtn.addEventListener('click', () => {
        showAnimation(currentIndex - 1);
    });

    // Navigation suivante
    nextBtn.addEventListener('click', () => {
        showAnimation(currentIndex + 1);
    });

    // Rotation automatique des animations toutes les 8 secondes
    let rotationInterval = setInterval(() => {
        showAnimation(currentIndex + 1);
    }, 8000);

    // Arrêter la rotation automatique au survol
    const container = document.querySelector('.animation-container');
    container.addEventListener('mouseenter', () => {
        clearInterval(rotationInterval);
    });

    container.addEventListener('mouseleave', () => {
        clearInterval(rotationInterval);
        rotationInterval = setInterval(() => {
            showAnimation(currentIndex + 1);
        }, 8000);
    });

    // Initialisation
    showAnimation(0);
}

document.addEventListener('DOMContentLoaded', function() {
    const nameForm = document.getElementById('nameForm');
    const messageContainer = document.getElementById('messageContainer');
    const greetingElement = document.getElementById('greeting');
    const messageElement = document.getElementById('specialMessage');
    const submitBtn = document.getElementById('submitBtn');
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');

    // Add animation to the button on hover
    submitBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });

    submitBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });

    // Handle button click
    submitBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        const firstName = firstNameInput.value.trim();
        const lastName = lastNameInput.value.trim();
        
        // Simple validation
        if (!firstName || !lastName) {
            showError('Veuillez entrer votre prénom et votre nom.');
            return;
        }
        
        // Check if the name matches
        if (firstName.toLowerCase() === TARGET_FIRST_NAME.toLowerCase() && 
            lastName.toLowerCase() === TARGET_LAST_NAME.toLowerCase()) {
            // Show the special message
            showSpecialMessage(firstName);
        } else {
            // Show error for wrong name
            showError('Désolé, ce message ne vous est pas destiné.');
        }
    });
    
    function showSpecialMessage(firstName) {
        // Update the greeting with the person's name
        greetingElement.textContent = `Bonjour ${firstName} !`;
        
        // Show the special message with line breaks and initialize carousel
        messageElement.innerHTML = SPECIAL_MESSAGE.replace(/\n\n/g, '<br><br>');
    
        // Initialize the animation carousel after showing the message
        initAnimationCarousel();
        
        // Hide the form and show the message
        nameForm.classList.add('d-none');
        messageContainer.classList.remove('d-none');
        
        // Add confetti effect
        triggerConfetti();
    }
    
    function showError(message) {
        // Remove any existing error messages
        const existingError = document.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Create and show error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message alert alert-danger mt-3';
        errorDiv.textContent = message;
        
        // Add animation
        errorDiv.style.animation = 'fadeIn 0.5s ease-in-out';
        
        // Insert after the form
        nameForm.appendChild(errorDiv);
        
        // Remove error after 3 seconds
        setTimeout(() => {
            errorDiv.style.opacity = '0';
            errorDiv.style.transition = 'opacity 0.5s ease-in-out';
            setTimeout(() => errorDiv.remove(), 500);
        }, 3000);
    }
    
    function triggerConfetti() {
        // Simple confetti effect
        const colors = ['#ff6b6b', '#ff8e8e', '#ffb3b3', '#ffd8d8'];
        const confettiCount = 100;
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.width = Math.random() * 10 + 5 + 'px';
            confetti.style.height = Math.random() * 10 + 5 + 'px';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
            
            document.body.appendChild(confetti);
            
            // Remove confetti after animation
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }
        
        // Add confetti styles
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fall {
                to {
                    transform: translateY(100vh) rotate(360deg);
                    opacity: 0;
                }
            }
            .confetti {
                position: fixed;
                top: -10px;
                border-radius: 50%;
                z-index: 9999;
                pointer-events: none;
            }
        `;
        document.head.appendChild(style);
    }
});
