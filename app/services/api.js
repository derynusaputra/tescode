import { Config } from "./config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: Config.API_URL || "http://212.38.94.88:3555",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().account.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithInterceptor = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    // here you can deal with 401 error
    // alert("Anda keluar");
    console.log("You not login");
  }
  return result;
};

export const api = createApi({
  baseQuery: baseQueryWithInterceptor,
  tagTypes: [
    //   "likes",
    //   "comments",
    //   "searchVideo",
    //   "replyComments",
    //   "playlist",
    //   "watchlater",
    //   "dashboard",
    //   "playlistVideo",
    //   "liked",
    //   "SumVideos",
  ],
  endpoints: () => ({}),
  reducerPath: "api",
});
