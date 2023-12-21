import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
// import { createRoot } from "react-dom/client";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
import { Button, button } from "@material-tailwind/react";

const ActionButtons = () => {
  return (
    <div className="flex justify-center gap-4 items-center h-full">
      <button className="bg-sec_dark w-fit rounded-md px-2 text-white font-semibold">
        Edit
      </button>
      <button className="bg-sec_dark w-fit rounded-md px-2 text-white font-semibold">
        Delete
      </button>
    </div>
  );
};

const TableFeedback = () => {
  const gridRef = useRef(); // Optional - for accessing Grid's API
  const [rowData, setRowData] = useState([
    // set row data of student, date, month, weekday, subject, topic, test score, feeback on 20 words each
    {
      student: "Akash",
      date: "01/01/2021",
      month: "January",
      weekday: "Monday",
      subject: "Maths",
      topic: "Algebra",
      testScore: "80",
      feedback:
        "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Duis aute irure dolor in reprehenderit in voluptate",
    },
    {
      student: "Rakesh",
      date: "02/01/2021",
      month: "January",
      weekday: "Tuesday",
      subject: "Science",
      topic: "Physics",
      testScore: "70",
      feedback:
        "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Duis aute irure dolor in reprehenderit in voluptate ",
    },
    {
      student: "Tillu",
      date: "03/01/2021",
      month: "January",
      weekday: "Wednesday",
      subject: "English",
      topic: "Grammar",
      testScore: "60",
      feedback:
        "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Duis aute irure dolor in reprehenderit in voluptate ",
    },
    {
      student: "Mishrain",
      date: "04/01/2021",
      month: "January",
      weekday: "Thursday",
      subject: "Hindi",
      topic: "Grammar",
      testScore: "50",
      feedback:
        "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Duis aute irure dolor in reprehenderit in voluptate ",
    },
    {
      student: "Prabhat",
      date: "05/01/2021",
      month: "January",
      weekday: "Friday",
      subject: "Social Science",
      topic: "History",
      testScore: "40",
      feedback:
        "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Ut enim ad ",
    },
    {
      student: "Purnima",
      date: "06/01/2021",
      month: "January",
      weekday: "Saturday",
      subject: "Maths",
      topic: "Algebra",
      testScore: "30",
      feedback:
        "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Ut enim ad minim veniam ",
    },
    {
      student: "Sagar",
      date: "07/01/2021",
      month: "January",
      weekday: "Sunday",
      subject: "Science",
      topic: "Physics",
      testScore: "20",
      feedback:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque, est?",
    },
    {
      student: "Tanish",
      date: "08/01/2021",
      month: "January",
      weekday: "Monday",
      subject: "English",
      topic: "Grammar",
      testScore: "10",
      feedback:
        "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Ut enim ad  ",
    },
    {
      student: "Aman",
      date: "09/01/2021",
      month: "January",
      weekday: "Tuesday",
      subject: "Hindi",
      topic: "Grammar",
      testScore: "80",
      feedback:
        "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Ut enim ad",
    },
    {
      student: "Jay",
      date: "10/01/2021",
      month: "January",
      weekday: "Wednesday",
      subject: "Social Science",
      topic: "History",
      testScore: "70",
      feedback:
        "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Duis aute irure dolor in reprehenderit in voluptate ",
    },
    {
      student: "Srishti",
      date: "11/01/2021",
      month: "January",
      weekday: "Thursday",
      subject: "Maths",
      topic: "Algebra",
      testScore: "60",
      feedback:
        "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Ut enim ad",
    },
  ]);
  // const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  // const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

  // Each Column Definition results in one Column.
  const [columnDefs, setColumnDefs] = useState([
    // set columns def of student, date, month, weekday, subject, topic, test score, feeback
    {
      headerName: "",
      field: "select",
      checkboxSelection: true,
      headerCheckboxSelection: true,
      
      width: 50,
      pinned: "left",
      editable: false,
      headecheckboxSelectionrName: "Select",
    },
    { headerName: "Student", field: "student" },
    { headerName: "Date", field: "date" },
    { headerName: "Month", field: "month" },
    { headerName: "Weekday", field: "weekday" },
    { headerName: "Subject", field: "subject" },
    { headerName: "Topic", field: "topic" },
    { headerName: "Test Score", field: "testScore" },
    {
      headerName: "Feedback",
      field: "feedback",
      wrapText: true,
      width: 500,
      autoHeight: true,
    },
  ]);

  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo(
    () => ({
      width: 170,
      sortable: true,
      filter: true,
      // resizable: true,
      editable: true,
    }),
    []
  );

  const onBtnExport = useCallback(() => {
    const params = {
      fileName: "Feedback data.csv",

      columnKeys: [
        "student",
        "date",
        "month",
        "weekday",
        "subject",
        "topic",
        "testScore",
        "feedback",
      ],

      sheetName: "Feedback Data",
    };
    gridRef.current.api.exportDataAsCsv(params);
  }, []);

  const addRow = useCallback(() => {
    gridRef.current.api.applyTransaction({
      add: [
        {
          student: "Enter Name",
          date: "Enter Date",
          month: " Enter Month",
          weekday: "  Enter Weekday",
          subject: " Enter Subject",
          topic: " Enter Topic",
          testScore: " Enter Test Score",
          feedback: " Enter Feedback",
        },
      ],
      addIndex: 0,
    });

    gridOptions.api.setPinnedTopRowData([inputRow]);
  }, []);

  // Example of consuming Grid Event

  return (
    <div>
      {/* <button className="bg-sec_dark w-fit rounded-md p-2 text-white font-semibold" onClick={onBtnUpdate}>Show CSV export content text</button> */}
      <div className="flex justify-end">
        <button
          className="bg-sec_dark mr-5 my-1.5 w-fit rounded-md p-2 text-white font-semibold"
          onClick={onBtnExport}
        >
          Download CSV
        </button>
        <button
          className="bg-sec_dark mr-5 my-1.5 w-fit rounded-md p-2 text-white font-semibold"
          onClick={addRow}
        >
          Add Row
        </button>
        <button
          className="bg-sec_dark mr-5 my-1.5 w-fit rounded-md p-2 text-white font-semibold"
          onClick={() => {
            const SelectedRow = gridRef.current.api.getSelectedRows();
            gridRef.current.api.applyTransaction({ remove: SelectedRow });
          }}
        >
          Delete
        </button>
      </div>
      <div
        className="ag-theme-alpine"
        style={{ width: "100%", height: "500px" }}
      >
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          animateRows={true}
          suppressRowClickSelection={true}
          
          stopEditingWhenCellsLoseFocus={true}
          rowSelection="multiple"
          rowHeight={120}
        />
      </div>
    </div>
  );
};

export default TableFeedback;
