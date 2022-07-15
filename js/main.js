let presupuesto = 4000;
let dineroGastado = 0;
let sumatoriaPuntosFecha= 0;
let puntosEquipoRivalFecha= 0;
const CANTIDAD_DE_JUGADORES_POR_EQUIPO = 5;
const VALOR_PROMEDIO = 500;

const jugadoresContratados = [];

//MAP
function nombresDeJugadoresContratados(){
    return jugadoresContratados.map(jugador => jugador.nombre);
}

//FILTER - MAP
function jugadoresPremiumContratados(){
    return jugadoresContratados.filter(jugador => jugador.valor > VALOR_PROMEDIO).map(jugador => jugador.nombre);
}

function validarCompra(jugador){
    if (tieneMenosDeCincoJugadores()){
        if (tieneDineroSuficienteParaComprar(jugador)){
             completarCompra(jugador);
        }else{
            alert("Su presupuesto es insuficiente. Contrate otro jugador más barato.");
        }
    }
    else{
        alert("Superó el límite de jugadores contratados");
    }
}

function tieneDineroSuficienteParaComprar(jugador){
    return presupuesto >= jugador.valor;
}

function tieneMenosDeCincoJugadores(){
    return jugadoresContratados.length < CANTIDAD_DE_JUGADORES_POR_EQUIPO;
}

function tieneCincoJugadores(){
    return jugadoresContratados.length === CANTIDAD_DE_JUGADORES_POR_EQUIPO;
}

function completarCompra(jugador){
    presupuesto -= jugador.valor;
    dineroGastado += jugador.valor;
    jugadoresContratados.push(jugador);
}

function venderJugador(idJugador){
    const index = jugadoresContratados.findIndex((jugador) => jugador.id === idJugador);
    if(index !== -1){
        presupuesto += jugadoresContratados[index].valor;
        dineroGastado -=  jugadoresContratados[index].valor;
        jugadoresContratados.splice(index, 1);
    }
}

function obtenerPuntajeRandom(max) {
    return Math.floor(Math.random() * max);
  }

function obtenerPuntajeRandomPremium(max) {
    return Math.floor(Math.random() * max + 7);
  }

function asignarPuntajeAJugador(idJugador){
    const index = jugadoresContratados.findIndex((jugador) => jugador.id === idJugador);
    if(index !== -1){
        if(jugadoresContratados[index].valor > VALOR_PROMEDIO){
             jugadoresContratados[index].puntaje= obtenerPuntajeRandomPremium(4);
       }else{
             jugadoresContratados[index].puntaje= obtenerPuntajeRandom(11);
       }
    }
}
//MAPEO Y SUMATORIA DE PUNTAJES
function sumatoriaPuntosJugadores(){
    sumatoriaPuntosFecha = jugadoresContratados.map(jugador => jugador.puntaje).reduce((acum, elem) => acum + elem, 0);
}

function asignarPuntajeEquipoContrario(){
    puntosEquipoRivalFecha = obtenerPuntajeRandom(51);
}

function equipoGanadorFecha(){
    if (sumatoriaPuntosFecha > puntosEquipoRivalFecha){
        console.log("GANASTE!");
    }else{
        if(sumatoriaPuntosFecha < puntosEquipoRivalFecha){
            console.log("PERDISTE!");
        }else{
            console.log("EMPATE!");
        }
    }
} 

validarCompra({id: 1, nombre: "Mono burgos", valor: 800, puntaje: 0});
validarCompra({id: 2, nombre: "Pupi Zanetti", valor: 300, puntaje: 0});
validarCompra({id: 3, nombre: "Lionel Messi", valor: 1000, puntaje: 0});
validarCompra({id: 4, nombre: "Brujita Verón", valor: 1000, puntaje: 0});
validarCompra({id: 5, nombre: "Hernán Crespo", valor: 300, puntaje: 0});
//validarCompra({id: 6, nombre: "Gabriel Batistuta", valor: 400}); -----> Alerta por superar el límite de jugadores
//venderJugador(1); -----> Elimina jugador elegido por id
asignarPuntajeAJugador(1);
asignarPuntajeAJugador(2);
asignarPuntajeAJugador(3);
asignarPuntajeAJugador(4);
asignarPuntajeAJugador(5);
sumatoriaPuntosJugadores();
asignarPuntajeEquipoContrario();
equipoGanadorFecha();

console.log("Dinero gastado: $ " + dineroGastado);
console.log("Presupuesto disponible: $ " + presupuesto);
console.log("Cantidad de jugadores contratados: " + jugadoresContratados.length);
console.log("Puntaje Mono Burgos: " + jugadoresContratados[0].puntaje);
console.log("Puntaje Pupi Zanetti: " + jugadoresContratados[1].puntaje);
console.log("Puntaje Lionel Messi: " + jugadoresContratados[2].puntaje);
console.log("Puntaje Brujita Verón: " + jugadoresContratados[3].puntaje);
console.log("Puntaje Hernán Crespo: " + jugadoresContratados[4].puntaje);
console.log("Puntos obtenidos en la fecha: " + sumatoriaPuntosFecha);
console.log("Puntos obtenidos por el equipo contrario en la fecha: " + puntosEquipoRivalFecha);
console.log("Nombres de los jugadores contratados: " + nombresDeJugadoresContratados());
console.log("Jugadores premium contratados: " + jugadoresPremiumContratados());


/*FALTA VALIDAR:
- Que no se puedan calcular los puntajes más de una vez por fecha.
- Que no se determine el ganador hasta no haber calculado todos los puntajes. */
