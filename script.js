let nCards = prompt("Please, choose how many cards you want to play with.(4-14)")

while(nCards%2 != 0 || nCards < 4 || nCards > 14){
    nCards = prompt("Please, choose an even number between 4 and 14.")
}

let cardsList = ['img/cards/bobrossparrot.gif', 'img/cards/explodyparrot.gif', 'img/cards/fiestaparrot.gif', 'img/cards/metalparrot.gif', 'img/cards/revertitparrot.gif', 'img/cards/tripletsparrot.gif', 'img/cards/unicornparrot.gif']
console.log(cardsList)

let turnControl = 0;

function draftGame(addHide, removeHide){
    document.querySelector(addHide).classList.add("hide");
    document.querySelector(removeHide).classList.remove("hide");
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
            <div class='card'>
                <div class='cardBackside card-side' onclick='flipCard(this)'>
                    <img src='img/front.png'>
                </div>
                <div class='cardFrontside card-side'>
                    <img src='${imgSrc}'>
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
    console.log(choice)
    clickedCard = choice.parentNode
    console.log(clickedCard)

    clickedCard.querySelector('.cardBackside').classList.add('flip-backside')
    clickedCard.querySelector('.cardFrontside').classList.add('flip-frontside')
}

function unflipCard(){
    return
}

function shuffleArray(myArray){
    for (i = myArray.length -1; i > 0; i--) {
        j = Math.floor(Math.random() * i)
        k = myArray[i]
        myArray[i] = myArray[j]
        myArray[j] = k
      }
      
      return myArray;
}

