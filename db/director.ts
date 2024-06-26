import mongoose from "npm:mongoose@8.4.3";
import { Director } from "../types.ts";
import { FilmModelType } from "./film.ts";

const Schema = mongoose.Schema;
const DirectorSchema = new Schema({
  name: { type: String, required: true },
}, { timestamps: true });

export type DirectorModelType =
  & mongoose.Document
  & Omit<Director, "id" | "films">
  & { director: mongoose.Types.ObjectId };

// validate if exists Director
DirectorSchema.post("findOneAndDelete", async function (doc: FilmModelType) {
  await mongoose.models.Film.deleteMany({ director: doc._id });
});

export const DirectorModel = mongoose.model<FilmModelType>(
  "Director",
  DirectorSchema,
);
