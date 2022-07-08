let presupuesto = 4000;
let valorJugador = 0;
let jugadoresContratados = 0;
let dineroGastado = 0;

function ingresarMontoDeJugador(){
    while (jugadoresContratados < 5){
        valorJugador= parseInt(prompt("Ingrese el valor del jugador"));
        validarPresupuesto(valorJugador);
    }
}

function validarPresupuesto(valorJugador){
    if (presupuesto >= valorJugador){
        completarTransaccion(valorJugador);
    }
    else{
        alert("Su presupuesto es insuficiente. Contrate otro jugador más barato.");
    }
}

function completarTransaccion(valorJugador){
    presupuesto -= valorJugador;
    dineroGastado += valorJugador;
    jugadoresContratados++;
}

alert("Deberá contratar a 5 jugadores para su equipo de fútbol. Para ello contará con un presupuesto de $4000.");
ingresarMontoDeJugador();

console.log("Dinero gastado: $ " + dineroGastado);
console.log("Presupuesto disponible: $ " + presupuesto);
console.log("Jugadores contratados: " + jugadoresContratados);