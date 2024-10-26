import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Actions from "../../components/Actions/Actions";
import Body from "../../components/Body/Body";
import Header from "../../components/Header/Header";
import { companiesChange } from "../../redux/dataSlice";
import CompaniesService, {
  CompaniesResponse,
} from "../../services/companies.service";
import "./index.css";
import Main from "../../components/Main/Main";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    CompaniesService.getCompanies((companiesResponse: CompaniesResponse) =>
      dispatch(companiesChange(companiesResponse))
    );
  }, []);

  return (
    <>
      <Header />
      <Body>
        <Actions />
        <Main />
      </Body>
    </>
  );
}
