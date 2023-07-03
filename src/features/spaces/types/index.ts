export type Space = {
  uuid: string;
  name: string;
  image?: string;
};

export type UpdateSpace = {
  uuid: string;
  name?: string;
  image?: string;
};
