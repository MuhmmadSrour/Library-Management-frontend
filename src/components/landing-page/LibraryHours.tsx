import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
const libraryTime = [
  {
    day: "monday",
    time: "10 AM - 6 PM",
  },
  {
    day: "tuesday",
    time: "11 AM - 8 PM",
  },
  {
    day: "wednesday",
    time: "10 AM - 6 PM",
  },
  {
    day: "thursday",
    time: "11 AM - 8 PM",
  },
  {
    day: "friday",
    time: "1 AM - 5 PM",
  },
  {
    day: "saturday",
    time: "10 AM - 5 PM",
  },
  {
    day: "sanday",
    time: "closed",
  },
];

function LibraryHours() {
  return (
    <div className=" bg-brown-100 border border-brown-500 rounded-lg p-2 w-full m-2">
      <Table className="p-2  ">
        <TableCaption className="text-xl font-extrabold text-black">
          library hours
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-brown-300">day</TableHead>
            <TableHead className="text-brown-300">time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {libraryTime.map((day) => (
            <TableRow key={day.day}>
              <TableCell className="font-medium">{day.day}</TableCell>
              <TableCell>{day.time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default LibraryHours;
