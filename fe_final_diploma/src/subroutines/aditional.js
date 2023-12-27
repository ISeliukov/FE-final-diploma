import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const aditional = createApi({
  reducerPath: "aditional",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://students.netoservices.ru/fe-diplom/",
    tagTypes: ["Order", "Subscriber"],
  }),
  endpoints: (builder) => ({
     addOrder: builder.mutation({
      query: ({ body }) => ({
        url: `/order`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

export const { useAddSubscriber, useAddOrder } = aditional;
