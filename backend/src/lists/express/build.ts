import express from 'express';
import {addList} from './add-list';
import {addListItem} from './add-list-item';
import {editList} from './edit-list';
import {getList} from './get-list';
import {getListItems} from './get-list-items';
import {getLists} from './get-lists';
import {getListsFromListItem} from './get-lists-from-list-item';
import {removeList} from './remove-list';
import {removeListItem} from './remove-list-item';
import {Dependencies} from './types';

const buildRouterList = [
  addList,
  addListItem,
  editList,
  getList,
  getLists,
  getListItems,
  removeList,
  removeListItem,
  getListsFromListItem,
];

export const buildListsRouter = (dependencies: Dependencies) => (
  router: express.IRouter
) => {
  for (const buildRouter of buildRouterList) {
    buildRouter(dependencies)(router);
  }
};
