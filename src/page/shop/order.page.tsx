import { Grid, Tabs } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { GetOrderResult, OrderStatus } from "../../api/order/order.modal";
import OrderWithStatus from "../../components/order/order-with-status.component";
import { OrderAPI } from "../../api/order/order.api";
import { useDisclosure } from "@mantine/hooks";
const OrderPage: React.FC = () => {
  const [orderStatus, setOrderStatus] = useState<string | null>(
    OrderStatus.Waiting
  );
  const [orders, setOrders] = useState<GetOrderResult[]>([]);
  const [reload, setReload] = useState<boolean>(false);

  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    const getOrdersWithStatus = async () => {
      const res = await OrderAPI.getOrderByUserTokenAndStatus(orderStatus);
      return res;
    };

    getOrdersWithStatus().then((res) => {
      setOrders(res.data);
      console.log(res.data);
    });
  }, [orderStatus, reload]);


  return (
    <>
      <Tabs value={orderStatus} onTabChange={setOrderStatus}>
        <Tabs.List>
          <Tabs.Tab value={OrderStatus.Waiting}>Waiting Order</Tabs.Tab>
          <Tabs.Tab value={OrderStatus.Done}>Done Order</Tabs.Tab>
        </Tabs.List>
      </Tabs>
      <Grid>
        {orders.length == 0 && <h1 style={{textAlign: 'center', paddingTop: '10px'}}>There is no {orderStatus?.toLowerCase()} order at the moment</h1>}
        {orders.map((order, index) => (
          <Grid.Col span={4}>
            <OrderWithStatus order={order} key={index} handleReload={function (): void {
                    setReload(!reload)
                } } />
          </Grid.Col>
        ))}
      </Grid>
      
    </>
  );
};

export default OrderPage;
