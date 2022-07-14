let presupuesto = 4000;
let dineroGastado = 0;

const jugadoresContratados = [];

function validarCompra(jugador){
    if (jugadoresContratados.length < 5){
        if (presupuesto >= jugador.valor){
             completarCompra(jugador);
        }else{
            alert("Su presupuesto es insuficiente. Contrate otro jugador más barato.");
        }
    }
    else{
        alert("Superó el límite de jugadores contratados");
    }
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

validarCompra({id: 1, nombre: "Mono burgos", valor: 800});
validarCompra({id: 2, nombre: "Pupi Zanetti", valor: 500});
validarCompra({id: 3, nombre: "Lionel Messi", valor: 1000});
validarCompra({id: 4, nombre: "Brujita Verón", valor: 1000});
validarCompra({id: 5, nombre: "Hernán Crespo", valor: 500});
//validarCompra({id: 6, nombre: "Gabriel Batistuta", valor: 400});
venderJugador(1);

console.log("Dinero gastado: $ " + dineroGastado);
console.log("Presupuesto disponible: $ " + presupuesto);
console.log("Cantidad de jugadores contratados: " + jugadoresContratados.length);
