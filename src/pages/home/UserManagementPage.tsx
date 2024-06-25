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
import { CustomLoader, PrimaryButton } from "../../components";
import { CreateUserModal } from "../components";
import { useEffect } from "react";
import useConstituency from "../../hooks/useConstituency";
import { UserTableView } from "../../sections";

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
        handleClose={() => setShowCreateModal(false)}
        loading={loading}
        request={createRequest}
        setCreateRequest={setCreateRequest}
        handleSubmit={handleCreateUser}
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
        <Stack padding={2} borderRadius={1} spacing={2} width="100%">
          <UserTableView users={users.results} loading={loading} />

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
