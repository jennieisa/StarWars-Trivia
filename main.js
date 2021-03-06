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

        if (parseInt(this.mass) < parseInt(character.mass)) {

            sum = parseInt(character.mass) - parseInt(this.mass);
            
            result = `<p>${character.name} weighs ${character.mass} kilos. It is ${Math.round(sum)} kilos more than me. </p>`;
            
        } else if (parseInt(this.mass) > parseInt(character.mass)) {

            sum = parseInt(this.mass) - parseInt(character.mass);
            
            result = `<p>${character.name} weighs ${character.mass} kilos. It is ${Math.round(sum)} kilos less than me. </p>`;

        } else {

            result = `<p>${character.name} weighs ${character.mass}. As much as I weigh!</p>`;

        }

        return result;

    }

    compareHeight(character) {

        let result = "";

        let sum = "";

        if(parseInt(this.height) < parseInt(character.height)) {

            sum = parseInt(character.height) - parseInt(this.height);
            
            result = `<p>${character.name} is ${character.height} centimeter tall. It is ${Math.round(sum)} centimeter taller than me. </p>`;
            
        } else if (parseInt(this.height) > parseInt(character.height)) {

            sum = parseInt(this.height) - parseInt(character.height);
            
            result = `<p>${character.name} is ${character.height} centimeter tall. It is ${Math.round(sum)} centimeter shorter than me. </p>`;

        } else {

            result = `<p>${character.name} is ${character.height} centimeter tall. We are the same length!</p>`;

        }

        return result;
    }

    compareHairColor(character) {

        let result = "";

        if (this.hairColor === "n/a" || this.hairColor === "none") {

            if (character.hairColor === "n/a" || character.hairColor === "none") {

                console.log("1")

                result = `<p>Me and ${character.name} do not have any hair!!!</p>`

                return result;

            } else {

                console.log("2")

                result = `<p>${character.name}'s hair color is ${character.hairColor}. I do not have any hair.</p>`;

                return result;

            }

        } else if (this.hairColor === character.hairColor) {

            result = `<p>${character.name}'s hair color is ${character.hairColor}. We have the same hair color!</p>`;

            return result;

        } else if (character.hairColor === "n/a" ||character.hairColor === "none") {

            result = `<p>${character.name} do not have any hair! My hair color is ${this.hairColor}. </p>`;

            return result;

        } else {
            
            result = `<p>${character.name}'s hair color is ${character.hairColor}. My hair color is ${this.hairColor}. </p>`;

            return result;

        }

    }

    compareGender(character) {

        let result = "";

        if (this.gender === "n/a" || character.gender === "n/a") {

            if (this.gender === "n/a" && character.gender === "n/a") {

                result = `<p>${character.name} does not define itself as a female or a male. Neither do I.</p>`;

                return result;

            } else if (this.gender === "n/a" && character.gender !== "n/a") {

                result = `<p>${character.name} define itself as a ${character.gender}. I do not define myself as a female or a male.</p>`;

                return result;

            } else if (this.gender !== "n/a" && character.gender === "n/a") {

                result = `<p>${character.name} does not define itself as a female or a male. I define myself as a ${this.gender}.</p>`;

                return result;

            }

        } else if (this.gender === character.gender) {

            result = `<p>${character.name} define itself as a ${character.gender}. We both define ourselves as ${character.gender}.</p>`;

            return result;

        } else {

            result = `<p>${character.name} define itself as a ${character.gender}. I define myself as a ${this.gender}.</p>`;

            return result;

        }
        
    }


}

//H??mtar fr??n DOM:en
const showCharactersBtn = document.querySelector(".showCharactersBtn");

const character1Wrapper = document.querySelector(".character1Info");

const character2Wrapper = document.querySelector(".character2Info")


let character1 = "";

let character2 = "";

let characters = [];

//Funktion som h??mtar data
async function fetchData(url) {

    const response = await fetch(url)

    const data = await response.json();

    return data;

}

//Funktion som h??mtar r??tt karakt??rer
async function fetchCaracters(name1, name2) {

    let array = [];

    let searchValue1 = name1.replace("_", " ");

    let searchValue2 = name2.replace("_", " ");

    let data1 = await fetchData(`https://swapi.dev/api/people/?search=${searchValue1}`);

    array.push(data1.results[0]);

    let data2 =  await fetchData(`https://swapi.dev/api/people/?search=${searchValue2}`);

    array.push(data2.results[0]);

    return array;

}

//Funktion som h??mtar r??tt karakt??rbild 
function getRightImage(character) {

    let rightImageUrl = "";

    if (character.includes("-") && character.includes(" ")) {

        rightImageUrl = `/images/${character.toLowerCase().replace("-", "_").replace(" ", "_")}.png`;

    } else if(character.includes("-")) {

        rightImageUrl = `/images/${character.toLowerCase().replace("-", "_")}.png`;


    } else {

        rightImageUrl = `/images/${character.toLowerCase().replace(" ", "_")}.png`;

    }

    return rightImageUrl;

}

//Funktion som ritar ut valda karakt??rer i DOM:en
function drawCharacter(character1, character2) {

    const character1Content = `
        <h2>${character1.name}</h2>
        <div class="character1Answ">
            Ask me something about ${character2.name} by clicking on any of the buttons below.
        </div>
        <img src="${character1.pictureUrl}" alt="image of ${character1.name}"></img>   
        <button class="character1QuestionBtn" id="character1WeightBtn">How much does ${character2.name} weigh?</button>
        <button class="character1QuestionBtn" id="character1HeightBtn">How tall is ${character2.name}?</button>
        <button class="character1QuestionBtn" id="character1HairColorBtn">What hair color does ${character2.name} have?</button>
        <button class="character1QuestionBtn" id="character1GenderBtn">What gender is ${character2.name}?</button>
    `;

    const character2Content = `
        <h2>${character2.name}</h2>
        <div class="character2Answ">Ask me something about ${character1.name} by clicking on any of the buttons below.</div>
        <div class="cloud"></div>
        <img src="${character2.pictureUrl}" alt="image of ${character2.name}"></img>  
        <button class="character2QuestionBtn" id="character2WeightBtn">How much does ${character1.name} weigh?</button>
        <button class="character2QuestionBtn" id="character2HeightBtn">How tall is ${character1.name}?</button>
        <button class="character2QuestionBtn" id="character2HairColorBtn">What hair color does ${character1.name} have?</button>
        <button class="character2QuestionBtn" id="character2GenderBtn">What gender is ${character1.name}?</button>

    `;

    character1Wrapper.innerHTML = character1Content;

    character2Wrapper.innerHTML = character2Content;
 
}

//H??ndelsef??rlopp n??r man klickar p?? compare och fr??geknapparna
showCharactersBtn.addEventListener("click", async (e) => {

    e.preventDefault();

    const selectedCharacter1 = document.querySelector("#character1").value;

    const selectedCharacter2 = document.querySelector("#character2").value;

    characters = await fetchCaracters(selectedCharacter1, selectedCharacter2); 

    character1Wrapper.style.display = "flex";

    character2Wrapper.style.display = "flex";

    let imageURLChar1 = getRightImage(characters[0].name);

    let imageURLChar2 = getRightImage(characters[1].name);

    character1 = new Characters(characters[0].name, characters[0].gender, characters[0].height, characters[0].mass, characters[0].hair_color, imageURLChar1);

    character2 = new Characters(characters[1].name, characters[1].gender, characters[1].height, characters[1].mass, characters[1].hair_color, imageURLChar2);

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

    character1HairColorBtn.addEventListener("click", () => {
        
        let result = character1.compareHairColor(character2);

        character1Answ.innerHTML = result;

    })

    character2HairColorBtn.addEventListener("click", () => {

        let result = character2.compareHairColor(character1);

        character2Answ.innerHTML = result;

    })

    character1GenderBtn.addEventListener("click", () => {

        let result = character1.compareGender(character2);

        character1Answ.innerHTML = result;

    })

    character2GenderBtn.addEventListener("click", () => {

        let result = character2.compareGender(character1);

        character2Answ.innerHTML = result;

    })
})

