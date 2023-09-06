import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

export default function SocialAuth() {
  const supabase = createClientComponentClient();
  const { toast } = useToast();

  const githubLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };
  const googleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };
  return (
    <div>
      <Button variant="outline" className="w-full mb-3" onClick={googleLogin}>
        <Image
          src="/images/google.png"
          width={25}
          height={25}
          alt="google"
          className="mr-5"
        />
        Continue with Google
      </Button>
      <Button variant="outline" className="w-full mb-2" onClick={githubLogin}>
        <Image
          src="/images/github.png"
          width={25}
          height={25}
          alt="google"
          className="mr-5"
        />
        Continue with Github
      </Button>
    </div>
  );
}
