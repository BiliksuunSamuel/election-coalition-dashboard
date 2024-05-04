import { PrimaryButton } from "../../components";
import { ContentContainer, FluidContainer, RowContainer } from "../../views";
import { CreateElectionModal } from "../components";

export default function ElectionManagementPage() {
  return (
    <FluidContainer>
      <CreateElectionModal children={<> </>} open={false} />
      <ContentContainer bgcolor="transparent">
        <RowContainer padding={0} width="100%" justifyContent="flex-end">
          <PrimaryButton>Add New User</PrimaryButton>
        </RowContainer>
      </ContentContainer>
    </FluidContainer>
  );
}
