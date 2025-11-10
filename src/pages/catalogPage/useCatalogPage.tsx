import { myAxios } from "@/context/myAxios";
import { filterBook, limit, page } from "@/context/signal";
import { handelerror } from "@/utils";
import { useQuery } from "@tanstack/react-query";

export function useCatalogPage() {
  const getBookQuery = useQuery({
    queryKey: ["viewCatalog"],
    queryFn: async () => {
      return await myAxios.get("/book/viewCatalog");
    },
  });
  if (getBookQuery.isError) {
    handelerror({ err: getBookQuery.error });
  }
  const searchBookQuery = useQuery({
    queryKey: ["searchBook", filterBook.value],
    queryFn: async () =>
      await myAxios.get("/book/search", {
        params: {
          query: filterBook.value.query,
          title: filterBook.value.title,
          genre: filterBook.value.genre,
          discription: filterBook.value.description,
          author: filterBook.value.author,
          subject: filterBook.value.subject,
          barcode: filterBook.value.barcode,
          status: filterBook.value.status,
          page: page.value,
          limit: limit.value,
        },
      }),
    enabled: !!filterBook.value,
  });
  if (searchBookQuery.isError) {
    handelerror({ err: searchBookQuery.error });
  }
  //
  return { getBookQuery, searchBookQuery };
}
