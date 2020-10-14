import supertest from 'supertest';
import {buildExpressAppFake} from '../../../express/build.fake';

describe('add list', () => {
  it('responses with created list', async done => {
    const {app} = await buildExpressAppFake();

    const title = 'my movies';
    const description = 'some cool movies';

    supertest(app)
      .post('/api/lists')
      .send({title, description})
      .set('Accept', 'application/json')
      .expect(201)
      .end((err, response) => {
        expect(response.body).toEqual(
          expect.objectContaining({title, description})
        );
        done();
      });
  });

  it('responses with bad request', async done => {
    const {currentUser, app} = await buildExpressAppFake();

    const title = 'my movies';
    const description = 'some cool movies';

    supertest(app)
      .post('/api/lists')
      .send({title, description})
      .set('Accept', 'application/json')
      .expect(400)
      .end((err, response) => {
        done();
      });
  });
});
