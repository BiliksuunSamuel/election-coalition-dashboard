import { IBaseEntity } from ".";

export default interface IUser extends IBaseEntity {
  name: string;
  phoneNumber: string;
  email: string;
  membershipId: string;
  constituencies: string[];
  address: string;
  profileImage: string;
}
