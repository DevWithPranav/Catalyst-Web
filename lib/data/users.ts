export type User = {
  id: string;
  email: string;
  role: string;
  createdAt: string;
};

export const users: User[] = [
  {
    id: "u1",
    email: "alice@test.com",
    role: "editor",
    createdAt: "2024-08-12",
  },
  {
    id: "u2",
    email: "bob@test.com",
    role: "viewer",
    createdAt: "2024-09-01",
  },
];
