import httpClient from "../Repository";
// Start api family relationship
const getAllFamilyRelationshipApi = () => {
  return httpClient.get(`/personnel/relative-title/list`);
};
// End api family relationship
export { getAllFamilyRelationshipApi };
