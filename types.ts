export type Film = {
  id: string;
  name: string;
  director: Director;
};

export type Director = {
  id: string;
  name: string;
  films: Film[];
};
