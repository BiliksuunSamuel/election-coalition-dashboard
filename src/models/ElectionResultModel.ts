import { IBaseEntity, IBaseFilter } from ".";
import { ElectionResultsStatus } from "../enums/ElectionResultsStatus";

export interface IElectionPortfolioCandidateResults {
  candidateId: string;
  votes: number;
  partyShortName: string;
}

export interface IElectionResultsSummaryData {
  totalVotes: number;
  validVotes: number;
  rejectedVotes: number;
}

export interface IManageResultsRequest {
  status: ElectionResultsStatus;
}

export interface IElectionResult extends IBaseEntity {
  portfolioId: string;
  recordedBy: string;
  pollingStation: string;
  totalVotes: number;
  validVotes: number;
  rejectedVotes: number;
  candidatesResults: IElectionPortfolioCandidateResults[];
  status: ElectionResultsStatus;
  verifiedBy: string;
  electionId: string;
  pinkSheets: string[];
  pollingStationId: string;
  pollingStationCode: string;
  constituencyId: string;
  userId: string;
  constituency: string;
}

export interface IElectionResultsFilter extends IBaseFilter {
  electionId?: string;
  pollingStation?: string;
  recordedBy?: string;
  portfolioId?: string;
  status?: ElectionResultsStatus;
}

export const initialElectionResultsFilter: IElectionResultsFilter = {
  page: 1,
  pageSize: 10,
  status: ElectionResultsStatus.Pending,
};
