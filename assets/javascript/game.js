$(document).ready(function () {

    selectedChar = "";
    selected = false;

    characters = [
        {name: "robot",
        hp: 130,
        attack: 7},

        {name: "skeleton",
        hp: 120,
        attack: 8},

        {name: "work",
        hp: 110,
        attack: 9},

        {name: "crash",
        hp: 100,
        attack: 10}
    ];

    $(".card").on("click", function() {
        if(!selected){
            for(i = 0; i < characters.length; i++){
                if(characters[i].name === $(this).attr("name")){
                    console.log("match, " + $(this).attr("name"));
                    selectedChar = characters.splice(i, 1);
                    console.log(selectedChar);
                    selected = true;
                }
            }
        }
    })


})

