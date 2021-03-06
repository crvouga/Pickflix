import { buildPersistence } from "../../app/build/build-test";
import { emailLogicStub } from "../email";
import { createEventEmitter, Events } from "../../common/events";
import { UserLogic } from "./logic";

export const buildUserLogicTest = async () => {
  const eventEmitter = createEventEmitter<Events>();

  const emailLogic = emailLogicStub;

  const { repositories } = await buildPersistence();

  const userLogic = new UserLogic({
    ...repositories,
    eventEmitter,
    emailLogic,
  });

  return { userLogic, eventEmitter };
};
