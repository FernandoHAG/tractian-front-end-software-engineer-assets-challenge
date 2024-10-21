import { useEffect, useState } from "react";
import "./index.css";
import Header from "../../components/Header/Header";
import CompaniesService, {
  CompaniesResponse,
} from "../../services/companies.service";
import Body from "../../components/Body/Body";

export default function Home() {
  const [companies, setCompanies] = useState<CompaniesResponse>([]);

  useEffect(() => {
    CompaniesService.getcompanies((companiesResponse: CompaniesResponse) =>
      setCompanies(companiesResponse)
    );
  }, []);

  return (
    <>
      <Header companies={companies} />
      <Body>
        <h1>Ativos</h1>
      </Body>
    </>
  );
}
