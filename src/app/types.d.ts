import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string | null; // Add the role property here
      department?: string | null; // Add the role property here
      status?: string | null;
    };
  }
}
