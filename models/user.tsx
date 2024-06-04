export type UserType = "masters" | "phd" | "professor" | "professional";
export const userTypeMapper: Record<UserType, string> = {
  masters: "Masters Student",
  phd: "PhD Student",
  professor: "Professor",
  professional: "Professional",
};
