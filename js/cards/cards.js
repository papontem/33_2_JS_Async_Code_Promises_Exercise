$(document).ready(function () {
    console.log("HELLO DECK OF CARDS!");
    
    const baseUrl = 'https://deckofcardsapi.com/api';
    
    // PART 2.1
    /**
     * Make a request to the Deck of Cards API to request a single card from a newly shuffled deck.
     * Once you have the card, console.log the value and the suit (e.g. “5 of spades”, “queen of diamonds”.
     * 
     * We need to check if we have a deck_id already saved in local storage. 
     * if not well call this api url to create a new deck a new deck will be stored for some time in their server, while we keep the deck id.
    */
    
    let deck_id = localStorage.getItem("deck_id");

    if(deck_id == undefined){
        // debug
        console.log("WE SEE YOUR DECK IS UNDEFINED LETS CUT YOU A NEW ONE.");

        // make api call and get a new deck
        const newShuffledDeckUrl = baseUrl + `/deck/new/shuffle/?deck_count=1`
        axios.get(newShuffledDeckUrl)
            .then( newDeckJson => {
                
                console.log("RESOLVED!  Heres Your New Deck Json:", newDeckJson);
                // example resonse
                // {
                //     "success": true,
                //     "deck_id": "zog29tpzjkzx",
                //     "shuffled": true,
                //     "remaining": 52
                // }
                deck_id = newDeckJson.data.deck_id
                // put deck_id in local storage
                localStorage.setItem("deck_id", deck_id)
            })
            .catch(error => {
                console.error('REJECTED!! ERROR:', error);
            });

    }else{
        // we have a deck_id value, lets see if the deck is still alice in the deck of cards api server by trying to shuffle the cards again

        // later on we might want to re-render the cards user has already drawn from seeing which they have in the pile
        console.log("WE SEE YOUR DECK IS DEFINED LETS SHUFFLE IT.");

        const shuffleMyDeckUrl = `${baseUrl}/deck/${deck_id}/shuffle/`
        axios.get(shuffleMyDeckUrl)
            .then(shuffledDeckResJson => {
                console.log("RESOLVED! Here your Deck Json:", shuffledDeckResJson);
                
            })
            .catch(error => {
                console.error('REJECTED!! ERROR:', error);
            });

    }
    

    // Listen for button click to draw a card
    $('#drawCardBtn').on('click', function(){
        if (!deck_id) {
            console.error('Deck ID is missing.');
            return;
        }
        
        // once we have the deck id we can then call draw a card.
        const numbOfCards = 1
        const drawCardUrl =`${baseUrl}/deck/${deck_id}/draw/?count=${numbOfCards}`
        // Draw a card from the deck
        axios.get(drawCardUrl)
            .then(drawnCardResJson => {
                console.log("RESOLVED! Heres Your Draw Card Json:", drawnCardResJson);

                const card = drawnCardResJson.data.cards[0];
                console.log(`Drawn Card: ${card.value} of ${card.suit}`);
            })
            .catch(error => {
                console.error('REJECTED!! ERROR:', error);
            });

    });

    // Listen for button click to draw 2 cards
    $('#draw2CardsBtn').on('click', function(){
        if (!deck_id) {
            console.error('Deck ID is missing.');
            return;
        }
        
        // once we have the deck id we can then call draw a card.
        // set this to the value of cards you want per draw, default has been one
        const numbOfCards = 1
        drawCardUrl =`${baseUrl}/deck/${deck_id}/draw/?count=${numbOfCards}`
        // Draw a card from the deck
        axios.get(drawCardUrl)
            .then(drawnCardResJson => {
                console.log("RESOLVED! Heres Your Draw Card Json:", drawnCardResJson);

                let card = drawnCardResJson.data.cards[0];
                console.log(`Drawn Card: ${card.value} of ${card.suit}`);
                return axios.get(drawCardUrl)
            }).then(drawnCardResJson => {
                console.log("RESOLVED! Heres Your Draw Card Json:", drawnCardResJson);

                card = drawnCardResJson.data.cards[0];
                console.log(`Drawn Card: ${card.value} of ${card.suit}`);
            })
            .catch(error => {
                console.error('REJECTED!! ERROR:', error);
            });

    });
    
});