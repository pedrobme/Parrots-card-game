let cardsList = ['img/cards/bobrossparrot.gif', 'img/cards/explodyparrot.gif', 'img/cards/fiestaparrot.gif', 'img/cards/metalparrot.gif', 'img/cards/revertitparrot.gif', 'img/cards/tripletsparrot.gif', 'img/cards/unicornparrot.gif']

let turnControl = 0;

let firstChoice = null;

let secondChoice = null;

let moves = 0;

function draftGame(addHide){
    // Redundância necessária para o caso de "restart game"
    moves = 0;
    turnControl = 0;
    firstChoice = null;
    secondChoice = null;
    gamestart = setInterval(stopWatch, 1000)
    document.body.style.overflowY = "auto";

    document.querySelector(addHide).classList.add("hide");

    if(document.querySelector(".board").classList.contains("hide")){
        document.querySelector(".board").classList.remove("hide");
    }
    
    let nCards = prompt("Please, choose how many cards you want to play with.(4-14)")
    
    while(nCards%2 != 0 || nCards < 4 || nCards > 14){
        nCards = prompt("Please, choose an even number between 4 and 14.")
    }

    draft = duplicateArray(cardsList);
    randomOrdenedDraft = shuffleArray(draft);
    
    for(let i=7; i > nCards/2; i--){
        randomOrdenedDraft.pop();
    }

    createCardsDeck(randomOrdenedDraft)
}

function createCardsDeck(draft){
    let cardsHtmlList = [];

    for(let i=0; i<draft.length; i++){
        imgSrc = draft[i];

        for(let j=0; j<2; j++){
            cardsHtmlList.push(`
            <div class='card unflipped' onclick='turn(this)'>
                <div class='card-side'>
                    <img src='${imgSrc}'>
                </div>
                <div class='card-side front-side'>
                    <img src='img/front.png'>
                </div>
            </div>`)
        }
    }

    mountBoard(cardsHtmlList);
}

function mountBoard(cardsHtmlList){
    let boardHtml = `
    <div class='game-info'>
        <ul>
            <li>Moves:</li>
            <li id='moves-number'>0</li>
        <ul>
            <li>Time:</li>
            <li id='min'>0</li>
            <li>  min</li>
            <li> : </li>
            <li id='sec'>-1</li>
            <li>seconds</li>
        </ul>
    </div>
    <div class='board-cards'>`;

    randomOrdenedCards = shuffleArray(cardsHtmlList);

    for(let i=0; i<cardsHtmlList.length; i++){
        boardHtml += randomOrdenedCards[i];
    }
    boardHtml += `
    </div>`

    document.querySelector('.board').innerHTML = boardHtml;
}

function turn(choice){

    unflippedCard = choice.classList.contains("unflipped");

    if (turnControl === 0 && unflippedCard === true){
        flipCard(choice);
        turnControl++;
        firstChoice = choice;
    }
    else if(turnControl === 1 && unflippedCard === true){
        flipCard(choice);
        turnControl++;
        secondChoice = choice;
        moves++;
        document.getElementById('moves-number').innerHTML = moves;

        // Matching cards
        if(firstChoice.innerHTML === secondChoice.innerHTML){
            turnControl = 0;
            firstChoice = null;
            secondChoice = null;
            endGame();
            return;
        }
        
        // Unmatching cards
        else{
        setTimeout(unflipWrongChoice, 1000);
        }
    }
    }

function flipCard(choice){
    choice.classList.toggle("flipped");
    choice.classList.toggle("unflipped")
}

function unflipWrongChoice(){
    turnControl = 0;
    
    flipCard(firstChoice);
    flipCard(secondChoice);

    firstChoice = null;
    secondChoice = null;
}

function endGame(){
    if(document.querySelector(".unflipped") === null){
        clearInterval(gamestart)
        min = document.getElementById('min').innerHTML
        sec = document.getElementById('sec').innerHTML

        document.querySelector(".end-game-screen").classList.remove("hide");
        document.body.style.overflowY = "hidden";

        document.querySelector(".nMoves").innerHTML = `You completed the game in: ${moves} moves!`;
        document.querySelector(".finishTime").innerHTML = `and needed ${min} minutes and ${sec} seconds to do it!`;
    }
}




//Funções acessórias:

function duplicateArray(originalArray){
    let duplicate = [];
    for(i=0; i<cardsList.length; i++){
        duplicate.push(originalArray[i]);
    }
    return duplicate
}

//peguei na internet, randomizador de array
function shuffleArray(myArray){
    for (i = myArray.length -1; i > 0; i--) {
        j = Math.floor(Math.random() * i)
        k = myArray[i]
        myArray[i] = myArray[j]
        myArray[j] = k
      }
      
      return myArray;
}

function stopWatch(){
    min = Number(document.getElementById('min').innerHTML);
    sec = Number(document.getElementById('sec').innerHTML);

    sec++;
    if(sec > 59){
        sec=0;
        min++;
    }

    document.getElementById('min').innerHTML = min;
    document.getElementById('sec').innerHTML = sec;
}