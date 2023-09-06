import React from "react";
import BrandLogo from "./BrandLogo";
import { Search } from "lucide-react";
import Link from "next/link";
import NavMenu from "./NavMenu";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import SearchPopup from "../common/SearchPopup";

export default async function Navbar() {
  const supabase = createServerComponentClient({ cookies });
  const session = await supabase.auth.getSession();
  return (
    <div>
      <nav className="justify-between items-center md:px-12 py-2 border-b-[1px] flex">
        <div className="hidden md:block">
          <BrandLogo />
        </div>
        <SearchPopup session={session} />
        <div className="hidden md:flex justify-center items-center space-x-4">
          <Link href="/add-home" className="text-sm font-semibold">
            Add you home
          </Link>
          <NavMenu session={session.data?.session} />
        </div>
      </nav>
    </div>
  );
}
