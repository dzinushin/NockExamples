const nock = require('nock');
const fetch = require('node-fetch');
const nockBackOptions = require('./helpers/nock');
// const request = requite('request');

const randomUserUrl = 'https://randomuser.me/api/'

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