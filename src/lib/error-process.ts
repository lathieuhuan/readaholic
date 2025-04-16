export class ErrorMsg {
  static min(value: number) {
    return `MIN|min:${value}`;
  }
}

export class ErrorParser {
  static parse(error: string) {
    const [type, ...paramPairs] = error.split("|");
    const params: Record<string, string> = {};

    paramPairs.forEach((paramPair) => {
      const [key, value] = paramPair.split(":");
      params[key] = value;
    });
    return { type, params };
  }
}
