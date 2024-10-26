import axios from "axios";

const api = axios.create({
  baseURL: "https://fake-api.tractian.com/companies",
});

export type CompaniesResponse = Array<{ id: string; name: string }>;
export type LocationsResponse = Array<{
  id: string;
  name: string;
  parentId: string | null;
}>;
export type AssetsResponse = Array<{
  id: string;
  name: string;
  locationId: string | null;
  parentId: string | null;
  sensorType?: string;
  status?: string;
}>;

async function getCompanies(
  callback?: (data: CompaniesResponse) => void
): Promise<CompaniesResponse> {
  const response = await api.get<CompaniesResponse>("").catch((error) => {
    console.error(error);
    return { data: [] };
  });
  if (callback) callback(response.data);
  return response.data;
}

async function getCompanyLocations(
  companyId: string
): Promise<LocationsResponse> {
  try {
    const response = await api.get<LocationsResponse>(
      `/${companyId}/locations`
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar locais:", error);
    return [];
  }
}

async function getCompanyAssets(companyId: string): Promise<AssetsResponse> {
  try {
    const response = await api.get<AssetsResponse>(`/${companyId}/assets`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar ativos:", error);
    return [];
  }
}

const CompaniesService = {
  getCompanies,
  getCompanyLocations,
  getCompanyAssets,
};
export default CompaniesService;
