import { Badge, IconButton, Stack, StackProps } from "@mui/material";

import { BiBell } from "react-icons/bi";
import { HiOutlineChevronDown } from "react-icons/hi";
import { MouseEvent } from "react";
import resources from "../../resources";
import { BlackShades } from "../../theme/AppColors";
import {
  Title,
  Flex,
  Hidden,
  ProfileAvatar,
  SearchInput,
  SizedBox,
} from "../../components";

interface IProps extends StackProps {
  handleProfileMenu?: (e: MouseEvent<HTMLButtonElement>) => void;
}
export default function Navbar({ handleProfileMenu }: IProps) {
  return (
    <Stack
      padding={(theme) => theme.spacing(2.5, 4)}
      sx={(theme) => ({
        position: "sticky",
        top: 0,
        zIndex: 1001,
        bgcolor: theme.palette.common.white,
      })}
      bgcolor="green"
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={2}
      >
        <Hidden device="sm">
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-start"
            spacing={1}
          >
            <Hidden mediaStart="xs" mediaEnd="lg">
              <Title>Current Page</Title>
              <SizedBox width={25} />
            </Hidden>
          </Stack>
        </Hidden>
        <Hidden device="sm">
          <Stack>
            <SearchInput placeholder="Search.." />
          </Stack>
        </Hidden>

        <Hidden mediaStart="md" mediaEnd="lg">
          <Flex flex={1} />
        </Hidden>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
          spacing={1.5}
        >
          <IconButton size="small">
            <Badge badgeContent={0} color="error">
              <BiBell />
            </Badge>
          </IconButton>
          <ProfileAvatar
            sx={(theme) => ({
              width: theme.spacing(5),
              height: theme.spacing(5),
              overflow: "hidden",
              alignItems: "center",
              justifyContent: "center",
            })}
          >
            <img src={resources.logo} alt="user-profile" className="img" />
          </ProfileAvatar>
          <Hidden mediaStart="xs" mediaEnd="lg">
            <Title fontWeight="400" variant="body1">
              Username
            </Title>
          </Hidden>
          <IconButton onClick={handleProfileMenu} size="small">
            <HiOutlineChevronDown color={BlackShades[500]} />
          </IconButton>
        </Stack>
      </Stack>
    </Stack>
  );
}
