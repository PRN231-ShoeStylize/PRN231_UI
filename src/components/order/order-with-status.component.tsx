import { Badge, Button, Card, Group, Modal, Space, Text, Image } from "@mantine/core";
import React, { useState } from "react";
import { GetOrderResult, OrderStatus } from "../../api/order/order.modal";
import { useDisclosure } from "@mantine/hooks";
import { OrderAPI } from "../../api/order/order.api";
import { showNotification } from "@mantine/notifications";
import { IconFileDownload } from "@tabler/icons-react";
import { Carousel, Embla } from "@mantine/carousel";
interface IProps {
  order: GetOrderResult;
  handleReload: () => void;
}
const OrderWithStatus: React.FC<IProps> = ({ order, handleReload }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [embla, setEmbla] = useState<Embla | null>(null);
  const [displayedImages, setDisplayedImages] = useState<string[]>([]);
  const [imageOpend, openImageController] = useDisclosure();

  const handleDisplayImage = (links: string[]) => {
    setDisplayedImages(links);
    openImageController.open();
  };

  return (
    <>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Group mt="md" mb="xs" w={"100%"}>
          <Text fw={500}>Order no {order.id}</Text>
          {/* <Space w="xl" /> */}
          <Badge color="pink" variant="light">
            {order.status}
          </Badge>
        </Group>
        <div>
          <table style={{ width: "100%" }}>
            <tr>
              <td>
                <Text size="sm" c="dimmed">
                  Price :
                </Text>
              </td>
              <Space w="md" />
              <td style={{ justifyContent: "flex-end" }}>
                <Text size="sm" c="dimmed">
                  {order.price}
                </Text>
              </td>
            </tr>
            <tr>
              <td>
                <Text size="sm" c="dimmed">
                  Address :
                </Text>
              </td>
              <Space w="md" />
              <td>
                <Text size="sm" c="dimmed">
                  {order.address}
                </Text>
              </td>
            </tr>
            <tr>
              <td>
                <Text size="sm" c="dimmed">
                  Payment Method:
                </Text>
              </td>
              <Space w="md" />
              <td>
                <Text size="sm" c="dimmed">
                  {order.paymentMethod}
                </Text>
              </td>
            </tr>
          </table>
        </div>
        <div style={{ marginTop: "1em" }}>
          <Button
            style={{ marginRight: "1em" }}
            leftIcon={<IconFileDownload size={14} />}
            variant="default"
            onClick={() =>
              handleDisplayImage(order.proposal.submissionResources)
            }
          >
            Show resources (
            {order.proposal.submissionResources != null
              ? order.proposal.submissionResources.length
              : ""}
            )
          </Button>

          {/* <Button style={{marginRight: '1em'}} leftIcon={<IconFileDownload size={14} />} variant="default">
                                Detailed description
                            </Button> */}
        </div>
      </Card>
      <Modal
        opened={imageOpend}
        onClose={openImageController.close}
        // size={1000}
      >
        <div style={{ height: 500, display: "flex" }}>
          <Carousel
            getEmblaApi={setEmbla}
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
export default OrderWithStatus;
