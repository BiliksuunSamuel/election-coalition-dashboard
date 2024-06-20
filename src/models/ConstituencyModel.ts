import { IBaseEntity, IBaseFilter } from ".";
import { PollingStationStatus } from "../enums/PollingStationStatus";

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
  status: PollingStationStatus;
}

export interface IConstituencyFilter extends IBaseFilter {
  query?: string;
  region?: string;
}

export interface IPollingStationRequest {
  name: string;
  code: string;
  address: string;
  constituencyId: string;
  status: PollingStationStatus;
}

export interface IConstituencyRequest {
  name: string;
  description: string;
  region: string;
}

export interface IPollingStationFilter extends IBaseFilter {
  query?: string;
  status?: PollingStationStatus;
  code?: string;
  constituencyId: string;
}

//
export const initialPollingStationRequest: IPollingStationRequest = {
  name: "",
  code: "",
  address: "",
  constituencyId: "",
  status: PollingStationStatus.Closed,
};

export const initialConsituencyRequest: IConstituencyRequest = {
  name: "",
  description: "",
  region: "",
};
