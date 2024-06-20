import { useState } from "react";
import {
  IConstituency,
  IConstituencyFilter,
  IConstituencyRequest,
  IPollingStation,
  IPollingStationFilter,
  IPollingStationRequest,
  initialConsituencyRequest,
  initialPollingStationRequest,
} from "../models/ConstituencyModel";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  clearResponse,
  setError,
  setMessage,
  setPending,
} from "../features/ResponseReducer";
import HttpClient from "../controller";
import { IApiResponse, IPagedResults } from "../interfaces";

export default function useConstituency() {
  const dispatch = useAppDispatch();
  const [confirmDeletePollingStation, setConfirmDeletePollingStation] =
    useState(false);
  const [confirmDeleteConstituency, setConfirmDeleteConstituency] =
    useState(false);
  const [tab, setTab] = useState<string>("Constituency Details");
  const { token } = useAppSelector((state) => state.AuthReducer);
  const [showPollingStationForm, setShowPollingStationForm] = useState(false);
  const [showConstituencyForm, setShowConstituencyForm] = useState(false);
  const [constituencyRequest, setConstituencyRequest] =
    useState<IConstituencyRequest>(initialConsituencyRequest);
  const [constituency, setConstituency] = useState<IConstituency | null>(null);
  const [selectedConstituency, setSelectedConstituency] =
    useState<IConstituency | null>(null);
  const [pollingStationRequest, setPollingStationRequest] =
    useState<IPollingStationRequest>(initialPollingStationRequest);
  const [pollingStations, setPollingStations] = useState<
    IPagedResults<IPollingStation>
  >({
    page: 1,
    totalCount: 0,
    totalPages: 0,
    results: [],
    pageSize: 5,
  });
  const [selectedPollingStation, setSelectedPollingStation] =
    useState<IPollingStation | null>(null);
  const [constituencies, setConstituencies] = useState<
    IPagedResults<IConstituency>
  >({
    page: 1,
    pageSize: 10,
    totalCount: 0,
    totalPages: 0,
    results: [],
  });

  //handle polling station form
  function handlePollingStationFormChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setPollingStationRequest((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  //get polling stations
  async function getPollingStations(params: IPollingStationFilter) {
    try {
      if (!params.constituencyId) return;
      dispatch(setPending());
      const res = await HttpClient<
        IApiResponse<IPagedResults<IPollingStation>>
      >({
        method: "get",
        url: "api/polling-stations",
        token,
        params,
      });
      setPollingStations(res.data);
      dispatch(clearResponse());
    } catch (error) {
      dispatch(setError(error));
    }
  }

  //handle create polling station
  async function handleCreatePollingStation() {
    try {
      dispatch(setPending());
      const res = await HttpClient<IApiResponse<IPollingStationRequest>>({
        method: "post",
        url: "api/polling-stations",
        token,
        data: {
          ...pollingStationRequest,
          constituencyId: selectedConstituency?.id,
        },
      });
      await getPollingStations({
        page: 1,
        pageSize: 5,
        constituencyId: selectedConstituency?.id!,
      });
      dispatch(setMessage(res.message));
      setPollingStationRequest(initialPollingStationRequest);
      setShowPollingStationForm(false);
    } catch (error) {
      dispatch(setError(error));
    }
  }

  //handle get constituencies
  async function getConstituencies(
    params: IConstituencyFilter = { page: 1, pageSize: 10 }
  ) {
    try {
      dispatch(setPending());
      const res = await HttpClient<IApiResponse<IPagedResults<IConstituency>>>({
        method: "get",
        url: "api/constituencies",
        token,
        params,
      });
      setConstituencies(res.data);
      dispatch(clearResponse());
    } catch (error) {
      dispatch(setError(error));
    }
  }

  //handle constituency form
  function handleConstituencyFormChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setConstituencyRequest((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  //handle delete constituency
  async function handleDeleteConstituency() {
    try {
      dispatch(setPending());
      const res = await HttpClient<IApiResponse<IConstituency>>({
        method: "delete",
        url: `api/constituencies/${selectedConstituency?.id}`,
        token,
      });
      await getConstituencies();
      setConfirmDeleteConstituency(false);
      setSelectedConstituency(null);
      setShowConstituencyForm(false);
      dispatch(setMessage(res.message));
    } catch (error) {
      dispatch(setError(error));
    }
  }

  //handle get constituency
  async function getConstituency(id: string) {
    try {
      dispatch(setPending());
      const res = await HttpClient<IApiResponse<IConstituency>>({
        method: "get",
        url: `api/constituencies/${id}`,
        token,
      });
      setConstituency(res.data);
      dispatch(clearResponse());
    } catch (error) {
      dispatch(setError(error));
    }
  }

  //handle create constituency
  async function handleCreateConstituency() {
    try {
      dispatch(setPending());
      const res = await HttpClient<IApiResponse<IConstituency>>({
        method: selectedConstituency ? "patch" : "post",
        url: selectedConstituency
          ? `api/constituencies/${selectedConstituency?.id}`
          : "api/constituencies",
        token,
        data: constituencyRequest,
      });
      dispatch(setMessage(res.message));
      const { name, description, region } = res.data;
      setConstituencyRequest({ name, description, region });
      setSelectedConstituency(res.data);
    } catch (error) {
      dispatch(setError(error));
    }
  }

  //handle delete polling station
  async function handleDeletePollingStation() {
    try {
      dispatch(setPending());
      const res = await HttpClient<IApiResponse<IPollingStation>>({
        method: "delete",
        url: `api/polling-stations/${selectedPollingStation?.id}/${selectedConstituency?.id}`,
        token,
      });
      await getPollingStations({
        page: 1,
        pageSize: 5,
        constituencyId: selectedConstituency?.id!,
      });
      setConfirmDeletePollingStation(false);
      setSelectedPollingStation(null);
      dispatch(setMessage(res.message));
    } catch (error) {
      dispatch(setError(error));
    }
  }

  // handle update polling station
  async function handleUpdatePollingStation() {
    try {
      dispatch(setPending());
      const res = await HttpClient<IApiResponse<IPollingStation>>({
        method: "patch",
        url: `api/polling-stations/${selectedPollingStation?.id}`,
        token,
        data: pollingStationRequest,
      });
      await getPollingStations({
        page: 1,
        pageSize: 5,
        constituencyId: selectedConstituency?.id!,
      });
      dispatch(setMessage(res.message));
      setSelectedPollingStation(null);
      setShowPollingStationForm(false);
    } catch (error) {
      dispatch(setError(error));
    }
  }

  return {
    showPollingStationForm,
    setShowPollingStationForm,
    showConstituencyForm,
    setShowConstituencyForm,
    constituencyRequest,
    setConstituencyRequest,
    handleConstituencyFormChange,
    handleCreateConstituency,
    constituencies,
    getConstituencies,
    setConstituency,
    constituency,
    selectedConstituency,
    setSelectedConstituency,
    getConstituency,
    pollingStations,
    setPollingStations,
    getPollingStations,
    handleCreatePollingStation,
    handlePollingStationFormChange,
    tab,
    setTab,
    pollingStationRequest,
    setSelectedPollingStation,
    selectedPollingStation,
    handleDeletePollingStation,
    handleUpdatePollingStation,
    setPollingStationRequest,
    confirmDeletePollingStation,
    setConfirmDeletePollingStation,
    handleDeleteConstituency,
    confirmDeleteConstituency,
    setConfirmDeleteConstituency,
  };
}
