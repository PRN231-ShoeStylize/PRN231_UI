import { Card, Grid, createStyles, Image, Button } from "@mantine/core";
import React from "react";
import { IProposal } from "../../api/proposal/proposal.model";
import { IconFileDownload } from "@tabler/icons-react";
interface IProps{
    proposal: IProposal,
    handleDisplayImage: (link: string[]) => void;
}
const ProposalWithStatus: React.FC<IProps> = ({proposal, handleDisplayImage}) => {
    const { classes } = useStyles();
  return (
    <>
      <Card withBorder className={classes.cardContainer}>
        <Grid>
          <Grid.Col span={2} style={{ padding: "0 0" }}>
            <Image
              src="https://t4.ftcdn.net/jpg/03/59/58/91/360_F_359589186_JDLl8dIWoBNf1iqEkHxhUeeOulx0wOC5.jpg"
              height={160}
              alt="Norway"
              style={{ objectFit: "cover" }}
            />
          </Grid.Col>
          <Grid.Col span={10} style={{ padding: "0 2%" }}>
            <h2>{proposal.description}</h2>
            <div>
              <b>Created by:</b>
              <span> {proposal.createdByFirstName} {proposal.createdByLastName}</span>
            </div>
            <div>
              <b>Created at:</b>
              <span> {proposal.createdAt}</span>
            </div>
            <div>
              <b>Price:</b>
              <span> {proposal.price}</span>
            </div>
            <div style={{ marginTop: "1em" }}>
              <Button
                style={{ marginRight: "1em" }}
                leftIcon={<IconFileDownload size={14} />}
                variant="default"
                onClick={() => handleDisplayImage(proposal.submissionResources)}
              >
                Show resources ({proposal.submissionResources != null ? proposal.submissionResources.length : ''})
              </Button>

              {/* <Button style={{marginRight: '1em'}} leftIcon={<IconFileDownload size={14} />} variant="default">
                                Detailed description
                            </Button> */}
            </div>
            {/* <div style={{ margin: "1em 0" }}>
              <Button
                size="md"
                radius={"xl"}
                onClick={() => handleOpenSubmitModal(post.id)}
              >
                Submit proposal
              </Button>
            </div> */}
          </Grid.Col>
        </Grid>
      </Card>
    </>
  );
};

const useStyles = createStyles({
    cardContainer: {
      width: "95%",
    },
  });
export default ProposalWithStatus;
