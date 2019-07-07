const fetch = require('node-fetch');

const getRandomUser = () => 
    fetch('https://randomuser.me/api/')
        .then(res => res.json())
        .then(res => res.results[0]);

module.exports = {
    getRandomUser,
};