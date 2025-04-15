//Initialisation de notre moteur de langues
const langButton = document.getElementById("langSwitcher");
const elementsATraduire = document.querySelectorAll("[data-lang-key]");

let traduction = {};

let savedLang = localStorage.getItem("language") || "fr";
updateLanguage(savedLang);
if (savedLang === "en") {
    langButton.innerText = "FR";
}

// Détection de nos cartes et bouton
const carteGauche = document.getElementById('carteGauche');
const carteDroite = document.getElementById('carteDroite');
const reset = document.getElementById('boutonReset');

// Stock de nos choix, il sert surtout à aller chercher la bonne key dans la traduction
const choixStock = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
];

let incrChoix = 1; //Pour savoir où l'on se trouve dans les choix
let checkScore = 0; // Pour checker si l'utilisateur a parcouru tout le tableau
let isAnimating = false; //Filtre anti-spam

// Triggers du click selon la carte
carteGauche.addEventListener('click', () => {
    if (isAnimating === false) { //Protection anti-spam click
        isAnimating = !isAnimating;
        if (checkScore < choixStock.length - 1) { //check si on a pas atteint la fin du tableau
            animChoixSuivant(carteGauche, carteDroite, 'trigger');
            setTimeout(() => {
                actuelChoix();
            }, 700);
            // Retrait de la protection du spam click
            setTimeout(() => {
                isAnimating = !isAnimating;
            }, 1500);
        }
        //ici on vérifie qu'il n'a pas fait un tour complet
        checkScore++;
        if (checkScore === choixStock.length - 1) {
            // S'il a fait un tour complet, alors on passe à l'écran de fin
            carteGauche.classList.add('finalite');
            carteDroite.classList.add('hide')
            reset.classList.remove('hide');
        }
    }
});

carteDroite.addEventListener('click', () => {
    if (isAnimating === false) { //Protection anti-spam click
        isAnimating = !isAnimating;
        if (checkScore < choixStock.length - 1) { //check si on a pas atteint la fin du tableau
            if (checkScore < choixStock.length - 2) {
                animChoixSuivant(carteDroite, carteGauche, 'monte');
            }else{
                animChoixSuivant(carteDroite, carteGauche, 'trigger');
            }
            setTimeout(() => {
                nouveauChoix();
            }, 700);
            //Retrait de la protection du spam clicl
            setTimeout(() => {
                isAnimating = !isAnimating;
            }, 1500);
        }
        checkScore++;
        if (checkScore === choixStock.length - 1) {
            // S'il a fait un tour complet, alors on passe à l'écran de fin
            carteGauche.classList.add('hide')
            carteDroite.classList.add('finalite');
            reset.classList.remove('hide');
        }
    }
});

reset.addEventListener('click', () => {
    reset.classList.add('trigger');
    setTimeout(() => {
        initialisation();
        reset.classList.remove('trigger');
        reset.classList.add('hide');
        carteGauche.classList.remove('finalite');
        carteGauche.classList.remove('hide');
        carteDroite.classList.remove('finalite');
        carteDroite.classList.remove('hide')
    }, 500)
});

// Fonction qui lance l'animation de la carte selon celle qui a été cliquée
function animChoixSuivant(choix, nonChoix, animation) {
    choix.classList.add(animation);
    nonChoix.classList.add('descend');
    // Retrait des class servant à animer
    setTimeout(() => {
        choix.classList.remove(animation);
        nonChoix.classList.remove('descend');
    }, 1500);
}

// Si l'utilisateur choisit de rester sur ses gouts
function actuelChoix() {
    tableauIncr();
    carteDroite.setAttribute('data-lang-key', `carteChoix${choixStock[incrChoix]}`);
    carteDroite.innerHTML = traduction[savedLang][carteDroite.getAttribute('data-lang-key')]
}

// Si l'utilisateur choisit le nouveau choix
function nouveauChoix() {
    carteGauche.setAttribute('data-lang-key', `carteChoix${choixStock[incrChoix]}`);
    carteGauche.innerHTML = traduction[savedLang][carteGauche.getAttribute('data-lang-key')]
    tableauIncr();
    carteDroite.setAttribute('data-lang-key', `carteChoix${choixStock[incrChoix]}`);
    carteDroite.innerHTML = traduction[savedLang][carteDroite.getAttribute('data-lang-key')]
}
// Avancée de l'incrémentation des choix selon un check
function tableauIncr() {
    if (incrChoix < choixStock.length - 1) {
        incrChoix++;
    }
}

function initialisation() {
    //reset des choix
    incrChoix = 1;
    checkScore = 0;
    // Initialisation de nos cartes
    carteGauche.setAttribute('data-lang-key', `carteChoix${choixStock[checkScore]}`);
    carteGauche.innerHTML = traduction[savedLang][carteGauche.getAttribute('data-lang-key')]
    carteDroite.setAttribute('data-lang-key', `carteChoix${choixStock[incrChoix]}`);
    carteDroite.innerHTML = traduction[savedLang][carteDroite.getAttribute('data-lang-key')]
}

//Moteur de traduction

fetch("./locales/traduction.json")
    .then(response => response.json())
    .then(data => {
        traduction = data;
        updateLanguage(savedLang);
    })
    .catch(error => console.error("Erreur de chargement des traductions :", error));

langButton.addEventListener("click", () => {
    langSwap();
    localStorage.setItem("language", savedLang);
    updateLanguage(savedLang);
});

function updateLanguage(lang) {
    if (!traduction[lang]) return;
    elementsATraduire.forEach(element => {
        let key = element.getAttribute("data-lang-key");
        if (traduction[lang][key]) {
            element.innerHTML = traduction[lang][key];
        }
    });
}

function langSwap() {
    if (savedLang === "fr") {
        savedLang = "en";
        langButton.innerText = "FR";
    } else {
        savedLang = "fr";
        langButton.innerText = "EN";
    }
}

initialisation();