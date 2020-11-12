const formElement = document.querySelector('form');
const mainElement = document.querySelector('main');


const searchParams = new URLSearchParams(window.location.search);

const search_by = searchParams.get('search_by');
const search_value = searchParams.get('search_value');
const id = searchParams.get('name');
let  page= searchParams.get('page');
const isPage = searchParams.has('page');
let  prevPage= parseInt(page) -1;

if(isPage == false || page< 2 || !isNaN(page)== false) {
    page=1;
    prevPage = 1;
}
const  nextPage= parseInt(page) +1;

const  per_page= searchParams.get('per_page');

const isSearch_by = searchParams.has('search_by');
const isSearch_value = searchParams.has('search_value');
const isName = searchParams.has('name');
const isBrewed_before = searchParams.has('brewed_before');
const isBrewed_after = searchParams.has('brewed_after');
const nextPagevalu =document.getElementById("nextPage");
const prevPagevalu =document.getElementById("prevPage");

 if ( isName == true && id != null) {
    const api = 'https://api.punkapi.com/v2/beers/'+id;
    getData(api, renderbeerElement);

}else if (isSearch_by == true  ) {
    if (search_by == "SearchBY") {
        mainElement.innerHTML="<div class='resultcount'>Ops! Select  search by ..!</div>";
        document.getElementById("pagenation").style.display = 'none';
    }else if (search_by == "beer_name") {
        document.getElementById("search_by").selectedIndex = 1;
        if (search_value == "") {
            mainElement.innerHTML="<div class='resultcount'>Ops!  write beer name ..!</div>";
            document.getElementById("pagenation").style.display = 'none';
        }else{
        const api = 'https://api.punkapi.com/v2/beers?per_page=12&beer_name='+search_value+'&page='+page;
        document.getElementById("search_value").setAttribute('value', search_value);
        nextPagevalu.setAttribute('href', '?page='+nextPage+'&search_by='+search_by+"&"+'search_value='+search_value);
        prevPagevalu.setAttribute('href', '?page='+prevPage+'&search_by='+search_by+"&"+'search_value='+search_value);    
        getData(api, render);
        }
    }else if (search_by == "hops") {
        document.getElementById("search_by").selectedIndex = 2;
        if (search_value == "") {
            mainElement.innerHTML="<div class='resultcount'>Ops!  write hops ..!</div>";
            document.getElementById("pagenation").style.display = 'none';
        }else{
        const api = 'https://api.punkapi.com/v2/beers?per_page=12&hops='+search_value+'&page='+page;
        document.getElementById("search_value").setAttribute('value', search_value);
        nextPagevalu.setAttribute('href', '?page='+nextPage+'&search_by='+search_by+"&"+'search_value='+search_value);
        prevPagevalu.setAttribute('href', '?page='+prevPage+'&search_by='+search_by+"&"+'search_value='+search_value);    
        getData(api, render);
        }
    }else if (search_by == "malt") {
        document.getElementById("search_by").selectedIndex = 3;
        if (search_value == "") {
            mainElement.innerHTML="<div class='resultcount'>Ops!  write malt ..!</div>";
            document.getElementById("pagenation").style.display = 'none';
        }else{
        const api = 'https://api.punkapi.com/v2/beers?per_page=12&malt='+search_value+'&page='+page;
        document.getElementById("search_value").setAttribute('value', search_value);
        nextPagevalu.setAttribute('href', '?page='+nextPage+'&search_by='+search_by+"&"+'search_value='+search_value);
        prevPagevalu.setAttribute('href', '?page='+prevPage+'&search_by='+search_by+"&"+'search_value='+search_value);    
        getData(api, render);
        }
    }else if (search_by == "brewed") {
        document.getElementById("search_by").selectedIndex = 4;
        document.getElementById("BBBF").style.display= "unset";
        document.getElementById("month-visitB").setAttribute("name", "brewed_before");
        document.getElementById("month-visitA").setAttribute("name", "brewed_after");
        document.getElementById("search_value").style.display= "none";
        document.getElementById("abvNumber").style.display= "none";
        document.getElementById("search_value").value="";
        document.getElementById("search_value").setAttribute("name", "");
        document.getElementById("myNumber1").setAttribute("name", "");
        document.getElementById("myNumber2").setAttribute("name", "");


        if (searchParams.get('brewed_before') == "" || searchParams.get('brewed_after') == "") {
            mainElement.innerHTML="<div class='resultcount'>Ops!  write Brewed Before & after Date..!</div>";
            document.getElementById("pagenation").style.display = 'none';
        }else{
            const bMonthB = searchParams.get('brewed_before').slice(5,7);
            const bYearB = searchParams.get('brewed_before').slice(0,4);
            const bMonthA = searchParams.get('brewed_after').slice(5,7);
            const bYearA = searchParams.get('brewed_after').slice(0,4);
            const getBrewed_before = bMonthB+'-'+bYearB;
            const getBrewed_after = bMonthA+'-'+bYearA; 
            const brewed_before= searchParams.get('brewed_before')
            const brewed_after= searchParams.get('brewed_after')
    
            const api = 'https://api.punkapi.com/v2/beers?per_page=12&brewed_before='+getBrewed_before+'&brewed_after='+getBrewed_after+'&page='+page;
            nextPagevalu.setAttribute('href', '?page='+nextPage+'&search_by='+search_by+'&brewed_before='+brewed_before+'&brewed_after='+brewed_after);
            prevPagevalu.setAttribute('href', '?page='+prevPage+'&search_by='+search_by+'&brewed_before='+brewed_before+'&brewed_after='+brewed_after);
            getData(api, render);
        }
    }else if (search_by == "abv") {
        document.getElementById("search_by").selectedIndex = 5;
        document.getElementById("abvNumber").style.display= "unset";
        document.getElementById("myNumber1").setAttribute("name", "abv_gt");
        document.getElementById("myNumber2").setAttribute("name", "abv_lt");
        document.getElementById("search_value").style.display= "none";
        document.getElementById("BBBF").style.display= "none";
        document.getElementById("search_value").setAttribute("name", "");
        document.getElementById("month-visitB").setAttribute("name", "");
        document.getElementById("month-visitA").setAttribute("name", "");
        
        if (searchParams.get('abv_gt') == "" || searchParams.get('abv_lt') == "") {
            mainElement.innerHTML="<div class='resultcount'>Ops!  write ABV greater than and  less than ..!</div>";
            document.getElementById("pagenation").style.display = 'none';
        }else{
            const abv_gt = searchParams.get('abv_gt');
            const abv_lt = searchParams.get('abv_lt');
            document.getElementById("myNumber1").setAttribute('value', abv_gt);
            document.getElementById("myNumber2").setAttribute('value', abv_lt);    
            const api = 'https://api.punkapi.com/v2/beers?per_page=12&abv_gt='+abv_gt+'&abv_lt='+abv_lt+'&page='+page;
            nextPagevalu.setAttribute('href', '?page='+nextPage+'&search_by='+search_by+'&abv_gt='+abv_gt+'&abv_lt='+abv_lt);
            prevPagevalu.setAttribute('href', '?page='+prevPage+'&search_by='+search_by+'&abv_gt='+abv_gt+'&abv_lt='+abv_lt);
            getData(api, render);
        }
    }


}else if(isPage == true && page!="") {
    const api = 'https://api.punkapi.com/v2/beers?per_page=12&page='+page;
    nextPagevalu.setAttribute('href', '?page='+nextPage);
    prevPagevalu.setAttribute('href', '?page='+prevPage);
    getData(api, render);
} 
else {
    mainElement.innerHTML="<h1 class='randomTitle'>Random Beers</div>";
    const randomPage = Math.floor((Math.random() * 15) + 1);
    const api = 'https://api.punkapi.com/v2/beers?per_page=12&page='+randomPage;
    nextPagevalu.setAttribute('href', '?page='+nextPage);
    prevPagevalu.setAttribute('href', '?page='+prevPage);
    getData(api, render);
}


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
    for (let i = 0; i < data.length; i++) {
        
        const beer = data[i];
        
        const liElement = document.createElement('li');
        liElement.setAttribute('name', beer.id);
        liElement.setAttribute('class', "beerItem");

        liElement.innerHTML = "<a href='?name="+ beer.id +"'><img class='beerImage' src=" + beer.image_url + " /></a><h2>" + beer.name + " </h2><a class='seeMore' href='?name="+ beer.id +"'>See More</a>";

        ulElement.appendChild(liElement);
        
    }
    if(data.length == 0) {
        mainElement.innerHTML="<div class='resultcount'>"+data.length+" träffar på : i "+search_by+"</div>";
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

function showDiv(element)
{
    if (element.value == 'brewed') {
        document.getElementById("BBBF").style.display= "unset";
        document.getElementById("month-visitB").setAttribute("name", "brewed_before");
        document.getElementById("month-visitA").setAttribute("name", "brewed_after");
        document.getElementById("search_value").style.display= "none";
        document.getElementById("abvNumber").style.display= "none";
        document.getElementById("search_value").value="";
        document.getElementById("search_value").setAttribute("name", "");
        document.getElementById("myNumber1").setAttribute("name", "");
        document.getElementById("myNumber2").setAttribute("name", "");

    }else if(element.value == 'abv'){
        document.getElementById("abvNumber").style.display= "unset";
        document.getElementById("myNumber1").setAttribute("name", "abv_gt");
        document.getElementById("myNumber2").setAttribute("name", "abv_lt");
        document.getElementById("search_value").style.display= "none";
        document.getElementById("BBBF").style.display= "none";
        document.getElementById("search_value").setAttribute("name", "");
        document.getElementById("month-visitB").setAttribute("name", "");
        document.getElementById("month-visitA").setAttribute("name", "");

    }else{
        document.getElementById("search_value").style.display= "unset";
        document.getElementById("BBBF").style.display= "none";
        document.getElementById("abvNumber").style.display= "none";
        document.getElementById("search_value").setAttribute("name", "search_value");
        document.getElementById("month-visitB").setAttribute("name", "");
        document.getElementById("month-visitA").setAttribute("name", "");
        document.getElementById("myNumber1").setAttribute("name", "");
        document.getElementById("myNumber2").setAttribute("name", "");
    }
}



///////////////////// Kalender /////////////////////


var nativePicker = document.querySelector('.nativeDatePicker');
var fallbackPicker = document.querySelector('.fallbackDatePicker');
var fallbackLabel = document.querySelector('.fallbackLabel');

var yearSelect = document.querySelector('#year');
var monthSelect = document.querySelector('#month');

fallbackPicker.style.display = 'none';
fallbackLabel.style.display = 'none';

var test = document.createElement('input');

try {
  test.type = 'month';
} catch (e) {
  console.log(e.description);
}

if(test.type === 'text') {
  nativePicker.style.display = 'none';
  fallbackPicker.style.display = 'block';
  fallbackLabel.style.display = 'block';

  populateYears();
}

function populateYears() {
  var date = new Date();
  var year = date.getFullYear();

  for(var i = 0; i <= 100; i++) {
    var option = document.createElement('option');
    option.textContent = year-i;
    yearSelect.appendChild(option);
  }
}