import React from "react";
import Image from "next/image";
import { getImageUrl } from "@/lib/utils";
import Link from "next/link";

export default function HomeCard({ home }: { home: any }) {
  return (
    <Link href={`/home/${home.id}`}>
      <div className="text-start">
        <Image
          src={getImageUrl(home.image)}
          width={100}
          height={100}
          alt={home.title}
          className="w-full h-[300px] rounded-xl object-cover object-center"
          unoptimized
        />
        <p className="font-semibold">
          {home.city}, {home.country}
        </p>
        <p>{home.title}</p>
        <p>{home.price}</p>
      </div>
    </Link>
  );
}
