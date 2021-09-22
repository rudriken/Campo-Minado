let corpo = document.querySelector("body");
let placar = document.querySelector("#jogada");

let Campo = {
    quantBombas() {
        return Math.ceil(this.pegarLinhasColunas()[0] * this.pegarLinhasColunas()[1] * 0.2);
    },
    mascaraBombas: [],
    mascaraBombasAoRedor: [],
    jogadas: 0,
    inicializado: false,
    jogoFinalizado: false,
    iniciar() {
        this.criarElementosEntrada();
    },
    renderizarHTML() {
        let tabela = document.createElement("table");
        tabela.setAttribute("id", "tabela");
        let html = "<tbody>";
        for (let l = 1; l <= this.pegarLinhasColunas()[0]; l++) {
            html += "<tr>";
            for (let c = 1; c <= this.pegarLinhasColunas()[1]; c++) {
                html += `
					<td id="l-${l}/c-${c}" class="I" onclick="Campo.mouseBotaoEsquerdo(${l}, ${c})" oncontextmenu="Campo.mouseBotaoDireito(${l}, ${c})">
					</td>
				`;
            }
            html += "</tr>";
        }
        html += "</tbody>";
        tabela.innerHTML = html;
        corpo.appendChild(tabela);
    },
    sortearLocaisBombas() {
        let bombas = 0;
        let locaisBombas = [];
        let localBomba;
        while (bombas < this.quantBombas()) {
            localBomba = [
                Math.ceil(Math.random() * this.pegarLinhasColunas()[0]),
                Math.ceil(Math.random() * this.pegarLinhasColunas()[1]),
            ];
            if (bombas == 0) {
                locaisBombas.push(localBomba);
                bombas++;
            } else {
                let repetido = 0;
                for (let i = 0; i < locaisBombas.length; i++) {
                    if (
                        locaisBombas[i][0] == localBomba[0] &&
                        locaisBombas[i][1] == localBomba[1]
                    ) {
                        repetido++;
                    }
                }
                if (repetido == 0) {
                    locaisBombas.push(localBomba);
                    bombas++;
                }
            }
        }
        return locaisBombas;
    },
    renderizarMascaraBombas() {
        for (let l = 0; l < this.pegarLinhasColunas()[0]; l++) {
            let mascaraLinha = [];
            for (let c = 0; c < this.pegarLinhasColunas()[1]; c++) {
                mascaraLinha.push(" ");
            }
            this.mascaraBombas.push(mascaraLinha);
        }
        //console.log("this.mascaraBombas: ", this.mascaraBombas);
    },
    colocarBombasNaMascaraBombas() {
        let locaisBombas = this.sortearLocaisBombas();
        for (let i = 0; i < locaisBombas.length; i++) {
            for (let l = 0; l < this.mascaraBombas.length; l++) {
                for (let c = 0; c < this.mascaraBombas[l].length; c++) {
                    if (locaisBombas[i][0] == l + 1 && locaisBombas[i][1] == c + 1) {
                        this.mascaraBombas[l][c] = "B";
                    }
                }
            }
        }
    },
    mouseBotaoEsquerdo(l, c) {
        //console.log("pressisonado o botão esquerdo");
        this.verificarJogada(l, c);
    },
    mouseBotaoDireito(l, c) {
        let celula = document.querySelector(`[id="l-${l}/c-${c}"]`);
        document.querySelector(`[id="tabela"]`).oncontextmenu = (e) => {
            e.preventDefault();
        };
        //console.log("pressisonado o botão direito");
        if (!this.jogoFinalizado && celula.getAttribute("class") == "I") {
            celula.setAttribute("class", "P");
            celula.innerHTML = "<img src='./imagens/certeza.jpg' height=65px>";
        } else if (!this.jogoFinalizado && celula.getAttribute("class") == "P") {
            celula.setAttribute("class", "D");
            celula.innerHTML = "<img src='./imagens/duvida.jpg' height=65px>";
        } else if (!this.jogoFinalizado && celula.getAttribute("class") == "D") {
            celula.setAttribute("class", "I");
            celula.textContent = "";
        }
    },
    renderizarMascaraBombasAoRedor() {
        let contarBombasAoRedor;
        let mascaraBombasAoRedorLinha = [];
        for (let l = 0; l < this.mascaraBombas.length; l++) {
            for (let c = 0; c < this.mascaraBombas[l].length; c++) {
                contarBombasAoRedor = 0;
                if (this.mascaraBombas[l][c] == "B") {
                    contarBombasAoRedor = "B";
                } else {
                    // acima
                    try {
                        if (this.mascaraBombas[l - 1][c] == "B") {
                            contarBombasAoRedor++;
                        }
                    } catch (erro) {}
                    // acima-direita
                    try {
                        if (this.mascaraBombas[l - 1][c + 1] == "B") {
                            contarBombasAoRedor++;
                        }
                    } catch (erro) {}
                    // direita
                    try {
                        if (this.mascaraBombas[l][c + 1] == "B") {
                            contarBombasAoRedor++;
                        }
                    } catch (erro) {}
                    // abaixo-direita
                    try {
                        if (this.mascaraBombas[l + 1][c + 1] == "B") {
                            contarBombasAoRedor++;
                        }
                    } catch (erro) {}
                    // abaixo
                    try {
                        if (this.mascaraBombas[l + 1][c] == "B") {
                            contarBombasAoRedor++;
                        }
                    } catch (erro) {}
                    // abaixo-esquerda
                    try {
                        if (this.mascaraBombas[l + 1][c - 1] == "B") {
                            contarBombasAoRedor++;
                        }
                    } catch (erro) {}
                    // esquerda
                    try {
                        if (this.mascaraBombas[l][c - 1] == "B") {
                            contarBombasAoRedor++;
                        }
                    } catch (erro) {}
                    // acima-esquerda
                    try {
                        if (this.mascaraBombas[l - 1][c - 1] == "B") {
                            contarBombasAoRedor++;
                        }
                    } catch (erro) {}
                }
                contarBombasAoRedor = contarBombasAoRedor == 0 ? "" : contarBombasAoRedor;
                mascaraBombasAoRedorLinha.push(contarBombasAoRedor);
            }
            this.mascaraBombasAoRedor.push(mascaraBombasAoRedorLinha);
            mascaraBombasAoRedorLinha = [];
        }
        //console.log(this.mascaraBombasAoRedor);
    },
    verificarJogada(l, c) {
        // recebe parâmetros que indica o óndice da renderização HTML
        let celula = document.querySelector(`[id="l-${l}/c-${c}"]`);
        let resultado;
        resultado = document.querySelector("#jogada");
        if (
            !this.jogoFinalizado &&
            this.mascaraBombas[l - 1][c - 1] == "B" &&
            celula.getAttribute("class") == "I"
        ) {
            resultado.setAttribute("class", "perdedor");
            resultado.innerText = "Game Over. Você PERDEU!!! ";
            console.log("Game Over. Você PERDEU!!! ");
            this.jogoFinalizado = true;
            this.inicializado = false;
            this.mostrarTodasAsBombas(l, c);
        } else if (!this.jogoFinalizado && celula.getAttribute("class") == "I") {
            celula.setAttribute("class", "V");
            celula.textContent = this.mascaraBombasAoRedor[l - 1][c - 1];
            this.jogadas++;
            if (
                this.jogadas ==
                this.pegarLinhasColunas()[0] * this.pegarLinhasColunas()[1] -
                    this.quantBombas()
            ) {
                this.jogoFinalizado = true;
                this.inicializado = false;
                resultado.setAttribute("class", "ganhador");
                resultado.innerText = `Você GANHOU!!! Desviou de ${this.quantBombas()} ${
                    this.quantBombas() == 1 ? " bomba" : " bombas"
                }!`;
                console.log("Você GANHOU!!! ");
            }
            //console.log(this.jogadas)
        }
    },
    mostrarTodasAsBombas(l, c) {
        //console.log(l, c)
        let celula;
        for (let lin = 1; lin <= this.pegarLinhasColunas()[0]; lin++) {
            for (let col = 1; col <= this.pegarLinhasColunas()[1]; col++) {
                if (this.mascaraBombas[lin - 1][col - 1] == "B") {
                    celula = document.querySelector(`[id="l-${lin}/c-${col}"]`);
                    if (lin == l && col == c) {
                        celula.innerHTML =
                            "<img src='./imagens/bomba-explodindo.png' height=65px>";
                        celula.setAttribute("class", "B");
                    } else {
                        celula.innerHTML =
                            "<img src='./imagens/bomba-desarmada.png' height=65px>";
                    }
                }
            }
        }
    },
    criarElementosEntrada() {
        let rotuloLinha = document.createElement("label");
        rotuloLinha.setAttribute("for", "linhas");
        rotuloLinha.innerText = "Linhas: ";
        let linhas = document.createElement("input");
        linhas.setAttribute("type", "number");
        linhas.setAttribute("id", "linhas");

        let rotuloColuna = document.createElement("label");
        rotuloColuna.setAttribute("for", "colunas");
        rotuloColuna.innerText = " Colunas: ";
        let colunas = document.createElement("input");
        colunas.setAttribute("type", "number");
        colunas.setAttribute("id", "colunas");

        let botaoComecar = document.createElement("button");
        botaoComecar.textContent = "Começar";
        botaoComecar.onclick = function () {
            let reiniciar = false;
            if (Campo.inicializado) {
                reiniciar = window.confirm(
                    "Tem certeza? Você já começou. Esse jogo será reiniciado se clicar em 'OK'!"
                );
            }
            if (!Campo.inicializado || reiniciar) {
                placar.innerText = "";
                Campo.mascaraBombas = [];
                Campo.mascaraBombasAoRedor = [];
                Campo.jogadas = 0;
                Campo.jogoFinalizado = false;
                Campo.apagarTabela();
                Campo.renderizarHTML();
                Campo.renderizarMascaraBombas();
                Campo.colocarBombasNaMascaraBombas();
                Campo.renderizarMascaraBombasAoRedor();
                Campo.inicializado = true;
            }
        };

        rotuloLinha.appendChild(linhas);
        rotuloColuna.appendChild(colunas);

        corpo.appendChild(rotuloLinha);
        corpo.appendChild(rotuloColuna);
        corpo.appendChild(botaoComecar);
    },
    pegarLinhasColunas() {
        let linhas = document.querySelector("#linhas").value || 5;
        let colunas = document.querySelector("#colunas").value || 5;
        return [linhas, colunas];
    },
    apagarTabela() {
        try {
            let tabela = document.querySelector("#tabela");
            let pai = document.createElement("div");
            pai.appendChild(tabela);
            corpo.appendChild(pai);
            pai.innerText = "";
            pai.remove();
        } catch (erro) {}
    },
};

Campo.iniciar();
