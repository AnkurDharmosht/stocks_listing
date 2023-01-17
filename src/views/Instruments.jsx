import {
  Button,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import InnerHeader from "./components/InnerHeader";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import ApiPaginate from "./components/tables/ApiPaginate";
import ApiEndpoints from "../networks/ApiEndPoints";
import { clientTable, customStyles } from "./components/tables/TableStyle";
import { useParams } from "react-router-dom";

let refresh;

const Instruments = () => {
  const symbol = useParams();
  const [apiData, setApiData] = React.useState();
  const [queryParam, setQueryParam] = React.useState("");
  const [timer, setTimer] = React.useState(false);

  const calculateRemainingTime = (expirationTime) => {
    const currentTime = new Date().getTime();
    const adjExpirationTime = new Date(expirationTime).getTime();
    const remainingDuration = currentTime - adjExpirationTime;

    return remainingDuration;
  };

  React.useEffect(() => {
    if (apiData && apiData.length > 0) {
      setTimer(calculateRemainingTime(apiData[0].valid_till + 19080000));
    }
    return () => {};
  }, [apiData]);

  const columns = [
    {
      name: "Price",
      cell: (row) => row.price,
      wrap: true,
    },
    {
      name: "Time",
      selector: (row) => row.time,
      wrap: true,
    },
    {
      name: "Valid till",
      selector: (row) => row.valid_till,
      wrap: true,
    },
  ];

  setTimeout(() => {
    if (refresh && timer) refresh();
  }, timer);
  return (
    <>
      <InnerHeader>
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
            fontSize: "20px",
            mx: { xs: "", md: 3 },
          }}
        >
          <ShowChartIcon className="me-2" />
          Quotes of {symbol && symbol.symbol}
        </Typography>
        <Button
          onClick={() => {
            if (refresh) refresh();
          }}
        >
          Refresh
        </Button>
      </InnerHeader>
      <Grid className="" sx={{ position: "relative", px: { xs: 1, md: 3 } }}>
        <div style={{ overflow: "auto", border: "none", width: "100%" }}>
          <ApiPaginate
            apiEnd={`${ApiEndpoints.QUOTES}/${symbol.symbol}`}
            columns={columns}
            paginateServer={true}
            // queryParam={queryParams ? queryParams : ""}
            returnRefetch={(ref) => {
              refresh = ref;
            }}
            onRowClicked={(row) => {}}
            tableStyle={clientTable}
            apiData={apiData}
            setApiData={setApiData}
          />
        </div>
      </Grid>
    </>
  );
};

export default Instruments;
