$(document).ready(function(){
	// Page loads, load the characters
	getCharactersFromApi();

	// Creating a new character
	$(".js-character-form").on("submit", function(event){
		event.preventDefault();
		
		// Grab information from form
		var name = $("#name").val();
		var occupation = $("#occupation").val();
		var weapon = $("#weapon").val();
		// Create my "params" hash
		// params[:name]
		var params = {
			name: name,
			occupation: occupation,
			weapon: weapon
		};
		// Make my AJAX request
		$.ajax({
			type: "POST",
			url: "https://ironhack-characters.herokuapp.com/characters",
			data: params,
			success: updateList,
			error: characterError
		})
	})
})

function getCharactersFromApi(){
	$.ajax({
		url: "https://ironhack-characters.herokuapp.com/characters",
		success: showCharacters,
		error: characterLoadError
	})
}

function showCharacters(response){
	response.forEach(function(character){
		appendCharacter(character);
	})
}

function appendCharacter(character){
	// HTML Template String
	var html = `
		<li>
			<b>Name:</b> ${character.name}<br>
			<b>Occupation:</b> ${character.occupation}<br>
			<b>Weapon:</b> ${character.weapon}<br>
		</li>
	`;
	$(".js-character-list").append(html);

}

function characterLoadError(err){
	console.log("Error", err);
}

function updateList(response){
	// Empty the current list
	$(".js-character-list").empty()
	// Get the characters
	// Append all of the characters again
	getCharactersFromApi();
}

function characterError(err){
	console.log("Error", err)
}