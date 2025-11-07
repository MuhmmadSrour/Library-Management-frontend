import { cn } from "@/Lip/utils";
import type { BOOKINFOTYPE } from "@/type";

function BookInfo({
  book,
  className,
}: {
  book: BOOKINFOTYPE;
  className?: string;
}) {
  return (
    <div
      className={cn(
        ` m-2  p-2  flex flex-col gap-4 bg-brown-100 border rounded-lg w-full border-brown-500 `,
        className
      )}
    >
      <h3 className="text-2xl font-extrabold ">book of the week:</h3>
      <div className="flex  gap-2 ">
        <div className="w-1/4">
          <img className=" bg-cover" src={book.cover} alt="" />
        </div>
        <div className="flex flex-col gap-4 p-2  w-3/4">
          <h2 className="text-xl font-bold">{book.title}</h2>
          <div className="flex  gap-2 text-lg font-semibold">
            {book.authors?.map((item) => (
              <h3 key={item} className="text-sm ">
                {item}
              </h3>
            ))}
          </div>
          <p>{book.description}</p>
        </div>
      </div>
    </div>
  );
}

export default BookInfo;
