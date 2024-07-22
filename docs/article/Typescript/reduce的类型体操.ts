function convert<K extends keyof any>(source: readonly K[]): { [P in K]: P } {
  return source.reduce((acc, key) => {
    return {
      ...acc,
      [key]: key,
    }
  }, {} as any)
}

const PEOPLES = ['A','B'] as const;
const peoplesMap = convert(PEOPLES)
const a = peoplesMap.A;
