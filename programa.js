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
        console.log("locaisBombas: ", locaisBombas);
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
        console.log("locaisBombas:", locaisBombas);
        console.log("this.mascaraBombas: ", this.mascaraBombas);
    },
    mouseBotaoEsquerdo(l, c) {
        console.log("pressisonado o botão esquerdo");
    },
    mouseBotaoDireito(l, c) {
        document.querySelector(`[id="tabela"]`).oncontextmenu = (e) => {
            e.preventDefault();
        };
        console.log("pressisonado o botão direito");
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
				mascaraBombasAoRedorLinha.push(contarBombasAoRedor);
            }
			this.mascaraBombasAoRedor.push(mascaraBombasAoRedorLinha);
			mascaraBombasAoRedorLinha = [];
        }
        console.log(this.mascaraBombasAoRedor);
    },
};

Campo.renderizarHTML();

Campo.renderizarMascaraBombas();
Campo.colocarBombasNaMascaraBombas();
Campo.renderizarMascaraBombasAoRedor();
