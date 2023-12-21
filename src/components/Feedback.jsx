// import {
//   Tabs,
//   TabsHeader,
//   TabsBody,
//   Tab,
//   TabPanel,
// } from "@material-tailwind/react";
import { Component } from "react";
import Form from "./Form";
import TableFeedback from "./TableFeedback";
import MyTab from "./MyTab";

function Feedback() {
  const data = [
    {
      label: "Form",
      value: "form",
      component: <Form />,
    },

    {
      label: "Excel",
      value: "excel",
      component: <TableFeedback />,
    },
  ];

  return (
    <div className="col-span-5 bg-secondary rounded-lg p-2">
      <MyTab />
    </div>
  );
}

export default Feedback;
