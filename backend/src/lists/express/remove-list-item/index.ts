import express from "express";
import { ListId, ListItemId } from "../../models/types";
import { Dependencies } from "../types";

export const removeListItem = ({ listLogic, middlewares }: Dependencies) => (
  router: express.IRouter
) => {
  router.delete(
    "/lists/:listId/list-items",
    middlewares.isAuthenticated,
    async (req, res, next) => {
      try {
        const listItemIds = req.body as ListItemId[];

        const listId = req.params.listId as ListId;

        await listLogic.removeListItems(
          listItemIds.map((listItemId) => ({ listId: listId, id: listItemId }))
        );

        res.status(204).end();
      } catch (error) {
        next(error);
      }
    }
  );
};
