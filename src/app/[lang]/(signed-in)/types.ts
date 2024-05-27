export type LayoutProps<Params extends object = {}> = {
  children: React.ReactNode;
  params: Params & {
    lang: string;
  };
};

export type PageProps<Params extends object = {}> = {
  params: Params & {
    lang: string;
  };
};
