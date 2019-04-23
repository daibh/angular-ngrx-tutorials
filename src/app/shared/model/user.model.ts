import { Moment } from 'moment';

export interface IUser {
  Id?: string;
  UserName?: string;
  Password?: string;
  FullName?: string;
  Email?: string;
  PhoneNumber?: string;
  CreateBy?: string;
  CreaateDate?: Moment;
  UpdateBy?: string;
  UpdateDate?: Moment;
  IsDelete?: boolean;
  TblOrganizationUser?: any[];
  TblRoleUsers?: any[];
  TblUsersToken?: any[];
}

export class User implements IUser {
  constructor(
    public Id?: string,
    public UserName?: string,
    public Password?: string,
    public FullName?: string,
    public Email?: string,
    public PhoneNumber?: string,
    public CreateBy?: string,
    public CreaateDate?: Moment,
    public UpdateBy?: string,
    public UpdateDate?: Moment,
    public IsDelete?: boolean,
    public TblOrganizationUser?: any[],
    public TblRoleUsers?: any[],
    public TblUsersToken?: any[]
  ) {}
}
