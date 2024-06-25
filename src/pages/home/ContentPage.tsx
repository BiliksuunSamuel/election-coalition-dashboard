import { Divider, Stack } from "@mui/material";
import { FluidContainer, ResponseModal, RowContainer } from "../../views";
import { CustomLoader, PrimaryButton } from "../../components";
import PoliticalPartiesModal from "../components/PoliticalPartiesModal";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import useParty from "../../hooks/useParty";
import { clearResponse } from "../../features/ResponseReducer";
import { useEffect } from "react";
import { PartyStatus } from "../../enums/PartyStatus";

export default function ContentPage() {
  const dispatch = useAppDispatch();
  const {
    setShowPoliticalParties,
    showPoliticalParties,
    showCreateForm,
    setShowCreateForm,
    request,
    handleRequestForm,
    parties,
    handleGetAllParties,
    filter,
    handleFilterForm,
    handleCreateParty,
    handleUpdateParty,
    selectedParty,
    setRequest,
    setSelectedParty,
    showDeleteModal,
    setShowDeleteModal,
    handleDeleteParty,
  } = useParty();
  const { loading, error, message } = useAppSelector(
    (state) => state.ResponseReducer
  );

  async function loadData() {
    await Promise.all([handleGetAllParties()]);
  }

  useEffect(() => {
    if (selectedParty) {
      setRequest({
        name: selectedParty.name,
        shortName: selectedParty.shortName,
        status: selectedParty.status,
      });
    } else {
      setRequest({ name: "", shortName: "", status: PartyStatus.Active });
    }
  }, [selectedParty]);

  useEffect(() => {
    loadData();
  }, []);
  return (
    <FluidContainer>
      <CustomLoader open={loading} />
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
      <PoliticalPartiesModal
        open={showPoliticalParties}
        handleClose={() => setShowPoliticalParties(false)}
        loading={loading}
        showcreatePartyForm={showCreateForm}
        setshowcreatePartyForm={setShowCreateForm}
        request={request}
        handleRequestForm={handleRequestForm}
        handleSubmitForm={() =>
          selectedParty ? handleUpdateParty() : handleCreateParty()
        }
        parties={parties}
        setSelectedParty={setSelectedParty}
        selectedParty={selectedParty}
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        handleDelete={handleDeleteParty}
        filter={filter}
        handleFilterForm={handleFilterForm}
        handleSearch={(filter) => handleGetAllParties(filter)}
      />
      <Stack spacing={2}>
        <RowContainer justifyContent="flex-end">
          <PrimaryButton onClick={() => setShowPoliticalParties(true)}>
            Political Parties
          </PrimaryButton>
        </RowContainer>
        <Divider />
      </Stack>
    </FluidContainer>
  );
}
