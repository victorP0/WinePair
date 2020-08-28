'use strict';

function displayWineResults(responseJson, searchTerm) {
    const paired = [];
    for (let i = 0; i < responseJson.pairedWines.length; i++) {
        paired.push(`<li>${responseJson.pairedWines[i]}</li>`);
    }
    console.log("Value of paired is " + paired);
    $('#itemName').html(`
        <h2>${responseJson.productMatches[0].title}</h2>
        <a href="${responseJson.productMatches[0].link}" target="_blank"><img src="${responseJson.productMatches[0].imageUrl}" 
        alt="Photo of ${responseJson.productMatches.title}"/>
        </a>`)

    $('#pairedWine').html(`
        <ul class="paired">
        <h3>Paired Wines:</h3>
        ${paired.join('')}
        </ul>`)

    $('#descriptionText').html(`
        
        <pre><h3>Wine:</h3>${responseJson.productMatches[0].title}</pre>
        <pre><h3>Description:</h3>${responseJson.productMatches[0].description}</pre>
        <pre><h3>Details:</h3>${responseJson.pairingText}</pre>
        `)

    $('#results').removeClass('hidden');
}

function errorMessage (){
$('#results').html(
  `<br> 
  <p>Unfortunately we cannot find a match for the food you searched, please try another food :)</p>`
)
$('#results').removeClass('hidden');
}



function watchFoodButton() {
    $('section').on('click', '#food-submit', event => {
        event.preventDefault();
        const searchTerm = $('#food-input').val();
        console.log('searchTerm is ' + searchTerm);
        fetch(`https://api.spoonacular.com/food/wine/pairing?food=${searchTerm}&apiKey=27b52f3cd6fc4b49a9d3460e3f593f0b`)
            .then(response => response.json())
            .then(responseJson => displayWineResults(responseJson,searchTerm))
            .catch(error => {console.log('Food went wrong. Error was ' + error); errorMessage();}
            );
    });
}

$(watchFoodButton);
