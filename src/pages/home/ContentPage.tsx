import { Divider, Grid, Stack, useMediaQuery, useTheme } from "@mui/material";
import { FluidContainer, ResponseModal, RowContainer } from "../../views";
import {
  CustomLoader,
  DashboardSummaryLoader,
  PrimaryButton,
} from "../../components";
import PoliticalPartiesModal from "../components/PoliticalPartiesModal";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import useParty from "../../hooks/useParty";
import { clearResponse } from "../../features/ResponseReducer";
import { useEffect } from "react";
import { PartyStatus } from "../../enums/PartyStatus";
import {
  CandidateResultsChartView,
  DasboardSummaryCardView,
  ElectionResultsSummaryStats,
} from "../components";

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
  const isMobile = useMediaQuery(useTheme().breakpoints.down("sm"));
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

      {/* Political parties modal section */}
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
      <Stack spacing={2} padding={2}>
        <RowContainer justifyContent="flex-end">
          <PrimaryButton onClick={() => setShowPoliticalParties(true)}>
            Political Parties
          </PrimaryButton>
        </RowContainer>
        <Divider />
        {loading && (
          <Stack padding={2}>
            <DashboardSummaryLoader />
          </Stack>
        )}
        {!loading && (
          <Stack padding={2}>
            <DasboardSummaryCardView
              data={{
                totalOutstandingPayments: 0,
                totalSales: 0,
                totalProducts: 0,
                productsSoldCount: 0,
              }}
              categories={[]}
              loading={loading}
              loadingProductSoldCount={loading}
              loadingProductsCount={loading}
              loadingOutstandingSales={loading}
              loadingTotalSales={loading}
            />
          </Stack>
        )}
        <Grid container rowSpacing={2} columnSpacing={isMobile ? 0 : 2}>
          <Grid item sm={12} md={12} lg={6} xl={7} xs={12}>
            <CandidateResultsChartView loading={loading} />
          </Grid>
          <Grid item sm={12} md={12} lg={6} xl={5} xs={12}>
            <ElectionResultsSummaryStats loading={loading} />
          </Grid>
        </Grid>
      </Stack>
    </FluidContainer>
  );
}
