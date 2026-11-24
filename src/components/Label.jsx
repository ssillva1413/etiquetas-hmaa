
import styles from "./Label.module.css";

function formatDate(data) {
  if (!data) return "--/--/--";

  const [ano, mes, dia] = data.split("-");

  return `${dia}/${mes}/${ano.slice(2)}`;
}

function exibirValor(campo, valor) {
  if (campo.tipo === "data") {
    return formatDate(valor);
  }

  return valor || "---";
}

function Label({ campos }) {
  const {
    produto,
    fabricacao,
    validade,
    lote,
    quantidade,
    responsavel,
  } = campos;

  return (
    <div className={styles.label}>

      <div className={styles.produto}>
        <strong>
          {produto.rotulo || "Produto"}
        </strong>

        {produto.valor ? `: ${exibirValor(produto, produto.valor)}` : ""}
      </div>

      <div className={styles.line}></div>

      <div className={styles.row}>
        <span>
          <strong>{fabricacao.rotulo || "Fab.:"}</strong>{" "}
          {exibirValor(fabricacao, fabricacao.valor)}
        </span>

        <span>
          <strong>{validade.rotulo || "Val.:"}</strong>{" "}
          {exibirValor(validade, validade.valor)}
        </span>
      </div>

      <div className={styles.row}>
        <span>
          <strong>{lote.rotulo || "Lote:"}</strong>{" "}
          {exibirValor(lote, lote.valor)}
        </span>

        <span>
          <strong>{quantidade.rotulo || "Qtde:"}</strong>{" "}
          {exibirValor(quantidade, quantidade.valor)}
        </span>
      </div>

      <div className={styles.responsavel}>
        <strong>{responsavel.rotulo || "Resp.:"}</strong>{" "}
        {responsavel.valor}
      </div>

    </div>
  );
}

export default Label;
