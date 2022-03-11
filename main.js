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

//EXTRA
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

    console.log(searchValue1, searchValue2)

    let data1 = await fetchData(`https://swapi.dev/api/people/?search=${searchValue1}`);

    array.push(data1.results[0]);

    let data2 =  await fetchData(`https://swapi.dev/api/people/?search=${searchValue2}`);

    array.push(data2.results[0]);

    return array;

}

function getRightImage(character) {

    let rightImageUrl = "";

    if (character.includes("-")) {

        rightImageUrl = `/images/${character.toLowerCase().replace("-", "_")}.jpg`;

    } else {

        rightImageUrl = `/images/${character.toLowerCase().replace(" ", "_")}.jpg`;

    }

    console.log(rightImageUrl);

    return rightImageUrl;

}

function drawCharacter(character1, character2) {

    const character1Wrapper = document.querySelector(".character1Info");

    const character2Wrapper = document.querySelector(".character2Info")

    const character1Content = `
        <h2>${character1.name}</h2>
        <img src="${character1.pictureUrl}" alt="image of ${character1.name}"><img>   
        <button class="character1QuestionBtn" id="character1WeightBtn">Hur mycket väger ${character2.name}?</button>
        <button class="character1QuestionBtn" id="character1HeightBtn">Hur lång är ${character2.name}?</button>
        <button class="character1QuestionBtn" id="character1HairColorBtn">Vilken hårfärg har ${character2.name}?</button>
        <button class="character1QuestionBtn" id="character1GenderBtn">Vilket kön har ${character2.name}?</button>
    `;

    const character2Content = `
        <h2>${character2.name}</h2>
        <img src="${character2.pictureUrl}" alt="image of ${character2.name}"><img>  
        <button class="character2QuestionBtn" id="character2WeightBtn">Hur mycket väger ${character1.name}?</button>
        <button class="character2QuestionBtn" id="character2HeightBtn">Hur lång är ${character1.name}?</button>
        <button class="character2QuestionBtn" id="character2HairColorBtn">Vilken hårfärg har ${character1.name}?</button>
        <button class="character2QuestionBtn" id="character2GenderBtn">Vilket kön har ${character1.name}?</button>
    `;

    character1Wrapper.innerHTML = character1Content;

    character2Wrapper.innerHTML = character2Content;
 
}


compareCharactersBtn.addEventListener("click", async (e) => {

    e.preventDefault();

    const selectedCharacter1 = document.querySelector("#character1").value;

    const selectedCharacter2 = document.querySelector("#character2").value;

    console.log(selectedCharacter1, selectedCharacter2)

    characters = await fetchCaracters(selectedCharacter1, selectedCharacter2); 

    console.log(characters)

    let imageURLChar1 = getRightImage(characters[0].name);

    let imageURLChar2 = getRightImage(characters[1].name);

    character1 = new Characters(characters[0].name, characters[0].gender, characters[0].height, characters[0].mass, characters[0].hair_color, imageURLChar1);

    character2 = new Characters(characters[1].name, characters[1].gender, characters[1].height, characters[1].mass, characters[1].hair_color, imageURLChar2);

    console.log(character1, character2);

    drawCharacter(character1, character2);

})

