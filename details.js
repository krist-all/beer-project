const desc = document.querySelector(".description-container")
const heading = document.querySelector(".details-heading");
const searchParams = new URLSearchParams(window.location.search);
const api = "https://api.punkapi.com/v2/beers";
const id = searchParams.get("name");
const url = `${api}/${id}`;


getData(url, render);


async function getData(url, callback) {
    const response = await fetch(url);
    const data = await response.json();
    return callback(data);
}

async function render(data){
    const beer = data[0];
    const name = beer.name;
    const brewers_tips = beer.brewers_tips;
    const abv = beer.abv;
    const beerimg = beer.image_url;
    const description = beer.description;
    const vol = beer.volume;
    const foodPairing = beer.food_pairing;
    const ingred = beer.ingredients;
    
    const h1Tag = document.createElement("h1");
    const pTag = document.createElement("p");

    h1Tag.textContent = name;
    pTag.innerHTML += brewers_tips + "<br>";
    pTag.innerHTML += abv + "<br>";
    pTag.innerHTML += beerimg + "<br>";
    pTag.innerHTML += description + "<br>";
    pTag.innerHTML += vol + "<br>";
    pTag.innerHTML += foodPairing + "<br>";
    pTag.innerHTML += ingred + "<br>";
   
    heading.appendChild(h1Tag);
    desc.appendChild(pTag);
}