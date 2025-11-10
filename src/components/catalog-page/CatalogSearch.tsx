import { filterBook } from "@/context/signal";
import { useCatalogPage } from "@/pages/catalogPage/useCatalogPage";
import type { BOOKINFOTYPE } from "@/type";
import { handleData } from "@/utils";
import { Navbar, NavbarContent, NavbarItem } from "@heroui/navbar";
import { useSignals } from "@preact/signals-react/runtime";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import BookCard from "../card/Card";
import Input from "../Input";
import Pagination from "../Pagination";
import { Button } from "../ui/button";
function CatalogSearch() {
  useSignals();
  const { searchBookQuery } = useCatalogPage();
  const navigate = useNavigate();
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm();
  if (searchBookQuery.isLoading) return <>...loading</>;
  if (!searchBookQuery.data) return <>no data</>;
  if (searchBookQuery.data)
    return (
      <div className=" flex flex-col justify-center items-center w-full  gap-4   ">
        <Navbar
          shouldHideOnScroll
          className="z-0 fixed top-[82px]   bg-brown-50 opacity-95 w-3/4 mx-28 lg:mx-40  border rounded-b-lg"
        >
          <form
            className="flex  flex-col gap-2 p-2   w-full justify-center items-center"
            onSubmit={handleSubmit((data) => {
              const queryParams = new URLSearchParams();
              if (data.title) queryParams.append("title", data.title.trim());
              if (data.discription)
                queryParams.append("description", data.description.trim());
              if (data.genre) queryParams.append("genre", data.genre.trim());
              if (data.author) queryParams.append("author", data.author.trim());
              if (data.status) queryParams.append("status", data.status.trim());
              if (data.barcode)
                queryParams.append("barcode", data.barcode.trim());
              if (data.page) queryParams.append("page", data.page.trim());
              if (data.limit) queryParams.append("limit", data.limit.trim());
              filterBook.value = {
                title: data.title?.trim(),
                description: data.description?.trim(),
                genre: data.genre?.trim(),
                author: data.author?.trim(),
                status: data.status?.trim(),
                barcode: data.barcode?.trim(),
                page: data.page?.trim(),
                limit: data.limit?.trim(),
              };
              reset();
              navigate(`/catalog?${queryParams.toString()}`);
            })}
          >
            <NavbarContent className=" grid grid-cols-6 gap-3 w-full ">
              <NavbarItem>
                <Input
                  register={register}
                  errors={errors}
                  name="title"
                  placeholder="title"
                />
              </NavbarItem>
              <NavbarItem>
                <Input
                  register={register}
                  errors={errors}
                  name="discription"
                  placeholder="discription"
                />
              </NavbarItem>
              <NavbarItem>
                <Input
                  register={register}
                  errors={errors}
                  name="genre"
                  placeholder="genre"
                />
              </NavbarItem>
              <NavbarItem>
                <Input
                  register={register}
                  errors={errors}
                  name="author"
                  placeholder="author"
                />
              </NavbarItem>
              <NavbarItem>
                <Input
                  register={register}
                  errors={errors}
                  name="status"
                  placeholder="status"
                />
              </NavbarItem>
              <NavbarItem>
                <Input
                  register={register}
                  errors={errors}
                  name="barcode"
                  placeholder="barcode"
                />
              </NavbarItem>
            </NavbarContent>
            <Button
              className="bg-brown-500 hover:bg-brown-500 hover:scale-95 w-1/4 flex justify-center items-center"
              type="submit"
            >
              search
            </Button>
          </form>
        </Navbar>
        <h3 className="text-xl font-semibold mt-24 ">
          Displaying
          <span className="mx-2">
            {handleData(searchBookQuery).pagination?.itemsPerPage}
          </span>
          books out of{" "}
          <span className="mx-2">
            {handleData(searchBookQuery).pagination?.totalPages}
          </span>
          book
        </h3>
        {handleData(searchBookQuery).count == 0 ? (
          <>no data </>
        ) : (
          <div className="grid  lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-2 justify-between items-center">
            {handleData(searchBookQuery).data.map((book: BOOKINFOTYPE) => (
              <BookCard
                cover={book.cover}
                description={book.description}
                title={book.title}
                _id={book._id}
                status={book.status}
              />
            ))}
          </div>
        )}
        <Pagination query={searchBookQuery} />
      </div>
    );
}

export default CatalogSearch;
