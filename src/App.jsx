
import styles from "./App.module.css";
import responsaveis from "./data/responsaveis";
import Label from "./components/Label";
import { useReactToPrint } from "react-to-print";
import { useState, useRef } from "react";

function App() {
  const [produto, setProduto] = useState("");
  const [fabricacao, setFabricacao] = useState("");
  const [validade, setValidade] = useState("");
  const [lote, setLote] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [responsavel, setResponsavel] = useState(responsaveis[0]);

      const labelRef = useRef(null);

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

  return (
  <div className={styles.container}>
    <div className={styles.card}>

      <h1>Etiquetas</h1>

      <div className={styles.content}>

        <div className={styles.left}>

          <div className={styles.form}>

            <label>Produto</label>
            <input
              type="text"
              value={produto}
              onChange={(e) => setProduto(e.target.value)}
            />

            <label>Fabricação</label>
            <input
              type="date"
              value={fabricacao}
              onChange={(e) => setFabricacao(e.target.value)}
            />

            <label>Validade</label>
            <input
              type="date"
              value={validade}
              onChange={(e) => setValidade(e.target.value)}
            />

            <label>Lote</label>
            <input
              type="text"
              value={lote}
              onChange={(e) => setLote(e.target.value)}
            />

            <label>Quantidade</label>
            <input
              type="number"
              value={quantidade}
              onChange={(e) => setQuantidade(e.target.value)}
            />

            <label>Responsável</label>

            <select
              value={responsavel}
              onChange={(e) => setResponsavel(e.target.value)}
            >
              {responsaveis.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

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

              <div ref={labelRef} style={{width:"100mm", height:"70mm"}}>

            <Label
                produto={produto}
                fabricacao={fabricacao}
                validade={validade}
                lote={lote}
                quantidade={quantidade}
                responsavel={responsavel}
            />

        </div>

            </div>

          </div>

                  </div>

                </div>

              </div>
            
          );

}

export default App;