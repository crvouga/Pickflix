import { ListLogic } from "../../lists/logic/build";
import { MediaLogic } from "../../media/logic/build";
import { ReviewLogic } from "../../reviews/logic/logic";
import {
  AuthenticateMiddleware,
  IsAuthenticatedMiddleware,
} from "../../users/express/build-auth-middleware";
import { UserLogic } from "../../users/logic/logic";

export type ExpressAppDependencies = {
  listLogic: ListLogic;
  reviewLogic: ReviewLogic;
  mediaLogic: MediaLogic;
  userLogic: UserLogic;
  middlewares: {
    authenticate: AuthenticateMiddleware;
    isAuthenticated: IsAuthenticatedMiddleware;
  };
};
