import { DialogProps, SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { Icon } from "iconsax-react";
import { IconType } from "react-icons";

export interface ISidebarRoute {
  title: string;
  route?: string;
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> | IconType | Icon;
}

export interface IModalProps extends DialogProps {
  showCloseIcon?: boolean;
  zIndex?: number;
}

export interface IApiResponse<T> {
  message: string;
  data: T;
  code: number;
}

export interface IPagedResults<T> {
  page: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
  results: T[];
}
