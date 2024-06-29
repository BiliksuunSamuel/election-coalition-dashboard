import { IBaseEntity, IBaseFilter } from ".";
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
};

export const candidateFilter: ICandidateFilter = {
  page: 1,
  pageSize: 10,
};
