// ========================================
// JAVASCRIPT AMÉLIORÉ - VERSION WOW
// Toutes les interactions et animations avancées
// ========================================

// ========================================
// VARIABLES GLOBALES
// ========================================
const heartsConfig = {
    maxHearts: 20,
    spawnInterval: 2000,
    heartSymbols: ['💚', '💖', '💗', '💝', '💕']
};

// Date de début de la relation (À PERSONNALISER)
// Vous êtes ensemble depuis le 14 février 2023
// Le 14 février 2025 = 2 ans jour pour jour !
const relationshipStart = new Date('2024-02-14T00:00:00');

// ========================================
// INITIALISATION AU CHARGEMENT
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // BOUTON ENTRER - CODE DE SECOURS (PRIORITAIRE)
    // ========================================
    // Ce code s'exécute EN PREMIER pour garantir que le bouton fonctionne
    const enterButton = document.getElementById('enterButton');
    const welcomeScreen = document.getElementById('welcomeScreen');
    const mainSite = document.getElementById('mainSite');
    
    if (enterButton && welcomeScreen && mainSite) {
        console.log('Bouton "Entrer" détecté et configuré !');
        
        enterButton.addEventListener('click', function() {
            console.log(' Bouton cliqué ! Transition vers le site...');
            
            // Cache l'écran d'accueil
            welcomeScreen.style.display = 'none';
            
            // Affiche le contenu principal du site
            mainSite.style.display = 'block';
            
            // Scroll vers le haut
            window.scrollTo(0, 0);
            
            console.log('Site principal affiché !');
        });
    } else {
        console.error('Éléments manquants:', {
            enterButton: !!enterButton,
            welcomeScreen: !!welcomeScreen,
            mainSite: !!mainSite
        });
    }
    
    // ========================================
    // Initialisation de toutes les autres fonctionnalités
    // ========================================
    initWelcomeScreen();        // Écran d'accueil avec particules
    initCountdown();            // Compte à rebours temps réel
    initFloatingHearts();       // Cœurs flottants
    initScrollAnimations();     // Animations au scroll
    initParallaxEffect();       // Effet parallax
    init3DImageEffect();        // Effet 3D sur images
    initFlipCards();            // Cartes flip
    initGalleryFilters();       // Filtres de galerie
    initQuiz();                 // Quiz interactif
    initSecretModal();          // Modal message secret
    initSmoothScroll();         // Scroll fluide
    initAudioMessages();        // Messages audio
    initEasterEggs();           // Easter eggs cachés
    initLoveStats();            // Statistiques animées
    
    // NOUVELLES FONCTIONNALITÉS ULTIME
    init100Reasons();           // 100 raisons de t'aimer
    initGiftsCalendar();        // Calendrier des 14 cadeaux
    initMemoriesGallery();      // Galerie de souvenirs (remplace constellation)
    initGarden();               // Jardin d'amour
});

// ========================================
// 1. ÉCRAN D'ACCUEIL AVEC PARTICULES
// ========================================
function initWelcomeScreen() {
    const welcomeScreen = document.getElementById('welcomeScreen');
    const enterButton = document.getElementById('enterButton');
    const mainSite = document.getElementById('mainSite');
    const canvas = document.getElementById('particlesCanvas');
    
    // IMPORTANT : Toujours configurer le bouton, même si le canvas n'existe pas
    if (enterButton && welcomeScreen && mainSite) {
        enterButton.addEventListener('click', () => {
            console.log('Bouton cliqué !'); // Debug
            welcomeScreen.classList.add('hidden');
            mainSite.style.display = 'block';
            
            // Scroll vers le haut après transition
            setTimeout(() => {
                window.scrollTo(0, 0);
            }, 1000);
        });
    }
    
    // Particules (optionnel - si le canvas existe)
    if (!canvas) {
        console.log('Canvas non trouvé - particules désactivées');
        return;
    }
    
    // Configuration du canvas
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Particules
    const particles = [];
    const particleCount = 100;
    
    // Classe Particule
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Rebond sur les bords
            if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
            if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
        }
        
        draw() {
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Initialisation des particules
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    // Animation des particules
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Lignes de connexion entre particules proches
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 - distance / 500})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        
        requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
    
    // Redimensionnement du canvas
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// ========================================
// 2. COMPTE À REBOURS TEMPS RÉEL
// ========================================
function initCountdown() {
    const countdownDisplay = document.getElementById('countdownDisplay');
    
    if (!countdownDisplay) return;
    
    function updateCountdown() {
        const now = new Date();
        const diff = now - relationshipStart;
        
        // Calculer les années, mois et jours
        const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
        const years = Math.floor(totalDays / 365);
        const remainingDays = totalDays % 365;
        const months = Math.floor(remainingDays / 30);
        const days = remainingDays % 30;
        
        // Vérifier si c'est le 14 février (anniversaire)
        const isAnniversary = now.getDate() === 14 && now.getMonth() === 1; // 1 = février (0-indexé)
        
        if (isAnniversary && years >= 1) {
            // LE 14 FÉVRIER : Affichage spécial "X ans jour pour jour"
            countdownDisplay.innerHTML = `
                <div class="anniversary-message">
                    <div class="anniversary-number">${years}</div>
                    <div class="anniversary-text">
                        ${years === 1 ? 'an' : 'ans'} jour pour jour ! 
                    </div>
                    <div class="anniversary-subtext">
                        Joyeux anniversaire mon amour !
                    </div>
                </div>
            `;
        } else {
            // AUTRES JOURS : Affichage du temps écoulé
            let timeText = '';
            
            if (years > 0) {
                timeText += `${years} ${years > 1 ? 'ans' : 'an'}`;
                if (months > 0) {
                    timeText += `, ${months} mois`;
                }
                if (days > 0 && years < 2) {
                    timeText += ` et ${days} ${days > 1 ? 'jours' : 'jour'}`;
                }
            } else if (months > 0) {
                timeText += `${months} mois`;
                if (days > 0) {
                    timeText += ` et ${days} ${days > 1 ? 'jours' : 'jour'}`;
                }
            } else {
                timeText += `${totalDays} ${totalDays > 1 ? 'jours' : 'jour'}`;
            }
            
            countdownDisplay.innerHTML = `
                <div class="time-together">
                    <div class="time-number">${timeText}</div>
                    <div class="time-label">de bonheur ensemble </div>
                </div>
            `;
        }
    }
    
    // Mise à jour initiale et toutes les heures
    updateCountdown();
    setInterval(updateCountdown, 3600000); // Toutes les heures
    
    // Ajouter le CSS pour le nouveau design
    const style = document.createElement('style');
    style.textContent = `
        .anniversary-message {
            text-align: center;
        }
        
        .anniversary-number {
            font-size: 5rem;
            font-weight: 700;
            color: black;
            font-family: var(--font-title);
            line-height: 1;
            text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.3);
            animation: pulse 2s infinite;
        }
        
        .anniversary-text {
            font-size: 2rem;
            color: black;
            font-weight: 600;
            margin-top: 1rem;
            font-family: var(--font-title);
        }
        
        .anniversary-subtext {
            font-size: 1.2rem;
            color: black;
            margin-top: 0.5rem;
            font-style: italic;
        }
        
        .time-together {
            text-align: center;
        }
        
        .time-number {
            font-size: 2.5rem;
            font-weight: 700;
            color: black;
            font-family: var(--font-title);
            margin-bottom: 0.5rem;
        }
        
        .time-label {
            font-size: 1.2rem;
            color: black;
        }
    `;
    document.head.appendChild(style);
}

// ========================================
// 3. CŒURS FLOTTANTS
// ========================================
function initFloatingHearts() {
    const container = document.getElementById('floatingHearts');
    if (!container) return;
    
    function createHeart() {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = heartsConfig.heartSymbols[
            Math.floor(Math.random() * heartsConfig.heartSymbols.length)
        ];
        heart.style.left = Math.random() * 100 + '%';
        const size = Math.random() * 20 + 15;
        heart.style.fontSize = size + 'px';
        const duration = Math.random() * 3 + 4;
        heart.style.animationDuration = duration + 's';
        heart.style.animationDelay = Math.random() * 2 + 's';
        
        container.appendChild(heart);
        
        setTimeout(() => {
            if (heart.parentNode) heart.remove();
        }, (duration + 2) * 1000);
    }
    
    for (let i = 0; i < 10; i++) {
        setTimeout(createHeart, i * 300);
    }
    
    setInterval(() => {
        const currentHearts = container.querySelectorAll('.heart').length;
        if (currentHearts < heartsConfig.maxHearts) {
            createHeart();
        }
    }, heartsConfig.spawnInterval);
}

// ========================================
// 4. ANIMATIONS AU SCROLL
// ========================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    };
    
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    document.querySelectorAll(
        '.fade-in-scroll, .slide-in-left, .slide-in-right, .zoom-hover, .rotate-hover'
    ).forEach(el => observer.observe(el));
}

// ========================================
// 5. EFFET PARALLAX
// ========================================
function initParallaxEffect() {
    const parallaxElements = document.querySelectorAll('.parallax-image');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const elementTop = element.offsetTop;
            const elementHeight = element.offsetHeight;
            const distance = scrolled - elementTop;
            const parallaxSpeed = 0.3;
            const yPos = -(distance * parallaxSpeed);
            
            if (scrolled > elementTop - window.innerHeight && 
                scrolled < elementTop + elementHeight) {
                element.style.transform = `translateY(${yPos}px)`;
            }
        });
    });
}

// ========================================
// 6. EFFET 3D SUR IMAGES (MOUSE FOLLOW)
// ========================================
function init3DImageEffect() {
    const images = document.querySelectorAll('.image-wrapper-3d');
    
    images.forEach(image => {
        const shine = image.querySelector('.shine-effect');
        
        image.addEventListener('mousemove', (e) => {
            const rect = image.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Calcul de la rotation 3D
            const rotateY = ((x / rect.width) - 0.5) * 20;
            const rotateX = ((y / rect.height) - 0.5) * -20;
            
            // Application de la transformation
            image.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            
            // Position de l'effet de brillance
            if (shine) {
                shine.style.left = `${x}px`;
                shine.style.top = `${y}px`;
            }
        });
        
        image.addEventListener('mouseleave', () => {
            image.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
}

// ========================================
// 7. CARTES FLIP INTERACTIVES
// ========================================
function initFlipCards() {
    const cards = document.querySelectorAll('.love-card-flip');
    
    cards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
    });
}

// ========================================
// 8. FILTRES DE GALERIE
// ========================================
function initGalleryFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (filterButtons.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Activation du bouton
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filter = button.dataset.filter;
            
            // Filtrage des items
            galleryItems.forEach(item => {
                const category = item.dataset.category;
                
                if (filter === 'all' || category === filter) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });
}

// ========================================
// 9. QUIZ INTERACTIF
// ========================================

/**
 * Mélange un tableau de façon aléatoire (Fisher-Yates)
 */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
function initQuiz() {
    const quizContainer = document.getElementById('quizContainer');
    if (!quizContainer) return;
  
    // Questions du quiz (À PERSONNALISER)
    const questions = [
      {
        question: "Quels etait le lieu ou tu m'a aperçu la prémière fois ?",
        options: [
          { text: "Au maquis ", correct: false },
          { text: "Dans un restaurant", correct: false },
          { text: "À l'eglise", correct: true },
          { text: "Dans la rue", correct: false }
        ]
      },
      {
        question: "Quel est mon plat préféré ?",
        options: [
          { text: "Garba ", correct: false },
          { text: " Porc ", correct: false },
          { text: "Alloco  ", correct: true },
          { text: "Foufou", correct: false }
        ]
      },
      {
        question: "Quel est mon passe temps ?",
        options: [
          { text: "Travailler sur mon ordinateur", correct: true },
          { text: "Jouer aux jeux vidéo", correct: false },
          { text: "Sortir avec mes amis", correct: false },
          { text: "manger", correct: false }
        ]
      },
      {
        question: "Quel est mon style de vestimentaire ?",
        options: [
          { text: "costume", correct: false },
          { text: "responsable", correct: true },
          { text: "Noushi", correct: false },
          { text: "Méchant-Méchant", correct: false }
        ]
      },
      {
        question: "Quel est le prénom de mon père ?",
        options: [
          { text: "Alain", correct: true },
          { text: "Gérard ", correct: false },
          { text: "Patrick ", correct: false },
          { text: "Maurice ", correct: false }
        ]
      },
      {
        question: "Quel est le surnom de ma mère ?",
        options: [
          { text: "Majo ", correct: true },
          { text: "La jeune", correct: false },
          { text: "Yohou", correct: false },
          { text: "Marie", correct: false }
        ]
      },
      {
        question: "Quelle est ma pointure en matière de chaussure ?",
        options: [
          { text: "41", correct: false },
          { text: "42", correct: true },
          { text: "40", correct: false },
          { text: "43", correct: false }
        ]
      },
      {
        question: "Quelle est ma couleur préférée ?",
        options: [
          { text: "Rouge ", correct: false },
          { text: "Bleu ", correct: false },
          { text: "Vert ", correct: true },
          { text: "Rose ", correct: false }
        ]
      }
    ];
  
    // Mélange des questions (une seule fois au démarrage)
    const shuffledQuestions = shuffleArray([...questions]);
    let currentQuestion = 0;
    let score = 0;
  
    function showQuestion() {
      if (currentQuestion >= shuffledQuestions.length) {
        showResults();
        return;
      }
  
      const q = shuffledQuestions[currentQuestion];
      
      // 🔑 MÉLANGE DES OPTIONS POUR CETTE QUESTION UNIQUEMENT
      const shuffledOptions = shuffleArray([...q.options]);
  
      const questionHTML = `
        <div class="quiz-question active">
          <h3>Question ${currentQuestion + 1} : ${q.question}</h3>
          <div class="quiz-options">
            ${shuffledOptions.map((option, index) => `
              <button class="quiz-option" data-index="${index}" data-correct="${option.correct}">
                ${option.text}
              </button>
            `).join('')}
          </div>
          <div class="quiz-feedback"></div>
        </div>
      `;
  
      quizContainer.innerHTML = questionHTML;
  
      // Écouteurs sur les options
      document.querySelectorAll('.quiz-option').forEach(btn => {
        btn.addEventListener('click', handleAnswer);
      });
    }
  
    function handleAnswer(e) {
      const button = e.currentTarget;
      const isCorrect = button.dataset.correct === 'true';
      const feedback = document.querySelector('.quiz-feedback');
  
      // Désactivation de tous les boutons
      document.querySelectorAll('.quiz-option').forEach(btn => {
        btn.style.pointerEvents = 'none';
        if (btn.dataset.correct === 'true') {
          btn.classList.add('correct');
        }
      });
  
      if (isCorrect) {
        score++;
        feedback.innerHTML = '<p style="color: #4CAF50;"> Hannnn ! Tu veux dire quoi genre tu me connais trop quoi 😊</p>';
      } else {
        button.classList.add('incorrect');
        feedback.innerHTML = '<p style="color: #EF5350;"> Oups ! Mais je t\'aime quand même </p>';
      }
  
      // Question suivante après 2 secondes
      setTimeout(() => {
        currentQuestion++;
        showQuestion();
      }, 2000);
    }
  
    function showResults() {
      const quizScore = document.getElementById('quizScore');
      quizContainer.style.display = 'none';
      quizScore.style.display = 'block';
      
      document.querySelector('#quizScore h3').innerHTML = 
        `Résultat : <span id="scoreDisplay">${score}</span>/${shuffledQuestions.length}`;
  
      const scoreMessage = document.getElementById('scoreMessage');
      
      // Message selon le score
      if (score === shuffledQuestions.length) {
        scoreMessage.textContent = '🎉 Parfait ! Tu es incroyable ! Tu mérites ton cadeau ! 💚';
      } else if (score >= shuffledQuestions.length / 2) {
        scoreMessage.textContent = '👏 Très bien ! Tu me connais vraiment bien ! 💚';
      } else {
        scoreMessage.textContent = '😊 On va devoir passer plus de temps ensemble ! 💚';
      }
    }
  
    // Démarrage du quiz
    showQuestion();
  }

// ========================================
// 10. MODAL MESSAGE SECRET AMÉLIORÉ
// ========================================
function initSecretModal() {
    const secretButton = document.getElementById('secretButton');
    const modal = document.getElementById('secretModal');
    const closeButton = document.getElementById('closeModal');
    const modalMessage = document.getElementById('secretMessage');
    const confettiContainer = document.getElementById('confettiContainer');
    const secretLock = document.getElementById('secretLock');
    
    if (!secretButton) return;
    
    function openModal() {
        // Animation du cadenas
        if (secretLock) {
            secretLock.style.animation = 'none';
            setTimeout(() => {
                secretLock.style.transform = 'rotate(360deg) scale(0)';
                secretLock.style.opacity = '0';
            }, 100);
        }
        
        modal.style.display = 'flex';
        modal.querySelector('.modal-message-wrapper').style.animation = 'modalSlideIn 0.5s ease-out';
        
        createConfetti();
        
        setTimeout(() => {
            modalMessage.style.opacity = '1';
        }, 500);
    }
    
    function closeModal() {
        modal.querySelector('.modal-message-wrapper').style.animation = 'modalSlideIn 0.3s ease-in reverse';
        
        setTimeout(() => {
            modal.style.display = 'none';
            modalMessage.style.opacity = '0';
            confettiContainer.innerHTML = '';
            
            // Réinitialiser le cadenas
            if (secretLock) {
                secretLock.style.transform = 'rotate(0) scale(1)';
                secretLock.style.opacity = '1';
                secretLock.style.animation = 'swing 2s ease-in-out infinite';
            }
        }, 300);
    }
    
    function createConfetti() {
        const colors = ['#66BB6A', '#A5D6A7', '#2E7D32', '#4CAF50'];
        const confettiCount = 50;
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'absolute';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-10px';
            confetti.style.opacity = Math.random();
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
            
            const fallDuration = Math.random() * 3 + 2;
            const fallDistance = Math.random() * 500 + 300;
            const sway = Math.random() * 100 - 50;
            
            confetti.animate([
                { 
                    top: '-10px', 
                    left: confetti.style.left,
                    transform: `rotate(0deg)`,
                    opacity: 1
                },
                { 
                    top: fallDistance + 'px',
                    left: `calc(${confetti.style.left} + ${sway}px)`,
                    transform: `rotate(${Math.random() * 720}deg)`,
                    opacity: 0
                }
            ], {
                duration: fallDuration * 1000,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            });
            
            confettiContainer.appendChild(confetti);
            
            setTimeout(() => {
                if (confetti.parentNode) confetti.remove();
            }, fallDuration * 1000);
        }
    }
    
    secretButton.addEventListener('click', openModal);
    closeButton.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            closeModal();
        }
    });
}

// ========================================
// 11. MESSAGES AUDIO
// ========================================
function initAudioMessages() {
    const playMessageAudio = document.getElementById('playMessageAudio');
    let customAudio = null;
    let isPlaying = false;

    if (!playMessageAudio) return;

    playMessageAudio.addEventListener('click', () => {

        if (!customAudio) {
            customAudio = new Audio('assets/audio/message-secret.mp3'); // CHEMIN CORRECT
            customAudio.volume = 1;

            customAudio.addEventListener('ended', () => {
                isPlaying = false;
                playMessageAudio.innerHTML = `
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z"/>
                    </svg>
                    Écoute-moi te le dire
                `;
            });
        }

        if (isPlaying) {
            customAudio.pause();
            isPlaying = false;
            playMessageAudio.innerHTML = `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z"/>
                </svg>
                Reprendre
            `;
        } else {
            customAudio.play().catch(err => {
                console.error("Erreur lecture audio :", err);
            });
            isPlaying = true;
            playMessageAudio.innerHTML = `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                </svg>
                Pause
            `;
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    initAudioMessages();
});


// ========================================
// 12. TÉLÉCHARGEMENT DU MESSAGE
// ========================================
document.getElementById('downloadMessage')?.addEventListener('click', function() {
    const message = document.getElementById('secretMessage').textContent;
    
    // Création d'un fichier texte
    const blob = new Blob([message], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    // Téléchargement
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Mon-Message-Secret.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // Feedback visuel
    this.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
        </svg>
        Téléchargé !
    `;
    
    setTimeout(() => {
        this.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
            </svg>
            Télécharger ce message
        `;
    }, 2000);
});

// ========================================
// 13. STATISTIQUES ANIMÉES
// ========================================
function initLoveStats() {
    const stats = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                const target = parseInt(entry.target.textContent.replace(/\D/g, '')) || 0;
                animateCounter(entry.target, 0, target, 2000);
                entry.target.classList.add('animated');
            }
        });
    });
    
    stats.forEach(stat => observer.observe(stat));
    
    function animateCounter(element, start, end, duration) {
        if (element.textContent === '∞') return; // Skip infinity symbol
        
        const range = end - start;
        const increment = range / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
                current = end;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + '+';
        }, 16);
    }
}

// ========================================
// 14. SCROLL FLUIDE
// ========================================
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// ========================================
// 15. EASTER EGGS
// ========================================
function initEasterEggs() {
    // 1. Triple-clic sur le titre = explosion de cœurs
    let clickCount = 0;
    let clickTimer = null;
    
    document.getElementById('mainTitle')?.addEventListener('click', function() {
        clickCount++;
        
        if (clickTimer) clearTimeout(clickTimer);
        clickTimer = setTimeout(() => {
            clickCount = 0;
        }, 1000);
        
        if (clickCount === 3) {
            heartExplosion();
            clickCount = 0;
        }
    });
    
    function heartExplosion() {
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.textContent = '💚';
                heart.style.cssText = `
                    position: fixed;
                    left: 50%;
                    top: 50%;
                    font-size: 30px;
                    pointer-events: none;
                    z-index: 9999;
                `;
                document.body.appendChild(heart);
                
                const angle = Math.random() * 360;
                const distance = Math.random() * 300 + 100;
                const x = Math.cos(angle * Math.PI / 180) * distance;
                const y = Math.sin(angle * Math.PI / 180) * distance;
                
                heart.animate([
                    { 
                        transform: 'translate(-50%, -50%) scale(0) rotate(0deg)',
                        opacity: 1
                    },
                    { 
                        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(1.5) rotate(${Math.random() * 720}deg)`,
                        opacity: 0
                    }
                ], {
                    duration: 1500,
                    easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                });
                
                setTimeout(() => heart.remove(), 1500);
            }, i * 50);
        }
    }
    
    // 2. Hover sur copyright = message surprise
    const copyright = document.getElementById('copyrightText');
    if (copyright) {
        const originalText = copyright.textContent;
        copyright.addEventListener('mouseenter', () => {
            copyright.textContent = '💚 Créé avec tout mon amour pour toi 💚';
        });
        copyright.addEventListener('mouseleave', () => {
            copyright.textContent = originalText;
        });
    }
    
    // 3. Konami Code (↑↑↓↓←→←→BA) = Pluie de cœurs
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 
                        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', (e) => {
        if (e.key.toLowerCase() === konamiCode[konamiIndex].toLowerCase()) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                konamiActivated();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
    
    function konamiActivated() {
        alert('💚 Code secret activé ! Pluie de cœurs ! 💚');
        
        const interval = setInterval(() => {
            for (let i = 0; i < 5; i++) {
                const heart = document.createElement('div');
                heart.textContent = '💚';
                heart.style.cssText = `
                    position: fixed;
                    left: ${Math.random() * 100}%;
                    top: -50px;
                    font-size: 30px;
                    pointer-events: none;
                    z-index: 9999;
                `;
                document.body.appendChild(heart);
                
                heart.animate([
                    { top: '-50px', opacity: 1 },
                    { top: '100vh', opacity: 0.5 }
                ], {
                    duration: 3000,
                    easing: 'linear'
                });
                
                setTimeout(() => heart.remove(), 3000);
            }
        }, 200);
        
        setTimeout(() => clearInterval(interval), 5000);
    }
}

// ========================================
// 16. LIGHTBOX GALERIE
// ========================================
function initGalleryLightbox() {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <span class="lightbox-close">&times;</span>
        <img class="lightbox-image" src="" alt="">
    `;
    
    lightbox.style.cssText = `
        display: none;
        position: fixed;
        z-index: 2000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.95);
        justify-content: center;
        align-items: center;
    `;
    
    const closeBtn = lightbox.querySelector('.lightbox-close');
    closeBtn.style.cssText = `
        position: absolute;
        top: 20px;
        right: 40px;
        color: white;
        font-size: 40px;
        cursor: pointer;
        z-index: 2001;
    `;
    
    const img = lightbox.querySelector('.lightbox-image');
    img.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        border-radius: 10px;
        box-shadow: 0 10px 50px rgba(0,0,0,0.8);
    `;
    
    document.body.appendChild(lightbox);
    
    function openLightbox(imageSrc) {
        img.src = imageSrc;
        lightbox.style.display = 'flex';
        lightbox.style.animation = 'fadeIn 0.3s ease';
    }
    
    function closeLightbox() {
        lightbox.style.animation = 'fadeIn 0.3s ease reverse';
        setTimeout(() => {
            lightbox.style.display = 'none';
        }, 300);
    }
    
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
    
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img) {
                openLightbox(img.src);
            } else {
                alert('Remplacez le placeholder par votre vraie photo !');
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', initGalleryLightbox);

// ========================================
// MESSAGE CONSOLE
// ========================================
console.log('%c💚 Merci d\'être là, mon amour 💚', 
    'font-size: 20px; color: #66BB6A; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);');
console.log('%cCe site a été créé avec tout mon amour pour toi ❤️', 
    'font-size: 14px; color: #2E7D32; font-style: italic;');

// ========================================
// NOUVELLES FONCTIONNALITÉS - VERSION ULTIME
// ========================================

// ========================================
// 1. NAVIGATION STICKY
// ========================================
function initStickyNav() {
    const stickyNav = document.getElementById('stickyNav');
    if (!stickyNav) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            stickyNav.classList.add('visible');
        } else {
            stickyNav.classList.remove('visible');
        }
    });
}

document.addEventListener('DOMContentLoaded', initStickyNav);

// ========================================
// 2. LETTRE D'AMOUR ANIMÉE
// ========================================
function initLoveLetter() {
    const letterBody = document.getElementById('letterBody');
    const startBtn = document.getElementById('startLetter');
    const pauseBtn = document.getElementById('pauseLetter');
    const resetBtn = document.getElementById('resetLetter');
    const soundToggle = document.getElementById('typingSoundToggle');
    const penAnimation = document.getElementById('penAnimation');
    const letterDate = document.getElementById('letterDate');
    
    if (!letterBody) return;
    
    // Définir la date actuelle
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    letterDate.textContent = today.toLocaleDateString('fr-FR', options);
    
    // PERSONNALISEZ VOTRE LETTRE ICI
    // LETTRE D’AMOUR PERSONNALISÉE – AMOUR, FOI & HUMOUR IVOIRIEN
const letterText = `
Mon amour,

Si je commence cette lettre, ce n’est pas parce que je manque de mots…
c’est plutôt parce que mon cœur déborde et qu’il fallait bien que ça sorte quelque part 

Depuis que tu es entrée dans ma vie, tout a changé.
Même les petits soucis ont commencé à respecter.
Quand je suis fatigué, tu me donnes la force.
Quand je doute, tu me rappelles qui je suis.

Dieu savait exactement ce qu’Il faisait quand Il t’a mise sur mon chemin.
Ce n’était pas un hasard.
C’était une réponse.
Une prière exaucée.
Une grâce déguisée en sourire.

Tu es cette femme belle, respectueuse, sage et remplie de la crainte de Dieu.
Une femme qui prie.
Une femme qui soutient.
Une femme qui bâtit.
Une femme qui chante pour le Royaume et qui vit pour Lui.
Franchement… Seigneur a bien travaillé 🙏

Avec toi, j’ai compris que l’amour ne fatigue pas,
qu’il ne fait pas de bruit inutile,
qu’il apaise,
qu’il élève,
et surtout qu’il rapproche de Dieu.

Tu me soutiens mentalement, physiquement, spirituellement…
Même financièrement parfois hein 😄
Tu es mon aide semblable, mon os des os, ma chair de la chair,
celle avec qui je veux marcher droit, avancer loin et finir fort.

Je te promets une chose :
Je ne serai pas parfait,
mais je serai présent.
Je ne saurai pas tout,
mais je prierai toujours.
Je ne gagnerai pas tous les combats,
mais je ne quitterai jamais le terrain.

Je veux bâtir avec toi.
Prier avec toi.
Rire avec toi.
Grandir avec toi.
Servir Dieu avec toi.

Si aimer était un métier, je ferais des heures supplémentaires sans réclamer salaire.
Si aimer était un voyage, je choisirais encore toi, même sans GPS.
Et si aimer était un combat… alors avec toi à mes côtés, je suis déjà vainqueur.

Je t’aime.
Aujourd’hui.
Demain.
Et dans tout ce que Dieu a encore prévu pour nous.

Ton mari,
Ton ami,
Ton papa,
Ton confident,
Ton partenaire de destiné.
`;

    
    let currentIndex = 0;
    let typingInterval = null;
    let isPaused = false;
    
    // Son de frappe (synthèse sonore simple)
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    function playTypingSound() {
        if (!soundToggle || !soundToggle.checked) return;
        
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 800 + Math.random() * 200;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.05);
    }
    
    function typeNextChar() {
        if (currentIndex >= letterText.length) {
            stopTyping();
            penAnimation.classList.remove('writing');
            return;
        }
        
        const char = letterText[currentIndex];
        const span = document.createElement('span');
        span.className = 'typed-char';
        span.textContent = char;
        letterBody.appendChild(span);
        
        // Animation du stylo
        if (penAnimation) {
            const rect = span.getBoundingClientRect();
            const containerRect = letterBody.getBoundingClientRect();
            penAnimation.style.left = (rect.left - containerRect.left + 20) + 'px';
            penAnimation.style.top = (rect.top - containerRect.top) + 'px';
            penAnimation.classList.add('writing');
        }
        
        playTypingSound();
        
        currentIndex++;
    }
    
    function startTyping() {
        if (typingInterval) return;
        
        isPaused = false;
        startBtn.style.display = 'none';
        pauseBtn.style.display = 'inline-flex';
        
        // Vitesse de frappe aléatoire pour plus de réalisme
        function typeWithVariableSpeed() {
            typeNextChar();
            if (currentIndex < letterText.length && !isPaused) {
                const delay = 30 + Math.random() * 70; // 30-100ms
                typingInterval = setTimeout(typeWithVariableSpeed, delay);
            }
        }
        
        typeWithVariableSpeed();
    }
    
    function pauseTyping() {
        isPaused = true;
        if (typingInterval) {
            clearTimeout(typingInterval);
            typingInterval = null;
        }
        startBtn.style.display = 'inline-flex';
        pauseBtn.style.display = 'none';
        startBtn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
            </svg>
            Continuer
        `;
    }
    
    function stopTyping() {
        if (typingInterval) {
            clearTimeout(typingInterval);
            typingInterval = null;
        }
        isPaused = false;
        startBtn.style.display = 'inline-flex';
        pauseBtn.style.display = 'none';
        startBtn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
            </svg>
            Recommencer
        `;
    }
    
    function resetLetter() {
        if (typingInterval) {
            clearTimeout(typingInterval);
            typingInterval = null;
        }
        letterBody.innerHTML = '';
        currentIndex = 0;
        isPaused = false;
        startBtn.style.display = 'inline-flex';
        pauseBtn.style.display = 'none';
        penAnimation.classList.remove('writing');
        startBtn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
            </svg>
            Commence à écrire
        `;
    }
    
    startBtn?.addEventListener('click', startTyping);
    pauseBtn?.addEventListener('click', pauseTyping);
    resetBtn?.addEventListener('click', resetLetter);
}

document.addEventListener('DOMContentLoaded', initLoveLetter);

// ========================================
// 3. 100 RAISONS DE T'AIMER
// ========================================
function init100Reasons() {
    const topCard = document.getElementById('topCard');
    const drawBtn = document.getElementById('drawCard');
    const shuffleBtn = document.getElementById('shuffleCards');
    const showAllBtn = document.getElementById('showAllReasons');
    const reasonsCount = document.getElementById('reasonsCount');
    const reasonsProgress = document.getElementById('reasonsProgress');
    const reasonsGrid = document.getElementById('reasonsGrid');
    
    if (!topCard) return;
    
    // PERSONNALISEZ VOS 100 RAISONS ICI
   // 💖 100 RAISONS POUR LESQUELLES JE T’AIME
const reasons = [
    { number: 1, text: "Ton sourire illumine mes journées les plus sombres" },
    { number: 2, text: "Tu es belle intérieurement comme extérieurement" },
    { number: 3, text: "Tu me respectes même quand je ne le mérite pas" },
    { number: 4, text: "Tu crains Dieu et tu marches selon Sa volonté" },
    { number: 5, text: "La paix de Dieu repose sur toi" },
    { number: 6, text: "Ta voix qui chante pour Dieu touche profondément mon âme" },
    { number: 7, text: "Tu es remplie de l’onction et de la présence de Dieu" },
    { number: 8, text: "Tu aimes la Parole de Dieu et tu la mets en pratique" },
    { number: 9, text: "Ton cœur est pur, sincère et authentique" },
    { number: 10, text: "Tu es douce dans tes paroles et dans tes gestes" },
  
    { number: 11, text: "Tu me soutiens mentalement dans mes combats" },
    { number: 12, text: "Tu es toujours là pour m’encourager quand je faiblis" },
    { number: 13, text: "Tu me conseilles avec sagesse et discernement" },
    { number: 14, text: "Tu me soutiens financièrement sans jamais me rabaisser" },
    { number: 15, text: "Tu m’aimes d’un amour sincère et fidèle" },
    { number: 16, text: "Tu apportes la joie et la paix dans ma vie" },
    { number: 17, text: "Ton sourire est pour moi le plus beau du monde" },
    { number: 18, text: "Tu crois en moi même quand je doute de moi-même" },
    { number: 19, text: "Tu fais de notre relation un véritable foyer" },
    { number: 20, text: "Ta présence est un cadeau précieux que Dieu m’a fait" },
  
    { number: 21, text: "Tu pries pour moi même quand je ne le sais pas" },
    { number: 22, text: "Tu intercèdes pour moi devant Dieu avec amour" },
    { number: 23, text: "Tu m’aides à rester dans le droit chemin" },
    { number: 24, text: "Tu vis pour le Royaume de Dieu et Sa gloire" },
    { number: 25, text: "Ton zèle pour Dieu m’inspire chaque jour" },
    { number: 26, text: "Ta vie est une adoration constante" },
    { number: 27, text: "Quand tu chantes, la présence de Dieu se manifeste" },
    { number: 28, text: "Tu es une femme selon le cœur de Dieu" },
    { number: 29, text: "Tu te laisses guider par le Saint-Esprit" },
    { number: 30, text: "Tu portes de bons fruits spirituels dans ta vie" },
  
    { number: 31, text: "Tu me relèves sans jamais me juger" },
    { number: 32, text: "Tu marches avec moi dans les bons comme les mauvais moments" },
    { number: 33, text: "Tu sais dire la vérité avec amour" },
    { number: 34, text: "Ta paix apaise mes tempêtes intérieures" },
    { number: 35, text: "Tu m’aimes malgré mes défauts et mes faiblesses" },
    { number: 36, text: "Tu es une femme de grande valeur" },
    { number: 37, text: "Tu m’aides à grandir spirituellement chaque jour" },
    { number: 38, text: "Tu m’encourages à marcher dans mon appel" },
    { number: 39, text: "Tes prières sont une protection pour ma vie" },
    { number: 40, text: "Tu es une lumière constante dans mon quotidien" },
  
    { number: 41, text: "Tu es l’os de mes os et la chair de ma chair" },
    { number: 42, text: "Notre amour est fondé sur Dieu et non sur le monde" },
    { number: 43, text: "Notre union est une alliance sacrée devant Dieu" },
    { number: 44, text: "Dieu est au centre de notre relation" },
    { number: 45, text: "Avec toi je veux bâtir un avenir solide" },
    { number: 46, text: "Tu construis avec moi et jamais contre moi" },
    { number: 47, text: "Tu es mon repos après les combats de la vie" },
    { number: 48, text: "Tu es ma joie dès le réveil" },
    { number: 49, text: "Avec toi, la vie est une aventure bénie" },
    { number: 50, text: "Tu es la réponse claire à mes prières" },
  
    { number: 51, text: "Dieu m’a fait une grâce immense en te plaçant sur ma route" },
    { number: 52, text: "Tu es un instrument entre les mains de Dieu" },
    { number: 53, text: "Tu m’aides à me rapprocher davantage de Christ" },
    { number: 54, text: "Tu reflètes l’amour de Dieu autour de toi" },
    { number: 55, text: "Ta vie est un témoignage vivant" },
    { number: 56, text: "Ton chant glorifie Dieu et édifie les cœurs" },
    { number: 57, text: "Ta foi est vraie, forte et inspirante" },
    { number: 58, text: "Je t’aime parce que Dieu nous a unis" },
    { number: 59, text: "Tu es une reine selon le cœur de Dieu" },
    { number: 60, text: "Je t’aime aujourd’hui, demain et pour l’éternité" },
  
    { number: 61, text: "Tu sais aimer avec patience" },
    { number: 62, text: "Tu sais pardonner avec maturité" },
    { number: 63, text: "Tu es fidèle dans les petites comme les grandes choses" },
    { number: 64, text: "Tu sais encourager sans humilier" },
    { number: 65, text: "Tu es humble malgré tes dons" },
    { number: 66, text: "Tu honores Dieu dans ta façon de vivre" },
    { number: 67, text: "Tu respectes les valeurs bibliques" },
    { number: 68, text: "Tu sais écouter avant de parler" },
    { number: 69, text: "Tu sais aimer sans condition" },
    { number: 70, text: "Tu es une bénédiction dans ma vie" },
  
    { number: 71, text: "Tu es une femme de prière" },
    { number: 72, text: "Tu es une femme de foi" },
    { number: 73, text: "Tu es une femme de sagesse" },
    { number: 74, text: "Tu es une femme de paix" },
    { number: 75, text: "Tu es une femme de caractère" },
    { number: 76, text: "Tu es une femme d’amour" },
    { number: 77, text: "Tu es une femme de grâce" },
    { number: 78, text: "Tu es une femme de vision" },
    { number: 79, text: "Tu es une femme d’excellence" },
    { number: 80, text: "Tu es une femme selon le plan de Dieu" },
  
    { number: 81, text: "Tu me pousses à devenir un meilleur homme" },
    { number: 82, text: "Tu me rappelles toujours Dieu dans mes choix" },
    { number: 83, text: "Tu sais rester forte dans l’épreuve" },
    { number: 84, text: "Tu sais rester humble dans la victoire" },
    { number: 85, text: "Tu sais aimer sans te lasser" },
    { number: 86, text: "Tu es un soutien solide dans ma vie" },
    { number: 87, text: "Tu es une compagne fidèle" },
    { number: 88, text: "Tu es un cadeau précieux de Dieu" },
    { number: 89, text: "Tu es une bénédiction quotidienne" },
    { number: 90, text: "Tu es un miracle dans ma vie" },
  
    { number: 91, text: "Tu fais partie de mon appel" },
    { number: 92, text: "Tu fais partie de ma destinée" },
    { number: 93, text: "Tu fais partie de mon avenir" },
    { number: 94, text: "Tu fais partie de mes prières" },
    { number: 95, text: "Tu fais partie de mes projets" },
    { number: 96, text: "Tu fais partie de mes combats" },
    { number: 97, text: "Tu fais partie de mes victoires" },
    { number: 98, text: "Tu fais partie de ma vie" },
    { number: 99, text: "Tu fais partie de mon cœur" },
    { number: 100, text: "Je t’aime parce que Dieu t’a choisie pour moi" }
  ];
  
    
    // Compléter jusqu'à 100 avec des raisons génériques si besoin
    while (reasons.length < 100) {
        reasons.push({
            emoji: "💚",
            text: `Raison #${reasons.length + 1} : Tu es incroyable !`
        });
    }
    
    let currentIndex = 0;
    let discoveredReasons = new Set();
    let shuffledReasons = [...reasons];
    
    // Charger les raisons découvertes du localStorage
    // NE PAS charger depuis localStorage - reset automatique
    // const saved = localStorage.getItem("discoveredReasons");
    // if (saved) {
    //     discoveredReasons = new Set(JSON.parse(saved));
    //     updateProgress();
    //     displayCollectedReasons();
    // }
    
    
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    
    function displayReason(index) {
        const reason = shuffledReasons[index];
        const cardNumber = document.getElementById('cardNumber');
        const cardEmoji = document.getElementById('cardEmoji');
        const cardReason = document.getElementById('cardReason');
        
        if (cardNumber) cardNumber.textContent = index + 1;
        if (cardEmoji) cardEmoji.textContent = reason.emoji;
        if (cardReason) cardReason.textContent = reason.text;
        
        // Marquer comme découverte
        discoveredReasons.add(index);
        // NE PAS sauvegarder - reset automatique
        
        updateProgress();
        displayCollectedReasons();
    }
    
    function updateProgress() {
        const count = discoveredReasons.size;
        if (reasonsCount) reasonsCount.textContent = count;
        if (reasonsProgress) {
            reasonsProgress.style.width = `${(count / 100) * 100}%`;
        }
    }
    
    function displayCollectedReasons() {
        if (!reasonsGrid) return;
        
        reasonsGrid.innerHTML = '';
        discoveredReasons.forEach(index => {
            const reason = shuffledReasons[index];
            const reasonEl = document.createElement('div');
            reasonEl.className = 'collected-reason';
            reasonEl.innerHTML = `
                <span class="emoji">${reason.emoji}</span>
                <span>#${index + 1}</span>
            `;
            reasonEl.title = reason.text;
            reasonsGrid.appendChild(reasonEl);
        });
    }
    
    function drawCard() {
        // Animation de tirage
        topCard.style.animation = 'cardFlip 0.6s ease-out';
        
        setTimeout(() => {
            displayReason(currentIndex);
            currentIndex = (currentIndex + 1) % reasons.length;
            topCard.style.animation = '';
        }, 300);
    }
    
    function shuffleCards() {
        shuffledReasons = shuffleArray([...reasons]);
        currentIndex = 0;
        
        // Animation de mélange
        topCard.style.animation = 'shuffle 0.5s ease-in-out';
        setTimeout(() => {
            topCard.style.animation = '';
        }, 500);
    }
    
    function showAllReasons() {
        if (confirm('Veux-tu vraiment découvrir toutes les raisons d\'un coup ? Ce sera moins drôle après ! 😊')) {
            for (let i = 0; i < reasons.length; i++) {
                discoveredReasons.add(i);
            }
            // NE PAS sauvegarder - reset automatique
            updateProgress();
            displayCollectedReasons();
            alert('💚 Toutes les raisons découvertes ! Tu peux maintenant les relire quand tu veux.');
        }
    }
    
    drawBtn?.addEventListener('click', drawCard);
    shuffleBtn?.addEventListener('click', shuffleCards);
    showAllBtn?.addEventListener('click', showAllReasons);
    topCard?.addEventListener('click', drawCard);
    
    // Afficher la première raison
    displayReason(0);
}

// Ajouter les animations CSS manquantes
const style100Reasons = document.createElement('style');
style100Reasons.textContent = `
    @keyframes cardFlip {
        0% { transform: translate(-50%, -50%) rotateY(0deg) scale(1); }
        50% { transform: translate(-50%, -50%) rotateY(90deg) scale(1.1); }
        100% { transform: translate(-50%, -50%) rotateY(0deg) scale(1); }
    }
    @keyframes shuffle {
        0%, 100% { transform: translate(-50%, -50%) rotate(0deg); }
        25% { transform: translate(-50%, -50%) rotate(-10deg); }
        75% { transform: translate(-50%, -50%) rotate(10deg); }
    }
`;
document.head.appendChild(style100Reasons);

// ========================================
// 4. CALENDRIER DES 14 CADEAUX
// ========================================
function initGiftsCalendar() {
    const giftBoxes = document.querySelectorAll('.gift-box');
    const giftModal = document.getElementById('giftModal');
    const closeGiftModal = document.getElementById('closeGiftModal');
    const unlockAllBtn = document.getElementById('unlockAllGifts');
    const giftsOpened = document.getElementById('giftsOpened');
    const giftsProgressFill = document.getElementById('giftsProgressFill');
    
    if (giftBoxes.length === 0) return;
    
    // PERSONNALISEZ VOS 14 CADEAUX ICI
    const gifts = [
        {
          day: 1,
          title: "Notre Alliance Devant Dieu",
          message: "Je rends grâce à Dieu pour ta vie. Je te choisis chaque jour comme aide semblable, compagne de destinée et partenaire d’alliance selon le cœur de Dieu.",
          extra: "Genèse 2:24"
        },
        {
          day: 2,
          title: "Ma Prière Pour Toi",
          message: "Je prie que le Seigneur te fortifie, te protège et t’élève. Que Sa paix repose sur toi et que Sa faveur t’accompagne partout où tu iras.",
          extra: "Nombres 6:24-26"
        },
        {
          day: 3,
          title: "Ton Chant Qui Élève Mon Âme",
          message: "Quand tu chantes pour Dieu, mon cœur est touché. Ton adoration n’est pas seulement une voix, c’est une offrande vivante.",
          extra: "Psaume 22:3"
        },
        {
          day: 4,
          title: "La Femme Que Dieu M’a Donnée",
          message: "Tu n’es pas un hasard dans ma vie. Tu es une réponse divine, une bénédiction préparée par Dieu pour marcher avec moi.",
          extra: "Proverbes 18:22"
        },
        {
          day: 5,
          title: "Mon Soutien Dans Les Combats",
          message: "Quand je faiblis, tu pries. Quand je doute, tu m’encourages. Tu es une force envoyée par Dieu dans ma vie.",
          extra: "Ecclésiaste 4:9-10"
        },
        {
          day: 6,
          title: "Notre Paix À La Maison",
          message: "Je prie que notre foyer soit rempli de paix, de respect et d’amour. Un lieu où Dieu est honoré chaque jour.",
          extra: "Josué 24:15"
        },
        {
          day: 7,
          title: "Mon Engagement D’Homme",
          message: "Je m’engage à t’aimer avec responsabilité, à te protéger, à te respecter et à marcher dans la droiture devant Dieu et devant toi.",
          extra: "Ephésiens 5:25"
        },
        {
          day: 8,
          title: "La Grâce Qui Repose Sur Toi",
          message: "Tu es une femme de grâce, de sagesse et de paix. La main de Dieu est visible sur ta vie.",
          extra: "Proverbes 31:30"
        },
        {
          day: 9,
          title: "Notre Vision Commune",
          message: "Je rêve avec toi. Bâtir, servir Dieu, impacter des vies et laisser une trace selon la volonté du Seigneur.",
          extra: "Habacuc 2:2"
        },
        {
          day: 10,
          title: "Ma Fidélité",
          message: "Je choisis la fidélité dans mes pensées, dans mes paroles et dans mes actes. Mon cœur t’est consacré.",
          extra: "Hébreux 13:4"
        },
        {
          day: 11,
          title: "Notre Héritage Spirituel",
          message: "Je prie que nos enfants (présents ou à venir) grandissent dans la crainte de Dieu et l’amour de la vérité.",
          extra: "Psaume 127:3"
        },
        {
          day: 12,
          title: "La Femme Ivoirienne De Valeur",
          message: "Tu portes la dignité, la sagesse et la force de la femme ivoirienne. Une femme debout, respectueuse et remplie de Dieu.",
          extra: "Proverbes 31:25"
        },
        {
          day: 13,
          title: "Ma Reconnaissance",
          message: "Merci d’être là, merci de prier pour moi, merci de marcher avec moi. Je ne prends pas ton amour à la légère.",
          extra: "1 Thessaloniciens 5:18"
        },
        {
          day: 14,
          title: "Mon Amour Devant Dieu",
          message: "Devant Dieu et devant les hommes, je t’aime. Tu es l’os de mes os, la chair de ma chair. Joyeuse Saint-Valentin mon épouse de cœur.",
          extra: "Cantique des Cantiques 6:3"
        }
      ];
      
    
    // Charger les cadeaux ouverts
    // Charger les cadeaux ouverts (désactivé pour reset automatique)
    let openedGifts = new Set();
    // const saved = localStorage.getItem('openedGifts'); // Désactivé pour reset auto
    const saved = null; // Toujours commencer vierge
    if (saved) {
        openedGifts = new Set(JSON.parse(saved));
        updateGiftsProgress();
        openedGifts.forEach(day => {
            const box = document.querySelector(`.gift-box[data-day="${day}"]`);
            if (box) box.classList.add('opened');
        });
    }
    
    function updateGiftsProgress() {
        const count = openedGifts.size;
        if (giftsOpened) giftsOpened.textContent = count;
        if (giftsProgressFill) {
            giftsProgressFill.style.width = `${(count / 14) * 100}%`;
        }
    }
    
    function openGift(day) {
        const gift = gifts[day - 1];
        if (!gift) return;
        
        // Marquer comme ouvert
        openedGifts.add(day);
        // NE PAS sauvegarder - reset automatique
        updateGiftsProgress();
        
        // Afficher le modal
        document.getElementById('giftTitle').textContent = gift.title;
        document.getElementById('giftEmoji').textContent = gift.emoji;
        document.getElementById('giftMessage').textContent = gift.message;
        
        const extraEl = document.getElementById('giftExtra');
        if (gift.extra) {
            extraEl.textContent = gift.extra;
            extraEl.style.display = 'block';
            extraEl.style.fontSize = '2rem';
            extraEl.style.marginTop = '1rem';
        } else {
            extraEl.style.display = 'none';
        }
        
        giftModal.style.display = 'flex';
        
        // Animation d'ouverture de la boîte
        const box = document.querySelector(`.gift-box[data-day="${day}"]`);
        if (box) {
            box.classList.add('opened');
            createConfettiForGift(box);
        }
    }
    
    function createConfettiForGift(box) {
        const rect = box.getBoundingClientRect();
        const colors = ['#FFD700', '#FFA500', '#66BB6A', '#A5D6A7'];
        
        for (let i = 0; i < 20; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                left: ${rect.left + rect.width / 2}px;
                top: ${rect.top}px;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                pointer-events: none;
                z-index: 9999;
            `;
            document.body.appendChild(confetti);
            
            const angle = (Math.random() * 360) * Math.PI / 180;
            const velocity = Math.random() * 200 + 100;
            const x = Math.cos(angle) * velocity;
            const y = Math.sin(angle) * velocity - 100;
            
            confetti.animate([
                { transform: 'translate(0, 0) rotate(0deg)', opacity: 1 },
                { transform: `translate(${x}px, ${y}px) rotate(720deg)`, opacity: 0 }
            ], {
                duration: 1000,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            });
            
            setTimeout(() => confetti.remove(), 1000);
        }
    }
    
    // Event listeners
    giftBoxes.forEach(box => {
        box.addEventListener('click', () => {
            const day = parseInt(box.dataset.day);
            openGift(day);
        });
    });
    
    closeGiftModal?.addEventListener('click', () => {
        giftModal.style.display = 'none';
    });
    
    giftModal?.addEventListener('click', (e) => {
        if (e.target === giftModal) {
            giftModal.style.display = 'none';
        }
    });
    
    unlockAllBtn?.addEventListener('click', () => {
        if (confirm('Veux-tu vraiment débloquer tous les cadeaux maintenant ? 🎁')) {
            for (let i = 1; i <= 14; i++) {
                openedGifts.add(i);
                const box = document.querySelector(`.gift-box[data-day="${i}"]`);
                if (box) box.classList.add('opened');
            }
            // NE PAS sauvegarder - reset automatique
            updateGiftsProgress();
            alert('🎁 Tous les cadeaux sont maintenant débloqués ! Profite-en bien ! 💚');
        }
    });
}

// ========================================
// 5. GALERIE DE SOUVENIRS INTERACTIVE (REMPLACE CONSTELLATION)
// ========================================
function initMemoriesGallery() {
    const memoriesGrid = document.getElementById('memoriesGrid');
    const memoryModal = document.getElementById('memoryModal');
    const closeMemory = document.getElementById('closeMemory');
    const filterBtns = document.querySelectorAll('.filter-memory-btn');
    
    if (!memoriesGrid) return;
    
    // ========================================
    // PERSONNALISEZ VOS SOUVENIRS ICI
    // ========================================
    // Pour ajouter vos propres photos :
    // 1. Uploadez vos photos sur imgur.com ou un autre service
    // 2. Copiez le lien direct de l'image
    // 3. Remplacez les URL ci-dessous
    
    const memories = [
        {
            id: 1,
            category: 'special',
            date: '22 mars 2024',
            title: 'La ou toute a vraiment débuté pour de vrai',
            description: 'Le temps passe vite quand on est heureux. Chaque jour avec toi est un cadeau précieux.',
            image:'assets/images/image3.jpeg' // REMPLACEZ
        },
        {
            id: 2,
            category: 'special',
            date: '3 Avril 2024',
            title: 'Meme après ma betise tu étais la ...',
            description: 'BISOU MON COEUR',
            image:'assets/images/image5.jpeg' // REMPLACEZ
        },
        {
            id: 3,
            category: 'special',
            date: '10 Avril 2024',
            title: 'Notre Première sortie de couple ',
            description: 'En tout cas je sais pas a qui tu faisais bisou mais tu vas m\'expliquer ça fhum',
            image:'assets/images/image4.jpeg' // REMPLACEZ
        },
        {
            id: 4,
            category: 'couple',
            date: '6 Aout 2024',
            title: 'On sent que tu es fan de moi tchiaaaa mdr',
            description: 'Bisou ça la si j\'avais pas fais la fhum Dieu seul allais connaitre mon sort',
            image: 'assets/images/image10.jpeg' // REMPLACEZ
        },
        {
            id: 5,
            category: 'special',
            date: '5 Décembre 2025',
            title: 'TCHIAAAAAAA ',
            description: 'MOi seul mon problème...',
            image: 'assets/images/image8.jpeg' // REMPLACEZ
        },
        {
            id: 6,
            category: 'voyage',
            date: '5 Décembre 2025',
            title: ' anitchoonnnn ',
            description: 'Quand je te regarde comme ça et je me dis wep tu es problème meme tchiaaaaaaa ',
            image: 'assets/images/image7.jpeg' // REMPLACEZ
        },
        {
            id: 7,
            category: 'voyage',
            date: '21 Décembre 2025',
            title: ' PRISE DES PORTES 2026',
            description: 'l\'ange CISCO et l\'ange CISCA ',
            image: 'assets/images/image2.jpeg' // REMPLACEZ
        },
        {
            id: 8,
            category: 'couple',
            date: '15 Décembre 2025',
            title: 'Moments Complices',
            description: 'Ces petits moments qui comptent. Les fous rires, les regards complices, notre connexion unique.',
            image: 'assets/images/image6.jpeg' // REMPLACEZ
        },
        {
            id: 9,
            category: 'couple',
            date: '31 Décembre 2025',
            title: 'Une super soirée avec madame mon épouse',
            description: 'Tu es fan ma petite,Souri orrrrrrrr mdrrrrr bisouuuuuuu labas ',
            image: 'assets/images/image.jpeg'
            // REMPLACEZ PAR VOTRE PHOTO
        },
       
       
        
       
        // AJOUTEZ AUTANT DE SOUVENIRS QUE VOUS VOULEZ !
        // Copiez-collez ce bloc et modifiez les informations :
        /*
        ,{
            id: 10,
            category: 'couple', // ou 'voyage' ou 'special'
            date: 'Votre Date',
            title: 'Titre du Souvenir',
            description: 'Description détaillée...',
            image: 'URL_DE_VOTRE_PHOTO'
        }
        */
    ];
    
    let currentMemoryIndex = 0;
    
    // Générer les cartes
    function renderMemories(filter = 'all') {
        memoriesGrid.innerHTML = '';
        
        memories.forEach((memory, index) => {
            if (filter === 'all' || memory.category === filter) {
                const card = document.createElement('div');
                card.className = 'memory-card';
                card.dataset.category = memory.category;
                card.innerHTML = `
                    <img src="${memory.image}" alt="${memory.title}" class="memory-card-image">
                    <div class="memory-card-overlay">
                        <div class="memory-card-date">${memory.date}</div>
                        <div class="memory-card-title">${memory.title}</div>
                        <div class="memory-card-preview">${memory.description.substring(0, 60)}...</div>
                    </div>
                `;
                
                card.addEventListener('click', () => openMemory(index));
                memoriesGrid.appendChild(card);
            }
        });
    }
    
    // Ouvrir un souvenir en modal
    function openMemory(index) {
        currentMemoryIndex = index;
        const memory = memories[index];
        
        document.getElementById('memoryImageLarge').src = memory.image;
        document.getElementById('memoryDate').textContent = memory.date;
        document.getElementById('memoryTitle').textContent = memory.title;
        document.getElementById('memoryDescription').textContent = memory.description;
        
        // Gérer les boutons précédent/suivant
        const prevBtn = document.getElementById('memoryPrev');
        const nextBtn = document.getElementById('memoryNext');
        
        prevBtn.disabled = index === 0;
        nextBtn.disabled = index === memories.length - 1;
        
        memoryModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Fermer le modal
    function closeMemoryModal() {
        memoryModal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Navigation dans le modal
    document.getElementById('memoryPrev')?.addEventListener('click', () => {
        if (currentMemoryIndex > 0) {
            openMemory(currentMemoryIndex - 1);
        }
    });
    
    document.getElementById('memoryNext')?.addEventListener('click', () => {
        if (currentMemoryIndex < memories.length - 1) {
            openMemory(currentMemoryIndex + 1);
        }
    });
    
    // Fermeture du modal
    closeMemory?.addEventListener('click', closeMemoryModal);
    memoryModal?.addEventListener('click', (e) => {
        if (e.target === memoryModal || e.target.classList.contains('memory-modal-overlay')) {
            closeMemoryModal();
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (memoryModal.classList.contains('active')) {
            if (e.key === 'Escape') closeMemoryModal();
            if (e.key === 'ArrowLeft' && currentMemoryIndex > 0) openMemory(currentMemoryIndex - 1);
            if (e.key === 'ArrowRight' && currentMemoryIndex < memories.length - 1) openMemory(currentMemoryIndex + 1);
        }
    });
    
    // Filtres
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            renderMemories(filter);
        });
    });
    
    // Initialisation
    renderMemories();
}

// ========================================
// 6. JARDIN D'AMOUR
// ========================================
function initGarden() {
    const flowersGroup = document.getElementById('flowersGroup');
    const monthsTogether = document.getElementById('monthsTogether');
    const flowersBlossomed = document.getElementById('flowersBlossomed');
    const growBtn = document.getElementById('growNextFlower');
    const bloomAllBtn = document.getElementById('bloomAllFlowers');
    const flowerMessage = document.getElementById('flowerMessage');
    
    if (!flowersGroup) return;
    
    // Calculer les mois ensemble
    const months = Math.floor((new Date() - relationshipStart) / (1000 * 60 * 60 * 24 * 30));
    if (monthsTogether) monthsTogether.textContent = months;
    
    // PERSONNALISEZ VOS MESSAGES PAR MOIS ICI
    const flowerMessages = [
        "Mois 1 : Une rencontre guidée par Dieu — Nos cœurs se sont reconnus immédiatement",
        
        "Mois 2 : Une connexion évidente — Comme si nos âmes se connaissaient déjà",
        
        "Mois 3 : La certitude intérieure — J’ai compris que tu étais celle que Dieu m’avait destinée",
        
        "Mois 4 : Une unité rapide — Nos pensées, nos valeurs et notre foi alignées",
        
        "Mois 5 : Une paix profonde — Être avec toi me rapprochait encore plus de Dieu",
        
        "Mois 6 : Une croissance spirituelle — Nous avons commencé à avancer ensemble dans la foi",
        
        "Mois 7 : Un refuge mutuel — Tu es devenue mon lieu de paix et de repos",
        
        "Mois 8 : Une alliance visible — Dieu était au centre de chacun de nos pas",
        
        "Mois 9 : Une vision commune — Bâtir, servir et honorer Dieu ensemble",
        
        "Mois 10 : Une maturité installée — L’amour s’est enraciné dans la sagesse",
        
        "Mois 11 : Une relation affermie — Plus qu’un couple, une équipe pour le Royaume",
        
        "Mois 12 : Une évidence divine — Ce que Dieu a uni, rien ne peut le séparer"
      ];
      
    
    // Compléter pour plus de mois si nécessaire
    for (let i = flowerMessages.length; i < months + 5; i++) {
        flowerMessages.push(`Mois ${i + 1} : Notre amour continue de grandir 🌸`);
    }
    
    const flowerTypes = [
        { color: '#FF69B4', petals: 5, name: 'Rose' },
        { color: '#FF1493', petals: 6, name: 'Hibiscus' },
        { color: '#FFD700', petals: 12, name: 'Tournesol' },
        { color: '#FF6347', petals: 5, name: 'Tulipe' },
        { color: '#FFC0CB', petals: 5, name: 'Cerisier' },
        { color: '#9370DB', petals: 5, name: 'Lavande' }
    ];
    
    let currentFlowers = 0;
    
    // NE PAS charger depuis localStorage pour que ça se réinitialise à chaque visite
    // const savedFlowers = localStorage.getItem('gardenFlowers');
    // if (savedFlowers) {
    //     currentFlowers = parseInt(savedFlowers);
    // }
    
    function drawFlower(x, y, flowerType, monthIndex) {
        const flower = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        flower.classList.add('flower');
        flower.setAttribute('data-month', monthIndex);
        
        // Tige
        const stem = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        stem.setAttribute('x1', x);
        stem.setAttribute('y1', y);
        stem.setAttribute('x2', x);
        stem.setAttribute('y2', y + 80);
        stem.setAttribute('stroke', '#2E7D32');
        stem.setAttribute('stroke-width', '3');
        flower.appendChild(stem);
        
        // Feuilles
        const leaf1 = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
        leaf1.setAttribute('cx', x - 10);
        leaf1.setAttribute('cy', y + 40);
        leaf1.setAttribute('rx', '8');
        leaf1.setAttribute('ry', '15');
        leaf1.setAttribute('fill', '#4CAF50');
        leaf1.setAttribute('transform', `rotate(-30 ${x - 10} ${y + 40})`);
        flower.appendChild(leaf1);
        
        const leaf2 = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
        leaf2.setAttribute('cx', x + 10);
        leaf2.setAttribute('cy', y + 50);
        leaf2.setAttribute('rx', '8');
        leaf2.setAttribute('ry', '15');
        leaf2.setAttribute('fill', '#4CAF50');
        leaf2.setAttribute('transform', `rotate(30 ${x + 10} ${y + 50})`);
        flower.appendChild(leaf2);
        
        // Pétales
        const petalCount = flowerType.petals;
        for (let i = 0; i < petalCount; i++) {
            const angle = (360 / petalCount) * i;
            const petal = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
            const petalX = x + Math.cos(angle * Math.PI / 180) * 15;
            const petalY = y + Math.sin(angle * Math.PI / 180) * 15;
            
            petal.setAttribute('cx', petalX);
            petal.setAttribute('cy', petalY);
            petal.setAttribute('rx', '12');
            petal.setAttribute('ry', '8');
            petal.setAttribute('fill', flowerType.color);
            petal.setAttribute('opacity', '0.9');
            petal.setAttribute('transform', `rotate(${angle} ${petalX} ${petalY})`);
            flower.appendChild(petal);
        }
        
        // Centre
        const center = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        center.setAttribute('cx', x);
        center.setAttribute('cy', y);
        center.setAttribute('r', '8');
        center.setAttribute('fill', '#FFD700');
        flower.appendChild(center);
        
        // Event listener
        flower.addEventListener('click', () => {
            showFlowerMessage(monthIndex);
        });
        
        flower.addEventListener('mouseenter', () => {
            flower.style.transform = 'scale(1.1)';
        });
        
        flower.addEventListener('mouseleave', () => {
            flower.style.transform = 'scale(1)';
        });
        
        // Animation d'apparition
        flower.style.opacity = '0';
        flower.style.transform = 'translateY(50px) scale(0)';
        flowersGroup.appendChild(flower);
        
        setTimeout(() => {
            flower.style.transition = 'all 1s ease-out';
            flower.style.opacity = '1';
            flower.style.transform = 'translateY(0) scale(1)';
        }, 100);
    }
    
    function showFlowerMessage(monthIndex) {
        const message = flowerMessages[monthIndex] || `Mois ${monthIndex + 1}`;
        document.getElementById('flowerMonth').textContent = `Mois ${monthIndex + 1}`;
        document.getElementById('flowerMemory').textContent = message;
        flowerMessage.classList.add('visible');
        
        setTimeout(() => {
            flowerMessage.classList.remove('visible');
        }, 3000);
    }
    
    function growNextFlower() {
        if (currentFlowers >= months) {
            alert('Toutes les fleurs pour vos mois ensemble sont déjà là ! 🌸');
            return;
        }
        
        const spacing = 80;
        const startX = 100;
        const y = 250;
        const x = startX + (currentFlowers * spacing);
        const flowerType = flowerTypes[currentFlowers % flowerTypes.length];
        
        drawFlower(x, y, flowerType, currentFlowers);
        currentFlowers++;
        
        // NE PAS sauvegarder pour reset automatique
        // localStorage.setItem('gardenFlowers', currentFlowers);
        if (flowersBlossomed) flowersBlossomed.textContent = currentFlowers;
    }
    
    function bloomAllFlowers() {
        const count = Math.min(months, 12); // Limiter à 12 pour ne pas surcharger
        for (let i = currentFlowers; i < count; i++) {
            setTimeout(() => {
                growNextFlower();
            }, i * 200);
        }
    }
    
    // NE PAS initialiser avec les fleurs sauvegardées - fresh start à chaque fois
    if (flowersBlossomed) flowersBlossomed.textContent = currentFlowers;
    
    growBtn?.addEventListener('click', growNextFlower);
    bloomAllBtn?.addEventListener('click', bloomAllFlowers);
}

// ========================================
// FONCTION DE RÉINITIALISATION COMPLÈTE
// ========================================
function resetAllProgress() {
    if (confirm('⚠️ Êtes-vous sûr de vouloir tout réinitialiser ?\n\nCela supprimera :\n- Les raisons découvertes\n- Les cadeaux ouverts\n- Toutes les données sauvegardées\n\nCette action est irréversible !')) {
        // Supprimer toutes les données du localStorage
        localStorage.removeItem('discoveredReasons');
        localStorage.removeItem('openedGifts');
        localStorage.removeItem('gardenFlowers');
        
        // Recharger la page
        alert('✅ Tout a été réinitialisé ! La page va se recharger.');
        location.reload();
    }
}


// ========================================
// NAVIGATION RESPONSIVE - MENU HAMBURGER
// Ajoutez ce code à votre fichier JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // MENU HAMBURGER
    // ========================================
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-item');
    
    // Vérifier que les éléments existent
    if (!hamburger || !navLinks) {
        console.error('Éléments de navigation manquants !');
        return;
    }
    
    console.log('Navigation initialisée !');
    
    // Toggle menu au clic sur hamburger
    hamburger.addEventListener('click', function() {
        console.log('Hamburger cliqué !');
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        // Bloquer le scroll du body quand menu ouvert
        if (navLinks.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Fermer le menu quand on clique sur un lien
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            console.log('Nav item cliqué :', this.textContent);
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Fermer le menu si on clique en dehors
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navLinks.contains(event.target);
        const isClickOnHamburger = hamburger.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnHamburger && navLinks.classList.contains('active')) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Fermer le menu au redimensionnement (si on passe en desktop)
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // ========================================
    // NAVIGATION ACTIVE SELON LA SECTION
    // ========================================
    
    // Fonction pour mettre à jour l'élément actif selon le scroll
    function updateActiveNavItem() {
        const sections = document.querySelectorAll('section[id]');
        const navItems = document.querySelectorAll('.nav-item');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 100) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${currentSection}`) {
                item.classList.add('active');
            }
        });
    }
    
    // Écouter le scroll
    window.addEventListener('scroll', updateActiveNavItem);
    
    // Au chargement de la page
    window.addEventListener('load', updateActiveNavItem);
    
    // ========================================
    // STICKY NAV - APPARITION AU SCROLL
    // ========================================
    const stickyNav = document.querySelector('.sticky-nav');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            stickyNav.classList.add('visible');
            stickyNav.classList.add('scrolled');
        } else {
            stickyNav.classList.remove('scrolled');
        }
    });
});

// ========================================
// EXPORT
// ========================================
window.scrollToSection = scrollToSection;