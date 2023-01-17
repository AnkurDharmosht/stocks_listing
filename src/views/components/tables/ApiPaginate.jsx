import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useAx } from "../../../networks/ApiController";
import { csvJSON } from "../../../util/csvtojson";
import PaginateTable from "./PaginateTable";

const ApiPaginate = ({
  user,
  columns = [],
  apiEnd,
  filterFunc,
  ExpandedComponent,
  paginateServer = true,
  returnRefetch,
  expandVisible,
  setExpandVisible,
  search,
  queryParam,
  tableStyle,
  apiData,
  setApiData,
  selectableRows,
  onSelectedRowsChange,
  clearSelection,
  selectableRowDisabled = false,
  onRowClicked,
  conditionalRowStyles,
  limit = 10,
  shadow = true,
}) => {
  const [list, setList] = useState(apiData ? apiData : []);
  const [filteresList, setFilteredList] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(limit);
  const [lastPage, setLastPage] = useState(1);
  const [newData, setNewData] = useState([]);
  const getUrl = (page, per_page) => {
    return `${apiEnd}?limit=${per_page}&offset=${(page - 1) * per_page}${
      queryParam ? "&" + queryParam : ""
    }`;
  };
  const [{ data, loading, error }, refetch] = useAx(getUrl(lastPage, perPage));
  if (returnRefetch) {
    returnRefetch(refetch);
  }
  useEffect(() => {
    if (data) {
      if (data.payload) {
        const url = window.location.pathname.split("/");
        const length = url.length;
        const path = url[length - 1];
        setUiData(data.payload[path], data.payload[path].length);
        if (setApiData) setApiData(data.payload[path]);
      } else {
        const neww = csvJSON(data);
        setNewData(JSON.parse(neww));
      }
    }

    return () => {};
  }, [data]);

  useEffect(() => {
    if (newData && newData.length > 0) {
      setUiData(newData, newData.length);
      if (setApiData) setApiData(newData);
    }
    return () => {};
  }, [newData]);

  useEffect(() => {
    let isTimerActive = false;
    if (isTimerActive) {
      return;
    }
    if (error) {
      if (error.message && error.message === "Network Error") {
        Swal.fire("Check your Network Connection!!!");
      } else {
        console.log(error);
      }
    }
    return () => {};
  }, [error]);

  useEffect(() => {
    refetch();
    return () => {};
  }, [queryParam]);

  useEffect(() => {
    new Promise((resolve, reject) => {
      setTimeout(() => {
        if (search) {
          const ls = list.filter((item) => {
            return filterFunc && filterFunc(item, search);
          });
          resolve(ls);
        } else {
          resolve(list);
        }
      }, 100);
    })
      .then((ls) => {
        if (ls) {
          ls = ls.map((item, index) => {
            item.sno = (lastPage - 1) * 10 + index + 1;
            return item;
          });
        }
        setFilteredList(ls);
      })
      .catch((err) => {});

    return () => {};
  }, [search, list]);

  // for setting data in UI
  const setUiData = (myData, total) => {
    setTotalRows(total);
    setList(myData);
  };
  const handlePageChange = (page) => {
    setLastPage(page);
  };

  const handlePerRowsChange = (newPerPage, page) => {
    setLastPage(page);
    setPerPage(newPerPage);
  };

  useEffect(() => {
    if (paginateServer) refetch(getUrl(lastPage, perPage));
    return () => {};
  }, [lastPage, perPage]);

  return (
    <div
      style={{
        overflow: "auto",
        borderRadius: "5px",
        width: "100%",
        objectFit: "fill",
        border: "none",
        boxShadow: shadow ? "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" : "none",
        padding: "2px",
      }}
    >
      <PaginateTable
        columns={columns}
        list={filteresList}
        setList={setFilteredList}
        tableStyle={tableStyle}
        ExpandedComponent={ExpandedComponent}
        filterFunc={filterFunc}
        progressPending={loading}
        totalRows={totalRows}
        handlePerRowsChange={handlePerRowsChange}
        handlePageChange={handlePageChange}
        paginateServer={paginateServer}
        expandVisible={expandVisible}
        setExpandVisible={setExpandVisible}
        selectableRows={selectableRows}
        onSelectedRowsChange={onSelectedRowsChange}
        clearSelection={clearSelection}
        conditionalRowStyles={conditionalRowStyles}
        onRowClicked={onRowClicked}
        // selectableRowDisabled={selectableRowDisabled}
      />
    </div>
  );
};

export default ApiPaginate;
