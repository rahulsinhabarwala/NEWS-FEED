import axios from "axios";

export const fetchTags = (debouncedSearchString) => {
  if (!debouncedSearchString) {
    return Promise.resolve([]);
  }
  return axios
    .get(
      `https://content.guardianapis.com/tags?q=${debouncedSearchString}&type=keyword&show-references=all&api-key=test`
    )
    .then((response) => response.data.response.results)
    .catch((error) => console.error(error));
};

export const fetchSearchResults = (query, page, pageSize) => {
  const url = `https://content.guardianapis.com/search?api-key=test&q=${query}&show-fields=thumbnail,headline&show-tags=keyword&page=${page}&page-size=${pageSize}`;
  return axios.get(url).then((response) => response.data.response);
};
