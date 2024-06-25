import { IBaseEntity } from ".";

export interface IElection extends IBaseEntity {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  category: string;
  portfolios: IElectionPortfolio[];
  candidates: IElectionCandidate[];
}

export interface IElectionCandidate {
  name: string;
  affiliation: string;
  imageId: string;
  imageUrl: string;
  portfolio: string;
  id: string;
}

export interface IElectionCandidateRequest {
  name: string;
  affiliation: string;
  portfolio: string;
  image: string | null;
}

export interface ICategory extends IBaseEntity {
  title: string;
}

export interface IElectionPortfolio {
  id: string;
  title: string;
}
export interface IElectionPortfolioRequest {
  title: string;
}

export const inititialCandidateRequest: IElectionCandidateRequest = {
  portfolio: "",
  affiliation: "",
  name: "",
  image: null,
};

export const initialElectionPortfolioRequest: IElectionPortfolioRequest = {
  title: "",
};

export interface ICategoryRequest {
  title: string;
}

export const initialCategoryRequest: ICategoryRequest = {
  title: "",
};

export interface ICreateElectionRequest {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  category: string;
}

export interface ICategoryDisplayDto {
  id: string;
  title: string;
}

export interface ICategory extends IBaseEntity {
  title: string;
}

export const createElectionInitialRequest: ICreateElectionRequest = {
  title: "",
  description: "",
  startDate: "",
  endDate: "",
  category: "",
};
