import mongoose from "npm:mongoose@8.4.3";
import { Film } from "../types.ts";

const Schema = mongoose.Schema;
const FilMSchema = new Schema({
  name: { type: String, required: true },
  director: { type: Schema.Types.ObjectId, required: true, ref: "Director" },
}, { timestamps: true });

export type FilmModelType =
  & mongoose.Document
  & Omit<Film, "id" | "director">
  & { director: mongoose.Types.ObjectId };

// validate if exists Director
FilMSchema.path("director").validate(
  async function (value: mongoose.Types.ObjectId) {
    if (value === this.director) {
      return true;
    }

    const director = await mongoose.models.director.findById(value);
    if (!director) {
      throw new Error(`Director not founded with id ${value}`);
    }
    return true;
  },
);

export const FilmModel = mongoose.model<FilmModelType>(
  "Film",
  FilMSchema,
);
