let Campo = {
    linhas: 5,
    colunas: 6,
    bombas: 5,
    mascaraBombas: [],
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
					<td id="l-${l}/c-${c}" class="I" onclick="mouseBotaoEsquerdo(${l}, ${c})" oncontextmenu="mouseBotaoDireito(${l}, ${c})">
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
        while (bombas <= this.bombas) {
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
        console.log(locaisBombas);
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
        console.log(locaisBombas);
        console.log(this.mascaraBombas);
    },
};

Campo.renderizarHTML();

Campo.renderizarMascaraBombas();
Campo.colocarBombasNaMascaraBombas();
