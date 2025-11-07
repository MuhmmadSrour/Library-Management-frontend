import { cn } from "@/Lip/utils";
import { type Ref } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
type OptionType = {
  value: string;
  key: string;
};

type SelectType = {
  options: OptionType[];
  defaultValue?: string;
  placeholder?: string;
  Ref?: Ref<HTMLButtonElement>;
  onChange: (val: string) => void;
  className?: string;
};

function SelectUi({ options, placeholder, onChange, className }: SelectType) {
  return (
    <Select onValueChange={(val) => onChange(val)}>
      <SelectTrigger
        className={cn("mt-5 border-brown-500 outline-none p-2.5", className)}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.key}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
export default SelectUi;
