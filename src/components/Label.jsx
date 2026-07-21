import styles from "./Label.module.css";

function formatDate(data) {
  if (!data) return "--/--/--";

  const [ano, mes, dia] = data.split("-");

  return `${dia}/${mes}/${ano.slice(2)}`;
}

function Label({
  produto,
  fabricacao,
  validade,
  lote,
  quantidade,
  responsavel,
}) {
  return (
    <div className={styles.label}>

      <div className={styles.produto}>
        {produto || "Produto"}
      </div>

      <div className={styles.line}></div>

      <div className={styles.row}>
        <span>
          <strong>Fab.:</strong> {formatDate(fabricacao)}
        </span>

        <span>
          <strong>Val.:</strong> {formatDate(validade)}
        </span>
      </div>

      <div className={styles.row}>
        <span>
          <strong>Lote:</strong> {lote || "---"}
        </span>

        <span>
          <strong>Qtde:</strong> {quantidade || "0"}
        </span>
      </div>

      <div className={styles.responsavel}>
        <strong>Resp.:</strong> {responsavel}
      </div>

    </div>
  );
}

export default Label;