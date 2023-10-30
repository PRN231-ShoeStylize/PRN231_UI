import React, { useEffect, useState } from "react";
import { IProposal, ProposalStatus } from "../../api/proposal/proposal.model";
import { Modal, Tabs, Image } from "@mantine/core";
import { ProposalAPI } from "../../api/proposal/proposal.api";
import ProposalWithStatus from "../../components/proposal-card/proposal-with-status.component";
import { useDisclosure } from "@mantine/hooks";
import { Carousel } from "@mantine/carousel";
const ProposalPage: React.FC = () => {
  const [proposalStatus, setProposalStatus] = useState<string | null>(
    ProposalStatus.Pending
  );
  const [proposals, setProposals] = useState<IProposal[]>();
  const [displayedImages, setDisplayedImages] = useState<string[]>([]);
  const [imageOpend, openImageController] = useDisclosure();
  useEffect(() => {
    const getAllPost = async () => {
      const res = await ProposalAPI._getProposal({
        status: proposalStatus == null ? undefined : proposalStatus, isOfCurrentUser: true
      });
      return res;
    };

    getAllPost().then((res) => {
      setProposals(res.data.results);
      console.log(res.data.results);
    });
  }, [proposalStatus]);

  const handleDisplayImage = (links: string[]) => {
    setDisplayedImages(links);
    openImageController.open();
  };

  return (
    <>
      <Tabs
        value={proposalStatus}
        onTabChange={setProposalStatus}
        // onClick={setActiveTab}
      >
        <Tabs.List>
          <Tabs.Tab value={ProposalStatus.Pending}>Pending Proposal</Tabs.Tab>
          <Tabs.Tab value={ProposalStatus.Accepted}>Accepted Proposal</Tabs.Tab>
          <Tabs.Tab value={ProposalStatus.Rejected}>Rejected Proposal</Tabs.Tab>
        </Tabs.List>
      </Tabs>
      {proposals?.map((proposal, index) => (
        <ProposalWithStatus
          proposal={proposal}
          handleDisplayImage={handleDisplayImage}
        />
      ))}
      <Modal opened={imageOpend} onClose={openImageController.close}>
        <div style={{ height: 500, display: "flex" }}>
          <Carousel
            withIndicators
            height="100%"
            style={{ flex: 1 }}
            loop
            dragFree
          >
            {displayedImages.map((image) => (
              <Carousel.Slide>
                <Image src={image} height={500} />
              </Carousel.Slide>
            ))}
          </Carousel>
        </div>
      </Modal>
    </>
  );
};
export default ProposalPage;
