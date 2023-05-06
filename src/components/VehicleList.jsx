import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

const VehicleList = () => {
  const data = [
    {
      _id: "6455b72502ba9755699ec168",
      name: "demo",
      type: "Bicycle",
      from: "2012/16, K E B Main Rd, Koothi Thope, Shrirama Nagar, Tumakuru, Karnataka 572101, India",
      fromLat: 13.341219719643403,
      fromLong: 77.11158153038026,
      to: "943C+RQ7, Shanti Nagar, Tumakuru, Karnataka 572106, India",
      toLat: 13.353809185192015,
      toLong: 77.12238546829225,
      number: "adwdw626",
      __v: 0,
    },
    {
      _id: "6455b72502ba9755699ec169",
      name: "demo2",
      type: "Car",
      from: "2012/16, K E B Main Rd, Koothi Thope, Shrirama Nagar, Tumakuru, Karnataka 572101, India",
      fromLat: 13.341219719643403,
      fromLong: 77.11158153038026,
      to: "943C+RQ7, Shanti Nagar, Tumakuru, Karnataka 572106, India",
      toLat: 13.353809185192015,
      toLong: 77.12238546829225,
      number: "adwdw627",
      __v: 0,
    },
    {
      _id: "6455b72502ba9755699ec170",
      name: "demo3",
      type: "Bike",
      from: "2012/16, K E B Main Rd, Koothi Thope, Shrirama Nagar, Tumakuru, Karnataka 572101, India",
      fromLat: 13.341219719643403,
      fromLong: 77.11158153038026,
      to: "943C+RQ7, Shanti Nagar, Tumakuru, Karnataka 572106, India",
      toLat: 13.353809185192015,
      toLong: 77.12238546829225,
      number: "adwdw628",
      __v: 0,
    },
  ];

  return (
    <div>
      <h1>VehicleList</h1>
      <Table>
        <TableHead sx={{ color: "red", backgroundColor: "#d62828" }}>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>From</TableCell>
            <TableCell>To</TableCell>
            <TableCell>Number</TableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={{ backgroundColor: "lightgray" }}>
          {data.map((vehicle) => (
            <TableRow key={vehicle._id}>
              <TableCell>{vehicle._id}</TableCell>
              <TableCell>{vehicle.name}</TableCell>
              <TableCell>{vehicle.type}</TableCell>
              <TableCell>{vehicle.from}</TableCell>
              <TableCell>{vehicle.to}</TableCell>
              <TableCell>{vehicle.number}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default VehicleList;
