import "./Actions.css";
import { dataType } from "../../redux/dataSlice";
import { useSelector } from "react-redux";
import { CompaniesResponse } from "../../services/companies.service";
import { useTranslation } from "react-i18next";
import blueBolt from "../../assets/blueBolt.svg";
import blueError from "../../assets/blueError.svg";

const mockedFilters = [
  { icon: blueBolt, iconAlt: "bolt icon", name: "energy-sensors", id: "1" },
  { icon: blueError, iconAlt: "alert icon", name: "critical", id: "2" },
];

type propsType = {};

const Actions = ({}: propsType) => {
  const { t } = useTranslation();
  const selectedCompanyId: string = useSelector(
    (state: { data: dataType }) => state.data.selectedCompanyId
  );
  const companies: CompaniesResponse = useSelector(
    (state: { data: dataType }) => state.data.companies
  );

  // IMPROVEMENT: Get filters from API
  const filters = mockedFilters;

  const onFilterButtomClick = (id: string) => {
    console.log("Filter by:", id);
  };

  return (
    <div className="actions-container">
      <h1>{t("Assets")}</h1>
      <p>
        / {companies.find((company) => company.id === selectedCompanyId)?.name}
      </p>
      <div>
        {filters.map((filter) => (
          <button
            className="white"
            key={filter.id}
            onClick={() => onFilterButtomClick(filter.id)}
          >
            <i>
              <img src={filter.icon} alt={filter.iconAlt} />
            </i>
            {t(filter.name)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Actions;
