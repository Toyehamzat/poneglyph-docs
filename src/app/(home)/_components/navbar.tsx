import Link from "next/link";
import Image from "next/image";
import { SearchInput } from "./search-input";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
export const Navbar = () => {
  return (
    <nav className="flex items-center justify-between w-full h-full ">
      <div className="flex gap-3 items-center shrink-0 pr-6">
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={36}
            height={36}
            className="rounded-full"
          />
        </Link>
        <h3 className="text-xl hidden md:block">Poneglyph Docs</h3>
      </div>
      <SearchInput />
      <div className="flex items-center gap-3 pl-6">
        <OrganizationSwitcher
          afterCreateOrganizationUrl={"/"}
          afterLeaveOrganizationUrl="/"
          afterSelectOrganizationUrl={"/"}
          afterSelectPersonalUrl={"/"}
        />
        <UserButton />
      </div>
    </nav>
  );
};
