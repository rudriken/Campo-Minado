let Campo = {
    linhas: 5,
    colunas: 8,
    bombas: 5,
    mascaraBombas: [],
    mascaraBombasAoRedor: [],
    jogoFinalizado: false,
    renderizarHTML() {
        let corpo = document.querySelector("body");
        let tabela = document.createElement("table");
        tabela.setAttribute("id", "tabela");
        let html = "<tbody>";
        for (let l = 1; l <= this.linhas; l++) {
            html += "<tr>";
            for (let c = 1; c <= this.colunas; c++) {
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
        while (bombas < this.bombas) {
            localBomba = [
                Math.trunc(Math.random() * this.linhas) + 1,
                Math.trunc(Math.random() * this.colunas) + 1,
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
        for (let l = 0; l < this.linhas; l++) {
            let mascaraLinha = [];
            for (let c = 0; c < this.colunas; c++) {
                mascaraLinha.push(" ");
            }
            this.mascaraBombas.push(mascaraLinha);
        }
        console.log("this.mascaraBombas: ", this.mascaraBombas);
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
        console.log("pressisonado o botão esquerdo");
        this.verificarJogada(l, c);
    },
    mouseBotaoDireito(l, c) {
        let celula = document.querySelector(`[id="l-${l}/c-${c}"]`);
        document.querySelector(`[id="tabela"]`).oncontextmenu = (e) => {
            e.preventDefault();
        };
        console.log("pressisonado o botão direito");
        if (!this.jogoFinalizado && celula.getAttribute("class") == "I") {
            celula.setAttribute("class", "P");
            celula.innerHTML = "<img src='./certeza.jpg' height=110px>";
        } else if (!this.jogoFinalizado && celula.getAttribute("class") == "P") {
            celula.setAttribute("class", "D");
            celula.innerHTML = "<img src='./duvida.jpg' height=110px>";
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
        console.log(this.mascaraBombasAoRedor);
    },
    verificarJogada(l, c) {
        // recebe parâmetros que indica o óndice da renderização HTML
        let celula = document.querySelector(`[id="l-${l}/c-${c}"]`);
        if (
            !this.jogoFinalizado &&
            this.mascaraBombas[l - 1][c - 1] == "B" &&
            celula.getAttribute("class") == "I"
        ) {
            console.log("Game Over");
            celula.setAttribute("class", "B");
            celula.innerHTML = "<img src='./bomba.png' height=110px>";
            this.jogoFinalizado = true;
        } else if (!this.jogoFinalizado && celula.getAttribute("class") == "I") {
            celula.setAttribute("class", "V");
            celula.textContent = this.mascaraBombasAoRedor[l - 1][c - 1];
        }
    },
};

Campo.renderizarHTML();

Campo.renderizarMascaraBombas();
Campo.colocarBombasNaMascaraBombas();
Campo.renderizarMascaraBombasAoRedor();
