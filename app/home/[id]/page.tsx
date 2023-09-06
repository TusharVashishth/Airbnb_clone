import Navbar from "@/components/base/Navbar";
import React from "react";

import Image from "next/image";
import { getImageUrl } from "@/lib/utils";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export default async function ShowHome({ params }: { params: { id: string } }) {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase
    .from("homes")
    .select("* ,users (metadata->name)")
    .eq("id", params?.id);
  const home: HomesType | null = data?.[0];
  return (
    <div className="mb-10">
      <Navbar />
      <div className="container mt-5">
        {/* Title and Country details */}
        <div>
          <h1 className="text-2xl font-bold">{home?.title}</h1>
          <p>
            {home?.city} , {home?.state} ,{home?.country}
          </p>
        </div>

        <Image
          src={getImageUrl(home?.image)}
          width={100}
          height={100}
          alt="home_img"
          className="w-full rounded-lg h-[500px] object-cover object-center my-5"
          unoptimized
        />
        <h1 className="text-2xl font-bold text-brand">
          Hosted By {home?.users?.name}
        </h1>

        <h1 className="text-xl font-semibold">
          {home?.title} in {home?.city} , {home?.state} ,{home?.country}
        </h1>

        <div
          className="mt-5"
          dangerouslySetInnerHTML={{
            __html: home?.description,
          }}
        ></div>
      </div>
    </div>
  );
}
