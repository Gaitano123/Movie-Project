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
        movieTrailer.className="movie-trailer"
        movieContainer.appendChild(movieTrailer)

        return movieId
    }

    function addFavouriteMovie(movie){
        if(!favouriteFilms.includes(movie.imdbID)){
            fetch('http://localhost:3000/favourites', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(movie)
            })
            displayFavouriteMovie()
        }

    }

    function displayFavouriteMovie(){
        favouritecontainer.innerText=''

        fetch('http://localhost:3000/favourites')
        .then(response => response.json())
        .then(data => {
            data.forEach(movie =>{
                const favouritePack = document.createElement("div")
                favouritePack.className = "favourite-pack"
                favouritePack.addEventListener("click", () =>{
                    removeFavourite(movie.id)
                })
                favouritecontainer.appendChild(favouritePack)
        
                const favouritePoster = document.createElement('img')
                favouritePoster.src = movie.Poster;
                favouritePoster.className = "favourite-poster"
                favouritePack.appendChild(favouritePoster)
        
                const favouriteTitle = document.createElement('p')
                favouriteTitle.innerText = movie.Title
                favouriteTitle.className = "favourite-title"
                favouritePack.appendChild(favouriteTitle)
        
                const favouriteType = document.createElement('p')
                favouriteType.innerText = movie.Type;
                favouriteType.className = "favourite-type"
                favouritePack.appendChild(favouriteType)
        
                const removeButton = document.createElement('button')
                removeButton.className = "remove-button"
                removeButton.innerText = 'Remove'
                favouritePack.appendChild(removeButton)

                favouriteFilms.push(movie.imdbID)
            })
        })
    }

    function removeFavourite(id){

        fetch(`http://localhost:3000/favourites/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(movie => console.log(movie))
        displayFavouriteMovie()
    }

    
})
