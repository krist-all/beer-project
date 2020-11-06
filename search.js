const api = "https://api.punkapi.com/v2/beers";
const formElement = document.querySelector("form");
const mainElement = document. querySelector("main");

formElement.addEventListener("submit", search);

function search(evt){
    const searchString = evt.target[0].value;

    const url = `${api}?beer_name=${searchString}`;

    getData(url, render);

    evt.preventDefault();
}

async function getData(url, callback) {
    const response = await fetch(url);
    const data = await response.json();
    return callback(data);
}

async function render(data){
    const ul = document.createElement("ul");
    ul.addEventListener("click", ulClick);
    for (let i = 0; i < data.length; i++) {
        const beer = data[i];

        const li = document.createElement("li");  
        li.setAttribute("name", beer.id);
        li.innerHTML= beer.name;

        ul.appendChild(li);
        
    }
    mainElement.appendChild(ul);

}

function ulClick(evt){
    const id = evt.target.getAttribute("name");
    const url = `./details.html?name=${id}`;
    document.location.href= url;
    
}