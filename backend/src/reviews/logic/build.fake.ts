import {UnitOfWorkInMemory} from '../../unit-of-work/unit-of-work.fake';
import {ReviewLogic} from './build';

export const buildReviewLogicFake = () => {
  const reviewLogic = new ReviewLogic({
    unitOfWork: new UnitOfWorkInMemory(),
  });

  return {reviewLogic};
};