'use strict';

/*const placeholders = ['Chinese..', 'Mexican..', 'American..', 'Mediterranean..', 'Southern..',
    'French..', 'Greek..'];
let counter = 0;
let inquire = document.getElementById('cuisine-input');
let length = placeholders.length;

function changePlaceholder() {
    if (counter >= length) {
        counter = 0;
    }
    inquire.setAttribute('placeholder', placeholders[counter]);
    counter++;
}

setInterval(changePlaceholder, 3000);

}
*/
function displayWineResults(responseJson, searchTerm) {
    $('#results-list').empty();
    const paired = [];
    for (let i = 0; i < responseJson.pairedWines.length; i++) {
        paired.push(`<li>${responseJson.pairedWines[i]}</li>`);
    }
    $('#results-list').append(
        `
        <li><h2>${responseJson.productMatches[0].title}</h2>
        <a href="${responseJson.productMatches[0].link}" target="_blank"><img src="${responseJson.productMatches[0].imageUrl}" 
        alt="Photo of ${responseJson.productMatches.title}"/>
        </a></li>
        <ul class="paired">
        <h3>Paired Wines:</h3>
        ${paired.join('')}
        </ul>
        <li>
        <pre><h3>Wine:</h3>${responseJson.productMatches[0].title}</pre>
        <pre><h3>Description:</h3>${responseJson.productMatches[0].description}</pre>
        <pre><h3>Details:</h3>${responseJson.pairingText}</pre>
        </li>`
    )
    $('#results').removeClass('hidden');
}

function watchFoodButton() {
    $('section').on('click', '#food-submit', event => {
        event.preventDefault();
        const searchTerm = $('#food-input').val();
        fetch(`https://api.spoonacular.com/food/wine/pairing?food=${searchTerm}&apiKey=27b52f3cd6fc4b49a9d3460e3f593f0b`)
            .then(response => response.json())
            .then(responseJson => displayWineResults(responseJson,searchTerm))
            .catch(error => console.log('Food went wrong')
            );
    });
}

// function watchRandomButton() {
//     $('section').on('click', '#random-meal', event => {
//         event.preventDefault();
//         fetch('https://api.spoonacular.com/recipes/random?apiKey=27b52f3cd6fc4b49a9d3460e3f593f0b')
//             .then(response => response.json())
//             .then(responseJson => displayRandomResults(responseJson))
//             .catch(error => console.log('Something went wrong'));
//     });
// }

$(watchFoodButton);
