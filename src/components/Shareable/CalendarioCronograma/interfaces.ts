export interface ItemCalendario<T> {
  title: string;
  data: string;
  start: Date;
  end: Date;
  allDay: boolean;
  objeto: T;
}

export interface ParametrosCalendario {
  ano?: number;
  mes?: number;
}
