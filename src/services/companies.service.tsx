import axios from "axios";

const api = axios.create({
  baseURL: "https://fake-api.tractian.com/companies",
});

export type companyType = {
  id: string;
  name: string;
};
export type CompaniesResponse = Array<companyType>;
export type locationType = {
  id: string;
  name: string;
  parentId: string | null;
};
export type LocationsResponse = Array<locationType>;
export type assetType = {
  id: string;
  name: string;
  locationId: string | null;
  parentId: string | null;
  sensorType?: string | null;
  sensorId?: string | null;
  status?: string | null;
  gatewayId?: string | null;
  imageUrl?: string | null;
  responsable?: string | null;
};
export type AssetsResponse = Array<assetType>;

async function getCompanies(
  callback?: (data: CompaniesResponse) => void
): Promise<CompaniesResponse> {
  const response = await api.get<CompaniesResponse>("").catch((error) => {
    console.error("Error on fetching companies", error);
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
    console.error("Error on fetching locations:", error);
    return [];
  }
}

async function getCompanyAssets(companyId: string): Promise<AssetsResponse> {
  try {
    const response = await api.get<AssetsResponse>(`/${companyId}/assets`);
    return response.data;
  } catch (error) {
    console.error("Error on fetching assets:", error);
    return [];
  }
}

const CompaniesService = {
  getCompanies,
  getCompanyLocations,
  getCompanyAssets,
};
export default CompaniesService;
