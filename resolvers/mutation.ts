import mongoose from "npm:mongoose@8.4.3";
import { FilmModel, FilmModelType } from "../db/film.ts";
import { GraphQLError } from "graphql";
import { DirectorModel, DirectorModelType } from "../db/director.ts";
export const Mutation = {
  addFilm: async (
    _: unknown,
    args: { name: string; director: string },
  ): Promise<FilmModelType> => {
    const Film = {
      name: args.name,
      director: new mongoose.Types.ObjectId(args.director),
    };
    const newFilm = await FilmModel.create(Film);
    return newFilm;
  },

  deleteFilm: async (
    _: unknown,
    args: { id: string },
  ): Promise<FilmModelType> => {
    const film = await FilmModel.findByIdAndDelete(args.id);
    if (!film) {
      throw new GraphQLError(`No film found with id ${args.id}`, {
        extensions: { code: "NOT FOUND " },
      });
    }
    return film;
  },

  updateFilm: async (
    _: unknown,
    args: { id: string; name: string; director: string },
  ): Promise<FilmModelType> => {
    const film = await FilmModel.findByIdAndUpdate(args.id, {
      name: args.name,
      director: args.director,
    }, { new: true, runValidators: true });
    if (!film) {
      throw new GraphQLError(`No film found with id ${args.id}`, {
        extensions: { code: "NOT FOUND " },
      });
    }
    return film;
  },

  addDirector: async (
    _: unknown,
    args: { name: string },
  ): Promise<DirectorModelType> => {
    const Director = {
      name: args.name,
    };
    const newDirector = await DirectorModel.create(Director);
    return newDirector;
  },

  deleteDirector: async (
    _: unknown,
    args: { id: string },
  ): Promise<DirectorModelType> => {
    const director = await DirectorModel.findByIdAndDelete(args.id);
    if (!director) {
      throw new GraphQLError(`No director found with id ${args.id}`, {
        extensions: { code: "NOT FOUND " },
      });
    }
    return director;
  },

  updateDirector: async (
    _: unknown,
    args: { id: string; name: string },
  ): Promise<DirectorModelType> => {
    const director = await DirectorModel.findByIdAndUpdate(args.id, {
      name: args.name,
    }, { new: true, runValidators: true });
    if (!director) {
      throw new GraphQLError(`No director found with id ${args.id}`, {
        extensions: { code: "NOT FOUND " },
      });
    }
    return director;
  },
};
