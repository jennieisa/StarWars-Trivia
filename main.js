class Characters {

    constructor(name, gender, height, mass, hairColor, pictureUrl) {

        this.name = name;

        this.gender = gender;

        this.height = height;

        this.mass = mass;

        this.hairColor = hairColor;

        this.pictureUrl = pictureUrl;

    }

    compareMass() {

    }

    compareHeight() {

    }

    compareHairColor() {

    }

    compareGender() {
        
    }


}

//Hämtar från DOM:en
const compareCharactersBtn = document.querySelector(".compareCharactersBtn");

let character1 = "";

let character2 = "";

let characters = [];

//Extra 
function ifCharacterIsAlreadyChoosen() {

}

async function fetchData(url) {

    const response = await fetch(url)

    const data = await response.json();

    return data;

}

async function fetchCaracters(name1, name2) {

    let array = [];

    let searchValue1 = name1.replace("_", " ");

    let searchValue2 = name2.replace("_", " ");

    character1 = await fetchData(`https://swapi.dev/api/people/?search=${searchValue1}`);

    character2 =  await fetchData(`https://swapi.dev/api/people/?search=${searchValue2}`);

    array.push(character1.results[0]);

    array.push(character2.results[0]);

    return array;

}

function drawCharacter() {

}

compareCharactersBtn.addEventListener("click", async (e) => {

    e.preventDefault();

    const selectedCharacter1 = document.querySelector("#character1").value;

    const selectedCharacter2 = document.querySelector("#character2").value;

    characters = await fetchCaracters(selectedCharacter1, selectedCharacter2); 

    console.log(characters)

})

