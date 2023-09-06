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
import { RegisterType, registerSchema } from "@/validation/authSchema";
import { Button } from "../ui/button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import SocialAuth from "./SocialAuth";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
export default function SignupModal() {
  const supabase = createClientComponentClient();
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterType>({
    resolver: yupResolver(registerSchema),
  });
  const onSubmit = async (payload: RegisterType) => {
    const { data, error } = await supabase.auth.signUp({
      email: payload.email,
      password: payload.password,
      options: {
        data: {
          name: payload.name,
        },
      },
    });

    if (error) {
      toast.error(error.message, { theme: "colored" });
    } else if (data.user) {
      await supabase.auth.signInWithPassword({
        email: payload.email,
        password: payload.password,
      });
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
            Sign up
          </li>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle asChild>
              <div className="flex justify-between items-center">
                <span>Sign up</span>
                <X onClick={() => setOpen(false)} className="cursor-pointer" />
              </div>
            </AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <h1 className="text-lg font-bold">Welcome to Airbnb</h1>
                  <div className="mt-5">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      placeholder="Enter your name"
                      id="name"
                      {...register("name")}
                    />
                    <span className="text-red-400">{errors.name?.message}</span>
                  </div>
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
                    <Label htmlFor="cpassword">Confirm Password</Label>
                    <Input
                      placeholder="Enter your cpassword"
                      type="password"
                      id="cpassword"
                      {...register("password_confirmation")}
                    />
                    <span className="text-red-400">
                      {errors.password_confirmation?.message}
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
