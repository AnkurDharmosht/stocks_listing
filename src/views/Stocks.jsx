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
import { useNavigate } from "react-router";
import useDebounce from "../util/useDebounce";

let refresh;

const Stocks = () => {
  const [apiData, setApiData] = React.useState();
  const [search, setSearch] = React.useState();
  const debounceSearch = useDebounce(search, 200);
  const navigate = useNavigate();

  const filterFunction = (item, searchInput = "") => {
    return (
      item.Symbol &&
      item.Symbol.toLowerCase().includes(searchInput.toLowerCase())
    );
  };

  const columns = [
    {
      name: "Symbol",
      cell: (row) => row.Symbol,
      wrap: true,
    },
    {
      name: "Name",
      selector: (row) => row.Name,
      wrap: true,
    },
    {
      name: "Sector",
      selector: (row) => row.Sector,
      wrap: true,
    },
  ];
  const refreshFunction = () => {
    setSearch("");
    if (refresh) refresh();
  };

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
          Stock List
        </Typography>
        <Button
          onClick={() => {
            refreshFunction();
          }}
        >
          Refresh
        </Button>
      </InnerHeader>
      <Grid className="" sx={{ position: "relative", px: { xs: 1, md: 3 } }}>
        <Grid sx={{ mb: 3 }}>
          <FormControl fullWidth>
            <TextField
              id="search"
              label="Search by Symbol"
              variant="outlined"
              placeholder="Search by Symbol"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </FormControl>
        </Grid>
        <div style={{ overflow: "auto", border: "none", width: "100%" }}>
          <ApiPaginate
            apiEnd={ApiEndpoints.INSTRUMENTS}
            columns={columns}
            paginateServer={true}
            filterFunc={filterFunction}
            search={debounceSearch}
            // queryParam={queryParams ? queryParams : ""}
            returnRefetch={(ref) => {
              refresh = ref;
            }}
            onRowClicked={(row) => {
              navigate(`/instruments/${row.Symbol}`);
            }}
            tableStyle={clientTable}
            apiData={apiData}
            setApiData={setApiData}
          />
        </div>
      </Grid>
    </>
  );
};

export default Stocks;
