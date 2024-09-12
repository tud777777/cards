let cardf = document.querySelectorAll(".front");
let cardb = document.querySelectorAll(".back");
let Shuffle = document.querySelector(".Shuffle");
let cardInner = document.querySelectorAll('.inner');
let counter = 0;
let openCards = [];
async function getData() {
    const url1 = "https://deckofcardsapi.com/api/deck/new/shuffle/?cards=KH,KC,KD,KS&deck_count=1";
    try {
      const response1 = await fetch(url1);
      if (!response1.ok) {
        throw new Error(`Response status: ${response1.status}`);
      }
      const json1 = await response1.json();
      console.log(json1);
      
      const url2 = `https://deckofcardsapi.com/api/deck/${json1.deck_id}/draw/?count=4`;
      const response2 = await fetch(url2);
      if (!response2.ok) {
        throw new Error(`Response status: ${response2.status}`);
      }
      const json2 = await response2.json();
      console.log(json2);
      createCards(json2);
    } catch (error) {
      console.error(error.message);
    }
}

function createCards(json) {
    for (let i = 0; i < 4; i++) {
        cardb[i].style.backgroundImage = `url(https://deckofcardsapi.com/static/img/back.png)`;
        cardf[i].style.backgroundImage = `url(${json.cards[i].image})`;
        cardInner[i].addEventListener('click', () => {
            cardInner[i].classList.add('flipped');
            if (openCards[i] != 1){
                counter++;
                openCards[i]=1;
            }
            if(counter==4){
                Shuffle.classList.remove("Invisible");
            }
        });
    }
}

Shuffle.addEventListener('click', () => {
    getData();
    Shuffle.classList.add("Invisible");
    for (let i = 0; i < 4; i++) {
        cardInner[i].classList.remove('flipped');
    }
    openCards = [];
    counter=0;
});

getData();
