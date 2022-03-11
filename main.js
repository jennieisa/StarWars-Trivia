class Characters {

    constructor(name, gender, height, mass, hairColor, pictureUrl) {

        this.name = name;

        this.gender = gender;

        this.height = height;

        this.mass = mass;

        this.hairColor = hairColor;

        this.pictureUrl = pictureUrl;

    }

    compareMass(character) {

        let result = "";

        let sum = "";

        if(this.mass < character.mass) {

            sum = parseInt(this.mass) / parseInt(character.mass);
            
            result = `<p>${character.name} väger ${Math.round(sum)} % mer än mig. </p>`;
            
        } else if (this.mass > character.mass) {

            sum = parseInt(character.mass) / parseInt(this.mass);
            
            result = `<p>${character.name} väger ${Math.round(sum)}% mindre än mig. </p>`;

        } else {

            result = `<p>${character.name} väger lika mycket som mig!</p>`;

        }

        return result;

    }

    compareHeight(character) {

        let result = "";

        let sum = "";

        if(this.height < character.height) {

            sum = parseInt(this.height) / parseInt(character.height);
            
            result = `<p>${character.name} är ${Math.round(sum)} % längre än mig. </p>`;
            
        } else if (this.height > character.height) {

            sum = parseInt(character.height) / parseInt(this.height);
            
            result = `<p>${character.name} är ${Math.round(sum)}% kortare än mig. </p>`;

        } else {

            result = `<p>${character.name} är lika lång som mig!</p>`;

        }

        return result;
    }

    compareHairColor() {

    }

    compareGender() {
        
    }


}

//Hämtar från DOM:en
const compareCharactersBtn = document.querySelector(".compareCharactersBtn");

const character1Wrapper = document.querySelector(".character1Info");

const character2Wrapper = document.querySelector(".character2Info")


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

    const character1Content = `
        <h2>${character1.name}</h2>
        <img src="${character1.pictureUrl}" alt="image of ${character1.name}"><img>   
        <button class="character1QuestionBtn" id="character1WeightBtn">Hur mycket väger ${character2.name}?</button>
        <button class="character1QuestionBtn" id="character1HeightBtn">Hur lång är ${character2.name}?</button>
        <button class="character1QuestionBtn" id="character1HairColorBtn">Vilken hårfärg har ${character2.name}?</button>
        <button class="character1QuestionBtn" id="character1GenderBtn">Vilket kön har ${character2.name}?</button>
        <article class="character1Answ"></article>
    `;

    const character2Content = `
        <h2>${character2.name}</h2>
        <img src="${character2.pictureUrl}" alt="image of ${character2.name}"><img>  
        <button class="character2QuestionBtn" id="character2WeightBtn">Hur mycket väger ${character1.name}?</button>
        <button class="character2QuestionBtn" id="character2HeightBtn">Hur lång är ${character1.name}?</button>
        <button class="character2QuestionBtn" id="character2HairColorBtn">Vilken hårfärg har ${character1.name}?</button>
        <button class="character2QuestionBtn" id="character2GenderBtn">Vilket kön har ${character1.name}?</button>
        <article class="character2Answ"></article>
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

    const character1Answ = document.querySelector(".character1Answ");

    const character2Answ = document.querySelector(".character2Answ");

    const character1WeightBtn = document.querySelector("#character1WeightBtn");

    const character2WeightBtn = document.querySelector("#character2WeightBtn");

    const character1HeightBtn = document.querySelector("#character1HeightBtn");

    const character2HeightBtn = document.querySelector("#character2HeightBtn");

    const character1HairColorBtn = document.querySelector("#character1HairColorBtn");

    const character2HairColorBtn = document.querySelector("#character2HairColorBtn");

    const character1GenderBtn = document.querySelector("#character1GenderBtn");

    const character2GenderBtn = document.querySelector("#character2GenderBtn");

    character1WeightBtn.addEventListener("click", () => {

        let result = character1.compareMass(character2);
        
        character1Answ.innerHTML = result;

    })

    character2WeightBtn.addEventListener("click", () => {

        let result = character2.compareMass(character1);

        character2Answ.innerHTML = result;

    })

    character1HeightBtn.addEventListener("click", () => {

        let result = character1.compareHeight(character2);

        character1Answ.innerHTML = result;

    })

    character2HeightBtn.addEventListener("click", () => {

        let result = character2.compareHeight(character1);

        character2Answ.innerHTML = result;

    })

})

