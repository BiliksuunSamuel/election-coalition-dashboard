import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { IApiResponse, IPagedResults } from "../interfaces";
import {
  IElectionResult,
  IElectionResultsFilter,
  IManageResultsRequest,
  initialElectionResultsFilter,
} from "../models/ElectionResultModel";
import {
  clearResponse,
  setError,
  setMessage,
  setPending,
} from "../features/ResponseReducer";
import HttpClient from "../controller";

export default function useElectionResult() {
  const dispatch = useAppDispatch();
  const [manage, setManage] = useState(false);
  const [selectedResults, setSelectedResults] =
    useState<IElectionResult | null>(null);
  const [filter, setFilter] = useState<IElectionResultsFilter>(
    initialElectionResultsFilter
  );
  const { token } = useAppSelector((state) => state.AuthReducer);
  const [results, setResults] = useState<IPagedResults<IElectionResult>>({
    page: 1,
    pageSize: 10,
    totalCount: 0,
    results: [],
    totalPages: 0,
  });

  async function handleManageResults(request: IManageResultsRequest) {
    try {
      dispatch(setPending());
      const res = await HttpClient<IApiResponse<IElectionResult>>({
        method: "patch",
        url: `api/election-results/manage/${selectedResults?.id}`,
        token,
        data: request,
      });
      dispatch(setMessage(res.message));
      setSelectedResults(null);
      setManage(false);
    } catch (error) {
      dispatch(setError(error));
    }
  }

  async function handleGetAllElectionResults(
    params: IElectionResultsFilter = initialElectionResultsFilter
  ) {
    try {
      dispatch(setPending());
      const res = await HttpClient<
        IApiResponse<IPagedResults<IElectionResult>>
      >({
        method: "get",
        url: `api/election-results`,
        token,
        params,
      });
      dispatch(clearResponse());
      setResults(res.data);
    } catch (error) {
      dispatch(setError(error));
    }
  }

  return {
    results,
    filter,
    setFilter,
    handleGetAllElectionResults,
    selectedResults,
    manage,
    setManage,
    setSelectedResults,
    handleManageResults,
  };
}
