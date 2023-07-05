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
        movieContainer.addEventListener('mouseover', (event) => {
            if(event.target.OffsetParent = resultContainer){
                event.preventDefault()
                hoveringMovie(movie.imdbID)
                const { clientX: mouseX, clientY: mouseY} = event
                detailContainer.style.left = `${mouseX}px`
                detailContainer.style.top = `${mouseY}px`
                detailContainer.innerHTML = ''
    
                detailContainer.classList.add("visible")
            }
        })
        movieContainer.addEventListener('mouseout', (event) => {
                event.preventDefault()
                hoveringMovie(movie.imdbID)
                const { clientX: mouseX, clientY: mouseY} = event
                detailContainer.style.left = `${mouseX}px`
                detailContainer.style.top = `${mouseY}px`
                detailContainer.innerHTML = ''
        })
        // movieContainer.addEventListener('mouseover',(event) => {
        //     if(event.target.offsetParent != resultContainer){
        //         resultContainer.classList.remove("visible")
        //     }
        // })
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

        const breakSection = document.createElement('p')
        movieContainer.appendChild(breakSection)

        const movieTrailer = document.createElement('a')
        const filmName = movie.Title
        movieTrailer.href = `https://www.youtube.com/results?search_query=${filmName}+trailer`
        movieTrailer.target = "_blank"
        movieTrailer.innerHTML = `<button class="trailer-button"><i class="fa fa-play-circle" aria-hidden="true"></i></button>`
        movieTrailer.className="movie-trailer"
        breakSection.appendChild(movieTrailer)

        const movieButton = document.createElement('button');
        movieButton.innerText = 'favourites';
        movieButton.className="movie-button";
        movieButton.addEventListener('click', () => {
            addFavouriteMovie(movie)
        })
        movieContainer.appendChild(movieButton)

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

    function hoveringMovie(movieId){
        fetch(`https://www.omdbapi.com/?apikey=5155ad88&i=${movieId}`)
        .then(res => res.json())
        .then(details => displayDetails(details))
    }

    function displayDetails(detail){
        
        const infoContainer = document.createElement('div')
        infoContainer.className = 'info-container'
        detailContainer.appendChild(infoContainer)

        const infoTitle = document.createElement('p')
        infoTitle.innerText ="Title: " + detail.Title
        infoTitle.className = 'info-title'
        infoContainer.appendChild(infoTitle)

        const infoYear = document.createElement('p')
        infoYear.innerText ="Year: " + detail.Year
        infoYear.className = 'info-year'
        infoContainer.appendChild(infoYear)

        const infoGenre = document.createElement('p')
        infoGenre.innerText ="Genre: " + detail.Genre
        infoGenre.className = 'info-Genre'
        infoContainer.appendChild(infoGenre)

        const infoRuntime = document.createElement('p')
        infoRuntime.innerText ="Runtime: " + detail.Runtime
        infoRuntime.className = 'info-Runtime'
        infoContainer.appendChild(infoRuntime)

        const infoActor = document.createElement('p')
        infoActor.innerText ="Actors: " + detail.Actors
        infoActor.className = 'info-Actor'
        infoContainer.appendChild(infoActor)

        const infoDirector = document.createElement('p')
        infoDirector.innerText ="Director: " + detail.Director
        infoDirector.className = 'info-Director'
        infoContainer.appendChild(infoDirector)

        const infoPlot = document.createElement('p')
        infoPlot.innerText = detail.Plot
        infoPlot.className ="Plot: " + 'info-Plot'
        infoContainer.appendChild(infoPlot)

        const infoCountry = document.createElement('p')
        infoCountry.innerText = detail.Country
        infoCountry.className ="Country: " + 'info-Country'
        infoContainer.appendChild(infoCountry)

        const infoLanguage = document.createElement('p')
        infoLanguage.innerText ="Language: " + detail.Language
        infoLanguage.className = 'info-Language'
        infoContainer.appendChild(infoLanguage)
    }
})
