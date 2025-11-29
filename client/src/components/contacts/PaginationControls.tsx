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
      <div
        style={{
          display: "flex",
          gap: 8,
          marginTop: 12,
          justifyContent: "center",
        }}
      >
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Prev
        </button>
  
        {pages.map((p) => (
          <button
            key={p}
            onClick={() => setCurrentPage(p)}
            style={{
              fontWeight: p === currentPage ? "bold" : "normal",
              textDecoration: p === currentPage ? "underline" : "none",
            }}
          >
            {p}
          </button>
        ))}
  
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    );
  }
  