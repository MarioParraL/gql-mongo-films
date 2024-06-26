import { DirectorModelType } from "../db/director.ts";
import { FilmModel, FilmModelType } from "../db/film.ts";

export const Director = {
  films: async (parent: DirectorModelType): Promise<FilmModelType[]> => {
    const films = await FilmModel.find({ director: parent._id });
    return films;
  },
};
