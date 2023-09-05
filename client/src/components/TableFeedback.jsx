import { Card, Typography, Button } from "@material-tailwind/react";

const TABLE_HEAD = [
  "Student",
  "Feedback",
  "Date",
  <Button className="w-full">Add Feedback</Button>,
];

const TABLE_ROWS = [
  {
    name: "John Michael",
    job: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco",
    date: "23/04/18",
  },
  {
    name: "Alexa Liras",
    job: "Developer",
    date: "23/04/18",
  },
  {
    name: "Laurent Perrier",
    job: "Executive",
    date: "19/09/17",
  },
  {
    name: "Michael Levi",
    job: "Developer",
    date: "24/12/08",
  },
  {
    name: "Richard Gran",
    job: "Manager",
    date: "04/10/21",
  },
  
];

const TableFeedback = () => {
  return (
    <Card className="h-full w-full mt-2">
      <table className="w-full table-fixed text-left">
        <thead >
          <tr className="">
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b  p-4 w-1/4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-bold text-black leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          <th>
          </th>
          </tr>
        </thead>
        <tbody>
          {TABLE_ROWS.map(({ name, job, date }, index) => {
            const isLast = index === TABLE_ROWS.length - 1;
            const classes = "p-4 border border-blue-gray-50 text-clip";

            return (
              <tr key={name}>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {name}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {job}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {date}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    as="a"
                    href="#"
                    variant="small"
                    color="blue-gray"
                    className="font-medium"
                  >
                    Edit
                  </Typography>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
};

export default TableFeedback;
