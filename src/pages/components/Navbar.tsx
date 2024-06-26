import { Badge, IconButton, Stack, StackProps, useTheme } from "@mui/material";

import { BiBell } from "react-icons/bi";
import { HiOutlineChevronDown } from "react-icons/hi";
import { MouseEvent } from "react";
import { BlackShades } from "../../theme/AppColors";
import { Title, Flex, Hidden, ProfileAvatar, SizedBox } from "../../components";
import { CgProfile } from "react-icons/cg";

interface IProps extends StackProps {
  handleProfileMenu?: (e: MouseEvent<HTMLButtonElement>) => void;
}
export default function Navbar({ handleProfileMenu }: IProps) {
  const theme = useTheme();
  return (
    <Stack
      padding={(theme) => theme.spacing(1.5, 4)}
      sx={(theme) => ({
        position: "sticky",
        top: 0,
        zIndex: 1001,
        bgcolor: theme.palette.common.white,
      })}
      bgcolor="green"
      borderBottom={(theme) => `1px solid ${theme.palette.grey[300]}`}
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
            <CgProfile size={30} color={theme.palette.grey[400]} />
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
