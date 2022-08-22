
// Lista de gifs para os cards
let cardsList = ['img/cards/bobrossparrot.gif', 'img/cards/explodyparrot.gif', 'img/cards/fiestaparrot.gif', 'img/cards/metalparrot.gif', 'img/cards/revertitparrot.gif', 'img/cards/tripletsparrot.gif', 'img/cards/unicornparrot.gif'],

// Variaveis globais para todos os 3 modos de jogo
turnControl = 0,
firstChoice = null,
secondChoice = null,
moves = 0,
nCards = 0,

// Variaveis globais modo 2 player
playerTurn = 'first player',
playerOnePoints = 0
playerTwoPoints = 0,

// Variaveis globais modo Time Trial
wonGames = 0,
startTime = 0;


                                //  PARROTS CARD GAME //

// O modo de funcionamento de cada um dos 3 modos de jogo é bem similar, sendo bem semelhante as
// suas lógicas de implementação. Em todos os modos o tabuleiro é montado em 3 etapas:

// draftGame(): Recebe do usuario o numero de cartas da partida e aleatoriamente escolhe os 'Gifs' 
// que participarão do jogo e os seus caminhos são armazenados em uma lista.

// createCards(): A partir da lista dos caminhos dos 'Gifs', a string referente ao HTML de cada um
// dos cards é criada de forma duplicada, criando pares e estas são estarmazenadas em uma Lista.

// mountBoard(): A lista de cards é embaralhada por meio da função shuffleArray(), e são dispostos os
// cards no tabuleiro, montando o HTML de forma dinâmica.

// O restante das funções exercem o papel de controlar o jogo de maneira adequada, com as peculiaridades
// de cada um dos modos.




// Selecionar modo de jogo (1 player, 2 players ou Time trial)
function selectGameMode(){
    // Redundância necessária para o caso de "restart game"
    turnControl = 0;
    firstChoice = null;
    secondChoice = null;
    moves = 0;
    nCards = 0;
    playerTurn = 'first player';
    playerOnePoints = 0;
    playerTwoPoints = 0;

    document.body.style.overflowY = "auto";

    // remove hide
    document.querySelector('.initial-screen').classList.remove("hide");
    document.querySelector(".game-title").classList.remove("hide");
    document.querySelector(".board").classList.remove("margin-board-2p-mobile");

    // add hide
    document.querySelector('.board').classList.add("hide");
    document.querySelector('.end-game-1p').classList.add("hide");
    document.querySelector('.end-game-2p').classList.add("hide");
    document.querySelector('.end-game-time-trial').classList.add("hide");
}

 

// Modo 1 player

function draftGame(InitialScreen){ 
    document.body.style.overflowY = "auto";

    // Trocas de telas
    document.querySelector(".game-title").classList.add("hide");
    document.querySelector(InitialScreen).classList.add("hide");

    document.querySelector(".board").classList.remove("hide");
    
    // Configuração do jogo
    nCards = prompt("Please, choose how many cards you want to play with.(4-14)");
    
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
            <p>Moves: <span id='moves-number'>0</span></p>
        </div>
        <div>
            <p>Time: <span id='min'>0</span> min <span id='sec'>0</span> sec</p>
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
    
    // Start stopWatch
    gamestart = setInterval(stopWatch, 1000);
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
            verifyEndGame();
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

function verifyEndGame(){
    if(document.querySelector(".unflipped") === null){
        clearInterval(gamestart);
        setTimeout(endGame, 500)

    }
}

function endGame(){
        min = document.getElementById('min').innerHTML;
        sec = document.getElementById('sec').innerHTML;

        document.querySelector(".end-game-1p").classList.remove("hide");
        document.body.style.overflowY = "hidden";

        document.querySelector(".nMoves").innerHTML = `You completed the game in: ${moves} moves!`;
        document.querySelector(".finishTime").innerHTML = `and needed ${min} minutes and ${sec} seconds to do it!`;
}



// Modo 2 players

function draftGameTwoPlayers(addHide){

    // Trocas de telas
    document.body.style.overflowY = "auto";
    document.querySelector(".game-title").classList.add("hide");
    document.querySelector(addHide).classList.add("hide");
    document.querySelector(".board").classList.add("margin-board-2p-mobile")

    document.querySelector(".board").classList.remove("hide");
    
    // Configuração de jogo
    nCards = prompt("Please, choose how many cards you want to play with.(4-14)");
    
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
        <div id="p2turn" class="player-2-display"><p>Player 2</p><p id='p2points'>Points: 0</p>
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
            verifyEndGameTwoPlayers();
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
    
    // Toggle playerTurn
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

function verifyEndGameTwoPlayers(){
    if(document.querySelector(".unflipped") === null){
        setTimeout(endGameTwoPlayers, 500)

    }
}

function endGameTwoPlayers(){

    document.querySelector(".end-game-2p").classList.remove("hide");
    document.body.style.overflowY = "hidden";

    let endGameMsg = '';

    if(playerOnePoints>playerTwoPoints){
        endGameMsg = 'Player one wins!';
    }
    else if(playerOnePoints<playerTwoPoints){
        endGameMsg = 'Player two wins!';
    } else{
        endGameMsg = 'It is a draw!';
    }

    document.getElementById('end-game-msg').innerHTML = endGameMsg;
    document.querySelector(".p1Points").innerHTML = `Player 1: ${playerOnePoints} points`;
    document.querySelector(".p2Points").innerHTML = `Player 2: ${playerTwoPoints} points`;
    }




// Modo Time Trial

function selectTime(InitialScreen){
    // Troca de Tela
    document.querySelector(InitialScreen).classList.add("hide");
    document.querySelector(".time-select-screen").classList.remove("hide");
}

function setTimeTrialConfig(num){

    startTime = num;
    wonGames = 0;

    nCards = prompt("Please, choose how many cards you want to play with.(4-14)");
    
    while(nCards%2 != 0 || nCards < 4 || nCards > 14){
        nCards = prompt("Please, choose an even number between 4 and 14.");
    }

    gamestart = setInterval(timeTrialWatch, 1000);

    if(startTime === 15){
        setTimeout(endGameTimeTrial, 15000);
    }else if(startTime === 30){
        setTimeout(endGameTimeTrial, 30000);
    }else if(startTime === 45){
        setTimeout(endGameTimeTrial, 45000);
    }else if(startTime === 60){
        setTimeout(endGameTimeTrial, 60000);
    } else if(startTime === 90){
        setTimeout(endGameTimeTrial, 90000);
    } else if(startTime === 120){
        setTimeout(endGameTimeTrial, 120000);
        }

    gameInfoTimeTrial = `
    <div class='game-info-time-trial'>
        <div>
            <p>Time: <span id='sec-time-trial'>${startTime}</span> seconds || <span class="game-info-win-streak"> Win streak: ${wonGames}</span></p>
        </div>
        <img src="img/cards/ampulheta.gif">
        <div class='clock clock-${startTime}'></div>
    </div>`;

    document.querySelector(".game-info-time-trial").innerHTML = gameInfoTimeTrial;
    document.querySelector(".game-info-time-trial").classList.remove("hide");
    
        draftGameTimeTrial(".time-select-screen", nCards);
}

function draftGameTimeTrial(timeSelectScreen, nCards){
    // Redundância necessária para o caso de "restart game"
    turnControl = 0;
    firstChoice = null;
    secondChoice = null;

    
    // Game start
    document.body.style.overflowY = "auto";

    // Troca de telas
    document.querySelector(".game-title").classList.add("hide");
    document.querySelector(timeSelectScreen).classList.add("hide");
    document.querySelector(".board").classList.remove("hide");
    
    // Configuração do jogo

    draft = duplicateArray(cardsList);
    randomOrdenedDraft = shuffleArray(draft);
    
    for(let i=7; i > nCards/2; i--){
        randomOrdenedDraft.pop();
    }

    createCardsTimeTrial(randomOrdenedDraft);
}

function createCardsTimeTrial(draft){
    let cardsHtmlList = [];

    for(let i=0; i<draft.length; i++){
        imgSrc = draft[i];

        for(let j=0; j<2; j++){
            cardsHtmlList.push(`
            <div class='card unflipped' onclick='turnTimeTrial(this)'>
                <div class='card-side'>
                    <img src='${imgSrc}'>
                </div>
                <div class='card-side front-side'>
                    <img src='img/front.png'>
                </div>
            </div>`);
        }
    }

    mountBoardTimeTrial(cardsHtmlList);
}

function mountBoardTimeTrial(cardsHtmlList){

    let boardHtml = `
    <div class='board-cards'>`;

    randomOrdenedCards = shuffleArray(cardsHtmlList);

    for(let i=0; i<randomOrdenedCards.length; i++){
        boardHtml += randomOrdenedCards[i];
    }

    boardHtml += `
    </div>`;

    document.querySelector('.board').innerHTML = boardHtml;
}

function turnTimeTrial(choice){

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

        // Matching cards
        if(firstChoice.innerHTML === secondChoice.innerHTML){
            turnControl = 0;
            firstChoice = null;
            secondChoice = null;
            resetTimeTrial();
            return;
        }
        
        // Unmatching cards
        else{
        setTimeout(unflipWrongChoice, 500);
        }
    }
}

function resetTimeTrial(){
    if(document.querySelector(".unflipped") === null){
    markPointTimeTrial();
    setTimeout(draftGameTimeTrial,500, ".time-select-screen", nCards);
    }
}

function markPointTimeTrial(){
    wonGames++;
    document.querySelector(".game-info-win-streak").innerHTML = `Win streak: ${wonGames}`;
}


function endGameTimeTrial(){

    clearInterval(gamestart);
    document.querySelector(".game-info-time-trial").classList.add("hide");
    document.querySelector(".end-game-time-trial").classList.remove("hide");
    document.querySelector(".board").classList.remove("disable-click")
    document.body.style.overflowY = "hidden";

    let endGameMsg = 'Game Over';

    document.getElementById('end-game-msg-time-trial').innerHTML = endGameMsg;
    document.querySelector(".wins").innerHTML = `You have won ${wonGames} games(${nCards} cards) in ${startTime} seconds`;
}




//Funções Globais

function flipCard(choice){
    choice.classList.toggle("flipped");
    choice.classList.toggle("unflipped");
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

function timeTrialWatch(){
    sec = Number(document.getElementById('sec-time-trial').innerHTML);
    sec--;

    document.getElementById('sec-time-trial').innerHTML = sec;
}

//peguei na internet, randomizador de array
function shuffleArray(myArray){
    for (i = myArray.length -1; i > 0; i--) {
        j = Math.floor(Math.random() * i);
        k = myArray[i];
        myArray[i] = myArray[j];
        myArray[j] = k;
      }
      
      return myArray;
}