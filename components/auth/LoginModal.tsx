"use client";
import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { X } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginType, loginSchema } from "@/validation/authSchema";
import { Button } from "../ui/button";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import SocialAuth from "./SocialAuth";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function LoginModal() {
  const supabase = createClientComponentClient();
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: yupResolver(loginSchema),
  });
  const onSubmit = async (payload: LoginType) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: payload.email,
      password: payload.password,
    });

    if (error) {
      toast.error(error.message, { theme: "colored" });
    } else if (data.user) {
      setOpen(false);
      router.refresh();
      toast.success("Logged in successfully!", { theme: "colored" });
    }
  };
  return (
    <>
      <ToastContainer />
      <AlertDialog open={open}>
        <AlertDialogTrigger asChild>
          <li
            className="mb-2 hover:bg-gray-200 rounded-md p-2 cursor-pointer"
            onClick={() => setOpen(true)}
          >
            Login
          </li>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle asChild>
              <div className="flex justify-between items-center">
                <span>Login</span>
                <X onClick={() => setOpen(false)} className="cursor-pointer" />
              </div>
            </AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <h1 className="text-lg font-bold">Welcome to Airbnb</h1>

                  <div className="mt-5">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      id="email"
                      {...register("email")}
                    />
                    <span className="text-red-400">
                      {errors.email?.message}
                    </span>
                  </div>
                  <div className="mt-5">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      placeholder="Enter your password"
                      type="password"
                      id="password"
                      {...register("password")}
                    />
                    <span className="text-red-400">
                      {errors.password?.message}
                    </span>
                  </div>

                  <div className="mt-5">
                    <Button className="w-full bg-brand">Continue</Button>
                  </div>
                  <div className="text-center py-2 text-lg font-bold text-black">
                    -- OR --
                  </div>
                </form>
                <SocialAuth />
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
