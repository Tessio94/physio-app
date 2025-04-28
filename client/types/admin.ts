export type Therapist = {
  id: string;
};

export type AdminDodajProps<T = unknown> = {
  variant: string;
  handler?: (e: React.FormEvent<HTMLFormElement>) => void;
  stateValue?: T;
  stateSetter?: (value: T) => void;
  therapists?: Therapist[];
};
