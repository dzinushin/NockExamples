const query = require('./random-user/randomUserHelpers');

function main() {
    query.getRandomUser().then( (res) => {
        console.log('received random user:', res);
    });
}

main();