// Détection de nos cartes
const carteGauche=document.getElementById('select1');
const carteDroite=document.getElementById('select2');

// Stock de nos choix
const choixStock=[
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

// Initialisation de nos cartes
carteGauche.innerText=choixStock[checkChoix];
carteDroite.innerText=choixStock[incrChoix];

// Triggers du click selon la carte
carteGauche.addEventListener('click',()=>{
    animChoixSuivant(carteGauche,carteDroite,'trigger');
    setTimeout(()=>{
        actuelChoix();
    },700);
});

carteDroite.addEventListener('click', ()=>{
    animChoixSuivant(carteDroite,carteGauche,'monte');
    setTimeout(()=>{
        nouveauChoix();
    },700);
});

// Fonction qui lance l'animation de la carte selon celle qui a été cliquée
function animChoixSuivant(choix, nonChoix, animation){
    choix.classList.add(animation);
    nonChoix.classList.add('descend');
    // Retrait des class servant à animer
    setTimeout(()=>{
        choix.classList.remove(animation);
        nonChoix.classList.remove('descend');
    },1500);
};

// Si l'utilisateur choisit de rester sur ses gouts
function actuelChoix(){
    progressionChoix();
    carteDroite.innerText=choixStock[incrChoix];
};

// Si l'utilisateur choisit le nouveau choix
function nouveauChoix(){
    carteGauche.innerText=choixStock[incrChoix];
    checkChoix=incrChoix;
    progressionChoix();
    carteDroite.innerText=choixStock[incrChoix];
};

// Progression du choix en gardant deux choix différents
function progressionChoix(){
    if(incrChoix+1 !== checkChoix){
        tableauIncr();
    }
    else{
        incrChoix++;
        tableauIncr();
    }    
};

// Avancée de l'incrémentation des choix selon un check
function tableauIncr(){
    if(incrChoix < choixStock.length-1){
        incrChoix++;
    }
    else{
        if(checkChoix!==0){
            incrChoix=0;
        }
        else{
            incrChoix=1;
        }
    }
};