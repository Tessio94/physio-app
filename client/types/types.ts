export type Therapist = {
  therapistId: number;
  therapistIcon: string;
  therapistName: string;
  therapistLastname: string;
};

export type Service = {
  serviceIcon: string;
  serviceName: string;
};

export type PopupData = {
  therapists: number[];
  time: string;
  date: string;
};

export type ReservationData = {
  therapistId: number;
  time: string;
  date: string;
};

export type ServiceDetails = {
  therapists: Therapist[];
  services: Service[];
};
