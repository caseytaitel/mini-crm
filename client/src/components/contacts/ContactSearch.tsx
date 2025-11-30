import styles from "./ContactSearch.module.css";

interface Props {
    search: string;
    setSearch: (value: string) => void;
  }
  
  export function ContactSearch({ search, setSearch }: Props) {
    return (
      <input
        type="text"
        placeholder="Search contacts..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={styles.input}
      />
    );
  }
  