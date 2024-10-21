import "./Header.css";
import logo from "../../assets/logo.svg";
import gold from "../../assets/gold.svg";
import { CompaniesResponse } from "../../services/companies.service";

type propsType = {
  companies: CompaniesResponse;
};

const Header = ({ companies }: propsType) => {
  const selectCompany = (selectedCompanyId: string) => {
    console.log(selectedCompanyId);
  };

  return (
    <div className="header">
      <img src={logo} alt="logo" />
      <div className="menu">
        {companies.map((company) => (
          <button key={company.id} onClick={() => selectCompany(company.id)}>
            <i>
              <img src={gold} alt="gold" />
            </i>
            {company.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Header;
