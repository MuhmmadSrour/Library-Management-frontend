import { filterBook } from "@/context/signal";
import { useCatalogPage } from "@/pages/catalogPage/useCatalogPage";
import type { BOOKINFOTYPE } from "@/type";
import { handleData } from "@/utils";
import { useNavigate } from "react-router-dom";
import BookCard from "../card/Card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

function CatalogOverview() {
  const { getBookQuery } = useCatalogPage();
  const navigate = useNavigate();
  if (getBookQuery.isLoading) return <>...loding</>;
  const uniqueGenres = Array.from(
    new Set(
      handleData(getBookQuery).data.map((item: BOOKINFOTYPE) => item.genre)
    )
  ) as string[];
  if (getBookQuery.data)
    return (
      <div className=" flex flex-col justify-center items-center w-full   shadow-xl ">
        <h3 className="text-xl font-semibold ">
          welcome to our library,we currently have
          <span className=" text-brown-300 mx-2">
            /{handleData(getBookQuery).count}/
          </span>
          book
        </h3>
        {uniqueGenres.map((genre: string) => (
          <div key={genre} className=" flex flex-col   p-2">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold p-2">{genre}:</h2>
              <span
                onClick={() => {
                  const genreParams = new URLSearchParams();
                  genreParams.append("genre", genre);
                  filterBook.value.genre = genre;
                  navigate(`/catalog?${genreParams}`);
                }}
                className="text-sm font-medium cursor-pointer"
              >
                viewmore...
              </span>
            </div>
            <Carousel
              opts={{
                align: "start",
              }}
              className="sm:max-w-sm md:max-w-md max-w-52 lg:max-w-4xl  bg-brown-50 rounded-lg px-8 py-4  "
            >
              <CarouselContent>
                {handleData(getBookQuery).data.map((item: BOOKINFOTYPE) =>
                  item.genre === genre ? (
                    <CarouselItem
                      key={item._id}
                      className="pl-1 md:basis-1/2  lg:basis-1/4  w-full"
                    >
                      <BookCard
                        cover={item.cover}
                        description={item.description}
                        title={item.title}
                        _id={item._id}
                        status={item.status}
                      />
                    </CarouselItem>
                  ) : (
                    ""
                  )
                )}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext  />
            </Carousel>
          </div>
        ))}
      </div>
    );
}

export default CatalogOverview;

/* <Card className="bg-brown-100   items-center overflow-hidden h-full  gap-1 w-full   py-2   rounded-lg  shadow-xl">
                        <CardContent className=" flex flex-col justify-center items-center text-start w-full p-2 gap-2 h-full  ">
                          <img
                            className="w-[150px] h-[150px] object-cover "
                            src={item.cover}
                            alt=""
                          />
                          <h3 className="text-lg font-medium p-4 text-start leading-tight line-clamp-2 w-full overflow-hidden max-h-14">
                            {item.title}
                          </h3>
                          <p className=" overflow-hidden text-sm  line-clamp-3 p-1 w-full">
                            {item.description}
                          </p>
                          <Dialog>
                            <DialogTrigger
                              type="submit"
                              className="capitalize text-white text-sm hover:scale-95 bg-brown-500 border rounded-lg p-2 w-full"
                            >
                              available
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>
                                  loan book titled system design interview
                                </DialogTitle>
                              </DialogHeader>
                              <DialogDescription asChild>
                                <form className="flex flex-col gap-2">
                                  <Input
                                    name="libraryCard"
                                    register={register}
                                    placeholder="library card ID"
                                    errors={errors}
                                    label="enter patron library card:"
                                  />
                                  <Input
                                    name="EmployeeID"
                                    register={register}
                                    placeholder=" Employee ID"
                                    errors={errors}
                                    label="check out employee ID:"
                                  />
                                </form>
                              </DialogDescription>
                            </DialogContent>
                          </Dialog>
                        </CardContent>
                      </Card> */
