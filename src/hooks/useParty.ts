import { useState } from "react";
import {
  IParty,
  IPartyFilter,
  IPartyRequest,
  partyRequest,
} from "../models/PartyModel";
import { IApiResponse, IPagedResults } from "../interfaces";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  clearResponse,
  setError,
  setMessage,
  setPending,
} from "../features/ResponseReducer";
import HttpClient from "../controller";

export default function useParty() {
  const dispatch = useAppDispatch();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { token } = useAppSelector((state) => state.AuthReducer);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [request, setRequest] = useState<IPartyRequest>(partyRequest);
  const [showPoliticalParties, setShowPoliticalParties] = useState(false);
  const [parties, setParties] = useState<IPagedResults<IParty>>({
    page: 1,
    pageSize: 5,
    totalCount: 0,
    totalPages: 0,
    results: [],
  });
  const [selectedParty, setSelectedParty] = useState<IParty | null>(null);
  const [filter, setFilter] = useState<IPartyFilter>({
    page: 1,
    pageSize: 5,
    filter: null,
    status: null,
  });
  //handle filter form
  const handleFilterForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value,
    });
  };
  //handle request form
  const handleRequestForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRequest({
      ...request,
      [e.target.name]: e.target.value,
    });
  };

  //handle delete party
  async function handleDeleteParty() {
    try {
      dispatch(setPending());
      const res = await HttpClient<IApiResponse<IParty>>({
        method: "delete",
        url: `api/parties/${selectedParty?.id}`,
        token,
      });
      dispatch(setMessage(res.message));
      setShowDeleteModal(false);
      setSelectedParty(null);
    } catch (error) {
      dispatch(setError(error));
    }
  }

  //update party
  async function handleUpdateParty() {
    try {
      dispatch(setPending());
      const res = await HttpClient<IApiResponse<IParty>>({
        method: "patch",
        url: `api/parties/${selectedParty?.id}`,
        token,
        data: request,
      });
      dispatch(setMessage(res.message));
      setShowCreateForm(false);
      setRequest(partyRequest);
    } catch (error) {
      dispatch(setError(error));
    }
  }

  //handle get all
  async function handleGetAllParties(
    filter: IPartyFilter = { page: 1, pageSize: 10, filter: null, status: null }
  ) {
    try {
      dispatch(setPending());
      const res = await HttpClient<IApiResponse<IPagedResults<IParty>>>({
        method: "get",
        url: "api/parties",
        token,
        params: filter,
      });
      setParties(res.data);
      dispatch(clearResponse());
    } catch (error) {
      dispatch(setError(error));
    }
  }

  //create party
  async function handleCreateParty() {
    try {
      dispatch(setPending());
      const res = await HttpClient<IApiResponse<IParty>>({
        method: "post",
        url: "api/parties",
        token,
        data: request,
      });
      dispatch(setMessage(res.message));
      setShowCreateForm(false);
      setRequest(partyRequest);
    } catch (error) {
      dispatch(setError(error));
    }
  }

  return {
    showCreateForm,
    setShowCreateForm,
    request,
    setRequest,
    showPoliticalParties,
    setShowPoliticalParties,
    handleRequestForm,
    handleUpdateParty,
    handleGetAllParties,
    handleCreateParty,
    parties,
    selectedParty,
    setSelectedParty,
    filter,
    setFilter,
    handleFilterForm,
    showDeleteModal,
    setShowDeleteModal,
    handleDeleteParty,
  };
}
