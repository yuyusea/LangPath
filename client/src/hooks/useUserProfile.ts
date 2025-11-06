import { useState, useEffect } from "react";

const PROFILE_ID_KEY = "langpath_profile_id";

export function useUserProfile() {
  // Read from localStorage synchronously to avoid redirect issues
  const [profileId, setProfileId] = useState<string | null>(() => {
    return localStorage.getItem(PROFILE_ID_KEY);
  });

  const saveProfileId = (id: string) => {
    localStorage.setItem(PROFILE_ID_KEY, id);
    setProfileId(id);
  };

  const clearProfileId = () => {
    localStorage.removeItem(PROFILE_ID_KEY);
    setProfileId(null);
  };

  return {
    profileId,
    saveProfileId,
    clearProfileId,
    hasProfile: !!profileId,
  };
}
