import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/recommend/",
});

function convertName(name) {
  const regex = new RegExp(" ", "g");
  return name.replace(regex, "%20");
}

const recommendGames = (name) => {
  name = convertName(name);
  return axiosInstance.get(`?game_name=${name}`);
};

export default { recommendGames };
