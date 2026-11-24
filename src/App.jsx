
import styles from "./App.module.css";
import responsaveis from "./data/responsaveis";
import Label from "./components/Label";
import { useReactToPrint } from "react-to-print";
import { useState, useRef } from "react";

// Campos e configurações iniciais
const camposIniciais = {
  produto: {
    rotulo: "Produto",
    tipo: "texto",
    valor: "",
  },
  fabricacao: {
    rotulo: "Fab.:",
    tipo: "data",
    valor: "",
  },
  validade: {
    rotulo: "Val.:",
    tipo: "data",
    valor: "",
  },
  lote: {
    rotulo: "Lote:",
    tipo: "texto",
    valor: "",
  },
  quantidade: {
    rotulo: "Qtde:",
    tipo: "texto",
    valor: "",
  },
  responsavel: {
    rotulo: "Resp.:",
    tipo: "lista",
    valor: "",
  },
};

const nomesCampos = {
  produto: "Produto",
  fabricacao: "Fabricação",
  validade: "Validade",
  lote: "Lote",
  quantidade: "Quantidade",
  responsavel: "Responsável",
};

function App() {
  const [campos, setCampos] = useState(camposIniciais);

  const labelRef = useRef(null);

  // Atualiza o título de cada campo
  const atualizarRotulo = (campo, rotulo) => {
    setCampos((anterior) => ({
      ...anterior,
      [campo]: {
        ...anterior[campo],
        rotulo,
      },
    }));
  };

  // Atualiza o tipo de preenchimento
  const atualizarTipo = (campo, tipo) => {
    setCampos((anterior) => ({
      ...anterior,
      [campo]: {
        ...anterior[campo],
        tipo,
      },
    }));
  };

  // Atualiza o conteúdo de cada campo
  const atualizarValor = (campo, valor) => {
    setCampos((anterior) => ({
      ...anterior,
      [campo]: {
        ...anterior[campo],
        valor,
      },
    }));
  };

  const handlePrint = useReactToPrint({
    contentRef: labelRef,
    documentTitle: "Etiqueta",
    pageStyle: `
      @page {
        size: 100mm 70mm;
        margin: 0;
      }

      body {
        margin: 0;
        padding: 0;
      }

      * {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
    `,
  });

  // Renderiza os controles de cada campo
  const renderCampo = (campo) => {
    const configuracao = campos[campo];

    return (
      <div key={campo}>
        <label>
          Título - {nomesCampos[campo]}
        </label>

        <input
          type="text"
          value={configuracao.rotulo}
          onChange={(e) =>
            atualizarRotulo(campo, e.target.value)
          }
        />

        <label>
          Tipo de preenchimento
        </label>

        <select
          value={configuracao.tipo}
          onChange={(e) =>
            atualizarTipo(campo, e.target.value)
          }
        >
          <option value="texto">Texto livre</option>
          <option value="data">Data</option>

          {campo === "responsavel" && (
            <option value="lista">
              Lista de responsáveis
            </option>
          )}
        </select>

        <label>
          {nomesCampos[campo]}
        </label>

        {configuracao.tipo === "data" ? (
          <input
            type="date"
            value={configuracao.valor}
            onChange={(e) =>
              atualizarValor(campo, e.target.value)
            }
          />
        ) : configuracao.tipo === "lista" ? (
          <select
            value={configuracao.valor}
            onChange={(e) =>
              atualizarValor(campo, e.target.value)
            }
          >
            <option value="">Selecione...</option>

            {responsaveis.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        ) : (
          <input
            type="text"
            value={configuracao.valor}
            onChange={(e) =>
              atualizarValor(campo, e.target.value)
            }
          />
        )}
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Etiquetas</h1>

        <div className={styles.content}>
          <div className={styles.left}>
            <div className={styles.form}>

              {Object.keys(campos).map((campo) =>
                renderCampo(campo)
              )}

              <button
                className={styles.printButton}
                onClick={handlePrint}
              >
                🖨️ Imprimir
              </button>

            </div>
          </div>

          <div className={styles.right}>
            <div className={styles.previewTitle}>
              Pré-visualização da Etiqueta
            </div>

            <div className={styles.preview}>
              <div
                ref={labelRef}
                style={{
                  width: "100mm",
                  height: "70mm",
                }}
              >
                <Label campos={campos} />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
