import { FC } from "react";
import styles from "./NumberList.module.scss";
import { useGameContext } from "@/context";

export const NumberList: FC = () => {
  const { numberList, handleNumberSelect } = useGameContext();
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
    </>
  );
};
