//-------------------------------------------------------------------------//
//IMPORTANDO LA LIBRERIAS
const express = require("express");
const cors = require("cors");
//-------------------------------------------------------------------------//
//CREANDO UNA INSTANCIA DEL SERVIDOR WEB
const app = express();
//COMPROBANDO PUERTO
const PORT = process.env.PORT || 3000;
//SERVIDOR WEB ESCUCHANDO EN EL PUERTO
app.listen(PORT, () => console.log("Servidor corriendo en el puerto", PORT));
app.use(express.json());
//-------------------------------------------------------------------------//
//CONFIGURANDO EL CORS [Access-Control-Allow-Origin]
app.use(cors());
//-------------------------------------------------------------------------//
//DECLARACIÓN DE VARIABLES Y CONSTANTES GLOBALES
const jugadores = [];

//-------------------------------------------------------------------------//
//DECLARANDO CLASES

class Jugador {

    constructor(id) {
        this.id = id;
    }

    asginarMokepon(mokepon) {
        this.mokepon = mokepon;
    }

    actualizarPosicion(x, y) {
        this.x = x;
        this.y = y;
    }

    asginarAtaques(ataques) {
        this.ataques = ataques;
    }
}

class Mokepon {

    constructor(nombre) {
        this.nombre = nombre;
    }
}

//-------------------------------------------------------------------------//
//SERVICIOS GET Y POST

app.get("/unirse", (req, res) => {

    const id = `${Math.random()}`;
    const jugador = new Jugador(id);
    jugadores.push(jugador);

    res.send(id);

});

app.post("/mokepon/:jugadorId", (req, res) => {

    const jugadorId = req.params.jugadorId || "";
    const nombreMokeponJugador = req.body.mokepon || "";
    const mokepon = new Mokepon(nombreMokeponJugador);

    const indexJugador = jugadores.findIndex((jugador) => jugadorId === jugador.id);

    if (indexJugador >= 0) {
        jugadores[indexJugador].asginarMokepon(mokepon);
    }

    res.end();

});

app.post("/mokepon/:jugadorId/posicion", (req, res) => {

    const jugadorId = req.params.jugadorId || "";
    const x = req.body.x || 0;
    const y = req.body.y || 0;

    const indexJugador = jugadores.findIndex((jugador) => jugadorId === jugador.id);

    if (indexJugador >= 0) {
        jugadores[indexJugador].actualizarPosicion(x, y);
    }

    const enemigos = jugadores.filter((jugador) => jugadorId !== jugador.id);

    res.send({
        enemigos
    });

});

app.post("/mokepon/:jugadorId/ataques", (req, res) => {

    const jugadorId = req.params.jugadorId || "";
    const ataques = req.body.ataques || [];

    const indexJugador = jugadores.findIndex((jugador) => jugadorId === jugador.id);

    if (indexJugador >= 0) {
        jugadores[indexJugador].asginarAtaques(ataques);
    }

    console.table(jugadores);

    res.end();

});

app.get("/mokepon/:enemigoId/ataques", (req, res) => {

    const enemigoId = req.params.enemigoId || "";
    const enemigo = jugadores.find((enemigo) => enemigo.id === enemigoId);

    res.send({
        ataques: enemigo.ataques || []
    })

});

