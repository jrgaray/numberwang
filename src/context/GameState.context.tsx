"use client";
import { MathOperators, OperatorMap } from "@/constants/operators";
import { getTargetNumber } from "@/services/getTargetNumber";
import { Item } from "@/types/Item.type";
import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface IGameContext {
  numberList: (Item | null)[];
  filteredList: (Item | null)[];
  hasGameStarted: boolean;
  setHasGameStarted: Dispatch<SetStateAction<boolean>>;
  operator?: MathOperators;
  setOperator: Dispatch<SetStateAction<MathOperators | undefined>>;
  setNumberList: Dispatch<SetStateAction<(Item | null)[]>>;
  isSelectedLimit: boolean;
  selectedNumbers: [Item | null, Item | null];
  handleNumberSelect: (item: Item) => void;
  handleCalculate: () => number | void;
  targetNumber?: number;
  handleResetGame: () => void;
  handleGoBack: () => void;
  hasWon: boolean;
  handlePlayAgain: () => void;
}

export const GameContext = createContext<IGameContext>({
  numberList: [],
  filteredList: [],
  hasGameStarted: false,
  setNumberList: () => {},
  setOperator: () => {},
  setHasGameStarted: () => {},
  isSelectedLimit: false,
  selectedNumbers: [null, null],
  handleNumberSelect: () => {},
  handleCalculate: () => 1,
  targetNumber: 1,
  handleResetGame: () => {},
  handleGoBack: () => {},
  hasWon: false,
  handlePlayAgain: () => {},
});
const DEFAULT_STATE = [null, null, null, null, null, null];

export const useGameContext = () => useContext(GameContext);
interface GameContextProviderProps {
  children: ReactNode;
}

const isNotNull = <T,>(arg: T | null): arg is T => arg !== null;
const isNotNullArray = <T,>(arg: (T | null)[]): arg is T[] =>
  arg.every((item) => item !== null);

export const GameContextProvider: FC<GameContextProviderProps> = ({
  children,
}) => {
  const [hasWon, setHasWon] = useState(false);
  const [gameHistory, setGameHistory] = useState<(number | null)[][]>([]);
  const [numberList, setNumberList] = useState<(Item | null)[]>(DEFAULT_STATE);
  const [targetNumber, setTargetNumber] = useState<number>();
  const [operator, setOperator] = useState<MathOperators>();
  const [selectedNumbers, setSelectedNumbers] = useState<
    [Item | null, Item | null]
  >([null, null]);
  const [hasGameStarted, setHasGameStarted] = useState(false);
  const filteredList = numberList.filter(isNotNull);
  const isSelectedLimit = selectedNumbers.every((item) => !!item);

  const handlePlayAgain = () => {
    setHasGameStarted(false);
    setHasWon(false);
    setGameHistory([]);
    setNumberList([null, null, null, null, null, null]);
    setTargetNumber(undefined);
    setOperator(undefined);
    setSelectedNumbers([null, null]);
  };

  const handleNumberSelect = useCallback(
    (item: Item) => {
      if (!hasGameStarted) return;
      setNumberList((prev) => {
        if (isSelectedLimit || (prev[item.index] as Item).selected) {
          (prev[item.index] as Item).selected = false;
          const position = (prev[item.index] as Item).selectedPosition;
          if (position === 1) setSelectedNumbers((prev) => [null, prev[1]]);
          if (position === 2) setSelectedNumbers((prev) => [prev[0], null]);

          (prev[item.index] as Item).selectedPosition = undefined;
          return prev;
        }
        (prev[item.index] as Item).selected = true;
        setSelectedNumbers((p) => {
          if (!p[0]) {
            (prev[item.index] as Item).selectedPosition = 1;
            return [item, p[1]];
          } else {
            (prev[item.index] as Item).selectedPosition = 2;
            return [p[0], item];
          }
        });
        return [...prev];
      });
    },
    [hasGameStarted, selectedNumbers]
  );

  const handleCalculate = () => {
    if (!operator || !selectedNumbers[0] || !selectedNumbers[1]) return;
    const operation = OperatorMap[operator];
    const values = selectedNumbers.map((item) => (item as Item).value) as [
      number,
      number
    ];
    const [{ index: firstNumberIndex }, { index: secondNumberIndex }] =
      selectedNumbers as [Item, Item];
    const newValue = operation(...values);
    setNumberList((prev) => {
      const prevState = prev.map((item) => item?.value ?? null);
      setGameHistory((prevHistory) => [...prevHistory, prevState]);
      return prev.map((prevItem) => {
        if (prevItem?.index === firstNumberIndex) {
          return {
            ...prevItem,
            value: newValue,
            selected: false,
            selectedPosition: undefined,
          };
        }
        if (prevItem?.index === secondNumberIndex) {
          return null;
        }
        return prevItem;
      });
    });

    setOperator(undefined);
    setSelectedNumbers([null, null]);
  };

  const handleResetGame = () => {
    if (hasGameStarted && gameHistory.length > 0) {
      setSelectedNumbers([null, null]);
      setNumberList(
        gameHistory[0].map((itemValue, index) => ({
          value: itemValue as number,
          selected: false,
          index,
        }))
      );
      setGameHistory([]);
    }
  };

  const handleGoBack = () => {
    if (hasGameStarted && gameHistory.length > 0) {
      setSelectedNumbers([null, null]);
      setGameHistory((prev) => {
        const lastState = prev.pop();
        if (lastState)
          setNumberList(
            lastState.map((lastStateItem, index) =>
              lastStateItem
                ? { selected: false, value: lastStateItem, index }
                : null
            )
          );
        return [...prev];
      });
    }
  };

  useEffect(() => {
    if (hasGameStarted) {
      setTargetNumber(getTargetNumber(numberList as Item[]));
    }
  }, [hasGameStarted]);

  useEffect(() => {
    if (targetNumber) {
      const values = numberList.map((item) => (item ? item.value : null));
      if (values.includes(targetNumber)) {
        setHasWon(true);
      }
    }
  }, [numberList, targetNumber]);

  useEffect(() => {
    if (numberList[5] !== null) setHasGameStarted(true);
  }, [numberList[5]]);

  const contextValue = useMemo(
    () => ({
      numberList,
      setNumberList,
      operator,
      setOperator,
      hasGameStarted,
      setHasGameStarted,
      filteredList,
      isSelectedLimit,
      selectedNumbers,
      handleNumberSelect,
      handleCalculate,
      targetNumber,
      handleResetGame,
      handleGoBack,
      hasWon,
      handlePlayAgain,
    }),
    [
      numberList,
      setHasGameStarted,
      setOperator,
      setNumberList,
      hasGameStarted,
      operator,
      selectedNumbers,
      handleNumberSelect,
      handleCalculate,
      targetNumber,
      handleResetGame,
      handleGoBack,
      hasWon,
    ]
  );
  return (
    <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
  );
};
