// Récupération du on/off et du details
const boutonOuvre = document.getElementById('moreInfoOuvre');
const boutonFerme = document.getElementById('moreInfoFerme');
const boite = document.getElementById('moreInfo');

//Ouverture de la boite et camouflage du bouton d'ouverture
boutonOuvre.addEventListener('click', () => {
    boutonOuvre.classList.add('hide');
});

//Fermeture de la boite et affichage du bouton d'ouverture
boutonFerme.addEventListener('click', () => {
    fermetureBoite();
});

window.addEventListener('click', (e) => {
    if(!boite.contains(e.target)){
        if(boite.open){
            fermetureBoite();
        }
    }
});

function fermetureBoite() {
    boutonOuvre.classList.remove('hide');
    boite.removeAttribute('open');
};