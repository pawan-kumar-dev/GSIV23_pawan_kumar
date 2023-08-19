import { get } from "./lodash";

const getDirector = (crew = []) => {
      const director = crew.find(
        (crew) => get(crew, "job", "").toLowerCase() === "director"
      );
     return get(director, 'name') || ''
}

const getCast = (casts = []) => {
  const castString = casts
    .slice(0, 5)
    .map((cast) => get(cast, "name"))
    .join(", ");
  return castString
};

const getReleaseYear = (releaseDate) => new Date(releaseDate).getFullYear();

export { getDirector, getCast, getReleaseYear };