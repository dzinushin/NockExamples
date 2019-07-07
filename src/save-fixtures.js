const nock = require('nock');
const fetch = require('node-fetch');
const nockBackOptions = require('./helpers/nock');

const randomUserUrl = 'https://randomuser.me/api/'

// for get and save new fixture just remove existing fixture file ./fixtures/random-user-response.json
const saveRandomUserResp = () => {
    nock.back.fixtures = __dirname + '/fixtures';
    nock.back.setMode('record');

    nock.back('random-user-response.json',nockBackOptions)
        .then(  ({nockDone})  => {
        console.log('nock-back');
        fetch(randomUserUrl)
            .then(res => res.json())
            .then((res) => {
                console.log('res: ', res);
                nockDone();
            })
    });

};

saveRandomUserResp();