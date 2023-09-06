import React from "react";
import BrandLogo from "./BrandLogo";
import { Input } from "../ui/input";
import Link from "next/link";
import NavMenu from "./NavMenu";

export default function SearchPopupNav({
  session,
  searchCallback,
}: {
  session: any;
  searchCallback: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="flex justify-between items-center">
      <div className="hidden md:block">
        <BrandLogo />
      </div>

      <Input
        placeholder="Search by country.."
        className="w-full md:w-1/3 rounded-3xl p-5"
        onChange={searchCallback}
      />
      <div className="hidden md:flex justify-center items-center space-x-4">
        <Link href="/add-home" className="text-sm font-semibold">
          Add you home
        </Link>

        <NavMenu session={session.data?.session} />
      </div>
    </div>
  );
}
