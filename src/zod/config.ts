import { z, ZodIssueCode, ZodParsedType } from "zod";

const myErrorMap: z.ZodErrorMap = (issue, ctx) => {
  let message = ctx.defaultError;

  console.log("issue");
  console.log(issue);
  console.log("message", message);

  switch (issue.code) {
    case ZodIssueCode.invalid_type:
      if (issue.received === ZodParsedType.undefined || issue.received === ZodParsedType.null) {
        message = "REQUIRED_INFO";
      }
      break;
    case ZodIssueCode.too_small:
      if (issue.type === "string") {
        message = "REQUIRED_INFO";
      }
      break;
  }
  return { message };
};

z.setErrorMap(myErrorMap);

// console.log("This should run once!");

export { z };
