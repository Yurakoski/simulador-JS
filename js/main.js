let miPresupuesto = 4000;
let dineroGastado = 0;
let sumatoriaPuntajeFecha= 0;
let misPuntosAcumulados = 0;
const CANTIDAD_DE_JUGADORES_POR_EQUIPO = 5;
const VALOR_JUGADOR_MEDIO = 500;
const PUNTOS_PARTIDO_GANADO = 3;
const PUNTOS_PARTIDO_EMPATADO = 1;
const PUNTAJE_MINIMO_JUGADOR_PREMIUM = 7;

let jugadoresDisponibles = [
       {id: 1, nombre: "Mono Burgos", img: "https://github.com/Yurakoski/simulador-JS/blob/main/imagenes/mono-burgos.jpg?raw=true", valor: 800, puntaje: 0},
       {id: 2, nombre: "Pupi Zanetti", img: "https://github.com/Yurakoski/simulador-JS/blob/main/imagenes/pupi-zanetti.jpg?raw=true", valor: 300, puntaje: 0},
       {id: 3, nombre: "Lionel Messi", img: "https://github.com/Yurakoski/simulador-JS/blob/main/imagenes/messi.jpg?raw=true", valor: 1000, puntaje: 0},
       {id: 4, nombre: "Brujita Verón", img: "https://github.com/Yurakoski/simulador-JS/blob/main/imagenes/veron.jpg?raw=true", valor: 1000, puntaje: 0},
       {id: 5, nombre: "H. Crespo", img: "https://github.com/Yurakoski/simulador-JS/blob/main/imagenes/crespo.jpg?raw=true", valor: 300, puntaje: 0},
       {id: 6, nombre: "G. Batistuta", img: "https://github.com/Yurakoski/simulador-JS/blob/main/imagenes/bati.jpg?raw=true", valor: 2000, puntaje: 0}
    ];

const equiposRivales = [
        {id: 1, nombre: "Equipo1", puntajeJugadoresFecha: 0, puntosAcumulados: 0},
        {id: 2, nombre: "Equipo2", puntajeJugadoresFecha: 0, puntosAcumulados: 0},
        {id: 3, nombre: "Equipo3", puntajeJugadoresFecha: 0, puntosAcumulados: 0}
    ];
    
let jugadoresPlantel = [];
const pantalla = document.querySelector("#pantalla")
const cardsJugadoresDisponibles = document.querySelector("#cards-disponibles");
const subtituloJugadoresDisponibles = document.querySelector("#subtitulo-jugadores-disponibles");
const cardsMisJugadores = document.querySelector("#cards-mis-jugadores");
const dineroDisponible = document.querySelector("#dinero-disponible");
const subtituloDineroDisponible = document.querySelector("#subtitulo-dinero-disponible");
const botonIniciarCampeonato = document.querySelector("#boton-iniciar");
const seccionDisponibles = document.querySelector("#seccion-disponibles");
const seccionMisJugadores = document.querySelector("#seccion-mis-jugadores");

mostrarJugadoresDisponibles();
mostrarJugadoresPlantel();
mostrarDineroDisponible();
iniciar();

function iniciar(){
    document.getElementById(`boton-iniciar`).addEventListener("click", () => {
        if(plantelCompleto()){             //***********************FALTA DESACTIVAR BOTON VENDER */
            pantalla.innerHTML= "";
            pantalla.innerHTML= `<img src="./imagenes/banner-vs.jpg">
                                 <button>----COMENZAR---</button>`
        }})
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
        }else{alert("No se encontró al jugador seleccionado")}
}

function validarCompra(jugador){  //****BOTON COMPRAR**** va a llamar a esta función
    if (plantelIncompleto()){
        if (tieneDineroSuficienteParaComprar(jugador)){
             eliminarJugadorDeDisponibles(jugador.id);
             completarCompra(jugador);
             mostrarDineroDisponible();
            }else{alert("Su presupuesto es insuficiente.");
        }
    }else{alert("Superó el límite de jugadores contratados");
    }
}

function plantelCompleto(){
    return jugadoresPlantel.length === 5;
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

//El jugador premium (los más caros), obtienen puntajes mayores a 7
function asignarPuntajeAJugador(idJugador){
    const index = jugadoresPlantel.findIndex(jugador => jugador.id === idJugador);
    if(index !== -1){
        if(jugadoresPlantel[index].valor > VALOR_JUGADOR_MEDIO){
            jugadoresPlantel[index].puntaje= obtenerPuntajeRandomPremium(4);
        }else{
            jugadoresPlantel[index].puntaje= obtenerPuntajeRandom(11);
        }
    }
}

//MAPEO Y SUMATORIA DE PUNTAJES
function sumarPuntajeJugadores(){
    sumatoriaPuntajeFecha = jugadoresPlantel.map(jugador => jugador.puntaje).reduce((acum, elem) => acum + elem, 0);
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
