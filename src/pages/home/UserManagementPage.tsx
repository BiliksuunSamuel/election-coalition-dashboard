import { Stack } from "@mui/material";
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
import {
  CustomLoader,
  Flex,
  PrimaryButton,
  SearchInput,
} from "../../components";
import { CreateUserModal } from "../components";
import { useEffect } from "react";
import useConstituency from "../../hooks/useConstituency";
import { UserTableView } from "../../sections";
import { initialCreateUserRequest } from "../../models/UserModel";

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
    selectedUser,
    setSelectedUser,
    handleUpdateUser,
  } = useUser();
  const dispatch = useAppDispatch();
  const { loading, error, message } = useAppSelector(
    (state) => state.ResponseReducer
  );
  const {
    constituencies,
    getConstituencies,
    getPollingStations,
    pollingStations,
  } = useConstituency();

  async function loadData() {
    await Promise.all([getAllUsers(), getConstituencies({ pageSize: 50 })]);
  }

  useEffect(() => {
    if (selectedUser) {
      setCreateRequest({
        name: selectedUser.name,
        email: selectedUser.email,
        phoneNumber: selectedUser.phoneNumber,
        pollingStationId: selectedUser.pollingStationId,
        constituencyId: selectedUser.constituencyId,
        role: selectedUser.role,
        status: selectedUser.status,
        constituency: selectedUser.constituency,
        pollingStation: selectedUser.pollingStation,
        pollingStationCode: selectedUser.pollingStationCode,
        address: selectedUser.address,
        membershipId: selectedUser.membershipId,
      });
    } else {
      setCreateRequest(initialCreateUserRequest);
    }
  }, [selectedUser]);

  useEffect(() => {
    if (createRequest.constituencyId) {
      getPollingStations({
        constituencyId: createRequest.constituencyId,
        pageSize: 100,
      });
    }
  }, [createRequest.constituency]);

  useEffect(() => {
    loadData();
  }, []);
  return (
    <FluidContainer>
      <CustomLoader open={loading} />
      <CreateUserModal
        open={showCreateModal}
        handleForm={handleCreateUserForm}
        handleClose={() => {
          setShowCreateModal(false);
          setSelectedUser(null);
        }}
        loading={loading}
        request={createRequest}
        setCreateRequest={setCreateRequest}
        handleSubmit={() =>
          selectedUser ? handleUpdateUser() : handleCreateUser()
        }
        constituencies={constituencies.results}
        pollingStations={pollingStations.results}
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
      <ContentContainer height="100%" spacing={1} bgcolor="transparent">
        <RowContainer
          spacing={2}
          padding={0}
          width="100%"
          justifyContent="flex-end"
        >
          <SearchInput placeholder="Search Elections....." />
          <Flex />
          <PrimaryButton onClick={() => setShowCreateModal(true)}>
            Add New User
          </PrimaryButton>
        </RowContainer>
        <Stack padding={2} borderRadius={1} spacing={2} width="100%">
          <UserTableView
            handleViewDetails={(data) => {
              setSelectedUser(data);
              setShowCreateModal(true);
            }}
            users={users.results}
            loading={loading}
            handleDeleteUser={(data) => setSelectedUser(data)}
          />

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
