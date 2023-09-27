import { Card, Grid, createStyles, Image, Text, Button } from "@mantine/core";
import { IconFileDescription, IconFileDownload, IconPhoto } from "@tabler/icons-react";
import React from "react";
interface IProps{
    handleOpenSubmitModal: () => void
}
const ProposalCard: React.FC<IProps> = ({handleOpenSubmitModal}) => {
    const { classes } = useStyles();
    return (
        <>
            <Card withBorder className={classes.cardContainer}>
                <Grid>
                    <Grid.Col span={2} style={{ padding: '0 0' }}>
                        <Image
                            src="https://t4.ftcdn.net/jpg/03/59/58/91/360_F_359589186_JDLl8dIWoBNf1iqEkHxhUeeOulx0wOC5.jpg"
                            height={160}
                            alt="Norway"
                            style={{ objectFit: 'cover' }}
                        />

                    </Grid.Col>
                    <Grid.Col span={10} style={{ padding: '0 2%' }}>
                        <h2>Need a Nike Air Force with Akatsuki style</h2>
                        <div><b>Budget:</b><span> &emsp; $100</span></div>
                        <div>
                            <b>Request brief:</b>
                            <Text truncate="end">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde provident eos fugiat id
                                necessitatibus magni ducimus molestias. Placeat, consequatur. Quisquam, quae magnam
                                perspiciatis excepturi iste sint itaque sunt laborum. Nihil?
                            </Text>
                        </div>
                        <div style={{marginTop: '1em'}}>
                            <Button style={{marginRight: '1em'}} leftIcon={<IconFileDownload size={14} />} variant="default">
                                Detailed description
                            </Button>
                            <Button style={{marginRight: '1em'}} leftIcon={<IconFileDownload size={14} />} variant="default">
                                Detailed description
                            </Button>
                        </div>
                        <div style={{margin: '1em 0'}}>
                            <Button size="md" radius={'xl'} onClick={handleOpenSubmitModal}>
                                Submit proposal
                            </Button>
                        </div>
                    </Grid.Col>
                </Grid>
            </Card>
        </>
    )
}

const useStyles = createStyles({
    cardContainer: {
        width: '95%'
    }
})
export default ProposalCard