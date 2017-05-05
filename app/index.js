import { getRandomRecipe, saveRecipe } from './burger';

let ul = document.createElement('ul');

let genericRecipe = displayRecipeFactory();
let veganRecipe = displayRecipeFactory({ vegan: true });
let inputRecipe = document.getElementById('recipeName');

document
.getElementById('burger')
.addEventListener('click', genericRecipe, false);

document
.getElementById('veganburger')
.addEventListener('click', veganRecipe, false);

document
.getElementById('btnSave')
.addEventListener('click', saveRecipe, false);

let toppings;

function displayRecipeFactory(options) {
	return function () {
		ul.innerHTML = '';

		getRandomRecipe(options)
		.then(recipe => {
			recipe.forEach(topping => {
				let li = document.createElement('li');
				li.innerHTML = `<strong>${ topping }</strong>`;
				ul.appendChild(li);
			});
		})

		document.body.appendChild(ul);
	}
}

function saveCurrentRecipe(){

	if (!toppings || !inputRecipe.value) return;
	saveRecipe({
		name: inputRecipe.value,
		toppings
	}).then(r => {
		toppings = null;
		ul.innerHTML = `<li><h2>SAVED #${r.id}</h2></li>`;
	})		
}