const formElement = document.querySelector('form');
const mainElement = document.querySelector('main');


const searchParams = new URLSearchParams(window.location.search);

const search_by = searchParams.get('search_by');
const search_value = searchParams.get('search_value');
const id = searchParams.get('name');
let  page= searchParams.get('page');
const isPage = searchParams.has('page');
let  prevPage= parseInt(page) -1;

if(isPage == false || page< 2) {
    page=1;
    prevPage = 1;
}
const  nextPage= parseInt(page) +1;

const  per_page= searchParams.get('per_page');

const isSearch_by = searchParams.has('search_by');
const isName = searchParams.has('name');

const nextPagevalu =document.getElementById("nextPage");
const prevPagevalu =document.getElementById("prevPage");



 if ( isName == true && id != null) {
    const api = 'https://api.punkapi.com/v2/beers/'+id;
    getData(api, renderbeerElement);

}else if (isSearch_by == true && search_by == "") {
    mainElement.innerHTML="<div class='resultcount'>Ops! Select search by..!</div>";
    document.getElementById("search_value").setAttribute('value', search_value);
    document.getElementById("pagenation").style.display = 'none';



}else if (isSearch_by == true && search_value == "" && search_by != "") {
    const api = 'https://api.punkapi.com/v2/beers?per_page=12&page=1';
    getData(api, render);



}else if(isSearch_by == true && search_by != "") {
    if (search_by == "beer_name") {
        const api = 'https://api.punkapi.com/v2/beers?per_page=12&beer_name='+search_value+'&page='+page;
        document.getElementById("search_by").selectedIndex = 1;
        getData(api, render);

    }else if (search_by == "hops") {
        const api = 'https://api.punkapi.com/v2/beers?per_page=12&hops='+search_value+'&page='+page;
        document.getElementById("search_by").selectedIndex = 2;
        getData(api, render);

    }else if (search_by == "malt") {
        const api = 'https://api.punkapi.com/v2/beers?per_page=12&malt='+search_value+'&page='+page;
        document.getElementById("search_by").selectedIndex = 3;
        getData(api, render);

    }else{
    const api = 'https://api.punkapi.com/v2/beers?per_page=12&search_by='+search_by+'&page='+page;
    getData(api, render);
    }
    nextPagevalu.setAttribute('href', '?page='+nextPage+'&search_by='+search_by+"&"+'search_value='+search_value);
    prevPagevalu.setAttribute('href', '?page='+prevPage+'&search_by='+search_by+"&"+'search_value='+search_value);
    document.getElementById("search_value").setAttribute('value', search_value);

    
}

else if(isPage == true && page!="") {
    const api = 'https://api.punkapi.com/v2/beers?per_page=12&page='+page;
    nextPagevalu.setAttribute('href', '?page='+nextPage);
    prevPagevalu.setAttribute('href', '?page='+prevPage);

    getData(api, render);
} 
else {
    const api = 'https://api.punkapi.com/v2/beers?per_page=12&page=1';
    nextPagevalu.setAttribute('href', '?page='+nextPage);
    prevPagevalu.setAttribute('href', '?page='+prevPage);

    getData(api, render);
}

console.log(nextPagevalu);

function getData(url, callback) {
    
    fetch(url)
    .then(res => res.json())
    .then(data => {

        callback(data);
    })
    .catch(error => console.log(error));
}

function render(data) {
    
    const ulElement = document.createElement('ul');
    ulElement.setAttribute('class', "beer-list");


    //ulElement.addEventListener('click', onUlClicked);
console.log(data);
    for (let i = 0; i < data.length; i++) {
        
        const beer = data[i];
        
        const liElement = document.createElement('li');
        liElement.setAttribute('name', beer.id);
        liElement.setAttribute('class', "beerItem");

        liElement.innerHTML = "<a href='?name="+ beer.id +"'><img class='beerImage' src=" + beer.image_url + " /></a><h2>" + beer.name + " </h2>";

        ulElement.appendChild(liElement);
        
    }
    if(data.length == 0) {
        mainElement.innerHTML="<div class='resultcount'>"+data.length+" träffar på :"+search_value+" i "+search_by+"</div>";
    }
    if (data.length < 12 && page ==1) {
        document.getElementById("pagenation").style.display = 'none';
    }
    if (page==1) {
        prevPagevalu.style.display = 'none';
        document.getElementById("prevPagenone").style.display = 'unset';

    }
    
    mainElement.appendChild(ulElement);
}

function renderbeerElement(data) {
    
    const beer = data[0];
    const name = beer.name;
    const brewers_tips = beer.brewers_tips;

    const description = beer.description;
    const abv = beer.abv;
    const volumeValue = beer.volume.value;
    const volumeUnit = beer.volume.unit;
    const itemIMG = beer.image_url;
    let ingredientsmalt = "";
    for(malt of beer.ingredients.malt){
        ingredientsmalt += "<li>"+malt.name+"</li>";
    }
    
    let ingredientshops ="";
    for(hops of beer.ingredients.hops){
        ingredientshops += "<li>"+hops.name+"</li>";
    }

    let foodPairing ="";
    for(food_pairing of beer.food_pairing){
        foodPairing += "<li>"+food_pairing+"</li>";
    }
     
    
    document.getElementById("pagenation").style.display ="none";

    console.log(data);
    console.log(brewers_tips);
    

    
    const itemDescription = ` 
        <section class="beerdiscrebsion">
        <div class="beerItem"><img src="${itemIMG}" alt="" class="beerImage"></div><br>
        <h2>${name}</h2><br>
        <div>${description}</div><br>
        <div><strong>Alcohol by volume:</strong> ${abv}</div><br>
        <div><strong>Volume:</strong> ${volumeValue} / ${volumeUnit}</div><br>
        <div><strong>Ingredients:</strong><ul> ${ingredientsmalt}</ul></div><br>
        <div><strong>Hops:</strong> <ul>${ingredientshops}</ul></div><br>
        <div><strong>Food pairing:</strong> <ul>${foodPairing}</ul></div><br>
        <div><strong>Brewers tips:</strong> ${brewers_tips}</div><br>
        </section>
    `;

    mainElement.innerHTML = itemDescription;
   
}


function renderFirstBeer(data) {

    const firstBeer = data[0];

    const pElement = document.createElement('p');

    pElement.textContent = firstBeer.name;
    
    mainElement.appendChild(pElement);
}

/*function onUlClicked(evt) {
    
    const id = evt.target.getAttribute('name');
    const url = `myView.html?name=${id}`;
    document.location.href = url;
}*/