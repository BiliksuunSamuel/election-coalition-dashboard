import { IBaseEntity, IBaseFilter } from ".";
import { CandidateDorminance } from "../enums/candidate.dorminance";
import { UserStatus } from "../enums/UserStatus";

export interface ICandidate extends IBaseEntity {
  name: string;
  partyName: string;
  partyId: string;
  partyShortName: string;
  status: UserStatus;
  image: string;
  imageId: string;
  portfolioId: string;
  portfolio: string;
  electionId: string;
  electionTitle: string;
  constituencyId: string;
  constituencyName: string;
  dorminance: CandidateDorminance;
}

export interface ICandidateFilter extends IBaseFilter {
  filter?: string;
  electionId?: string;
  portfolioId?: string;
  constituencyId?: string;
}

export interface ICandidateRequest {
  name: string;
  partyName: string;
  partyId: string;
  partyShortName: string;
  status: UserStatus;
  image: string | null;
  portfolioId: string;
  portfolio: string;
  electionId: string;
  electionTitle: string;
  constituencyId: string;
  constituencyName: string;
  dorminance: CandidateDorminance;
}

export const initialCandidateRequest: ICandidateRequest = {
  name: "",
  partyName: "",
  partyId: "",
  partyShortName: "",
  status: UserStatus.Active,
  image: null,
  portfolioId: "",
  portfolio: "",
  electionId: "",
  electionTitle: "",
  constituencyId: "",
  constituencyName: "",
  dorminance: CandidateDorminance.Constituency,
};

export const candidateFilter: ICandidateFilter = {
  page: 1,
  pageSize: 10,
};
