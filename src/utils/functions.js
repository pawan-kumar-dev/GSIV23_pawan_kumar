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


const convertToHHMM = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes =
    remainingMinutes < 10 ? `0${remainingMinutes}` : remainingMinutes;

  return `${formattedHours}:${formattedMinutes}`;
};

export { getDirector, getCast, getReleaseYear, convertToHHMM };