let pagina = 1;
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');

btnAnterior.addEventListener('click', () => {
    if(pagina > 1){
        pagina --;
        cargarPeliculas();
    }
})


btnSiguiente.addEventListener('click', () => {
    if(pagina < 1000){
        pagina ++;
        cargarPeliculas();
    }
})


const cargarPeliculas = async() => {

    try {
        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=4a4f56bd19d916b848ff5fa1af495610&language=es-ES&page=${pagina}`);
    
        console.log(respuesta);

        if(respuesta.status === 200) {

            const datos = await respuesta.json();

            let peliculas = '';

            datos.results.forEach(pelicula => {
                peliculas += `
                    <div class="pelicula">
                        <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
                        <h3 class="titulo">${pelicula.title}</h3>
                    </div>
                `;
            });

            document.getElementById('contenedor').innerHTML = peliculas;

        }else if(respuesta.status === 401){
            console.log('Key no existente/errónea');
        }else if(respuesta.status === 404){
            console.log('La película que buscas no existe');
        }else{
            console.log('Hubo un error y no sabemos qué pasó')
        }


    } catch(error){
        console.log(error);
    }

}

cargarPeliculas();