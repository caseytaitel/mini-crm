import styles from "./SortControls.module.css";

type Props = {
    sortOrder: "asc" | "desc";
    setSortOrder: (v: "asc" | "desc") => void;
  };
  
  export function SortControls({ sortOrder, setSortOrder }: Props) {
    return (
      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
        className={styles.select}
      >
        <option value="asc">Name: A → Z</option>
        <option value="desc">Name: Z → A</option>
      </select>
    );
  }
  