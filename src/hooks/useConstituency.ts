import { useState } from "react";
import {
  IConstituency,
  IConstituencyRequest,
  IPollingStation,
  IPollingStationRequest,
  initialConsituencyRequest,
  initialPollingStationRequest,
} from "../models/ConstituencyModal";
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
  const [pollingStations, setPollingStations] = useState<IPollingStation[]>([]);
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
  async function getPollingStations(constituencyId: string) {
    try {
      dispatch(setPending());
      const res = await HttpClient<IApiResponse<IPollingStation[]>>({
        method: "get",
        url: `api/polling-stations/constituency/${constituencyId}`,
        token,
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
      await getPollingStations(selectedConstituency?.id!);
      dispatch(setMessage(res.message));
      setPollingStationRequest(initialPollingStationRequest);
    } catch (error) {
      dispatch(setError(error));
    }
  }

  //handle get constituencies
  async function getConstituencies() {
    try {
      dispatch(setPending());
      const res = await HttpClient<IApiResponse<IPagedResults<IConstituency>>>({
        method: "get",
        url: "api/constituencies",
        token,
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
        method: "post",
        url: "api/constituencies",
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
  };
}
