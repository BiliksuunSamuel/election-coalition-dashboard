import { IBaseEntity, IBaseFilter } from ".";
import { PartyStatus } from "../enums/PartyStatus";

export interface IParty extends IBaseEntity {
  name: string;
  shortName: string;
  logoUrl: string;
  status: PartyStatus;
}

export interface IPartyLookup {
  id: string;
  name: string;
  shortName: string;
  logoUrl: string;
  status: PartyStatus;
}

export interface IPartyFilter extends IBaseFilter {
  filter: string | null;
  status: PartyStatus | null;
}

export interface IPartyRequest {
  name: string;
  shortName: string;
  status: PartyStatus;
}

export const partyRequest: IPartyRequest = {
  name: "",
  shortName: "",
  status: PartyStatus.Active,
};
