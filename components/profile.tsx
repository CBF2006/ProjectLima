"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Profile = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && (!isSignedIn || !user)) {
      router.push("/");
    }
  }, [isLoaded, isSignedIn, user, router]);

  if (!isLoaded) return <Loader className="animate-spin w-5 h-5 text-muted-foreground" />;

  if (!isSignedIn || !user) {
    return null;
  }

  return (
    <div className="border-2 rounded-xl p-4 space-y-4 max-w-md mx-auto">
      <div className="flex items-center space-x-4">
        <img
          src={user.imageUrl}
          alt="User"
          className="w-16 h-16 rounded-full"
        />
        <div>
          <h1 className="text-xl font-bold">{user.fullName || user.firstName || "User"}</h1>
          <h3 className="text-lg text-gray-600">
            {user.username || user.firstName || "User"}
          </h3>
        </div>
      </div>

      <Button variant="primary" size="lg">
        Edit Profile
      </Button>

      <Button 
        variant="ghost" 
        size="lg"
        >
        Manage Account
      </Button>
    </div>
  );
};

export default Profile;
