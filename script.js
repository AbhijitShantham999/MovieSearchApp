document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector("#search_input");
  const btn = document.querySelector("button");
  const movie_ctn = document.querySelector(".movie-container");
  const h2 = document.querySelector("h2");

  btn.addEventListener("click", (e) => {
    e.preventDefault();

    const movieName = input.value.trim();
    if (movieName != "") {
      h2.innerHTML = "Loading.......";
      movie_ctn.innerHTML = "";
      getmovieinfo(movieName);
    } else {
      movie_ctn.innerHTML = "<h2>Enter Movie Name</h2>";
    }
  });
  // <h2></h2>;
  // ------------Function to get Data from API--------------------
  const getmovieinfo = async (movie) => {
    const MyApiKey = "ebb42431";
    const url = `https://www.omdbapi.com/?apikey=${MyApiKey}&t=${movie}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      console.log(data); // Log response to debug

      if (data.Response === "True") {
        h2.innerHTML = ""; // Clear "Loading..." or error message
        showMovieInfo(data);
      } else {
        movie_ctn.innerHTML = ""; // Clear movie container if no data is found
        movie_ctn.innerHTML = `<h2>${data.Error}</h2>`; // Display "Movie Not Found" message if no result
      }
    } catch (error) {
      movie_ctn.innerHTML = "An error occurred. Please try again later.";
      console.error("Error fetching movie data:", error);
    }
  };

  // ------------Function to Display Data in Movie-container Div--------------------

  const showMovieInfo = async (data) => {
    movie_ctn.innerHTML = "";
    // destructing data object
    const {
      Title,
      Year,
      Runtime,
      Genre,
      Director,
      Actors,
      Plot,
      Language,
      imdbRating,
      Poster,
      Type,
    } = data;

    // --------------- Movie info div --------------------
    const movieInfo = document.createElement("div");
    movieInfo.classList.add("movie-info");

    // --------------- Movie info div----->Movie Hero div --------------------

    const movieHero = document.createElement("div");
    movieHero.classList.add("movie-hero");
    movieHero.innerHTML = `    <h2>${Title}</h2>
                               <p><span>ImdbRating</span> : ${imdbRating}</p>`;

    // ------- Movie info div----->Movie Hero div----->Movie Hero Year div  --------------------

    const movieHeroYear = document.createElement("div");
    movieHeroYear.classList.add("movie-hero-year");
    movieHeroYear.innerHTML = `<p><span>Year</span> : ${Year}</p>
                            <p><span>Runtime</span> : ${Runtime}</p>`;

    // --------------- Movie info div----->Movie Poster div --------------------

    const moviePoster = document.createElement("div");
    moviePoster.innerHTML = `<img src="${Poster}" alt="${Title} Poster" />`;
    moviePoster.classList.add("movie-poster");

    // --------------- Movie info div----->Movie Genre div --------------------

    const movieGenre = document.createElement("div");
    movieGenre.classList.add("movie-genre");

    Genre.split(",").forEach((element) => {
      const p = document.createElement("p");
      p.innerHTML = element;
      movieGenre.appendChild(p);
    });
    // --------------- Movie info div----->Movie deatails div --------------------

    const movieDetails = document.createElement("div");
    movieDetails.classList.add("movie-details");
    movieDetails.innerHTML = `<p><span>Type</span> : ${Type}
    <p><span>Directors</span> : ${Director}</p>
                            <p><span>Actors</span> : ${Actors}</p>
                            <p><span>Plot</span> : ${Plot}</p>
                            <p><span>Language</span> : ${Language}</p>`;

    // ---------------Appending all Child div's to Movie info div---------------------
    movie_ctn.appendChild(moviePoster);

    movieHero.appendChild(movieHeroYear);
    movieInfo.appendChild(movieHero);

    movieInfo.appendChild(movieGenre);

    movieInfo.appendChild(movieDetails);

    movie_ctn.appendChild(movieInfo);
  };
});
