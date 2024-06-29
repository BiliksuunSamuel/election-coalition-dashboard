import { ChangeEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  ICategory,
  ICategoryDisplayDto,
  ICategoryRequest,
  ICreateElectionRequest,
  IElection,
  IElectionPortfolioRequest,
  createElectionInitialRequest,
  initialCategoryRequest,
  initialElectionPortfolioRequest,
} from "../models/ElectionModel";
import {
  clearResponse,
  setError,
  setMessage,
  setPending,
} from "../features/ResponseReducer";
import HttpClient from "../controller";
import { IApiResponse, IPagedResults } from "../interfaces";
import { IConstituency } from "../models/ConstituencyModel";
import { ElectionDetailsTabs } from "../types";

export function useElection() {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.AuthReducer);
  const [createRequest, setCreateRequest] = useState<ICreateElectionRequest>(
    createElectionInitialRequest
  );
  const [showElectionForm, setShowElectionForm] = useState(false);
  const [showDeletElectionModal, setShowDeleteElectionModal] = useState(false);
  const [portfolioRequest, setPortfolioRequest] =
    useState<IElectionPortfolioRequest>(initialElectionPortfolioRequest);
  const [showElectionDetailsModal, setShowElectionDetailsModal] =
    useState(false);
  const [selectedElection, setSelectedElection] = useState<IElection | null>(
    null
  );
  const [electionId, setElectionId] = useState<string | null>(null);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [elections, setElections] = useState<IPagedResults<IElection>>({
    page: 0,
    pageSize: 10,
    totalCount: 0,
    totalPages: 0,
    results: [],
  });
  const [categoriesForDisplay, setGetCategoriesForDisplay] = useState<
    ICategoryDisplayDto[]
  >([]);
  const [showCreateElectionModal, setShowCreateElectionModal] = useState(false);
  const [categoryRequest, setCategoryRequest] = useState<ICategoryRequest>(
    initialCategoryRequest
  );
  const [loadingElectionDetails, setLoadingElectionDetails] = useState(false);
  const [election, setElection] = useState<IElection | null>(null);
  const [constituencies, setConstituencies] = useState<IConstituency[]>([]);
  const [tab, setTab] = useState<ElectionDetailsTabs>("Election Details");

  //handle portfolio request form
  function handlePortfolioRequestForm(e: ChangeEvent<HTMLInputElement>) {
    setPortfolioRequest({
      ...portfolioRequest,
      [e.currentTarget.name]: e.target.value,
    });
  }
  //handle category request form
  function handleCategoryRequestForm(e: ChangeEvent<HTMLInputElement>) {
    setCategoryRequest({
      ...categoryRequest,
      [e.currentTarget.name]: e.target.value,
    });
  }

  // handle get constituencies
  async function getConstituencies() {
    try {
      dispatch(setPending());
      const res = await HttpClient<IApiResponse<IConstituency[]>>({
        method: "get",
        token,
        url: "api/constituencies",
      });
      setConstituencies(res.data);
      dispatch(clearResponse());
    } catch (error) {
      dispatch(setError(error));
    }
  }

  //handle create election portfolio
  async function handleCreateElectionPortfolio() {
    try {
      setLoadingElectionDetails(true);
      const res = await HttpClient<IApiResponse<IElection>>({
        method: "post",
        url: `api/elections/portfolios/${electionId}`,
        token,
        data: portfolioRequest,
      });
      dispatch(setMessage(res.message));
      setLoadingElectionDetails(false);
      setElection(res.data);
      setPortfolioRequest(initialElectionPortfolioRequest);
    } catch (error) {
      dispatch(setError(error));
      setLoadingElectionDetails(false);
    }
  }

  //handle create category
  async function createCategory() {
    try {
      dispatch(setPending());
      const res = await HttpClient<IApiResponse<ICategory>>({
        method: "post",
        url: "api/categories",
        token,
        data: categoryRequest,
      });
      setShowAddCategoryModal(false);
      dispatch(setMessage(res.message));
      setCategoryRequest(initialCategoryRequest);
    } catch (error) {
      dispatch(setError(error));
    }
  }

  //handle delet election
  async function handleDeleteElection() {
    try {
      dispatch(setPending());
      const res = await HttpClient<IApiResponse<IElection>>({
        method: "delete",
        url: `api/elections/${selectedElection?.id}`,
        token,
      });
      await getElections();
      dispatch(setMessage(res.message));
      setSelectedElection(null);
      setShowDeleteElectionModal(false);
    } catch (error) {
      dispatch(setError(error));
    }
  }

  //handle get elections
  async function getElections(params: any = null) {
    try {
      dispatch(setPending());
      const res = await HttpClient<IApiResponse<IPagedResults<IElection>>>({
        method: "get",
        url: "api/elections",
        params,
        token,
      });
      dispatch(clearResponse());
      setElections(res.data);
    } catch (error) {
      dispatch(setError(error));
    }
  }
  //handle get elections categories for display
  async function getCategoriesForDisplay() {
    try {
      dispatch(setPending());
      const res = await HttpClient<IApiResponse<ICategoryDisplayDto[]>>({
        method: "get",
        url: "api/categories",
        token,
      });
      dispatch(clearResponse());
      setGetCategoriesForDisplay(res.data);
    } catch (error) {
      dispatch(setError(error));
    }
  }

  //handle create election form
  function handleElectionForm(e: ChangeEvent<HTMLInputElement>) {
    setCreateRequest({
      ...createRequest,
      [e.currentTarget.name]: e.target.value,
    });
  }

  //handle update election
  async function updateElection() {
    try {
      console.log(selectedElection);
      dispatch(setPending());
      const res = await HttpClient<IApiResponse<IElection>>({
        method: "patch",
        url: `api/elections/${selectedElection?.id}`,
        token,
        data: createRequest,
      });
      dispatch(setMessage(res.message));
      setShowCreateElectionModal(false);
      setCreateRequest({ ...res.data });
      setSelectedElection(res.data);
    } catch (error) {
      dispatch(setError(error));
      setLoadingElectionDetails(false);
    }
  }

  //handle create election
  async function createElection() {
    try {
      setLoadingElectionDetails(true);
      const res = await HttpClient<IApiResponse<IElection>>({
        method: "post",
        url: "api/elections",
        token,
        data: createRequest,
      });
      dispatch(setMessage(res.message));
      setShowCreateElectionModal(false);
      setCreateRequest(createElectionInitialRequest);
    } catch (error) {
      dispatch(setError(error));
      setLoadingElectionDetails(false);
    }
  }

  //handle get election details
  async function getElection() {
    try {
      setLoadingElectionDetails(true);
      const res = await HttpClient<IApiResponse<IElection>>({
        method: "get",
        url: `api/elections/${electionId}`,
        token,
      });
      setElection(res.data);
      setLoadingElectionDetails(false);
    } catch (error) {
      dispatch(setError(error));
    }
  }

  return {
    showCreateElectionModal,
    setShowCreateElectionModal,
    createRequest,
    setCreateRequest,
    handleElectionForm,
    createElection,
    getCategoriesForDisplay,
    categoriesForDisplay,
    getElections,
    elections,
    createCategory,
    categoryRequest,
    handleCategoryRequestForm,
    showAddCategoryModal,
    setShowAddCategoryModal,
    showElectionDetailsModal,
    setShowElectionDetailsModal,
    election,
    loadingElectionDetails,
    getElection,
    setElectionId,
    electionId,
    portfolioRequest,
    handlePortfolioRequestForm,
    handleCreateElectionPortfolio,
    constituencies,
    getConstituencies,
    showDeletElectionModal,
    setShowDeleteElectionModal,
    selectedElection,
    setSelectedElection,
    handleDeleteElection,
    tab,
    setTab,
    showElectionForm,
    setShowElectionForm,
    updateElection,
  };
}
