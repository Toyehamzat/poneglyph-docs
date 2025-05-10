"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon, XIcon } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { useSearchParams } from "@/hooks/useSearchParams";

export const SearchInput = () => {
  const [search, setSearch] = useSearchParams();
  const [value, setValue] = useState(search);
  const [debouncedValue, setDebouncedValue] = useState(search);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, 500);

    return () => clearTimeout(timer);
  }, [value]);

  useEffect(() => {
    if (debouncedValue !== search) {
      setSearch(debouncedValue);
    }
  }, [debouncedValue, search, setSearch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleClear = () => {
    setValue("");
    setDebouncedValue("");
    setSearch("");
    inputRef.current?.focus();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearch(value);
    inputRef.current?.blur();
  };

  return (
    <div className="flex flex-1 items-center justify-center">
      <form className="relative max-w-[720px] w-full" onSubmit={handleSubmit}>
        <Input
          value={value}
          onChange={handleChange}
          ref={inputRef}
          placeholder="Search"
          className="md:text-base placeholder:text-neutral-800 px-8 md:px-14 w-full border-none focus-visible:shadow-[0_1px_1px_0_rgba(65,69,73,.3),0_1px_3px_1px_rgba(65,69,73,.15)] bg-[#F0F4F8] rounded-full h-[48px] focus-visible:ring-0 focus:bg-white"
        />
        <Button
          type="submit"
          variant={"ghost"}
          className="absolute left-0 md:left-3  top-1/2 -translate-y-1/2 [&_svg]:size-5 rounded-full"
          size={"icon"}
        >
          <SearchIcon />
        </Button>
        {value && (
          <Button
            type="button"
            variant={"ghost"}
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 [&_svg]:size-5 rounded-full"
            size={"icon"}
          >
            <XIcon />
          </Button>
        )}
      </form>
    </div>
  );
};
