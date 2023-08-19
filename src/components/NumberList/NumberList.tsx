import { FC } from "react";
import styles from "./NumberList.module.scss";
import { useGameContext } from "@/context";

export const NumberList: FC = () => {
  const {
    numberList,
    handleNumberSelect,
    targetNumber,
    hasWon,
    handlePlayAgain,
  } = useGameContext();
  return (
    <>
      <div className={styles.numberList}>
        {numberList.map((item, index) =>
          item ? (
            <span
              key={index}
              onClick={() => handleNumberSelect(item)}
              className={`${styles.numberItem} ${
                item.selectedPosition === 1 && styles.firstSelected
              } ${item.selectedPosition === 2 && styles.secondSelected} ${
                item.selected ? styles.selected : ""
              } ${styles.item}`}
            >
              {item.value}
            </span>
          ) : (
            <span key={index} className={styles.item} />
          )
        )}
      </div>
      {targetNumber && (
        <div className={styles.target}>
          <h2>{targetNumber}</h2>
        </div>
      )}
      {hasWon && (
        <>
          <p>You won!</p>
          <a href="#" onClick={handlePlayAgain}>
            Play again?
          </a>
        </>
      )}
    </>
  );
};
