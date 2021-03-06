import { IconButton, Toolbar } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/DeleteForeverOutlined";
import EditIcon from "@material-ui/icons/EditOutlined";
import GroupAddOutlinedIcon from "@material-ui/icons/GroupAddOutlined";
import React from "react";
import useModal from "../../app/modals/useModal";
import { UserAggergation } from "../../user/query";
import DeleteListFormModal from "../forms/delete-list-form/DeleteListFormModal";
import EditListFormModal from "../forms/edit-list-form/EditListFormModal";
import useEditListForm from "../forms/edit-list-form/useEditListForm";
import { AddPermissionFormModal } from "../forms/permissions-form/AddPermissionForm";
import { PermissionFormModal } from "../forms/permissions-form/PermissionForm";
import { List, ListAggergation } from "../query";

const EditListButton = ({ list }: { list: List }) => {
  const editListFormModal = useModal("EditListForm");
  const editListForm = useEditListForm();
  return (
    <IconButton
      onClick={() => {
        editListForm.setListId(list.id);
        editListForm.setDescription(list.description);
        editListForm.setTitle(list.title);
        editListFormModal.open();
      }}
    >
      <EditIcon />
    </IconButton>
  );
};

const DeleteListButton = (_1: { list: List }) => {
  const deleteListFormModal = useModal("DeleteListForm");

  return (
    <IconButton
      onClick={() => {
        deleteListFormModal.open();
      }}
    >
      <DeleteIcon />
    </IconButton>
  );
};

const PermissionFormButton = () => {
  const permissionFormModal = useModal("PermissionForm");
  return (
    <IconButton
      onClick={() => {
        permissionFormModal.open();
      }}
    >
      <GroupAddOutlinedIcon />
    </IconButton>
  );
};

export default ({
  currentUser,
  list,
}: {
  currentUser: UserAggergation;
  list: ListAggergation;
}) => {
  return (
    <Toolbar>
      <EditListButton list={list.list} />
      <EditListFormModal />

      {currentUser.user.id === list.owner.id && (
        <React.Fragment>
          <DeleteListButton list={list.list} />
          <DeleteListFormModal listId={list.list.id} userId={list.owner.id} />
        </React.Fragment>
      )}

      <PermissionFormButton />
      <PermissionFormModal list={list} />
      <AddPermissionFormModal list={list} />
    </Toolbar>
  );
};
