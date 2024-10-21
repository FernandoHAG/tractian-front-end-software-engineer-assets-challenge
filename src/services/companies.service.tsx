import axios from "axios";

const api = axios.create({
  baseURL: "https://fake-api.tractian.com/companies",
});

export type CompaniesResponse = Array<{ id: string; name: string }>;

async function getcompanies(
  callback: (data: CompaniesResponse) => void
): Promise<CompaniesResponse> {
  const response = await api.get<CompaniesResponse>("").catch((error) => {
    console.error(error);
    return { data: [] };
  });
  if (callback) callback(response.data);
  return response.data;
}

const CompaniesService = { getcompanies };
export default CompaniesService;
