import { Grid } from "@mui/material";
import React from "react";
import DataTable from "react-data-table-component";

const PaginateTable2 = ({
  columns,
  user,
  list,
  setList,
  ExpandedComponent,
  filterFunc,
  progressPending = false,
  totalRows,
  handlePerRowsChange,
  handlePageChange,
  tableStyle = false,
  paginateServer = true,
  expandVisible,
  setExpandVisible,
  selectableRows,
  onSelectedRowsChange,
  selectableRowDisabled = false,
  onRowClicked,
  conditionalRowStyles,
  noDataComponent,
  striped = true,
}) => {
  // const [toggledClearRows, setToggleClearRows] = useState(false);
  // const handleClearRows = () => {
  //   setToggleClearRows(!toggledClearRows);
  // };
  return (
    <Grid
      sx={{
        objectFit: "cover",
      }}
    >
      <DataTable
        columns={columns}
        data={list}
        noDataComponent="empty"
        responsive
        // subHeader
        // subHeaderComponent={filterInput}
        expandableRowsComponent={ExpandedComponent}
        // expandOnRowClicked={ExpandedComponent ? true : false}
        expandableRows={ExpandedComponent ? true : false}
        pagination={paginateServer}
        paginationServer={paginateServer}
        striped={striped}
        customStyles={tableStyle}
        highlightOnHover
        selectableRowsHighlight
        pointerOnHover={false}
        paginationTotalRows={totalRows}
        progressPending={progressPending}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        dense={false}
        selectableRows={selectableRows}
        onSelectedRowsChange={onSelectedRowsChange}
        // clearSelectedRows={toggledClearRows}
        conditionalRowStyles={conditionalRowStyles}
        onRowClicked={(data) => {
          if (onRowClicked) onRowClicked(data);
        }}
        // selectableRowDisabled={selectableRowDisabled}
      />
    </Grid>
  );
};

export default PaginateTable2;
