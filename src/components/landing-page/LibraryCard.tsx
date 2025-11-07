import { UserInfo } from "@/context/signal";
import Login from "@/pages/authPage/Login";
import { useHomePage } from "@/pages/homePage/useHomePage";
import { handleData } from "@/utils";
import { useSignals } from "@preact/signals-react/runtime";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

function LibraryCard() {
  useSignals();
  const { getLibraryCardQuery } = useHomePage();
  const [getCard, setGetCard] = useState<boolean>(false);
  if (getLibraryCardQuery.isLoading) return <>...loding</>;
  if (getLibraryCardQuery.isError) return <>nodata</>;
  if (getLibraryCardQuery.data)
    return (
      <div className=" bg-brown-100 border border-brown-500 p-2 flex flex-col  items-center gap-2 w-full justify-center rounded-lg m-2 ">
        <h2 className="font-extrabold text-xl">get a library card</h2>
        <img
          className="h-[250px] w-[500px] "
          src="/librarycard (1).png"
          alt=""
        />
        <p className="lowercase mt-2  ">
          learn how to get your own library card
          <Dialog>
            <DialogTrigger>
              <a className="lowercase text-blue-300 mx-2">here.</a>
            </DialogTrigger>
            <DialogContent>
              {UserInfo.value?.libraryCard?.cardNumber ? (
                <>
                  <DialogHeader>
                    <DialogTitle className="text-lg ">
                      welcome
                      <span className="mx-2">{UserInfo.value?.firstName}</span>
                      {UserInfo.value?.lastName}
                    </DialogTitle>
                  </DialogHeader>
                  <DialogDescription className="flex flex-col">
                    {getCard
                      ? `your library card number:${
                          handleData(getLibraryCardQuery).data.user._id
                        }`
                      : "   to signup for a new library card,or you forget the ID number  on your card,use the button below"}
                  </DialogDescription>
                  {getCard ? (
                    ""
                  ) : (
                    <Button onClick={() => setGetCard(true)}>
                      get library card
                    </Button>
                  )}
                </>
              ) : (
                <Login />
              )}
            </DialogContent>
          </Dialog>
        </p>
      </div>
    );
}

export default LibraryCard;
