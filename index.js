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


})
