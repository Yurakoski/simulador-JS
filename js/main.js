const pantalla = document.querySelector("#pantalla")
const cardsJugadoresDisponibles = document.querySelector("#cards-disponibles");
const subtituloJugadoresDisponibles = document.querySelector("#subtitulo-jugadores-disponibles");
const cardsMisJugadores = document.querySelector("#cards-mis-jugadores");
const dineroDisponible = document.querySelector("#dinero-disponible");
const subtituloDineroDisponible = document.querySelector("#subtitulo-dinero-disponible");
const botonIniciarCampeonato = document.querySelector("#boton-iniciar");
const seccionDisponibles = document.querySelector("#seccion-disponibles");
const seccionMisJugadores = document.querySelector("#seccion-mis-jugadores");
const pantalla2 = document.querySelector("#pantalla-2");
const jugadoresLocales = document.querySelector("#jugadores-locales");
const jugadoresVisitantes = document.querySelector("#jugadores-visitantes");
const botonIniciarPartido = document.querySelector("#boton-iniciar-partido");
const contenedorIniciarPartido = document.querySelector("#contenedor-iniciar-partido");
const puntosLocales = document.querySelector("#puntos-locales");
const puntosVisitantes = document.querySelector("#puntos-visitantes");
const puntosFechaLocales = document.querySelector("#puntos-fecha-locales");
const puntosFechaVisitantes = document.querySelector("#puntos-fecha-visitantes");
const aceptar = document.querySelector("#aceptar");

let miPresupuesto = 4000;
let dineroGastado = 0;
let sumatoriaPuntajeFecha= 0;
let misPuntosAcumulados = 0;
const CANTIDAD_DE_JUGADORES_POR_EQUIPO = 4;
const VALOR_JUGADOR_MEDIO = 500;
const PUNTOS_PARTIDO_GANADO = 3;
const PUNTOS_PARTIDO_EMPATADO = 1;
const PUNTAJE_MINIMO_JUGADOR_PREMIUM = 7;
/*
const nombreJugador= {
    nombre: prompt("Ingrese su nombre"),
    nombreEquipo: prompt("Ingrese el nombre del equipo")
}
const {nombre, nombreEquipo} = nombreJugador;
//alert(`Bienvenido ${nombre}, tu equipo es ${nombreEquipo}`);
/*/


let jugadoresDisponibles = [
        {id: 1, nombre: "Burgos", img: "https://github.com/Yurakoski/simulador-JS/blob/main/imagenes/mono-burgos.jpg?raw=true", valor: 800, puntaje: 0},
        {id: 2, nombre: "Zanetti", img: "https://github.com/Yurakoski/simulador-JS/blob/main/imagenes/pupi-zanetti.jpg?raw=true", valor: 300, puntaje: 0},
        {id: 3, nombre: "Messi", img: "https://github.com/Yurakoski/simulador-JS/blob/main/imagenes/messi.jpg?raw=true", valor: 1000, puntaje: 0},
        {id: 4, nombre: "Verón", img: "https://github.com/Yurakoski/simulador-JS/blob/main/imagenes/veron.jpg?raw=true", valor: 1000, puntaje: 0},
        {id: 5, nombre: "Crespo", img: "https://github.com/Yurakoski/simulador-JS/blob/main/imagenes/crespo.jpg?raw=true", valor: 300, puntaje: 0},
        {id: 6, nombre: "Batistuta", img: "https://github.com/Yurakoski/simulador-JS/blob/main/imagenes/bati.jpg?raw=true", valor: 2000, puntaje: 0},
        {id: 7, nombre: "Di María", img: "https://github.com/Yurakoski/simulador-JS/blob/main/imagenes/di-maria.jpg?raw=true", valor: 900, puntaje: 0},
        {id: 8, nombre: "Palermo", img: "https://github.com/Yurakoski/simulador-JS/blob/main/imagenes/palermo.jpg?raw=true", valor: 700, puntaje: 0}
    ];

let jugadoresBrasil = [
        {id: 1, nombre: "Dida", img: "https://github.com/Yurakoski/simulador-JS/blob/main/imagenes/dida.jpg?raw=true", puntaje: 0}, 
        {id: 2, nombre: "Kaka", img: "https://github.com/Yurakoski/simulador-JS/blob/main/imagenes/kaka.jpg?raw=true", puntaje: 0},
        {id: 3, nombre: "Ronaldo", img: "https://github.com/Yurakoski/simulador-JS/blob/main/imagenes/ronaldo.jpg?raw=true", puntaje: 0},
        {id: 4, nombre: "Ronaldinho", img: "https://github.com/Yurakoski/simulador-JS/blob/main/imagenes/ronaldinho.jpg?raw=true", puntaje: 0}
    ];

const equiposRivales = [
        {id: 1, nombre: "Brasil", puntajeJugadoresFecha: 0, puntosAcumulados: 0},
        {id: 2, nombre: "Alemania", puntajeJugadoresFecha: 0, puntosAcumulados: 0},
        {id: 3, nombre: "España", puntajeJugadoresFecha: 0, puntosAcumulados: 0}
    ];

let jugadoresPlantel = [];
//Swal.fire('Adquiera 4 jugadores para poder comenzar');
getJugadoresDisponiblesLocalStorage();
getEquipoLocalStorage();
getDineroDisponibleLocalStorage();
mostrarJugadoresDisponibles();
mostrarJugadoresPlantel();
mostrarDineroDisponible();
iniciarTorneo();

function iniciarTorneo(){
    document.getElementById(`boton-iniciar`).addEventListener("click", () => {
        if(plantelCompleto()){    
            guardarEquipoLocalStorage();
            guardarJugadoresDisponiblesLocalStorage(); 
            guardarDineroDisponibleLocalStorage(); 
            limpiarPantalla();
            pantalla2.innerHTML= `<img src="./imagenes/banner-vs.jpg" id="banner-vs" width= 350px>`;
            iniciarPartido();
            }else{
                Swal.fire({icon: 'error',
                           text: 'Debe adquirir 4 jugadores para empezar'});
            }})
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

function iniciarPartido(){
            contenedorIniciarPartido.innerHTML = "";
            contenedorIniciarPartido.innerHTML = `<button id="resultados">----VER RESULTADOS---</button>`;
            mostrarEquipos();
            document.getElementById(`resultados`).addEventListener("click", ()=>{
                contenedorIniciarPartido.innerHTML = "";
                asignarPuntajeAJugadores();
            })
}

//El jugador premium (los más caros), obtienen puntajes mayores a 7
function asignarPuntajeAJugadores(){
    for(let i=0 ; i<=4; i++){
        jugadoresBrasil[i].puntaje= obtenerPuntajeRandomPremium(4);
        puntosVisitantes.innerHTML += `<li>${jugadoresBrasil[i].puntaje}</li>`;
        (jugadoresPlantel[i].valor > VALOR_JUGADOR_MEDIO) ? jugadoresPlantel[i].puntaje= obtenerPuntajeRandomPremium(4) : jugadoresPlantel[i].puntaje= obtenerPuntajeRandom(11);
        puntosLocales.innerHTML += `<li>${jugadoresPlantel[i].puntaje}</li>`;
        }
        sumarPuntajeJugadores();
}

function sumarPuntajeJugadores(){
    puntajeLocalesFecha = jugadoresPlantel.map((jugador) => jugador.puntaje).reduce((acum, elem) => acum + elem, 0);
    puntajeVisitantesFecha = jugadoresBrasil.map((jugador) => jugador.puntaje).reduce((acum, elem) => acum + elem, 0);
    puntosFechaLocales.innerHTML= puntajeLocalesFecha;
    puntosFechaVisitantes.innerHTML= puntajeVisitantesFecha;
}

function mostrarEquipos(){
    jugadoresPlantel.forEach((jugador)=>{
        jugadoresLocales.innerHTML += `<li><img src="${jugador.img}"></li>`;
        });

    jugadoresBrasil.forEach((jugador) => {
            jugadoresVisitantes.innerHTML += `<li><img src="${jugador.img}"></li>`
        })
}

function limpiarPantalla(){
    pantalla.innerHTML= "";
}

function mostrarJugadoresDisponibles(){ 
    cardsJugadoresDisponibles.innerHTML = "";  
    jugadoresDisponibles.forEach((jugador)=>{ //GENERA LAS CARDS EN EL HTML, Y A CADA BOTON LE ASIGNA UN ID NUMERICO
        const idBoton = `add-player${jugador.id}`
        cardsJugadoresDisponibles.innerHTML += `<li><img src= "${jugador.img}"> 
                                                ${jugador.nombre}
                                                <br>$${jugador.valor}
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

function contratoCincoJugadores(){
    return jugadoresPlantel.length === CANTIDAD_DE_JUGADORES_POR_EQUIPO;
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

function agregarEquipoRival(equipo){
    equiposRivales.push(equipo);
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
}}


//validarCompra();
//validarCompra();
//validarCompra();
//validarCompra();
//validarCompra();
//validarCompra({id: 6, nombre: "Gabriel Batistuta", valor: 400}); -----> Alerta por superar el límite de jugadores
//venderJugador(1); -----> Elimina jugador elegido por id

/*
//FECHA 1: MI EQUIPO VS EQUIPO1 y EQUIPO2 VS EQUIPO3
asignarPuntajeAJugador(1);
asignarPuntajeAJugador(2);
asignarPuntajeAJugador(3);
asignarPuntajeAJugador(4);
asignarPuntajeAJugador(5);
sumarPuntajeJugadores();
asignarPuntajeEquipoRival(1);
acumularPuntosEquiposPrincipales(1);
acumularPuntosEquiposSecundarios(2,3);
console.log("|MI EQUIPO VS EQUIPO1| y |EQUIPO2 VS EQUIPO3|")
console.log("MI EQUIPO puntajeJugadoresFecha: " + sumatoriaPuntajeFecha);
console.log("Equipo1 puntaje total jugadores fecha: " + equiposRivales[0].puntajeJugadoresFecha);
console.log("Equipo2 puntaje total jugadores fecha: " + equiposRivales[1].puntajeJugadoresFecha);
console.log("Equipo3 puntaje total jugadores fecha: " + equiposRivales[2].puntajeJugadoresFecha);
console.log("MI EQUIPO puntos Acumulados: " + misPuntosAcumulados );
console.log("EQUIPO1 puntos Acumulados: " + equiposRivales[0].puntosAcumulados);
console.log("EQUIPO2 puntos Acumulados: " + equiposRivales[1].puntosAcumulados);
console.log("EQUIPO3 puntos Acumulados: " + equiposRivales[2].puntosAcumulados);

mostrarJugadoresPlantel()
//mostrarPuntajesJugadoresPlantel(1);

//FECHA 2: MI EQUIPO VS EQUIPO2 y EQUIPO1 VS EQUIPO3
asignarPuntajeAJugador(1);
asignarPuntajeAJugador(2);
asignarPuntajeAJugador(3);
asignarPuntajeAJugador(4);
asignarPuntajeAJugador(5);
sumarPuntajeJugadores();
asignarPuntajeEquipoRival(2);
acumularPuntosEquiposPrincipales(2);
acumularPuntosEquiposSecundarios(1,3);
console.log("|MI EQUIPO VS EQUIPO2| y |EQUIPO1 VS EQUIPO3|");
console.log("MI EQUIPO puntaje Jugadores Fecha: " + sumatoriaPuntajeFecha);
console.log("Equipo1 puntaje total jugadores fecha: " + equiposRivales[0].puntajeJugadoresFecha);
console.log("Equipo2 puntaje total jugadores fecha: " + equiposRivales[1].puntajeJugadoresFecha);
console.log("Equipo3 puntaje total jugadores fecha: " + equiposRivales[2].puntajeJugadoresFecha);
console.log("MI EQUIPO puntos Acumulados: " + misPuntosAcumulados );
console.log("EQUIPO1 puntos Acumulados: " + equiposRivales[0].puntosAcumulados);
console.log("EQUIPO2 puntos Acumulados: " + equiposRivales[1].puntosAcumulados);
console.log("EQUIPO3 puntos Acumulados: " + equiposRivales[2].puntosAcumulados);

//mostrarPuntajesJugadoresPlantel(2);

//FECHA 3:MI EQUIPO VS EQUIPO3 y EQUIPO1 VS EQUIPO2
asignarPuntajeAJugador(1);
asignarPuntajeAJugador(2);
asignarPuntajeAJugador(3);
asignarPuntajeAJugador(4);
asignarPuntajeAJugador(5);
sumarPuntajeJugadores();
asignarPuntajeEquipoRival(3);
acumularPuntosEquiposPrincipales(3);
acumularPuntosEquiposSecundarios(1,2);
console.log("|MI EQUIPO VS EQUIPO3| y |EQUIPO1 VS EQUIPO2|");
console.log("MI EQUIPO puntaje total jugadores fecha: " + sumatoriaPuntajeFecha);
console.log("Equipo1 puntaje total jugadores fecha: " + equiposRivales[0].puntajeJugadoresFecha);
console.log("Equipo2 puntaje total jugadores fecha: " + equiposRivales[1].puntajeJugadoresFecha);
console.log("Equipo3 puntaje total jugadores fecha: " + equiposRivales[2].puntajeJugadoresFecha);
console.log("MI EQUIPO puntos Acumulados: " + misPuntosAcumulados );
console.log("EQUIPO1 puntos Acumulados: " + equiposRivales[0].puntosAcumulados);
console.log("EQUIPO2 puntos Acumulados: " + equiposRivales[1].puntosAcumulados);
console.log("EQUIPO3 puntos Acumulados: " + equiposRivales[2].puntosAcumulados);

//mostrarPuntajesJugadoresPlantel(3);

console.log("*****************");
console.log("Dinero gastado: $ " + dineroGastado);
console.log("Presupuesto disponible: $ " + miPresupuesto);
console.log("Cantidad de jugadores contratados: " + jugadoresPlantel.length);
console.log("Jugadores premium contratados: " + jugadoresPremiumContratados());
console.log("Puntaje Mono Burgos: " + jugadoresPlantel[0].puntaje);
console.log("Puntaje Pupi Zanetti: " + jugadoresPlantel[1].puntaje);
console.log("Puntaje Lionel Messi: " + jugadoresPlantel[2].puntaje);
console.log("Puntaje Brujita Verón: " + jugadoresPlantel[3].puntaje);
console.log("Puntaje Hernán Crespo: " + jugadoresPlantel[4].puntaje);
*/

/*FALTA VALIDAR:
- Que no se puedan calcular los puntajes más de una vez por fecha.
- Que no se determine el ganador hasta no haber calculado todos los puntajes. 

ADEMÁS :
-Tabla de posiciones.
-Desempatar si 2 o más equipos sumaron igual cantidad de puntos al finalizar todos los partidos.
*/
