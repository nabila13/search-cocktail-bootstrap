const loadDataDiv = document.getElementById("load");
const detailsInfo = document.getElementById("details");
const toggleSpinner = (displayProp) => {
    const spinner = document.getElementById("spinner");
    spinner.style.display = displayProp;
};
toggleSpinner('none');

const toggleLoadDataDiv = (displayProp) => {
    loadDataDiv.style.display = displayProp;
};
const searchCocktail = () => {
    const searchText = document.getElementById("search");
    const searchVal = searchText.value;
    toggleSpinner("block");
    toggleLoadDataDiv("none");
    loadDataDiv.textContent = "";
    detailsInfo.textContent = "";
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchVal}`)
        .then(res => res.json())
        .then(data => loadSearchResult(data))
};
const loadSearchResult = (drinks) => {
    console.log(drinks);
    loadDataDiv.textContent = "";
    detailsInfo.textContent = "";
    toggleSpinner("none");
    toggleLoadDataDiv("block");
    const totaldrinks = drinks.drinks;
    if (totaldrinks !== null) {
        totaldrinks.forEach(drink => {
            const div = document.createElement("div");
            div.classList.add("col");
            div.innerHTML = ` <div onclick="loadDetails(${drink.idDrink})" class="card h-100">
    <img src="${drink.strDrinkThumb}" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">${drink.strDrink}</h5>
        <p class="card-text">${drink.strInstructions.substr(0,100)}</p>
    </div>
</div>`;
            loadDataDiv.appendChild(div);
        });
    } else {
        const h4 = document.createElement("h4");
        h4.classList.add("no-result");
        h4.innerText = "Sorry!! No result Found. Try Again!!";
        detailsInfo.appendChild(h4);
    }
};
const loadDetails = (drinkId) => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => loadDetailsData(data.drinks[0]));
};
const loadDetailsData = (details) => {

    detailsInfo.textContent = "";
    const div = document.createElement("div");
    div.classList.add("card");
    div.classList.add("h-100");
    div.innerHTML = `
    <img src="${details.strDrinkThumb}" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">${details.strDrink}</h5>
        <p><span class="fw-bold">Drink Category: </span>${details.strCategory}</p>
        <p class="card-text"><span class="fw-bold">How to Make:</span> ${details.strInstructions}</p>
    </div>`;
    detailsInfo.appendChild(div);
};