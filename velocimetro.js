//botês inciar e parar trajeto
iniciar = document.querySelector("#iniciar");
parar = document.querySelector("#parar");
registros = document.querySelector("#registros")

tempoInicial = null;

//id trajeto atual
let id = null;

//botão iniciar
iniciar.addEventListener("click", () => {
    iniciar.classList.add("d-none")
    parar.classList.remove("d-none")

    tempoInicial = Date.now()

    //solicitar permissão de localização e obter dados atualizados
    id = navigator.geolocation.watchPosition(sucesso, erro, options);

});

//botão parar
parar.addEventListener("click", () => {
    parar.classList.add("d-none")
    iniciar.classList.remove("d-none")

    navigator.geolocation.clearWatch(id);
    id = null;
});

//callback de sucesso
function sucesso(res) {
    accuracy = res.coords.accuracy
    latitude = res.coords.latitude
    longitude = res.coords.longitude
    velocidadeAtual = res.coords.speed

    salvarTrajeto(res,tempoInicial)

    if(velocidadeAtual){
        registros.innerHTML = 
        "accuracy: " + accuracy + "<br>" +
        "latitude: " + latitude + "<br>" +
        "longitude: " + longitude + "<br>" +
        "velocidade: " + velocidadeAtual.toFixed(2) + "m/s";
    }

    //visor da velocidade
    velocidade = document.querySelector("#velocidade")
    velocidadeAtual ? velocidade.innerText = (velocidadeAtual * 3.6).toFixed(2) : velocidadeAtual = 0
}

//callback de erro
function erro(res) {
    console.log(res)
}

//parametros para a captura da posição
const options = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0
};