import { useUser } from "@clerk/nextjs";

export function useAuthorization() {
  const { user, isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return { user: null, isLoading: true, isSignedIn: false };
  }

  if (!isSignedIn) {
    return { user: null, isLoading: false, isSignedIn: false };
  }

  return { user, isLoading: false, isSignedIn: true };
}
