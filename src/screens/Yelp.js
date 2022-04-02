import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.yelp.com/v3/businesses',
    headers: {
        Authorization: 'Bearer qNpiX-OdbwdbnzRckwTfcIsz-Kic3_qDIIm2vGHPsFCOOhz4vKY1J4dw5aMVADGXFh1jjIwryW9WAJsAtgGx7a_PPZOykw3392SpJvbVbhA9ofE9qesjmuu5rrRHYnYx'
    }
});

