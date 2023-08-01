import React from 'react';
import {
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  Button,
} from '@chakra-ui/react';
import { BsCameraVideo } from 'react-icons/bs';

const DashboardTable = ({ cameraList }) => {
  return (
    <TableContainer mt={5}>
      <Table variant="simple">
        {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
        <Thead>
          <Tr>
            {/* <Th>To convert</Th>
            <Th>into</Th>
            <Th isNumeric>multiply by</Th> */}
          </Tr>
        </Thead>
        <Tbody>
        {cameraList.map((camera) => (
            <Tr style={{display:"flex"}}>
              <Button size="sm">
            <Td><BsCameraVideo /></Td>
            <Td p={0}>{camera.islive ? "🟢" : "🔴"}</Td>
            <Td>
                    {camera.deviceid}
                  </Td>
                  </Button>
          </Tr>
        ))}
        </Tbody>
       
      </Table>
    </TableContainer>
  );
};

export default DashboardTable;
