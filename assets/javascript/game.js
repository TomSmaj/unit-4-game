$(document).ready(function () {

    let selected = false; //set to true after user selects character
    let enemiesSet = false; //set to true after enemies are moved
    let numAlive = 3;

    

    //each character is an object stored in an array
    //each character has the function .getHTML(col) that will return the HTML text for the character's bootstrap car
    //the function must be passed the bootstrap column width (3, 4, 6, 12) 
    let characters = [
        {   
            name: "robot",
            fname: "Robot Hostage Situation",
            hp: 130,
            attack: 7,
            imgSource: "assets/images/robot-hostage-situation.jpg",
            getHTML: function(colSize){
                return `<div class = "col-${colSize}"> <div class="card" style="width: 18rem;" name = ${this.name}> <img class="card-img-top" src="${this.imgSource}" alt="${this.name}"> <div class="card-body"> <h5 class="card-title">${this.fname}</h5> <p class="card-text">HP: ${this.hp}</p></div> </div> </div>`
            }
        },

        {   
            name: "skeleton",
            fname: "Astro Skeleton",
            hp: 120,
            attack: 8,
            imgSource: "assets/images/astro-skeleton.jpg",
            getHTML: function(colSize){
                return `<div class = "col-${colSize}"> <div class="card" style="width: 18rem;" name = ${this.name}> <img class="card-img-top" src="${this.imgSource}" alt="${this.name}"> <div class="card-body"> <h5 class="card-title">${this.fname}</h5> <p class="card-text">HP: ${this.hp}</p></div> </div> </div>`
            }
        },

        {
            name: "work",
            fname: "Average Work Week",
            hp: 110,
            attack: 9,
            imgSource: "assets/images/average-work-week.jpg",
            getHTML: function(colSize){
                return `<div class = "col-${colSize}"> <div class="card" style="width: 18rem;" name = ${this.name}> <img class="card-img-top" src="${this.imgSource}" alt="${this.name}"> <div class="card-body"> <h5 class="card-title">${this.fname}</h5> <p class="card-text">HP: ${this.hp}</p></div> </div> </div>`
            }
        },

        {
            name: "crash",
            fname: "Crash",
            hp: 100,
            attack: 10,
            imgSource: "assets/images/crash.jpg",
            getHTML: function(colSize){
                return `<div class = "col-${colSize}"> <div class="card" style="width: 18rem;" name = ${this.name}> <img class="card-img-top" src="${this.imgSource}" alt="${this.name}"> <div class="card-body"> <h5 class="card-title">${this.fname}</h5> <p class="card-text">HP: ${this.hp}</p></div> </div> </div>`
            }
        }
    ];

    //when the player selects their character, the the object is spliced from the characters array and set to selectedChar
    let selectedChar;
    let defender;

    //writes the four characters to the characterArea row and class of the html document
    setUpCharacters();

    $(".card").on("click", function() {
        if(!selected){
            for(i = 0; i < characters.length; i++){
                if(characters[i].name === $(this).attr("name")){
                    selectedChar = characters[i];
                    characters.splice(i, 1);
                    selected = true;
                }
            }
        writeSelectChar();            
        writeEnemies();
        }
    })

    function setUpCharacters(){
        let outString = "";
        //clear characterArea, write selectedChar back to characterArea, write enemies to enemyArea
        for(i = 0; i < characters.length; i++){
            outString += characters[i].getHTML(3);
        }
        $(".characterArea").html(outString);
    }
    
    function writeEnemies(){
        let columnSize = 12 / characters.length;
        let outString = "";
        for(i = 0; i < characters.length; i++){
            outString += characters[i].getHTML(columnSize);
        }
        $(".enemyArea").html(outString);
    }

    function writeSelectChar(){
        $(".characterArea").html("");
        $(".characterArea").html(selectedChar.getHTML(12));
    }

    function writeDefender(){

    }

})

