console.log("HELLO NUMBERS!");

// pick your favorite number or any number really
const num = 0;
console.log(`Current number: ${num}`);

const baseUrl = 'http://numbersapi.com/' ;

// Create the URL to get json resposnse from the API
// by adding json query at the end with our selected number
const getJsonRandomFactUrl = baseUrl + `${num}?json`;

// PROMISE CHAINING
axios.get(getJsonRandomFactUrl)
    .then( res => {
        console.log("RESOLVED!!\nresponde.data:",res.data)
        return res.data
    })
    .then(data => {
        console.log(`data.text: ${data.text}`);
    })
    .catch(error => console.error("REJECTED!!\nERROR:",error));