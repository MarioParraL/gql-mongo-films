import { GraphQLError } from "graphql";
import { FilmModel, FilmModelType } from "../db/film.ts";
import { DirectorModel, DirectorModelType } from "../db/director.ts";

export const Query = {
  films: async (): Promise<FilmModelType[]> => {
    const films = await FilmModel.find().exec();
    return films;
  },

  film: async (_: unknown, args: { id: string }): Promise<FilmModelType> => {
    const film = await FilmModel.findById(args.id);
    if (!film) {
      throw new GraphQLError(`No film wit id ${args.id}`, {
        extensions: { code: "NOT FOUND " },
      });
    }
    return film;
  },

  directors: async (): Promise<DirectorModelType[]> => {
    const directors = await DirectorModel.find().exec();
    return directors;
  },

  director: async (
    _: unknown,
    args: { id: string },
  ): Promise<DirectorModelType> => {
    const director = await DirectorModel.findById(args.id);
    if (!director) {
      throw new GraphQLError(`No director wit id ${args.id}`, {
        extensions: { code: "NOT FOUND " },
      });
    }
    return director;
  },
};
