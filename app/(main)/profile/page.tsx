"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/learn"); // Redirect to the "learn" page
  };

  return (
    <div>
      <h1>Profile Page</h1>
      <p>This is the profile page.</p>
      <Button 
        variant="primary" 
        size="lg"
        onClick={handleRedirect}
      >
        Back to Learn
      </Button>
    </div>
  );
};

export default ProfilePage;