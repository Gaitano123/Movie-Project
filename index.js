let favouriteFilms = []

document.addEventListener('DOMContentLoaded', () => {

    const resultContainer = document.getElementById('search-result');
    const detailContainer = document.getElementById('detail-movie')
    const form =  document.querySelector('form')
    const favouritecontainer = document.getElementById('favourite-movie')
    displayFavouriteMovie()

    form.addEventListener('submit', (e) => {
        e.preventDefault()

        const movieInput = document.getElementById('search-movie')
        const movieResult = movieInput.value

        fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=5155ad88&s=${movieResult}`)
        .then(response => response.json())
        .then(movies => movies.Search.forEach(movie => displayMovie(movie)))

        resultContainer.innerHTML= ''
        detailContainer.innerHTML = ''
    })

    function displayMovie(movie){
        const movieContainer = document.createElement('div')
        movieContainer.className="movie-container"
        movieContainer.addEventListener('click', () => hoveringMovie(movie.imdbID))
        resultContainer.appendChild(movieContainer)

        const moviePoster = document.createElement('img')
        moviePoster.src = movie.Poster;
        moviePoster.className="movie-poster"
        movieContainer.appendChild(moviePoster)

        const movieTitle = document.createElement('p');
        movieTitle.innerText = movie.Title
        movieTitle.className="movie-title"
        movieContainer.appendChild(movieTitle)

        const movieType = document.createElement('p')
        movieType.innerText = "Type: " + movie.Type;
        movieType.className="movie-type"
        movieContainer.appendChild(movieType)

        const movieId = movie.imdbID;

        const movieYear = document.createElement('p');
        movieYear.innerText = "Year: " + movie.Year;
        movieYear.className="movie-year"
        movieContainer.appendChild(movieYear)

        const movieButton = document.createElement('button');
        movieButton.innerText = 'favourites';
        movieButton.className="movie-button";
        movieButton.addEventListener('click', () => {
            addFavouriteMovie(movie)
        })
        movieContainer.appendChild(movieButton)
        
        const movieTrailer = document.createElement('a')
        const filmName = movie.Title
        movieTrailer.href = `https://www.youtube.com/results?search_query=${filmName}+trailer`
        movieTrailer.target = "_blank"
        movieTrailer.innerText = 'trailer';
        // <iframe width="853" height="480" src="https://www.youtube.com/embed/gaBdgu00otE" title="Ip Man 2: Legend of the Grandmaster OFFICIAL TRAILER" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        movieTrailer.className="movie-trailer"
        movieContainer.appendChild(movieTrailer)

        // const movieVideo = document.createElement('iframe')
        // movieVideo.src = `https://www.youtube.com/embed/gaBdgu00otE`
        // movieVideo.className = "movie-video"
        // movieVideo.innerText= "Movie"
        // movieContainer.appendChild(movieVideo)

        return movieId
    }

    
})
