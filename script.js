const root = document.querySelector('body')
const movies = document.querySelector('.movies')
const closeButton = document.querySelector('.modal-close');
const modal = document.querySelector('.modal')
const modalTitle = document.querySelector('.modal__title')
const modalImg = document.querySelector('.modal__image')
const modalDescription = document.querySelector('.modal__description')
const modalGenres = document.querySelector('.modal__genres')
const modalRating = document.querySelector('.modal__rating')
const leftBtn = document.querySelector('.left-button');
const rightBtn = document.querySelector('.right-button');
const searchInput = document.querySelector('.search');
const highlightMovie = document.querySelector('.highlight__movie')
const highlightVideoLink = document.querySelector('.highlight__video-link')
const highlightVideo = document.querySelector('.highlight__video')
const highlightTitle = document.querySelector('.highlight__title')
const highlightRating = document.querySelector('.highlight__rating')
const highlightGenres = document.querySelector('.highlight__genres')
const highlightLaunch = document.querySelector('.highlight__launch')
const highlightDescription = document.querySelector('.highlight__description')
const btnTheme = document.querySelector('.btn-theme');
const dark = document.querySelector('.dark');






let currentPage = 0;
let currentMovies = [];
let moviesNumber = 5;
let currentTheme  =  'light'

if (window.screen.width < 400){
    moviesNumber = 1;
    highlightMovie.classList.remove('row');
    highlightVideo.style.width = '350px'
    dark.style.width = '350px';
    searchInput.style.width  = '350px';
    modalImg.style.width = '350px'
    modalDescription.style.width = '350px';

}else{
    moviesNumber = 5
}


closeButton.addEventListener('click', () => {
    modal.classList.add('hidden')
    root.style.overflow = 'scroll';
})



leftBtn.addEventListener('click', () => {
    if (currentPage === 0) {
        currentPage = 10;
    } else {
        currentPage--;
    }

    displayMovies();

});

rightBtn.addEventListener('click', () => {
    if (currentPage === 10) {
        currentPage = 0;
    } else {
        currentPage++;
    }

    displayMovies();

});


searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        if (searchInput.value) {
            loadSearchMovies(searchInput.value)

        } else {
            loadMovies();
        }

        searchInput.value = ''
    } else {
        currentPage = 0;
        return;
    }




})


btnTheme.addEventListener('click', (event) =>{
    if(currentTheme === 'light'){
        currentTheme = 'dark'
        btnTheme.src = "./assets/dark-mode.svg"
        leftBtn.src = "./assets/seta-esquerda-branca.svg"
        rightBtn.src = "./assets/seta-direita-branca.svg"
        root.style.setProperty('--background-color', '#242424');
        root.style.setProperty('--input-background-color', '#242424')
        root.style.setProperty('--input-border-color', '#fff')
        root.style.setProperty('--text-color', '#fff')
        root.style.setProperty('--highlight-background-color', '#454545')
    }else{
        currentTheme = 'light'
        btnTheme.src = "./assets/light-mode.svg";
        leftBtn.src = "./assets/seta-esquerda-preta.svg"
        rightBtn.src = "./assets/seta-direita-preta.svg"
        root.style.setProperty('--background-color', '#FFFFFF');
        root.style.setProperty('--input-background-color', '#fff');
        root.style.setProperty('--input-border-color', '#979797');
        root.style.setProperty('--text-color', '#000');
        root.style.setProperty('--highlight-background-color', '#fff');
    }
})


function displayMovies() {
    movies.textContent = '';

    for (let i = (currentPage * moviesNumber); i < (currentPage + 1) * moviesNumber; i++) {
        const movieContainer = document.createElement('div')
        movieContainer.classList.add('movie')
        movieContainer.style.backgroundImage = `url('${currentMovies[i].poster_path}')`;

        movieContainer.addEventListener('click', () => {
            loadMovie(currentMovies[i].id)
        })

        const movieInfo = document.createElement('div')
        movieInfo.classList.add('movie__info')

        const movieTitle = document.createElement('span')
        movieTitle.classList.add('movie__title')
        movieTitle.textContent = currentMovies[i].title

        const movieRating = document.createElement('span')
        movieRating.classList.add('movie__rating')
        movieRating.textContent = currentMovies[i].vote_average


        const starImage = document.createElement('img')
        starImage.src = "./assets/estrela.svg";




        movieRating.append(starImage)
        movieInfo.append(movieTitle, movieRating)
        movieContainer.append(movieInfo)
        movies.append(movieContainer)




    };
}


function loadMovies() {

    const promiseResposta = fetch('https://tmdb-proxy.cubos-academy.workers.dev/3/discover/movie?language=pt-BR&include_adult=false');

    promiseResposta.then((resposta) => {

        const promiseBody = resposta.json();

        promiseBody.then((body) => {

            currentMovies = body.results;
            displayMovies()



        })
    })
}

function loadSearchMovies(search) {

    const promiseResposta = fetch(`https://tmdb-proxy.cubos-academy.workers.dev/3/search/movie?language=pt-BR&include_adult=false&query=${search}`);

    promiseResposta.then((resposta) => {

        const promiseBody = resposta.json();

        promiseBody.then((body) => {

            currentMovies = body.results;
            displayMovies()



        })
    })
}


function loadHighLightMovie() {

    const promiseResposta = fetch('https://tmdb-proxy.cubos-academy.workers.dev/3/movie/436969?language=pt-BR');

    promiseResposta.then((resposta) => {

        const promiseBody = resposta.json();

        promiseBody.then((body) => {
            highlightVideo.style.backgroundImage = `url('${body.backdrop_path}')`;
            highlightTitle.textContent = body.title;
            highlightRating.textContent = body.vote_average;
            highlightGenres.textContent = body.genres.map((genre) => { return genre.name }).join(', ')
            highlightLaunch.textContent = (new Date(body.release_date)).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })
            highlightDescription.textContent = body.overview






        })
    })

    const promiseRespostaLink = fetch('https://tmdb-proxy.cubos-academy.workers.dev/3/movie/436969/videos?language=pt-BR');

    promiseRespostaLink.then((resposta) => {

        const promiseBody = resposta.json();

        promiseBody.then((body) => {
            highlightVideoLink.href = `https://www.youtube.com/watch?v=${body.results[0].key}`;
        })
    })

}


function loadMovie(id) {
    modal.classList.remove('hidden');
    root.style.overflow = 'hidden';
    modal.style.overflowY = 'scroll';

    const promiseResposta = fetch(`https://tmdb-proxy.cubos-academy.workers.dev/3/movie/${id}?language=pt-BR`);

    promiseResposta.then((resposta) => {

        const promiseBody = resposta.json();

        promiseBody.then((body) => {

            modalTitle.textContent = body.title
            modalImg.src = body.backdrop_path
            modalDescription.textContent = body.overview
            modalRating.textContent = body.vote_average;

            
            modalGenres.textContent = ''

            body.genres.forEach((genre) => {
                const modalGenre = document.createElement('span');
                
                
                modalGenre.textContent = genre.name
                modalGenre.classList.add('modal__genre')
                modalGenre.classList.add('mr-12')

                modalGenres.append(modalGenre)

            });



        })
    })
}




loadMovies();
loadHighLightMovie()


