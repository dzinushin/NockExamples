const nock = require('nock');
const query = require('./randomUserHelpers');

const apiUrl = 'https://randomuser.me';

describe('randomUserHelpers test', () => {
    beforeEach(() => {
        nock.back.fixtures = __dirname + '/../fixtures';
        nock.back.setMode('dryrun'); // actually default mode
    });

    afterEach(nock.cleanAll);

    it('getRandomUser should return user', () => {
        const scope = nock(apiUrl)
            .get('/api/')
            .reply(200, {
                results: [{ name: 'Igor'}]
            })
            .persist();

        return query
            .getRandomUser()
            .then( (res) => res.name )
            .then( (res) => { console.log('name: ', res); return res;} )
            .then( res => expect(res).toEqual('Igor'));
    });

    it('use fixture Promise syntax', async (done) => {
        nock.back('random-user-response.json')
            .then( ( { nockDone } ) => 
                query
                    .getRandomUser()
                    .then( res => res.name.first)
                    .then( res => { console.log('first name: ', res); return res;})
                    .then( res => expect(res).toEqual('maya'))
                    .then(nockDone)
                    .then(() => { done(); } )
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