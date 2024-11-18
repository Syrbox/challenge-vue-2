import api from "@/services/api.js";

export const getShowsByPage = async (page) => {
  try {
    const url = `/shows?page=${page}`;
    const request = await api.get(url);

    return filterResponse(request.data);
  } catch (err) {
    // TODO
  }
  return undefined;
};

function filterResponse(response) {
  return response.map((response) => {
    const { image, name, type, network, officialSite, genres } = response;
    return {
      image: image?.original || "",
      name,
      type,
      network: network?.name || "",
      officialSite,
      genres
    };
  });
}