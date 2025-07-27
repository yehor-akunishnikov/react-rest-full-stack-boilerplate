declare namespace Express {
  interface Locals {
    authData: {
      userId: string;
      memberKind: "ADMIN" | "COMMON";
    };
  }
}
