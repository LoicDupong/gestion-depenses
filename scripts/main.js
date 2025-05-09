const depensesTab = [];

let inputDesc = document.getElementById('description');
let inputMontant = document.getElementById('montant');
let inputCategorie = document.getElementById('categorie');

const btnAdd = document.querySelector('.btn--add');
const btnDelete = document.querySelector('.btn--delete');
const depensesHTML = document.querySelector('.depenses-array');

const errorHTML = document.querySelector('.error');
// errorHTML.innerHTML = `🥝 Ma liste de dépenses est vide.`

// =====================================================
// =========== ✅✅ Ajouter un élément ✅✅===========
// =====================================================
function addDepense() {
    inputDesc.value = inputDesc.value.trim().toLowerCase();
    const desc = inputDesc.value;
    const montant = inputMontant.value.toString() + " €";
    const categorie = inputCategorie.value;

    // Vérifier si doublon =============================================
    const sameDescCount = depensesTab.filter(d => d[0] === desc).length;
    const suffix = sameDescCount > 0 ? `-${sameDescCount + 1}` : "";
    const index = `${desc}${suffix}`;

    // Push le nouveau tableau dans le tableau global ========
    depensesTab.push([desc, montant, categorie]);
    
    // Print le nouvel élément dans l'HTML =============================================
    let lastElement = depensesTab[depensesTab.length - 1];
    depensesHTML.innerHTML += 
    `<li data-index="${index}" data-categorie="${lastElement[2]}"> ${lastElement.join(' - ')}
    <i class="fa-solid fa-square-minus btn--delete"></i>
    </li>`;
}

// =====================================================
// =========== ▶ ▶ Add On Click ▶ ▶ =====================
// =====================================================
btnAdd.addEventListener('click', function (e){
    e.preventDefault();
    addDepense();
    
    inputDesc.value = inputMontant.value = "";
    inputCategorie.value = "placeholder";
    inputDesc.select();
})


// =======================================================
// =========== ❌❌ Supprimer un élément ❌❌===========
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

