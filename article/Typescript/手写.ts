type Partial2<T> = {
  [P in keyof T]?: T[P]
}

const obj = {
  a: 1
}
type result = Partial<typeof obj>;

const obj2: result = {}


type Required2<T> = {
  [P in keyof T]-?: T[P]
}

type result2 = Required2<result>

type Readonly2<T> = {
  readonly [P in keyof T]: T[P]
}

type result3 = Readonly2<result2>

type Pick2<T, K extends keyof T> = {
  [P in K]: T[P]
}

type Omit2<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>

type Animal = {
  name: string;
  age: number;
}


type Animal3 = Omit2<Animal, "age">

type Pick3<T, K extends keyof T> = {
  [P in K]: T[P]
}

type Animal2 = Pick3<Animal, "age">


type Exclude2<T, U> = T extends U ? never : T;

type T1 = Exclude2<"a" | "b" | "c", "a">

type Extract2<T, U> = T extends U ? T : never;

type T2 = Extract2<"a" | "b" | "c", "c" | "a">


type Record2<K extends keyof any, T> = {
  [P in K]: T;
}

type NonNullable2<T> = T extends null | undefined ? never : T;

type TN = NonNullable2<string | number | null>;

type ReturnType2<T extends (...args: any) => any> = 
 T extends (...args: any) => infer R ? R : any;



type Obj = {
  a: number;
  b: number;
}

type Record3<K extends keyof any, T> = {
  [P in K]: T
}
type ReturnType3<T extends (...args: any) => any> = 
  T extends (...args: any) => infer R ? R : any;

  