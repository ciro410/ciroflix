const promiseResposta = fetch('https://tmdb-proxy.cubos-academy.workers.dev/3/discover/movie?language=pt-BR&include_adult=false') 

const movies = document.querySelectorAll('movie')

promiseResposta.then((resposta)=>{
    const promiseBody = resposta.json()
    promiseBody.then((body)=>{

        movies.forEach((movie)=>{
            movie.style.backgroundImage =  "url('https://image.tmdb.org/t/p/original/wTS3dS2DJiMFFgqKDz5fxMTri.jpg')";
        })
    })

    
})







const closeButton = document.querySelector('.modal-close');
const modal = document.querySelector('.modal')

closeButton.addEventListener('click',()=>{
    modal.classList.add('hidden')
})