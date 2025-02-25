const carteGauche=document.getElementById('select1');
const carteDroite=document.getElementById('select2');

carteGauche.addEventListener('click',()=>{
    animChoixSuivant(carteGauche,carteDroite);
});

carteDroite.addEventListener('click', ()=>{
    animChoixSuivant(carteDroite,carteGauche);
});

function animChoixSuivant(choix, nonChoix){
    choix.classList.add('vert');
    nonChoix.classList.add('rouge');
    setTimeout(()=>{
        choix.classList.remove('vert');
        nonChoix.classList.remove('rouge');
    },1000);
};