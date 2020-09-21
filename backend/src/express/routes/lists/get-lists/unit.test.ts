import supertest from 'supertest';
import {makeExpressAppFake} from '../../../fake';

describe('GET /lists', () => {
  it('gets lists for current user', async done => {
    const {ListLogic, currentUser, app} = makeExpressAppFake();

    const lists = await ListLogic.addLists(
      [1, 2, 3, 4, 5].map(n => ({
        ownerId: currentUser.id,
        title: 'my movies 1',
        description: 'some cool movies...',
      }))
    );

    supertest(app)
      .get('/api/lists')
      .expect(200)
      .then(response => {
        expect(response.body).toEqual(
          expect.arrayContaining(lists.map(_ => expect.objectContaining(_)))
        );
        done();
      });
  });
});
