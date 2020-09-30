import { AppState } from "../types";

export const queryState = (queryKey: { url: string }) => (state: AppState) =>
  state.query.queries[JSON.stringify({ url: queryKey.url })] || {};

export const queries = (state: AppState) => state.query.queries;

export const entities = (state: AppState) => state.query?.entities;