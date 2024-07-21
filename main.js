$(document).ready(function(){
	// Page loads, load the characters
	getCharactersFromApi();

	// Creating a new character
	$(".js-character-form").on("submit", function(event){
		event.preventDefault();
		
		// Grab information from form
		var name = $("#name").val().trim();
		var occupation = $("#occupation").val().trim();
		var weapon = $("#weapon").val().trim();

		if (!name || !occupation || !weapon) {
			alert("Please fill out all fields.");
			return;
		}

		// Create my "params" hash
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
			success: function(response) {
				updateList();
				// Clear form fields
				$(".js-character-form")[0].reset();
			},
			error: characterError
		});
	});
});

function getCharactersFromApi(){
	$.ajax({
		url: "https://ironhack-characters.herokuapp.com/characters",
		success: showCharacters,
		error: characterLoadError
	});
}

function showCharacters(response){
	if (response.length === 0) {
		$(".js-character-list").html("<li>No characters found.</li>");
	} else {
		response.forEach(function(character){
			appendCharacter(character);
		});
	}
}

function appendCharacter(character){
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
	console.log("Error loading characters", err);
}

function updateList(){
	// Empty the current list
	$(".js-character-list").empty();
	// Get the characters
	getCharactersFromApi();
}

function characterError(err){
	console.log("Error submitting character", err);
}
