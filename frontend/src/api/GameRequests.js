import axios from "axios";

const key = "b393db6f6a0c4813a48a11168ee37324";

const axiosInstance = axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key,
    page_size: 40,
    stores: "2, 3",
  },
});

const getRandomPageNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getGameList = async (params) => {
  const randomPage = getRandomPageNumber(2, 20);
  try {
    console.log("Getting Games List");
    const response = await axiosInstance.get("/games", {
      params: { ...params, page: randomPage },
    });
    console.log("Got Games List");
    return response;
  } catch (error) {
    logError(error);
    throw error;
  }
};

const getGameDetails = async (id, params) => {
  try {
    console.log("Getting Game Details");
    const response = await axiosInstance.get(`/games/${id}`, { params });
    console.log("Got Game Details");
    return response;
  } catch (error) {
    logError(error);
    throw error;
  }
};

const getGameListByGenre = async (genre, params) => {
  const randomPage = getRandomPageNumber(2, 20);
  try {
    console.log("Getting Recommendations");
    const response = await axiosInstance.get("/games", {
      params: { ...params, genres: genre, page: randomPage },
    });
    console.log("Got Recommendations");
    return response;
  } catch (error) {
    logError(error);
    throw error;
  }
};

const logError = (error) => {
  if (error.response) {
    // Server responded with a status other than 2xx
    console.error(
      `Error: ${error.response.status} - ${error.response.statusText}`
    );
    console.error(`Response data: ${JSON.stringify(error.response.data)}`);
  } else if (error.request) {
    // Request was made but no response received
    console.error("Error: No response received from the server");
    console.error(`Request data: ${error.request}`);
  } else {
    // Something happened in setting up the request
    console.error(`Error: ${error.message}`);
  }
};

export default { getGameList };
export { getGameDetails, getGameListByGenre };
