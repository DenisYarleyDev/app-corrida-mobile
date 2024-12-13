registro = [];
id = null
lastTime = null

//construtor trajeto
function trajetoConstruct(dado, tempo) {
    this.dataConstruct = function () {
        this.accuracy = dado.coords.accuracy
        this.latitude = dado.coords.latitude
        this.longitude = dado.coords.longitude
        this.velocidadeAtual = dado.coords.speed
        this.time = dado.timestamp
        this.tempoFinal = Date.now();
    }
    this.id = tempo;
    this.tempoInicial = tempo;
    this.dados = registro;

}

//adiciona  o trajeto dentro de um array
function salvarTrajeto(res, tempo) {
    trajeto = new trajetoConstruct(res, tempo);
    registro.push(new trajeto.dataConstruct())

    localStorage.setItem(trajeto.id, JSON.stringify(trajeto));
    id = trajeto.id
}


