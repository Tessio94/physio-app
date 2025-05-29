export type Therapist = {
  id: string;
};

export type Admin = {
  adminId: number;
  name: string;
  lastname: string;
  icon: string;
  superadmin: boolean;
};

export type AdminDodajProps<T = unknown> = {
  variant: string;
  handler?: (e: React.FormEvent<HTMLFormElement>) => void;
  stateValue?: T;
  stateSetter?: (value: T) => void;
  therapists?: Therapist[];
};
