const cardsJugadoresDisponibles = document.querySelector("#cards-disponibles");
const cardsMisJugadores = document.querySelector("#cards-mis-jugadores");
const dineroDisponible = document.querySelector("#dinero-disponible");
const contenedorBotonIniciar = document.querySelector("#contenedor-boton-iniciar");
const seccionMisJugadores = document.querySelector("#seccion-mis-jugadores");
const bannerPartido = document.querySelector("#banner-partido");
const jugadoresLocales = document.querySelector("#jugadores-locales");
const jugadoresVisitantes = document.querySelector("#jugadores-visitantes");
const contenedorVerResultados = document.querySelector("#contenedor-iniciar-partido");
const puntosLocales = document.querySelector("#puntos-locales");
const puntosVisitantes = document.querySelector("#puntos-visitantes");
const contenedorPuntosFecha = document.querySelector("#contenedor-puntos-fecha");
const siguiente = document.querySelector("#contenedor-boton-siguiente");
const ganador = document.querySelector("#ganador");
const contenedorSiguientePartido = document.querySelector("#contenedor-siguiente-partido");
const contenedorBotonEstadisticas= document.querySelector("#contenedor-boton-estadisticas");
const contenedorEstadisticas = document.querySelector("#contenedor-estadisticas");

const bannerVsBrasil = `<img src="./imagenes/banner-vs.jpg" id="banner-vs" width= 350px class="animacionBanner" alt="banner presentación Argentina vs Brasil">`;
const bannerVsAlemania = `<img src="./imagenes/vs-alemania.jpg" id="banner-vs" width= 350px class="animacionBanner" alt="banner presentación Argentina vs Alemania">`;
let cantidadDePartidos = 0;

let miPresupuesto = 4000;
let misPuntosAcumulados = 0;
let partidosGanados = 0;
let partidosPerdidos = 0;
let partidosEmpatados = 0;
const CANTIDAD_DE_JUGADORES_POR_EQUIPO = 4;
const VALOR_JUGADOR_MEDIO = 500;
const PUNTOS_PARTIDO_GANADO = 3;
const PUNTOS_PARTIDO_EMPATADO = 1;
const PUNTAJE_MINIMO_JUGADOR_PREMIUM = 7;

let jugadoresDisponibles = [];

const jugadoresBrasil = [
        {id: 1, nombre: "Dida", img: "https://github.com/Yurakoski/simulador-JS/blob/main/imagenes/dida.jpg?raw=true", puntaje: 0}, 
        {id: 2, nombre: "Kaka", img: "https://github.com/Yurakoski/simulador-JS/blob/main/imagenes/kaka.jpg?raw=true", puntaje: 0},
        {id: 3, nombre: "Ronaldo", img: "https://github.com/Yurakoski/simulador-JS/blob/main/imagenes/ronaldo.jpg?raw=true", puntaje: 0},
        {id: 4, nombre: "Ronaldinho", img: "https://github.com/Yurakoski/simulador-JS/blob/main/imagenes/ronaldinho.jpg?raw=true", puntaje: 0}
    ];

    const jugadoresAlemania = [
        {id: 1, nombre: "Neuer", img: "https://github.com/Yurakoski/simulador-JS/blob/main/imagenes/neuer.jpg?raw=true", puntaje: 0}, 
        {id: 2, nombre: "Muller", img: "https://github.com/Yurakoski/simulador-JS/blob/main/imagenes/muller.jpg?raw=true", puntaje: 0},
        {id: 3, nombre: "Kroos", img: "https://github.com/Yurakoski/simulador-JS/blob/main/imagenes/kroos.jpg?raw=true", puntaje: 0},
        {id: 4, nombre: "Werner", img: "https://github.com/Yurakoski/simulador-JS/blob/main/imagenes/werner.jpg?raw=true", puntaje: 0}
    ];    

let jugadoresPlantel = [];

Swal.fire('Adquiera 4 jugadores para poder comenzar');
cargarJugadores();

function cargarJugadores(){
    fetch('./js/jugadores.json')
    .then((response) => response.json())
    .then((arrayJugadores) => {
        arrayJugadores.forEach((jugador)=>{agregarJugadorADisponibles(jugador)});
    })
    .then(() => {prepararPantallaPrincipal();
    })
}

function prepararPantallaPrincipal(){
    getJugadoresDisponiblesLocalStorage();
    getEquipoLocalStorage();
    getDineroDisponibleLocalStorage();
    mostrarJugadoresDisponibles();
    mostrarJugadoresPlantel();
    mostrarDineroDisponible();
    mostrarBotonIniciar();
    mostrarTituloMisJugadores();
    iniciarSimulador();
}

function mostrarDineroDisponible(){
    dineroDisponible.innerHTML = `<div id="contenedor-dinero" class="text-center">
                                <h4>Dinero Disponible:<br><b>$${miPresupuesto}</b></h4></div>`;
}

function mostrarTituloMisJugadores(){
    seccionMisJugadores.innerHTML= `<h2><b>Mis Jugadores</b></h2>`;
}

function mostrarBotonIniciar() {
    contenedorBotonIniciar.innerHTML = `<button id="boton-iniciar"><h5>INICIAR</h5></button>`;
}

function iniciarSimulador(){
    document.getElementById(`boton-iniciar`).addEventListener("click", () => {
        if(plantelCompleto()){    
            guardarEquipoLocalStorage();
            guardarJugadoresDisponiblesLocalStorage(); 
            guardarDineroDisponibleLocalStorage(); 
            limpiarPantallaPrincipal();
            iniciarPartido(jugadoresBrasil, bannerVsBrasil);
            }else{
                Swal.fire({icon: 'error',
                           text: 'Debe adquirir 4 jugadores para empezar'});
            }})
}

function limpiarPantallaPrincipal(){
    cardsJugadoresDisponibles.innerHTML = "";
    cardsMisJugadores.innerHTML = "";
    dineroDisponible.innerHTML = "";
    contenedorBotonIniciar.innerHTML="";
    seccionMisJugadores.innerHTML="";
}

function iniciarPartido(equipoRival, banner){
            bannerPartido.innerHTML= banner;
            mostrarEquipos(equipoRival);
            contenedorVerResultados.innerHTML = `<button id="resultados">VER RESULTADOS</button>`;
            document.getElementById(`resultados`).addEventListener("click", ()=>{
                contenedorVerResultados.innerHTML = "";
                asignarPuntajeAJugadores(equipoRival);
                cantidadDePartidos ++;
                if(cantidadDePartidos < 2){
                    siguientePartido();
                }else{
                    verEstadisticas();
                }
            })  
}

function siguientePartido(){
    contenedorSiguientePartido.innerHTML= `<button id="siguiente-partido">SIGUIENTE PARTIDO</button>`;
                    document.getElementById(`siguiente-partido`).addEventListener("click", () => {
                                contenedorPuntosFecha.innerHTML ="";
                                ganador.innerHTML = "";
                                contenedorSiguientePartido.innerHTML ="";
                                puntosLocales.innerHTML="";
                                puntosVisitantes.innerHTML="";
                                iniciarPartido(jugadoresAlemania, bannerVsAlemania);
                        })
}

function verEstadisticas(){
    contenedorBotonEstadisticas.innerHTML= `<button id="boton-estadisticas">VER ESTADÍSTICAS</button>`;
    document.getElementById("boton-estadisticas").addEventListener("click", ()=>{
        limpiarPantallaSecundaria();
        contenedorEstadisticas.innerHTML= `<p>Partidos ganados: ${partidosGanados}</p>
                                            <p>Partidos perdidos: ${partidosPerdidos}</p>
                                            <p>Partidos empatados: ${partidosEmpatados}</p>
                                            <h2 class="animacionTexto">PUNTOS OBTENIDOS: ${misPuntosAcumulados}</h2>
                                            <button id="reiniciar-torneo">REINICIAR TORNEO</button>`;
        document.getElementById("reiniciar-torneo").addEventListener("click", ()=>{
                    mostrarDineroDisponible();
                    contenedorEstadisticas.innerHTML ="";
                    dineroDisponible.innerHTML = `<h4>Dinero Disponible: ${miPresupuesto}</h4>`;
                    reiniciarMarcas();
                    cargarJugadores();
         })
    })
}

function limpiarPantallaSecundaria(){
    document.getElementById("contenedor-boton-estadisticas").innerHTML="";
        bannerPartido.innerHTML="";
        jugadoresLocales.innerHTML="";
        jugadoresVisitantes.innerHTML="";
        contenedorPuntosFecha.innerHTML ="";
        ganador.innerHTML = "";
        contenedorSiguientePartido.innerHTML ="";
        puntosLocales.innerHTML="";
        puntosVisitantes.innerHTML="";
}

function reiniciarMarcas(){
    partidosGanados = 0;
    partidosPerdidos = 0;
    partidosEmpatados = 0;
    cantidadDePartidos = 0;
    misPuntosAcumulados = 0;
}

function mostrarEquipos(equipoRival){
    jugadoresLocales.innerHTML = "";
    jugadoresPlantel.forEach((jugador)=>{
        jugadoresLocales.innerHTML += `<li><img src="${jugador.img}"></li>`;
        });
    jugadoresVisitantes.innerHTML="";
    equipoRival.forEach((jugador) => {
            jugadoresVisitantes.innerHTML += `<li><img src="${jugador.img}"></li>`;
        });
}

//El jugador premium (los más caros), obtienen puntajes mayores a 7
function asignarPuntajeAJugadores(equipoRival){
    for(let i=0 ; i<4; i++){
        equipoRival[i].puntaje= obtenerPuntajeRandomPremium(4);
        puntosVisitantes.innerHTML += `<li>${equipoRival[i].puntaje}</li>`;
        (jugadoresPlantel[i].valor > VALOR_JUGADOR_MEDIO) ? jugadoresPlantel[i].puntaje= obtenerPuntajeRandomPremium(4) : jugadoresPlantel[i].puntaje= obtenerPuntajeRandom(11);
        puntosLocales.innerHTML += `<li>${jugadoresPlantel[i].puntaje}</li>`;
        }
        sumarPuntajeJugadores(equipoRival);
}

function sumarPuntajeJugadores(equipoRival){
    siguiente.innerHTML = "";
    puntajeLocalesFecha = jugadoresPlantel.map((jugador) => jugador.puntaje).reduce((acum, elem) => acum + elem, 0);
    puntajeVisitantesFecha = equipoRival.map((jugador) => jugador.puntaje).reduce((acum, elem) => acum + elem, 0);
    mostrarPuntajeJugadores();
}

function mostrarPuntajeJugadores(){
    contenedorPuntosFecha.innerHTML = `<div id="puntos-fecha-locales"></div>
                                       <div id="puntos-fecha-visitantes"></div>`
    document.getElementById("puntos-fecha-locales").innerHTML= puntajeLocalesFecha;
    document.getElementById("puntos-fecha-visitantes").innerHTML= puntajeVisitantesFecha;

    if(puntajeLocalesFecha > puntajeVisitantesFecha){
        misPuntosAcumulados += PUNTOS_PARTIDO_GANADO;
        partidosGanados++;
        ganador.innerHTML = `<img src="https://github.com/Yurakoski/simulador-JS/blob/main/imagenes/win.jpg?raw=true"></img>`
    }else{
        if(puntajeLocalesFecha < puntajeVisitantesFecha){
            ganador.innerHTML = `<img src="https://github.com/Yurakoski/simulador-JS/blob/main/imagenes/lose.jpg?raw=true"></img>`
            partidosPerdidos++;
        }else{
            misPuntosAcumulados += PUNTOS_PARTIDO_EMPATADO;
            partidosEmpatados++;
            ganador.innerHTML = `<img src="https://github.com/Yurakoski/simulador-JS/blob/main/imagenes/empate.jpg?raw=true"></img>`
        }
    }
}

function mostrarJugadoresDisponibles(){ 
    cardsJugadoresDisponibles.innerHTML = "";  
    jugadoresDisponibles.forEach((jugador)=>{ //GENERA LAS CARDS EN EL HTML, Y A CADA BOTON LE ASIGNA UN ID NUMERICO
        const idBoton = `add-player${jugador.id}`
        cardsJugadoresDisponibles.innerHTML += `<li><img src= "${jugador.img}"> 
                                                <b>${jugador.nombre}
                                                <br>$${jugador.valor}</b>
                                                <button id="${idBoton}">Contratar</button></li>`;
        });

    jugadoresDisponibles.forEach( (jugador) => {  //AGREGA LISTENERS A LOS BOTONES AL HACER CLICK
        const idBoton = `add-player${jugador.id}`
        document.getElementById(idBoton).addEventListener("click", () => {
        validarCompra(jugador)});
        })
}

function mostrarJugadoresPlantel(){//GENERA LAS CARDS EN EL HTML, Y A CADA BOTON LE ASIGNA UN ID NUMERICO
    cardsMisJugadores.innerHTML ="";
    jugadoresPlantel.forEach((jugador)=>{
        const idBoton = `remove-player${jugador.id}`;
        cardsMisJugadores.innerHTML += `<li><img src= "${jugador.img}"> 
                                        <b>${jugador.nombre}
                                        <br>$${jugador.valor}</b>
                                        <button id="${idBoton}">Vender</button></li>`;
        });
    
    jugadoresPlantel.forEach( (jugador) => {//AGREGA LISTENERS A LOS BOTONES AL HACER CLICK
            const idBoton = `remove-player${jugador.id}`;
            document.getElementById(idBoton).addEventListener("click", () => {
            venderJugador(jugador.id)});
            });
}

function guardarJugadoresDisponiblesLocalStorage(){
    localStorage.setItem("disponibles", JSON.stringify((jugadoresDisponibles)))
}

function guardarEquipoLocalStorage(){
    localStorage.setItem("equipo", JSON.stringify((jugadoresPlantel)));
}

function guardarDineroDisponibleLocalStorage() {
    localStorage.setItem("miPresupuesto", JSON.stringify(miPresupuesto));
}

function getEquipoLocalStorage(){
    if(localStorage.getItem("equipo")){
        jugadoresPlantel = JSON.parse(localStorage.getItem("equipo"));
    }
}

function getJugadoresDisponiblesLocalStorage(){
    if(localStorage.getItem("disponibles")){
        jugadoresDisponibles = JSON.parse(localStorage.getItem("disponibles"));
        }
}

function getDineroDisponibleLocalStorage(){
    if(localStorage.getItem("miPresupuesto")){
        miPresupuesto = JSON.parse(localStorage.getItem("miPresupuesto"));
        }
}

function venderJugador(idJugador){
    const index = jugadoresPlantel.findIndex(jugador => jugador.id === idJugador);
    if(index !== -1){
        miPresupuesto += jugadoresPlantel[index].valor;
        mostrarDineroDisponible();
        agregarJugadorADisponibles(jugadoresPlantel[index]);
        jugadoresPlantel.splice(index, 1);
        mostrarJugadoresPlantel();
        mostrarJugadoresDisponibles();
    }
}

function agregarJugadorADisponibles(jugador){
    jugadoresDisponibles.push(jugador);
    ordenarJugadoresDisponiblesPorId();
}

function eliminarJugadorDeDisponibles(idJugador){
    const index = jugadoresDisponibles.findIndex(jugador => jugador.id === idJugador);
    if(index !== -1){
        jugadoresDisponibles = jugadoresDisponibles.filter((jugador) => jugador.id !== idJugador);
        mostrarJugadoresDisponibles();
        }else{Swal.fire("No se encontró al jugador seleccionado");}
}

function validarCompra(jugador){
    if (plantelIncompleto()){
        if (tieneDineroSuficienteParaComprar(jugador)){
             eliminarJugadorDeDisponibles(jugador.id);
             completarCompra(jugador);
             mostrarDineroDisponible();
            }else{Swal.fire({icon: 'error',
                           text: 'Su saldo es insuficiente.'});
        }
    }else{Swal.fire({icon: 'error',
                    text: 'Superó el límite de jugadores contratados'});
    }
}

function plantelCompleto(){
    return jugadoresPlantel.length === CANTIDAD_DE_JUGADORES_POR_EQUIPO;
}

function plantelIncompleto(){
    return jugadoresPlantel.length < CANTIDAD_DE_JUGADORES_POR_EQUIPO;
}

function tieneDineroSuficienteParaComprar(jugador){
    return miPresupuesto >= jugador.valor;
}

function completarCompra(jugador){
    miPresupuesto -= jugador.valor;
    jugadoresPlantel.push(jugador);
    mostrarJugadoresPlantel();
}

function ordenarJugadoresDisponiblesPorId(){
    jugadoresDisponibles.sort(function(a, b) {
        return a.id-b.id});
 }

function obtenerPuntajeRandom(max) {
    return Math.floor(Math.random() * max);
}

function obtenerPuntajeRandomPremium(max) {
    return Math.floor(Math.random() * max + PUNTAJE_MINIMO_JUGADOR_PREMIUM);
}