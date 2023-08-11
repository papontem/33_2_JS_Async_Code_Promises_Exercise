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
        console.log("WE SEE YOUR DECK IS UNDEFINED LETS CUT YOU A NEW ONE.");
        deck_id = "Bonyour"
        localStorage.setItem("deck_id", deck_id)
    } else {
        console.log("USER, WE FOUND YOUR DECK!!");
        console.log(deck_id);
    }

    
    // // call this if we only want to make a new deck thats in order from A-K Spa, Dia, Clu, H<3
    // const newDeckUrl = 'https://deckofcardsapi.com/api/deck/new/';
    // // get 2 jokers added in a new deck
    // const newJokerDeckUrl = 'https://deckofcardsapi.com/api/deck/new/?jokers_enabled=true';
    // // will probably use this url
    let newShuffledDeckUrl = baseUrl + `/deck/new/shuffle/?deck_count=1`
    // example resonse
    // {
    //     "success": true,
    //     "deck_id": "3p40paa87x90",
    //     "shuffled": true,
    //     "remaining": 52
    // }

    // once we have the deck id we can then call draw a card.
    let numbOfCards = 1
    let drawCardUrl = baseUrl + `deck/<<deck_id>>/draw/?count=${numbOfCards}`
    // // TIP: replace <<deck_id>> with "new" to create a shuffled deck and draw cards from that deck in the same request.
    // // example resonse
    // {
    //     "success": true, 
    //     "deck_id": "kxozasf3edqu", 
    //     "cards": [
    //         {
    //             "code": "6H", 
    //             "image": "https://deckofcardsapi.com/static/img/6H.png", 
    //             "images": {
    //                           "svg": "https://deckofcardsapi.com/static/img/6H.svg", 
    //                           "png": "https://deckofcardsapi.com/static/img/6H.png"
    //                       }, 
    //             "value": "6", 
    //             "suit": "HEARTS"
    //         }
    //     ], 
    //     "remaining": 51
    // }
    // // Now we can grab the data from the response and log the info to user
    
});