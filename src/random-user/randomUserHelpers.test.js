const nock = require('nock');
const query = require('./randomUserHelpers');

const apiUrl = 'https://randomuser.me';

describe('randomUserHelpers test', () => {
    beforeEach(() => {
        nock.back.fixtures = __dirname + '/../fixtures';
        nock.back.setMode('record');
    });

    afterEach(nock.cleanAll);

    it('getRandomUser should return user', () => {
        nock(apiUrl)
            .get('/api/')
            .reply(200, {
                results: [
                    { name: 'Igor'}
                ]
            });

        return query
            .getRandomUser()
            .then( (res) => res.name )
            .then( res => expect(res).toEqual('Igor'));
    });

    it('use fixture Promise syntax', () => {
        nock.back('random-user-response.json')
            .then( ( { nockDone } ) => 
                query
                    .getRandomUser()
                    .then( res => res.name.first)
                    .then( res => expect(res).toEqual('maya'))
                    .then(nockDone)
            )
    });

    it('use fixture async/await syntax', async () => {
        const { nockDone } = await nock.back('random-user-response.json');
        const userInfo = await query.getRandomUser();
        console.log('userInfo: ', userInfo.name); 
        expect(userInfo.name.first).toEqual('maya');
        nockDone();
    });
});