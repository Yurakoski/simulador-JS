let presupuesto = 4000;
let dineroGastado = 0;
let sumatoriaPuntosFecha= 0;
const CANTIDAD_DE_JUGADORES_POR_EQUIPO = 5;
const VALOR_JUGADOR_MEDIO = 500;
let puntosAcumulados = 0;

const jugadoresPlantel = []; //Crear un objeto equipoPropio que contenga este array de jugadores
 
const equiposRivales = [];

function agregarEquiposRivales(jugador){
    equiposRivales.push(jugador);
}

//FILTER - MAP
function jugadoresPremiumContratados(){
    return jugadoresPlantel.filter(jugador => jugador.valor > VALOR_JUGADOR_MEDIO).map(jugador => jugador.nombre);
}

function validarCompra(jugador){
    if (contratoMenosDeCincoJugadores()){
        if (tieneDineroSuficienteParaComprar(jugador)){
             completarCompra(jugador);
        }else{
            alert("Su presupuesto es insuficiente. Contrate otro jugador más barato.");
        }
    }else{
        alert("Superó el límite de jugadores contratados");
    }
}

function tieneDineroSuficienteParaComprar(jugador){
    return presupuesto >= jugador.valor;
}

function contratoMenosDeCincoJugadores(){
    return jugadoresPlantel.length < CANTIDAD_DE_JUGADORES_POR_EQUIPO;
}

function contratoCincoJugadores(){
    return jugadoresPlantel.length === CANTIDAD_DE_JUGADORES_POR_EQUIPO;
}

function completarCompra(jugador){
    presupuesto -= jugador.valor;
    dineroGastado += jugador.valor;
    jugadoresPlantel.push(jugador);
}

function venderJugador(idJugador){
    const index = jugadoresPlantel.findIndex(jugador => jugador.id === idJugador);
    if(index !== -1){
        presupuesto += jugadoresPlantel[index].valor;
        dineroGastado -=  jugadoresPlantel[index].valor;
        jugadoresPlantel.splice(index, 1);
    }
}

function obtenerPuntajeRandom(max) {
    return Math.floor(Math.random() * max);
  }

function obtenerPuntajeRandomPremium(max) {
    return Math.floor(Math.random() * max + 7);
  }

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
function sumatoriaPuntosJugadores(){
    sumatoriaPuntosFecha = jugadoresPlantel.map(jugador => jugador.puntaje).reduce((acum, elem) => acum + elem, 0);
}

function asignarPuntajeEquipoRival(idEquipoRival){
    const index = equiposRivales.findIndex(equipoContrario => equipoContrario.id === idEquipoRival);
    if(index !== -1){
        equiposRivales[index].puntosFecha = obtenerPuntajeRandom(51);
    }
}

function sumarPuntosDelPartidoPrincipal(idEquipoContrario){
      const index = equiposRivales.findIndex(equipoContrario => equipoContrario.id === idEquipoContrario);
      if(index !== -1){
        if (sumatoriaPuntosFecha > equiposRivales[index].puntosFecha){
            console.log("GANASTE!");
            puntosAcumulados += 3;
        }else{
            if(sumatoriaPuntosFecha < equiposRivales[index].puntosFecha){
                console.log("PERDISTE!");
                equiposRivales[index].puntosAcumulados += 3;
            }else{
                console.log("EMPATE!");
                puntosAcumulados += 1;
                equiposRivales[index].puntosAcumulados += 1;
                }
            }
        } 
}

function asignarPuntosEquiposSecundarios(idEquipoLocal, idEquipoVisitante){
    const indexEquipoLocal = equiposRivales.findIndex(equipoLocal => equipoLocal.id === idEquipoLocal);
    const indexEquipoVisitante = equiposRivales.findIndex(equipoVisitante => equipoVisitante.id === idEquipoVisitante);
    
    if(indexEquipoLocal !== -1 && indexEquipoVisitante !== -1){
        equiposRivales[indexEquipoLocal].puntosFecha= obtenerPuntajeRandom(51);
        equiposRivales[indexEquipoVisitante].puntosFecha= obtenerPuntajeRandom(51);

        if(equiposRivales[indexEquipoLocal].puntosFecha > equiposRivales[indexEquipoVisitante].puntosFecha){
            equiposRivales[indexEquipoLocal].puntosAcumulados += 3;
        }else{
            if(equiposRivales[indexEquipoLocal].puntosFecha < equiposRivales[indexEquipoVisitante].puntosFecha){
                equiposRivales[indexEquipoVisitante].puntosAcumulados += 3;
        }else{
            equiposRivales[indexEquipoLocal].puntosAcumulados += 1;
            equiposRivales[indexEquipoVisitante].puntosAcumulados += 1;
        }
    }
}}

agregarEquiposRivales({id: 1, nombre: "Equipo1", puntosFecha: 0, puntosAcumulados: 0});
agregarEquiposRivales({id: 2, nombre: "Equipo2", puntosFecha: 0, puntosAcumulados: 0});
agregarEquiposRivales({id: 3, nombre: "Equipo3", puntosFecha: 0, puntosAcumulados: 0});

validarCompra({id: 1, nombre: "Mono burgos", valor: 800, puntaje: 0});
validarCompra({id: 2, nombre: "Pupi Zanetti", valor: 300, puntaje: 0});
validarCompra({id: 3, nombre: "Lionel Messi", valor: 1000, puntaje: 0});
validarCompra({id: 4, nombre: "Brujita Verón", valor: 1000, puntaje: 0});
validarCompra({id: 5, nombre: "Hernán Crespo", valor: 300, puntaje: 0});
//validarCompra({id: 6, nombre: "Gabriel Batistuta", valor: 400}); -----> Alerta por superar el límite de jugadores
//venderJugador(1); -----> Elimina jugador elegido por id

//FECHA 1: TU EQUIPO VS EQUIPO1 y EQUIPO2 VS EQUIPO3
asignarPuntajeAJugador(1);
asignarPuntajeAJugador(2);
asignarPuntajeAJugador(3);
asignarPuntajeAJugador(4);
asignarPuntajeAJugador(5);
sumatoriaPuntosJugadores();
asignarPuntajeEquipoRival(1);
sumarPuntosDelPartidoPrincipal(1);
asignarPuntosEquiposSecundarios(2,3);
console.log("TU EQUIPO VS EQUIPO1 y EQUIPO2 VS EQUIPO3")
console.log("TU EQUIPO puntosFecha: " + sumatoriaPuntosFecha);
console.log("Equipo1 puntosFecha: " + equiposRivales[0].puntosFecha);
console.log("Equipo2 puntosFecha: " + equiposRivales[1].puntosFecha);
console.log("Equipo3 puntosFecha: " + equiposRivales[2].puntosFecha);
console.log("MI EQUIPO puntos Acumulados: " + puntosAcumulados);
console.log("EQUIPO1 puntos Acumulados: " + equiposRivales[0].puntosAcumulados);
console.log("EQUIPO2 puntos Acumulados: " + equiposRivales[1].puntosAcumulados);
console.log("EQUIPO3 puntos Acumulados: " + equiposRivales[2].puntosAcumulados);

//FECHA 2: TU EQUIPO VS EQUIPO2 y EQUIPO1 VS EQUIPO3
asignarPuntajeAJugador(1);
asignarPuntajeAJugador(2);
asignarPuntajeAJugador(3);
asignarPuntajeAJugador(4);
asignarPuntajeAJugador(5);
sumatoriaPuntosJugadores();
asignarPuntajeEquipoRival(2);
sumarPuntosDelPartidoPrincipal(2);
asignarPuntosEquiposSecundarios(1,3);
console.log("TU EQUIPO VS EQUIPO2 y EQUIPO1 VS EQUIPO3");
console.log("TU EQUIPO puntosFecha: " + sumatoriaPuntosFecha);
console.log("Equipo1 puntosFecha: " + equiposRivales[0].puntosFecha);
console.log("Equipo2 puntosFecha: " + equiposRivales[1].puntosFecha);
console.log("Equipo3 puntosFecha: " + equiposRivales[2].puntosFecha);
console.log("MI EQUIPO puntos Acumulados: " + puntosAcumulados);
console.log("EQUIPO1 puntos Acumulados: " + equiposRivales[0].puntosAcumulados);
console.log("EQUIPO2 puntos Acumulados: " + equiposRivales[1].puntosAcumulados);
console.log("EQUIPO3 puntos Acumulados: " + equiposRivales[2].puntosAcumulados);

//FECHA 3: TU EQUIPO VS EQUIPO3 y EQUIPO1 VS EQUIPO2
asignarPuntajeAJugador(1);
asignarPuntajeAJugador(2);
asignarPuntajeAJugador(3);
asignarPuntajeAJugador(4);
asignarPuntajeAJugador(5);
sumatoriaPuntosJugadores();
asignarPuntajeEquipoRival(3);
sumarPuntosDelPartidoPrincipal(3);
asignarPuntosEquiposSecundarios(1,2);
console.log("TU EQUIPO VS EQUIPO3 y EQUIPO1 VS EQUIPO2");
console.log("TU EQUIPO puntosFecha: " + sumatoriaPuntosFecha);
console.log("Equipo1 puntosFecha: " + equiposRivales[0].puntosFecha);
console.log("Equipo2 puntosFecha: " + equiposRivales[1].puntosFecha);
console.log("Equipo3 puntosFecha: " + equiposRivales[2].puntosFecha);
console.log("MI EQUIPO puntos Acumulados: " + puntosAcumulados);
console.log("EQUIPO1 puntos Acumulados: " + equiposRivales[0].puntosAcumulados);
console.log("EQUIPO2 puntos Acumulados: " + equiposRivales[1].puntosAcumulados);
console.log("EQUIPO3 puntos Acumulados: " + equiposRivales[2].puntosAcumulados);

console.log("*****************");
console.log("Dinero gastado: $ " + dineroGastado);
console.log("Presupuesto disponible: $ " + presupuesto);
console.log("Cantidad de jugadores contratados: " + jugadoresPlantel.length);
console.log("Jugadores premium contratados: " + jugadoresPremiumContratados());
console.log("Puntaje Mono Burgos: " + jugadoresPlantel[0].puntaje);
console.log("Puntaje Pupi Zanetti: " + jugadoresPlantel[1].puntaje);
console.log("Puntaje Lionel Messi: " + jugadoresPlantel[2].puntaje);
console.log("Puntaje Brujita Verón: " + jugadoresPlantel[3].puntaje);
console.log("Puntaje Hernán Crespo: " + jugadoresPlantel[4].puntaje);


/*FALTA VALIDAR:
- Que no se puedan calcular los puntajes más de una vez por fecha.
- Que no se determine el ganador hasta no haber calculado todos los puntajes. 

ADEMAS :
-Tabla de posiciones.
-Desempatar si 2 o más equipos sumaron igual cantidad de puntos al finalizar todos los partidos.
*/
