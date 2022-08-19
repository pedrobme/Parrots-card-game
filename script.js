
let cardsList = ['img/cards/bobrossparrot.gif', 'img/cards/explodyparrot.gif', 'img/cards/fiestaparrot.gif', 'img/cards/metalparrot.gif', 'img/cards/revertitparrot.gif', 'img/cards/tripletsparrot.gif', 'img/cards/unicornparrot.gif'],

turnControl = 0,

firstChoice = null,

secondChoice = null,

moves = 0;


// Selecionar modo de jogo
function selectGameMode(){
    document.body.style.overflowY = "auto";
    document.querySelector('.initial-screen').classList.remove("hide");
    document.querySelector('.board').classList.add("hide");
    document.querySelector('.end-game-1p').classList.add("hide");
    document.querySelector('.end-game-2p').classList.add("hide");
    document.querySelector(".game-title").classList.remove("hide-mobile-version");
    document.querySelector(".board").classList.remove("margin-board-2p-mobile")
}




// Modo 1 player

function draftGame(InitialScreen){
    // Redundância necessária para o caso de "restart game"
    moves = 0;
    turnControl = 0;
    firstChoice = null;
    secondChoice = null;
    
    // Game start
    gamestart = setInterval(stopWatch, 1000);
    document.body.style.overflowY = "auto";

    // Troca de telas
    document.querySelector(InitialScreen).classList.add("hide");
    document.querySelector(".board").classList.remove("hide");
    document.querySelector(".game-title").classList.add("hide-mobile-version");
    
    // Configuração do jogo
    let nCards = prompt("Please, choose how many cards you want to play with.(4-14)");
    
    while(nCards%2 != 0 || nCards < 4 || nCards > 14){
        nCards = prompt("Please, choose an even number between 4 and 14.");
    }

    draft = duplicateArray(cardsList);
    randomOrdenedDraft = shuffleArray(draft);
    
    for(let i=7; i > nCards/2; i--){
        randomOrdenedDraft.pop();
    }

    createCards(randomOrdenedDraft);
}

function createCards(draft){
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
            </div>`);
        }
    }

    mountBoard(cardsHtmlList);
}

function mountBoard(cardsHtmlList){
    let boardHtml = `
    <div class='game-info'>
        <div>
            <p>Moves:</p>
            <p id='moves-number'>0</p>
        </div>
        <div>
            <p>Time: <span id='min'>0</span> min<span id='sec'>-1</span> sec</p>
        </div>
    </div>
    <div class='board-cards'>`;

    randomOrdenedCards = shuffleArray(cardsHtmlList);

    for(let i=0; i<randomOrdenedCards.length; i++){
        boardHtml += randomOrdenedCards[i];
    }

    boardHtml += `
    </div>`;

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

function unflipWrongChoice(){
    turnControl = 0;
    
    flipCard(firstChoice);
    flipCard(secondChoice);
    
    firstChoice = null;
    secondChoice = null;
}

function endGame(){
    if(document.querySelector(".unflipped") === null){
        clearInterval(gamestart);
        min = document.getElementById('min').innerHTML;
        sec = document.getElementById('sec').innerHTML;

        document.querySelector(".end-game-1p").classList.remove("hide");
        document.body.style.overflowY = "hidden";

        document.querySelector(".nMoves").innerHTML = `You completed the game in: ${moves} moves!`;
        document.querySelector(".finishTime").innerHTML = `and needed ${min} minutes and ${sec} seconds to do it!`;
    }
}








// Modo 2 players

let playerTurn = 'first player';
let playerOnePoints = 0;
let playerTwoPoints = 0;

function draftGameTwoPlayers(addHide){
    // Redundância necessária para o caso de "restart game"

    turnControl = 0;
    firstChoice = null;
    secondChoice = null;
    playerTurn = 'first player';
    playerOnePoints = 0;
    playerTwoPoints = 0;

    // Trocas de telas

    document.body.style.overflowY = "auto";
    document.querySelector(addHide).classList.add("hide");
    document.querySelector(".board").classList.remove("hide");
    document.querySelector(".game-title").classList.add("hide-mobile-version")
    document.querySelector(".board").classList.add("margin-board-2p-mobile")
    
    // Configuração de jogo

    let nCards = prompt("Please, choose how many cards you want to play with.(4-14)");
    
    while(nCards%2 != 0 || nCards < 4 || nCards > 14){
        nCards = prompt("Please, choose an even number between 4 and 14.");
    }

    draft = duplicateArray(cardsList);
    randomOrdenedDraft = shuffleArray(draft);
    
    for(let i=7; i > nCards/2; i--){
        randomOrdenedDraft.pop();
    }

    createCardsTwoPlayers(randomOrdenedDraft);
}

function createCardsTwoPlayers(draft){
    let cardsHtmlList = [];

    for(let i=0; i<draft.length; i++){
        imgSrc = draft[i];

        for(let j=0; j<2; j++){
            cardsHtmlList.push(`
            <div class='card unflipped' onclick='turnTwoPlayers(this)'>
                <div class='card-side'>
                    <img src='${imgSrc}'>
                </div>
                <div class='card-side front-side'>
                    <img src='img/front.png'>
                </div>
            </div>`);
        }
    }

    mountBoardTwoPlayers(cardsHtmlList);
}

function mountBoardTwoPlayers(cardsHtmlList){

    let boardHtml = `
    <div class='game-info-2p'>
        <div id="p1turn" class="player-1-display player-turn"><p>Player 1</p><p id='p1points'>Points: 0</p>
        </div>
        <div id="p2turn" class="player-2-display"><p>Player2</p><p id='p2points'>Points: 0</p>
        </div>
    </div>
    <div class='board-cards'>`;

    randomOrdenedCards = shuffleArray(cardsHtmlList);

    for(let i=0; i<cardsHtmlList.length; i++){
        boardHtml += randomOrdenedCards[i];
    }

    boardHtml += `
    </div>`;

    document.querySelector('.board').innerHTML = boardHtml;
}

function turnTwoPlayers(choice){

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

        // Matching cards
        if(firstChoice.innerHTML === secondChoice.innerHTML){
            turnControl = 0;
            firstChoice = null;
            secondChoice = null;
            markPoint(playerTurn);
            endGameTwoPlayers();
            return;
        }
        
        // Unmatching cards
        else{
        setTimeout(unflipWrongChoiceTwoPlayers, 1000);
        }
    }
}

function unflipWrongChoiceTwoPlayers(){
    turnControl = 0;
    
    flipCard(firstChoice);
    flipCard(secondChoice);
    
    if(playerTurn === 'first player'){
        playerTurn = 'second player';
        document.getElementById("p1turn").classList.remove("player-turn");
        document.getElementById("p2turn").classList.add("player-turn");
        
    }
    else{
        playerTurn = 'first player';
        document.getElementById("p1turn").classList.add("player-turn");
        document.getElementById("p2turn").classList.remove("player-turn");
    }

    console.log(playerTurn)
    firstChoice = null;
    secondChoice = null;
}

function markPoint(player){
    if(player === 'first player'){
        playerOnePoints++;
        document.getElementById('p1points').innerHTML = `Points: ${playerOnePoints}`;
    }
    else{
        playerTwoPoints++;
        document.getElementById('p2points').innerHTML = `Points: ${playerTwoPoints}`;
    }
}

function endGameTwoPlayers(){

    if(document.querySelector(".unflipped") === null){
        document.querySelector(".end-game-2p").classList.remove("hide");
        document.body.style.overflowY = "hidden";

        let endGameMsg = '';

        if(playerOnePoints>playerTwoPoints){
            endGameMsg = 'Player one wins!';
        }
        else if(playerOnePoints<playerTwoPoints){
            endGameMsg = 'Player two wins!';
        }
        else{
            endGameMsg = 'It is a draw!';
        }

        document.getElementById('end-game-msg').innerHTML = endGameMsg;
        document.querySelector(".p1Points").innerHTML = `Player 1: ${playerOnePoints} points`;
        document.querySelector(".p2Points").innerHTML = `Player 2: ${playerTwoPoints} points`;
    }

}









//Funções Globais

function flipCard(choice){
    choice.classList.toggle("flipped");
    choice.classList.toggle("unflipped")
}






//Funções acessórias:

function duplicateArray(originalArray){
    let duplicate = [];
    for(i=0; i<cardsList.length; i++){
        duplicate.push(originalArray[i]);
    }
    return duplicate
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
