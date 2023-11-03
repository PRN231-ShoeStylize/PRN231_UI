import { Badge, Button, Card, Group, Modal, Space, Text } from "@mantine/core";
import React, { useState } from "react";
import { GetOrderResult, OrderStatus } from "../../api/order/order.modal";
import { useDisclosure } from "@mantine/hooks";
import { OrderAPI } from "../../api/order/order.api";
import { showNotification } from "@mantine/notifications";
interface IProps {
  order: GetOrderResult;
  handleReload: () => void;
}
const OrderWithStatus: React.FC<IProps> = ({ order, handleReload }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleUpdateStatus = async (id: number, status: string) => {
    setIsLoading(true)
    const res = await OrderAPI.updateOrderStatus(id, status);
    if (res) {
      showNotification({
        title: "Success",
        message: "Status changed",
        color: "lime",
        // classNames: classes,
      });
      handleReload()
    } else {
      showNotification({
        title: "Error",
        message: "Failed to update order status",
        color: "red",
        // classNames: classes,
      });
    }
    setIsLoading(false)
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
        {order.orderStatus === OrderStatus.Waiting && (
          <Button
            variant="light"
            color="blue"
            fullWidth
            mt="md"
            radius="md"
            onClick={open}
          >
            Mark as paid
          </Button>
        )}
      </Card>
      <Modal opened={opened} onClose={close} centered withCloseButton={false}>
        <Modal.Header>
          <h3 style={{ textAlign: "center" }}>
            Are you sure to mark order #{order.id} as "Paid" ?
          </h3>
        </Modal.Header>
        <Modal.Body>
          <Text c="red" fw={"bold"} ta={"center"}>
            ***This action could not be undone***
          </Text>
        </Modal.Body>
        <Group>
          <Button loading={isLoading} fullWidth onClick={() => handleUpdateStatus(order.id, OrderStatus.Paid)}>Confirm</Button>
          <Button variant="filled" color="red" fullWidth onClick={close}>
            Close
          </Button>
        </Group>
      </Modal>
    </>
  );
};
export default OrderWithStatus;
