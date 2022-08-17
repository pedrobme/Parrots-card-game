let cardsList = ['img/cards/bobrossparrot.gif', 'img/cards/explodyparrot.gif', 'img/cards/fiestaparrot.gif', 'img/cards/metalparrot.gif', 'img/cards/revertitparrot.gif', 'img/cards/tripletsparrot.gif', 'img/cards/unicornparrot.gif']
console.log(cardsList)

let turnControl = 0;

let firstChoice;

let secondChoice

function draftGame(addHide, removeHide){
    document.querySelector(addHide).classList.add("hide");
    document.querySelector(removeHide).classList.remove("hide");
    
    let nCards = prompt("Please, choose how many cards you want to play with.(4-14)")

    while(nCards%2 != 0 || nCards < 4 || nCards > 14){
        nCards = prompt("Please, choose an even number between 4 and 14.")
    }

    draft = cardsList;
    
    for(let i=7; i > nCards/2; i--){
        draft = shuffleArray(draft);
        draft.pop();
    }

    console.log(draft)
    createCardsDeck(draft)
}

function createCardsDeck(draft){
    let cardsHtmlList = [];

    for(let i=0; i<draft.length; i++){
        imgSrc = draft[i];

        for(let j=0; j<2; j++){
            cardsHtmlList.push(`
            <div class='card' onclick='turn(this)'>
                <div class='card-side back-side'>
                    <img src='${imgSrc}'>
                </div>
                <div class='card-side front-side'>
                    <img src='img/front.png'>
                </div>
            </div>`)
        }
    }
    console.log(cardsHtmlList);
    mountBoard(cardsHtmlList);
}

function mountBoard(cardsHtmlList){
    let boardHtml = '';

    randomOrdenedCards = shuffleArray(cardsHtmlList);

    for(let i=0; i<cardsHtmlList.length; i++){
        boardHtml += randomOrdenedCards[i]
    }

    document.querySelector('.board').innerHTML = boardHtml
}

function flipCard(choice){
    console.log(choice);
    choice.classList.toggle("flip");
}

function turn(choice){
    if (turnControl === 0 && choice.classList.contains("flip") === false){
        flipCard(choice);
        turnControl++;
        firstChoice = choice;
    }
    else if(turnControl === 1 && choice.classList.contains("flip") === false){
        flipCard(choice);
        turnControl++;
        secondChoice = choice;

        if(firstChoice.innerHTML === secondChoice.innerHTML){
            turnControl = 0;
            firstChoice = null;
            secondChoice = null;
            return;
        }

        else{
        setTimeout(unflipWrongChoice, 1000);
        }
    }

    else{
        return
    }
}

function unflipWrongChoice(){
    turnControl = 0;
    
    flipCard(firstChoice);
    flipCard(secondChoice);

    firstChoice = null;
    secondChoice = null;
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