const pantallaInicio = document.querySelector("#pantalla-inicio")
const cardsJugadoresDisponibles = document.querySelector("#cards-disponibles");
const subtituloJugadoresDisponibles = document.querySelector("#subtitulo-jugadores-disponibles");
const cardsMisJugadores = document.querySelector("#cards-mis-jugadores");
const dineroDisponible = document.querySelector("#dinero-disponible");
const subtituloDineroDisponible = document.querySelector("#subtitulo-dinero-disponible");
const botonIniciarCampeonato = document.querySelector("#boton-iniciar");
const seccionDisponibles = document.querySelector("#seccion-disponibles");
const seccionMisJugadores = document.querySelector("#seccion-mis-jugadores");
const pantallaTorneo = document.querySelector("#pantalla-torneo");
const jugadoresLocales = document.querySelector("#jugadores-locales");
const jugadoresVisitantes = document.querySelector("#jugadores-visitantes");
const botonIniciarPartido = document.querySelector("#boton-iniciar-partido");
const contenedorVerResultados = document.querySelector("#contenedor-iniciar-partido");
const puntosLocales = document.querySelector("#puntos-locales");
const puntosVisitantes = document.querySelector("#puntos-visitantes");
const puntosFechaLocales = document.querySelector("#puntos-fecha-locales");
const contenedorPuntosFecha = document.querySelector("#contenedor-puntos-fecha");
const puntosFechaVisitantes = document.querySelector("#puntos-fecha-visitantes");
const siguiente = document.querySelector("#contenedor-boton-siguiente");
const aceptar = document.querySelector("#aceptar");
const ganador = document.querySelector("#ganador");
const contenedorSiguientePartido = document.querySelector("#contenedor-siguiente-partido");
const contenedorPartido = document.querySelector("#contenedor-partido");

const bannerVsBrasil = `<img src="./imagenes/banner-vs.jpg" id="banner-vs" width= 350px>`;
const bannerVsAlemania = `<img src="./imagenes/vs-alemania.jpg" id="banner-vs" width= 350px>`
let cantidadDePartidos = 0;

let miPresupuesto = 4000;
let dineroGastado = 0;
let sumatoriaPuntajeFecha= 0;
let misPuntosAcumulados = 0;
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
//Swal.fire('Adquiera 4 jugadores para poder comenzar');

cargarJugadores();

function cargarJugadores(){
    fetch('./js/jugadores.json')
    .then((response) => response.json())
    .then((arrayJugadores) => {
        arrayJugadores.forEach((jugador)=>{agregarJugadorADisponibles(jugador)})
    })
    .then(() => {prepararPantallaPrincipal();  //Luego de cargar los jugadores disponibles se puede iniciar
    })
}

function prepararPantallaPrincipal(){
    getJugadoresDisponiblesLocalStorage();
    getEquipoLocalStorage();
    getDineroDisponibleLocalStorage();
    mostrarJugadoresDisponibles();
    mostrarJugadoresPlantel();
    mostrarDineroDisponible();
    iniciarSimulador();
}

function iniciarSimulador(){
    document.getElementById(`boton-iniciar`).addEventListener("click", () => {
        if(plantelCompleto()){    
            guardarEquipoLocalStorage();
            guardarJugadoresDisponiblesLocalStorage(); 
            guardarDineroDisponibleLocalStorage(); 
            pantallaInicio.innerHTML= "";
            iniciarPartido(jugadoresBrasil, bannerVsBrasil);
            }else{
                Swal.fire({icon: 'error',
                           text: 'Debe adquirir 4 jugadores para empezar'});
            }})
}

function iniciarPartido(equipoRival, banner){
            pantallaTorneo.innerHTML= banner;
            mostrarEquipos(equipoRival);
            contenedorVerResultados.innerHTML = "";
            contenedorVerResultados.innerHTML = `<button id="resultados">----VER RESULTADOS---</button>`;
            document.getElementById(`resultados`).addEventListener("click", ()=>{
                contenedorVerResultados.innerHTML = "";
                asignarPuntajeAJugadores(equipoRival);
                cantidadDePartidos ++;
                if(cantidadDePartidos < 2){
                    contenedorSiguientePartido.innerHTML= `<button id="siguiente-partido">Siguiente Partido</button>`;
                    document.getElementById(`siguiente-partido`).addEventListener("click", () => {
                        limpiarHTML();
                        pantallaTorneo.innerHTML = bannerVsAlemania;
                        iniciarPartido(jugadoresAlemania, bannerVsAlemania);
                        })
                }//else{Swal.fire("FINNN")}
            })  
}

function mostrarEquipos(equipoRival){
    jugadoresPlantel.forEach((jugador)=>{
        jugadoresLocales.innerHTML += `<li><img src="${jugador.img}"></li>`;
        });

    equipoRival.forEach((jugador) => {
            jugadoresVisitantes.innerHTML += `<li><img src="${jugador.img}"></li>`;
        });
}

function limpiarHTML(){
                    pantallaTorneo.innerHTML = "";
                    jugadoresLocales.innerHTML="";
                    jugadoresVisitantes.innerHTML="";
                    contenedorPuntosFecha.innerHTML="";
                    puntosLocales.innerHTML ="";
                    puntosVisitantes.innerHTML="";
                    ganador.innerHTML = "";
                    contenedorSiguientePartido.innerHTML ="";
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
        ganador.innerHTML = `<img src="https://github.com/Yurakoski/simulador-JS/blob/main/imagenes/win.jpg?raw=true"></img>`
    }else{
        if(puntajeLocalesFecha < puntajeVisitantesFecha){
        ganador.innerHTML = `<img src="https://github.com/Yurakoski/simulador-JS/blob/main/imagenes/lose.jpg?raw=true"></img>`
        }else{
        ganador.innerHTML = `<img src="https://github.com/Yurakoski/simulador-JS/blob/main/imagenes/empate.jpg?raw=true"></img>`
        }
    }
}

function mostrarJugadoresDisponibles(){ 
    cardsJugadoresDisponibles.innerHTML = "";  
    jugadoresDisponibles.forEach((jugador)=>{ //GENERA LAS CARDS EN EL HTML, Y A CADA BOTON LE ASIGNA UN ID NUMERICO
        const idBoton = `add-player${jugador.id}`
        cardsJugadoresDisponibles.innerHTML += `<li><img src= "${jugador.img}"> 
                                                ${jugador.nombre}
                                                <br><b>$${jugador.valor}</b>
                                                <button id="${idBoton}">COMPRAR</button></li>`;
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
                                        ${jugador.nombre}
                                        <br>$${jugador.valor}
                                        <button id="${idBoton}">VENDER</button></li>`;
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
        dineroGastado -=  jugadoresPlantel[index].valor;
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
    dineroGastado += jugador.valor;
    jugadoresPlantel.push(jugador);
    mostrarJugadoresPlantel();
}

function mostrarDineroDisponible(){
    dineroDisponible.innerHTML = `<div>$${miPresupuesto}</div>`;
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

function asignarPuntajeEquipoRival(idEquipo){
    const index = obtenerIndexDeEquipoRival(idEquipo);
    if(index !== -1){
        equiposRivales[index].puntajeJugadoresFecha = obtenerPuntajeRandom(51);
    }
}

function obtenerIndexDeEquipoRival(idEquipo){
    return equiposRivales.findIndex(equipo => equipo.id === idEquipo);
}
/*
//Partido entre equipo propio y el rival
function acumularPuntosEquiposPrincipales(idEquipo){
      const index = obtenerIndexDeEquipoRival(idEquipo);
      if(index !== -1){
        if (sumatoriaPuntajeFecha > equiposRivales[index].puntajeJugadoresFecha){
            misPuntosAcumulados += PUNTOS_PARTIDO_GANADO;
        }else{
            if(sumatoriaPuntajeFecha < equiposRivales[index].puntajeJugadoresFecha){
                equiposRivales[index].puntosAcumulados += PUNTOS_PARTIDO_GANADO;
            }else{
                misPuntosAcumulados += PUNTOS_PARTIDO_EMPATADO;
                equiposRivales[index].puntosAcumulados += PUNTOS_PARTIDO_EMPATADO;
                }
            }
        } 
}

//Determina los resultados del partido secundario (el que no juega mi equipo) 
//y suma puntos por partido ganado y empatado al acumulador (puntosAcumulados)

function acumularPuntosEquiposSecundarios(idEquipoLocal, idEquipoVisitante){
    const indexEquipoLocal = obtenerIndexDeEquipoRival(idEquipoLocal);
    const indexEquipoVisitante = obtenerIndexDeEquipoRival(idEquipoVisitante);
    
    if(indexEquipoLocal !== -1 && indexEquipoVisitante !== -1){
        equiposRivales[indexEquipoLocal].puntajeJugadoresFecha= obtenerPuntajeRandom(51);
        equiposRivales[indexEquipoVisitante].puntajeJugadoresFecha= obtenerPuntajeRandom(51);

        if(equiposRivales[indexEquipoLocal].puntajeJugadoresFecha > equiposRivales[indexEquipoVisitante].puntajeJugadoresFecha){
            equiposRivales[indexEquipoLocal].puntosAcumulados += PUNTOS_PARTIDO_GANADO;
        }else{
            if(equiposRivales[indexEquipoLocal].puntajeJugadoresFecha < equiposRivales[indexEquipoVisitante].puntajeJugadoresFecha){
                equiposRivales[indexEquipoVisitante].puntosAcumulados += PUNTOS_PARTIDO_GANADO;
        }else{
            equiposRivales[indexEquipoLocal].puntosAcumulados += PUNTOS_PARTIDO_EMPATADO;
            equiposRivales[indexEquipoVisitante].puntosAcumulados += PUNTOS_PARTIDO_EMPATADO;
        }
    }
}}*/