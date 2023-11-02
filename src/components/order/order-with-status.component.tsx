import { Badge, Button, Card, Group, Space, Text } from "@mantine/core";
import React from "react";
const OrderWithStatus: React.FC = () => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Group style={{}} mt="md" mb="xs">
        <Text fw={500}>Mock a very long long  description</Text>
        <Badge color="pink" variant="light">
          Pending
        </Badge>
      </Group>

      <table>
        <tr>
          <td>
            <Text size="sm" c="dimmed">
              Price :
            </Text>
          </td>
          <Space w="md" />
          <td>
            <Text size="sm" c="dimmed">
              100000
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
              Mock address
            </Text>
          </td>
        </tr>
      </table>

      <Button variant="light" color="blue" fullWidth mt="md" radius="md">
        Book classic tour now
      </Button>
    </Card>
  );
};
export default OrderWithStatus;
