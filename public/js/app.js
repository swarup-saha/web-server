// console.log('welcome to java script');



const weather = document.querySelector('form');
const search = document.querySelector('input');
const messageone = document.querySelector('#message-1');
const messagetwo = document.querySelector('#message-2');
// messageone.textContent = `this is subhankar `


weather.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    console.log(location);
    search.value = "";
    messageone.textContent = 'Loading.....';
    messagetwo.textContent = '';
    fetch(`/weather?address=${location}`)
        .then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    messageone.textContent = 'Unable to connect. Try another search';
                    console.log(data.error);
                } else {
                    messageone.textContent = data.place;
                    messagetwo.textContent = data.forecast;
                    // console.log(data.location.country);
                    // console.log(data.forecast)
                }
            })
        })
})