import { useGameContext } from "@/context";
import styles from "./TargetNumber.module.scss";

export const TargetNumber = () => {
  const { targetNumber, hasWon, handlePlayAgain } = useGameContext();
  return (
    <>
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
