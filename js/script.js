// Détection de nos cartes
const carteGauche=document.getElementById('select1');
const carteDroite=document.getElementById('select2');

// Stock de nos choix
const choixStock=[
    'Moi',
    'Ton père',
    'Choix 3',
    'Choix 4',
    'Choix 5',
    'Choix 6',
    'Choix 7',
    'Choix 8',
];
let checkChoix = 0; // Pour éviter d'avoir deux fois le même choix
let incrChoix = 1; //Pour savoir où l'on se trouve dans les choix

// Initialisation de nos cartes
carteGauche.innerText=choixStock[checkChoix];
carteDroite.innerText=choixStock[incrChoix];

// Triggers du click selon la carte
carteGauche.addEventListener('click',()=>{
    animChoixSuivant(carteGauche,carteDroite);
    actuelChoix();
});

carteDroite.addEventListener('click', ()=>{
    animChoixSuivant(carteDroite,carteGauche);
    nouveauChoix();
});

// Fonction qui lance l'animation de la carte selon celle qui a été cliquée
function animChoixSuivant(choix, nonChoix){
    choix.classList.add('monte');
    nonChoix.classList.add('descend');
    // Retrait des class servant à animer
    setTimeout(()=>{
        choix.classList.remove('monte');
        nonChoix.classList.remove('descend');
    },1500);
};

// Si l'utilisateur choisi de rester sur ses gouts
function actuelChoix(){
    progressionChoix();
    carteDroite.innerText=choixStock[incrChoix];
};

// Si l'utilisateur choisi le nouveau choix
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