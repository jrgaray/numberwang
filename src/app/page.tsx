"use client";
import { ButtonBar, NumberList, TargetNumber } from "@/components";

import styles from "./page.module.scss";

export default function Home() {
  return (
    <main className={styles.container}>
      <h1 className={styles.header}>Numberwang</h1>
      <div className={styles.content}>
        <TargetNumber />
      </div>
      <div>
        <NumberList />
        <ButtonBar />
      </div>
    </main>
  );
}
