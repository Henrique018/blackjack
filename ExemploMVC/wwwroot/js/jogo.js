const btn_start = document.getElementById("btn_start");

const btn_jogador1 = document.getElementById("btn_jogador_1");
const btn_jogador2 = document.getElementById("btn_jogador_2");

const pontuacao = document.getElementById("pontuacao1");
const pontuacao2 = document.getElementById("pontuacao2");

const btn_parar1 = document.getElementById("btn_parar_1");
const btn_parar2 = document.getElementById("btn_parar_2");

const cartas1 = document.getElementById("cartas1");
const cartas2 = document.getElementById("cartas2");

const numeroRodadas = document.getElementById("numeroRodadas");

const vitoriasJogador1 = document.getElementById("vitoriasJogador1");
const vitoriasJogador2 = document.getElementById("vitoriasJogador2");

let rodadas = 1;


function valorAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function start() {
    const aleatorio = valorAleatorio(1, 3);
    btn_start.disabled = true;
    document.getElementById(`btn_jogador_${aleatorio}`).disabled = false;
    document.getElementById(`btn_parar_${aleatorio}`).disabled = false;
}

function restart() {
    const aleatorio = valorAleatorio(1,3);
    document.getElementById(`btn_jogador_${aleatorio}`).disabled = false;

    cartas1.setAttribute("src", '/images/0.png');
    cartas2.setAttribute("src", '/images/0.png');

    btn_start.disabled = false;
    btn_jogador1.disabled = true;
    btn_jogador2.disabled = true;
    btn_parar1.disabled = true;
    btn_parar2.disabled = true;

    jogador1.setPontos = 0;
    jogador2.setPontos = 0;

    pontuacao.textContent = jogador1.setPontos;
    pontuacao2.textContent = jogador2.setPontos;
}

function checkTheRound() {
    if (jogador1.getpontos == 0 || jogador2.getpontos == 0) return;

    if (jogador1.getpontos > jogador2.getpontos && jogador1.getpontos <= 21) {
        jogador1.vitorias++;
        vitoriasJogador1.textContent = jogador1.vitorias;
        alert('jogador 1 venceu a rodada');
        rodadas++;
        numeroRodadas.textContent = rodadas;

        restart();
    } else if (jogador2.getpontos > jogador1.getpontos && jogador2.getpontos <= 21) {
        jogador2.vitorias++;
        vitoriasJogador2.textContent = jogador2.vitorias;
        alert('jogador 2 venceu a rodada');
        rodadas++;
        numeroRodadas.textContent = rodadas;

        restart();
    }

    if (rodadas === 11) {
        jogador1.vitorias > jogador2.vitorias ? alert('O jogador 1 venceu o jogo') : alert('O jogador 2 venceu o jogo');
        rodadas = 0;
        jogador1.vitorias = 0;
        jogador2.vitorias = 0;
        restart();
    }
}

class Player {
    constructor(cards, playButton) {
        this.vitorias = 0;
        this.pontos = 0;
        this.cards = cards;
        this.playButton = playButton;
    }

    jogar() {
        const random = valorAleatorio(1,13);
        this.cards.setAttribute("src", '../images/' + random + '.png');
        return random;
    }

    set setPontos(carta) {
        carta === 0 ? this.pontos = 0 : this.pontos = this.pontos + carta;
     }

    get getpontos() {
        return this.pontos;
    }
}

const jogador1 = new Player(cartas1);
const jogador2 = new Player(cartas2);

btn_jogador1.addEventListener('click', () => {
    const carta = jogador1.jogar();
   
    jogador1.setPontos = carta;
    pontuacao.textContent = jogador1.getpontos;

    if (jogador1.getpontos > 21) {
        alert(`jogador 1 perdeu a rodada`);
    }
});

btn_jogador2.addEventListener('click', () => {
    const carta = jogador2.jogar();
    jogador2.setPontos = carta;
    pontuacao2.textContent = jogador2.getpontos;

    if (jogador2.getpontos > 21) {
        alert(`jogador 2 perdeu a rodada`);
    }
});

btn_parar1.addEventListener('click', () => {
    btn_jogador1.disabled = true;
    btn_jogador2.disabled = false;
    btn_parar2.disabled = false;

    checkTheRound();
});

btn_parar2.addEventListener('click', () => {
    btn_jogador2.disabled = true;
    btn_jogador1.disabled = false;
    btn_parar1.disabled = false;

    checkTheRound();
});
