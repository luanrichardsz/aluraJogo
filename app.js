/*let titulo = document.querySelector('h1');
titulo.innerHTML = ("Jogo do Número Secreto");

let paragrafo = document.querySelector('p');
paragrafo.innerHTML = ("Escolha um número de 1 a 10");*/

let listaDeNumerosSorteados = [];
let numeroLimite = 10;

function exibirTexto(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
};

let numeroSecreto = gerarNumero();
let tentativas = 1;

function mensagemInicial() {
    exibirTexto("h1", "Jogo do Número Secreto");
    exibirTexto("p", "Escolha um número de 1 a 10");
}

mensagemInicial();

function verificarChute(){

    console.log(numeroSecreto)

    let chute = document.querySelector("input").value;
    if(chute == numeroSecreto){
        exibirTexto('h1', 'Acertou ABESTADO!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : "tentativa";
        let mensagemTentativa = ` Você descobriu o numero secreto que era ${numeroSecreto} em ${tentativas} ${palavraTentativa}! `;
        exibirTexto('p', mensagemTentativa);
        limparNumber();

        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto){
            exibirTexto("p","É MENOR BURRO");
        } else {
            exibirTexto("p","É MAIOR BURRO");
        }
        tentativas++;
        limparNumber();
    }
};

function limparNumber() {
    chute = document.querySelector('input');
    chute.value = ('');
}

function gerarNumero() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadesElementos = listaDeNumerosSorteados.length;

    if(quantidadesElementos == numeroEscolhido){
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumero();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados)
        return numeroEscolhido;
    }
};

function reiniciar(){
    numeroSecreto = gerarNumero();
    limparNumber();
    tentativas = 1;
    mensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}