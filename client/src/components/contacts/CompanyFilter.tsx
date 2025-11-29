interface Props {
    contacts: any[];
    companyFilter: string;
    setCompanyFilter: (value: string) => void;
  }
  
  export function CompanyFilter({ contacts, companyFilter, setCompanyFilter }: Props) {
    // derive unique company names
    const companies = Array.from(
      new Set(
        contacts
          .map((c) => c.company)
          .filter(Boolean) // remove null/undefined
      )
    );
  
    return (
      <select
        value={companyFilter}
        onChange={(e) => setCompanyFilter(e.target.value)}
        style={{ padding: 8, width: "100%", marginBottom: 12 }}
      >
        <option value="">All Companies</option>
        {companies.map((company) => (
          <option key={company} value={company}>
            {company}
          </option>
        ))}
      </select>
    );
  }
  