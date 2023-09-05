
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { Component } from "react";
import Form from "./Form";
import TableFeedback from "./TableFeedback";


function Feedback() {
    
  const data = [
    {
      label: "Form",
      value: "form",
      component: <Form />
    },

    {
      label: "Excel",
      value: "excel",
      component: <TableFeedback />
    }
  ];

  return (
    <div className="col-span-4 bg-secondary rounded-lg p-2">
      <Tabs id="custom-animation" className="mb-2" value="form">
        <TabsHeader className=" bg-secondary">
          {data.map(({ label, value }) => (
            <Tab className="font-bold" key={value} value={value}>
              {label}
            </Tab>
          ))}
        </TabsHeader>
        

        <TabsBody
          className="flex justify-center items-center"
          animate={{
            initial: { y: 250 },
            mount: { y: 0 },
            unmount: { y: 250 },
          }}
        >
          {data.map(({ value, component }) => (
            <TabPanel className="p-0 rounded-lg " key={value} value={value}>
              {component}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>

 );
}

export default Feedback;