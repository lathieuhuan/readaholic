export type StandardResponse<T = unknown> = {
  meta: {
    message?: string;
  };
  data: T | null;
};
