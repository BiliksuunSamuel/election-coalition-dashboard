import { IBaseEntity } from ".";

export interface IConstituency extends IBaseEntity {
  name: string;
  description: string;
  region: string;
  totalPollingStations: number;
}

export interface IPollingStation extends IBaseEntity {
  name: string;
  code: string;
  address: string;
  constituencyId: string;
}

export interface IPollingStationRequest {
  name: string;
  code: string;
  address: string;
  constituencyId: string;
}

export interface IConstituencyRequest {
  name: string;
  description: string;
  region: string;
}

//
export const initialPollingStationRequest: IPollingStationRequest = {
  name: "",
  code: "",
  address: "",
  constituencyId: "",
};

export const initialConsituencyRequest: IConstituencyRequest = {
  name: "",
  description: "",
  region: "",
};
