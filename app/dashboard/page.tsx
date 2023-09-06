import Navbar from "@/components/base/Navbar";
import Toast from "@/components/base/Toast";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { getImageUrl } from "@/lib/utils";
import DeleteHomebtn from "@/components/DeleteHomebtn";
import Link from "next/link";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
export default async function Dashboard() {
  const serverSupabase = createServerComponentClient({ cookies });
  const { data: user } = await serverSupabase.auth.getUser();
  const { data: homes } = await serverSupabase
    .from("homes")
    .select("id ,image ,title ,country ,city ,price ,created_at")
    .eq("user_id", user.user?.id);
  return (
    <div>
      <Navbar />
      <Toast />
      <div className="container mt-5">
        {homes && homes.length > 0 && (
          <Table>
            <TableCaption>Your added Airbnb Homes.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Country</TableHead>
                <TableHead>City</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {homes.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.country}</TableCell>
                  <TableCell>{item.city}</TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>
                    <Image
                      src={getImageUrl(item.image)}
                      width={40}
                      height={40}
                      alt="Home_img"
                      className="rounded-full w-10 h-10"
                    />
                  </TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <DeleteHomebtn id={item.id} />
                      <Link href={`/home/${item.id}`}>
                        <Button size="icon" className="bg-green-400">
                          <Eye />
                        </Button>
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        {homes && homes.length < 1 && (
          <h1 className="text-center font-bold text-xl">
            No Home found. Please add your home
          </h1>
        )}
      </div>
    </div>
  );
}
