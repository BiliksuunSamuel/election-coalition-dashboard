import {
  IconButton,
  LinearProgress,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  alpha,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { clearResponse } from "../../features/ResponseReducer";
import useUser from "../../hooks/useUser";
import {
  ContentContainer,
  CustomPaginationView,
  FluidContainer,
  ResponseModal,
  RowContainer,
} from "../../views";
import { PrimaryButton } from "../../components";
import { IoIosMore } from "react-icons/io";
import { CreateUserModal } from "../components";
import { useEffect } from "react";
import useConstituency from "../../hooks/useConstituency";

export default function UserManagementPage() {
  const {
    getAllUsers,
    users,
    showCreateModal,
    setShowCreateModal,
    createRequest,
    setCreateRequest,
    handleCreateUser,
    handleCreateUserForm,
  } = useUser();
  const dispatch = useAppDispatch();
  const { loading, error, message } = useAppSelector(
    (state) => state.ResponseReducer
  );
  const { constituencies, getConstituencies } = useConstituency();

  async function loadData() {
    await Promise.all([getAllUsers(), getConstituencies()]);
  }

  useEffect(() => {
    loadData();
  }, []);
  return (
    <FluidContainer>
      <CreateUserModal
        open={showCreateModal}
        handleForm={handleCreateUserForm}
        handleClose={() => setShowCreateModal(false)}
        loading={loading}
        request={createRequest}
        setCreateRequest={setCreateRequest}
        handleSubmit={handleCreateUser}
        constituencies={constituencies.results}
      />
      <ResponseModal
        variant="success"
        open={Boolean(message)}
        message={message}
        title="Success"
        handleDone={() => {
          dispatch(clearResponse());
          loadData();
        }}
      />
      <ResponseModal
        variant="error"
        open={Boolean(error)}
        message={error}
        title="Error"
        handleDone={() => dispatch(clearResponse())}
      />
      <ContentContainer
        height="100%"
        spacing={3}
        padding={4}
        bgcolor="transparent"
      >
        <RowContainer
          spacing={2}
          padding={0}
          width="100%"
          justifyContent="flex-end"
        >
          <PrimaryButton onClick={() => setShowCreateModal(true)}>
            Add New User
          </PrimaryButton>
        </RowContainer>
        <Stack
          component={Paper}
          padding={2}
          borderRadius={1}
          elevation={1}
          spacing={2}
          width="100%"
        >
          <TableContainer component={Stack}>
            {loading && (
              <Stack marginTop={1} width="100%">
                <LinearProgress variant="indeterminate" />
              </Stack>
            )}
            <Table width="100%" size="medium">
              <TableHead>
                <TableRow
                  sx={(theme) => ({
                    bgcolor: alpha(theme.palette.primary.main, 0.085),
                  })}
                >
                  <TableCell size="small" align="left">
                    Name
                  </TableCell>
                  <TableCell size="small" align="left">
                    Phone Number
                  </TableCell>
                  <TableCell size="small" align="left">
                    Email
                  </TableCell>
                  <TableCell size="small" align="left">
                    Membership ID
                  </TableCell>
                  <TableCell size="small" align="left">
                    Constituencies
                  </TableCell>
                  <TableCell size="small" align="center">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.results.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell size="small" align="left">
                      {c.name}
                    </TableCell>
                    <TableCell size="small" align="left">
                      {c.phoneNumber}
                    </TableCell>
                    <TableCell size="small" align="left">
                      {c.email}
                    </TableCell>
                    <TableCell size="small" align="left">
                      {c.membershipId}
                    </TableCell>
                    <TableCell size="small" align="left">
                      {c.constituencies.join(",")}
                    </TableCell>
                    <TableCell size="small" align="center">
                      <IconButton size="small">
                        <IoIosMore />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <CustomPaginationView
            page={users.page}
            totalCount={users.totalCount}
            totalPages={users.totalPages}
            pageSize={users.pageSize}
            handlePage={() => getAllUsers()}
          />
        </Stack>
      </ContentContainer>
    </FluidContainer>
  );
}
