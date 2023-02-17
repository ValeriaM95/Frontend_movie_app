const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=249f77f74a3cff2532da3bf70cb40ebf&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w500";
const SEARCH_URL =
  "https://api.themoviedb.org/3/search/movie?api_key=249f77f74a3cff2532da3bf70cb40ebf&query='";

const form = document.getElementById("form");
const search = document.getElementById("search");
const main = document.getElementById("main");

getMovies(API_URL);
async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();
  console.log(data.results);
  displayMovies(data.results);
}

function displayMovies(movies) {
  main.innerHTML = "";
  const moviesContainer = document.createElement("div");
  moviesContainer.classList.add("movies");

  movies.forEach((element) => {
    const { title, poster_path, vote_average, overview } = element;
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
    <img src="${IMG_PATH + poster_path}" alt="${title}" />
    <div class="movie__description">
      <h3>${title}</h3>
      <span class="${setRatingClass(vote_average)}">${vote_average.toFixed(
      1
    )}</span>
    </div>
    <p class="overview">
      ${overview}
    </p>
    `;

    moviesContainer.appendChild(movieEl);
  });
  main.appendChild(moviesContainer);
}

function setRatingClass(vote) {
  if (vote >= 7.5) {
    return "high";
  } else if (vote >= 5) {
    return "middle";
  } else {
    return "low";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;
  if (searchTerm && searchTerm !== "") {
    getMovies(SEARCH_URL + searchTerm);
    search.value = "";
  } else {
    window.location.reload();
  }
});
