import styles from "./PaginationControls.module.css";

interface Props {
    currentPage: number;
    totalPages: number;
    setCurrentPage: (n: number) => void;
  }
  
  export function PaginationControls({
    currentPage,
    totalPages,
    setCurrentPage,
  }: Props) {
    if (totalPages <= 1) return null;
  
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  
    return (
      <div className={styles.container}>
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className={styles.pageButton}
        >
          Prev
        </button>

        {pages.map((p) => (
          <button
            key={p}
            onClick={() => setCurrentPage(p)}
            className={p === currentPage ? styles.pageButtonActive : styles.pageButton}
          >
            {p}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className={styles.pageButton}
        >
          Next
        </button>
      </div>
    );
  }
  