import { useState } from "react";
import {
  ICandidate,
  ICandidateFilter,
  ICandidateRequest,
  candidateFilter,
  initialCandidateRequest,
} from "../models/CandidateModel";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  clearResponse,
  setError,
  setMessage,
  setPending,
} from "../features/ResponseReducer";
import HttpClient from "../controller";
import { IApiResponse, IPagedResults } from "../interfaces";
import { UserStatus } from "../enums/UserStatus";

export default function useCandidate() {
  const dispatch = useAppDispatch();
  const [candidates, setCandidates] = useState<IPagedResults<ICandidate>>({
    results: [],
    page: 1,
    pageSize: 10,
    totalCount: 0,
    totalPages: 0,
  });

  const { token } = useAppSelector((state) => state.AuthReducer);
  const [candidateRequest, setCandidateRequest] = useState<ICandidateRequest>(
    initialCandidateRequest
  );
  const [selectedCandidate, setSelectedCandidate] = useState<ICandidate | null>(
    null
  );
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [filter, setFilter] = useState<ICandidateFilter>(candidateFilter);
  const [showCandidateForm, setShowCandidateForm] = useState(false);
  const [candidateFile, setCandidateFile] = useState<File | null>(null);
  //handle candidate details form
  function handleCandidateFormChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCandidateRequest({
      ...candidateRequest,
      [e.currentTarget.name]: e.target.value,
    });
  }

  //handle create candidate
  async function handleCreateCandidate() {
    try {
      dispatch(setPending());
      const res = await HttpClient<IApiResponse<ICandidate>>({
        method: "post",
        token,
        url: "api/candidates",
        data: candidateRequest,
      });
      setCandidateRequest(initialCandidateRequest);
      setShowCandidateForm(false);
      dispatch(setMessage(res.message));
    } catch (error) {
      dispatch(setError(error));
    }
  }

  //handle get candidates
  async function filterCandidates(params: ICandidateFilter = candidateFilter) {
    try {
      dispatch(setPending());
      const res = await HttpClient<IApiResponse<IPagedResults<ICandidate>>>({
        method: "get",
        url: "api/candidates",
        token,
        params,
      });
      setCandidates(res.data);
      dispatch(clearResponse());
    } catch (error) {
      dispatch(setError(error));
    }
  }

  //update election status
  async function updateCandidateStatus(id: string, status: UserStatus) {
    try {
      dispatch(setPending());
      const res = await HttpClient<IApiResponse<ICandidate>>({
        method: "patch",
        url: `api/candidates/${id}/status`,
        token,
        data: { status },
      });
      dispatch(setMessage(res.message));
    } catch (error) {
      dispatch(setError(error));
    }
  }

  //handle delete candidate
  async function handleDeleteCandidate() {
    try {
      dispatch(setPending());
      const res = await HttpClient<IApiResponse<ICandidate>>({
        method: "delete",
        url: `api/candidates/${selectedCandidate?.id}`,
        token,
      });
      setShowDeleteModal(false);
      dispatch(setMessage(res.message));
      setSelectedCandidate(null);
    } catch (error) {
      dispatch(setError(error));
    }
  }

  // handle update candidate
  async function handleUpdateCandidate() {
    try {
      dispatch(setPending());
      const res = await HttpClient<IApiResponse<ICandidate>>({
        method: "patch",
        url: `api/candidates/${selectedCandidate?.id}`,
        token,
        data: candidateRequest,
      });
      dispatch(setMessage(res.message));
      setSelectedCandidate(null);
      setShowCandidateForm(false);
    } catch (error) {
      dispatch(setError(error));
    }
  }

  return {
    filter,
    setFilter,
    handleCandidateFormChange,
    handleCreateCandidate,
    showCandidateForm,
    candidates,
    setCandidates,
    candidateFile,
    setCandidateFile,
    filterCandidates,
    setShowCandidateForm,
    candidateRequest,
    setCandidateRequest,
    setSelectedCandidate,
    selectedCandidate,
    showDeleteModal,
    setShowDeleteModal,
    handleUpdateCandidate,
    handleDeleteCandidate,
    updateCandidateStatus,
  };
}
