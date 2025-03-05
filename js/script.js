// Détection de nos cartes et bouton
const carteGauche = document.getElementById('select1');
const carteDroite = document.getElementById('select2');
const reset = document.getElementById('boutonReset');

// Stock de nos choix
const choixStock = [
    'Moi',
    'Ton père',
    'Te chier dessus en pétant',
    'Te pisser dessus en rêvant que tu es au toilette',
    'Les pieds',
    'Ta mère',
    'Une bonne cara chaude au soleil',
    'Connaître tout le lore de Lakaka land (oui tu le savais tu)',
    'Le lore de Five Night at Freddy\'s',
    'Choix 8',
];
let checkChoix = 0; // Pour éviter d'avoir deux fois le même choix
let incrChoix = 1; //Pour savoir où l'on se trouve dans les choix
let checkScore = 0; // Pour checker si l'utilisateur a parcouru tout le tableau
let isAnimating = false; //Filtre anti-spam
initialisation();

// Triggers du click selon la carte
carteGauche.addEventListener('click',()=>{
    if(isAnimating === false){
        isAnimating = !isAnimating;
        if(checkScore<choixStock.length-1){
            animChoixSuivant(carteGauche,carteDroite,'trigger');
            setTimeout(() => {
                actuelChoix();
            },700);
            // Retrait de la protection du spam click
            setTimeout(() => {
                isAnimating = !isAnimating;
            },1500); 
        }
        //ici on vérifie qu'il n'a pas fait un tour complet
        checkScore++;
        if(checkScore == choixStock.length-1){
            // S'il a fait un tour complet, alors on passe à l'écran de fin
            carteGauche.classList.add('finalite');
            carteDroite.classList.add('hide')
            reset.classList.remove('hide');
        }
    }
});

carteDroite.addEventListener('click', () => {
    animChoixSuivant(carteDroite,carteGauche,'monte');
    setTimeout(() => {
        nouveauChoix();
    },700);
    checkScore = 0; // On relance un tour de tableau si l'utilisateur a sélectionné un nouveau préféré
});

reset.addEventListener('click', () => {
    reset.classList.add('trigger');
    setTimeout(() => {
        initialisation();
        reset.classList.remove('trigger');
        reset.classList.add('hide');     
        carteGauche.classList.remove('finalite');
        carteDroite.classList.remove('hide')
    },500)
});

// Fonction qui lance l'animation de la carte selon celle qui a été cliquée
function animChoixSuivant(choix, nonChoix, animation){
    choix.classList.add(animation);
    nonChoix.classList.add('descend');
    // Retrait des class servant à animer
    setTimeout(() => {
        choix.classList.remove(animation);
        nonChoix.classList.remove('descend');
    },1500);
};

// Si l'utilisateur choisit de rester sur ses gouts
function actuelChoix() {
    progressionChoix();
    carteDroite.innerText = choixStock[incrChoix];
};

// Si l'utilisateur choisit le nouveau choix
function nouveauChoix() {
    carteGauche.innerText = choixStock[incrChoix];
    checkChoix=incrChoix;
    progressionChoix();
    carteDroite.innerText=choixStock[incrChoix];
};

// Progression du choix en gardant deux choix différents
function progressionChoix() {
    if(incrChoix+1 !== checkChoix){
        tableauIncr();
    }
    else{
        incrChoix++;
        tableauIncr();
    }    
};

// Avancée de l'incrémentation des choix selon un check
function tableauIncr() {
    if(incrChoix < choixStock.length-1){
        incrChoix++;
    }
    else{
        if(checkChoix != 0){
            incrChoix = 0;
        }
        else{
            incrChoix = 1;
        }
    }
};

function initialisation() {
    //reset des choix
    checkChoix = 0;
    incrChoix = 1;
    checkScore = 0;
    // Initialisation de nos cartes
    carteGauche.innerText = choixStock[checkChoix];
    carteDroite.innerText = choixStock[incrChoix];  
}