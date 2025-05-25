import { ReadaholicService } from "@readaholic/service";
import { Procedure } from "./procedure";

// type OmitExact<T, K extends keyof T> = Omit<T, K> & {
//   [P in K]-?: T[P];
// };

// type ServiceContext = OmitExact<ReadaholicService, "configureDatabase">;

let service: ReadaholicService | undefined;

export const baseProcedure = new Procedure(async () => {
  if (!service) {
    service = new ReadaholicService(process.env.DATABASE_URL!);
    await service.configureDatabase();
  }

  return {
    authService: service.authService,
    bookService: service.bookService,
  };
});
