import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNDQ4OWEyNzUxNDc4YzU4MmNlZjc1NzI2NThlOGU2MSIsInN1YiI6IjY0ZGZiZDIwZDEwMGI2MTRiMmYwMWIyZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.s2CjVLc8fw5I-ou9BGiATa6J6H0gh_L6qCpn7L4Z2lQ",
  },
});

export default api