import axios from "axios";
import { URLBASE } from "./config";

// 마스크 조회
// lat: 위도, lng: 경도, m: 반경(미터)
export const getMasks = async ({lat, lng, m}) => {
  let {data} = await axios({
    method: "GET",
    url: `${URLBASE}/storesByGeo/json`,
    params: {
      lat, lng, m
    },
  });

  return data;
};
