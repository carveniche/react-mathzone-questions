import styles from "../custom.module.css";
import parse from "html-react-parser";

export default function SingleCard({ card, handleChoice, flipped, disabled }) {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };
  return (
    <div className={styles.card}>
      <div className={flipped ? styles.flipped : ""}>
        <div className={styles.front}>
          <div>{parse(card.src)}</div>
        </div>
        <div className={styles.back} onClick={handleClick}></div>
      </div>
    </div>
  );
}
