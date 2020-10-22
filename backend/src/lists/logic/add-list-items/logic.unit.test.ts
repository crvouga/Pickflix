import {makeUserFake} from '../../../users/models/make-user.fake';
import {buildListLogicFake} from '../build.fake';
import {TmdbMediaType} from '../../../media/models/types';
describe('add list items to list', () => {
  it('throws if duplicate list items', async () => {
    const {listLogic} = buildListLogicFake();

    const currentUser = makeUserFake();

    const [list] = await listLogic.addLists([
      {
        ownerId: currentUser.id,
        title: 'my list',
      },
    ]);

    expect(
      listLogic.addListItems([
        {
          userId: currentUser.id,
          listId: list.id,
          tmdbMediaId: '550',
          tmdbMediaType: TmdbMediaType.movie,
        },
        {
          userId: currentUser.id,
          tmdbMediaId: '550',
          listId: list.id,
          tmdbMediaType: TmdbMediaType.movie,
        },
        {
          userId: currentUser.id,
          tmdbMediaId: '550',
          tmdbMediaType: TmdbMediaType.movie,
          listId: list.id,
        },
      ])
    ).rejects.toBeTruthy();
  });
});
