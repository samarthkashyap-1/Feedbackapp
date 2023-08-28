
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { Component } from "react";
import Form from "./Form";


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
      component: <div>Hello from excel</div>
    }
  ];

  return (
    <div className="col-span-4 bg-secondary rounded-lg ">
      <Tabs id="custom-animation" className="" value="form">
        <TabsHeader className=" bg-secondary">
          {data.map(({ label, value }) => (
            <Tab className="font-bold" key={value} value={value}>
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <hr className="border-white border-4" />

        <TabsBody
          className="flex justify-center items-center mt-16"
          animate={{
            initial: { y: 250 },
            mount: { y: 0 },
            unmount: { y: 250 },
          }}
        >
          {data.map(({ value, component }) => (
            <TabPanel className="p-0 mt-2 rounded-lg overflow-hidden" key={value} value={value}>
              {component}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>

 );
}

export default Feedback;