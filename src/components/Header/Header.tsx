import "./Header.css";
import logo from "../../assets/logo.svg";
import gold from "../../assets/gold.svg";
import { dataType, selectedCompanyIdChange } from "../../redux/dataSlice";
import { useDispatch, useSelector } from "react-redux";
import { CompaniesResponse } from "../../services/companies.service";

type propsType = {};

const Header = ({}: propsType) => {
  const dispatch = useDispatch();
  const companies: CompaniesResponse = useSelector(
    (state: { data: dataType }) => state.data.companies
  );
  const onSelectCompany = (selectedCompanyId: string) => {
    dispatch(selectedCompanyIdChange(selectedCompanyId));
  };

  return (
    <div className="header">
      <img src={logo} alt="logo" />
      <div className="menu">
        {companies.map((company) => (
          <button key={company.id} onClick={() => onSelectCompany(company.id)}>
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
