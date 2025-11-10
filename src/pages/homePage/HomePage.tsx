import BookInfo from "@/components/landing-page/BookInfo";
import ContactUs from "@/components/landing-page/ContactUs";
import LibraryCard from "@/components/landing-page/LibraryCard";
import LibraryHours from "@/components/landing-page/LibraryHours";
import UpcomingEvents from "@/components/landing-page/UpcomingEvents";
import { useEffect, useState } from "react";
import "../../App.css";
import { useHomePage } from "./useHomePage";
function HomePage() {
  const [position, setPostion] = useState<boolean>(false);
  const { checkRecordMutation } = useHomePage();
  useEffect(() => {
    setPostion(true);
    checkRecordMutation.mutate();
  }, []);
  return (
    <div className="sm:flex sm:flex-row  grid grid-cols-1 w-fulljustify-center items-center relative gap-2   ">
      <div
        className={` grid grid-rows-3 w-full sm:w-3/4 h-full  transition-all animation-2 duration-500 ease-in-out ${
          position ? "" : "absolute -left-[1000px] top-0  "
        }`}
      >
        <BookInfo
          book={{
            title: "milk and honey",
            authors: ["rupi kaur"],
            barcode: "2113",
            cover: "	https://images.unsplash.com/photo-1544947950-fa07a98d237f",
            description:
              "A book description is a concise summary of a book's contents, aiming to give potential readers a glimpse into its plot, characters, and setting. It's often found on the back cover of a physical book or on online book retailers' websites. The description's goal is to entice readers and help them decide if the book is something they'd enjoy. ",
            genre: "frfe",
            pages: 300,
            publicationDate: "Grergr",
            publisher: "Rgrgfr",
            records: [],
            subjects: ["dvdv", "Eveved"],
          }}
        />
        <UpcomingEvents />
        <LibraryCard />
      </div>
      <div
        className={`h-full grid grid-rows-3 w-full transition-all animation-1  sm:w-1/4 duration-500 ease-in-out ${
          position ? "" : "absolute -right-[1000px] top-0"
        }  `}
      >
        <LibraryHours />
        <ContactUs />
      </div>
    </div>
  );
}

export default HomePage;
