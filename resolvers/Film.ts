import { GraphQLError } from "graphql";
import { FilmModel, FilmModelType } from "../db/film.ts";
import { DirectorModel, DirectorModelType } from "../db/director.ts";

export const Film = {
  director: async (parent: FilmModelType): Promise<DirectorModelType> => {
    const director = await DirectorModel.findById(parent.director).exec();
    if (!director) {
      throw new GraphQLError(`No driector with id ${parent.director}`, {
        extensions: { code: "NOT FOUND" },
      });
    }
    return director;
  },
};
