import { Stack, Typography, useTheme } from "@mui/material";
import {
  CustomCloseButton,
  CustomDialog,
  PrimaryButton,
  SearchInput,
} from "../../components";
import { IModalProps, IPagedResults } from "../../interfaces";
import {
  ActionConfirmationModal,
  CreatePartyModal,
  CustomPaginationView,
  RowContainer,
} from "../../views";
import { IParty, IPartyFilter, IPartyRequest } from "../../models/PartyModel";
import { PartyTableView } from "../../sections";

interface IProps extends IModalProps {
  handleClose: () => void;
  loading: boolean;
  request: IPartyRequest;
  handleRequestForm: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCloseForm?: () => void;
  handleSubmitForm?: () => void;
  showcreatePartyForm: boolean;
  setshowcreatePartyForm: React.Dispatch<React.SetStateAction<boolean>>;
  parties: IPagedResults<IParty>;
  setSelectedParty: React.Dispatch<React.SetStateAction<IParty | null>>;
  selectedParty: IParty | null;
  showDeleteModal: boolean;
  setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleDelete: () => void;
  filter: IPartyFilter;
  handleFilterForm: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearch: (filter: IPartyFilter) => void;
}
export default function PoliticalPartiesModal({
  handleClose,
  loading,
  request,
  handleCloseForm,
  handleSubmitForm,
  handleRequestForm,
  showcreatePartyForm,
  setshowcreatePartyForm,
  parties,
  selectedParty,
  setSelectedParty,
  showDeleteModal,
  setShowDeleteModal,
  handleDelete,
  filter,
  handleFilterForm,
  handleSearch,

  ...others
}: IProps) {
  const theme = useTheme();
  return (
    <CustomDialog showCloseIcon={false} fullWidth maxWidth="md" {...others}>
      <ActionConfirmationModal
        title="Delete Political Party"
        message="Do you want to delete this political party? this action cannot be reversed."
        handleClose={() => {
          setSelectedParty(null);
          setShowDeleteModal(false);
        }}
        open={showDeleteModal}
        handelConfirm={() => handleDelete()}
      />
      <CreatePartyModal
        open={showcreatePartyForm}
        handleClose={() => setshowcreatePartyForm(false)}
        request={request}
        handleRequestForm={handleRequestForm}
        loading={loading}
        handleSubmit={handleSubmitForm}
        selectedParty={selectedParty}
        setSelectedParty={setSelectedParty}
      />
      <Stack spacing={2}>
        <RowContainer justifyContent="space-between">
          <Typography fontWeight="bold">Political Parties</Typography>
          <CustomCloseButton disabled={loading} onClick={handleClose} />
        </RowContainer>
        <RowContainer
          sx={{
            border: `1px solid ${theme.palette.grey[300]}`,
            borderRadius: theme.spacing(1),
          }}
          justifyContent="flex-end"
          padding={theme.spacing(2, 1)}
        >
          <SearchInput
            onChange={handleFilterForm}
            name="filter"
            value={filter.filter}
            placeholder="Search...."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch(filter);
              }
            }}
          />
          <PrimaryButton
            disabled={loading}
            onClick={() => setshowcreatePartyForm(true)}
          >
            Add Party
          </PrimaryButton>
        </RowContainer>
        <PartyTableView
          handleEdit={(party) => {
            setSelectedParty(party);
            setshowcreatePartyForm(true);
          }}
          loading={loading}
          parties={parties.results}
          handleShowDeleteModal={(party) => {
            setSelectedParty(party);
            setShowDeleteModal(true);
          }}
        />
        <CustomPaginationView
          totalCount={parties.totalCount}
          page={parties.page}
          totalPages={parties.totalPages}
          handlePage={(page) => handleSearch({ ...filter, page })}
          pageSize={parties.pageSize}
        />
      </Stack>
    </CustomDialog>
  );
}
