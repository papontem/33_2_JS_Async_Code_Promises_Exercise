console.log("HELLO NUMBERS!");

// function myAsyncFunction() {
//     // return a new Promise
//     return new Promise((resolve, reject) => {
//         /*
    
//         DO ASYNC STUFF HERE
    
//         */
    
//         // if it succeeds, call the resolve callback
//         resolve(/* success value*/);
    
//         // if it fails, call the reject callback
//         reject(/* fail value*/);
//     });
//     }



// PART 1.1
// pick your favorite number or any number really
const num = 0;
console.log(`Current number: ${num}`);

const baseUrl = 'http://numbersapi.com/' ;

// Create the URL to get json resposnse from the API
// by adding json query at the end with our selected number
const randFactJsonURL = baseUrl + `${num}?json`;
const randFact = axios.get(randFactJsonURL)

// PROMISE CHAINING
randFact
    .then( res => {
        // console.log("RESOLVED!!\nresponde.data:",res.data)
        return res.data
    })
    .then(data => {
        // console.log(`data.text: ${data.text}`);
        console.log(`Random Fact about # ${data.number}: ${data.text}`);

    })
    .catch(error => console.error("REJECTED!!\nERROR:",error));


// PART 1.2
// make a list of numbers or use the random list of numbers

let numListPromises = [];
// function for if you wish to make a list of random numbers 0-100
function getRandomInt(min=0, max=100) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

for (let i = 0; i < 3; i++) {
    numListPromises.push(
        // pick between a) sequence or b) a random list 
        // axios.get(baseUrl + `${i}?json`) // a) sequence
        axios.get(baseUrl + `${getRandomInt()}?json`)  // b) random list
    );
}

// Go through all the promises and request them 
Promise.all(numListPromises)
.then(numApiResponses => {
    console.log("RESOLVED!!",numApiResponses)
    for(res of numApiResponses){
        console.log(`Random fact about # ${res.data.number} : ${res.data.text}`)
    }
})
// first promise that gets rejected, print out its error
.catch(error => console.error("REJECTED!!\nERROR:",error));

