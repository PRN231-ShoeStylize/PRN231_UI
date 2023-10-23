import { Card, Grid, createStyles, Image, Text, Button } from "@mantine/core";
import {
  IconFileDescription,
  IconFileDownload,
  IconPhoto,
} from "@tabler/icons-react";
import React from "react";
import { GetPostResult } from "../../api/post/post.model";
interface IProps {
  handleOpenSubmitModal: (postId: number) => void;
  handleDisplayImage: (link: string[]) => void;
  post: GetPostResult;
}
const ProposalCard: React.FC<IProps> = ({
  handleOpenSubmitModal,
  post,
  handleDisplayImage,
}) => {
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
            <h2>{post.content}</h2>
            <div>
              <b>Created at:</b>
              <span> {post.createdAt.toString()}</span>
            </div>
            <div>
              <b>Expired at:</b>
              <span> {post.expireDate.toString()}</span>
            </div>
            <div style={{ marginTop: "1em" }}>
            <Button
                  style={{ marginRight: "1em" }}
                  leftIcon={<IconFileDownload size={14} />}
                  variant="default"
                  onClick={() => handleDisplayImage(post.postResources)}
                >
                  Show resources ({post.postResources.length})
                </Button>

              {/* <Button style={{marginRight: '1em'}} leftIcon={<IconFileDownload size={14} />} variant="default">
                                Detailed description
                            </Button> */}
            </div>
            <div style={{ margin: "1em 0" }}>
              <Button size="md" radius={"xl"} onClick={() => handleOpenSubmitModal(post.id)}>
                Submit proposal
              </Button>
            </div>
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
export default ProposalCard;
