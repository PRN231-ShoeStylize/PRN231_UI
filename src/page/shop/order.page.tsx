import { Grid, Tabs } from "@mantine/core";
import React, { useState } from "react";
import { OrderStatus } from "../../api/order/order.modal";
import OrderWithStatus from "../../components/order/order-with-status.component";
const OrderPage: React.FC = () => {
  const [orderStatus, setOrderStatus] = useState<string | null>(
    OrderStatus.Pending
  );
  return (
    <>
      <Tabs value={orderStatus} onTabChange={setOrderStatus}>
        <Tabs.List>
          <Tabs.Tab value={OrderStatus.Pending}>Pending Order</Tabs.Tab>
          <Tabs.Tab value={OrderStatus.Accepted}>Accepted Order</Tabs.Tab>
          <Tabs.Tab value={OrderStatus.Rejected}>Rejected Order</Tabs.Tab>
          <Tabs.Tab value={OrderStatus.Done}>Rejected Order</Tabs.Tab>
        </Tabs.List>
      </Tabs>
      <Grid>
        <Grid.Col span={4}><OrderWithStatus /></Grid.Col>
        <Grid.Col span={4}><OrderWithStatus /></Grid.Col>
        <Grid.Col span={4}><OrderWithStatus /></Grid.Col>
        <Grid.Col span={4}><OrderWithStatus /></Grid.Col>
      </Grid>
      
      {/* {proposals?.map((proposal, index) => (
        <ProposalWithStatus
          proposal={proposal}
          handleDisplayImage={handleDisplayImage}
        />
      ))} */}
    </>
  );
};

export default OrderPage;
