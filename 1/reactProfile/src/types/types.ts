import type { ReactNode } from "react";

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export type ApiResponse = User[];

export type ProfileProps = {
  username: string;
  children: (
    user: User | null,
    state: { isLoading: boolean; error: Error | null },
  ) => ReactNode;
};

export type BadgeProps = {
  info: User;
};
