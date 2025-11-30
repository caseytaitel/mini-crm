import type { Contact } from "../../types/Contact";
import styles from "./CompanyFilter.module.css";

interface Props {
  contacts: Contact[];
  companyFilter: string;
  setCompanyFilter: (v: string) => void;
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
      className={styles.select}
    >
      {/* ALL COMPANIES OPTION */}
      <option
        value=""
        className={companyFilter === "" ? styles.optionSelected : styles.option}
      >
        All Companies
      </option>

      {/* ONE OPTION PER UNIQUE COMPANY */}
      {companies.map((company) => (
        <option
          key={company}
          value={company}
          className={companyFilter === company ? styles.optionSelected : styles.option}
        >
          {company}
        </option>
      ))}
    </select>
  );
}