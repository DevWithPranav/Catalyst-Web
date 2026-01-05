let signedIn = false;

export function fakeSignIn() {
  signedIn = true;
}

export function fakeSignOut() {
  signedIn = false;
}

export function getCurrentUser() {
  if (!signedIn) return null;

  return {
    id: "admin_001",
    email: "admin@local.dev",
    role: "admin",
  };
}
