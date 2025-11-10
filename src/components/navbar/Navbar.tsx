import { filterBook } from "@/context/signal";
import { useSignals } from "@preact/signals-react/runtime";
import { useForm } from "react-hook-form";
import { AiOutlineSearch } from "react-icons/ai";
import { BiSolidBookOpen } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import Input from "./../Input";
import EditProfile from "./EditProfile";
import useNavbar from "./useNavbar";
function Navbar() {
  useSignals();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const navigate = useNavigate();
  const { validProfile, setValidProfile } = useNavbar();
  return (
    <nav className="flex fixed justify-between p-4 bg-brown-500 items-center w-full z-40 top-0">
      <Link
        className="flex capitalize  gap-2 justify-center items-center p-2"
        to={"/HomePage"}
      >
        <h3 className="text-2xl font-medium">my library</h3>
        <BiSolidBookOpen className="text-xl text-white" />
      </Link>

      <Link
        className=" capitalize  gap-2 justify-center items-center p-2 mr-6 md:flex hidden"
        to={"/catalog"}
      >
        <h3 className="text-2xl font-medium">view catalog</h3>
      </Link>
      <form
        onSubmit={handleSubmit((data) => {
          const queryParams = new URLSearchParams();
          if (data.publicSearch) {
            queryParams.append("query", data.publicSearch.trim());
            filterBook.value = {
              query: data.publicSearch.trim(),
            };
            navigate(`/catalog?${queryParams.toString()}`);
          }
          reset();
        })}
        className="relative"
      >
        <Input
          register={register}
          errors={errors}
          name="publicSearch"
          placeholder="search catalog "
          className="text-lg rounded-2xl"
          validationOptions={{ required: true }}
          onChange={(e) => {
            filterBook.value = { ...filterBook.value, query: e.target.value };
          }}
        />
        <Button
          type="submit"
          disabled={!filterBook.value.query}
          className="absolute  text-black bg-inherit border-0 hover:text-black rounded-r-2xl   hover:bg-inherit  top-0    right-0 h-full "
        >
          <AiOutlineSearch />
        </Button>
      </form>

      <div className="p-2 relative ">
        <CgProfile
          onClick={() => setValidProfile((prev) => !prev)}
          className="text-2xl  text-white cursor-pointer "
        />
        {validProfile == true ? <EditProfile /> : ""}
      </div>
    </nav>
  );
}

export default Navbar;
