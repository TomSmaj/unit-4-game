
$(document).ready(function () {

    let selected = false; //set to true after user selects character
    let defenderSelected = false; //set to true after enemies are moved
    let numAlive = 3;
    let selectedCharAlive = true;

    //each character is an object stored in an array
    //each character has the function .getHTML(col) that will return the HTML text for the character's bootstrap car
    //the function must be passed the bootstrap column width (3, 4, 6, 12) 
    let characters = [
        {   
            name: "robot",
            fname: "Robot Hostage Situation",
            hp: 200,
            baseAttack: 0.5,
            attack: 0.5,
            imgSource: "assets/images/robot-hostage-situation.jpg",
            getHTML: function(){
                return `<div class = "col ${this.name} character"> 
                            <div class="card" style="width: 18rem;" name = ${this.name}> 
                                <img class="card-img-top" src="${this.imgSource}" alt="${this.name}">
                                <div class="card-body"> 
                                    <h5 class="card-title">${this.fname}</h5> 
                                    <p class="card-text">
                                        HP: <span class="${this.name}HP">${this.hp}</span>&nbsp;&nbsp&nbsp;&nbsp;&nbsp;Attack: <span class="${this.name}Attack">${this.attack}</span>
                                    </p>
                                </div> 
                            </div>
                        </div>`
            }
        },

        {   
            name: "skeleton",
            fname: "Astro Skeleton",
            hp: 120,
            baseAttack: 2.5,
            attack: 2.5,
            imgSource: "assets/images/astro-skeleton.jpg",
            getHTML: function(){
                return `<div class = "col ${this.name} character"> 
                            <div class="card" style="width: 18rem;" name = ${this.name}> 
                                <img class="card-img-top" src="${this.imgSource}" alt="${this.name}"> 
                                <div class="card-body">
                                    <h5 class="card-title">${this.fname}</h5>
                                    <p class="card-text">
                                        HP: <span class="${this.name}HP">${this.hp}</span>&nbsp;&nbsp&nbsp;&nbsp;&nbsp;Attack: <span class="${this.name}Attack">${this.attack}</span>
                                    </p>
                                </div>
                            </div>
                        </div>`
            }
        },

        {
            name: "work",
            fname: "Average Work Week",
            hp: 110,
            baseAttack: 3.0,
            attack: 3.0,
            imgSource: "assets/images/average-work-week.jpg",
            getHTML: function(colSize){
                return `<div class = "col ${this.name} character">
                            <div class="card" style="width: 18rem;" name = ${this.name}> 
                                <img class="card-img-top" src="${this.imgSource}" alt="${this.name}">
                                <div class="card-body"> 
                                    <h5 class="card-title">${this.fname}</h5>
                                    <p class="card-text">
                                    HP: <span class="${this.name}HP">${this.hp}</span>&nbsp;&nbsp&nbsp;&nbsp;&nbsp;Attack: <span class="${this.name}Attack">${this.attack}</span>
                                    </p>
                                </div>
                            </div>
                        </div>`
            }
        },

        {
            name: "crash",
            fname: "Crash Landing",
            hp: 100,
            baseAttack: 15,
            attack: 15,
            imgSource: "assets/images/crash.jpg",
            getHTML: function(colSize){
                return `<div class = "col ${this.name} character">
                            <div class="card" style="width: 18rem;" name = ${this.name}>
                                <img class="card-img-top" src="${this.imgSource}" alt="${this.name}">
                                <div class="card-body">
                                    <h5 class="card-title">${this.fname}</h5>
                                    <p class="card-text">
                                    HP: <span class="${this.name}HP">${this.hp}</span>&nbsp;&nbsp&nbsp;&nbsp;&nbsp;Attack: <span class="${this.name}Attack">${this.attack}</span>
                                    </p>
                                </div>
                            </div> 
                        </div>`
            }
        }
    ];

    //when the player selects their character, the the object is spliced from the characters array and set to selectedChar
    let selectedChar;
    let defender;

    
    const setUpCharacters = () => {
        let outString = "";
        //clear characterArea, write selectedChar back to characterArea, write enemies to enemyArea
        for(i = 0; i < characters.length; i++){
            outString += characters[i].getHTML();
        }
        $(".characterArea").html(outString);
        return;
    }
    
    
    const moveEnemies = () => {
        for(i = 0; i < characters.length; i++){
            $("." + characters[i].name).detach().appendTo(".enemyArea");
        }
        $(".defenderArea").detach().appendTo(".character-defender");
        return;
    }
    
    const moveDefender = () => {
        if(defenderSelected){
            $("." + defender.name).detach().appendTo(".defenderArea");
        }
        return;
    }
    
    function removeDefender(){
        $("." + defender.name).detach();
        defenderSelected = false;
        numAlive -= 1;
        if(numAlive <= 0){endGame();}
        return;
    }

    function endGame(){
        if(selectedCharAlive){console.log("Players Wins!");}
        else{console.log("Oh no! Players loses!");}
    }

    function updateHP(char){
        $("." + char.name + "HP").text(char.hp);
        return;
    }

    function updateAttack(char){
        $("." + char.name + "Attack").text(char.attack);
        return;
    }

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
            moveEnemies();        
        }
        else if(!defenderSelected && numAlive > 0){
            for(i = 0; i < characters.length; i++){
                if(characters[i].name === $(this).attr("name")){
                    defender = characters[i];
                    characters.splice(i, 1);
                    defenderSelected = true;
                }
            }
            moveDefender();
        }
    });

    $(".attackButton").on("click", function() {
        if(defenderSelected){
            defender.hp -= selectedChar.attack;
            selectedChar.attack += selectedChar.baseAttack;
            updateHP(defender);
            updateAttack(selectedChar);
            console.log("You attack.");
            console.log("Defender hp: " + defender.hp);
            if(defender.hp <= 0){
                removeDefender();
            }
            else{
                selectedChar.hp -= defender.attack;
                updateHP(selectedChar);
                console.log("Defender attacks.");
                console.log("Your hp: " + selectedChar.hp);
                console.log("Your attack: " + selectedChar.attack);
                if(selectedChar.hp <= 0){
                    selectedCharAlive = false;
                    defenderSelected = false;
                    endGame();
                }
                
            }
        }
    });

});

