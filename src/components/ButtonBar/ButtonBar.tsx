import { FC } from "react";
import { Button } from "../Button";

import styles from "./ButtonBar.module.scss";
import { MathOperators } from "@/constants/operators";
import { useGameContext } from "@/context";
import { getHighItem } from "@/services/getHighNumber";
import { getLowItem } from "@/services/getLowNumber";

export const ButtonBar: FC = () => {
  const {
    setOperator,
    handleCalculate,
    hasGameStarted,
    filteredList,
    setNumberList,
    handleGoBack,
    handleResetGame,

    operator,
  } = useGameContext();
  const handleOperator = (operator: MathOperators) => () =>
    setOperator(operator);

  return hasGameStarted ? (
    <div className={styles.container}>
      <Button
        className={operator === MathOperators.Addition ? styles.selected : ""}
        onClick={handleOperator(MathOperators.Addition)}
      >
        +
      </Button>
      <Button
        className={
          operator === MathOperators.Subtraction ? styles.selected : ""
        }
        onClick={handleOperator(MathOperators.Subtraction)}
      >
        -
      </Button>
      <Button
        className={
          operator === MathOperators.Multiplication ? styles.selected : ""
        }
        onClick={handleOperator(MathOperators.Multiplication)}
      >
        *
      </Button>
      <Button
        className={operator === MathOperators.Division ? styles.selected : ""}
        onClick={handleOperator(MathOperators.Division)}
      >
        /
      </Button>
      <Button
        className={operator === MathOperators.Smoosh ? styles.selected : ""}
        onClick={handleOperator(MathOperators.Smoosh)}
      >
        &
      </Button>
      <Button onClick={handleGoBack}>Back</Button>
      <Button onClick={handleCalculate}>Enter</Button>
      <Button onClick={handleResetGame}>Reset</Button>
    </div>
  ) : (
    <>
      <Button
        onClick={() =>
          setNumberList((prev) => {
            prev[filteredList.length] = getHighItem(filteredList.length);
            return [...prev];
          })
        }
      >
        High Number
      </Button>
      <Button
        onClick={() =>
          setNumberList((prev) => {
            prev[filteredList.length] = getLowItem(filteredList.length);
            return [...prev];
          })
        }
      >
        Low Number
      </Button>
    </>
  );
};
