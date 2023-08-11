$(document).ready(function () {
    const baseUrl = 'http://numbersapi.com/';
    
    console.log("HELLO NUMBERS!");

    // PART 1.1
    // pick your favorite number or any number really
    let favNum = 0;
    console.log(`Current favorite number: ${favNum}`);

    // // Create the URL to get json resposnse from the API
    // // by adding json query at the end with our selected number
    // const randFactJsonURL = baseUrl + `${num}?json`;
    // const randFact = axios.get(randFactJsonURL)

    // // PROMISE CHAINING
    // randFact
    //     .then( res => {
    //         // console.log("RESOLVED!!\nresponde.data:",res.data)
    //         return res.data
    //     })
    //     .then(data => {
    //         // console.log(`data.text: ${data.text}`);
    //         console.log(`Random Fact about # ${data.number}: ${data.text}`);

    //     })
    //     .catch(error => console.error("REJECTED!!\nERROR:",error));

    // PART 1.2
    // function callback for if you wish get a random number 0-100
    const getRandomInt = (min = 0, max = 100) => Math.floor(Math.random() * (max - min + 1)) + min;
    // make a list of numbers or use the random list of numbers
    let numListPromises = [];
    
    // button listener to get more fatcs
    $('#getRandomFactsBtn').on('click', function () {

        numListPromises = []

        // for loop to push 3 num api get promises into the nums list
        for (let i = 0; i < 3; i++) {
            numListPromises.push(
                // pick between a) sequence or b) a random list 
                // axios.get(baseUrl + `${i}?json`) // a) sequence
                axios.get(baseUrl + `${getRandomInt()}?json`)  // b) random list
            );
        }
        
        Promise.all(numListPromises)
        .then(numApiResponses => {
            // uncomment if you want the list to refresh
            $('#nums-fact-list').empty();

            numApiResponses.forEach(res => {
                const randFact = `Random fact about # ${res.data.number}: ${res.data.text}`;
                $('#nums-fact-list').append(`<li>${randFact}</li>`);
            });
        })
        .catch(error => {
            console.error('REJECTED!!\nERROR:', error);
        });
    });

    // part 1.3
    $('#fav-number-form').on('submit', function (event) {
        event.preventDefault(); // Prevent default form submission behavior

        // Get the entered favorite number
        favNum = $('#favNum').val();
        const $warningMessage = $('#warning-message');
        // Check if favNum is empty or not

        if (favNum.trim() === '') {
            $warningMessage.text('Please enter a number.');
            return; 
        } else {
            // Clear the warning message if input is valid
            $warningMessage.text(''); 
        }

        console.log(`Your selected favorite number: ${favNum}`);
        
        numListPromises = []

        // for loop to push 4 fav num api get promises into the nums list
        for (let i = 0; i < 4; i++) {
            numListPromises.push(
                axios.get(baseUrl + `${favNum}?json`) 
            );
        }

        Promise.all(numListPromises)
        .then(numApiResponses => {
            // uncomment if you want the list to refresh
            $('#nums-fact-list').empty();
            $('#nums-fact-list').append(`<p> -- Heres some trivia about # ${favNum} --</p>`);
            numApiResponses.forEach(res => {
                const randFact = `${res.data.text}`;
                $('#nums-fact-list').append(`<li>${randFact}</li>`);
            });
        })
        .catch(error => {
            console.error('REJECTED!!\nERROR:', error);
        });

    });


});


