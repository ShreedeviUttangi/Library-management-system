export type UserRole = "Student" | "Employee" | "Admin";

export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  cover: string;
  status: "Available" | "Borrowed";
  borrowedBy?: string;
  createdAt: string;
}

export interface User {
  role: UserRole;
  name: string;
}
