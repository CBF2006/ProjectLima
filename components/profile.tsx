"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

const ProfilePage = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded) return <div>Loading...</div>;
  if (!isSignedIn || !user) return <div>Please sign in to view your profile.</div>;

  return (
    <div className="border-2 rounded-xl p-4 space-y-4 max-w-md mx-auto">
      <div className="flex items-center space-x-4">
        <img
          src={user.imageUrl}
          alt="User profile"
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

export default ProfilePage;
