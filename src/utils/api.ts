import { Phrase } from "../types/pharse";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:2024/api/v1";

export const api = {
  searchPhrase: async (params: {
    query?: string;
    sort?: string;
    sortOrder?: string;
    status?: string;
  }): Promise<{ status: number; message: string; data: Phrase[] }> => {
    const queryObj: Record<string, string> = {
      query: params.query || "",
      sort: params.sort || "createdAt",
      sortOrder: params.sortOrder || "asc",
    };
    if (params.status) {
      queryObj.status = params.status;
    }
    const queryString = new URLSearchParams(queryObj).toString();
    const res = await fetch(`${BASE_URL}/phrase/search?${queryString}`);
    if (!res.ok) throw new Error("Failed to fetch phrases");
    return res.json();
  },

  getPhrase: async (id: number): Promise<Phrase> => {
    const res = await fetch(`${BASE_URL}/phrase/${id}`);
    if (!res.ok) throw new Error("Failed to fetch phrase");
     const json = await res.json();
    return json.data; // <- only return data
  },

  getTranslation: async (id: number, lang: string): Promise<Phrase> => {
    const res = await fetch(`${BASE_URL}/phrase/${id}/${lang}`);
    if (!res.ok) throw new Error("Failed to fetch translation");
    const json = await res.json();
    return json.data; // <- only return data
  },
};
