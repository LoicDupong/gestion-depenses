const depensesTab = [];
const montantTab = [];

let inputDesc = document.getElementById('description');
let inputMontant = document.getElementById('montant');
let inputCategorie = document.getElementById('categorie');
let inputDate = document.getElementById('date');

const btnAdd = document.querySelector('.btn--add');
const btnDelete = document.querySelector('.btn--delete');
const depensesHTML = document.querySelector('.depenses-array');
const errorHTML = document.querySelector('.error');
const counterHTML = document.querySelector('.counter')
errorHTML.innerHTML = `🥝 Ma liste de dépenses est vide.`

const totalHTML = document.querySelector('.total');
let total = 0;
totalHTML.textContent = total;

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
    const sameDescCount = depensesTab.filter(d => d[0] === desc).length;
    const suffix = sameDescCount > 0 ? `-${sameDescCount + 1}` : "";
    const index = `${desc}${suffix}`;

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

    // Incrémentation du nombre de dépenses 
    // ===================================
    counterHTML.textContent = `${i}`;
    i++;

    // Calcul du total des dépenses
    // ===================================
    total = montantTab.reduce((sum, nbr) => sum + nbr, 0);
    totalHTML.innerHTML = total;
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
        inputDesc.value = inputMontant.value = inputDate.value = inputCategorie.value = "";
        errorHTML.innerHTML = ``;
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
        let index = e.target.parentElement.dataset.index;
        let currentElement = depensesTab.indexOf(index);
        depensesTab.splice(currentElement, 1);
        console.log(depensesTab);

        const li = e.target.parentElement;
        li.remove();
    }
});

