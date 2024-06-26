import { ChangeEvent, useState } from "react";
import { IApiResponse, IPagedResults } from "../interfaces";
import IUser, { initialCreateUserRequest } from "../models/UserModel";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  clearResponse,
  setError,
  setMessage,
  setPending,
} from "../features/ResponseReducer";
import HttpClient from "../controller";
import { handleLogout, setUserInfo } from "../features/AuthReducer";

export default function useUser() {
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const { token } = useAppSelector((state) => state.AuthReducer);
  const dispatch = useAppDispatch();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [users, setUsers] = useState<IPagedResults<IUser>>({
    page: 0,
    pageSize: 0,
    totalCount: 0,
    totalPages: 0,
    results: [],
  });

  const [createRequest, setCreateRequest] = useState(initialCreateUserRequest);

  //handle create user request form
  function handleCreateUserForm(e: ChangeEvent<HTMLInputElement>) {
    setCreateRequest({
      ...createRequest,
      [e.currentTarget.name]: e.target.value,
    });
  }

  async function getProfile() {
    try {
      dispatch(setPending());
      const res = await HttpClient<IApiResponse<IUser>>({
        method: "get",
        url: "api/users/profile",
        token,
      });
      dispatch(setUserInfo(res.data));
      dispatch(clearResponse());
    } catch (_) {
      dispatch(clearResponse());
      dispatch(handleLogout());
    }
  }

  //handle user update
  async function handleUpdateUser() {
    try {
      dispatch(setPending());
      const res = await HttpClient<IApiResponse<IUser>>({
        method: "patch",
        url: `api/users/${selectedUser?.id}`,
        token,
        data: createRequest,
      });
      dispatch(setMessage(res.message));
      setSelectedUser(null);
      setShowCreateModal(false);
    } catch (error) {
      dispatch(setError(error));
    }
  }

  //handle create user
  async function handleCreateUser() {
    try {
      dispatch(setPending());
      const res = await HttpClient<IApiResponse<IUser>>({
        method: "post",
        url: "api/users",
        token,
        data: createRequest,
      });
      setShowCreateModal(false);
      dispatch(setMessage(res.message));
      setCreateRequest(initialCreateUserRequest);
    } catch (error) {
      dispatch(setError(error));
    }
  }
  //handle get all users
  async function getAllUsers() {
    try {
      dispatch(setPending());
      const res = await HttpClient<IApiResponse<IPagedResults<IUser>>>({
        method: "get",
        url: "api/users",
        token,
      });
      setUsers(res.data);
      dispatch(clearResponse());
    } catch (error) {
      dispatch(setError(error));
    }
  }

  return {
    users,
    getAllUsers,
    createRequest,
    setCreateRequest,
    handleCreateUserForm,
    handleCreateUser,
    setShowCreateModal,
    showCreateModal,
    handleUpdateUser,
    selectedUser,
    setSelectedUser,
    getProfile,
  };
}
