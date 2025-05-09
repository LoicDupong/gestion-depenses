const depensesTab = [];
const montantTab = [];
const subTotalTab = [];

let inputDesc = document.getElementById('description');
let inputMontant = document.getElementById('montant');
let inputCategorie = document.getElementById('categorie');
let inputDate = document.getElementById('date');

const btnAdd = document.querySelector('.btn--add');
const btnDelete = document.querySelector('.btn--delete');

const depensesHTML = document.querySelector('.depenses-array');
const categoriesHTML = document.querySelector('.wrapper--categories')
const foodHTML = document.querySelector('.alimentation-array');
const transportHTML = document.querySelector('.transport-array');
const rentHTML = document.querySelector('.logement-array');
const funHTML = document.querySelector('.divertissement-array');
const otherHTML = document.querySelector('.autre-array');
const errorHTML = document.querySelector('.error');
const counterHTML = document.querySelector('.counter')
errorHTML.innerHTML = `🥝 Ma liste de dépenses est vide.`


const totalHTML = document.querySelector('.total');
const subTotalHTML = document.querySelectorAll('.total--categorie');

let total = 0;
totalHTML.textContent = total;
let subTotal = 0;
subTotalHTML.forEach(function (categorie) {
    categorie.textContent = subTotal;
    subTotalTab.push(subTotal);
})


let i = 0;
counterHTML.textContent = i;

// =====================================================
// =========== ✅✅ Ajouter un élément ✅✅===========
// =====================================================
function addDepense() {
    inputDesc.value = inputDesc.value.trim().toLowerCase();
    const desc = inputDesc.value;
    const montant = inputMontant.value.toString() + " €";
    const categorie = inputCategorie.value;
    const date = inputDate.value;

    // Vérifier si doublon 
    // ====================
    const index = depensesTab.length;

    // Push 
    // ==============================================
    depensesTab.push([desc, montant, categorie, date]);
    montantTab.push((Number)(inputMontant.value));
    


    // Print le nouvel élément dans l'HTML 
    // ===================================
    let lastElement = depensesTab[depensesTab.length - 1];
    depensesHTML.innerHTML += 
    `<li data-index="${index}" data-categorie="${lastElement[2]}" class="${lastElement[2]}"> ${lastElement.join(' - ')}
    <i class="fa-solid fa-square-minus btn--delete"></i>
    </li>`;

    // Print le nouvel élément dans le container HTML correspondant 
    // =============================================================
    switch (lastElement[2]) {
        case "alimentation":
            foodHTML.innerHTML += `<li data-index="${index}" data-categorie="${lastElement[2]}" class="${lastElement[2]}"> ${lastElement[0]} - ${lastElement[1]}
            <i class="fa-solid fa-square-minus btn--delete"></i>
            </li>`;
            subTotalTab.push([(Number)(lastElement[1])])
            console.log(subTotalTab);
            
        break;
    
        case "transport":
            transportHTML.innerHTML += `<li data-index="${index}" data-categorie="${lastElement[2]}" class="${lastElement[2]}"> ${lastElement[0]} - ${lastElement[1]}
            <i class="fa-solid fa-square-minus btn--delete"></i>
            </li>`;
        break;

        case "logement":
            rentHTML.innerHTML += `<li data-index="${index}" data-categorie="${lastElement[2]}" class="${lastElement[2]}"> ${lastElement[0]} - ${lastElement[1]}
            <i class="fa-solid fa-square-minus btn--delete"></i>
            </li>`;
        break;

        case "divertissement":
            funHTML.innerHTML += `<li data-index="${index}" data-categorie="${lastElement[2]}" class="${lastElement[2]}"> ${lastElement[0]} - ${lastElement[1]}
            <i class="fa-solid fa-square-minus btn--delete"></i>
            </li>`;
        break;
        
        case "autre":
            otherHTML.innerHTML += `<li data-index="${index}" data-categorie="${lastElement[2]}" class="${lastElement[2]}"> ${lastElement[0]} - ${lastElement[1]}
            <i class="fa-solid fa-square-minus btn--delete"></i>
            </li>`;
        break;
    }

    // Incrémentation du nombre de dépenses 
    // ===================================
    i++;
    counterHTML.textContent = `${i}`;
    

    // Calcul du total des dépenses
    // ===================================
    total = montantTab.reduce((sum, nbr) => sum + nbr, 0);
    totalHTML.innerHTML = total;
}

// =====================================================
// =========== 🥨🥨 Update index 🥨🥨 ================
// =====================================================

function updateIndex() {
    const items = depensesHTML.querySelectorAll('li');
    items.forEach((li, index) => {
      li.dataset.index = index;
    });
}

// =======================================================
// =========== 🥨🥨 Update categorie List 🥨🥨 =========
// =======================================================

function updateCategorie() {
    console.log();
    
}


// =====================================================
// =========== ➕➕ Add On Click ➕➕ ================
// =====================================================
btnAdd.addEventListener('click', function (e){
    e.preventDefault();

    if (inputMontant.value < 0) {
        errorHTML.textContent = `Veuillez ajouter un montant valable.`
        setTimeout(() => {
            errorHTML.innerHTML = ``
        }, "2000");
        inputMontant.select();

    } else if (inputDesc.value && inputDate.value && inputCategorie.value) {
        addDepense();
        console.log(montantTab);
        
        inputDesc.value = inputMontant.value = inputDate.value = inputCategorie.value = errorHTML.innerHTML = "";
        inputDesc.select();

    } else {
        errorHTML.textContent = `Veuillez remplir tous les champs...`
        setTimeout(() => {
            errorHTML.innerHTML = ``
        }, "2000");
        inputDesc.select();
    }
})


// =======================================================
// =========== ❌❌ Delete On Click ❌❌================
// =======================================================

depensesHTML.addEventListener('click', function(e){
    if (e.target.classList.contains('btn--delete')){
        e.preventDefault();
        let index = (Number)(e.target.parentElement.dataset.index);
        depensesTab.splice(index, 1);
        montantTab.splice(index, 1);
        console.log(montantTab);
        

        // Ajustement du total des dépenses
        // ===================================
        total = montantTab.reduce((sum, nbr) => sum + nbr, 0);
        totalHTML.innerHTML = total;

        const li = e.target.parentElement;
        li.remove();
        updateIndex();

        i--;
        counterHTML.textContent = `${i}`;
    
    }
});


// =======================================================================
// =========== ❌❌ Delete On Click - Catégorie Liste ❌❌================
// =======================================================================


categoriesHTML.addEventListener('click', function(e){
    if (e.target.classList.contains('btn--delete')){
        e.preventDefault();
        let index = (Number)(e.target.parentElement.dataset.index);
        depensesTab.splice(index, 1);
        montantTab.splice(index, 1);
        console.log(montantTab);
        

        // Ajustement du total des dépenses
        // ===================================
        total = montantTab.reduce((sum, nbr) => sum + nbr, 0);
        totalHTML.innerHTML = total;

        const li = e.target.parentElement;

        li.remove();
        updateIndex();

        i--;
        counterHTML.textContent = `${i}`;
    
    }
});