"use client";
import { FC, HTMLAttributes } from "react";
import styles from "./Button.module.scss";

type ButtonProps = HTMLAttributes<HTMLButtonElement>;
export const Button: FC<ButtonProps> = ({ className, children, ...props }) => {
  return (
    <div className={styles.buttonContainer}>
      <button {...props} className={`${className} ${styles.button}`}>
        {children}
      </button>
    </div>
  );
};
