
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model NGOProfile
 * 
 */
export type NGOProfile = $Result.DefaultSelection<Prisma.$NGOProfilePayload>
/**
 * Model CompanyProfile
 * 
 */
export type CompanyProfile = $Result.DefaultSelection<Prisma.$CompanyProfilePayload>
/**
 * Model DonorProfile
 * 
 */
export type DonorProfile = $Result.DefaultSelection<Prisma.$DonorProfilePayload>
/**
 * Model Campaign
 * 
 */
export type Campaign = $Result.DefaultSelection<Prisma.$CampaignPayload>
/**
 * Model Donation
 * 
 */
export type Donation = $Result.DefaultSelection<Prisma.$DonationPayload>
/**
 * Model BankDetail
 * 
 */
export type BankDetail = $Result.DefaultSelection<Prisma.$BankDetailPayload>
/**
 * Model Document
 * 
 */
export type Document = $Result.DefaultSelection<Prisma.$DocumentPayload>
/**
 * Model Address
 * 
 */
export type Address = $Result.DefaultSelection<Prisma.$AddressPayload>
/**
 * Model AuditLog
 * 
 */
export type AuditLog = $Result.DefaultSelection<Prisma.$AuditLogPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  SUPER_ADMIN: 'SUPER_ADMIN',
  NGO: 'NGO',
  COMPANY: 'COMPANY',
  DONOR: 'DONOR'
};

export type Role = (typeof Role)[keyof typeof Role]


export const NGORegistrationType: {
  SOCIETY: 'SOCIETY',
  TRUST: 'TRUST',
  SECTION_8: 'SECTION_8',
  COOPERATIVE: 'COOPERATIVE',
  OTHER: 'OTHER'
};

export type NGORegistrationType = (typeof NGORegistrationType)[keyof typeof NGORegistrationType]


export const DocumentType: {
  CSR_POLICY: 'CSR_POLICY',
  REGISTRATION_CERTIFICATE: 'REGISTRATION_CERTIFICATE',
  PAN: 'PAN',
  TAN: 'TAN',
  BANK_STATEMENT: 'BANK_STATEMENT',
  AUDITED_FINANCIAL: 'AUDITED_FINANCIAL',
  CSR_REPORT: 'CSR_REPORT',
  OTHER: 'OTHER'
};

export type DocumentType = (typeof DocumentType)[keyof typeof DocumentType]


export const CampaignCategory: {
  EDUCATION: 'EDUCATION',
  HEALTHCARE: 'HEALTHCARE',
  ENVIRONMENT: 'ENVIRONMENT',
  LIVELIHOOD: 'LIVELIHOOD',
  WOMEN_EMPOWERMENT: 'WOMEN_EMPOWERMENT',
  DISASTER_RELIEF: 'DISASTER_RELIEF',
  OTHER: 'OTHER'
};

export type CampaignCategory = (typeof CampaignCategory)[keyof typeof CampaignCategory]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type NGORegistrationType = $Enums.NGORegistrationType

export const NGORegistrationType: typeof $Enums.NGORegistrationType

export type DocumentType = $Enums.DocumentType

export const DocumentType: typeof $Enums.DocumentType

export type CampaignCategory = $Enums.CampaignCategory

export const CampaignCategory: typeof $Enums.CampaignCategory

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.nGOProfile`: Exposes CRUD operations for the **NGOProfile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more NGOProfiles
    * const nGOProfiles = await prisma.nGOProfile.findMany()
    * ```
    */
  get nGOProfile(): Prisma.NGOProfileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.companyProfile`: Exposes CRUD operations for the **CompanyProfile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CompanyProfiles
    * const companyProfiles = await prisma.companyProfile.findMany()
    * ```
    */
  get companyProfile(): Prisma.CompanyProfileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.donorProfile`: Exposes CRUD operations for the **DonorProfile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DonorProfiles
    * const donorProfiles = await prisma.donorProfile.findMany()
    * ```
    */
  get donorProfile(): Prisma.DonorProfileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.campaign`: Exposes CRUD operations for the **Campaign** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Campaigns
    * const campaigns = await prisma.campaign.findMany()
    * ```
    */
  get campaign(): Prisma.CampaignDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.donation`: Exposes CRUD operations for the **Donation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Donations
    * const donations = await prisma.donation.findMany()
    * ```
    */
  get donation(): Prisma.DonationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.bankDetail`: Exposes CRUD operations for the **BankDetail** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BankDetails
    * const bankDetails = await prisma.bankDetail.findMany()
    * ```
    */
  get bankDetail(): Prisma.BankDetailDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.document`: Exposes CRUD operations for the **Document** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Documents
    * const documents = await prisma.document.findMany()
    * ```
    */
  get document(): Prisma.DocumentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.address`: Exposes CRUD operations for the **Address** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Addresses
    * const addresses = await prisma.address.findMany()
    * ```
    */
  get address(): Prisma.AddressDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.auditLog`: Exposes CRUD operations for the **AuditLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuditLogs
    * const auditLogs = await prisma.auditLog.findMany()
    * ```
    */
  get auditLog(): Prisma.AuditLogDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.0
   * Query Engine version: 2ba551f319ab1df4bc874a89965d8b3641056773
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    NGOProfile: 'NGOProfile',
    CompanyProfile: 'CompanyProfile',
    DonorProfile: 'DonorProfile',
    Campaign: 'Campaign',
    Donation: 'Donation',
    BankDetail: 'BankDetail',
    Document: 'Document',
    Address: 'Address',
    AuditLog: 'AuditLog'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "nGOProfile" | "companyProfile" | "donorProfile" | "campaign" | "donation" | "bankDetail" | "document" | "address" | "auditLog"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      NGOProfile: {
        payload: Prisma.$NGOProfilePayload<ExtArgs>
        fields: Prisma.NGOProfileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NGOProfileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NGOProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NGOProfileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NGOProfilePayload>
          }
          findFirst: {
            args: Prisma.NGOProfileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NGOProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NGOProfileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NGOProfilePayload>
          }
          findMany: {
            args: Prisma.NGOProfileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NGOProfilePayload>[]
          }
          create: {
            args: Prisma.NGOProfileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NGOProfilePayload>
          }
          createMany: {
            args: Prisma.NGOProfileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NGOProfileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NGOProfilePayload>[]
          }
          delete: {
            args: Prisma.NGOProfileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NGOProfilePayload>
          }
          update: {
            args: Prisma.NGOProfileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NGOProfilePayload>
          }
          deleteMany: {
            args: Prisma.NGOProfileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NGOProfileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.NGOProfileUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NGOProfilePayload>[]
          }
          upsert: {
            args: Prisma.NGOProfileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NGOProfilePayload>
          }
          aggregate: {
            args: Prisma.NGOProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNGOProfile>
          }
          groupBy: {
            args: Prisma.NGOProfileGroupByArgs<ExtArgs>
            result: $Utils.Optional<NGOProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.NGOProfileCountArgs<ExtArgs>
            result: $Utils.Optional<NGOProfileCountAggregateOutputType> | number
          }
        }
      }
      CompanyProfile: {
        payload: Prisma.$CompanyProfilePayload<ExtArgs>
        fields: Prisma.CompanyProfileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CompanyProfileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CompanyProfileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyProfilePayload>
          }
          findFirst: {
            args: Prisma.CompanyProfileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CompanyProfileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyProfilePayload>
          }
          findMany: {
            args: Prisma.CompanyProfileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyProfilePayload>[]
          }
          create: {
            args: Prisma.CompanyProfileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyProfilePayload>
          }
          createMany: {
            args: Prisma.CompanyProfileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CompanyProfileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyProfilePayload>[]
          }
          delete: {
            args: Prisma.CompanyProfileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyProfilePayload>
          }
          update: {
            args: Prisma.CompanyProfileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyProfilePayload>
          }
          deleteMany: {
            args: Prisma.CompanyProfileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CompanyProfileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CompanyProfileUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyProfilePayload>[]
          }
          upsert: {
            args: Prisma.CompanyProfileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyProfilePayload>
          }
          aggregate: {
            args: Prisma.CompanyProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCompanyProfile>
          }
          groupBy: {
            args: Prisma.CompanyProfileGroupByArgs<ExtArgs>
            result: $Utils.Optional<CompanyProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.CompanyProfileCountArgs<ExtArgs>
            result: $Utils.Optional<CompanyProfileCountAggregateOutputType> | number
          }
        }
      }
      DonorProfile: {
        payload: Prisma.$DonorProfilePayload<ExtArgs>
        fields: Prisma.DonorProfileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DonorProfileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DonorProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DonorProfileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DonorProfilePayload>
          }
          findFirst: {
            args: Prisma.DonorProfileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DonorProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DonorProfileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DonorProfilePayload>
          }
          findMany: {
            args: Prisma.DonorProfileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DonorProfilePayload>[]
          }
          create: {
            args: Prisma.DonorProfileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DonorProfilePayload>
          }
          createMany: {
            args: Prisma.DonorProfileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DonorProfileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DonorProfilePayload>[]
          }
          delete: {
            args: Prisma.DonorProfileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DonorProfilePayload>
          }
          update: {
            args: Prisma.DonorProfileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DonorProfilePayload>
          }
          deleteMany: {
            args: Prisma.DonorProfileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DonorProfileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DonorProfileUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DonorProfilePayload>[]
          }
          upsert: {
            args: Prisma.DonorProfileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DonorProfilePayload>
          }
          aggregate: {
            args: Prisma.DonorProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDonorProfile>
          }
          groupBy: {
            args: Prisma.DonorProfileGroupByArgs<ExtArgs>
            result: $Utils.Optional<DonorProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.DonorProfileCountArgs<ExtArgs>
            result: $Utils.Optional<DonorProfileCountAggregateOutputType> | number
          }
        }
      }
      Campaign: {
        payload: Prisma.$CampaignPayload<ExtArgs>
        fields: Prisma.CampaignFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CampaignFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CampaignFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload>
          }
          findFirst: {
            args: Prisma.CampaignFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CampaignFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload>
          }
          findMany: {
            args: Prisma.CampaignFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload>[]
          }
          create: {
            args: Prisma.CampaignCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload>
          }
          createMany: {
            args: Prisma.CampaignCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CampaignCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload>[]
          }
          delete: {
            args: Prisma.CampaignDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload>
          }
          update: {
            args: Prisma.CampaignUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload>
          }
          deleteMany: {
            args: Prisma.CampaignDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CampaignUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CampaignUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload>[]
          }
          upsert: {
            args: Prisma.CampaignUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload>
          }
          aggregate: {
            args: Prisma.CampaignAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCampaign>
          }
          groupBy: {
            args: Prisma.CampaignGroupByArgs<ExtArgs>
            result: $Utils.Optional<CampaignGroupByOutputType>[]
          }
          count: {
            args: Prisma.CampaignCountArgs<ExtArgs>
            result: $Utils.Optional<CampaignCountAggregateOutputType> | number
          }
        }
      }
      Donation: {
        payload: Prisma.$DonationPayload<ExtArgs>
        fields: Prisma.DonationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DonationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DonationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DonationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DonationPayload>
          }
          findFirst: {
            args: Prisma.DonationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DonationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DonationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DonationPayload>
          }
          findMany: {
            args: Prisma.DonationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DonationPayload>[]
          }
          create: {
            args: Prisma.DonationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DonationPayload>
          }
          createMany: {
            args: Prisma.DonationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DonationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DonationPayload>[]
          }
          delete: {
            args: Prisma.DonationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DonationPayload>
          }
          update: {
            args: Prisma.DonationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DonationPayload>
          }
          deleteMany: {
            args: Prisma.DonationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DonationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DonationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DonationPayload>[]
          }
          upsert: {
            args: Prisma.DonationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DonationPayload>
          }
          aggregate: {
            args: Prisma.DonationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDonation>
          }
          groupBy: {
            args: Prisma.DonationGroupByArgs<ExtArgs>
            result: $Utils.Optional<DonationGroupByOutputType>[]
          }
          count: {
            args: Prisma.DonationCountArgs<ExtArgs>
            result: $Utils.Optional<DonationCountAggregateOutputType> | number
          }
        }
      }
      BankDetail: {
        payload: Prisma.$BankDetailPayload<ExtArgs>
        fields: Prisma.BankDetailFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BankDetailFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BankDetailPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BankDetailFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BankDetailPayload>
          }
          findFirst: {
            args: Prisma.BankDetailFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BankDetailPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BankDetailFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BankDetailPayload>
          }
          findMany: {
            args: Prisma.BankDetailFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BankDetailPayload>[]
          }
          create: {
            args: Prisma.BankDetailCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BankDetailPayload>
          }
          createMany: {
            args: Prisma.BankDetailCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BankDetailCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BankDetailPayload>[]
          }
          delete: {
            args: Prisma.BankDetailDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BankDetailPayload>
          }
          update: {
            args: Prisma.BankDetailUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BankDetailPayload>
          }
          deleteMany: {
            args: Prisma.BankDetailDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BankDetailUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BankDetailUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BankDetailPayload>[]
          }
          upsert: {
            args: Prisma.BankDetailUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BankDetailPayload>
          }
          aggregate: {
            args: Prisma.BankDetailAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBankDetail>
          }
          groupBy: {
            args: Prisma.BankDetailGroupByArgs<ExtArgs>
            result: $Utils.Optional<BankDetailGroupByOutputType>[]
          }
          count: {
            args: Prisma.BankDetailCountArgs<ExtArgs>
            result: $Utils.Optional<BankDetailCountAggregateOutputType> | number
          }
        }
      }
      Document: {
        payload: Prisma.$DocumentPayload<ExtArgs>
        fields: Prisma.DocumentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DocumentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DocumentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          findFirst: {
            args: Prisma.DocumentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DocumentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          findMany: {
            args: Prisma.DocumentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>[]
          }
          create: {
            args: Prisma.DocumentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          createMany: {
            args: Prisma.DocumentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DocumentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>[]
          }
          delete: {
            args: Prisma.DocumentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          update: {
            args: Prisma.DocumentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          deleteMany: {
            args: Prisma.DocumentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DocumentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DocumentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>[]
          }
          upsert: {
            args: Prisma.DocumentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          aggregate: {
            args: Prisma.DocumentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDocument>
          }
          groupBy: {
            args: Prisma.DocumentGroupByArgs<ExtArgs>
            result: $Utils.Optional<DocumentGroupByOutputType>[]
          }
          count: {
            args: Prisma.DocumentCountArgs<ExtArgs>
            result: $Utils.Optional<DocumentCountAggregateOutputType> | number
          }
        }
      }
      Address: {
        payload: Prisma.$AddressPayload<ExtArgs>
        fields: Prisma.AddressFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AddressFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AddressFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload>
          }
          findFirst: {
            args: Prisma.AddressFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AddressFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload>
          }
          findMany: {
            args: Prisma.AddressFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload>[]
          }
          create: {
            args: Prisma.AddressCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload>
          }
          createMany: {
            args: Prisma.AddressCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AddressCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload>[]
          }
          delete: {
            args: Prisma.AddressDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload>
          }
          update: {
            args: Prisma.AddressUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload>
          }
          deleteMany: {
            args: Prisma.AddressDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AddressUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AddressUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload>[]
          }
          upsert: {
            args: Prisma.AddressUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload>
          }
          aggregate: {
            args: Prisma.AddressAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAddress>
          }
          groupBy: {
            args: Prisma.AddressGroupByArgs<ExtArgs>
            result: $Utils.Optional<AddressGroupByOutputType>[]
          }
          count: {
            args: Prisma.AddressCountArgs<ExtArgs>
            result: $Utils.Optional<AddressCountAggregateOutputType> | number
          }
        }
      }
      AuditLog: {
        payload: Prisma.$AuditLogPayload<ExtArgs>
        fields: Prisma.AuditLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuditLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuditLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findFirst: {
            args: Prisma.AuditLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuditLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findMany: {
            args: Prisma.AuditLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          create: {
            args: Prisma.AuditLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          createMany: {
            args: Prisma.AuditLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AuditLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          delete: {
            args: Prisma.AuditLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          update: {
            args: Prisma.AuditLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          deleteMany: {
            args: Prisma.AuditLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuditLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AuditLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          upsert: {
            args: Prisma.AuditLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          aggregate: {
            args: Prisma.AuditLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuditLog>
          }
          groupBy: {
            args: Prisma.AuditLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuditLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuditLogCountArgs<ExtArgs>
            result: $Utils.Optional<AuditLogCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    nGOProfile?: NGOProfileOmit
    companyProfile?: CompanyProfileOmit
    donorProfile?: DonorProfileOmit
    campaign?: CampaignOmit
    donation?: DonationOmit
    bankDetail?: BankDetailOmit
    document?: DocumentOmit
    address?: AddressOmit
    auditLog?: AuditLogOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    auditLogs: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    auditLogs?: boolean | UserCountOutputTypeCountAuditLogsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAuditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
  }


  /**
   * Count Type NGOProfileCountOutputType
   */

  export type NGOProfileCountOutputType = {
    campaigns: number
    bankDetails: number
    documents: number
    addresses: number
    auditLogs: number
  }

  export type NGOProfileCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    campaigns?: boolean | NGOProfileCountOutputTypeCountCampaignsArgs
    bankDetails?: boolean | NGOProfileCountOutputTypeCountBankDetailsArgs
    documents?: boolean | NGOProfileCountOutputTypeCountDocumentsArgs
    addresses?: boolean | NGOProfileCountOutputTypeCountAddressesArgs
    auditLogs?: boolean | NGOProfileCountOutputTypeCountAuditLogsArgs
  }

  // Custom InputTypes
  /**
   * NGOProfileCountOutputType without action
   */
  export type NGOProfileCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NGOProfileCountOutputType
     */
    select?: NGOProfileCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * NGOProfileCountOutputType without action
   */
  export type NGOProfileCountOutputTypeCountCampaignsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CampaignWhereInput
  }

  /**
   * NGOProfileCountOutputType without action
   */
  export type NGOProfileCountOutputTypeCountBankDetailsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BankDetailWhereInput
  }

  /**
   * NGOProfileCountOutputType without action
   */
  export type NGOProfileCountOutputTypeCountDocumentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocumentWhereInput
  }

  /**
   * NGOProfileCountOutputType without action
   */
  export type NGOProfileCountOutputTypeCountAddressesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AddressWhereInput
  }

  /**
   * NGOProfileCountOutputType without action
   */
  export type NGOProfileCountOutputTypeCountAuditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
  }


  /**
   * Count Type CompanyProfileCountOutputType
   */

  export type CompanyProfileCountOutputType = {
    donations: number
    documents: number
    bankDetails: number
    addresses: number
    auditLogs: number
  }

  export type CompanyProfileCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    donations?: boolean | CompanyProfileCountOutputTypeCountDonationsArgs
    documents?: boolean | CompanyProfileCountOutputTypeCountDocumentsArgs
    bankDetails?: boolean | CompanyProfileCountOutputTypeCountBankDetailsArgs
    addresses?: boolean | CompanyProfileCountOutputTypeCountAddressesArgs
    auditLogs?: boolean | CompanyProfileCountOutputTypeCountAuditLogsArgs
  }

  // Custom InputTypes
  /**
   * CompanyProfileCountOutputType without action
   */
  export type CompanyProfileCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyProfileCountOutputType
     */
    select?: CompanyProfileCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CompanyProfileCountOutputType without action
   */
  export type CompanyProfileCountOutputTypeCountDonationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DonationWhereInput
  }

  /**
   * CompanyProfileCountOutputType without action
   */
  export type CompanyProfileCountOutputTypeCountDocumentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocumentWhereInput
  }

  /**
   * CompanyProfileCountOutputType without action
   */
  export type CompanyProfileCountOutputTypeCountBankDetailsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BankDetailWhereInput
  }

  /**
   * CompanyProfileCountOutputType without action
   */
  export type CompanyProfileCountOutputTypeCountAddressesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AddressWhereInput
  }

  /**
   * CompanyProfileCountOutputType without action
   */
  export type CompanyProfileCountOutputTypeCountAuditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
  }


  /**
   * Count Type DonorProfileCountOutputType
   */

  export type DonorProfileCountOutputType = {
    donations: number
    addresses: number
    auditLogs: number
  }

  export type DonorProfileCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    donations?: boolean | DonorProfileCountOutputTypeCountDonationsArgs
    addresses?: boolean | DonorProfileCountOutputTypeCountAddressesArgs
    auditLogs?: boolean | DonorProfileCountOutputTypeCountAuditLogsArgs
  }

  // Custom InputTypes
  /**
   * DonorProfileCountOutputType without action
   */
  export type DonorProfileCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DonorProfileCountOutputType
     */
    select?: DonorProfileCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DonorProfileCountOutputType without action
   */
  export type DonorProfileCountOutputTypeCountDonationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DonationWhereInput
  }

  /**
   * DonorProfileCountOutputType without action
   */
  export type DonorProfileCountOutputTypeCountAddressesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AddressWhereInput
  }

  /**
   * DonorProfileCountOutputType without action
   */
  export type DonorProfileCountOutputTypeCountAuditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
  }


  /**
   * Count Type CampaignCountOutputType
   */

  export type CampaignCountOutputType = {
    donations: number
    documents: number
    auditLogs: number
  }

  export type CampaignCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    donations?: boolean | CampaignCountOutputTypeCountDonationsArgs
    documents?: boolean | CampaignCountOutputTypeCountDocumentsArgs
    auditLogs?: boolean | CampaignCountOutputTypeCountAuditLogsArgs
  }

  // Custom InputTypes
  /**
   * CampaignCountOutputType without action
   */
  export type CampaignCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignCountOutputType
     */
    select?: CampaignCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CampaignCountOutputType without action
   */
  export type CampaignCountOutputTypeCountDonationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DonationWhereInput
  }

  /**
   * CampaignCountOutputType without action
   */
  export type CampaignCountOutputTypeCountDocumentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocumentWhereInput
  }

  /**
   * CampaignCountOutputType without action
   */
  export type CampaignCountOutputTypeCountAuditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
  }


  /**
   * Count Type DonationCountOutputType
   */

  export type DonationCountOutputType = {
    auditLogs: number
  }

  export type DonationCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    auditLogs?: boolean | DonationCountOutputTypeCountAuditLogsArgs
  }

  // Custom InputTypes
  /**
   * DonationCountOutputType without action
   */
  export type DonationCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DonationCountOutputType
     */
    select?: DonationCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DonationCountOutputType without action
   */
  export type DonationCountOutputTypeCountAuditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    phone: string | null
    password: string | null
    role: $Enums.Role | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    phone: string | null
    password: string | null
    role: $Enums.Role | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    phone: number
    password: number
    role: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    phone?: true
    password?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    phone?: true
    password?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    phone?: true
    password?: true
    role?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string
    email: string
    phone: string | null
    password: string
    role: $Enums.Role
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    password?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ngoProfile?: boolean | User$ngoProfileArgs<ExtArgs>
    companyProfile?: boolean | User$companyProfileArgs<ExtArgs>
    donorProfile?: boolean | User$donorProfileArgs<ExtArgs>
    auditLogs?: boolean | User$auditLogsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    password?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    password?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    password?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "phone" | "password" | "role" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ngoProfile?: boolean | User$ngoProfileArgs<ExtArgs>
    companyProfile?: boolean | User$companyProfileArgs<ExtArgs>
    donorProfile?: boolean | User$donorProfileArgs<ExtArgs>
    auditLogs?: boolean | User$auditLogsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      ngoProfile: Prisma.$NGOProfilePayload<ExtArgs> | null
      companyProfile: Prisma.$CompanyProfilePayload<ExtArgs> | null
      donorProfile: Prisma.$DonorProfilePayload<ExtArgs> | null
      auditLogs: Prisma.$AuditLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string
      phone: string | null
      password: string
      role: $Enums.Role
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    ngoProfile<T extends User$ngoProfileArgs<ExtArgs> = {}>(args?: Subset<T, User$ngoProfileArgs<ExtArgs>>): Prisma__NGOProfileClient<$Result.GetResult<Prisma.$NGOProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    companyProfile<T extends User$companyProfileArgs<ExtArgs> = {}>(args?: Subset<T, User$companyProfileArgs<ExtArgs>>): Prisma__CompanyProfileClient<$Result.GetResult<Prisma.$CompanyProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    donorProfile<T extends User$donorProfileArgs<ExtArgs> = {}>(args?: Subset<T, User$donorProfileArgs<ExtArgs>>): Prisma__DonorProfileClient<$Result.GetResult<Prisma.$DonorProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    auditLogs<T extends User$auditLogsArgs<ExtArgs> = {}>(args?: Subset<T, User$auditLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly phone: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.ngoProfile
   */
  export type User$ngoProfileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NGOProfile
     */
    select?: NGOProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NGOProfile
     */
    omit?: NGOProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NGOProfileInclude<ExtArgs> | null
    where?: NGOProfileWhereInput
  }

  /**
   * User.companyProfile
   */
  export type User$companyProfileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyProfile
     */
    select?: CompanyProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyProfile
     */
    omit?: CompanyProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyProfileInclude<ExtArgs> | null
    where?: CompanyProfileWhereInput
  }

  /**
   * User.donorProfile
   */
  export type User$donorProfileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DonorProfile
     */
    select?: DonorProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DonorProfile
     */
    omit?: DonorProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonorProfileInclude<ExtArgs> | null
    where?: DonorProfileWhereInput
  }

  /**
   * User.auditLogs
   */
  export type User$auditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    cursor?: AuditLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model NGOProfile
   */

  export type AggregateNGOProfile = {
    _count: NGOProfileCountAggregateOutputType | null
    _avg: NGOProfileAvgAggregateOutputType | null
    _sum: NGOProfileSumAggregateOutputType | null
    _min: NGOProfileMinAggregateOutputType | null
    _max: NGOProfileMaxAggregateOutputType | null
  }

  export type NGOProfileAvgAggregateOutputType = {
    yearEstablished: number | null
  }

  export type NGOProfileSumAggregateOutputType = {
    yearEstablished: number | null
  }

  export type NGOProfileMinAggregateOutputType = {
    id: string | null
    userId: string | null
    registrationType: $Enums.NGORegistrationType | null
    registrationNumber: string | null
    founderNames: string | null
    yearEstablished: number | null
    missionStatement: string | null
    impactSummary: string | null
    website: string | null
    twelveARegistered: boolean | null
    eightyGRegistered: boolean | null
    csrEligibility: boolean | null
  }

  export type NGOProfileMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    registrationType: $Enums.NGORegistrationType | null
    registrationNumber: string | null
    founderNames: string | null
    yearEstablished: number | null
    missionStatement: string | null
    impactSummary: string | null
    website: string | null
    twelveARegistered: boolean | null
    eightyGRegistered: boolean | null
    csrEligibility: boolean | null
  }

  export type NGOProfileCountAggregateOutputType = {
    id: number
    userId: number
    registrationType: number
    registrationNumber: number
    founderNames: number
    yearEstablished: number
    missionStatement: number
    impactSummary: number
    website: number
    twelveARegistered: number
    eightyGRegistered: number
    csrEligibility: number
    _all: number
  }


  export type NGOProfileAvgAggregateInputType = {
    yearEstablished?: true
  }

  export type NGOProfileSumAggregateInputType = {
    yearEstablished?: true
  }

  export type NGOProfileMinAggregateInputType = {
    id?: true
    userId?: true
    registrationType?: true
    registrationNumber?: true
    founderNames?: true
    yearEstablished?: true
    missionStatement?: true
    impactSummary?: true
    website?: true
    twelveARegistered?: true
    eightyGRegistered?: true
    csrEligibility?: true
  }

  export type NGOProfileMaxAggregateInputType = {
    id?: true
    userId?: true
    registrationType?: true
    registrationNumber?: true
    founderNames?: true
    yearEstablished?: true
    missionStatement?: true
    impactSummary?: true
    website?: true
    twelveARegistered?: true
    eightyGRegistered?: true
    csrEligibility?: true
  }

  export type NGOProfileCountAggregateInputType = {
    id?: true
    userId?: true
    registrationType?: true
    registrationNumber?: true
    founderNames?: true
    yearEstablished?: true
    missionStatement?: true
    impactSummary?: true
    website?: true
    twelveARegistered?: true
    eightyGRegistered?: true
    csrEligibility?: true
    _all?: true
  }

  export type NGOProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NGOProfile to aggregate.
     */
    where?: NGOProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NGOProfiles to fetch.
     */
    orderBy?: NGOProfileOrderByWithRelationInput | NGOProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NGOProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NGOProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NGOProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned NGOProfiles
    **/
    _count?: true | NGOProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: NGOProfileAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: NGOProfileSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NGOProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NGOProfileMaxAggregateInputType
  }

  export type GetNGOProfileAggregateType<T extends NGOProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateNGOProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNGOProfile[P]>
      : GetScalarType<T[P], AggregateNGOProfile[P]>
  }




  export type NGOProfileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NGOProfileWhereInput
    orderBy?: NGOProfileOrderByWithAggregationInput | NGOProfileOrderByWithAggregationInput[]
    by: NGOProfileScalarFieldEnum[] | NGOProfileScalarFieldEnum
    having?: NGOProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NGOProfileCountAggregateInputType | true
    _avg?: NGOProfileAvgAggregateInputType
    _sum?: NGOProfileSumAggregateInputType
    _min?: NGOProfileMinAggregateInputType
    _max?: NGOProfileMaxAggregateInputType
  }

  export type NGOProfileGroupByOutputType = {
    id: string
    userId: string
    registrationType: $Enums.NGORegistrationType
    registrationNumber: string
    founderNames: string
    yearEstablished: number
    missionStatement: string
    impactSummary: string | null
    website: string | null
    twelveARegistered: boolean
    eightyGRegistered: boolean
    csrEligibility: boolean
    _count: NGOProfileCountAggregateOutputType | null
    _avg: NGOProfileAvgAggregateOutputType | null
    _sum: NGOProfileSumAggregateOutputType | null
    _min: NGOProfileMinAggregateOutputType | null
    _max: NGOProfileMaxAggregateOutputType | null
  }

  type GetNGOProfileGroupByPayload<T extends NGOProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NGOProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NGOProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NGOProfileGroupByOutputType[P]>
            : GetScalarType<T[P], NGOProfileGroupByOutputType[P]>
        }
      >
    >


  export type NGOProfileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    registrationType?: boolean
    registrationNumber?: boolean
    founderNames?: boolean
    yearEstablished?: boolean
    missionStatement?: boolean
    impactSummary?: boolean
    website?: boolean
    twelveARegistered?: boolean
    eightyGRegistered?: boolean
    csrEligibility?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    campaigns?: boolean | NGOProfile$campaignsArgs<ExtArgs>
    bankDetails?: boolean | NGOProfile$bankDetailsArgs<ExtArgs>
    documents?: boolean | NGOProfile$documentsArgs<ExtArgs>
    addresses?: boolean | NGOProfile$addressesArgs<ExtArgs>
    auditLogs?: boolean | NGOProfile$auditLogsArgs<ExtArgs>
    _count?: boolean | NGOProfileCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["nGOProfile"]>

  export type NGOProfileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    registrationType?: boolean
    registrationNumber?: boolean
    founderNames?: boolean
    yearEstablished?: boolean
    missionStatement?: boolean
    impactSummary?: boolean
    website?: boolean
    twelveARegistered?: boolean
    eightyGRegistered?: boolean
    csrEligibility?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["nGOProfile"]>

  export type NGOProfileSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    registrationType?: boolean
    registrationNumber?: boolean
    founderNames?: boolean
    yearEstablished?: boolean
    missionStatement?: boolean
    impactSummary?: boolean
    website?: boolean
    twelveARegistered?: boolean
    eightyGRegistered?: boolean
    csrEligibility?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["nGOProfile"]>

  export type NGOProfileSelectScalar = {
    id?: boolean
    userId?: boolean
    registrationType?: boolean
    registrationNumber?: boolean
    founderNames?: boolean
    yearEstablished?: boolean
    missionStatement?: boolean
    impactSummary?: boolean
    website?: boolean
    twelveARegistered?: boolean
    eightyGRegistered?: boolean
    csrEligibility?: boolean
  }

  export type NGOProfileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "registrationType" | "registrationNumber" | "founderNames" | "yearEstablished" | "missionStatement" | "impactSummary" | "website" | "twelveARegistered" | "eightyGRegistered" | "csrEligibility", ExtArgs["result"]["nGOProfile"]>
  export type NGOProfileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    campaigns?: boolean | NGOProfile$campaignsArgs<ExtArgs>
    bankDetails?: boolean | NGOProfile$bankDetailsArgs<ExtArgs>
    documents?: boolean | NGOProfile$documentsArgs<ExtArgs>
    addresses?: boolean | NGOProfile$addressesArgs<ExtArgs>
    auditLogs?: boolean | NGOProfile$auditLogsArgs<ExtArgs>
    _count?: boolean | NGOProfileCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type NGOProfileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type NGOProfileIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $NGOProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "NGOProfile"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      campaigns: Prisma.$CampaignPayload<ExtArgs>[]
      bankDetails: Prisma.$BankDetailPayload<ExtArgs>[]
      documents: Prisma.$DocumentPayload<ExtArgs>[]
      addresses: Prisma.$AddressPayload<ExtArgs>[]
      auditLogs: Prisma.$AuditLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      registrationType: $Enums.NGORegistrationType
      registrationNumber: string
      founderNames: string
      yearEstablished: number
      missionStatement: string
      impactSummary: string | null
      website: string | null
      twelveARegistered: boolean
      eightyGRegistered: boolean
      csrEligibility: boolean
    }, ExtArgs["result"]["nGOProfile"]>
    composites: {}
  }

  type NGOProfileGetPayload<S extends boolean | null | undefined | NGOProfileDefaultArgs> = $Result.GetResult<Prisma.$NGOProfilePayload, S>

  type NGOProfileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NGOProfileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NGOProfileCountAggregateInputType | true
    }

  export interface NGOProfileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['NGOProfile'], meta: { name: 'NGOProfile' } }
    /**
     * Find zero or one NGOProfile that matches the filter.
     * @param {NGOProfileFindUniqueArgs} args - Arguments to find a NGOProfile
     * @example
     * // Get one NGOProfile
     * const nGOProfile = await prisma.nGOProfile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NGOProfileFindUniqueArgs>(args: SelectSubset<T, NGOProfileFindUniqueArgs<ExtArgs>>): Prisma__NGOProfileClient<$Result.GetResult<Prisma.$NGOProfilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one NGOProfile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NGOProfileFindUniqueOrThrowArgs} args - Arguments to find a NGOProfile
     * @example
     * // Get one NGOProfile
     * const nGOProfile = await prisma.nGOProfile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NGOProfileFindUniqueOrThrowArgs>(args: SelectSubset<T, NGOProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NGOProfileClient<$Result.GetResult<Prisma.$NGOProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NGOProfile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NGOProfileFindFirstArgs} args - Arguments to find a NGOProfile
     * @example
     * // Get one NGOProfile
     * const nGOProfile = await prisma.nGOProfile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NGOProfileFindFirstArgs>(args?: SelectSubset<T, NGOProfileFindFirstArgs<ExtArgs>>): Prisma__NGOProfileClient<$Result.GetResult<Prisma.$NGOProfilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NGOProfile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NGOProfileFindFirstOrThrowArgs} args - Arguments to find a NGOProfile
     * @example
     * // Get one NGOProfile
     * const nGOProfile = await prisma.nGOProfile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NGOProfileFindFirstOrThrowArgs>(args?: SelectSubset<T, NGOProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma__NGOProfileClient<$Result.GetResult<Prisma.$NGOProfilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more NGOProfiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NGOProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all NGOProfiles
     * const nGOProfiles = await prisma.nGOProfile.findMany()
     * 
     * // Get first 10 NGOProfiles
     * const nGOProfiles = await prisma.nGOProfile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const nGOProfileWithIdOnly = await prisma.nGOProfile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NGOProfileFindManyArgs>(args?: SelectSubset<T, NGOProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NGOProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a NGOProfile.
     * @param {NGOProfileCreateArgs} args - Arguments to create a NGOProfile.
     * @example
     * // Create one NGOProfile
     * const NGOProfile = await prisma.nGOProfile.create({
     *   data: {
     *     // ... data to create a NGOProfile
     *   }
     * })
     * 
     */
    create<T extends NGOProfileCreateArgs>(args: SelectSubset<T, NGOProfileCreateArgs<ExtArgs>>): Prisma__NGOProfileClient<$Result.GetResult<Prisma.$NGOProfilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many NGOProfiles.
     * @param {NGOProfileCreateManyArgs} args - Arguments to create many NGOProfiles.
     * @example
     * // Create many NGOProfiles
     * const nGOProfile = await prisma.nGOProfile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NGOProfileCreateManyArgs>(args?: SelectSubset<T, NGOProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many NGOProfiles and returns the data saved in the database.
     * @param {NGOProfileCreateManyAndReturnArgs} args - Arguments to create many NGOProfiles.
     * @example
     * // Create many NGOProfiles
     * const nGOProfile = await prisma.nGOProfile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many NGOProfiles and only return the `id`
     * const nGOProfileWithIdOnly = await prisma.nGOProfile.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NGOProfileCreateManyAndReturnArgs>(args?: SelectSubset<T, NGOProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NGOProfilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a NGOProfile.
     * @param {NGOProfileDeleteArgs} args - Arguments to delete one NGOProfile.
     * @example
     * // Delete one NGOProfile
     * const NGOProfile = await prisma.nGOProfile.delete({
     *   where: {
     *     // ... filter to delete one NGOProfile
     *   }
     * })
     * 
     */
    delete<T extends NGOProfileDeleteArgs>(args: SelectSubset<T, NGOProfileDeleteArgs<ExtArgs>>): Prisma__NGOProfileClient<$Result.GetResult<Prisma.$NGOProfilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one NGOProfile.
     * @param {NGOProfileUpdateArgs} args - Arguments to update one NGOProfile.
     * @example
     * // Update one NGOProfile
     * const nGOProfile = await prisma.nGOProfile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NGOProfileUpdateArgs>(args: SelectSubset<T, NGOProfileUpdateArgs<ExtArgs>>): Prisma__NGOProfileClient<$Result.GetResult<Prisma.$NGOProfilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more NGOProfiles.
     * @param {NGOProfileDeleteManyArgs} args - Arguments to filter NGOProfiles to delete.
     * @example
     * // Delete a few NGOProfiles
     * const { count } = await prisma.nGOProfile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NGOProfileDeleteManyArgs>(args?: SelectSubset<T, NGOProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NGOProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NGOProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many NGOProfiles
     * const nGOProfile = await prisma.nGOProfile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NGOProfileUpdateManyArgs>(args: SelectSubset<T, NGOProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NGOProfiles and returns the data updated in the database.
     * @param {NGOProfileUpdateManyAndReturnArgs} args - Arguments to update many NGOProfiles.
     * @example
     * // Update many NGOProfiles
     * const nGOProfile = await prisma.nGOProfile.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more NGOProfiles and only return the `id`
     * const nGOProfileWithIdOnly = await prisma.nGOProfile.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends NGOProfileUpdateManyAndReturnArgs>(args: SelectSubset<T, NGOProfileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NGOProfilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one NGOProfile.
     * @param {NGOProfileUpsertArgs} args - Arguments to update or create a NGOProfile.
     * @example
     * // Update or create a NGOProfile
     * const nGOProfile = await prisma.nGOProfile.upsert({
     *   create: {
     *     // ... data to create a NGOProfile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the NGOProfile we want to update
     *   }
     * })
     */
    upsert<T extends NGOProfileUpsertArgs>(args: SelectSubset<T, NGOProfileUpsertArgs<ExtArgs>>): Prisma__NGOProfileClient<$Result.GetResult<Prisma.$NGOProfilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of NGOProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NGOProfileCountArgs} args - Arguments to filter NGOProfiles to count.
     * @example
     * // Count the number of NGOProfiles
     * const count = await prisma.nGOProfile.count({
     *   where: {
     *     // ... the filter for the NGOProfiles we want to count
     *   }
     * })
    **/
    count<T extends NGOProfileCountArgs>(
      args?: Subset<T, NGOProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NGOProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a NGOProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NGOProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NGOProfileAggregateArgs>(args: Subset<T, NGOProfileAggregateArgs>): Prisma.PrismaPromise<GetNGOProfileAggregateType<T>>

    /**
     * Group by NGOProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NGOProfileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NGOProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NGOProfileGroupByArgs['orderBy'] }
        : { orderBy?: NGOProfileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NGOProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNGOProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the NGOProfile model
   */
  readonly fields: NGOProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for NGOProfile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NGOProfileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    campaigns<T extends NGOProfile$campaignsArgs<ExtArgs> = {}>(args?: Subset<T, NGOProfile$campaignsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    bankDetails<T extends NGOProfile$bankDetailsArgs<ExtArgs> = {}>(args?: Subset<T, NGOProfile$bankDetailsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BankDetailPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    documents<T extends NGOProfile$documentsArgs<ExtArgs> = {}>(args?: Subset<T, NGOProfile$documentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    addresses<T extends NGOProfile$addressesArgs<ExtArgs> = {}>(args?: Subset<T, NGOProfile$addressesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    auditLogs<T extends NGOProfile$auditLogsArgs<ExtArgs> = {}>(args?: Subset<T, NGOProfile$auditLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the NGOProfile model
   */
  interface NGOProfileFieldRefs {
    readonly id: FieldRef<"NGOProfile", 'String'>
    readonly userId: FieldRef<"NGOProfile", 'String'>
    readonly registrationType: FieldRef<"NGOProfile", 'NGORegistrationType'>
    readonly registrationNumber: FieldRef<"NGOProfile", 'String'>
    readonly founderNames: FieldRef<"NGOProfile", 'String'>
    readonly yearEstablished: FieldRef<"NGOProfile", 'Int'>
    readonly missionStatement: FieldRef<"NGOProfile", 'String'>
    readonly impactSummary: FieldRef<"NGOProfile", 'String'>
    readonly website: FieldRef<"NGOProfile", 'String'>
    readonly twelveARegistered: FieldRef<"NGOProfile", 'Boolean'>
    readonly eightyGRegistered: FieldRef<"NGOProfile", 'Boolean'>
    readonly csrEligibility: FieldRef<"NGOProfile", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * NGOProfile findUnique
   */
  export type NGOProfileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NGOProfile
     */
    select?: NGOProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NGOProfile
     */
    omit?: NGOProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NGOProfileInclude<ExtArgs> | null
    /**
     * Filter, which NGOProfile to fetch.
     */
    where: NGOProfileWhereUniqueInput
  }

  /**
   * NGOProfile findUniqueOrThrow
   */
  export type NGOProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NGOProfile
     */
    select?: NGOProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NGOProfile
     */
    omit?: NGOProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NGOProfileInclude<ExtArgs> | null
    /**
     * Filter, which NGOProfile to fetch.
     */
    where: NGOProfileWhereUniqueInput
  }

  /**
   * NGOProfile findFirst
   */
  export type NGOProfileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NGOProfile
     */
    select?: NGOProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NGOProfile
     */
    omit?: NGOProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NGOProfileInclude<ExtArgs> | null
    /**
     * Filter, which NGOProfile to fetch.
     */
    where?: NGOProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NGOProfiles to fetch.
     */
    orderBy?: NGOProfileOrderByWithRelationInput | NGOProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NGOProfiles.
     */
    cursor?: NGOProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NGOProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NGOProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NGOProfiles.
     */
    distinct?: NGOProfileScalarFieldEnum | NGOProfileScalarFieldEnum[]
  }

  /**
   * NGOProfile findFirstOrThrow
   */
  export type NGOProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NGOProfile
     */
    select?: NGOProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NGOProfile
     */
    omit?: NGOProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NGOProfileInclude<ExtArgs> | null
    /**
     * Filter, which NGOProfile to fetch.
     */
    where?: NGOProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NGOProfiles to fetch.
     */
    orderBy?: NGOProfileOrderByWithRelationInput | NGOProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NGOProfiles.
     */
    cursor?: NGOProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NGOProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NGOProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NGOProfiles.
     */
    distinct?: NGOProfileScalarFieldEnum | NGOProfileScalarFieldEnum[]
  }

  /**
   * NGOProfile findMany
   */
  export type NGOProfileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NGOProfile
     */
    select?: NGOProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NGOProfile
     */
    omit?: NGOProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NGOProfileInclude<ExtArgs> | null
    /**
     * Filter, which NGOProfiles to fetch.
     */
    where?: NGOProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NGOProfiles to fetch.
     */
    orderBy?: NGOProfileOrderByWithRelationInput | NGOProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing NGOProfiles.
     */
    cursor?: NGOProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NGOProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NGOProfiles.
     */
    skip?: number
    distinct?: NGOProfileScalarFieldEnum | NGOProfileScalarFieldEnum[]
  }

  /**
   * NGOProfile create
   */
  export type NGOProfileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NGOProfile
     */
    select?: NGOProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NGOProfile
     */
    omit?: NGOProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NGOProfileInclude<ExtArgs> | null
    /**
     * The data needed to create a NGOProfile.
     */
    data: XOR<NGOProfileCreateInput, NGOProfileUncheckedCreateInput>
  }

  /**
   * NGOProfile createMany
   */
  export type NGOProfileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many NGOProfiles.
     */
    data: NGOProfileCreateManyInput | NGOProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * NGOProfile createManyAndReturn
   */
  export type NGOProfileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NGOProfile
     */
    select?: NGOProfileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the NGOProfile
     */
    omit?: NGOProfileOmit<ExtArgs> | null
    /**
     * The data used to create many NGOProfiles.
     */
    data: NGOProfileCreateManyInput | NGOProfileCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NGOProfileIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * NGOProfile update
   */
  export type NGOProfileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NGOProfile
     */
    select?: NGOProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NGOProfile
     */
    omit?: NGOProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NGOProfileInclude<ExtArgs> | null
    /**
     * The data needed to update a NGOProfile.
     */
    data: XOR<NGOProfileUpdateInput, NGOProfileUncheckedUpdateInput>
    /**
     * Choose, which NGOProfile to update.
     */
    where: NGOProfileWhereUniqueInput
  }

  /**
   * NGOProfile updateMany
   */
  export type NGOProfileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update NGOProfiles.
     */
    data: XOR<NGOProfileUpdateManyMutationInput, NGOProfileUncheckedUpdateManyInput>
    /**
     * Filter which NGOProfiles to update
     */
    where?: NGOProfileWhereInput
    /**
     * Limit how many NGOProfiles to update.
     */
    limit?: number
  }

  /**
   * NGOProfile updateManyAndReturn
   */
  export type NGOProfileUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NGOProfile
     */
    select?: NGOProfileSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the NGOProfile
     */
    omit?: NGOProfileOmit<ExtArgs> | null
    /**
     * The data used to update NGOProfiles.
     */
    data: XOR<NGOProfileUpdateManyMutationInput, NGOProfileUncheckedUpdateManyInput>
    /**
     * Filter which NGOProfiles to update
     */
    where?: NGOProfileWhereInput
    /**
     * Limit how many NGOProfiles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NGOProfileIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * NGOProfile upsert
   */
  export type NGOProfileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NGOProfile
     */
    select?: NGOProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NGOProfile
     */
    omit?: NGOProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NGOProfileInclude<ExtArgs> | null
    /**
     * The filter to search for the NGOProfile to update in case it exists.
     */
    where: NGOProfileWhereUniqueInput
    /**
     * In case the NGOProfile found by the `where` argument doesn't exist, create a new NGOProfile with this data.
     */
    create: XOR<NGOProfileCreateInput, NGOProfileUncheckedCreateInput>
    /**
     * In case the NGOProfile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NGOProfileUpdateInput, NGOProfileUncheckedUpdateInput>
  }

  /**
   * NGOProfile delete
   */
  export type NGOProfileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NGOProfile
     */
    select?: NGOProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NGOProfile
     */
    omit?: NGOProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NGOProfileInclude<ExtArgs> | null
    /**
     * Filter which NGOProfile to delete.
     */
    where: NGOProfileWhereUniqueInput
  }

  /**
   * NGOProfile deleteMany
   */
  export type NGOProfileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NGOProfiles to delete
     */
    where?: NGOProfileWhereInput
    /**
     * Limit how many NGOProfiles to delete.
     */
    limit?: number
  }

  /**
   * NGOProfile.campaigns
   */
  export type NGOProfile$campaignsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null
    where?: CampaignWhereInput
    orderBy?: CampaignOrderByWithRelationInput | CampaignOrderByWithRelationInput[]
    cursor?: CampaignWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CampaignScalarFieldEnum | CampaignScalarFieldEnum[]
  }

  /**
   * NGOProfile.bankDetails
   */
  export type NGOProfile$bankDetailsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BankDetail
     */
    select?: BankDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BankDetail
     */
    omit?: BankDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BankDetailInclude<ExtArgs> | null
    where?: BankDetailWhereInput
    orderBy?: BankDetailOrderByWithRelationInput | BankDetailOrderByWithRelationInput[]
    cursor?: BankDetailWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BankDetailScalarFieldEnum | BankDetailScalarFieldEnum[]
  }

  /**
   * NGOProfile.documents
   */
  export type NGOProfile$documentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    where?: DocumentWhereInput
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    cursor?: DocumentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * NGOProfile.addresses
   */
  export type NGOProfile$addressesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    where?: AddressWhereInput
    orderBy?: AddressOrderByWithRelationInput | AddressOrderByWithRelationInput[]
    cursor?: AddressWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AddressScalarFieldEnum | AddressScalarFieldEnum[]
  }

  /**
   * NGOProfile.auditLogs
   */
  export type NGOProfile$auditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    cursor?: AuditLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * NGOProfile without action
   */
  export type NGOProfileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NGOProfile
     */
    select?: NGOProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NGOProfile
     */
    omit?: NGOProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NGOProfileInclude<ExtArgs> | null
  }


  /**
   * Model CompanyProfile
   */

  export type AggregateCompanyProfile = {
    _count: CompanyProfileCountAggregateOutputType | null
    _avg: CompanyProfileAvgAggregateOutputType | null
    _sum: CompanyProfileSumAggregateOutputType | null
    _min: CompanyProfileMinAggregateOutputType | null
    _max: CompanyProfileMaxAggregateOutputType | null
  }

  export type CompanyProfileAvgAggregateOutputType = {
    netWorth: number | null
    averageProfit: number | null
    csrBudget: number | null
  }

  export type CompanyProfileSumAggregateOutputType = {
    netWorth: number | null
    averageProfit: number | null
    csrBudget: number | null
  }

  export type CompanyProfileMinAggregateOutputType = {
    id: string | null
    userId: string | null
    cin: string | null
    csrPolicyUrl: string | null
    industry: string | null
    netWorth: number | null
    averageProfit: number | null
    csrBudget: number | null
    csrCommittee: string | null
  }

  export type CompanyProfileMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    cin: string | null
    csrPolicyUrl: string | null
    industry: string | null
    netWorth: number | null
    averageProfit: number | null
    csrBudget: number | null
    csrCommittee: string | null
  }

  export type CompanyProfileCountAggregateOutputType = {
    id: number
    userId: number
    cin: number
    csrPolicyUrl: number
    industry: number
    netWorth: number
    averageProfit: number
    csrBudget: number
    csrCommittee: number
    _all: number
  }


  export type CompanyProfileAvgAggregateInputType = {
    netWorth?: true
    averageProfit?: true
    csrBudget?: true
  }

  export type CompanyProfileSumAggregateInputType = {
    netWorth?: true
    averageProfit?: true
    csrBudget?: true
  }

  export type CompanyProfileMinAggregateInputType = {
    id?: true
    userId?: true
    cin?: true
    csrPolicyUrl?: true
    industry?: true
    netWorth?: true
    averageProfit?: true
    csrBudget?: true
    csrCommittee?: true
  }

  export type CompanyProfileMaxAggregateInputType = {
    id?: true
    userId?: true
    cin?: true
    csrPolicyUrl?: true
    industry?: true
    netWorth?: true
    averageProfit?: true
    csrBudget?: true
    csrCommittee?: true
  }

  export type CompanyProfileCountAggregateInputType = {
    id?: true
    userId?: true
    cin?: true
    csrPolicyUrl?: true
    industry?: true
    netWorth?: true
    averageProfit?: true
    csrBudget?: true
    csrCommittee?: true
    _all?: true
  }

  export type CompanyProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CompanyProfile to aggregate.
     */
    where?: CompanyProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CompanyProfiles to fetch.
     */
    orderBy?: CompanyProfileOrderByWithRelationInput | CompanyProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CompanyProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CompanyProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CompanyProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CompanyProfiles
    **/
    _count?: true | CompanyProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CompanyProfileAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CompanyProfileSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CompanyProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CompanyProfileMaxAggregateInputType
  }

  export type GetCompanyProfileAggregateType<T extends CompanyProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateCompanyProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCompanyProfile[P]>
      : GetScalarType<T[P], AggregateCompanyProfile[P]>
  }




  export type CompanyProfileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CompanyProfileWhereInput
    orderBy?: CompanyProfileOrderByWithAggregationInput | CompanyProfileOrderByWithAggregationInput[]
    by: CompanyProfileScalarFieldEnum[] | CompanyProfileScalarFieldEnum
    having?: CompanyProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CompanyProfileCountAggregateInputType | true
    _avg?: CompanyProfileAvgAggregateInputType
    _sum?: CompanyProfileSumAggregateInputType
    _min?: CompanyProfileMinAggregateInputType
    _max?: CompanyProfileMaxAggregateInputType
  }

  export type CompanyProfileGroupByOutputType = {
    id: string
    userId: string
    cin: string
    csrPolicyUrl: string | null
    industry: string
    netWorth: number | null
    averageProfit: number | null
    csrBudget: number | null
    csrCommittee: string | null
    _count: CompanyProfileCountAggregateOutputType | null
    _avg: CompanyProfileAvgAggregateOutputType | null
    _sum: CompanyProfileSumAggregateOutputType | null
    _min: CompanyProfileMinAggregateOutputType | null
    _max: CompanyProfileMaxAggregateOutputType | null
  }

  type GetCompanyProfileGroupByPayload<T extends CompanyProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CompanyProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CompanyProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CompanyProfileGroupByOutputType[P]>
            : GetScalarType<T[P], CompanyProfileGroupByOutputType[P]>
        }
      >
    >


  export type CompanyProfileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    cin?: boolean
    csrPolicyUrl?: boolean
    industry?: boolean
    netWorth?: boolean
    averageProfit?: boolean
    csrBudget?: boolean
    csrCommittee?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    donations?: boolean | CompanyProfile$donationsArgs<ExtArgs>
    documents?: boolean | CompanyProfile$documentsArgs<ExtArgs>
    bankDetails?: boolean | CompanyProfile$bankDetailsArgs<ExtArgs>
    addresses?: boolean | CompanyProfile$addressesArgs<ExtArgs>
    auditLogs?: boolean | CompanyProfile$auditLogsArgs<ExtArgs>
    _count?: boolean | CompanyProfileCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["companyProfile"]>

  export type CompanyProfileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    cin?: boolean
    csrPolicyUrl?: boolean
    industry?: boolean
    netWorth?: boolean
    averageProfit?: boolean
    csrBudget?: boolean
    csrCommittee?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["companyProfile"]>

  export type CompanyProfileSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    cin?: boolean
    csrPolicyUrl?: boolean
    industry?: boolean
    netWorth?: boolean
    averageProfit?: boolean
    csrBudget?: boolean
    csrCommittee?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["companyProfile"]>

  export type CompanyProfileSelectScalar = {
    id?: boolean
    userId?: boolean
    cin?: boolean
    csrPolicyUrl?: boolean
    industry?: boolean
    netWorth?: boolean
    averageProfit?: boolean
    csrBudget?: boolean
    csrCommittee?: boolean
  }

  export type CompanyProfileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "cin" | "csrPolicyUrl" | "industry" | "netWorth" | "averageProfit" | "csrBudget" | "csrCommittee", ExtArgs["result"]["companyProfile"]>
  export type CompanyProfileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    donations?: boolean | CompanyProfile$donationsArgs<ExtArgs>
    documents?: boolean | CompanyProfile$documentsArgs<ExtArgs>
    bankDetails?: boolean | CompanyProfile$bankDetailsArgs<ExtArgs>
    addresses?: boolean | CompanyProfile$addressesArgs<ExtArgs>
    auditLogs?: boolean | CompanyProfile$auditLogsArgs<ExtArgs>
    _count?: boolean | CompanyProfileCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CompanyProfileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CompanyProfileIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $CompanyProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CompanyProfile"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      donations: Prisma.$DonationPayload<ExtArgs>[]
      documents: Prisma.$DocumentPayload<ExtArgs>[]
      bankDetails: Prisma.$BankDetailPayload<ExtArgs>[]
      addresses: Prisma.$AddressPayload<ExtArgs>[]
      auditLogs: Prisma.$AuditLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      cin: string
      csrPolicyUrl: string | null
      industry: string
      netWorth: number | null
      averageProfit: number | null
      csrBudget: number | null
      csrCommittee: string | null
    }, ExtArgs["result"]["companyProfile"]>
    composites: {}
  }

  type CompanyProfileGetPayload<S extends boolean | null | undefined | CompanyProfileDefaultArgs> = $Result.GetResult<Prisma.$CompanyProfilePayload, S>

  type CompanyProfileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CompanyProfileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CompanyProfileCountAggregateInputType | true
    }

  export interface CompanyProfileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CompanyProfile'], meta: { name: 'CompanyProfile' } }
    /**
     * Find zero or one CompanyProfile that matches the filter.
     * @param {CompanyProfileFindUniqueArgs} args - Arguments to find a CompanyProfile
     * @example
     * // Get one CompanyProfile
     * const companyProfile = await prisma.companyProfile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CompanyProfileFindUniqueArgs>(args: SelectSubset<T, CompanyProfileFindUniqueArgs<ExtArgs>>): Prisma__CompanyProfileClient<$Result.GetResult<Prisma.$CompanyProfilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CompanyProfile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CompanyProfileFindUniqueOrThrowArgs} args - Arguments to find a CompanyProfile
     * @example
     * // Get one CompanyProfile
     * const companyProfile = await prisma.companyProfile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CompanyProfileFindUniqueOrThrowArgs>(args: SelectSubset<T, CompanyProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CompanyProfileClient<$Result.GetResult<Prisma.$CompanyProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CompanyProfile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyProfileFindFirstArgs} args - Arguments to find a CompanyProfile
     * @example
     * // Get one CompanyProfile
     * const companyProfile = await prisma.companyProfile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CompanyProfileFindFirstArgs>(args?: SelectSubset<T, CompanyProfileFindFirstArgs<ExtArgs>>): Prisma__CompanyProfileClient<$Result.GetResult<Prisma.$CompanyProfilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CompanyProfile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyProfileFindFirstOrThrowArgs} args - Arguments to find a CompanyProfile
     * @example
     * // Get one CompanyProfile
     * const companyProfile = await prisma.companyProfile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CompanyProfileFindFirstOrThrowArgs>(args?: SelectSubset<T, CompanyProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma__CompanyProfileClient<$Result.GetResult<Prisma.$CompanyProfilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CompanyProfiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CompanyProfiles
     * const companyProfiles = await prisma.companyProfile.findMany()
     * 
     * // Get first 10 CompanyProfiles
     * const companyProfiles = await prisma.companyProfile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const companyProfileWithIdOnly = await prisma.companyProfile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CompanyProfileFindManyArgs>(args?: SelectSubset<T, CompanyProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CompanyProfile.
     * @param {CompanyProfileCreateArgs} args - Arguments to create a CompanyProfile.
     * @example
     * // Create one CompanyProfile
     * const CompanyProfile = await prisma.companyProfile.create({
     *   data: {
     *     // ... data to create a CompanyProfile
     *   }
     * })
     * 
     */
    create<T extends CompanyProfileCreateArgs>(args: SelectSubset<T, CompanyProfileCreateArgs<ExtArgs>>): Prisma__CompanyProfileClient<$Result.GetResult<Prisma.$CompanyProfilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CompanyProfiles.
     * @param {CompanyProfileCreateManyArgs} args - Arguments to create many CompanyProfiles.
     * @example
     * // Create many CompanyProfiles
     * const companyProfile = await prisma.companyProfile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CompanyProfileCreateManyArgs>(args?: SelectSubset<T, CompanyProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CompanyProfiles and returns the data saved in the database.
     * @param {CompanyProfileCreateManyAndReturnArgs} args - Arguments to create many CompanyProfiles.
     * @example
     * // Create many CompanyProfiles
     * const companyProfile = await prisma.companyProfile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CompanyProfiles and only return the `id`
     * const companyProfileWithIdOnly = await prisma.companyProfile.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CompanyProfileCreateManyAndReturnArgs>(args?: SelectSubset<T, CompanyProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyProfilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CompanyProfile.
     * @param {CompanyProfileDeleteArgs} args - Arguments to delete one CompanyProfile.
     * @example
     * // Delete one CompanyProfile
     * const CompanyProfile = await prisma.companyProfile.delete({
     *   where: {
     *     // ... filter to delete one CompanyProfile
     *   }
     * })
     * 
     */
    delete<T extends CompanyProfileDeleteArgs>(args: SelectSubset<T, CompanyProfileDeleteArgs<ExtArgs>>): Prisma__CompanyProfileClient<$Result.GetResult<Prisma.$CompanyProfilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CompanyProfile.
     * @param {CompanyProfileUpdateArgs} args - Arguments to update one CompanyProfile.
     * @example
     * // Update one CompanyProfile
     * const companyProfile = await prisma.companyProfile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CompanyProfileUpdateArgs>(args: SelectSubset<T, CompanyProfileUpdateArgs<ExtArgs>>): Prisma__CompanyProfileClient<$Result.GetResult<Prisma.$CompanyProfilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CompanyProfiles.
     * @param {CompanyProfileDeleteManyArgs} args - Arguments to filter CompanyProfiles to delete.
     * @example
     * // Delete a few CompanyProfiles
     * const { count } = await prisma.companyProfile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CompanyProfileDeleteManyArgs>(args?: SelectSubset<T, CompanyProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CompanyProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CompanyProfiles
     * const companyProfile = await prisma.companyProfile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CompanyProfileUpdateManyArgs>(args: SelectSubset<T, CompanyProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CompanyProfiles and returns the data updated in the database.
     * @param {CompanyProfileUpdateManyAndReturnArgs} args - Arguments to update many CompanyProfiles.
     * @example
     * // Update many CompanyProfiles
     * const companyProfile = await prisma.companyProfile.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CompanyProfiles and only return the `id`
     * const companyProfileWithIdOnly = await prisma.companyProfile.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CompanyProfileUpdateManyAndReturnArgs>(args: SelectSubset<T, CompanyProfileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyProfilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CompanyProfile.
     * @param {CompanyProfileUpsertArgs} args - Arguments to update or create a CompanyProfile.
     * @example
     * // Update or create a CompanyProfile
     * const companyProfile = await prisma.companyProfile.upsert({
     *   create: {
     *     // ... data to create a CompanyProfile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CompanyProfile we want to update
     *   }
     * })
     */
    upsert<T extends CompanyProfileUpsertArgs>(args: SelectSubset<T, CompanyProfileUpsertArgs<ExtArgs>>): Prisma__CompanyProfileClient<$Result.GetResult<Prisma.$CompanyProfilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CompanyProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyProfileCountArgs} args - Arguments to filter CompanyProfiles to count.
     * @example
     * // Count the number of CompanyProfiles
     * const count = await prisma.companyProfile.count({
     *   where: {
     *     // ... the filter for the CompanyProfiles we want to count
     *   }
     * })
    **/
    count<T extends CompanyProfileCountArgs>(
      args?: Subset<T, CompanyProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CompanyProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CompanyProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CompanyProfileAggregateArgs>(args: Subset<T, CompanyProfileAggregateArgs>): Prisma.PrismaPromise<GetCompanyProfileAggregateType<T>>

    /**
     * Group by CompanyProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyProfileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CompanyProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CompanyProfileGroupByArgs['orderBy'] }
        : { orderBy?: CompanyProfileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CompanyProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCompanyProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CompanyProfile model
   */
  readonly fields: CompanyProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CompanyProfile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CompanyProfileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    donations<T extends CompanyProfile$donationsArgs<ExtArgs> = {}>(args?: Subset<T, CompanyProfile$donationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DonationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    documents<T extends CompanyProfile$documentsArgs<ExtArgs> = {}>(args?: Subset<T, CompanyProfile$documentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    bankDetails<T extends CompanyProfile$bankDetailsArgs<ExtArgs> = {}>(args?: Subset<T, CompanyProfile$bankDetailsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BankDetailPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    addresses<T extends CompanyProfile$addressesArgs<ExtArgs> = {}>(args?: Subset<T, CompanyProfile$addressesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    auditLogs<T extends CompanyProfile$auditLogsArgs<ExtArgs> = {}>(args?: Subset<T, CompanyProfile$auditLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CompanyProfile model
   */
  interface CompanyProfileFieldRefs {
    readonly id: FieldRef<"CompanyProfile", 'String'>
    readonly userId: FieldRef<"CompanyProfile", 'String'>
    readonly cin: FieldRef<"CompanyProfile", 'String'>
    readonly csrPolicyUrl: FieldRef<"CompanyProfile", 'String'>
    readonly industry: FieldRef<"CompanyProfile", 'String'>
    readonly netWorth: FieldRef<"CompanyProfile", 'Float'>
    readonly averageProfit: FieldRef<"CompanyProfile", 'Float'>
    readonly csrBudget: FieldRef<"CompanyProfile", 'Float'>
    readonly csrCommittee: FieldRef<"CompanyProfile", 'String'>
  }
    

  // Custom InputTypes
  /**
   * CompanyProfile findUnique
   */
  export type CompanyProfileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyProfile
     */
    select?: CompanyProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyProfile
     */
    omit?: CompanyProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyProfileInclude<ExtArgs> | null
    /**
     * Filter, which CompanyProfile to fetch.
     */
    where: CompanyProfileWhereUniqueInput
  }

  /**
   * CompanyProfile findUniqueOrThrow
   */
  export type CompanyProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyProfile
     */
    select?: CompanyProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyProfile
     */
    omit?: CompanyProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyProfileInclude<ExtArgs> | null
    /**
     * Filter, which CompanyProfile to fetch.
     */
    where: CompanyProfileWhereUniqueInput
  }

  /**
   * CompanyProfile findFirst
   */
  export type CompanyProfileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyProfile
     */
    select?: CompanyProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyProfile
     */
    omit?: CompanyProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyProfileInclude<ExtArgs> | null
    /**
     * Filter, which CompanyProfile to fetch.
     */
    where?: CompanyProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CompanyProfiles to fetch.
     */
    orderBy?: CompanyProfileOrderByWithRelationInput | CompanyProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CompanyProfiles.
     */
    cursor?: CompanyProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CompanyProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CompanyProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CompanyProfiles.
     */
    distinct?: CompanyProfileScalarFieldEnum | CompanyProfileScalarFieldEnum[]
  }

  /**
   * CompanyProfile findFirstOrThrow
   */
  export type CompanyProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyProfile
     */
    select?: CompanyProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyProfile
     */
    omit?: CompanyProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyProfileInclude<ExtArgs> | null
    /**
     * Filter, which CompanyProfile to fetch.
     */
    where?: CompanyProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CompanyProfiles to fetch.
     */
    orderBy?: CompanyProfileOrderByWithRelationInput | CompanyProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CompanyProfiles.
     */
    cursor?: CompanyProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CompanyProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CompanyProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CompanyProfiles.
     */
    distinct?: CompanyProfileScalarFieldEnum | CompanyProfileScalarFieldEnum[]
  }

  /**
   * CompanyProfile findMany
   */
  export type CompanyProfileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyProfile
     */
    select?: CompanyProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyProfile
     */
    omit?: CompanyProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyProfileInclude<ExtArgs> | null
    /**
     * Filter, which CompanyProfiles to fetch.
     */
    where?: CompanyProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CompanyProfiles to fetch.
     */
    orderBy?: CompanyProfileOrderByWithRelationInput | CompanyProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CompanyProfiles.
     */
    cursor?: CompanyProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CompanyProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CompanyProfiles.
     */
    skip?: number
    distinct?: CompanyProfileScalarFieldEnum | CompanyProfileScalarFieldEnum[]
  }

  /**
   * CompanyProfile create
   */
  export type CompanyProfileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyProfile
     */
    select?: CompanyProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyProfile
     */
    omit?: CompanyProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyProfileInclude<ExtArgs> | null
    /**
     * The data needed to create a CompanyProfile.
     */
    data: XOR<CompanyProfileCreateInput, CompanyProfileUncheckedCreateInput>
  }

  /**
   * CompanyProfile createMany
   */
  export type CompanyProfileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CompanyProfiles.
     */
    data: CompanyProfileCreateManyInput | CompanyProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CompanyProfile createManyAndReturn
   */
  export type CompanyProfileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyProfile
     */
    select?: CompanyProfileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyProfile
     */
    omit?: CompanyProfileOmit<ExtArgs> | null
    /**
     * The data used to create many CompanyProfiles.
     */
    data: CompanyProfileCreateManyInput | CompanyProfileCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyProfileIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CompanyProfile update
   */
  export type CompanyProfileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyProfile
     */
    select?: CompanyProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyProfile
     */
    omit?: CompanyProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyProfileInclude<ExtArgs> | null
    /**
     * The data needed to update a CompanyProfile.
     */
    data: XOR<CompanyProfileUpdateInput, CompanyProfileUncheckedUpdateInput>
    /**
     * Choose, which CompanyProfile to update.
     */
    where: CompanyProfileWhereUniqueInput
  }

  /**
   * CompanyProfile updateMany
   */
  export type CompanyProfileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CompanyProfiles.
     */
    data: XOR<CompanyProfileUpdateManyMutationInput, CompanyProfileUncheckedUpdateManyInput>
    /**
     * Filter which CompanyProfiles to update
     */
    where?: CompanyProfileWhereInput
    /**
     * Limit how many CompanyProfiles to update.
     */
    limit?: number
  }

  /**
   * CompanyProfile updateManyAndReturn
   */
  export type CompanyProfileUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyProfile
     */
    select?: CompanyProfileSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyProfile
     */
    omit?: CompanyProfileOmit<ExtArgs> | null
    /**
     * The data used to update CompanyProfiles.
     */
    data: XOR<CompanyProfileUpdateManyMutationInput, CompanyProfileUncheckedUpdateManyInput>
    /**
     * Filter which CompanyProfiles to update
     */
    where?: CompanyProfileWhereInput
    /**
     * Limit how many CompanyProfiles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyProfileIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CompanyProfile upsert
   */
  export type CompanyProfileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyProfile
     */
    select?: CompanyProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyProfile
     */
    omit?: CompanyProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyProfileInclude<ExtArgs> | null
    /**
     * The filter to search for the CompanyProfile to update in case it exists.
     */
    where: CompanyProfileWhereUniqueInput
    /**
     * In case the CompanyProfile found by the `where` argument doesn't exist, create a new CompanyProfile with this data.
     */
    create: XOR<CompanyProfileCreateInput, CompanyProfileUncheckedCreateInput>
    /**
     * In case the CompanyProfile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CompanyProfileUpdateInput, CompanyProfileUncheckedUpdateInput>
  }

  /**
   * CompanyProfile delete
   */
  export type CompanyProfileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyProfile
     */
    select?: CompanyProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyProfile
     */
    omit?: CompanyProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyProfileInclude<ExtArgs> | null
    /**
     * Filter which CompanyProfile to delete.
     */
    where: CompanyProfileWhereUniqueInput
  }

  /**
   * CompanyProfile deleteMany
   */
  export type CompanyProfileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CompanyProfiles to delete
     */
    where?: CompanyProfileWhereInput
    /**
     * Limit how many CompanyProfiles to delete.
     */
    limit?: number
  }

  /**
   * CompanyProfile.donations
   */
  export type CompanyProfile$donationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Donation
     */
    select?: DonationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Donation
     */
    omit?: DonationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonationInclude<ExtArgs> | null
    where?: DonationWhereInput
    orderBy?: DonationOrderByWithRelationInput | DonationOrderByWithRelationInput[]
    cursor?: DonationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DonationScalarFieldEnum | DonationScalarFieldEnum[]
  }

  /**
   * CompanyProfile.documents
   */
  export type CompanyProfile$documentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    where?: DocumentWhereInput
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    cursor?: DocumentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * CompanyProfile.bankDetails
   */
  export type CompanyProfile$bankDetailsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BankDetail
     */
    select?: BankDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BankDetail
     */
    omit?: BankDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BankDetailInclude<ExtArgs> | null
    where?: BankDetailWhereInput
    orderBy?: BankDetailOrderByWithRelationInput | BankDetailOrderByWithRelationInput[]
    cursor?: BankDetailWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BankDetailScalarFieldEnum | BankDetailScalarFieldEnum[]
  }

  /**
   * CompanyProfile.addresses
   */
  export type CompanyProfile$addressesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    where?: AddressWhereInput
    orderBy?: AddressOrderByWithRelationInput | AddressOrderByWithRelationInput[]
    cursor?: AddressWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AddressScalarFieldEnum | AddressScalarFieldEnum[]
  }

  /**
   * CompanyProfile.auditLogs
   */
  export type CompanyProfile$auditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    cursor?: AuditLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * CompanyProfile without action
   */
  export type CompanyProfileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyProfile
     */
    select?: CompanyProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyProfile
     */
    omit?: CompanyProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyProfileInclude<ExtArgs> | null
  }


  /**
   * Model DonorProfile
   */

  export type AggregateDonorProfile = {
    _count: DonorProfileCountAggregateOutputType | null
    _min: DonorProfileMinAggregateOutputType | null
    _max: DonorProfileMaxAggregateOutputType | null
  }

  export type DonorProfileMinAggregateOutputType = {
    id: string | null
    userId: string | null
    pan: string | null
    occupation: string | null
    interests: string | null
  }

  export type DonorProfileMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    pan: string | null
    occupation: string | null
    interests: string | null
  }

  export type DonorProfileCountAggregateOutputType = {
    id: number
    userId: number
    pan: number
    occupation: number
    interests: number
    _all: number
  }


  export type DonorProfileMinAggregateInputType = {
    id?: true
    userId?: true
    pan?: true
    occupation?: true
    interests?: true
  }

  export type DonorProfileMaxAggregateInputType = {
    id?: true
    userId?: true
    pan?: true
    occupation?: true
    interests?: true
  }

  export type DonorProfileCountAggregateInputType = {
    id?: true
    userId?: true
    pan?: true
    occupation?: true
    interests?: true
    _all?: true
  }

  export type DonorProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DonorProfile to aggregate.
     */
    where?: DonorProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DonorProfiles to fetch.
     */
    orderBy?: DonorProfileOrderByWithRelationInput | DonorProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DonorProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DonorProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DonorProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DonorProfiles
    **/
    _count?: true | DonorProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DonorProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DonorProfileMaxAggregateInputType
  }

  export type GetDonorProfileAggregateType<T extends DonorProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateDonorProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDonorProfile[P]>
      : GetScalarType<T[P], AggregateDonorProfile[P]>
  }




  export type DonorProfileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DonorProfileWhereInput
    orderBy?: DonorProfileOrderByWithAggregationInput | DonorProfileOrderByWithAggregationInput[]
    by: DonorProfileScalarFieldEnum[] | DonorProfileScalarFieldEnum
    having?: DonorProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DonorProfileCountAggregateInputType | true
    _min?: DonorProfileMinAggregateInputType
    _max?: DonorProfileMaxAggregateInputType
  }

  export type DonorProfileGroupByOutputType = {
    id: string
    userId: string
    pan: string | null
    occupation: string | null
    interests: string | null
    _count: DonorProfileCountAggregateOutputType | null
    _min: DonorProfileMinAggregateOutputType | null
    _max: DonorProfileMaxAggregateOutputType | null
  }

  type GetDonorProfileGroupByPayload<T extends DonorProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DonorProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DonorProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DonorProfileGroupByOutputType[P]>
            : GetScalarType<T[P], DonorProfileGroupByOutputType[P]>
        }
      >
    >


  export type DonorProfileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    pan?: boolean
    occupation?: boolean
    interests?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    donations?: boolean | DonorProfile$donationsArgs<ExtArgs>
    addresses?: boolean | DonorProfile$addressesArgs<ExtArgs>
    auditLogs?: boolean | DonorProfile$auditLogsArgs<ExtArgs>
    _count?: boolean | DonorProfileCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["donorProfile"]>

  export type DonorProfileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    pan?: boolean
    occupation?: boolean
    interests?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["donorProfile"]>

  export type DonorProfileSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    pan?: boolean
    occupation?: boolean
    interests?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["donorProfile"]>

  export type DonorProfileSelectScalar = {
    id?: boolean
    userId?: boolean
    pan?: boolean
    occupation?: boolean
    interests?: boolean
  }

  export type DonorProfileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "pan" | "occupation" | "interests", ExtArgs["result"]["donorProfile"]>
  export type DonorProfileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    donations?: boolean | DonorProfile$donationsArgs<ExtArgs>
    addresses?: boolean | DonorProfile$addressesArgs<ExtArgs>
    auditLogs?: boolean | DonorProfile$auditLogsArgs<ExtArgs>
    _count?: boolean | DonorProfileCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DonorProfileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type DonorProfileIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $DonorProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DonorProfile"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      donations: Prisma.$DonationPayload<ExtArgs>[]
      addresses: Prisma.$AddressPayload<ExtArgs>[]
      auditLogs: Prisma.$AuditLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      pan: string | null
      occupation: string | null
      interests: string | null
    }, ExtArgs["result"]["donorProfile"]>
    composites: {}
  }

  type DonorProfileGetPayload<S extends boolean | null | undefined | DonorProfileDefaultArgs> = $Result.GetResult<Prisma.$DonorProfilePayload, S>

  type DonorProfileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DonorProfileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DonorProfileCountAggregateInputType | true
    }

  export interface DonorProfileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DonorProfile'], meta: { name: 'DonorProfile' } }
    /**
     * Find zero or one DonorProfile that matches the filter.
     * @param {DonorProfileFindUniqueArgs} args - Arguments to find a DonorProfile
     * @example
     * // Get one DonorProfile
     * const donorProfile = await prisma.donorProfile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DonorProfileFindUniqueArgs>(args: SelectSubset<T, DonorProfileFindUniqueArgs<ExtArgs>>): Prisma__DonorProfileClient<$Result.GetResult<Prisma.$DonorProfilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DonorProfile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DonorProfileFindUniqueOrThrowArgs} args - Arguments to find a DonorProfile
     * @example
     * // Get one DonorProfile
     * const donorProfile = await prisma.donorProfile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DonorProfileFindUniqueOrThrowArgs>(args: SelectSubset<T, DonorProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DonorProfileClient<$Result.GetResult<Prisma.$DonorProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DonorProfile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DonorProfileFindFirstArgs} args - Arguments to find a DonorProfile
     * @example
     * // Get one DonorProfile
     * const donorProfile = await prisma.donorProfile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DonorProfileFindFirstArgs>(args?: SelectSubset<T, DonorProfileFindFirstArgs<ExtArgs>>): Prisma__DonorProfileClient<$Result.GetResult<Prisma.$DonorProfilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DonorProfile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DonorProfileFindFirstOrThrowArgs} args - Arguments to find a DonorProfile
     * @example
     * // Get one DonorProfile
     * const donorProfile = await prisma.donorProfile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DonorProfileFindFirstOrThrowArgs>(args?: SelectSubset<T, DonorProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma__DonorProfileClient<$Result.GetResult<Prisma.$DonorProfilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DonorProfiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DonorProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DonorProfiles
     * const donorProfiles = await prisma.donorProfile.findMany()
     * 
     * // Get first 10 DonorProfiles
     * const donorProfiles = await prisma.donorProfile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const donorProfileWithIdOnly = await prisma.donorProfile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DonorProfileFindManyArgs>(args?: SelectSubset<T, DonorProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DonorProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DonorProfile.
     * @param {DonorProfileCreateArgs} args - Arguments to create a DonorProfile.
     * @example
     * // Create one DonorProfile
     * const DonorProfile = await prisma.donorProfile.create({
     *   data: {
     *     // ... data to create a DonorProfile
     *   }
     * })
     * 
     */
    create<T extends DonorProfileCreateArgs>(args: SelectSubset<T, DonorProfileCreateArgs<ExtArgs>>): Prisma__DonorProfileClient<$Result.GetResult<Prisma.$DonorProfilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DonorProfiles.
     * @param {DonorProfileCreateManyArgs} args - Arguments to create many DonorProfiles.
     * @example
     * // Create many DonorProfiles
     * const donorProfile = await prisma.donorProfile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DonorProfileCreateManyArgs>(args?: SelectSubset<T, DonorProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DonorProfiles and returns the data saved in the database.
     * @param {DonorProfileCreateManyAndReturnArgs} args - Arguments to create many DonorProfiles.
     * @example
     * // Create many DonorProfiles
     * const donorProfile = await prisma.donorProfile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DonorProfiles and only return the `id`
     * const donorProfileWithIdOnly = await prisma.donorProfile.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DonorProfileCreateManyAndReturnArgs>(args?: SelectSubset<T, DonorProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DonorProfilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DonorProfile.
     * @param {DonorProfileDeleteArgs} args - Arguments to delete one DonorProfile.
     * @example
     * // Delete one DonorProfile
     * const DonorProfile = await prisma.donorProfile.delete({
     *   where: {
     *     // ... filter to delete one DonorProfile
     *   }
     * })
     * 
     */
    delete<T extends DonorProfileDeleteArgs>(args: SelectSubset<T, DonorProfileDeleteArgs<ExtArgs>>): Prisma__DonorProfileClient<$Result.GetResult<Prisma.$DonorProfilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DonorProfile.
     * @param {DonorProfileUpdateArgs} args - Arguments to update one DonorProfile.
     * @example
     * // Update one DonorProfile
     * const donorProfile = await prisma.donorProfile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DonorProfileUpdateArgs>(args: SelectSubset<T, DonorProfileUpdateArgs<ExtArgs>>): Prisma__DonorProfileClient<$Result.GetResult<Prisma.$DonorProfilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DonorProfiles.
     * @param {DonorProfileDeleteManyArgs} args - Arguments to filter DonorProfiles to delete.
     * @example
     * // Delete a few DonorProfiles
     * const { count } = await prisma.donorProfile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DonorProfileDeleteManyArgs>(args?: SelectSubset<T, DonorProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DonorProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DonorProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DonorProfiles
     * const donorProfile = await prisma.donorProfile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DonorProfileUpdateManyArgs>(args: SelectSubset<T, DonorProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DonorProfiles and returns the data updated in the database.
     * @param {DonorProfileUpdateManyAndReturnArgs} args - Arguments to update many DonorProfiles.
     * @example
     * // Update many DonorProfiles
     * const donorProfile = await prisma.donorProfile.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DonorProfiles and only return the `id`
     * const donorProfileWithIdOnly = await prisma.donorProfile.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DonorProfileUpdateManyAndReturnArgs>(args: SelectSubset<T, DonorProfileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DonorProfilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DonorProfile.
     * @param {DonorProfileUpsertArgs} args - Arguments to update or create a DonorProfile.
     * @example
     * // Update or create a DonorProfile
     * const donorProfile = await prisma.donorProfile.upsert({
     *   create: {
     *     // ... data to create a DonorProfile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DonorProfile we want to update
     *   }
     * })
     */
    upsert<T extends DonorProfileUpsertArgs>(args: SelectSubset<T, DonorProfileUpsertArgs<ExtArgs>>): Prisma__DonorProfileClient<$Result.GetResult<Prisma.$DonorProfilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DonorProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DonorProfileCountArgs} args - Arguments to filter DonorProfiles to count.
     * @example
     * // Count the number of DonorProfiles
     * const count = await prisma.donorProfile.count({
     *   where: {
     *     // ... the filter for the DonorProfiles we want to count
     *   }
     * })
    **/
    count<T extends DonorProfileCountArgs>(
      args?: Subset<T, DonorProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DonorProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DonorProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DonorProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DonorProfileAggregateArgs>(args: Subset<T, DonorProfileAggregateArgs>): Prisma.PrismaPromise<GetDonorProfileAggregateType<T>>

    /**
     * Group by DonorProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DonorProfileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DonorProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DonorProfileGroupByArgs['orderBy'] }
        : { orderBy?: DonorProfileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DonorProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDonorProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DonorProfile model
   */
  readonly fields: DonorProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DonorProfile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DonorProfileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    donations<T extends DonorProfile$donationsArgs<ExtArgs> = {}>(args?: Subset<T, DonorProfile$donationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DonationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    addresses<T extends DonorProfile$addressesArgs<ExtArgs> = {}>(args?: Subset<T, DonorProfile$addressesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    auditLogs<T extends DonorProfile$auditLogsArgs<ExtArgs> = {}>(args?: Subset<T, DonorProfile$auditLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DonorProfile model
   */
  interface DonorProfileFieldRefs {
    readonly id: FieldRef<"DonorProfile", 'String'>
    readonly userId: FieldRef<"DonorProfile", 'String'>
    readonly pan: FieldRef<"DonorProfile", 'String'>
    readonly occupation: FieldRef<"DonorProfile", 'String'>
    readonly interests: FieldRef<"DonorProfile", 'String'>
  }
    

  // Custom InputTypes
  /**
   * DonorProfile findUnique
   */
  export type DonorProfileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DonorProfile
     */
    select?: DonorProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DonorProfile
     */
    omit?: DonorProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonorProfileInclude<ExtArgs> | null
    /**
     * Filter, which DonorProfile to fetch.
     */
    where: DonorProfileWhereUniqueInput
  }

  /**
   * DonorProfile findUniqueOrThrow
   */
  export type DonorProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DonorProfile
     */
    select?: DonorProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DonorProfile
     */
    omit?: DonorProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonorProfileInclude<ExtArgs> | null
    /**
     * Filter, which DonorProfile to fetch.
     */
    where: DonorProfileWhereUniqueInput
  }

  /**
   * DonorProfile findFirst
   */
  export type DonorProfileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DonorProfile
     */
    select?: DonorProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DonorProfile
     */
    omit?: DonorProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonorProfileInclude<ExtArgs> | null
    /**
     * Filter, which DonorProfile to fetch.
     */
    where?: DonorProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DonorProfiles to fetch.
     */
    orderBy?: DonorProfileOrderByWithRelationInput | DonorProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DonorProfiles.
     */
    cursor?: DonorProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DonorProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DonorProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DonorProfiles.
     */
    distinct?: DonorProfileScalarFieldEnum | DonorProfileScalarFieldEnum[]
  }

  /**
   * DonorProfile findFirstOrThrow
   */
  export type DonorProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DonorProfile
     */
    select?: DonorProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DonorProfile
     */
    omit?: DonorProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonorProfileInclude<ExtArgs> | null
    /**
     * Filter, which DonorProfile to fetch.
     */
    where?: DonorProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DonorProfiles to fetch.
     */
    orderBy?: DonorProfileOrderByWithRelationInput | DonorProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DonorProfiles.
     */
    cursor?: DonorProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DonorProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DonorProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DonorProfiles.
     */
    distinct?: DonorProfileScalarFieldEnum | DonorProfileScalarFieldEnum[]
  }

  /**
   * DonorProfile findMany
   */
  export type DonorProfileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DonorProfile
     */
    select?: DonorProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DonorProfile
     */
    omit?: DonorProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonorProfileInclude<ExtArgs> | null
    /**
     * Filter, which DonorProfiles to fetch.
     */
    where?: DonorProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DonorProfiles to fetch.
     */
    orderBy?: DonorProfileOrderByWithRelationInput | DonorProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DonorProfiles.
     */
    cursor?: DonorProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DonorProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DonorProfiles.
     */
    skip?: number
    distinct?: DonorProfileScalarFieldEnum | DonorProfileScalarFieldEnum[]
  }

  /**
   * DonorProfile create
   */
  export type DonorProfileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DonorProfile
     */
    select?: DonorProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DonorProfile
     */
    omit?: DonorProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonorProfileInclude<ExtArgs> | null
    /**
     * The data needed to create a DonorProfile.
     */
    data: XOR<DonorProfileCreateInput, DonorProfileUncheckedCreateInput>
  }

  /**
   * DonorProfile createMany
   */
  export type DonorProfileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DonorProfiles.
     */
    data: DonorProfileCreateManyInput | DonorProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DonorProfile createManyAndReturn
   */
  export type DonorProfileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DonorProfile
     */
    select?: DonorProfileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DonorProfile
     */
    omit?: DonorProfileOmit<ExtArgs> | null
    /**
     * The data used to create many DonorProfiles.
     */
    data: DonorProfileCreateManyInput | DonorProfileCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonorProfileIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * DonorProfile update
   */
  export type DonorProfileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DonorProfile
     */
    select?: DonorProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DonorProfile
     */
    omit?: DonorProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonorProfileInclude<ExtArgs> | null
    /**
     * The data needed to update a DonorProfile.
     */
    data: XOR<DonorProfileUpdateInput, DonorProfileUncheckedUpdateInput>
    /**
     * Choose, which DonorProfile to update.
     */
    where: DonorProfileWhereUniqueInput
  }

  /**
   * DonorProfile updateMany
   */
  export type DonorProfileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DonorProfiles.
     */
    data: XOR<DonorProfileUpdateManyMutationInput, DonorProfileUncheckedUpdateManyInput>
    /**
     * Filter which DonorProfiles to update
     */
    where?: DonorProfileWhereInput
    /**
     * Limit how many DonorProfiles to update.
     */
    limit?: number
  }

  /**
   * DonorProfile updateManyAndReturn
   */
  export type DonorProfileUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DonorProfile
     */
    select?: DonorProfileSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DonorProfile
     */
    omit?: DonorProfileOmit<ExtArgs> | null
    /**
     * The data used to update DonorProfiles.
     */
    data: XOR<DonorProfileUpdateManyMutationInput, DonorProfileUncheckedUpdateManyInput>
    /**
     * Filter which DonorProfiles to update
     */
    where?: DonorProfileWhereInput
    /**
     * Limit how many DonorProfiles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonorProfileIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * DonorProfile upsert
   */
  export type DonorProfileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DonorProfile
     */
    select?: DonorProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DonorProfile
     */
    omit?: DonorProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonorProfileInclude<ExtArgs> | null
    /**
     * The filter to search for the DonorProfile to update in case it exists.
     */
    where: DonorProfileWhereUniqueInput
    /**
     * In case the DonorProfile found by the `where` argument doesn't exist, create a new DonorProfile with this data.
     */
    create: XOR<DonorProfileCreateInput, DonorProfileUncheckedCreateInput>
    /**
     * In case the DonorProfile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DonorProfileUpdateInput, DonorProfileUncheckedUpdateInput>
  }

  /**
   * DonorProfile delete
   */
  export type DonorProfileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DonorProfile
     */
    select?: DonorProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DonorProfile
     */
    omit?: DonorProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonorProfileInclude<ExtArgs> | null
    /**
     * Filter which DonorProfile to delete.
     */
    where: DonorProfileWhereUniqueInput
  }

  /**
   * DonorProfile deleteMany
   */
  export type DonorProfileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DonorProfiles to delete
     */
    where?: DonorProfileWhereInput
    /**
     * Limit how many DonorProfiles to delete.
     */
    limit?: number
  }

  /**
   * DonorProfile.donations
   */
  export type DonorProfile$donationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Donation
     */
    select?: DonationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Donation
     */
    omit?: DonationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonationInclude<ExtArgs> | null
    where?: DonationWhereInput
    orderBy?: DonationOrderByWithRelationInput | DonationOrderByWithRelationInput[]
    cursor?: DonationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DonationScalarFieldEnum | DonationScalarFieldEnum[]
  }

  /**
   * DonorProfile.addresses
   */
  export type DonorProfile$addressesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    where?: AddressWhereInput
    orderBy?: AddressOrderByWithRelationInput | AddressOrderByWithRelationInput[]
    cursor?: AddressWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AddressScalarFieldEnum | AddressScalarFieldEnum[]
  }

  /**
   * DonorProfile.auditLogs
   */
  export type DonorProfile$auditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    cursor?: AuditLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * DonorProfile without action
   */
  export type DonorProfileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DonorProfile
     */
    select?: DonorProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DonorProfile
     */
    omit?: DonorProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonorProfileInclude<ExtArgs> | null
  }


  /**
   * Model Campaign
   */

  export type AggregateCampaign = {
    _count: CampaignCountAggregateOutputType | null
    _avg: CampaignAvgAggregateOutputType | null
    _sum: CampaignSumAggregateOutputType | null
    _min: CampaignMinAggregateOutputType | null
    _max: CampaignMaxAggregateOutputType | null
  }

  export type CampaignAvgAggregateOutputType = {
    goalAmount: number | null
    raisedAmount: number | null
  }

  export type CampaignSumAggregateOutputType = {
    goalAmount: number | null
    raisedAmount: number | null
  }

  export type CampaignMinAggregateOutputType = {
    id: string | null
    ngoId: string | null
    title: string | null
    description: string | null
    category: $Enums.CampaignCategory | null
    goalAmount: number | null
    raisedAmount: number | null
    startDate: Date | null
    endDate: Date | null
    status: string | null
  }

  export type CampaignMaxAggregateOutputType = {
    id: string | null
    ngoId: string | null
    title: string | null
    description: string | null
    category: $Enums.CampaignCategory | null
    goalAmount: number | null
    raisedAmount: number | null
    startDate: Date | null
    endDate: Date | null
    status: string | null
  }

  export type CampaignCountAggregateOutputType = {
    id: number
    ngoId: number
    title: number
    description: number
    category: number
    goalAmount: number
    raisedAmount: number
    startDate: number
    endDate: number
    status: number
    _all: number
  }


  export type CampaignAvgAggregateInputType = {
    goalAmount?: true
    raisedAmount?: true
  }

  export type CampaignSumAggregateInputType = {
    goalAmount?: true
    raisedAmount?: true
  }

  export type CampaignMinAggregateInputType = {
    id?: true
    ngoId?: true
    title?: true
    description?: true
    category?: true
    goalAmount?: true
    raisedAmount?: true
    startDate?: true
    endDate?: true
    status?: true
  }

  export type CampaignMaxAggregateInputType = {
    id?: true
    ngoId?: true
    title?: true
    description?: true
    category?: true
    goalAmount?: true
    raisedAmount?: true
    startDate?: true
    endDate?: true
    status?: true
  }

  export type CampaignCountAggregateInputType = {
    id?: true
    ngoId?: true
    title?: true
    description?: true
    category?: true
    goalAmount?: true
    raisedAmount?: true
    startDate?: true
    endDate?: true
    status?: true
    _all?: true
  }

  export type CampaignAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Campaign to aggregate.
     */
    where?: CampaignWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Campaigns to fetch.
     */
    orderBy?: CampaignOrderByWithRelationInput | CampaignOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CampaignWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Campaigns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Campaigns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Campaigns
    **/
    _count?: true | CampaignCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CampaignAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CampaignSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CampaignMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CampaignMaxAggregateInputType
  }

  export type GetCampaignAggregateType<T extends CampaignAggregateArgs> = {
        [P in keyof T & keyof AggregateCampaign]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCampaign[P]>
      : GetScalarType<T[P], AggregateCampaign[P]>
  }




  export type CampaignGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CampaignWhereInput
    orderBy?: CampaignOrderByWithAggregationInput | CampaignOrderByWithAggregationInput[]
    by: CampaignScalarFieldEnum[] | CampaignScalarFieldEnum
    having?: CampaignScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CampaignCountAggregateInputType | true
    _avg?: CampaignAvgAggregateInputType
    _sum?: CampaignSumAggregateInputType
    _min?: CampaignMinAggregateInputType
    _max?: CampaignMaxAggregateInputType
  }

  export type CampaignGroupByOutputType = {
    id: string
    ngoId: string
    title: string
    description: string
    category: $Enums.CampaignCategory
    goalAmount: number
    raisedAmount: number
    startDate: Date
    endDate: Date | null
    status: string
    _count: CampaignCountAggregateOutputType | null
    _avg: CampaignAvgAggregateOutputType | null
    _sum: CampaignSumAggregateOutputType | null
    _min: CampaignMinAggregateOutputType | null
    _max: CampaignMaxAggregateOutputType | null
  }

  type GetCampaignGroupByPayload<T extends CampaignGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CampaignGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CampaignGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CampaignGroupByOutputType[P]>
            : GetScalarType<T[P], CampaignGroupByOutputType[P]>
        }
      >
    >


  export type CampaignSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ngoId?: boolean
    title?: boolean
    description?: boolean
    category?: boolean
    goalAmount?: boolean
    raisedAmount?: boolean
    startDate?: boolean
    endDate?: boolean
    status?: boolean
    ngo?: boolean | NGOProfileDefaultArgs<ExtArgs>
    donations?: boolean | Campaign$donationsArgs<ExtArgs>
    documents?: boolean | Campaign$documentsArgs<ExtArgs>
    auditLogs?: boolean | Campaign$auditLogsArgs<ExtArgs>
    _count?: boolean | CampaignCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["campaign"]>

  export type CampaignSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ngoId?: boolean
    title?: boolean
    description?: boolean
    category?: boolean
    goalAmount?: boolean
    raisedAmount?: boolean
    startDate?: boolean
    endDate?: boolean
    status?: boolean
    ngo?: boolean | NGOProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["campaign"]>

  export type CampaignSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ngoId?: boolean
    title?: boolean
    description?: boolean
    category?: boolean
    goalAmount?: boolean
    raisedAmount?: boolean
    startDate?: boolean
    endDate?: boolean
    status?: boolean
    ngo?: boolean | NGOProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["campaign"]>

  export type CampaignSelectScalar = {
    id?: boolean
    ngoId?: boolean
    title?: boolean
    description?: boolean
    category?: boolean
    goalAmount?: boolean
    raisedAmount?: boolean
    startDate?: boolean
    endDate?: boolean
    status?: boolean
  }

  export type CampaignOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "ngoId" | "title" | "description" | "category" | "goalAmount" | "raisedAmount" | "startDate" | "endDate" | "status", ExtArgs["result"]["campaign"]>
  export type CampaignInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ngo?: boolean | NGOProfileDefaultArgs<ExtArgs>
    donations?: boolean | Campaign$donationsArgs<ExtArgs>
    documents?: boolean | Campaign$documentsArgs<ExtArgs>
    auditLogs?: boolean | Campaign$auditLogsArgs<ExtArgs>
    _count?: boolean | CampaignCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CampaignIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ngo?: boolean | NGOProfileDefaultArgs<ExtArgs>
  }
  export type CampaignIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ngo?: boolean | NGOProfileDefaultArgs<ExtArgs>
  }

  export type $CampaignPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Campaign"
    objects: {
      ngo: Prisma.$NGOProfilePayload<ExtArgs>
      donations: Prisma.$DonationPayload<ExtArgs>[]
      documents: Prisma.$DocumentPayload<ExtArgs>[]
      auditLogs: Prisma.$AuditLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      ngoId: string
      title: string
      description: string
      category: $Enums.CampaignCategory
      goalAmount: number
      raisedAmount: number
      startDate: Date
      endDate: Date | null
      status: string
    }, ExtArgs["result"]["campaign"]>
    composites: {}
  }

  type CampaignGetPayload<S extends boolean | null | undefined | CampaignDefaultArgs> = $Result.GetResult<Prisma.$CampaignPayload, S>

  type CampaignCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CampaignFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CampaignCountAggregateInputType | true
    }

  export interface CampaignDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Campaign'], meta: { name: 'Campaign' } }
    /**
     * Find zero or one Campaign that matches the filter.
     * @param {CampaignFindUniqueArgs} args - Arguments to find a Campaign
     * @example
     * // Get one Campaign
     * const campaign = await prisma.campaign.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CampaignFindUniqueArgs>(args: SelectSubset<T, CampaignFindUniqueArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Campaign that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CampaignFindUniqueOrThrowArgs} args - Arguments to find a Campaign
     * @example
     * // Get one Campaign
     * const campaign = await prisma.campaign.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CampaignFindUniqueOrThrowArgs>(args: SelectSubset<T, CampaignFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Campaign that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignFindFirstArgs} args - Arguments to find a Campaign
     * @example
     * // Get one Campaign
     * const campaign = await prisma.campaign.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CampaignFindFirstArgs>(args?: SelectSubset<T, CampaignFindFirstArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Campaign that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignFindFirstOrThrowArgs} args - Arguments to find a Campaign
     * @example
     * // Get one Campaign
     * const campaign = await prisma.campaign.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CampaignFindFirstOrThrowArgs>(args?: SelectSubset<T, CampaignFindFirstOrThrowArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Campaigns that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Campaigns
     * const campaigns = await prisma.campaign.findMany()
     * 
     * // Get first 10 Campaigns
     * const campaigns = await prisma.campaign.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const campaignWithIdOnly = await prisma.campaign.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CampaignFindManyArgs>(args?: SelectSubset<T, CampaignFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Campaign.
     * @param {CampaignCreateArgs} args - Arguments to create a Campaign.
     * @example
     * // Create one Campaign
     * const Campaign = await prisma.campaign.create({
     *   data: {
     *     // ... data to create a Campaign
     *   }
     * })
     * 
     */
    create<T extends CampaignCreateArgs>(args: SelectSubset<T, CampaignCreateArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Campaigns.
     * @param {CampaignCreateManyArgs} args - Arguments to create many Campaigns.
     * @example
     * // Create many Campaigns
     * const campaign = await prisma.campaign.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CampaignCreateManyArgs>(args?: SelectSubset<T, CampaignCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Campaigns and returns the data saved in the database.
     * @param {CampaignCreateManyAndReturnArgs} args - Arguments to create many Campaigns.
     * @example
     * // Create many Campaigns
     * const campaign = await prisma.campaign.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Campaigns and only return the `id`
     * const campaignWithIdOnly = await prisma.campaign.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CampaignCreateManyAndReturnArgs>(args?: SelectSubset<T, CampaignCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Campaign.
     * @param {CampaignDeleteArgs} args - Arguments to delete one Campaign.
     * @example
     * // Delete one Campaign
     * const Campaign = await prisma.campaign.delete({
     *   where: {
     *     // ... filter to delete one Campaign
     *   }
     * })
     * 
     */
    delete<T extends CampaignDeleteArgs>(args: SelectSubset<T, CampaignDeleteArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Campaign.
     * @param {CampaignUpdateArgs} args - Arguments to update one Campaign.
     * @example
     * // Update one Campaign
     * const campaign = await prisma.campaign.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CampaignUpdateArgs>(args: SelectSubset<T, CampaignUpdateArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Campaigns.
     * @param {CampaignDeleteManyArgs} args - Arguments to filter Campaigns to delete.
     * @example
     * // Delete a few Campaigns
     * const { count } = await prisma.campaign.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CampaignDeleteManyArgs>(args?: SelectSubset<T, CampaignDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Campaigns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Campaigns
     * const campaign = await prisma.campaign.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CampaignUpdateManyArgs>(args: SelectSubset<T, CampaignUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Campaigns and returns the data updated in the database.
     * @param {CampaignUpdateManyAndReturnArgs} args - Arguments to update many Campaigns.
     * @example
     * // Update many Campaigns
     * const campaign = await prisma.campaign.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Campaigns and only return the `id`
     * const campaignWithIdOnly = await prisma.campaign.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CampaignUpdateManyAndReturnArgs>(args: SelectSubset<T, CampaignUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Campaign.
     * @param {CampaignUpsertArgs} args - Arguments to update or create a Campaign.
     * @example
     * // Update or create a Campaign
     * const campaign = await prisma.campaign.upsert({
     *   create: {
     *     // ... data to create a Campaign
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Campaign we want to update
     *   }
     * })
     */
    upsert<T extends CampaignUpsertArgs>(args: SelectSubset<T, CampaignUpsertArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Campaigns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignCountArgs} args - Arguments to filter Campaigns to count.
     * @example
     * // Count the number of Campaigns
     * const count = await prisma.campaign.count({
     *   where: {
     *     // ... the filter for the Campaigns we want to count
     *   }
     * })
    **/
    count<T extends CampaignCountArgs>(
      args?: Subset<T, CampaignCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CampaignCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Campaign.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CampaignAggregateArgs>(args: Subset<T, CampaignAggregateArgs>): Prisma.PrismaPromise<GetCampaignAggregateType<T>>

    /**
     * Group by Campaign.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CampaignGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CampaignGroupByArgs['orderBy'] }
        : { orderBy?: CampaignGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CampaignGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCampaignGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Campaign model
   */
  readonly fields: CampaignFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Campaign.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CampaignClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    ngo<T extends NGOProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, NGOProfileDefaultArgs<ExtArgs>>): Prisma__NGOProfileClient<$Result.GetResult<Prisma.$NGOProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    donations<T extends Campaign$donationsArgs<ExtArgs> = {}>(args?: Subset<T, Campaign$donationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DonationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    documents<T extends Campaign$documentsArgs<ExtArgs> = {}>(args?: Subset<T, Campaign$documentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    auditLogs<T extends Campaign$auditLogsArgs<ExtArgs> = {}>(args?: Subset<T, Campaign$auditLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Campaign model
   */
  interface CampaignFieldRefs {
    readonly id: FieldRef<"Campaign", 'String'>
    readonly ngoId: FieldRef<"Campaign", 'String'>
    readonly title: FieldRef<"Campaign", 'String'>
    readonly description: FieldRef<"Campaign", 'String'>
    readonly category: FieldRef<"Campaign", 'CampaignCategory'>
    readonly goalAmount: FieldRef<"Campaign", 'Float'>
    readonly raisedAmount: FieldRef<"Campaign", 'Float'>
    readonly startDate: FieldRef<"Campaign", 'DateTime'>
    readonly endDate: FieldRef<"Campaign", 'DateTime'>
    readonly status: FieldRef<"Campaign", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Campaign findUnique
   */
  export type CampaignFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null
    /**
     * Filter, which Campaign to fetch.
     */
    where: CampaignWhereUniqueInput
  }

  /**
   * Campaign findUniqueOrThrow
   */
  export type CampaignFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null
    /**
     * Filter, which Campaign to fetch.
     */
    where: CampaignWhereUniqueInput
  }

  /**
   * Campaign findFirst
   */
  export type CampaignFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null
    /**
     * Filter, which Campaign to fetch.
     */
    where?: CampaignWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Campaigns to fetch.
     */
    orderBy?: CampaignOrderByWithRelationInput | CampaignOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Campaigns.
     */
    cursor?: CampaignWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Campaigns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Campaigns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Campaigns.
     */
    distinct?: CampaignScalarFieldEnum | CampaignScalarFieldEnum[]
  }

  /**
   * Campaign findFirstOrThrow
   */
  export type CampaignFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null
    /**
     * Filter, which Campaign to fetch.
     */
    where?: CampaignWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Campaigns to fetch.
     */
    orderBy?: CampaignOrderByWithRelationInput | CampaignOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Campaigns.
     */
    cursor?: CampaignWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Campaigns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Campaigns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Campaigns.
     */
    distinct?: CampaignScalarFieldEnum | CampaignScalarFieldEnum[]
  }

  /**
   * Campaign findMany
   */
  export type CampaignFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null
    /**
     * Filter, which Campaigns to fetch.
     */
    where?: CampaignWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Campaigns to fetch.
     */
    orderBy?: CampaignOrderByWithRelationInput | CampaignOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Campaigns.
     */
    cursor?: CampaignWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Campaigns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Campaigns.
     */
    skip?: number
    distinct?: CampaignScalarFieldEnum | CampaignScalarFieldEnum[]
  }

  /**
   * Campaign create
   */
  export type CampaignCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null
    /**
     * The data needed to create a Campaign.
     */
    data: XOR<CampaignCreateInput, CampaignUncheckedCreateInput>
  }

  /**
   * Campaign createMany
   */
  export type CampaignCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Campaigns.
     */
    data: CampaignCreateManyInput | CampaignCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Campaign createManyAndReturn
   */
  export type CampaignCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * The data used to create many Campaigns.
     */
    data: CampaignCreateManyInput | CampaignCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Campaign update
   */
  export type CampaignUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null
    /**
     * The data needed to update a Campaign.
     */
    data: XOR<CampaignUpdateInput, CampaignUncheckedUpdateInput>
    /**
     * Choose, which Campaign to update.
     */
    where: CampaignWhereUniqueInput
  }

  /**
   * Campaign updateMany
   */
  export type CampaignUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Campaigns.
     */
    data: XOR<CampaignUpdateManyMutationInput, CampaignUncheckedUpdateManyInput>
    /**
     * Filter which Campaigns to update
     */
    where?: CampaignWhereInput
    /**
     * Limit how many Campaigns to update.
     */
    limit?: number
  }

  /**
   * Campaign updateManyAndReturn
   */
  export type CampaignUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * The data used to update Campaigns.
     */
    data: XOR<CampaignUpdateManyMutationInput, CampaignUncheckedUpdateManyInput>
    /**
     * Filter which Campaigns to update
     */
    where?: CampaignWhereInput
    /**
     * Limit how many Campaigns to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Campaign upsert
   */
  export type CampaignUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null
    /**
     * The filter to search for the Campaign to update in case it exists.
     */
    where: CampaignWhereUniqueInput
    /**
     * In case the Campaign found by the `where` argument doesn't exist, create a new Campaign with this data.
     */
    create: XOR<CampaignCreateInput, CampaignUncheckedCreateInput>
    /**
     * In case the Campaign was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CampaignUpdateInput, CampaignUncheckedUpdateInput>
  }

  /**
   * Campaign delete
   */
  export type CampaignDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null
    /**
     * Filter which Campaign to delete.
     */
    where: CampaignWhereUniqueInput
  }

  /**
   * Campaign deleteMany
   */
  export type CampaignDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Campaigns to delete
     */
    where?: CampaignWhereInput
    /**
     * Limit how many Campaigns to delete.
     */
    limit?: number
  }

  /**
   * Campaign.donations
   */
  export type Campaign$donationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Donation
     */
    select?: DonationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Donation
     */
    omit?: DonationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonationInclude<ExtArgs> | null
    where?: DonationWhereInput
    orderBy?: DonationOrderByWithRelationInput | DonationOrderByWithRelationInput[]
    cursor?: DonationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DonationScalarFieldEnum | DonationScalarFieldEnum[]
  }

  /**
   * Campaign.documents
   */
  export type Campaign$documentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    where?: DocumentWhereInput
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    cursor?: DocumentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * Campaign.auditLogs
   */
  export type Campaign$auditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    cursor?: AuditLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * Campaign without action
   */
  export type CampaignDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null
  }


  /**
   * Model Donation
   */

  export type AggregateDonation = {
    _count: DonationCountAggregateOutputType | null
    _avg: DonationAvgAggregateOutputType | null
    _sum: DonationSumAggregateOutputType | null
    _min: DonationMinAggregateOutputType | null
    _max: DonationMaxAggregateOutputType | null
  }

  export type DonationAvgAggregateOutputType = {
    amount: number | null
  }

  export type DonationSumAggregateOutputType = {
    amount: number | null
  }

  export type DonationMinAggregateOutputType = {
    id: string | null
    donorId: string | null
    companyId: string | null
    campaignId: string | null
    amount: number | null
    donationDate: Date | null
    paymentRef: string | null
    paymentMode: string | null
  }

  export type DonationMaxAggregateOutputType = {
    id: string | null
    donorId: string | null
    companyId: string | null
    campaignId: string | null
    amount: number | null
    donationDate: Date | null
    paymentRef: string | null
    paymentMode: string | null
  }

  export type DonationCountAggregateOutputType = {
    id: number
    donorId: number
    companyId: number
    campaignId: number
    amount: number
    donationDate: number
    paymentRef: number
    paymentMode: number
    _all: number
  }


  export type DonationAvgAggregateInputType = {
    amount?: true
  }

  export type DonationSumAggregateInputType = {
    amount?: true
  }

  export type DonationMinAggregateInputType = {
    id?: true
    donorId?: true
    companyId?: true
    campaignId?: true
    amount?: true
    donationDate?: true
    paymentRef?: true
    paymentMode?: true
  }

  export type DonationMaxAggregateInputType = {
    id?: true
    donorId?: true
    companyId?: true
    campaignId?: true
    amount?: true
    donationDate?: true
    paymentRef?: true
    paymentMode?: true
  }

  export type DonationCountAggregateInputType = {
    id?: true
    donorId?: true
    companyId?: true
    campaignId?: true
    amount?: true
    donationDate?: true
    paymentRef?: true
    paymentMode?: true
    _all?: true
  }

  export type DonationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Donation to aggregate.
     */
    where?: DonationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Donations to fetch.
     */
    orderBy?: DonationOrderByWithRelationInput | DonationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DonationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Donations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Donations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Donations
    **/
    _count?: true | DonationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DonationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DonationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DonationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DonationMaxAggregateInputType
  }

  export type GetDonationAggregateType<T extends DonationAggregateArgs> = {
        [P in keyof T & keyof AggregateDonation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDonation[P]>
      : GetScalarType<T[P], AggregateDonation[P]>
  }




  export type DonationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DonationWhereInput
    orderBy?: DonationOrderByWithAggregationInput | DonationOrderByWithAggregationInput[]
    by: DonationScalarFieldEnum[] | DonationScalarFieldEnum
    having?: DonationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DonationCountAggregateInputType | true
    _avg?: DonationAvgAggregateInputType
    _sum?: DonationSumAggregateInputType
    _min?: DonationMinAggregateInputType
    _max?: DonationMaxAggregateInputType
  }

  export type DonationGroupByOutputType = {
    id: string
    donorId: string | null
    companyId: string | null
    campaignId: string
    amount: number
    donationDate: Date
    paymentRef: string | null
    paymentMode: string | null
    _count: DonationCountAggregateOutputType | null
    _avg: DonationAvgAggregateOutputType | null
    _sum: DonationSumAggregateOutputType | null
    _min: DonationMinAggregateOutputType | null
    _max: DonationMaxAggregateOutputType | null
  }

  type GetDonationGroupByPayload<T extends DonationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DonationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DonationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DonationGroupByOutputType[P]>
            : GetScalarType<T[P], DonationGroupByOutputType[P]>
        }
      >
    >


  export type DonationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    donorId?: boolean
    companyId?: boolean
    campaignId?: boolean
    amount?: boolean
    donationDate?: boolean
    paymentRef?: boolean
    paymentMode?: boolean
    donor?: boolean | Donation$donorArgs<ExtArgs>
    company?: boolean | Donation$companyArgs<ExtArgs>
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>
    auditLogs?: boolean | Donation$auditLogsArgs<ExtArgs>
    _count?: boolean | DonationCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["donation"]>

  export type DonationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    donorId?: boolean
    companyId?: boolean
    campaignId?: boolean
    amount?: boolean
    donationDate?: boolean
    paymentRef?: boolean
    paymentMode?: boolean
    donor?: boolean | Donation$donorArgs<ExtArgs>
    company?: boolean | Donation$companyArgs<ExtArgs>
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["donation"]>

  export type DonationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    donorId?: boolean
    companyId?: boolean
    campaignId?: boolean
    amount?: boolean
    donationDate?: boolean
    paymentRef?: boolean
    paymentMode?: boolean
    donor?: boolean | Donation$donorArgs<ExtArgs>
    company?: boolean | Donation$companyArgs<ExtArgs>
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["donation"]>

  export type DonationSelectScalar = {
    id?: boolean
    donorId?: boolean
    companyId?: boolean
    campaignId?: boolean
    amount?: boolean
    donationDate?: boolean
    paymentRef?: boolean
    paymentMode?: boolean
  }

  export type DonationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "donorId" | "companyId" | "campaignId" | "amount" | "donationDate" | "paymentRef" | "paymentMode", ExtArgs["result"]["donation"]>
  export type DonationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    donor?: boolean | Donation$donorArgs<ExtArgs>
    company?: boolean | Donation$companyArgs<ExtArgs>
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>
    auditLogs?: boolean | Donation$auditLogsArgs<ExtArgs>
    _count?: boolean | DonationCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DonationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    donor?: boolean | Donation$donorArgs<ExtArgs>
    company?: boolean | Donation$companyArgs<ExtArgs>
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>
  }
  export type DonationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    donor?: boolean | Donation$donorArgs<ExtArgs>
    company?: boolean | Donation$companyArgs<ExtArgs>
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>
  }

  export type $DonationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Donation"
    objects: {
      donor: Prisma.$DonorProfilePayload<ExtArgs> | null
      company: Prisma.$CompanyProfilePayload<ExtArgs> | null
      campaign: Prisma.$CampaignPayload<ExtArgs>
      auditLogs: Prisma.$AuditLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      donorId: string | null
      companyId: string | null
      campaignId: string
      amount: number
      donationDate: Date
      paymentRef: string | null
      paymentMode: string | null
    }, ExtArgs["result"]["donation"]>
    composites: {}
  }

  type DonationGetPayload<S extends boolean | null | undefined | DonationDefaultArgs> = $Result.GetResult<Prisma.$DonationPayload, S>

  type DonationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DonationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DonationCountAggregateInputType | true
    }

  export interface DonationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Donation'], meta: { name: 'Donation' } }
    /**
     * Find zero or one Donation that matches the filter.
     * @param {DonationFindUniqueArgs} args - Arguments to find a Donation
     * @example
     * // Get one Donation
     * const donation = await prisma.donation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DonationFindUniqueArgs>(args: SelectSubset<T, DonationFindUniqueArgs<ExtArgs>>): Prisma__DonationClient<$Result.GetResult<Prisma.$DonationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Donation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DonationFindUniqueOrThrowArgs} args - Arguments to find a Donation
     * @example
     * // Get one Donation
     * const donation = await prisma.donation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DonationFindUniqueOrThrowArgs>(args: SelectSubset<T, DonationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DonationClient<$Result.GetResult<Prisma.$DonationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Donation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DonationFindFirstArgs} args - Arguments to find a Donation
     * @example
     * // Get one Donation
     * const donation = await prisma.donation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DonationFindFirstArgs>(args?: SelectSubset<T, DonationFindFirstArgs<ExtArgs>>): Prisma__DonationClient<$Result.GetResult<Prisma.$DonationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Donation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DonationFindFirstOrThrowArgs} args - Arguments to find a Donation
     * @example
     * // Get one Donation
     * const donation = await prisma.donation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DonationFindFirstOrThrowArgs>(args?: SelectSubset<T, DonationFindFirstOrThrowArgs<ExtArgs>>): Prisma__DonationClient<$Result.GetResult<Prisma.$DonationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Donations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DonationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Donations
     * const donations = await prisma.donation.findMany()
     * 
     * // Get first 10 Donations
     * const donations = await prisma.donation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const donationWithIdOnly = await prisma.donation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DonationFindManyArgs>(args?: SelectSubset<T, DonationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DonationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Donation.
     * @param {DonationCreateArgs} args - Arguments to create a Donation.
     * @example
     * // Create one Donation
     * const Donation = await prisma.donation.create({
     *   data: {
     *     // ... data to create a Donation
     *   }
     * })
     * 
     */
    create<T extends DonationCreateArgs>(args: SelectSubset<T, DonationCreateArgs<ExtArgs>>): Prisma__DonationClient<$Result.GetResult<Prisma.$DonationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Donations.
     * @param {DonationCreateManyArgs} args - Arguments to create many Donations.
     * @example
     * // Create many Donations
     * const donation = await prisma.donation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DonationCreateManyArgs>(args?: SelectSubset<T, DonationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Donations and returns the data saved in the database.
     * @param {DonationCreateManyAndReturnArgs} args - Arguments to create many Donations.
     * @example
     * // Create many Donations
     * const donation = await prisma.donation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Donations and only return the `id`
     * const donationWithIdOnly = await prisma.donation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DonationCreateManyAndReturnArgs>(args?: SelectSubset<T, DonationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DonationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Donation.
     * @param {DonationDeleteArgs} args - Arguments to delete one Donation.
     * @example
     * // Delete one Donation
     * const Donation = await prisma.donation.delete({
     *   where: {
     *     // ... filter to delete one Donation
     *   }
     * })
     * 
     */
    delete<T extends DonationDeleteArgs>(args: SelectSubset<T, DonationDeleteArgs<ExtArgs>>): Prisma__DonationClient<$Result.GetResult<Prisma.$DonationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Donation.
     * @param {DonationUpdateArgs} args - Arguments to update one Donation.
     * @example
     * // Update one Donation
     * const donation = await prisma.donation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DonationUpdateArgs>(args: SelectSubset<T, DonationUpdateArgs<ExtArgs>>): Prisma__DonationClient<$Result.GetResult<Prisma.$DonationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Donations.
     * @param {DonationDeleteManyArgs} args - Arguments to filter Donations to delete.
     * @example
     * // Delete a few Donations
     * const { count } = await prisma.donation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DonationDeleteManyArgs>(args?: SelectSubset<T, DonationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Donations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DonationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Donations
     * const donation = await prisma.donation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DonationUpdateManyArgs>(args: SelectSubset<T, DonationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Donations and returns the data updated in the database.
     * @param {DonationUpdateManyAndReturnArgs} args - Arguments to update many Donations.
     * @example
     * // Update many Donations
     * const donation = await prisma.donation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Donations and only return the `id`
     * const donationWithIdOnly = await prisma.donation.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DonationUpdateManyAndReturnArgs>(args: SelectSubset<T, DonationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DonationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Donation.
     * @param {DonationUpsertArgs} args - Arguments to update or create a Donation.
     * @example
     * // Update or create a Donation
     * const donation = await prisma.donation.upsert({
     *   create: {
     *     // ... data to create a Donation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Donation we want to update
     *   }
     * })
     */
    upsert<T extends DonationUpsertArgs>(args: SelectSubset<T, DonationUpsertArgs<ExtArgs>>): Prisma__DonationClient<$Result.GetResult<Prisma.$DonationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Donations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DonationCountArgs} args - Arguments to filter Donations to count.
     * @example
     * // Count the number of Donations
     * const count = await prisma.donation.count({
     *   where: {
     *     // ... the filter for the Donations we want to count
     *   }
     * })
    **/
    count<T extends DonationCountArgs>(
      args?: Subset<T, DonationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DonationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Donation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DonationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DonationAggregateArgs>(args: Subset<T, DonationAggregateArgs>): Prisma.PrismaPromise<GetDonationAggregateType<T>>

    /**
     * Group by Donation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DonationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DonationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DonationGroupByArgs['orderBy'] }
        : { orderBy?: DonationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DonationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDonationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Donation model
   */
  readonly fields: DonationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Donation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DonationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    donor<T extends Donation$donorArgs<ExtArgs> = {}>(args?: Subset<T, Donation$donorArgs<ExtArgs>>): Prisma__DonorProfileClient<$Result.GetResult<Prisma.$DonorProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    company<T extends Donation$companyArgs<ExtArgs> = {}>(args?: Subset<T, Donation$companyArgs<ExtArgs>>): Prisma__CompanyProfileClient<$Result.GetResult<Prisma.$CompanyProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    campaign<T extends CampaignDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CampaignDefaultArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    auditLogs<T extends Donation$auditLogsArgs<ExtArgs> = {}>(args?: Subset<T, Donation$auditLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Donation model
   */
  interface DonationFieldRefs {
    readonly id: FieldRef<"Donation", 'String'>
    readonly donorId: FieldRef<"Donation", 'String'>
    readonly companyId: FieldRef<"Donation", 'String'>
    readonly campaignId: FieldRef<"Donation", 'String'>
    readonly amount: FieldRef<"Donation", 'Float'>
    readonly donationDate: FieldRef<"Donation", 'DateTime'>
    readonly paymentRef: FieldRef<"Donation", 'String'>
    readonly paymentMode: FieldRef<"Donation", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Donation findUnique
   */
  export type DonationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Donation
     */
    select?: DonationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Donation
     */
    omit?: DonationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonationInclude<ExtArgs> | null
    /**
     * Filter, which Donation to fetch.
     */
    where: DonationWhereUniqueInput
  }

  /**
   * Donation findUniqueOrThrow
   */
  export type DonationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Donation
     */
    select?: DonationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Donation
     */
    omit?: DonationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonationInclude<ExtArgs> | null
    /**
     * Filter, which Donation to fetch.
     */
    where: DonationWhereUniqueInput
  }

  /**
   * Donation findFirst
   */
  export type DonationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Donation
     */
    select?: DonationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Donation
     */
    omit?: DonationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonationInclude<ExtArgs> | null
    /**
     * Filter, which Donation to fetch.
     */
    where?: DonationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Donations to fetch.
     */
    orderBy?: DonationOrderByWithRelationInput | DonationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Donations.
     */
    cursor?: DonationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Donations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Donations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Donations.
     */
    distinct?: DonationScalarFieldEnum | DonationScalarFieldEnum[]
  }

  /**
   * Donation findFirstOrThrow
   */
  export type DonationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Donation
     */
    select?: DonationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Donation
     */
    omit?: DonationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonationInclude<ExtArgs> | null
    /**
     * Filter, which Donation to fetch.
     */
    where?: DonationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Donations to fetch.
     */
    orderBy?: DonationOrderByWithRelationInput | DonationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Donations.
     */
    cursor?: DonationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Donations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Donations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Donations.
     */
    distinct?: DonationScalarFieldEnum | DonationScalarFieldEnum[]
  }

  /**
   * Donation findMany
   */
  export type DonationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Donation
     */
    select?: DonationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Donation
     */
    omit?: DonationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonationInclude<ExtArgs> | null
    /**
     * Filter, which Donations to fetch.
     */
    where?: DonationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Donations to fetch.
     */
    orderBy?: DonationOrderByWithRelationInput | DonationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Donations.
     */
    cursor?: DonationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Donations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Donations.
     */
    skip?: number
    distinct?: DonationScalarFieldEnum | DonationScalarFieldEnum[]
  }

  /**
   * Donation create
   */
  export type DonationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Donation
     */
    select?: DonationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Donation
     */
    omit?: DonationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonationInclude<ExtArgs> | null
    /**
     * The data needed to create a Donation.
     */
    data: XOR<DonationCreateInput, DonationUncheckedCreateInput>
  }

  /**
   * Donation createMany
   */
  export type DonationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Donations.
     */
    data: DonationCreateManyInput | DonationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Donation createManyAndReturn
   */
  export type DonationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Donation
     */
    select?: DonationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Donation
     */
    omit?: DonationOmit<ExtArgs> | null
    /**
     * The data used to create many Donations.
     */
    data: DonationCreateManyInput | DonationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Donation update
   */
  export type DonationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Donation
     */
    select?: DonationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Donation
     */
    omit?: DonationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonationInclude<ExtArgs> | null
    /**
     * The data needed to update a Donation.
     */
    data: XOR<DonationUpdateInput, DonationUncheckedUpdateInput>
    /**
     * Choose, which Donation to update.
     */
    where: DonationWhereUniqueInput
  }

  /**
   * Donation updateMany
   */
  export type DonationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Donations.
     */
    data: XOR<DonationUpdateManyMutationInput, DonationUncheckedUpdateManyInput>
    /**
     * Filter which Donations to update
     */
    where?: DonationWhereInput
    /**
     * Limit how many Donations to update.
     */
    limit?: number
  }

  /**
   * Donation updateManyAndReturn
   */
  export type DonationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Donation
     */
    select?: DonationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Donation
     */
    omit?: DonationOmit<ExtArgs> | null
    /**
     * The data used to update Donations.
     */
    data: XOR<DonationUpdateManyMutationInput, DonationUncheckedUpdateManyInput>
    /**
     * Filter which Donations to update
     */
    where?: DonationWhereInput
    /**
     * Limit how many Donations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Donation upsert
   */
  export type DonationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Donation
     */
    select?: DonationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Donation
     */
    omit?: DonationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonationInclude<ExtArgs> | null
    /**
     * The filter to search for the Donation to update in case it exists.
     */
    where: DonationWhereUniqueInput
    /**
     * In case the Donation found by the `where` argument doesn't exist, create a new Donation with this data.
     */
    create: XOR<DonationCreateInput, DonationUncheckedCreateInput>
    /**
     * In case the Donation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DonationUpdateInput, DonationUncheckedUpdateInput>
  }

  /**
   * Donation delete
   */
  export type DonationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Donation
     */
    select?: DonationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Donation
     */
    omit?: DonationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonationInclude<ExtArgs> | null
    /**
     * Filter which Donation to delete.
     */
    where: DonationWhereUniqueInput
  }

  /**
   * Donation deleteMany
   */
  export type DonationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Donations to delete
     */
    where?: DonationWhereInput
    /**
     * Limit how many Donations to delete.
     */
    limit?: number
  }

  /**
   * Donation.donor
   */
  export type Donation$donorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DonorProfile
     */
    select?: DonorProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DonorProfile
     */
    omit?: DonorProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonorProfileInclude<ExtArgs> | null
    where?: DonorProfileWhereInput
  }

  /**
   * Donation.company
   */
  export type Donation$companyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyProfile
     */
    select?: CompanyProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyProfile
     */
    omit?: CompanyProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyProfileInclude<ExtArgs> | null
    where?: CompanyProfileWhereInput
  }

  /**
   * Donation.auditLogs
   */
  export type Donation$auditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    cursor?: AuditLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * Donation without action
   */
  export type DonationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Donation
     */
    select?: DonationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Donation
     */
    omit?: DonationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonationInclude<ExtArgs> | null
  }


  /**
   * Model BankDetail
   */

  export type AggregateBankDetail = {
    _count: BankDetailCountAggregateOutputType | null
    _min: BankDetailMinAggregateOutputType | null
    _max: BankDetailMaxAggregateOutputType | null
  }

  export type BankDetailMinAggregateOutputType = {
    id: string | null
    ngoId: string | null
    companyId: string | null
    accountHolder: string | null
    bankName: string | null
    accountNumber: string | null
    ifsc: string | null
    branch: string | null
  }

  export type BankDetailMaxAggregateOutputType = {
    id: string | null
    ngoId: string | null
    companyId: string | null
    accountHolder: string | null
    bankName: string | null
    accountNumber: string | null
    ifsc: string | null
    branch: string | null
  }

  export type BankDetailCountAggregateOutputType = {
    id: number
    ngoId: number
    companyId: number
    accountHolder: number
    bankName: number
    accountNumber: number
    ifsc: number
    branch: number
    _all: number
  }


  export type BankDetailMinAggregateInputType = {
    id?: true
    ngoId?: true
    companyId?: true
    accountHolder?: true
    bankName?: true
    accountNumber?: true
    ifsc?: true
    branch?: true
  }

  export type BankDetailMaxAggregateInputType = {
    id?: true
    ngoId?: true
    companyId?: true
    accountHolder?: true
    bankName?: true
    accountNumber?: true
    ifsc?: true
    branch?: true
  }

  export type BankDetailCountAggregateInputType = {
    id?: true
    ngoId?: true
    companyId?: true
    accountHolder?: true
    bankName?: true
    accountNumber?: true
    ifsc?: true
    branch?: true
    _all?: true
  }

  export type BankDetailAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BankDetail to aggregate.
     */
    where?: BankDetailWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BankDetails to fetch.
     */
    orderBy?: BankDetailOrderByWithRelationInput | BankDetailOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BankDetailWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BankDetails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BankDetails.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BankDetails
    **/
    _count?: true | BankDetailCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BankDetailMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BankDetailMaxAggregateInputType
  }

  export type GetBankDetailAggregateType<T extends BankDetailAggregateArgs> = {
        [P in keyof T & keyof AggregateBankDetail]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBankDetail[P]>
      : GetScalarType<T[P], AggregateBankDetail[P]>
  }




  export type BankDetailGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BankDetailWhereInput
    orderBy?: BankDetailOrderByWithAggregationInput | BankDetailOrderByWithAggregationInput[]
    by: BankDetailScalarFieldEnum[] | BankDetailScalarFieldEnum
    having?: BankDetailScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BankDetailCountAggregateInputType | true
    _min?: BankDetailMinAggregateInputType
    _max?: BankDetailMaxAggregateInputType
  }

  export type BankDetailGroupByOutputType = {
    id: string
    ngoId: string | null
    companyId: string | null
    accountHolder: string
    bankName: string
    accountNumber: string
    ifsc: string
    branch: string | null
    _count: BankDetailCountAggregateOutputType | null
    _min: BankDetailMinAggregateOutputType | null
    _max: BankDetailMaxAggregateOutputType | null
  }

  type GetBankDetailGroupByPayload<T extends BankDetailGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BankDetailGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BankDetailGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BankDetailGroupByOutputType[P]>
            : GetScalarType<T[P], BankDetailGroupByOutputType[P]>
        }
      >
    >


  export type BankDetailSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ngoId?: boolean
    companyId?: boolean
    accountHolder?: boolean
    bankName?: boolean
    accountNumber?: boolean
    ifsc?: boolean
    branch?: boolean
    ngo?: boolean | BankDetail$ngoArgs<ExtArgs>
    company?: boolean | BankDetail$companyArgs<ExtArgs>
  }, ExtArgs["result"]["bankDetail"]>

  export type BankDetailSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ngoId?: boolean
    companyId?: boolean
    accountHolder?: boolean
    bankName?: boolean
    accountNumber?: boolean
    ifsc?: boolean
    branch?: boolean
    ngo?: boolean | BankDetail$ngoArgs<ExtArgs>
    company?: boolean | BankDetail$companyArgs<ExtArgs>
  }, ExtArgs["result"]["bankDetail"]>

  export type BankDetailSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ngoId?: boolean
    companyId?: boolean
    accountHolder?: boolean
    bankName?: boolean
    accountNumber?: boolean
    ifsc?: boolean
    branch?: boolean
    ngo?: boolean | BankDetail$ngoArgs<ExtArgs>
    company?: boolean | BankDetail$companyArgs<ExtArgs>
  }, ExtArgs["result"]["bankDetail"]>

  export type BankDetailSelectScalar = {
    id?: boolean
    ngoId?: boolean
    companyId?: boolean
    accountHolder?: boolean
    bankName?: boolean
    accountNumber?: boolean
    ifsc?: boolean
    branch?: boolean
  }

  export type BankDetailOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "ngoId" | "companyId" | "accountHolder" | "bankName" | "accountNumber" | "ifsc" | "branch", ExtArgs["result"]["bankDetail"]>
  export type BankDetailInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ngo?: boolean | BankDetail$ngoArgs<ExtArgs>
    company?: boolean | BankDetail$companyArgs<ExtArgs>
  }
  export type BankDetailIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ngo?: boolean | BankDetail$ngoArgs<ExtArgs>
    company?: boolean | BankDetail$companyArgs<ExtArgs>
  }
  export type BankDetailIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ngo?: boolean | BankDetail$ngoArgs<ExtArgs>
    company?: boolean | BankDetail$companyArgs<ExtArgs>
  }

  export type $BankDetailPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BankDetail"
    objects: {
      ngo: Prisma.$NGOProfilePayload<ExtArgs> | null
      company: Prisma.$CompanyProfilePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      ngoId: string | null
      companyId: string | null
      accountHolder: string
      bankName: string
      accountNumber: string
      ifsc: string
      branch: string | null
    }, ExtArgs["result"]["bankDetail"]>
    composites: {}
  }

  type BankDetailGetPayload<S extends boolean | null | undefined | BankDetailDefaultArgs> = $Result.GetResult<Prisma.$BankDetailPayload, S>

  type BankDetailCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BankDetailFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BankDetailCountAggregateInputType | true
    }

  export interface BankDetailDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BankDetail'], meta: { name: 'BankDetail' } }
    /**
     * Find zero or one BankDetail that matches the filter.
     * @param {BankDetailFindUniqueArgs} args - Arguments to find a BankDetail
     * @example
     * // Get one BankDetail
     * const bankDetail = await prisma.bankDetail.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BankDetailFindUniqueArgs>(args: SelectSubset<T, BankDetailFindUniqueArgs<ExtArgs>>): Prisma__BankDetailClient<$Result.GetResult<Prisma.$BankDetailPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BankDetail that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BankDetailFindUniqueOrThrowArgs} args - Arguments to find a BankDetail
     * @example
     * // Get one BankDetail
     * const bankDetail = await prisma.bankDetail.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BankDetailFindUniqueOrThrowArgs>(args: SelectSubset<T, BankDetailFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BankDetailClient<$Result.GetResult<Prisma.$BankDetailPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BankDetail that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BankDetailFindFirstArgs} args - Arguments to find a BankDetail
     * @example
     * // Get one BankDetail
     * const bankDetail = await prisma.bankDetail.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BankDetailFindFirstArgs>(args?: SelectSubset<T, BankDetailFindFirstArgs<ExtArgs>>): Prisma__BankDetailClient<$Result.GetResult<Prisma.$BankDetailPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BankDetail that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BankDetailFindFirstOrThrowArgs} args - Arguments to find a BankDetail
     * @example
     * // Get one BankDetail
     * const bankDetail = await prisma.bankDetail.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BankDetailFindFirstOrThrowArgs>(args?: SelectSubset<T, BankDetailFindFirstOrThrowArgs<ExtArgs>>): Prisma__BankDetailClient<$Result.GetResult<Prisma.$BankDetailPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BankDetails that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BankDetailFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BankDetails
     * const bankDetails = await prisma.bankDetail.findMany()
     * 
     * // Get first 10 BankDetails
     * const bankDetails = await prisma.bankDetail.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const bankDetailWithIdOnly = await prisma.bankDetail.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BankDetailFindManyArgs>(args?: SelectSubset<T, BankDetailFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BankDetailPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BankDetail.
     * @param {BankDetailCreateArgs} args - Arguments to create a BankDetail.
     * @example
     * // Create one BankDetail
     * const BankDetail = await prisma.bankDetail.create({
     *   data: {
     *     // ... data to create a BankDetail
     *   }
     * })
     * 
     */
    create<T extends BankDetailCreateArgs>(args: SelectSubset<T, BankDetailCreateArgs<ExtArgs>>): Prisma__BankDetailClient<$Result.GetResult<Prisma.$BankDetailPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BankDetails.
     * @param {BankDetailCreateManyArgs} args - Arguments to create many BankDetails.
     * @example
     * // Create many BankDetails
     * const bankDetail = await prisma.bankDetail.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BankDetailCreateManyArgs>(args?: SelectSubset<T, BankDetailCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BankDetails and returns the data saved in the database.
     * @param {BankDetailCreateManyAndReturnArgs} args - Arguments to create many BankDetails.
     * @example
     * // Create many BankDetails
     * const bankDetail = await prisma.bankDetail.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BankDetails and only return the `id`
     * const bankDetailWithIdOnly = await prisma.bankDetail.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BankDetailCreateManyAndReturnArgs>(args?: SelectSubset<T, BankDetailCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BankDetailPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a BankDetail.
     * @param {BankDetailDeleteArgs} args - Arguments to delete one BankDetail.
     * @example
     * // Delete one BankDetail
     * const BankDetail = await prisma.bankDetail.delete({
     *   where: {
     *     // ... filter to delete one BankDetail
     *   }
     * })
     * 
     */
    delete<T extends BankDetailDeleteArgs>(args: SelectSubset<T, BankDetailDeleteArgs<ExtArgs>>): Prisma__BankDetailClient<$Result.GetResult<Prisma.$BankDetailPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BankDetail.
     * @param {BankDetailUpdateArgs} args - Arguments to update one BankDetail.
     * @example
     * // Update one BankDetail
     * const bankDetail = await prisma.bankDetail.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BankDetailUpdateArgs>(args: SelectSubset<T, BankDetailUpdateArgs<ExtArgs>>): Prisma__BankDetailClient<$Result.GetResult<Prisma.$BankDetailPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BankDetails.
     * @param {BankDetailDeleteManyArgs} args - Arguments to filter BankDetails to delete.
     * @example
     * // Delete a few BankDetails
     * const { count } = await prisma.bankDetail.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BankDetailDeleteManyArgs>(args?: SelectSubset<T, BankDetailDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BankDetails.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BankDetailUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BankDetails
     * const bankDetail = await prisma.bankDetail.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BankDetailUpdateManyArgs>(args: SelectSubset<T, BankDetailUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BankDetails and returns the data updated in the database.
     * @param {BankDetailUpdateManyAndReturnArgs} args - Arguments to update many BankDetails.
     * @example
     * // Update many BankDetails
     * const bankDetail = await prisma.bankDetail.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more BankDetails and only return the `id`
     * const bankDetailWithIdOnly = await prisma.bankDetail.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BankDetailUpdateManyAndReturnArgs>(args: SelectSubset<T, BankDetailUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BankDetailPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one BankDetail.
     * @param {BankDetailUpsertArgs} args - Arguments to update or create a BankDetail.
     * @example
     * // Update or create a BankDetail
     * const bankDetail = await prisma.bankDetail.upsert({
     *   create: {
     *     // ... data to create a BankDetail
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BankDetail we want to update
     *   }
     * })
     */
    upsert<T extends BankDetailUpsertArgs>(args: SelectSubset<T, BankDetailUpsertArgs<ExtArgs>>): Prisma__BankDetailClient<$Result.GetResult<Prisma.$BankDetailPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BankDetails.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BankDetailCountArgs} args - Arguments to filter BankDetails to count.
     * @example
     * // Count the number of BankDetails
     * const count = await prisma.bankDetail.count({
     *   where: {
     *     // ... the filter for the BankDetails we want to count
     *   }
     * })
    **/
    count<T extends BankDetailCountArgs>(
      args?: Subset<T, BankDetailCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BankDetailCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BankDetail.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BankDetailAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BankDetailAggregateArgs>(args: Subset<T, BankDetailAggregateArgs>): Prisma.PrismaPromise<GetBankDetailAggregateType<T>>

    /**
     * Group by BankDetail.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BankDetailGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BankDetailGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BankDetailGroupByArgs['orderBy'] }
        : { orderBy?: BankDetailGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BankDetailGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBankDetailGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BankDetail model
   */
  readonly fields: BankDetailFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BankDetail.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BankDetailClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    ngo<T extends BankDetail$ngoArgs<ExtArgs> = {}>(args?: Subset<T, BankDetail$ngoArgs<ExtArgs>>): Prisma__NGOProfileClient<$Result.GetResult<Prisma.$NGOProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    company<T extends BankDetail$companyArgs<ExtArgs> = {}>(args?: Subset<T, BankDetail$companyArgs<ExtArgs>>): Prisma__CompanyProfileClient<$Result.GetResult<Prisma.$CompanyProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the BankDetail model
   */
  interface BankDetailFieldRefs {
    readonly id: FieldRef<"BankDetail", 'String'>
    readonly ngoId: FieldRef<"BankDetail", 'String'>
    readonly companyId: FieldRef<"BankDetail", 'String'>
    readonly accountHolder: FieldRef<"BankDetail", 'String'>
    readonly bankName: FieldRef<"BankDetail", 'String'>
    readonly accountNumber: FieldRef<"BankDetail", 'String'>
    readonly ifsc: FieldRef<"BankDetail", 'String'>
    readonly branch: FieldRef<"BankDetail", 'String'>
  }
    

  // Custom InputTypes
  /**
   * BankDetail findUnique
   */
  export type BankDetailFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BankDetail
     */
    select?: BankDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BankDetail
     */
    omit?: BankDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BankDetailInclude<ExtArgs> | null
    /**
     * Filter, which BankDetail to fetch.
     */
    where: BankDetailWhereUniqueInput
  }

  /**
   * BankDetail findUniqueOrThrow
   */
  export type BankDetailFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BankDetail
     */
    select?: BankDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BankDetail
     */
    omit?: BankDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BankDetailInclude<ExtArgs> | null
    /**
     * Filter, which BankDetail to fetch.
     */
    where: BankDetailWhereUniqueInput
  }

  /**
   * BankDetail findFirst
   */
  export type BankDetailFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BankDetail
     */
    select?: BankDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BankDetail
     */
    omit?: BankDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BankDetailInclude<ExtArgs> | null
    /**
     * Filter, which BankDetail to fetch.
     */
    where?: BankDetailWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BankDetails to fetch.
     */
    orderBy?: BankDetailOrderByWithRelationInput | BankDetailOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BankDetails.
     */
    cursor?: BankDetailWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BankDetails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BankDetails.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BankDetails.
     */
    distinct?: BankDetailScalarFieldEnum | BankDetailScalarFieldEnum[]
  }

  /**
   * BankDetail findFirstOrThrow
   */
  export type BankDetailFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BankDetail
     */
    select?: BankDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BankDetail
     */
    omit?: BankDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BankDetailInclude<ExtArgs> | null
    /**
     * Filter, which BankDetail to fetch.
     */
    where?: BankDetailWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BankDetails to fetch.
     */
    orderBy?: BankDetailOrderByWithRelationInput | BankDetailOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BankDetails.
     */
    cursor?: BankDetailWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BankDetails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BankDetails.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BankDetails.
     */
    distinct?: BankDetailScalarFieldEnum | BankDetailScalarFieldEnum[]
  }

  /**
   * BankDetail findMany
   */
  export type BankDetailFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BankDetail
     */
    select?: BankDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BankDetail
     */
    omit?: BankDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BankDetailInclude<ExtArgs> | null
    /**
     * Filter, which BankDetails to fetch.
     */
    where?: BankDetailWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BankDetails to fetch.
     */
    orderBy?: BankDetailOrderByWithRelationInput | BankDetailOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BankDetails.
     */
    cursor?: BankDetailWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BankDetails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BankDetails.
     */
    skip?: number
    distinct?: BankDetailScalarFieldEnum | BankDetailScalarFieldEnum[]
  }

  /**
   * BankDetail create
   */
  export type BankDetailCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BankDetail
     */
    select?: BankDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BankDetail
     */
    omit?: BankDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BankDetailInclude<ExtArgs> | null
    /**
     * The data needed to create a BankDetail.
     */
    data: XOR<BankDetailCreateInput, BankDetailUncheckedCreateInput>
  }

  /**
   * BankDetail createMany
   */
  export type BankDetailCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BankDetails.
     */
    data: BankDetailCreateManyInput | BankDetailCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BankDetail createManyAndReturn
   */
  export type BankDetailCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BankDetail
     */
    select?: BankDetailSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BankDetail
     */
    omit?: BankDetailOmit<ExtArgs> | null
    /**
     * The data used to create many BankDetails.
     */
    data: BankDetailCreateManyInput | BankDetailCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BankDetailIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * BankDetail update
   */
  export type BankDetailUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BankDetail
     */
    select?: BankDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BankDetail
     */
    omit?: BankDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BankDetailInclude<ExtArgs> | null
    /**
     * The data needed to update a BankDetail.
     */
    data: XOR<BankDetailUpdateInput, BankDetailUncheckedUpdateInput>
    /**
     * Choose, which BankDetail to update.
     */
    where: BankDetailWhereUniqueInput
  }

  /**
   * BankDetail updateMany
   */
  export type BankDetailUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BankDetails.
     */
    data: XOR<BankDetailUpdateManyMutationInput, BankDetailUncheckedUpdateManyInput>
    /**
     * Filter which BankDetails to update
     */
    where?: BankDetailWhereInput
    /**
     * Limit how many BankDetails to update.
     */
    limit?: number
  }

  /**
   * BankDetail updateManyAndReturn
   */
  export type BankDetailUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BankDetail
     */
    select?: BankDetailSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BankDetail
     */
    omit?: BankDetailOmit<ExtArgs> | null
    /**
     * The data used to update BankDetails.
     */
    data: XOR<BankDetailUpdateManyMutationInput, BankDetailUncheckedUpdateManyInput>
    /**
     * Filter which BankDetails to update
     */
    where?: BankDetailWhereInput
    /**
     * Limit how many BankDetails to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BankDetailIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * BankDetail upsert
   */
  export type BankDetailUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BankDetail
     */
    select?: BankDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BankDetail
     */
    omit?: BankDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BankDetailInclude<ExtArgs> | null
    /**
     * The filter to search for the BankDetail to update in case it exists.
     */
    where: BankDetailWhereUniqueInput
    /**
     * In case the BankDetail found by the `where` argument doesn't exist, create a new BankDetail with this data.
     */
    create: XOR<BankDetailCreateInput, BankDetailUncheckedCreateInput>
    /**
     * In case the BankDetail was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BankDetailUpdateInput, BankDetailUncheckedUpdateInput>
  }

  /**
   * BankDetail delete
   */
  export type BankDetailDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BankDetail
     */
    select?: BankDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BankDetail
     */
    omit?: BankDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BankDetailInclude<ExtArgs> | null
    /**
     * Filter which BankDetail to delete.
     */
    where: BankDetailWhereUniqueInput
  }

  /**
   * BankDetail deleteMany
   */
  export type BankDetailDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BankDetails to delete
     */
    where?: BankDetailWhereInput
    /**
     * Limit how many BankDetails to delete.
     */
    limit?: number
  }

  /**
   * BankDetail.ngo
   */
  export type BankDetail$ngoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NGOProfile
     */
    select?: NGOProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NGOProfile
     */
    omit?: NGOProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NGOProfileInclude<ExtArgs> | null
    where?: NGOProfileWhereInput
  }

  /**
   * BankDetail.company
   */
  export type BankDetail$companyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyProfile
     */
    select?: CompanyProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyProfile
     */
    omit?: CompanyProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyProfileInclude<ExtArgs> | null
    where?: CompanyProfileWhereInput
  }

  /**
   * BankDetail without action
   */
  export type BankDetailDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BankDetail
     */
    select?: BankDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BankDetail
     */
    omit?: BankDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BankDetailInclude<ExtArgs> | null
  }


  /**
   * Model Document
   */

  export type AggregateDocument = {
    _count: DocumentCountAggregateOutputType | null
    _min: DocumentMinAggregateOutputType | null
    _max: DocumentMaxAggregateOutputType | null
  }

  export type DocumentMinAggregateOutputType = {
    id: string | null
    ngoId: string | null
    companyId: string | null
    campaignId: string | null
    type: $Enums.DocumentType | null
    title: string | null
    url: string | null
    uploadedAt: Date | null
  }

  export type DocumentMaxAggregateOutputType = {
    id: string | null
    ngoId: string | null
    companyId: string | null
    campaignId: string | null
    type: $Enums.DocumentType | null
    title: string | null
    url: string | null
    uploadedAt: Date | null
  }

  export type DocumentCountAggregateOutputType = {
    id: number
    ngoId: number
    companyId: number
    campaignId: number
    type: number
    title: number
    url: number
    uploadedAt: number
    metadata: number
    _all: number
  }


  export type DocumentMinAggregateInputType = {
    id?: true
    ngoId?: true
    companyId?: true
    campaignId?: true
    type?: true
    title?: true
    url?: true
    uploadedAt?: true
  }

  export type DocumentMaxAggregateInputType = {
    id?: true
    ngoId?: true
    companyId?: true
    campaignId?: true
    type?: true
    title?: true
    url?: true
    uploadedAt?: true
  }

  export type DocumentCountAggregateInputType = {
    id?: true
    ngoId?: true
    companyId?: true
    campaignId?: true
    type?: true
    title?: true
    url?: true
    uploadedAt?: true
    metadata?: true
    _all?: true
  }

  export type DocumentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Document to aggregate.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Documents
    **/
    _count?: true | DocumentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DocumentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DocumentMaxAggregateInputType
  }

  export type GetDocumentAggregateType<T extends DocumentAggregateArgs> = {
        [P in keyof T & keyof AggregateDocument]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDocument[P]>
      : GetScalarType<T[P], AggregateDocument[P]>
  }




  export type DocumentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocumentWhereInput
    orderBy?: DocumentOrderByWithAggregationInput | DocumentOrderByWithAggregationInput[]
    by: DocumentScalarFieldEnum[] | DocumentScalarFieldEnum
    having?: DocumentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DocumentCountAggregateInputType | true
    _min?: DocumentMinAggregateInputType
    _max?: DocumentMaxAggregateInputType
  }

  export type DocumentGroupByOutputType = {
    id: string
    ngoId: string | null
    companyId: string | null
    campaignId: string | null
    type: $Enums.DocumentType
    title: string
    url: string
    uploadedAt: Date
    metadata: JsonValue | null
    _count: DocumentCountAggregateOutputType | null
    _min: DocumentMinAggregateOutputType | null
    _max: DocumentMaxAggregateOutputType | null
  }

  type GetDocumentGroupByPayload<T extends DocumentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DocumentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DocumentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DocumentGroupByOutputType[P]>
            : GetScalarType<T[P], DocumentGroupByOutputType[P]>
        }
      >
    >


  export type DocumentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ngoId?: boolean
    companyId?: boolean
    campaignId?: boolean
    type?: boolean
    title?: boolean
    url?: boolean
    uploadedAt?: boolean
    metadata?: boolean
    ngo?: boolean | Document$ngoArgs<ExtArgs>
    company?: boolean | Document$companyArgs<ExtArgs>
    campaign?: boolean | Document$campaignArgs<ExtArgs>
  }, ExtArgs["result"]["document"]>

  export type DocumentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ngoId?: boolean
    companyId?: boolean
    campaignId?: boolean
    type?: boolean
    title?: boolean
    url?: boolean
    uploadedAt?: boolean
    metadata?: boolean
    ngo?: boolean | Document$ngoArgs<ExtArgs>
    company?: boolean | Document$companyArgs<ExtArgs>
    campaign?: boolean | Document$campaignArgs<ExtArgs>
  }, ExtArgs["result"]["document"]>

  export type DocumentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ngoId?: boolean
    companyId?: boolean
    campaignId?: boolean
    type?: boolean
    title?: boolean
    url?: boolean
    uploadedAt?: boolean
    metadata?: boolean
    ngo?: boolean | Document$ngoArgs<ExtArgs>
    company?: boolean | Document$companyArgs<ExtArgs>
    campaign?: boolean | Document$campaignArgs<ExtArgs>
  }, ExtArgs["result"]["document"]>

  export type DocumentSelectScalar = {
    id?: boolean
    ngoId?: boolean
    companyId?: boolean
    campaignId?: boolean
    type?: boolean
    title?: boolean
    url?: boolean
    uploadedAt?: boolean
    metadata?: boolean
  }

  export type DocumentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "ngoId" | "companyId" | "campaignId" | "type" | "title" | "url" | "uploadedAt" | "metadata", ExtArgs["result"]["document"]>
  export type DocumentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ngo?: boolean | Document$ngoArgs<ExtArgs>
    company?: boolean | Document$companyArgs<ExtArgs>
    campaign?: boolean | Document$campaignArgs<ExtArgs>
  }
  export type DocumentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ngo?: boolean | Document$ngoArgs<ExtArgs>
    company?: boolean | Document$companyArgs<ExtArgs>
    campaign?: boolean | Document$campaignArgs<ExtArgs>
  }
  export type DocumentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ngo?: boolean | Document$ngoArgs<ExtArgs>
    company?: boolean | Document$companyArgs<ExtArgs>
    campaign?: boolean | Document$campaignArgs<ExtArgs>
  }

  export type $DocumentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Document"
    objects: {
      ngo: Prisma.$NGOProfilePayload<ExtArgs> | null
      company: Prisma.$CompanyProfilePayload<ExtArgs> | null
      campaign: Prisma.$CampaignPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      ngoId: string | null
      companyId: string | null
      campaignId: string | null
      type: $Enums.DocumentType
      title: string
      url: string
      uploadedAt: Date
      metadata: Prisma.JsonValue | null
    }, ExtArgs["result"]["document"]>
    composites: {}
  }

  type DocumentGetPayload<S extends boolean | null | undefined | DocumentDefaultArgs> = $Result.GetResult<Prisma.$DocumentPayload, S>

  type DocumentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DocumentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DocumentCountAggregateInputType | true
    }

  export interface DocumentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Document'], meta: { name: 'Document' } }
    /**
     * Find zero or one Document that matches the filter.
     * @param {DocumentFindUniqueArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DocumentFindUniqueArgs>(args: SelectSubset<T, DocumentFindUniqueArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Document that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DocumentFindUniqueOrThrowArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DocumentFindUniqueOrThrowArgs>(args: SelectSubset<T, DocumentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Document that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentFindFirstArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DocumentFindFirstArgs>(args?: SelectSubset<T, DocumentFindFirstArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Document that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentFindFirstOrThrowArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DocumentFindFirstOrThrowArgs>(args?: SelectSubset<T, DocumentFindFirstOrThrowArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Documents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Documents
     * const documents = await prisma.document.findMany()
     * 
     * // Get first 10 Documents
     * const documents = await prisma.document.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const documentWithIdOnly = await prisma.document.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DocumentFindManyArgs>(args?: SelectSubset<T, DocumentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Document.
     * @param {DocumentCreateArgs} args - Arguments to create a Document.
     * @example
     * // Create one Document
     * const Document = await prisma.document.create({
     *   data: {
     *     // ... data to create a Document
     *   }
     * })
     * 
     */
    create<T extends DocumentCreateArgs>(args: SelectSubset<T, DocumentCreateArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Documents.
     * @param {DocumentCreateManyArgs} args - Arguments to create many Documents.
     * @example
     * // Create many Documents
     * const document = await prisma.document.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DocumentCreateManyArgs>(args?: SelectSubset<T, DocumentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Documents and returns the data saved in the database.
     * @param {DocumentCreateManyAndReturnArgs} args - Arguments to create many Documents.
     * @example
     * // Create many Documents
     * const document = await prisma.document.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Documents and only return the `id`
     * const documentWithIdOnly = await prisma.document.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DocumentCreateManyAndReturnArgs>(args?: SelectSubset<T, DocumentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Document.
     * @param {DocumentDeleteArgs} args - Arguments to delete one Document.
     * @example
     * // Delete one Document
     * const Document = await prisma.document.delete({
     *   where: {
     *     // ... filter to delete one Document
     *   }
     * })
     * 
     */
    delete<T extends DocumentDeleteArgs>(args: SelectSubset<T, DocumentDeleteArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Document.
     * @param {DocumentUpdateArgs} args - Arguments to update one Document.
     * @example
     * // Update one Document
     * const document = await prisma.document.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DocumentUpdateArgs>(args: SelectSubset<T, DocumentUpdateArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Documents.
     * @param {DocumentDeleteManyArgs} args - Arguments to filter Documents to delete.
     * @example
     * // Delete a few Documents
     * const { count } = await prisma.document.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DocumentDeleteManyArgs>(args?: SelectSubset<T, DocumentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Documents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Documents
     * const document = await prisma.document.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DocumentUpdateManyArgs>(args: SelectSubset<T, DocumentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Documents and returns the data updated in the database.
     * @param {DocumentUpdateManyAndReturnArgs} args - Arguments to update many Documents.
     * @example
     * // Update many Documents
     * const document = await prisma.document.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Documents and only return the `id`
     * const documentWithIdOnly = await prisma.document.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DocumentUpdateManyAndReturnArgs>(args: SelectSubset<T, DocumentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Document.
     * @param {DocumentUpsertArgs} args - Arguments to update or create a Document.
     * @example
     * // Update or create a Document
     * const document = await prisma.document.upsert({
     *   create: {
     *     // ... data to create a Document
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Document we want to update
     *   }
     * })
     */
    upsert<T extends DocumentUpsertArgs>(args: SelectSubset<T, DocumentUpsertArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Documents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentCountArgs} args - Arguments to filter Documents to count.
     * @example
     * // Count the number of Documents
     * const count = await prisma.document.count({
     *   where: {
     *     // ... the filter for the Documents we want to count
     *   }
     * })
    **/
    count<T extends DocumentCountArgs>(
      args?: Subset<T, DocumentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DocumentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Document.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DocumentAggregateArgs>(args: Subset<T, DocumentAggregateArgs>): Prisma.PrismaPromise<GetDocumentAggregateType<T>>

    /**
     * Group by Document.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DocumentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DocumentGroupByArgs['orderBy'] }
        : { orderBy?: DocumentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DocumentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDocumentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Document model
   */
  readonly fields: DocumentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Document.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DocumentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    ngo<T extends Document$ngoArgs<ExtArgs> = {}>(args?: Subset<T, Document$ngoArgs<ExtArgs>>): Prisma__NGOProfileClient<$Result.GetResult<Prisma.$NGOProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    company<T extends Document$companyArgs<ExtArgs> = {}>(args?: Subset<T, Document$companyArgs<ExtArgs>>): Prisma__CompanyProfileClient<$Result.GetResult<Prisma.$CompanyProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    campaign<T extends Document$campaignArgs<ExtArgs> = {}>(args?: Subset<T, Document$campaignArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Document model
   */
  interface DocumentFieldRefs {
    readonly id: FieldRef<"Document", 'String'>
    readonly ngoId: FieldRef<"Document", 'String'>
    readonly companyId: FieldRef<"Document", 'String'>
    readonly campaignId: FieldRef<"Document", 'String'>
    readonly type: FieldRef<"Document", 'DocumentType'>
    readonly title: FieldRef<"Document", 'String'>
    readonly url: FieldRef<"Document", 'String'>
    readonly uploadedAt: FieldRef<"Document", 'DateTime'>
    readonly metadata: FieldRef<"Document", 'Json'>
  }
    

  // Custom InputTypes
  /**
   * Document findUnique
   */
  export type DocumentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document findUniqueOrThrow
   */
  export type DocumentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document findFirst
   */
  export type DocumentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Documents.
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Documents.
     */
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * Document findFirstOrThrow
   */
  export type DocumentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Documents.
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Documents.
     */
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * Document findMany
   */
  export type DocumentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Documents to fetch.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Documents.
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * Document create
   */
  export type DocumentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * The data needed to create a Document.
     */
    data: XOR<DocumentCreateInput, DocumentUncheckedCreateInput>
  }

  /**
   * Document createMany
   */
  export type DocumentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Documents.
     */
    data: DocumentCreateManyInput | DocumentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Document createManyAndReturn
   */
  export type DocumentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * The data used to create many Documents.
     */
    data: DocumentCreateManyInput | DocumentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Document update
   */
  export type DocumentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * The data needed to update a Document.
     */
    data: XOR<DocumentUpdateInput, DocumentUncheckedUpdateInput>
    /**
     * Choose, which Document to update.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document updateMany
   */
  export type DocumentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Documents.
     */
    data: XOR<DocumentUpdateManyMutationInput, DocumentUncheckedUpdateManyInput>
    /**
     * Filter which Documents to update
     */
    where?: DocumentWhereInput
    /**
     * Limit how many Documents to update.
     */
    limit?: number
  }

  /**
   * Document updateManyAndReturn
   */
  export type DocumentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * The data used to update Documents.
     */
    data: XOR<DocumentUpdateManyMutationInput, DocumentUncheckedUpdateManyInput>
    /**
     * Filter which Documents to update
     */
    where?: DocumentWhereInput
    /**
     * Limit how many Documents to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Document upsert
   */
  export type DocumentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * The filter to search for the Document to update in case it exists.
     */
    where: DocumentWhereUniqueInput
    /**
     * In case the Document found by the `where` argument doesn't exist, create a new Document with this data.
     */
    create: XOR<DocumentCreateInput, DocumentUncheckedCreateInput>
    /**
     * In case the Document was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DocumentUpdateInput, DocumentUncheckedUpdateInput>
  }

  /**
   * Document delete
   */
  export type DocumentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter which Document to delete.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document deleteMany
   */
  export type DocumentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Documents to delete
     */
    where?: DocumentWhereInput
    /**
     * Limit how many Documents to delete.
     */
    limit?: number
  }

  /**
   * Document.ngo
   */
  export type Document$ngoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NGOProfile
     */
    select?: NGOProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NGOProfile
     */
    omit?: NGOProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NGOProfileInclude<ExtArgs> | null
    where?: NGOProfileWhereInput
  }

  /**
   * Document.company
   */
  export type Document$companyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyProfile
     */
    select?: CompanyProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyProfile
     */
    omit?: CompanyProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyProfileInclude<ExtArgs> | null
    where?: CompanyProfileWhereInput
  }

  /**
   * Document.campaign
   */
  export type Document$campaignArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null
    where?: CampaignWhereInput
  }

  /**
   * Document without action
   */
  export type DocumentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
  }


  /**
   * Model Address
   */

  export type AggregateAddress = {
    _count: AddressCountAggregateOutputType | null
    _min: AddressMinAggregateOutputType | null
    _max: AddressMaxAggregateOutputType | null
  }

  export type AddressMinAggregateOutputType = {
    id: string | null
    ngoId: string | null
    companyId: string | null
    donorId: string | null
    line1: string | null
    line2: string | null
    city: string | null
    state: string | null
    country: string | null
    postalCode: string | null
    addressType: string | null
  }

  export type AddressMaxAggregateOutputType = {
    id: string | null
    ngoId: string | null
    companyId: string | null
    donorId: string | null
    line1: string | null
    line2: string | null
    city: string | null
    state: string | null
    country: string | null
    postalCode: string | null
    addressType: string | null
  }

  export type AddressCountAggregateOutputType = {
    id: number
    ngoId: number
    companyId: number
    donorId: number
    line1: number
    line2: number
    city: number
    state: number
    country: number
    postalCode: number
    addressType: number
    _all: number
  }


  export type AddressMinAggregateInputType = {
    id?: true
    ngoId?: true
    companyId?: true
    donorId?: true
    line1?: true
    line2?: true
    city?: true
    state?: true
    country?: true
    postalCode?: true
    addressType?: true
  }

  export type AddressMaxAggregateInputType = {
    id?: true
    ngoId?: true
    companyId?: true
    donorId?: true
    line1?: true
    line2?: true
    city?: true
    state?: true
    country?: true
    postalCode?: true
    addressType?: true
  }

  export type AddressCountAggregateInputType = {
    id?: true
    ngoId?: true
    companyId?: true
    donorId?: true
    line1?: true
    line2?: true
    city?: true
    state?: true
    country?: true
    postalCode?: true
    addressType?: true
    _all?: true
  }

  export type AddressAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Address to aggregate.
     */
    where?: AddressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Addresses to fetch.
     */
    orderBy?: AddressOrderByWithRelationInput | AddressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AddressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Addresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Addresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Addresses
    **/
    _count?: true | AddressCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AddressMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AddressMaxAggregateInputType
  }

  export type GetAddressAggregateType<T extends AddressAggregateArgs> = {
        [P in keyof T & keyof AggregateAddress]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAddress[P]>
      : GetScalarType<T[P], AggregateAddress[P]>
  }




  export type AddressGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AddressWhereInput
    orderBy?: AddressOrderByWithAggregationInput | AddressOrderByWithAggregationInput[]
    by: AddressScalarFieldEnum[] | AddressScalarFieldEnum
    having?: AddressScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AddressCountAggregateInputType | true
    _min?: AddressMinAggregateInputType
    _max?: AddressMaxAggregateInputType
  }

  export type AddressGroupByOutputType = {
    id: string
    ngoId: string | null
    companyId: string | null
    donorId: string | null
    line1: string
    line2: string | null
    city: string
    state: string
    country: string
    postalCode: string
    addressType: string | null
    _count: AddressCountAggregateOutputType | null
    _min: AddressMinAggregateOutputType | null
    _max: AddressMaxAggregateOutputType | null
  }

  type GetAddressGroupByPayload<T extends AddressGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AddressGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AddressGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AddressGroupByOutputType[P]>
            : GetScalarType<T[P], AddressGroupByOutputType[P]>
        }
      >
    >


  export type AddressSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ngoId?: boolean
    companyId?: boolean
    donorId?: boolean
    line1?: boolean
    line2?: boolean
    city?: boolean
    state?: boolean
    country?: boolean
    postalCode?: boolean
    addressType?: boolean
    ngo?: boolean | Address$ngoArgs<ExtArgs>
    company?: boolean | Address$companyArgs<ExtArgs>
    donor?: boolean | Address$donorArgs<ExtArgs>
  }, ExtArgs["result"]["address"]>

  export type AddressSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ngoId?: boolean
    companyId?: boolean
    donorId?: boolean
    line1?: boolean
    line2?: boolean
    city?: boolean
    state?: boolean
    country?: boolean
    postalCode?: boolean
    addressType?: boolean
    ngo?: boolean | Address$ngoArgs<ExtArgs>
    company?: boolean | Address$companyArgs<ExtArgs>
    donor?: boolean | Address$donorArgs<ExtArgs>
  }, ExtArgs["result"]["address"]>

  export type AddressSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ngoId?: boolean
    companyId?: boolean
    donorId?: boolean
    line1?: boolean
    line2?: boolean
    city?: boolean
    state?: boolean
    country?: boolean
    postalCode?: boolean
    addressType?: boolean
    ngo?: boolean | Address$ngoArgs<ExtArgs>
    company?: boolean | Address$companyArgs<ExtArgs>
    donor?: boolean | Address$donorArgs<ExtArgs>
  }, ExtArgs["result"]["address"]>

  export type AddressSelectScalar = {
    id?: boolean
    ngoId?: boolean
    companyId?: boolean
    donorId?: boolean
    line1?: boolean
    line2?: boolean
    city?: boolean
    state?: boolean
    country?: boolean
    postalCode?: boolean
    addressType?: boolean
  }

  export type AddressOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "ngoId" | "companyId" | "donorId" | "line1" | "line2" | "city" | "state" | "country" | "postalCode" | "addressType", ExtArgs["result"]["address"]>
  export type AddressInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ngo?: boolean | Address$ngoArgs<ExtArgs>
    company?: boolean | Address$companyArgs<ExtArgs>
    donor?: boolean | Address$donorArgs<ExtArgs>
  }
  export type AddressIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ngo?: boolean | Address$ngoArgs<ExtArgs>
    company?: boolean | Address$companyArgs<ExtArgs>
    donor?: boolean | Address$donorArgs<ExtArgs>
  }
  export type AddressIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ngo?: boolean | Address$ngoArgs<ExtArgs>
    company?: boolean | Address$companyArgs<ExtArgs>
    donor?: boolean | Address$donorArgs<ExtArgs>
  }

  export type $AddressPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Address"
    objects: {
      ngo: Prisma.$NGOProfilePayload<ExtArgs> | null
      company: Prisma.$CompanyProfilePayload<ExtArgs> | null
      donor: Prisma.$DonorProfilePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      ngoId: string | null
      companyId: string | null
      donorId: string | null
      line1: string
      line2: string | null
      city: string
      state: string
      country: string
      postalCode: string
      addressType: string | null
    }, ExtArgs["result"]["address"]>
    composites: {}
  }

  type AddressGetPayload<S extends boolean | null | undefined | AddressDefaultArgs> = $Result.GetResult<Prisma.$AddressPayload, S>

  type AddressCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AddressFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AddressCountAggregateInputType | true
    }

  export interface AddressDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Address'], meta: { name: 'Address' } }
    /**
     * Find zero or one Address that matches the filter.
     * @param {AddressFindUniqueArgs} args - Arguments to find a Address
     * @example
     * // Get one Address
     * const address = await prisma.address.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AddressFindUniqueArgs>(args: SelectSubset<T, AddressFindUniqueArgs<ExtArgs>>): Prisma__AddressClient<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Address that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AddressFindUniqueOrThrowArgs} args - Arguments to find a Address
     * @example
     * // Get one Address
     * const address = await prisma.address.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AddressFindUniqueOrThrowArgs>(args: SelectSubset<T, AddressFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AddressClient<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Address that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressFindFirstArgs} args - Arguments to find a Address
     * @example
     * // Get one Address
     * const address = await prisma.address.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AddressFindFirstArgs>(args?: SelectSubset<T, AddressFindFirstArgs<ExtArgs>>): Prisma__AddressClient<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Address that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressFindFirstOrThrowArgs} args - Arguments to find a Address
     * @example
     * // Get one Address
     * const address = await prisma.address.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AddressFindFirstOrThrowArgs>(args?: SelectSubset<T, AddressFindFirstOrThrowArgs<ExtArgs>>): Prisma__AddressClient<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Addresses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Addresses
     * const addresses = await prisma.address.findMany()
     * 
     * // Get first 10 Addresses
     * const addresses = await prisma.address.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const addressWithIdOnly = await prisma.address.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AddressFindManyArgs>(args?: SelectSubset<T, AddressFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Address.
     * @param {AddressCreateArgs} args - Arguments to create a Address.
     * @example
     * // Create one Address
     * const Address = await prisma.address.create({
     *   data: {
     *     // ... data to create a Address
     *   }
     * })
     * 
     */
    create<T extends AddressCreateArgs>(args: SelectSubset<T, AddressCreateArgs<ExtArgs>>): Prisma__AddressClient<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Addresses.
     * @param {AddressCreateManyArgs} args - Arguments to create many Addresses.
     * @example
     * // Create many Addresses
     * const address = await prisma.address.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AddressCreateManyArgs>(args?: SelectSubset<T, AddressCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Addresses and returns the data saved in the database.
     * @param {AddressCreateManyAndReturnArgs} args - Arguments to create many Addresses.
     * @example
     * // Create many Addresses
     * const address = await prisma.address.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Addresses and only return the `id`
     * const addressWithIdOnly = await prisma.address.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AddressCreateManyAndReturnArgs>(args?: SelectSubset<T, AddressCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Address.
     * @param {AddressDeleteArgs} args - Arguments to delete one Address.
     * @example
     * // Delete one Address
     * const Address = await prisma.address.delete({
     *   where: {
     *     // ... filter to delete one Address
     *   }
     * })
     * 
     */
    delete<T extends AddressDeleteArgs>(args: SelectSubset<T, AddressDeleteArgs<ExtArgs>>): Prisma__AddressClient<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Address.
     * @param {AddressUpdateArgs} args - Arguments to update one Address.
     * @example
     * // Update one Address
     * const address = await prisma.address.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AddressUpdateArgs>(args: SelectSubset<T, AddressUpdateArgs<ExtArgs>>): Prisma__AddressClient<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Addresses.
     * @param {AddressDeleteManyArgs} args - Arguments to filter Addresses to delete.
     * @example
     * // Delete a few Addresses
     * const { count } = await prisma.address.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AddressDeleteManyArgs>(args?: SelectSubset<T, AddressDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Addresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Addresses
     * const address = await prisma.address.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AddressUpdateManyArgs>(args: SelectSubset<T, AddressUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Addresses and returns the data updated in the database.
     * @param {AddressUpdateManyAndReturnArgs} args - Arguments to update many Addresses.
     * @example
     * // Update many Addresses
     * const address = await prisma.address.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Addresses and only return the `id`
     * const addressWithIdOnly = await prisma.address.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AddressUpdateManyAndReturnArgs>(args: SelectSubset<T, AddressUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Address.
     * @param {AddressUpsertArgs} args - Arguments to update or create a Address.
     * @example
     * // Update or create a Address
     * const address = await prisma.address.upsert({
     *   create: {
     *     // ... data to create a Address
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Address we want to update
     *   }
     * })
     */
    upsert<T extends AddressUpsertArgs>(args: SelectSubset<T, AddressUpsertArgs<ExtArgs>>): Prisma__AddressClient<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Addresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressCountArgs} args - Arguments to filter Addresses to count.
     * @example
     * // Count the number of Addresses
     * const count = await prisma.address.count({
     *   where: {
     *     // ... the filter for the Addresses we want to count
     *   }
     * })
    **/
    count<T extends AddressCountArgs>(
      args?: Subset<T, AddressCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AddressCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Address.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AddressAggregateArgs>(args: Subset<T, AddressAggregateArgs>): Prisma.PrismaPromise<GetAddressAggregateType<T>>

    /**
     * Group by Address.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AddressGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AddressGroupByArgs['orderBy'] }
        : { orderBy?: AddressGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AddressGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAddressGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Address model
   */
  readonly fields: AddressFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Address.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AddressClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    ngo<T extends Address$ngoArgs<ExtArgs> = {}>(args?: Subset<T, Address$ngoArgs<ExtArgs>>): Prisma__NGOProfileClient<$Result.GetResult<Prisma.$NGOProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    company<T extends Address$companyArgs<ExtArgs> = {}>(args?: Subset<T, Address$companyArgs<ExtArgs>>): Prisma__CompanyProfileClient<$Result.GetResult<Prisma.$CompanyProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    donor<T extends Address$donorArgs<ExtArgs> = {}>(args?: Subset<T, Address$donorArgs<ExtArgs>>): Prisma__DonorProfileClient<$Result.GetResult<Prisma.$DonorProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Address model
   */
  interface AddressFieldRefs {
    readonly id: FieldRef<"Address", 'String'>
    readonly ngoId: FieldRef<"Address", 'String'>
    readonly companyId: FieldRef<"Address", 'String'>
    readonly donorId: FieldRef<"Address", 'String'>
    readonly line1: FieldRef<"Address", 'String'>
    readonly line2: FieldRef<"Address", 'String'>
    readonly city: FieldRef<"Address", 'String'>
    readonly state: FieldRef<"Address", 'String'>
    readonly country: FieldRef<"Address", 'String'>
    readonly postalCode: FieldRef<"Address", 'String'>
    readonly addressType: FieldRef<"Address", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Address findUnique
   */
  export type AddressFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    /**
     * Filter, which Address to fetch.
     */
    where: AddressWhereUniqueInput
  }

  /**
   * Address findUniqueOrThrow
   */
  export type AddressFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    /**
     * Filter, which Address to fetch.
     */
    where: AddressWhereUniqueInput
  }

  /**
   * Address findFirst
   */
  export type AddressFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    /**
     * Filter, which Address to fetch.
     */
    where?: AddressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Addresses to fetch.
     */
    orderBy?: AddressOrderByWithRelationInput | AddressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Addresses.
     */
    cursor?: AddressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Addresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Addresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Addresses.
     */
    distinct?: AddressScalarFieldEnum | AddressScalarFieldEnum[]
  }

  /**
   * Address findFirstOrThrow
   */
  export type AddressFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    /**
     * Filter, which Address to fetch.
     */
    where?: AddressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Addresses to fetch.
     */
    orderBy?: AddressOrderByWithRelationInput | AddressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Addresses.
     */
    cursor?: AddressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Addresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Addresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Addresses.
     */
    distinct?: AddressScalarFieldEnum | AddressScalarFieldEnum[]
  }

  /**
   * Address findMany
   */
  export type AddressFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    /**
     * Filter, which Addresses to fetch.
     */
    where?: AddressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Addresses to fetch.
     */
    orderBy?: AddressOrderByWithRelationInput | AddressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Addresses.
     */
    cursor?: AddressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Addresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Addresses.
     */
    skip?: number
    distinct?: AddressScalarFieldEnum | AddressScalarFieldEnum[]
  }

  /**
   * Address create
   */
  export type AddressCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    /**
     * The data needed to create a Address.
     */
    data: XOR<AddressCreateInput, AddressUncheckedCreateInput>
  }

  /**
   * Address createMany
   */
  export type AddressCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Addresses.
     */
    data: AddressCreateManyInput | AddressCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Address createManyAndReturn
   */
  export type AddressCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * The data used to create many Addresses.
     */
    data: AddressCreateManyInput | AddressCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Address update
   */
  export type AddressUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    /**
     * The data needed to update a Address.
     */
    data: XOR<AddressUpdateInput, AddressUncheckedUpdateInput>
    /**
     * Choose, which Address to update.
     */
    where: AddressWhereUniqueInput
  }

  /**
   * Address updateMany
   */
  export type AddressUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Addresses.
     */
    data: XOR<AddressUpdateManyMutationInput, AddressUncheckedUpdateManyInput>
    /**
     * Filter which Addresses to update
     */
    where?: AddressWhereInput
    /**
     * Limit how many Addresses to update.
     */
    limit?: number
  }

  /**
   * Address updateManyAndReturn
   */
  export type AddressUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * The data used to update Addresses.
     */
    data: XOR<AddressUpdateManyMutationInput, AddressUncheckedUpdateManyInput>
    /**
     * Filter which Addresses to update
     */
    where?: AddressWhereInput
    /**
     * Limit how many Addresses to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Address upsert
   */
  export type AddressUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    /**
     * The filter to search for the Address to update in case it exists.
     */
    where: AddressWhereUniqueInput
    /**
     * In case the Address found by the `where` argument doesn't exist, create a new Address with this data.
     */
    create: XOR<AddressCreateInput, AddressUncheckedCreateInput>
    /**
     * In case the Address was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AddressUpdateInput, AddressUncheckedUpdateInput>
  }

  /**
   * Address delete
   */
  export type AddressDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    /**
     * Filter which Address to delete.
     */
    where: AddressWhereUniqueInput
  }

  /**
   * Address deleteMany
   */
  export type AddressDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Addresses to delete
     */
    where?: AddressWhereInput
    /**
     * Limit how many Addresses to delete.
     */
    limit?: number
  }

  /**
   * Address.ngo
   */
  export type Address$ngoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NGOProfile
     */
    select?: NGOProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NGOProfile
     */
    omit?: NGOProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NGOProfileInclude<ExtArgs> | null
    where?: NGOProfileWhereInput
  }

  /**
   * Address.company
   */
  export type Address$companyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyProfile
     */
    select?: CompanyProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyProfile
     */
    omit?: CompanyProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyProfileInclude<ExtArgs> | null
    where?: CompanyProfileWhereInput
  }

  /**
   * Address.donor
   */
  export type Address$donorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DonorProfile
     */
    select?: DonorProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DonorProfile
     */
    omit?: DonorProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonorProfileInclude<ExtArgs> | null
    where?: DonorProfileWhereInput
  }

  /**
   * Address without action
   */
  export type AddressDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
  }


  /**
   * Model AuditLog
   */

  export type AggregateAuditLog = {
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  export type AuditLogMinAggregateOutputType = {
    id: string | null
    userId: string | null
    ngoId: string | null
    companyId: string | null
    donorId: string | null
    campaignId: string | null
    donationId: string | null
    action: string | null
    createdAt: Date | null
  }

  export type AuditLogMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    ngoId: string | null
    companyId: string | null
    donorId: string | null
    campaignId: string | null
    donationId: string | null
    action: string | null
    createdAt: Date | null
  }

  export type AuditLogCountAggregateOutputType = {
    id: number
    userId: number
    ngoId: number
    companyId: number
    donorId: number
    campaignId: number
    donationId: number
    action: number
    details: number
    createdAt: number
    _all: number
  }


  export type AuditLogMinAggregateInputType = {
    id?: true
    userId?: true
    ngoId?: true
    companyId?: true
    donorId?: true
    campaignId?: true
    donationId?: true
    action?: true
    createdAt?: true
  }

  export type AuditLogMaxAggregateInputType = {
    id?: true
    userId?: true
    ngoId?: true
    companyId?: true
    donorId?: true
    campaignId?: true
    donationId?: true
    action?: true
    createdAt?: true
  }

  export type AuditLogCountAggregateInputType = {
    id?: true
    userId?: true
    ngoId?: true
    companyId?: true
    donorId?: true
    campaignId?: true
    donationId?: true
    action?: true
    details?: true
    createdAt?: true
    _all?: true
  }

  export type AuditLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLog to aggregate.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuditLogs
    **/
    _count?: true | AuditLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuditLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuditLogMaxAggregateInputType
  }

  export type GetAuditLogAggregateType<T extends AuditLogAggregateArgs> = {
        [P in keyof T & keyof AggregateAuditLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuditLog[P]>
      : GetScalarType<T[P], AggregateAuditLog[P]>
  }




  export type AuditLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithAggregationInput | AuditLogOrderByWithAggregationInput[]
    by: AuditLogScalarFieldEnum[] | AuditLogScalarFieldEnum
    having?: AuditLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuditLogCountAggregateInputType | true
    _min?: AuditLogMinAggregateInputType
    _max?: AuditLogMaxAggregateInputType
  }

  export type AuditLogGroupByOutputType = {
    id: string
    userId: string | null
    ngoId: string | null
    companyId: string | null
    donorId: string | null
    campaignId: string | null
    donationId: string | null
    action: string
    details: JsonValue | null
    createdAt: Date
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  type GetAuditLogGroupByPayload<T extends AuditLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuditLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuditLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
            : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
        }
      >
    >


  export type AuditLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    ngoId?: boolean
    companyId?: boolean
    donorId?: boolean
    campaignId?: boolean
    donationId?: boolean
    action?: boolean
    details?: boolean
    createdAt?: boolean
    user?: boolean | AuditLog$userArgs<ExtArgs>
    ngo?: boolean | AuditLog$ngoArgs<ExtArgs>
    company?: boolean | AuditLog$companyArgs<ExtArgs>
    donor?: boolean | AuditLog$donorArgs<ExtArgs>
    campaign?: boolean | AuditLog$campaignArgs<ExtArgs>
    donation?: boolean | AuditLog$donationArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    ngoId?: boolean
    companyId?: boolean
    donorId?: boolean
    campaignId?: boolean
    donationId?: boolean
    action?: boolean
    details?: boolean
    createdAt?: boolean
    user?: boolean | AuditLog$userArgs<ExtArgs>
    ngo?: boolean | AuditLog$ngoArgs<ExtArgs>
    company?: boolean | AuditLog$companyArgs<ExtArgs>
    donor?: boolean | AuditLog$donorArgs<ExtArgs>
    campaign?: boolean | AuditLog$campaignArgs<ExtArgs>
    donation?: boolean | AuditLog$donationArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    ngoId?: boolean
    companyId?: boolean
    donorId?: boolean
    campaignId?: boolean
    donationId?: boolean
    action?: boolean
    details?: boolean
    createdAt?: boolean
    user?: boolean | AuditLog$userArgs<ExtArgs>
    ngo?: boolean | AuditLog$ngoArgs<ExtArgs>
    company?: boolean | AuditLog$companyArgs<ExtArgs>
    donor?: boolean | AuditLog$donorArgs<ExtArgs>
    campaign?: boolean | AuditLog$campaignArgs<ExtArgs>
    donation?: boolean | AuditLog$donationArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectScalar = {
    id?: boolean
    userId?: boolean
    ngoId?: boolean
    companyId?: boolean
    donorId?: boolean
    campaignId?: boolean
    donationId?: boolean
    action?: boolean
    details?: boolean
    createdAt?: boolean
  }

  export type AuditLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "ngoId" | "companyId" | "donorId" | "campaignId" | "donationId" | "action" | "details" | "createdAt", ExtArgs["result"]["auditLog"]>
  export type AuditLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | AuditLog$userArgs<ExtArgs>
    ngo?: boolean | AuditLog$ngoArgs<ExtArgs>
    company?: boolean | AuditLog$companyArgs<ExtArgs>
    donor?: boolean | AuditLog$donorArgs<ExtArgs>
    campaign?: boolean | AuditLog$campaignArgs<ExtArgs>
    donation?: boolean | AuditLog$donationArgs<ExtArgs>
  }
  export type AuditLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | AuditLog$userArgs<ExtArgs>
    ngo?: boolean | AuditLog$ngoArgs<ExtArgs>
    company?: boolean | AuditLog$companyArgs<ExtArgs>
    donor?: boolean | AuditLog$donorArgs<ExtArgs>
    campaign?: boolean | AuditLog$campaignArgs<ExtArgs>
    donation?: boolean | AuditLog$donationArgs<ExtArgs>
  }
  export type AuditLogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | AuditLog$userArgs<ExtArgs>
    ngo?: boolean | AuditLog$ngoArgs<ExtArgs>
    company?: boolean | AuditLog$companyArgs<ExtArgs>
    donor?: boolean | AuditLog$donorArgs<ExtArgs>
    campaign?: boolean | AuditLog$campaignArgs<ExtArgs>
    donation?: boolean | AuditLog$donationArgs<ExtArgs>
  }

  export type $AuditLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuditLog"
    objects: {
      user: Prisma.$UserPayload<ExtArgs> | null
      ngo: Prisma.$NGOProfilePayload<ExtArgs> | null
      company: Prisma.$CompanyProfilePayload<ExtArgs> | null
      donor: Prisma.$DonorProfilePayload<ExtArgs> | null
      campaign: Prisma.$CampaignPayload<ExtArgs> | null
      donation: Prisma.$DonationPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string | null
      ngoId: string | null
      companyId: string | null
      donorId: string | null
      campaignId: string | null
      donationId: string | null
      action: string
      details: Prisma.JsonValue | null
      createdAt: Date
    }, ExtArgs["result"]["auditLog"]>
    composites: {}
  }

  type AuditLogGetPayload<S extends boolean | null | undefined | AuditLogDefaultArgs> = $Result.GetResult<Prisma.$AuditLogPayload, S>

  type AuditLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AuditLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AuditLogCountAggregateInputType | true
    }

  export interface AuditLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuditLog'], meta: { name: 'AuditLog' } }
    /**
     * Find zero or one AuditLog that matches the filter.
     * @param {AuditLogFindUniqueArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuditLogFindUniqueArgs>(args: SelectSubset<T, AuditLogFindUniqueArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AuditLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AuditLogFindUniqueOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuditLogFindUniqueOrThrowArgs>(args: SelectSubset<T, AuditLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuditLogFindFirstArgs>(args?: SelectSubset<T, AuditLogFindFirstArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuditLogFindFirstOrThrowArgs>(args?: SelectSubset<T, AuditLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AuditLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuditLogs
     * const auditLogs = await prisma.auditLog.findMany()
     * 
     * // Get first 10 AuditLogs
     * const auditLogs = await prisma.auditLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuditLogFindManyArgs>(args?: SelectSubset<T, AuditLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AuditLog.
     * @param {AuditLogCreateArgs} args - Arguments to create a AuditLog.
     * @example
     * // Create one AuditLog
     * const AuditLog = await prisma.auditLog.create({
     *   data: {
     *     // ... data to create a AuditLog
     *   }
     * })
     * 
     */
    create<T extends AuditLogCreateArgs>(args: SelectSubset<T, AuditLogCreateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AuditLogs.
     * @param {AuditLogCreateManyArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuditLogCreateManyArgs>(args?: SelectSubset<T, AuditLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AuditLogs and returns the data saved in the database.
     * @param {AuditLogCreateManyAndReturnArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AuditLogCreateManyAndReturnArgs>(args?: SelectSubset<T, AuditLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AuditLog.
     * @param {AuditLogDeleteArgs} args - Arguments to delete one AuditLog.
     * @example
     * // Delete one AuditLog
     * const AuditLog = await prisma.auditLog.delete({
     *   where: {
     *     // ... filter to delete one AuditLog
     *   }
     * })
     * 
     */
    delete<T extends AuditLogDeleteArgs>(args: SelectSubset<T, AuditLogDeleteArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AuditLog.
     * @param {AuditLogUpdateArgs} args - Arguments to update one AuditLog.
     * @example
     * // Update one AuditLog
     * const auditLog = await prisma.auditLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuditLogUpdateArgs>(args: SelectSubset<T, AuditLogUpdateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AuditLogs.
     * @param {AuditLogDeleteManyArgs} args - Arguments to filter AuditLogs to delete.
     * @example
     * // Delete a few AuditLogs
     * const { count } = await prisma.auditLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuditLogDeleteManyArgs>(args?: SelectSubset<T, AuditLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuditLogUpdateManyArgs>(args: SelectSubset<T, AuditLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs and returns the data updated in the database.
     * @param {AuditLogUpdateManyAndReturnArgs} args - Arguments to update many AuditLogs.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AuditLogUpdateManyAndReturnArgs>(args: SelectSubset<T, AuditLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AuditLog.
     * @param {AuditLogUpsertArgs} args - Arguments to update or create a AuditLog.
     * @example
     * // Update or create a AuditLog
     * const auditLog = await prisma.auditLog.upsert({
     *   create: {
     *     // ... data to create a AuditLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuditLog we want to update
     *   }
     * })
     */
    upsert<T extends AuditLogUpsertArgs>(args: SelectSubset<T, AuditLogUpsertArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogCountArgs} args - Arguments to filter AuditLogs to count.
     * @example
     * // Count the number of AuditLogs
     * const count = await prisma.auditLog.count({
     *   where: {
     *     // ... the filter for the AuditLogs we want to count
     *   }
     * })
    **/
    count<T extends AuditLogCountArgs>(
      args?: Subset<T, AuditLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuditLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AuditLogAggregateArgs>(args: Subset<T, AuditLogAggregateArgs>): Prisma.PrismaPromise<GetAuditLogAggregateType<T>>

    /**
     * Group by AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AuditLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuditLogGroupByArgs['orderBy'] }
        : { orderBy?: AuditLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AuditLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuditLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuditLog model
   */
  readonly fields: AuditLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuditLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuditLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends AuditLog$userArgs<ExtArgs> = {}>(args?: Subset<T, AuditLog$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    ngo<T extends AuditLog$ngoArgs<ExtArgs> = {}>(args?: Subset<T, AuditLog$ngoArgs<ExtArgs>>): Prisma__NGOProfileClient<$Result.GetResult<Prisma.$NGOProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    company<T extends AuditLog$companyArgs<ExtArgs> = {}>(args?: Subset<T, AuditLog$companyArgs<ExtArgs>>): Prisma__CompanyProfileClient<$Result.GetResult<Prisma.$CompanyProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    donor<T extends AuditLog$donorArgs<ExtArgs> = {}>(args?: Subset<T, AuditLog$donorArgs<ExtArgs>>): Prisma__DonorProfileClient<$Result.GetResult<Prisma.$DonorProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    campaign<T extends AuditLog$campaignArgs<ExtArgs> = {}>(args?: Subset<T, AuditLog$campaignArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    donation<T extends AuditLog$donationArgs<ExtArgs> = {}>(args?: Subset<T, AuditLog$donationArgs<ExtArgs>>): Prisma__DonationClient<$Result.GetResult<Prisma.$DonationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AuditLog model
   */
  interface AuditLogFieldRefs {
    readonly id: FieldRef<"AuditLog", 'String'>
    readonly userId: FieldRef<"AuditLog", 'String'>
    readonly ngoId: FieldRef<"AuditLog", 'String'>
    readonly companyId: FieldRef<"AuditLog", 'String'>
    readonly donorId: FieldRef<"AuditLog", 'String'>
    readonly campaignId: FieldRef<"AuditLog", 'String'>
    readonly donationId: FieldRef<"AuditLog", 'String'>
    readonly action: FieldRef<"AuditLog", 'String'>
    readonly details: FieldRef<"AuditLog", 'Json'>
    readonly createdAt: FieldRef<"AuditLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AuditLog findUnique
   */
  export type AuditLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findUniqueOrThrow
   */
  export type AuditLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findFirst
   */
  export type AuditLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findFirstOrThrow
   */
  export type AuditLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findMany
   */
  export type AuditLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLogs to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog create
   */
  export type AuditLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The data needed to create a AuditLog.
     */
    data: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
  }

  /**
   * AuditLog createMany
   */
  export type AuditLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuditLog createManyAndReturn
   */
  export type AuditLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AuditLog update
   */
  export type AuditLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The data needed to update a AuditLog.
     */
    data: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
    /**
     * Choose, which AuditLog to update.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog updateMany
   */
  export type AuditLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to update.
     */
    limit?: number
  }

  /**
   * AuditLog updateManyAndReturn
   */
  export type AuditLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AuditLog upsert
   */
  export type AuditLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The filter to search for the AuditLog to update in case it exists.
     */
    where: AuditLogWhereUniqueInput
    /**
     * In case the AuditLog found by the `where` argument doesn't exist, create a new AuditLog with this data.
     */
    create: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
    /**
     * In case the AuditLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
  }

  /**
   * AuditLog delete
   */
  export type AuditLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter which AuditLog to delete.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog deleteMany
   */
  export type AuditLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLogs to delete
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to delete.
     */
    limit?: number
  }

  /**
   * AuditLog.user
   */
  export type AuditLog$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * AuditLog.ngo
   */
  export type AuditLog$ngoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NGOProfile
     */
    select?: NGOProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NGOProfile
     */
    omit?: NGOProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NGOProfileInclude<ExtArgs> | null
    where?: NGOProfileWhereInput
  }

  /**
   * AuditLog.company
   */
  export type AuditLog$companyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyProfile
     */
    select?: CompanyProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyProfile
     */
    omit?: CompanyProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyProfileInclude<ExtArgs> | null
    where?: CompanyProfileWhereInput
  }

  /**
   * AuditLog.donor
   */
  export type AuditLog$donorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DonorProfile
     */
    select?: DonorProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DonorProfile
     */
    omit?: DonorProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonorProfileInclude<ExtArgs> | null
    where?: DonorProfileWhereInput
  }

  /**
   * AuditLog.campaign
   */
  export type AuditLog$campaignArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null
    where?: CampaignWhereInput
  }

  /**
   * AuditLog.donation
   */
  export type AuditLog$donationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Donation
     */
    select?: DonationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Donation
     */
    omit?: DonationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonationInclude<ExtArgs> | null
    where?: DonationWhereInput
  }

  /**
   * AuditLog without action
   */
  export type AuditLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    phone: 'phone',
    password: 'password',
    role: 'role',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const NGOProfileScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    registrationType: 'registrationType',
    registrationNumber: 'registrationNumber',
    founderNames: 'founderNames',
    yearEstablished: 'yearEstablished',
    missionStatement: 'missionStatement',
    impactSummary: 'impactSummary',
    website: 'website',
    twelveARegistered: 'twelveARegistered',
    eightyGRegistered: 'eightyGRegistered',
    csrEligibility: 'csrEligibility'
  };

  export type NGOProfileScalarFieldEnum = (typeof NGOProfileScalarFieldEnum)[keyof typeof NGOProfileScalarFieldEnum]


  export const CompanyProfileScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    cin: 'cin',
    csrPolicyUrl: 'csrPolicyUrl',
    industry: 'industry',
    netWorth: 'netWorth',
    averageProfit: 'averageProfit',
    csrBudget: 'csrBudget',
    csrCommittee: 'csrCommittee'
  };

  export type CompanyProfileScalarFieldEnum = (typeof CompanyProfileScalarFieldEnum)[keyof typeof CompanyProfileScalarFieldEnum]


  export const DonorProfileScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    pan: 'pan',
    occupation: 'occupation',
    interests: 'interests'
  };

  export type DonorProfileScalarFieldEnum = (typeof DonorProfileScalarFieldEnum)[keyof typeof DonorProfileScalarFieldEnum]


  export const CampaignScalarFieldEnum: {
    id: 'id',
    ngoId: 'ngoId',
    title: 'title',
    description: 'description',
    category: 'category',
    goalAmount: 'goalAmount',
    raisedAmount: 'raisedAmount',
    startDate: 'startDate',
    endDate: 'endDate',
    status: 'status'
  };

  export type CampaignScalarFieldEnum = (typeof CampaignScalarFieldEnum)[keyof typeof CampaignScalarFieldEnum]


  export const DonationScalarFieldEnum: {
    id: 'id',
    donorId: 'donorId',
    companyId: 'companyId',
    campaignId: 'campaignId',
    amount: 'amount',
    donationDate: 'donationDate',
    paymentRef: 'paymentRef',
    paymentMode: 'paymentMode'
  };

  export type DonationScalarFieldEnum = (typeof DonationScalarFieldEnum)[keyof typeof DonationScalarFieldEnum]


  export const BankDetailScalarFieldEnum: {
    id: 'id',
    ngoId: 'ngoId',
    companyId: 'companyId',
    accountHolder: 'accountHolder',
    bankName: 'bankName',
    accountNumber: 'accountNumber',
    ifsc: 'ifsc',
    branch: 'branch'
  };

  export type BankDetailScalarFieldEnum = (typeof BankDetailScalarFieldEnum)[keyof typeof BankDetailScalarFieldEnum]


  export const DocumentScalarFieldEnum: {
    id: 'id',
    ngoId: 'ngoId',
    companyId: 'companyId',
    campaignId: 'campaignId',
    type: 'type',
    title: 'title',
    url: 'url',
    uploadedAt: 'uploadedAt',
    metadata: 'metadata'
  };

  export type DocumentScalarFieldEnum = (typeof DocumentScalarFieldEnum)[keyof typeof DocumentScalarFieldEnum]


  export const AddressScalarFieldEnum: {
    id: 'id',
    ngoId: 'ngoId',
    companyId: 'companyId',
    donorId: 'donorId',
    line1: 'line1',
    line2: 'line2',
    city: 'city',
    state: 'state',
    country: 'country',
    postalCode: 'postalCode',
    addressType: 'addressType'
  };

  export type AddressScalarFieldEnum = (typeof AddressScalarFieldEnum)[keyof typeof AddressScalarFieldEnum]


  export const AuditLogScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    ngoId: 'ngoId',
    companyId: 'companyId',
    donorId: 'donorId',
    campaignId: 'campaignId',
    donationId: 'donationId',
    action: 'action',
    details: 'details',
    createdAt: 'createdAt'
  };

  export type AuditLogScalarFieldEnum = (typeof AuditLogScalarFieldEnum)[keyof typeof AuditLogScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'NGORegistrationType'
   */
  export type EnumNGORegistrationTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NGORegistrationType'>
    


  /**
   * Reference to a field of type 'NGORegistrationType[]'
   */
  export type ListEnumNGORegistrationTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NGORegistrationType[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'CampaignCategory'
   */
  export type EnumCampaignCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CampaignCategory'>
    


  /**
   * Reference to a field of type 'CampaignCategory[]'
   */
  export type ListEnumCampaignCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CampaignCategory[]'>
    


  /**
   * Reference to a field of type 'DocumentType'
   */
  export type EnumDocumentTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DocumentType'>
    


  /**
   * Reference to a field of type 'DocumentType[]'
   */
  export type ListEnumDocumentTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DocumentType[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    phone?: StringNullableFilter<"User"> | string | null
    password?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    ngoProfile?: XOR<NGOProfileNullableScalarRelationFilter, NGOProfileWhereInput> | null
    companyProfile?: XOR<CompanyProfileNullableScalarRelationFilter, CompanyProfileWhereInput> | null
    donorProfile?: XOR<DonorProfileNullableScalarRelationFilter, DonorProfileWhereInput> | null
    auditLogs?: AuditLogListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrderInput | SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ngoProfile?: NGOProfileOrderByWithRelationInput
    companyProfile?: CompanyProfileOrderByWithRelationInput
    donorProfile?: DonorProfileOrderByWithRelationInput
    auditLogs?: AuditLogOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    phone?: StringNullableFilter<"User"> | string | null
    password?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    ngoProfile?: XOR<NGOProfileNullableScalarRelationFilter, NGOProfileWhereInput> | null
    companyProfile?: XOR<CompanyProfileNullableScalarRelationFilter, CompanyProfileWhereInput> | null
    donorProfile?: XOR<DonorProfileNullableScalarRelationFilter, DonorProfileWhereInput> | null
    auditLogs?: AuditLogListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrderInput | SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    phone?: StringNullableWithAggregatesFilter<"User"> | string | null
    password?: StringWithAggregatesFilter<"User"> | string
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type NGOProfileWhereInput = {
    AND?: NGOProfileWhereInput | NGOProfileWhereInput[]
    OR?: NGOProfileWhereInput[]
    NOT?: NGOProfileWhereInput | NGOProfileWhereInput[]
    id?: StringFilter<"NGOProfile"> | string
    userId?: StringFilter<"NGOProfile"> | string
    registrationType?: EnumNGORegistrationTypeFilter<"NGOProfile"> | $Enums.NGORegistrationType
    registrationNumber?: StringFilter<"NGOProfile"> | string
    founderNames?: StringFilter<"NGOProfile"> | string
    yearEstablished?: IntFilter<"NGOProfile"> | number
    missionStatement?: StringFilter<"NGOProfile"> | string
    impactSummary?: StringNullableFilter<"NGOProfile"> | string | null
    website?: StringNullableFilter<"NGOProfile"> | string | null
    twelveARegistered?: BoolFilter<"NGOProfile"> | boolean
    eightyGRegistered?: BoolFilter<"NGOProfile"> | boolean
    csrEligibility?: BoolFilter<"NGOProfile"> | boolean
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    campaigns?: CampaignListRelationFilter
    bankDetails?: BankDetailListRelationFilter
    documents?: DocumentListRelationFilter
    addresses?: AddressListRelationFilter
    auditLogs?: AuditLogListRelationFilter
  }

  export type NGOProfileOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    registrationType?: SortOrder
    registrationNumber?: SortOrder
    founderNames?: SortOrder
    yearEstablished?: SortOrder
    missionStatement?: SortOrder
    impactSummary?: SortOrderInput | SortOrder
    website?: SortOrderInput | SortOrder
    twelveARegistered?: SortOrder
    eightyGRegistered?: SortOrder
    csrEligibility?: SortOrder
    user?: UserOrderByWithRelationInput
    campaigns?: CampaignOrderByRelationAggregateInput
    bankDetails?: BankDetailOrderByRelationAggregateInput
    documents?: DocumentOrderByRelationAggregateInput
    addresses?: AddressOrderByRelationAggregateInput
    auditLogs?: AuditLogOrderByRelationAggregateInput
  }

  export type NGOProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: NGOProfileWhereInput | NGOProfileWhereInput[]
    OR?: NGOProfileWhereInput[]
    NOT?: NGOProfileWhereInput | NGOProfileWhereInput[]
    registrationType?: EnumNGORegistrationTypeFilter<"NGOProfile"> | $Enums.NGORegistrationType
    registrationNumber?: StringFilter<"NGOProfile"> | string
    founderNames?: StringFilter<"NGOProfile"> | string
    yearEstablished?: IntFilter<"NGOProfile"> | number
    missionStatement?: StringFilter<"NGOProfile"> | string
    impactSummary?: StringNullableFilter<"NGOProfile"> | string | null
    website?: StringNullableFilter<"NGOProfile"> | string | null
    twelveARegistered?: BoolFilter<"NGOProfile"> | boolean
    eightyGRegistered?: BoolFilter<"NGOProfile"> | boolean
    csrEligibility?: BoolFilter<"NGOProfile"> | boolean
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    campaigns?: CampaignListRelationFilter
    bankDetails?: BankDetailListRelationFilter
    documents?: DocumentListRelationFilter
    addresses?: AddressListRelationFilter
    auditLogs?: AuditLogListRelationFilter
  }, "id" | "userId">

  export type NGOProfileOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    registrationType?: SortOrder
    registrationNumber?: SortOrder
    founderNames?: SortOrder
    yearEstablished?: SortOrder
    missionStatement?: SortOrder
    impactSummary?: SortOrderInput | SortOrder
    website?: SortOrderInput | SortOrder
    twelveARegistered?: SortOrder
    eightyGRegistered?: SortOrder
    csrEligibility?: SortOrder
    _count?: NGOProfileCountOrderByAggregateInput
    _avg?: NGOProfileAvgOrderByAggregateInput
    _max?: NGOProfileMaxOrderByAggregateInput
    _min?: NGOProfileMinOrderByAggregateInput
    _sum?: NGOProfileSumOrderByAggregateInput
  }

  export type NGOProfileScalarWhereWithAggregatesInput = {
    AND?: NGOProfileScalarWhereWithAggregatesInput | NGOProfileScalarWhereWithAggregatesInput[]
    OR?: NGOProfileScalarWhereWithAggregatesInput[]
    NOT?: NGOProfileScalarWhereWithAggregatesInput | NGOProfileScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"NGOProfile"> | string
    userId?: StringWithAggregatesFilter<"NGOProfile"> | string
    registrationType?: EnumNGORegistrationTypeWithAggregatesFilter<"NGOProfile"> | $Enums.NGORegistrationType
    registrationNumber?: StringWithAggregatesFilter<"NGOProfile"> | string
    founderNames?: StringWithAggregatesFilter<"NGOProfile"> | string
    yearEstablished?: IntWithAggregatesFilter<"NGOProfile"> | number
    missionStatement?: StringWithAggregatesFilter<"NGOProfile"> | string
    impactSummary?: StringNullableWithAggregatesFilter<"NGOProfile"> | string | null
    website?: StringNullableWithAggregatesFilter<"NGOProfile"> | string | null
    twelveARegistered?: BoolWithAggregatesFilter<"NGOProfile"> | boolean
    eightyGRegistered?: BoolWithAggregatesFilter<"NGOProfile"> | boolean
    csrEligibility?: BoolWithAggregatesFilter<"NGOProfile"> | boolean
  }

  export type CompanyProfileWhereInput = {
    AND?: CompanyProfileWhereInput | CompanyProfileWhereInput[]
    OR?: CompanyProfileWhereInput[]
    NOT?: CompanyProfileWhereInput | CompanyProfileWhereInput[]
    id?: StringFilter<"CompanyProfile"> | string
    userId?: StringFilter<"CompanyProfile"> | string
    cin?: StringFilter<"CompanyProfile"> | string
    csrPolicyUrl?: StringNullableFilter<"CompanyProfile"> | string | null
    industry?: StringFilter<"CompanyProfile"> | string
    netWorth?: FloatNullableFilter<"CompanyProfile"> | number | null
    averageProfit?: FloatNullableFilter<"CompanyProfile"> | number | null
    csrBudget?: FloatNullableFilter<"CompanyProfile"> | number | null
    csrCommittee?: StringNullableFilter<"CompanyProfile"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    donations?: DonationListRelationFilter
    documents?: DocumentListRelationFilter
    bankDetails?: BankDetailListRelationFilter
    addresses?: AddressListRelationFilter
    auditLogs?: AuditLogListRelationFilter
  }

  export type CompanyProfileOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    cin?: SortOrder
    csrPolicyUrl?: SortOrderInput | SortOrder
    industry?: SortOrder
    netWorth?: SortOrderInput | SortOrder
    averageProfit?: SortOrderInput | SortOrder
    csrBudget?: SortOrderInput | SortOrder
    csrCommittee?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
    donations?: DonationOrderByRelationAggregateInput
    documents?: DocumentOrderByRelationAggregateInput
    bankDetails?: BankDetailOrderByRelationAggregateInput
    addresses?: AddressOrderByRelationAggregateInput
    auditLogs?: AuditLogOrderByRelationAggregateInput
  }

  export type CompanyProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    cin?: string
    AND?: CompanyProfileWhereInput | CompanyProfileWhereInput[]
    OR?: CompanyProfileWhereInput[]
    NOT?: CompanyProfileWhereInput | CompanyProfileWhereInput[]
    csrPolicyUrl?: StringNullableFilter<"CompanyProfile"> | string | null
    industry?: StringFilter<"CompanyProfile"> | string
    netWorth?: FloatNullableFilter<"CompanyProfile"> | number | null
    averageProfit?: FloatNullableFilter<"CompanyProfile"> | number | null
    csrBudget?: FloatNullableFilter<"CompanyProfile"> | number | null
    csrCommittee?: StringNullableFilter<"CompanyProfile"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    donations?: DonationListRelationFilter
    documents?: DocumentListRelationFilter
    bankDetails?: BankDetailListRelationFilter
    addresses?: AddressListRelationFilter
    auditLogs?: AuditLogListRelationFilter
  }, "id" | "userId" | "cin">

  export type CompanyProfileOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    cin?: SortOrder
    csrPolicyUrl?: SortOrderInput | SortOrder
    industry?: SortOrder
    netWorth?: SortOrderInput | SortOrder
    averageProfit?: SortOrderInput | SortOrder
    csrBudget?: SortOrderInput | SortOrder
    csrCommittee?: SortOrderInput | SortOrder
    _count?: CompanyProfileCountOrderByAggregateInput
    _avg?: CompanyProfileAvgOrderByAggregateInput
    _max?: CompanyProfileMaxOrderByAggregateInput
    _min?: CompanyProfileMinOrderByAggregateInput
    _sum?: CompanyProfileSumOrderByAggregateInput
  }

  export type CompanyProfileScalarWhereWithAggregatesInput = {
    AND?: CompanyProfileScalarWhereWithAggregatesInput | CompanyProfileScalarWhereWithAggregatesInput[]
    OR?: CompanyProfileScalarWhereWithAggregatesInput[]
    NOT?: CompanyProfileScalarWhereWithAggregatesInput | CompanyProfileScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CompanyProfile"> | string
    userId?: StringWithAggregatesFilter<"CompanyProfile"> | string
    cin?: StringWithAggregatesFilter<"CompanyProfile"> | string
    csrPolicyUrl?: StringNullableWithAggregatesFilter<"CompanyProfile"> | string | null
    industry?: StringWithAggregatesFilter<"CompanyProfile"> | string
    netWorth?: FloatNullableWithAggregatesFilter<"CompanyProfile"> | number | null
    averageProfit?: FloatNullableWithAggregatesFilter<"CompanyProfile"> | number | null
    csrBudget?: FloatNullableWithAggregatesFilter<"CompanyProfile"> | number | null
    csrCommittee?: StringNullableWithAggregatesFilter<"CompanyProfile"> | string | null
  }

  export type DonorProfileWhereInput = {
    AND?: DonorProfileWhereInput | DonorProfileWhereInput[]
    OR?: DonorProfileWhereInput[]
    NOT?: DonorProfileWhereInput | DonorProfileWhereInput[]
    id?: StringFilter<"DonorProfile"> | string
    userId?: StringFilter<"DonorProfile"> | string
    pan?: StringNullableFilter<"DonorProfile"> | string | null
    occupation?: StringNullableFilter<"DonorProfile"> | string | null
    interests?: StringNullableFilter<"DonorProfile"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    donations?: DonationListRelationFilter
    addresses?: AddressListRelationFilter
    auditLogs?: AuditLogListRelationFilter
  }

  export type DonorProfileOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    pan?: SortOrderInput | SortOrder
    occupation?: SortOrderInput | SortOrder
    interests?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
    donations?: DonationOrderByRelationAggregateInput
    addresses?: AddressOrderByRelationAggregateInput
    auditLogs?: AuditLogOrderByRelationAggregateInput
  }

  export type DonorProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: DonorProfileWhereInput | DonorProfileWhereInput[]
    OR?: DonorProfileWhereInput[]
    NOT?: DonorProfileWhereInput | DonorProfileWhereInput[]
    pan?: StringNullableFilter<"DonorProfile"> | string | null
    occupation?: StringNullableFilter<"DonorProfile"> | string | null
    interests?: StringNullableFilter<"DonorProfile"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    donations?: DonationListRelationFilter
    addresses?: AddressListRelationFilter
    auditLogs?: AuditLogListRelationFilter
  }, "id" | "userId">

  export type DonorProfileOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    pan?: SortOrderInput | SortOrder
    occupation?: SortOrderInput | SortOrder
    interests?: SortOrderInput | SortOrder
    _count?: DonorProfileCountOrderByAggregateInput
    _max?: DonorProfileMaxOrderByAggregateInput
    _min?: DonorProfileMinOrderByAggregateInput
  }

  export type DonorProfileScalarWhereWithAggregatesInput = {
    AND?: DonorProfileScalarWhereWithAggregatesInput | DonorProfileScalarWhereWithAggregatesInput[]
    OR?: DonorProfileScalarWhereWithAggregatesInput[]
    NOT?: DonorProfileScalarWhereWithAggregatesInput | DonorProfileScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DonorProfile"> | string
    userId?: StringWithAggregatesFilter<"DonorProfile"> | string
    pan?: StringNullableWithAggregatesFilter<"DonorProfile"> | string | null
    occupation?: StringNullableWithAggregatesFilter<"DonorProfile"> | string | null
    interests?: StringNullableWithAggregatesFilter<"DonorProfile"> | string | null
  }

  export type CampaignWhereInput = {
    AND?: CampaignWhereInput | CampaignWhereInput[]
    OR?: CampaignWhereInput[]
    NOT?: CampaignWhereInput | CampaignWhereInput[]
    id?: StringFilter<"Campaign"> | string
    ngoId?: StringFilter<"Campaign"> | string
    title?: StringFilter<"Campaign"> | string
    description?: StringFilter<"Campaign"> | string
    category?: EnumCampaignCategoryFilter<"Campaign"> | $Enums.CampaignCategory
    goalAmount?: FloatFilter<"Campaign"> | number
    raisedAmount?: FloatFilter<"Campaign"> | number
    startDate?: DateTimeFilter<"Campaign"> | Date | string
    endDate?: DateTimeNullableFilter<"Campaign"> | Date | string | null
    status?: StringFilter<"Campaign"> | string
    ngo?: XOR<NGOProfileScalarRelationFilter, NGOProfileWhereInput>
    donations?: DonationListRelationFilter
    documents?: DocumentListRelationFilter
    auditLogs?: AuditLogListRelationFilter
  }

  export type CampaignOrderByWithRelationInput = {
    id?: SortOrder
    ngoId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    category?: SortOrder
    goalAmount?: SortOrder
    raisedAmount?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrderInput | SortOrder
    status?: SortOrder
    ngo?: NGOProfileOrderByWithRelationInput
    donations?: DonationOrderByRelationAggregateInput
    documents?: DocumentOrderByRelationAggregateInput
    auditLogs?: AuditLogOrderByRelationAggregateInput
  }

  export type CampaignWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CampaignWhereInput | CampaignWhereInput[]
    OR?: CampaignWhereInput[]
    NOT?: CampaignWhereInput | CampaignWhereInput[]
    ngoId?: StringFilter<"Campaign"> | string
    title?: StringFilter<"Campaign"> | string
    description?: StringFilter<"Campaign"> | string
    category?: EnumCampaignCategoryFilter<"Campaign"> | $Enums.CampaignCategory
    goalAmount?: FloatFilter<"Campaign"> | number
    raisedAmount?: FloatFilter<"Campaign"> | number
    startDate?: DateTimeFilter<"Campaign"> | Date | string
    endDate?: DateTimeNullableFilter<"Campaign"> | Date | string | null
    status?: StringFilter<"Campaign"> | string
    ngo?: XOR<NGOProfileScalarRelationFilter, NGOProfileWhereInput>
    donations?: DonationListRelationFilter
    documents?: DocumentListRelationFilter
    auditLogs?: AuditLogListRelationFilter
  }, "id">

  export type CampaignOrderByWithAggregationInput = {
    id?: SortOrder
    ngoId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    category?: SortOrder
    goalAmount?: SortOrder
    raisedAmount?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrderInput | SortOrder
    status?: SortOrder
    _count?: CampaignCountOrderByAggregateInput
    _avg?: CampaignAvgOrderByAggregateInput
    _max?: CampaignMaxOrderByAggregateInput
    _min?: CampaignMinOrderByAggregateInput
    _sum?: CampaignSumOrderByAggregateInput
  }

  export type CampaignScalarWhereWithAggregatesInput = {
    AND?: CampaignScalarWhereWithAggregatesInput | CampaignScalarWhereWithAggregatesInput[]
    OR?: CampaignScalarWhereWithAggregatesInput[]
    NOT?: CampaignScalarWhereWithAggregatesInput | CampaignScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Campaign"> | string
    ngoId?: StringWithAggregatesFilter<"Campaign"> | string
    title?: StringWithAggregatesFilter<"Campaign"> | string
    description?: StringWithAggregatesFilter<"Campaign"> | string
    category?: EnumCampaignCategoryWithAggregatesFilter<"Campaign"> | $Enums.CampaignCategory
    goalAmount?: FloatWithAggregatesFilter<"Campaign"> | number
    raisedAmount?: FloatWithAggregatesFilter<"Campaign"> | number
    startDate?: DateTimeWithAggregatesFilter<"Campaign"> | Date | string
    endDate?: DateTimeNullableWithAggregatesFilter<"Campaign"> | Date | string | null
    status?: StringWithAggregatesFilter<"Campaign"> | string
  }

  export type DonationWhereInput = {
    AND?: DonationWhereInput | DonationWhereInput[]
    OR?: DonationWhereInput[]
    NOT?: DonationWhereInput | DonationWhereInput[]
    id?: StringFilter<"Donation"> | string
    donorId?: StringNullableFilter<"Donation"> | string | null
    companyId?: StringNullableFilter<"Donation"> | string | null
    campaignId?: StringFilter<"Donation"> | string
    amount?: FloatFilter<"Donation"> | number
    donationDate?: DateTimeFilter<"Donation"> | Date | string
    paymentRef?: StringNullableFilter<"Donation"> | string | null
    paymentMode?: StringNullableFilter<"Donation"> | string | null
    donor?: XOR<DonorProfileNullableScalarRelationFilter, DonorProfileWhereInput> | null
    company?: XOR<CompanyProfileNullableScalarRelationFilter, CompanyProfileWhereInput> | null
    campaign?: XOR<CampaignScalarRelationFilter, CampaignWhereInput>
    auditLogs?: AuditLogListRelationFilter
  }

  export type DonationOrderByWithRelationInput = {
    id?: SortOrder
    donorId?: SortOrderInput | SortOrder
    companyId?: SortOrderInput | SortOrder
    campaignId?: SortOrder
    amount?: SortOrder
    donationDate?: SortOrder
    paymentRef?: SortOrderInput | SortOrder
    paymentMode?: SortOrderInput | SortOrder
    donor?: DonorProfileOrderByWithRelationInput
    company?: CompanyProfileOrderByWithRelationInput
    campaign?: CampaignOrderByWithRelationInput
    auditLogs?: AuditLogOrderByRelationAggregateInput
  }

  export type DonationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DonationWhereInput | DonationWhereInput[]
    OR?: DonationWhereInput[]
    NOT?: DonationWhereInput | DonationWhereInput[]
    donorId?: StringNullableFilter<"Donation"> | string | null
    companyId?: StringNullableFilter<"Donation"> | string | null
    campaignId?: StringFilter<"Donation"> | string
    amount?: FloatFilter<"Donation"> | number
    donationDate?: DateTimeFilter<"Donation"> | Date | string
    paymentRef?: StringNullableFilter<"Donation"> | string | null
    paymentMode?: StringNullableFilter<"Donation"> | string | null
    donor?: XOR<DonorProfileNullableScalarRelationFilter, DonorProfileWhereInput> | null
    company?: XOR<CompanyProfileNullableScalarRelationFilter, CompanyProfileWhereInput> | null
    campaign?: XOR<CampaignScalarRelationFilter, CampaignWhereInput>
    auditLogs?: AuditLogListRelationFilter
  }, "id">

  export type DonationOrderByWithAggregationInput = {
    id?: SortOrder
    donorId?: SortOrderInput | SortOrder
    companyId?: SortOrderInput | SortOrder
    campaignId?: SortOrder
    amount?: SortOrder
    donationDate?: SortOrder
    paymentRef?: SortOrderInput | SortOrder
    paymentMode?: SortOrderInput | SortOrder
    _count?: DonationCountOrderByAggregateInput
    _avg?: DonationAvgOrderByAggregateInput
    _max?: DonationMaxOrderByAggregateInput
    _min?: DonationMinOrderByAggregateInput
    _sum?: DonationSumOrderByAggregateInput
  }

  export type DonationScalarWhereWithAggregatesInput = {
    AND?: DonationScalarWhereWithAggregatesInput | DonationScalarWhereWithAggregatesInput[]
    OR?: DonationScalarWhereWithAggregatesInput[]
    NOT?: DonationScalarWhereWithAggregatesInput | DonationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Donation"> | string
    donorId?: StringNullableWithAggregatesFilter<"Donation"> | string | null
    companyId?: StringNullableWithAggregatesFilter<"Donation"> | string | null
    campaignId?: StringWithAggregatesFilter<"Donation"> | string
    amount?: FloatWithAggregatesFilter<"Donation"> | number
    donationDate?: DateTimeWithAggregatesFilter<"Donation"> | Date | string
    paymentRef?: StringNullableWithAggregatesFilter<"Donation"> | string | null
    paymentMode?: StringNullableWithAggregatesFilter<"Donation"> | string | null
  }

  export type BankDetailWhereInput = {
    AND?: BankDetailWhereInput | BankDetailWhereInput[]
    OR?: BankDetailWhereInput[]
    NOT?: BankDetailWhereInput | BankDetailWhereInput[]
    id?: StringFilter<"BankDetail"> | string
    ngoId?: StringNullableFilter<"BankDetail"> | string | null
    companyId?: StringNullableFilter<"BankDetail"> | string | null
    accountHolder?: StringFilter<"BankDetail"> | string
    bankName?: StringFilter<"BankDetail"> | string
    accountNumber?: StringFilter<"BankDetail"> | string
    ifsc?: StringFilter<"BankDetail"> | string
    branch?: StringNullableFilter<"BankDetail"> | string | null
    ngo?: XOR<NGOProfileNullableScalarRelationFilter, NGOProfileWhereInput> | null
    company?: XOR<CompanyProfileNullableScalarRelationFilter, CompanyProfileWhereInput> | null
  }

  export type BankDetailOrderByWithRelationInput = {
    id?: SortOrder
    ngoId?: SortOrderInput | SortOrder
    companyId?: SortOrderInput | SortOrder
    accountHolder?: SortOrder
    bankName?: SortOrder
    accountNumber?: SortOrder
    ifsc?: SortOrder
    branch?: SortOrderInput | SortOrder
    ngo?: NGOProfileOrderByWithRelationInput
    company?: CompanyProfileOrderByWithRelationInput
  }

  export type BankDetailWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BankDetailWhereInput | BankDetailWhereInput[]
    OR?: BankDetailWhereInput[]
    NOT?: BankDetailWhereInput | BankDetailWhereInput[]
    ngoId?: StringNullableFilter<"BankDetail"> | string | null
    companyId?: StringNullableFilter<"BankDetail"> | string | null
    accountHolder?: StringFilter<"BankDetail"> | string
    bankName?: StringFilter<"BankDetail"> | string
    accountNumber?: StringFilter<"BankDetail"> | string
    ifsc?: StringFilter<"BankDetail"> | string
    branch?: StringNullableFilter<"BankDetail"> | string | null
    ngo?: XOR<NGOProfileNullableScalarRelationFilter, NGOProfileWhereInput> | null
    company?: XOR<CompanyProfileNullableScalarRelationFilter, CompanyProfileWhereInput> | null
  }, "id">

  export type BankDetailOrderByWithAggregationInput = {
    id?: SortOrder
    ngoId?: SortOrderInput | SortOrder
    companyId?: SortOrderInput | SortOrder
    accountHolder?: SortOrder
    bankName?: SortOrder
    accountNumber?: SortOrder
    ifsc?: SortOrder
    branch?: SortOrderInput | SortOrder
    _count?: BankDetailCountOrderByAggregateInput
    _max?: BankDetailMaxOrderByAggregateInput
    _min?: BankDetailMinOrderByAggregateInput
  }

  export type BankDetailScalarWhereWithAggregatesInput = {
    AND?: BankDetailScalarWhereWithAggregatesInput | BankDetailScalarWhereWithAggregatesInput[]
    OR?: BankDetailScalarWhereWithAggregatesInput[]
    NOT?: BankDetailScalarWhereWithAggregatesInput | BankDetailScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"BankDetail"> | string
    ngoId?: StringNullableWithAggregatesFilter<"BankDetail"> | string | null
    companyId?: StringNullableWithAggregatesFilter<"BankDetail"> | string | null
    accountHolder?: StringWithAggregatesFilter<"BankDetail"> | string
    bankName?: StringWithAggregatesFilter<"BankDetail"> | string
    accountNumber?: StringWithAggregatesFilter<"BankDetail"> | string
    ifsc?: StringWithAggregatesFilter<"BankDetail"> | string
    branch?: StringNullableWithAggregatesFilter<"BankDetail"> | string | null
  }

  export type DocumentWhereInput = {
    AND?: DocumentWhereInput | DocumentWhereInput[]
    OR?: DocumentWhereInput[]
    NOT?: DocumentWhereInput | DocumentWhereInput[]
    id?: StringFilter<"Document"> | string
    ngoId?: StringNullableFilter<"Document"> | string | null
    companyId?: StringNullableFilter<"Document"> | string | null
    campaignId?: StringNullableFilter<"Document"> | string | null
    type?: EnumDocumentTypeFilter<"Document"> | $Enums.DocumentType
    title?: StringFilter<"Document"> | string
    url?: StringFilter<"Document"> | string
    uploadedAt?: DateTimeFilter<"Document"> | Date | string
    metadata?: JsonNullableFilter<"Document">
    ngo?: XOR<NGOProfileNullableScalarRelationFilter, NGOProfileWhereInput> | null
    company?: XOR<CompanyProfileNullableScalarRelationFilter, CompanyProfileWhereInput> | null
    campaign?: XOR<CampaignNullableScalarRelationFilter, CampaignWhereInput> | null
  }

  export type DocumentOrderByWithRelationInput = {
    id?: SortOrder
    ngoId?: SortOrderInput | SortOrder
    companyId?: SortOrderInput | SortOrder
    campaignId?: SortOrderInput | SortOrder
    type?: SortOrder
    title?: SortOrder
    url?: SortOrder
    uploadedAt?: SortOrder
    metadata?: SortOrderInput | SortOrder
    ngo?: NGOProfileOrderByWithRelationInput
    company?: CompanyProfileOrderByWithRelationInput
    campaign?: CampaignOrderByWithRelationInput
  }

  export type DocumentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DocumentWhereInput | DocumentWhereInput[]
    OR?: DocumentWhereInput[]
    NOT?: DocumentWhereInput | DocumentWhereInput[]
    ngoId?: StringNullableFilter<"Document"> | string | null
    companyId?: StringNullableFilter<"Document"> | string | null
    campaignId?: StringNullableFilter<"Document"> | string | null
    type?: EnumDocumentTypeFilter<"Document"> | $Enums.DocumentType
    title?: StringFilter<"Document"> | string
    url?: StringFilter<"Document"> | string
    uploadedAt?: DateTimeFilter<"Document"> | Date | string
    metadata?: JsonNullableFilter<"Document">
    ngo?: XOR<NGOProfileNullableScalarRelationFilter, NGOProfileWhereInput> | null
    company?: XOR<CompanyProfileNullableScalarRelationFilter, CompanyProfileWhereInput> | null
    campaign?: XOR<CampaignNullableScalarRelationFilter, CampaignWhereInput> | null
  }, "id">

  export type DocumentOrderByWithAggregationInput = {
    id?: SortOrder
    ngoId?: SortOrderInput | SortOrder
    companyId?: SortOrderInput | SortOrder
    campaignId?: SortOrderInput | SortOrder
    type?: SortOrder
    title?: SortOrder
    url?: SortOrder
    uploadedAt?: SortOrder
    metadata?: SortOrderInput | SortOrder
    _count?: DocumentCountOrderByAggregateInput
    _max?: DocumentMaxOrderByAggregateInput
    _min?: DocumentMinOrderByAggregateInput
  }

  export type DocumentScalarWhereWithAggregatesInput = {
    AND?: DocumentScalarWhereWithAggregatesInput | DocumentScalarWhereWithAggregatesInput[]
    OR?: DocumentScalarWhereWithAggregatesInput[]
    NOT?: DocumentScalarWhereWithAggregatesInput | DocumentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Document"> | string
    ngoId?: StringNullableWithAggregatesFilter<"Document"> | string | null
    companyId?: StringNullableWithAggregatesFilter<"Document"> | string | null
    campaignId?: StringNullableWithAggregatesFilter<"Document"> | string | null
    type?: EnumDocumentTypeWithAggregatesFilter<"Document"> | $Enums.DocumentType
    title?: StringWithAggregatesFilter<"Document"> | string
    url?: StringWithAggregatesFilter<"Document"> | string
    uploadedAt?: DateTimeWithAggregatesFilter<"Document"> | Date | string
    metadata?: JsonNullableWithAggregatesFilter<"Document">
  }

  export type AddressWhereInput = {
    AND?: AddressWhereInput | AddressWhereInput[]
    OR?: AddressWhereInput[]
    NOT?: AddressWhereInput | AddressWhereInput[]
    id?: StringFilter<"Address"> | string
    ngoId?: StringNullableFilter<"Address"> | string | null
    companyId?: StringNullableFilter<"Address"> | string | null
    donorId?: StringNullableFilter<"Address"> | string | null
    line1?: StringFilter<"Address"> | string
    line2?: StringNullableFilter<"Address"> | string | null
    city?: StringFilter<"Address"> | string
    state?: StringFilter<"Address"> | string
    country?: StringFilter<"Address"> | string
    postalCode?: StringFilter<"Address"> | string
    addressType?: StringNullableFilter<"Address"> | string | null
    ngo?: XOR<NGOProfileNullableScalarRelationFilter, NGOProfileWhereInput> | null
    company?: XOR<CompanyProfileNullableScalarRelationFilter, CompanyProfileWhereInput> | null
    donor?: XOR<DonorProfileNullableScalarRelationFilter, DonorProfileWhereInput> | null
  }

  export type AddressOrderByWithRelationInput = {
    id?: SortOrder
    ngoId?: SortOrderInput | SortOrder
    companyId?: SortOrderInput | SortOrder
    donorId?: SortOrderInput | SortOrder
    line1?: SortOrder
    line2?: SortOrderInput | SortOrder
    city?: SortOrder
    state?: SortOrder
    country?: SortOrder
    postalCode?: SortOrder
    addressType?: SortOrderInput | SortOrder
    ngo?: NGOProfileOrderByWithRelationInput
    company?: CompanyProfileOrderByWithRelationInput
    donor?: DonorProfileOrderByWithRelationInput
  }

  export type AddressWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AddressWhereInput | AddressWhereInput[]
    OR?: AddressWhereInput[]
    NOT?: AddressWhereInput | AddressWhereInput[]
    ngoId?: StringNullableFilter<"Address"> | string | null
    companyId?: StringNullableFilter<"Address"> | string | null
    donorId?: StringNullableFilter<"Address"> | string | null
    line1?: StringFilter<"Address"> | string
    line2?: StringNullableFilter<"Address"> | string | null
    city?: StringFilter<"Address"> | string
    state?: StringFilter<"Address"> | string
    country?: StringFilter<"Address"> | string
    postalCode?: StringFilter<"Address"> | string
    addressType?: StringNullableFilter<"Address"> | string | null
    ngo?: XOR<NGOProfileNullableScalarRelationFilter, NGOProfileWhereInput> | null
    company?: XOR<CompanyProfileNullableScalarRelationFilter, CompanyProfileWhereInput> | null
    donor?: XOR<DonorProfileNullableScalarRelationFilter, DonorProfileWhereInput> | null
  }, "id">

  export type AddressOrderByWithAggregationInput = {
    id?: SortOrder
    ngoId?: SortOrderInput | SortOrder
    companyId?: SortOrderInput | SortOrder
    donorId?: SortOrderInput | SortOrder
    line1?: SortOrder
    line2?: SortOrderInput | SortOrder
    city?: SortOrder
    state?: SortOrder
    country?: SortOrder
    postalCode?: SortOrder
    addressType?: SortOrderInput | SortOrder
    _count?: AddressCountOrderByAggregateInput
    _max?: AddressMaxOrderByAggregateInput
    _min?: AddressMinOrderByAggregateInput
  }

  export type AddressScalarWhereWithAggregatesInput = {
    AND?: AddressScalarWhereWithAggregatesInput | AddressScalarWhereWithAggregatesInput[]
    OR?: AddressScalarWhereWithAggregatesInput[]
    NOT?: AddressScalarWhereWithAggregatesInput | AddressScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Address"> | string
    ngoId?: StringNullableWithAggregatesFilter<"Address"> | string | null
    companyId?: StringNullableWithAggregatesFilter<"Address"> | string | null
    donorId?: StringNullableWithAggregatesFilter<"Address"> | string | null
    line1?: StringWithAggregatesFilter<"Address"> | string
    line2?: StringNullableWithAggregatesFilter<"Address"> | string | null
    city?: StringWithAggregatesFilter<"Address"> | string
    state?: StringWithAggregatesFilter<"Address"> | string
    country?: StringWithAggregatesFilter<"Address"> | string
    postalCode?: StringWithAggregatesFilter<"Address"> | string
    addressType?: StringNullableWithAggregatesFilter<"Address"> | string | null
  }

  export type AuditLogWhereInput = {
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    id?: StringFilter<"AuditLog"> | string
    userId?: StringNullableFilter<"AuditLog"> | string | null
    ngoId?: StringNullableFilter<"AuditLog"> | string | null
    companyId?: StringNullableFilter<"AuditLog"> | string | null
    donorId?: StringNullableFilter<"AuditLog"> | string | null
    campaignId?: StringNullableFilter<"AuditLog"> | string | null
    donationId?: StringNullableFilter<"AuditLog"> | string | null
    action?: StringFilter<"AuditLog"> | string
    details?: JsonNullableFilter<"AuditLog">
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    ngo?: XOR<NGOProfileNullableScalarRelationFilter, NGOProfileWhereInput> | null
    company?: XOR<CompanyProfileNullableScalarRelationFilter, CompanyProfileWhereInput> | null
    donor?: XOR<DonorProfileNullableScalarRelationFilter, DonorProfileWhereInput> | null
    campaign?: XOR<CampaignNullableScalarRelationFilter, CampaignWhereInput> | null
    donation?: XOR<DonationNullableScalarRelationFilter, DonationWhereInput> | null
  }

  export type AuditLogOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    ngoId?: SortOrderInput | SortOrder
    companyId?: SortOrderInput | SortOrder
    donorId?: SortOrderInput | SortOrder
    campaignId?: SortOrderInput | SortOrder
    donationId?: SortOrderInput | SortOrder
    action?: SortOrder
    details?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    ngo?: NGOProfileOrderByWithRelationInput
    company?: CompanyProfileOrderByWithRelationInput
    donor?: DonorProfileOrderByWithRelationInput
    campaign?: CampaignOrderByWithRelationInput
    donation?: DonationOrderByWithRelationInput
  }

  export type AuditLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    userId?: StringNullableFilter<"AuditLog"> | string | null
    ngoId?: StringNullableFilter<"AuditLog"> | string | null
    companyId?: StringNullableFilter<"AuditLog"> | string | null
    donorId?: StringNullableFilter<"AuditLog"> | string | null
    campaignId?: StringNullableFilter<"AuditLog"> | string | null
    donationId?: StringNullableFilter<"AuditLog"> | string | null
    action?: StringFilter<"AuditLog"> | string
    details?: JsonNullableFilter<"AuditLog">
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    ngo?: XOR<NGOProfileNullableScalarRelationFilter, NGOProfileWhereInput> | null
    company?: XOR<CompanyProfileNullableScalarRelationFilter, CompanyProfileWhereInput> | null
    donor?: XOR<DonorProfileNullableScalarRelationFilter, DonorProfileWhereInput> | null
    campaign?: XOR<CampaignNullableScalarRelationFilter, CampaignWhereInput> | null
    donation?: XOR<DonationNullableScalarRelationFilter, DonationWhereInput> | null
  }, "id">

  export type AuditLogOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    ngoId?: SortOrderInput | SortOrder
    companyId?: SortOrderInput | SortOrder
    donorId?: SortOrderInput | SortOrder
    campaignId?: SortOrderInput | SortOrder
    donationId?: SortOrderInput | SortOrder
    action?: SortOrder
    details?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: AuditLogCountOrderByAggregateInput
    _max?: AuditLogMaxOrderByAggregateInput
    _min?: AuditLogMinOrderByAggregateInput
  }

  export type AuditLogScalarWhereWithAggregatesInput = {
    AND?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    OR?: AuditLogScalarWhereWithAggregatesInput[]
    NOT?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AuditLog"> | string
    userId?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    ngoId?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    companyId?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    donorId?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    campaignId?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    donationId?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    action?: StringWithAggregatesFilter<"AuditLog"> | string
    details?: JsonNullableWithAggregatesFilter<"AuditLog">
    createdAt?: DateTimeWithAggregatesFilter<"AuditLog"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    name: string
    email: string
    phone?: string | null
    password: string
    role: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    ngoProfile?: NGOProfileCreateNestedOneWithoutUserInput
    companyProfile?: CompanyProfileCreateNestedOneWithoutUserInput
    donorProfile?: DonorProfileCreateNestedOneWithoutUserInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name: string
    email: string
    phone?: string | null
    password: string
    role: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    ngoProfile?: NGOProfileUncheckedCreateNestedOneWithoutUserInput
    companyProfile?: CompanyProfileUncheckedCreateNestedOneWithoutUserInput
    donorProfile?: DonorProfileUncheckedCreateNestedOneWithoutUserInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ngoProfile?: NGOProfileUpdateOneWithoutUserNestedInput
    companyProfile?: CompanyProfileUpdateOneWithoutUserNestedInput
    donorProfile?: DonorProfileUpdateOneWithoutUserNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ngoProfile?: NGOProfileUncheckedUpdateOneWithoutUserNestedInput
    companyProfile?: CompanyProfileUncheckedUpdateOneWithoutUserNestedInput
    donorProfile?: DonorProfileUncheckedUpdateOneWithoutUserNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    name: string
    email: string
    phone?: string | null
    password: string
    role: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NGOProfileCreateInput = {
    id?: string
    registrationType: $Enums.NGORegistrationType
    registrationNumber: string
    founderNames: string
    yearEstablished: number
    missionStatement: string
    impactSummary?: string | null
    website?: string | null
    twelveARegistered?: boolean
    eightyGRegistered?: boolean
    csrEligibility?: boolean
    user: UserCreateNestedOneWithoutNgoProfileInput
    campaigns?: CampaignCreateNestedManyWithoutNgoInput
    bankDetails?: BankDetailCreateNestedManyWithoutNgoInput
    documents?: DocumentCreateNestedManyWithoutNgoInput
    addresses?: AddressCreateNestedManyWithoutNgoInput
    auditLogs?: AuditLogCreateNestedManyWithoutNgoInput
  }

  export type NGOProfileUncheckedCreateInput = {
    id?: string
    userId: string
    registrationType: $Enums.NGORegistrationType
    registrationNumber: string
    founderNames: string
    yearEstablished: number
    missionStatement: string
    impactSummary?: string | null
    website?: string | null
    twelveARegistered?: boolean
    eightyGRegistered?: boolean
    csrEligibility?: boolean
    campaigns?: CampaignUncheckedCreateNestedManyWithoutNgoInput
    bankDetails?: BankDetailUncheckedCreateNestedManyWithoutNgoInput
    documents?: DocumentUncheckedCreateNestedManyWithoutNgoInput
    addresses?: AddressUncheckedCreateNestedManyWithoutNgoInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutNgoInput
  }

  export type NGOProfileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    registrationType?: EnumNGORegistrationTypeFieldUpdateOperationsInput | $Enums.NGORegistrationType
    registrationNumber?: StringFieldUpdateOperationsInput | string
    founderNames?: StringFieldUpdateOperationsInput | string
    yearEstablished?: IntFieldUpdateOperationsInput | number
    missionStatement?: StringFieldUpdateOperationsInput | string
    impactSummary?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    twelveARegistered?: BoolFieldUpdateOperationsInput | boolean
    eightyGRegistered?: BoolFieldUpdateOperationsInput | boolean
    csrEligibility?: BoolFieldUpdateOperationsInput | boolean
    user?: UserUpdateOneRequiredWithoutNgoProfileNestedInput
    campaigns?: CampaignUpdateManyWithoutNgoNestedInput
    bankDetails?: BankDetailUpdateManyWithoutNgoNestedInput
    documents?: DocumentUpdateManyWithoutNgoNestedInput
    addresses?: AddressUpdateManyWithoutNgoNestedInput
    auditLogs?: AuditLogUpdateManyWithoutNgoNestedInput
  }

  export type NGOProfileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    registrationType?: EnumNGORegistrationTypeFieldUpdateOperationsInput | $Enums.NGORegistrationType
    registrationNumber?: StringFieldUpdateOperationsInput | string
    founderNames?: StringFieldUpdateOperationsInput | string
    yearEstablished?: IntFieldUpdateOperationsInput | number
    missionStatement?: StringFieldUpdateOperationsInput | string
    impactSummary?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    twelveARegistered?: BoolFieldUpdateOperationsInput | boolean
    eightyGRegistered?: BoolFieldUpdateOperationsInput | boolean
    csrEligibility?: BoolFieldUpdateOperationsInput | boolean
    campaigns?: CampaignUncheckedUpdateManyWithoutNgoNestedInput
    bankDetails?: BankDetailUncheckedUpdateManyWithoutNgoNestedInput
    documents?: DocumentUncheckedUpdateManyWithoutNgoNestedInput
    addresses?: AddressUncheckedUpdateManyWithoutNgoNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutNgoNestedInput
  }

  export type NGOProfileCreateManyInput = {
    id?: string
    userId: string
    registrationType: $Enums.NGORegistrationType
    registrationNumber: string
    founderNames: string
    yearEstablished: number
    missionStatement: string
    impactSummary?: string | null
    website?: string | null
    twelveARegistered?: boolean
    eightyGRegistered?: boolean
    csrEligibility?: boolean
  }

  export type NGOProfileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    registrationType?: EnumNGORegistrationTypeFieldUpdateOperationsInput | $Enums.NGORegistrationType
    registrationNumber?: StringFieldUpdateOperationsInput | string
    founderNames?: StringFieldUpdateOperationsInput | string
    yearEstablished?: IntFieldUpdateOperationsInput | number
    missionStatement?: StringFieldUpdateOperationsInput | string
    impactSummary?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    twelveARegistered?: BoolFieldUpdateOperationsInput | boolean
    eightyGRegistered?: BoolFieldUpdateOperationsInput | boolean
    csrEligibility?: BoolFieldUpdateOperationsInput | boolean
  }

  export type NGOProfileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    registrationType?: EnumNGORegistrationTypeFieldUpdateOperationsInput | $Enums.NGORegistrationType
    registrationNumber?: StringFieldUpdateOperationsInput | string
    founderNames?: StringFieldUpdateOperationsInput | string
    yearEstablished?: IntFieldUpdateOperationsInput | number
    missionStatement?: StringFieldUpdateOperationsInput | string
    impactSummary?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    twelveARegistered?: BoolFieldUpdateOperationsInput | boolean
    eightyGRegistered?: BoolFieldUpdateOperationsInput | boolean
    csrEligibility?: BoolFieldUpdateOperationsInput | boolean
  }

  export type CompanyProfileCreateInput = {
    id?: string
    cin: string
    csrPolicyUrl?: string | null
    industry: string
    netWorth?: number | null
    averageProfit?: number | null
    csrBudget?: number | null
    csrCommittee?: string | null
    user: UserCreateNestedOneWithoutCompanyProfileInput
    donations?: DonationCreateNestedManyWithoutCompanyInput
    documents?: DocumentCreateNestedManyWithoutCompanyInput
    bankDetails?: BankDetailCreateNestedManyWithoutCompanyInput
    addresses?: AddressCreateNestedManyWithoutCompanyInput
    auditLogs?: AuditLogCreateNestedManyWithoutCompanyInput
  }

  export type CompanyProfileUncheckedCreateInput = {
    id?: string
    userId: string
    cin: string
    csrPolicyUrl?: string | null
    industry: string
    netWorth?: number | null
    averageProfit?: number | null
    csrBudget?: number | null
    csrCommittee?: string | null
    donations?: DonationUncheckedCreateNestedManyWithoutCompanyInput
    documents?: DocumentUncheckedCreateNestedManyWithoutCompanyInput
    bankDetails?: BankDetailUncheckedCreateNestedManyWithoutCompanyInput
    addresses?: AddressUncheckedCreateNestedManyWithoutCompanyInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompanyProfileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    cin?: StringFieldUpdateOperationsInput | string
    csrPolicyUrl?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: StringFieldUpdateOperationsInput | string
    netWorth?: NullableFloatFieldUpdateOperationsInput | number | null
    averageProfit?: NullableFloatFieldUpdateOperationsInput | number | null
    csrBudget?: NullableFloatFieldUpdateOperationsInput | number | null
    csrCommittee?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutCompanyProfileNestedInput
    donations?: DonationUpdateManyWithoutCompanyNestedInput
    documents?: DocumentUpdateManyWithoutCompanyNestedInput
    bankDetails?: BankDetailUpdateManyWithoutCompanyNestedInput
    addresses?: AddressUpdateManyWithoutCompanyNestedInput
    auditLogs?: AuditLogUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyProfileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    cin?: StringFieldUpdateOperationsInput | string
    csrPolicyUrl?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: StringFieldUpdateOperationsInput | string
    netWorth?: NullableFloatFieldUpdateOperationsInput | number | null
    averageProfit?: NullableFloatFieldUpdateOperationsInput | number | null
    csrBudget?: NullableFloatFieldUpdateOperationsInput | number | null
    csrCommittee?: NullableStringFieldUpdateOperationsInput | string | null
    donations?: DonationUncheckedUpdateManyWithoutCompanyNestedInput
    documents?: DocumentUncheckedUpdateManyWithoutCompanyNestedInput
    bankDetails?: BankDetailUncheckedUpdateManyWithoutCompanyNestedInput
    addresses?: AddressUncheckedUpdateManyWithoutCompanyNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyProfileCreateManyInput = {
    id?: string
    userId: string
    cin: string
    csrPolicyUrl?: string | null
    industry: string
    netWorth?: number | null
    averageProfit?: number | null
    csrBudget?: number | null
    csrCommittee?: string | null
  }

  export type CompanyProfileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    cin?: StringFieldUpdateOperationsInput | string
    csrPolicyUrl?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: StringFieldUpdateOperationsInput | string
    netWorth?: NullableFloatFieldUpdateOperationsInput | number | null
    averageProfit?: NullableFloatFieldUpdateOperationsInput | number | null
    csrBudget?: NullableFloatFieldUpdateOperationsInput | number | null
    csrCommittee?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CompanyProfileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    cin?: StringFieldUpdateOperationsInput | string
    csrPolicyUrl?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: StringFieldUpdateOperationsInput | string
    netWorth?: NullableFloatFieldUpdateOperationsInput | number | null
    averageProfit?: NullableFloatFieldUpdateOperationsInput | number | null
    csrBudget?: NullableFloatFieldUpdateOperationsInput | number | null
    csrCommittee?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DonorProfileCreateInput = {
    id?: string
    pan?: string | null
    occupation?: string | null
    interests?: string | null
    user: UserCreateNestedOneWithoutDonorProfileInput
    donations?: DonationCreateNestedManyWithoutDonorInput
    addresses?: AddressCreateNestedManyWithoutDonorInput
    auditLogs?: AuditLogCreateNestedManyWithoutDonorInput
  }

  export type DonorProfileUncheckedCreateInput = {
    id?: string
    userId: string
    pan?: string | null
    occupation?: string | null
    interests?: string | null
    donations?: DonationUncheckedCreateNestedManyWithoutDonorInput
    addresses?: AddressUncheckedCreateNestedManyWithoutDonorInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutDonorInput
  }

  export type DonorProfileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    pan?: NullableStringFieldUpdateOperationsInput | string | null
    occupation?: NullableStringFieldUpdateOperationsInput | string | null
    interests?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutDonorProfileNestedInput
    donations?: DonationUpdateManyWithoutDonorNestedInput
    addresses?: AddressUpdateManyWithoutDonorNestedInput
    auditLogs?: AuditLogUpdateManyWithoutDonorNestedInput
  }

  export type DonorProfileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    pan?: NullableStringFieldUpdateOperationsInput | string | null
    occupation?: NullableStringFieldUpdateOperationsInput | string | null
    interests?: NullableStringFieldUpdateOperationsInput | string | null
    donations?: DonationUncheckedUpdateManyWithoutDonorNestedInput
    addresses?: AddressUncheckedUpdateManyWithoutDonorNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutDonorNestedInput
  }

  export type DonorProfileCreateManyInput = {
    id?: string
    userId: string
    pan?: string | null
    occupation?: string | null
    interests?: string | null
  }

  export type DonorProfileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    pan?: NullableStringFieldUpdateOperationsInput | string | null
    occupation?: NullableStringFieldUpdateOperationsInput | string | null
    interests?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DonorProfileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    pan?: NullableStringFieldUpdateOperationsInput | string | null
    occupation?: NullableStringFieldUpdateOperationsInput | string | null
    interests?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CampaignCreateInput = {
    id?: string
    title: string
    description: string
    category: $Enums.CampaignCategory
    goalAmount: number
    raisedAmount?: number
    startDate: Date | string
    endDate?: Date | string | null
    status: string
    ngo: NGOProfileCreateNestedOneWithoutCampaignsInput
    donations?: DonationCreateNestedManyWithoutCampaignInput
    documents?: DocumentCreateNestedManyWithoutCampaignInput
    auditLogs?: AuditLogCreateNestedManyWithoutCampaignInput
  }

  export type CampaignUncheckedCreateInput = {
    id?: string
    ngoId: string
    title: string
    description: string
    category: $Enums.CampaignCategory
    goalAmount: number
    raisedAmount?: number
    startDate: Date | string
    endDate?: Date | string | null
    status: string
    donations?: DonationUncheckedCreateNestedManyWithoutCampaignInput
    documents?: DocumentUncheckedCreateNestedManyWithoutCampaignInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutCampaignInput
  }

  export type CampaignUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: EnumCampaignCategoryFieldUpdateOperationsInput | $Enums.CampaignCategory
    goalAmount?: FloatFieldUpdateOperationsInput | number
    raisedAmount?: FloatFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    ngo?: NGOProfileUpdateOneRequiredWithoutCampaignsNestedInput
    donations?: DonationUpdateManyWithoutCampaignNestedInput
    documents?: DocumentUpdateManyWithoutCampaignNestedInput
    auditLogs?: AuditLogUpdateManyWithoutCampaignNestedInput
  }

  export type CampaignUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    ngoId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: EnumCampaignCategoryFieldUpdateOperationsInput | $Enums.CampaignCategory
    goalAmount?: FloatFieldUpdateOperationsInput | number
    raisedAmount?: FloatFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    donations?: DonationUncheckedUpdateManyWithoutCampaignNestedInput
    documents?: DocumentUncheckedUpdateManyWithoutCampaignNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutCampaignNestedInput
  }

  export type CampaignCreateManyInput = {
    id?: string
    ngoId: string
    title: string
    description: string
    category: $Enums.CampaignCategory
    goalAmount: number
    raisedAmount?: number
    startDate: Date | string
    endDate?: Date | string | null
    status: string
  }

  export type CampaignUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: EnumCampaignCategoryFieldUpdateOperationsInput | $Enums.CampaignCategory
    goalAmount?: FloatFieldUpdateOperationsInput | number
    raisedAmount?: FloatFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
  }

  export type CampaignUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    ngoId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: EnumCampaignCategoryFieldUpdateOperationsInput | $Enums.CampaignCategory
    goalAmount?: FloatFieldUpdateOperationsInput | number
    raisedAmount?: FloatFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
  }

  export type DonationCreateInput = {
    id?: string
    amount: number
    donationDate?: Date | string
    paymentRef?: string | null
    paymentMode?: string | null
    donor?: DonorProfileCreateNestedOneWithoutDonationsInput
    company?: CompanyProfileCreateNestedOneWithoutDonationsInput
    campaign: CampaignCreateNestedOneWithoutDonationsInput
    auditLogs?: AuditLogCreateNestedManyWithoutDonationInput
  }

  export type DonationUncheckedCreateInput = {
    id?: string
    donorId?: string | null
    companyId?: string | null
    campaignId: string
    amount: number
    donationDate?: Date | string
    paymentRef?: string | null
    paymentMode?: string | null
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutDonationInput
  }

  export type DonationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    donationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentRef?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMode?: NullableStringFieldUpdateOperationsInput | string | null
    donor?: DonorProfileUpdateOneWithoutDonationsNestedInput
    company?: CompanyProfileUpdateOneWithoutDonationsNestedInput
    campaign?: CampaignUpdateOneRequiredWithoutDonationsNestedInput
    auditLogs?: AuditLogUpdateManyWithoutDonationNestedInput
  }

  export type DonationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    donorId?: NullableStringFieldUpdateOperationsInput | string | null
    companyId?: NullableStringFieldUpdateOperationsInput | string | null
    campaignId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    donationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentRef?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMode?: NullableStringFieldUpdateOperationsInput | string | null
    auditLogs?: AuditLogUncheckedUpdateManyWithoutDonationNestedInput
  }

  export type DonationCreateManyInput = {
    id?: string
    donorId?: string | null
    companyId?: string | null
    campaignId: string
    amount: number
    donationDate?: Date | string
    paymentRef?: string | null
    paymentMode?: string | null
  }

  export type DonationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    donationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentRef?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMode?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DonationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    donorId?: NullableStringFieldUpdateOperationsInput | string | null
    companyId?: NullableStringFieldUpdateOperationsInput | string | null
    campaignId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    donationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentRef?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMode?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type BankDetailCreateInput = {
    id?: string
    accountHolder: string
    bankName: string
    accountNumber: string
    ifsc: string
    branch?: string | null
    ngo?: NGOProfileCreateNestedOneWithoutBankDetailsInput
    company?: CompanyProfileCreateNestedOneWithoutBankDetailsInput
  }

  export type BankDetailUncheckedCreateInput = {
    id?: string
    ngoId?: string | null
    companyId?: string | null
    accountHolder: string
    bankName: string
    accountNumber: string
    ifsc: string
    branch?: string | null
  }

  export type BankDetailUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountHolder?: StringFieldUpdateOperationsInput | string
    bankName?: StringFieldUpdateOperationsInput | string
    accountNumber?: StringFieldUpdateOperationsInput | string
    ifsc?: StringFieldUpdateOperationsInput | string
    branch?: NullableStringFieldUpdateOperationsInput | string | null
    ngo?: NGOProfileUpdateOneWithoutBankDetailsNestedInput
    company?: CompanyProfileUpdateOneWithoutBankDetailsNestedInput
  }

  export type BankDetailUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    ngoId?: NullableStringFieldUpdateOperationsInput | string | null
    companyId?: NullableStringFieldUpdateOperationsInput | string | null
    accountHolder?: StringFieldUpdateOperationsInput | string
    bankName?: StringFieldUpdateOperationsInput | string
    accountNumber?: StringFieldUpdateOperationsInput | string
    ifsc?: StringFieldUpdateOperationsInput | string
    branch?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type BankDetailCreateManyInput = {
    id?: string
    ngoId?: string | null
    companyId?: string | null
    accountHolder: string
    bankName: string
    accountNumber: string
    ifsc: string
    branch?: string | null
  }

  export type BankDetailUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountHolder?: StringFieldUpdateOperationsInput | string
    bankName?: StringFieldUpdateOperationsInput | string
    accountNumber?: StringFieldUpdateOperationsInput | string
    ifsc?: StringFieldUpdateOperationsInput | string
    branch?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type BankDetailUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    ngoId?: NullableStringFieldUpdateOperationsInput | string | null
    companyId?: NullableStringFieldUpdateOperationsInput | string | null
    accountHolder?: StringFieldUpdateOperationsInput | string
    bankName?: StringFieldUpdateOperationsInput | string
    accountNumber?: StringFieldUpdateOperationsInput | string
    ifsc?: StringFieldUpdateOperationsInput | string
    branch?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DocumentCreateInput = {
    id?: string
    type: $Enums.DocumentType
    title: string
    url: string
    uploadedAt?: Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    ngo?: NGOProfileCreateNestedOneWithoutDocumentsInput
    company?: CompanyProfileCreateNestedOneWithoutDocumentsInput
    campaign?: CampaignCreateNestedOneWithoutDocumentsInput
  }

  export type DocumentUncheckedCreateInput = {
    id?: string
    ngoId?: string | null
    companyId?: string | null
    campaignId?: string | null
    type: $Enums.DocumentType
    title: string
    url: string
    uploadedAt?: Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type DocumentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumDocumentTypeFieldUpdateOperationsInput | $Enums.DocumentType
    title?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    ngo?: NGOProfileUpdateOneWithoutDocumentsNestedInput
    company?: CompanyProfileUpdateOneWithoutDocumentsNestedInput
    campaign?: CampaignUpdateOneWithoutDocumentsNestedInput
  }

  export type DocumentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    ngoId?: NullableStringFieldUpdateOperationsInput | string | null
    companyId?: NullableStringFieldUpdateOperationsInput | string | null
    campaignId?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumDocumentTypeFieldUpdateOperationsInput | $Enums.DocumentType
    title?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type DocumentCreateManyInput = {
    id?: string
    ngoId?: string | null
    companyId?: string | null
    campaignId?: string | null
    type: $Enums.DocumentType
    title: string
    url: string
    uploadedAt?: Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type DocumentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumDocumentTypeFieldUpdateOperationsInput | $Enums.DocumentType
    title?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type DocumentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    ngoId?: NullableStringFieldUpdateOperationsInput | string | null
    companyId?: NullableStringFieldUpdateOperationsInput | string | null
    campaignId?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumDocumentTypeFieldUpdateOperationsInput | $Enums.DocumentType
    title?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type AddressCreateInput = {
    id?: string
    line1: string
    line2?: string | null
    city: string
    state: string
    country?: string
    postalCode: string
    addressType?: string | null
    ngo?: NGOProfileCreateNestedOneWithoutAddressesInput
    company?: CompanyProfileCreateNestedOneWithoutAddressesInput
    donor?: DonorProfileCreateNestedOneWithoutAddressesInput
  }

  export type AddressUncheckedCreateInput = {
    id?: string
    ngoId?: string | null
    companyId?: string | null
    donorId?: string | null
    line1: string
    line2?: string | null
    city: string
    state: string
    country?: string
    postalCode: string
    addressType?: string | null
  }

  export type AddressUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    line1?: StringFieldUpdateOperationsInput | string
    line2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    postalCode?: StringFieldUpdateOperationsInput | string
    addressType?: NullableStringFieldUpdateOperationsInput | string | null
    ngo?: NGOProfileUpdateOneWithoutAddressesNestedInput
    company?: CompanyProfileUpdateOneWithoutAddressesNestedInput
    donor?: DonorProfileUpdateOneWithoutAddressesNestedInput
  }

  export type AddressUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    ngoId?: NullableStringFieldUpdateOperationsInput | string | null
    companyId?: NullableStringFieldUpdateOperationsInput | string | null
    donorId?: NullableStringFieldUpdateOperationsInput | string | null
    line1?: StringFieldUpdateOperationsInput | string
    line2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    postalCode?: StringFieldUpdateOperationsInput | string
    addressType?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AddressCreateManyInput = {
    id?: string
    ngoId?: string | null
    companyId?: string | null
    donorId?: string | null
    line1: string
    line2?: string | null
    city: string
    state: string
    country?: string
    postalCode: string
    addressType?: string | null
  }

  export type AddressUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    line1?: StringFieldUpdateOperationsInput | string
    line2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    postalCode?: StringFieldUpdateOperationsInput | string
    addressType?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AddressUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    ngoId?: NullableStringFieldUpdateOperationsInput | string | null
    companyId?: NullableStringFieldUpdateOperationsInput | string | null
    donorId?: NullableStringFieldUpdateOperationsInput | string | null
    line1?: StringFieldUpdateOperationsInput | string
    line2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    postalCode?: StringFieldUpdateOperationsInput | string
    addressType?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AuditLogCreateInput = {
    id?: string
    action: string
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    user?: UserCreateNestedOneWithoutAuditLogsInput
    ngo?: NGOProfileCreateNestedOneWithoutAuditLogsInput
    company?: CompanyProfileCreateNestedOneWithoutAuditLogsInput
    donor?: DonorProfileCreateNestedOneWithoutAuditLogsInput
    campaign?: CampaignCreateNestedOneWithoutAuditLogsInput
    donation?: DonationCreateNestedOneWithoutAuditLogsInput
  }

  export type AuditLogUncheckedCreateInput = {
    id?: string
    userId?: string | null
    ngoId?: string | null
    companyId?: string | null
    donorId?: string | null
    campaignId?: string | null
    donationId?: string | null
    action: string
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AuditLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutAuditLogsNestedInput
    ngo?: NGOProfileUpdateOneWithoutAuditLogsNestedInput
    company?: CompanyProfileUpdateOneWithoutAuditLogsNestedInput
    donor?: DonorProfileUpdateOneWithoutAuditLogsNestedInput
    campaign?: CampaignUpdateOneWithoutAuditLogsNestedInput
    donation?: DonationUpdateOneWithoutAuditLogsNestedInput
  }

  export type AuditLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    ngoId?: NullableStringFieldUpdateOperationsInput | string | null
    companyId?: NullableStringFieldUpdateOperationsInput | string | null
    donorId?: NullableStringFieldUpdateOperationsInput | string | null
    campaignId?: NullableStringFieldUpdateOperationsInput | string | null
    donationId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateManyInput = {
    id?: string
    userId?: string | null
    ngoId?: string | null
    companyId?: string | null
    donorId?: string | null
    campaignId?: string | null
    donationId?: string | null
    action: string
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AuditLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    ngoId?: NullableStringFieldUpdateOperationsInput | string | null
    companyId?: NullableStringFieldUpdateOperationsInput | string | null
    donorId?: NullableStringFieldUpdateOperationsInput | string | null
    campaignId?: NullableStringFieldUpdateOperationsInput | string | null
    donationId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NGOProfileNullableScalarRelationFilter = {
    is?: NGOProfileWhereInput | null
    isNot?: NGOProfileWhereInput | null
  }

  export type CompanyProfileNullableScalarRelationFilter = {
    is?: CompanyProfileWhereInput | null
    isNot?: CompanyProfileWhereInput | null
  }

  export type DonorProfileNullableScalarRelationFilter = {
    is?: DonorProfileWhereInput | null
    isNot?: DonorProfileWhereInput | null
  }

  export type AuditLogListRelationFilter = {
    every?: AuditLogWhereInput
    some?: AuditLogWhereInput
    none?: AuditLogWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AuditLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumNGORegistrationTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.NGORegistrationType | EnumNGORegistrationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.NGORegistrationType[] | ListEnumNGORegistrationTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.NGORegistrationType[] | ListEnumNGORegistrationTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumNGORegistrationTypeFilter<$PrismaModel> | $Enums.NGORegistrationType
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type CampaignListRelationFilter = {
    every?: CampaignWhereInput
    some?: CampaignWhereInput
    none?: CampaignWhereInput
  }

  export type BankDetailListRelationFilter = {
    every?: BankDetailWhereInput
    some?: BankDetailWhereInput
    none?: BankDetailWhereInput
  }

  export type DocumentListRelationFilter = {
    every?: DocumentWhereInput
    some?: DocumentWhereInput
    none?: DocumentWhereInput
  }

  export type AddressListRelationFilter = {
    every?: AddressWhereInput
    some?: AddressWhereInput
    none?: AddressWhereInput
  }

  export type CampaignOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BankDetailOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DocumentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AddressOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type NGOProfileCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    registrationType?: SortOrder
    registrationNumber?: SortOrder
    founderNames?: SortOrder
    yearEstablished?: SortOrder
    missionStatement?: SortOrder
    impactSummary?: SortOrder
    website?: SortOrder
    twelveARegistered?: SortOrder
    eightyGRegistered?: SortOrder
    csrEligibility?: SortOrder
  }

  export type NGOProfileAvgOrderByAggregateInput = {
    yearEstablished?: SortOrder
  }

  export type NGOProfileMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    registrationType?: SortOrder
    registrationNumber?: SortOrder
    founderNames?: SortOrder
    yearEstablished?: SortOrder
    missionStatement?: SortOrder
    impactSummary?: SortOrder
    website?: SortOrder
    twelveARegistered?: SortOrder
    eightyGRegistered?: SortOrder
    csrEligibility?: SortOrder
  }

  export type NGOProfileMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    registrationType?: SortOrder
    registrationNumber?: SortOrder
    founderNames?: SortOrder
    yearEstablished?: SortOrder
    missionStatement?: SortOrder
    impactSummary?: SortOrder
    website?: SortOrder
    twelveARegistered?: SortOrder
    eightyGRegistered?: SortOrder
    csrEligibility?: SortOrder
  }

  export type NGOProfileSumOrderByAggregateInput = {
    yearEstablished?: SortOrder
  }

  export type EnumNGORegistrationTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NGORegistrationType | EnumNGORegistrationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.NGORegistrationType[] | ListEnumNGORegistrationTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.NGORegistrationType[] | ListEnumNGORegistrationTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumNGORegistrationTypeWithAggregatesFilter<$PrismaModel> | $Enums.NGORegistrationType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumNGORegistrationTypeFilter<$PrismaModel>
    _max?: NestedEnumNGORegistrationTypeFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type DonationListRelationFilter = {
    every?: DonationWhereInput
    some?: DonationWhereInput
    none?: DonationWhereInput
  }

  export type DonationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CompanyProfileCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    cin?: SortOrder
    csrPolicyUrl?: SortOrder
    industry?: SortOrder
    netWorth?: SortOrder
    averageProfit?: SortOrder
    csrBudget?: SortOrder
    csrCommittee?: SortOrder
  }

  export type CompanyProfileAvgOrderByAggregateInput = {
    netWorth?: SortOrder
    averageProfit?: SortOrder
    csrBudget?: SortOrder
  }

  export type CompanyProfileMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    cin?: SortOrder
    csrPolicyUrl?: SortOrder
    industry?: SortOrder
    netWorth?: SortOrder
    averageProfit?: SortOrder
    csrBudget?: SortOrder
    csrCommittee?: SortOrder
  }

  export type CompanyProfileMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    cin?: SortOrder
    csrPolicyUrl?: SortOrder
    industry?: SortOrder
    netWorth?: SortOrder
    averageProfit?: SortOrder
    csrBudget?: SortOrder
    csrCommittee?: SortOrder
  }

  export type CompanyProfileSumOrderByAggregateInput = {
    netWorth?: SortOrder
    averageProfit?: SortOrder
    csrBudget?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type DonorProfileCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    pan?: SortOrder
    occupation?: SortOrder
    interests?: SortOrder
  }

  export type DonorProfileMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    pan?: SortOrder
    occupation?: SortOrder
    interests?: SortOrder
  }

  export type DonorProfileMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    pan?: SortOrder
    occupation?: SortOrder
    interests?: SortOrder
  }

  export type EnumCampaignCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.CampaignCategory | EnumCampaignCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.CampaignCategory[] | ListEnumCampaignCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.CampaignCategory[] | ListEnumCampaignCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumCampaignCategoryFilter<$PrismaModel> | $Enums.CampaignCategory
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NGOProfileScalarRelationFilter = {
    is?: NGOProfileWhereInput
    isNot?: NGOProfileWhereInput
  }

  export type CampaignCountOrderByAggregateInput = {
    id?: SortOrder
    ngoId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    category?: SortOrder
    goalAmount?: SortOrder
    raisedAmount?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    status?: SortOrder
  }

  export type CampaignAvgOrderByAggregateInput = {
    goalAmount?: SortOrder
    raisedAmount?: SortOrder
  }

  export type CampaignMaxOrderByAggregateInput = {
    id?: SortOrder
    ngoId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    category?: SortOrder
    goalAmount?: SortOrder
    raisedAmount?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    status?: SortOrder
  }

  export type CampaignMinOrderByAggregateInput = {
    id?: SortOrder
    ngoId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    category?: SortOrder
    goalAmount?: SortOrder
    raisedAmount?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    status?: SortOrder
  }

  export type CampaignSumOrderByAggregateInput = {
    goalAmount?: SortOrder
    raisedAmount?: SortOrder
  }

  export type EnumCampaignCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CampaignCategory | EnumCampaignCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.CampaignCategory[] | ListEnumCampaignCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.CampaignCategory[] | ListEnumCampaignCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumCampaignCategoryWithAggregatesFilter<$PrismaModel> | $Enums.CampaignCategory
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCampaignCategoryFilter<$PrismaModel>
    _max?: NestedEnumCampaignCategoryFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type CampaignScalarRelationFilter = {
    is?: CampaignWhereInput
    isNot?: CampaignWhereInput
  }

  export type DonationCountOrderByAggregateInput = {
    id?: SortOrder
    donorId?: SortOrder
    companyId?: SortOrder
    campaignId?: SortOrder
    amount?: SortOrder
    donationDate?: SortOrder
    paymentRef?: SortOrder
    paymentMode?: SortOrder
  }

  export type DonationAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type DonationMaxOrderByAggregateInput = {
    id?: SortOrder
    donorId?: SortOrder
    companyId?: SortOrder
    campaignId?: SortOrder
    amount?: SortOrder
    donationDate?: SortOrder
    paymentRef?: SortOrder
    paymentMode?: SortOrder
  }

  export type DonationMinOrderByAggregateInput = {
    id?: SortOrder
    donorId?: SortOrder
    companyId?: SortOrder
    campaignId?: SortOrder
    amount?: SortOrder
    donationDate?: SortOrder
    paymentRef?: SortOrder
    paymentMode?: SortOrder
  }

  export type DonationSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type BankDetailCountOrderByAggregateInput = {
    id?: SortOrder
    ngoId?: SortOrder
    companyId?: SortOrder
    accountHolder?: SortOrder
    bankName?: SortOrder
    accountNumber?: SortOrder
    ifsc?: SortOrder
    branch?: SortOrder
  }

  export type BankDetailMaxOrderByAggregateInput = {
    id?: SortOrder
    ngoId?: SortOrder
    companyId?: SortOrder
    accountHolder?: SortOrder
    bankName?: SortOrder
    accountNumber?: SortOrder
    ifsc?: SortOrder
    branch?: SortOrder
  }

  export type BankDetailMinOrderByAggregateInput = {
    id?: SortOrder
    ngoId?: SortOrder
    companyId?: SortOrder
    accountHolder?: SortOrder
    bankName?: SortOrder
    accountNumber?: SortOrder
    ifsc?: SortOrder
    branch?: SortOrder
  }

  export type EnumDocumentTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.DocumentType | EnumDocumentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.DocumentType[] | ListEnumDocumentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.DocumentType[] | ListEnumDocumentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumDocumentTypeFilter<$PrismaModel> | $Enums.DocumentType
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type CampaignNullableScalarRelationFilter = {
    is?: CampaignWhereInput | null
    isNot?: CampaignWhereInput | null
  }

  export type DocumentCountOrderByAggregateInput = {
    id?: SortOrder
    ngoId?: SortOrder
    companyId?: SortOrder
    campaignId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    url?: SortOrder
    uploadedAt?: SortOrder
    metadata?: SortOrder
  }

  export type DocumentMaxOrderByAggregateInput = {
    id?: SortOrder
    ngoId?: SortOrder
    companyId?: SortOrder
    campaignId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    url?: SortOrder
    uploadedAt?: SortOrder
  }

  export type DocumentMinOrderByAggregateInput = {
    id?: SortOrder
    ngoId?: SortOrder
    companyId?: SortOrder
    campaignId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    url?: SortOrder
    uploadedAt?: SortOrder
  }

  export type EnumDocumentTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DocumentType | EnumDocumentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.DocumentType[] | ListEnumDocumentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.DocumentType[] | ListEnumDocumentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumDocumentTypeWithAggregatesFilter<$PrismaModel> | $Enums.DocumentType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDocumentTypeFilter<$PrismaModel>
    _max?: NestedEnumDocumentTypeFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type AddressCountOrderByAggregateInput = {
    id?: SortOrder
    ngoId?: SortOrder
    companyId?: SortOrder
    donorId?: SortOrder
    line1?: SortOrder
    line2?: SortOrder
    city?: SortOrder
    state?: SortOrder
    country?: SortOrder
    postalCode?: SortOrder
    addressType?: SortOrder
  }

  export type AddressMaxOrderByAggregateInput = {
    id?: SortOrder
    ngoId?: SortOrder
    companyId?: SortOrder
    donorId?: SortOrder
    line1?: SortOrder
    line2?: SortOrder
    city?: SortOrder
    state?: SortOrder
    country?: SortOrder
    postalCode?: SortOrder
    addressType?: SortOrder
  }

  export type AddressMinOrderByAggregateInput = {
    id?: SortOrder
    ngoId?: SortOrder
    companyId?: SortOrder
    donorId?: SortOrder
    line1?: SortOrder
    line2?: SortOrder
    city?: SortOrder
    state?: SortOrder
    country?: SortOrder
    postalCode?: SortOrder
    addressType?: SortOrder
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type DonationNullableScalarRelationFilter = {
    is?: DonationWhereInput | null
    isNot?: DonationWhereInput | null
  }

  export type AuditLogCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    ngoId?: SortOrder
    companyId?: SortOrder
    donorId?: SortOrder
    campaignId?: SortOrder
    donationId?: SortOrder
    action?: SortOrder
    details?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    ngoId?: SortOrder
    companyId?: SortOrder
    donorId?: SortOrder
    campaignId?: SortOrder
    donationId?: SortOrder
    action?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    ngoId?: SortOrder
    companyId?: SortOrder
    donorId?: SortOrder
    campaignId?: SortOrder
    donationId?: SortOrder
    action?: SortOrder
    createdAt?: SortOrder
  }

  export type NGOProfileCreateNestedOneWithoutUserInput = {
    create?: XOR<NGOProfileCreateWithoutUserInput, NGOProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: NGOProfileCreateOrConnectWithoutUserInput
    connect?: NGOProfileWhereUniqueInput
  }

  export type CompanyProfileCreateNestedOneWithoutUserInput = {
    create?: XOR<CompanyProfileCreateWithoutUserInput, CompanyProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: CompanyProfileCreateOrConnectWithoutUserInput
    connect?: CompanyProfileWhereUniqueInput
  }

  export type DonorProfileCreateNestedOneWithoutUserInput = {
    create?: XOR<DonorProfileCreateWithoutUserInput, DonorProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: DonorProfileCreateOrConnectWithoutUserInput
    connect?: DonorProfileWhereUniqueInput
  }

  export type AuditLogCreateNestedManyWithoutUserInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type NGOProfileUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<NGOProfileCreateWithoutUserInput, NGOProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: NGOProfileCreateOrConnectWithoutUserInput
    connect?: NGOProfileWhereUniqueInput
  }

  export type CompanyProfileUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<CompanyProfileCreateWithoutUserInput, CompanyProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: CompanyProfileCreateOrConnectWithoutUserInput
    connect?: CompanyProfileWhereUniqueInput
  }

  export type DonorProfileUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<DonorProfileCreateWithoutUserInput, DonorProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: DonorProfileCreateOrConnectWithoutUserInput
    connect?: DonorProfileWhereUniqueInput
  }

  export type AuditLogUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NGOProfileUpdateOneWithoutUserNestedInput = {
    create?: XOR<NGOProfileCreateWithoutUserInput, NGOProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: NGOProfileCreateOrConnectWithoutUserInput
    upsert?: NGOProfileUpsertWithoutUserInput
    disconnect?: NGOProfileWhereInput | boolean
    delete?: NGOProfileWhereInput | boolean
    connect?: NGOProfileWhereUniqueInput
    update?: XOR<XOR<NGOProfileUpdateToOneWithWhereWithoutUserInput, NGOProfileUpdateWithoutUserInput>, NGOProfileUncheckedUpdateWithoutUserInput>
  }

  export type CompanyProfileUpdateOneWithoutUserNestedInput = {
    create?: XOR<CompanyProfileCreateWithoutUserInput, CompanyProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: CompanyProfileCreateOrConnectWithoutUserInput
    upsert?: CompanyProfileUpsertWithoutUserInput
    disconnect?: CompanyProfileWhereInput | boolean
    delete?: CompanyProfileWhereInput | boolean
    connect?: CompanyProfileWhereUniqueInput
    update?: XOR<XOR<CompanyProfileUpdateToOneWithWhereWithoutUserInput, CompanyProfileUpdateWithoutUserInput>, CompanyProfileUncheckedUpdateWithoutUserInput>
  }

  export type DonorProfileUpdateOneWithoutUserNestedInput = {
    create?: XOR<DonorProfileCreateWithoutUserInput, DonorProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: DonorProfileCreateOrConnectWithoutUserInput
    upsert?: DonorProfileUpsertWithoutUserInput
    disconnect?: DonorProfileWhereInput | boolean
    delete?: DonorProfileWhereInput | boolean
    connect?: DonorProfileWhereUniqueInput
    update?: XOR<XOR<DonorProfileUpdateToOneWithWhereWithoutUserInput, DonorProfileUpdateWithoutUserInput>, DonorProfileUncheckedUpdateWithoutUserInput>
  }

  export type AuditLogUpdateManyWithoutUserNestedInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutUserInput | AuditLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutUserInput | AuditLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutUserInput | AuditLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type NGOProfileUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<NGOProfileCreateWithoutUserInput, NGOProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: NGOProfileCreateOrConnectWithoutUserInput
    upsert?: NGOProfileUpsertWithoutUserInput
    disconnect?: NGOProfileWhereInput | boolean
    delete?: NGOProfileWhereInput | boolean
    connect?: NGOProfileWhereUniqueInput
    update?: XOR<XOR<NGOProfileUpdateToOneWithWhereWithoutUserInput, NGOProfileUpdateWithoutUserInput>, NGOProfileUncheckedUpdateWithoutUserInput>
  }

  export type CompanyProfileUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<CompanyProfileCreateWithoutUserInput, CompanyProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: CompanyProfileCreateOrConnectWithoutUserInput
    upsert?: CompanyProfileUpsertWithoutUserInput
    disconnect?: CompanyProfileWhereInput | boolean
    delete?: CompanyProfileWhereInput | boolean
    connect?: CompanyProfileWhereUniqueInput
    update?: XOR<XOR<CompanyProfileUpdateToOneWithWhereWithoutUserInput, CompanyProfileUpdateWithoutUserInput>, CompanyProfileUncheckedUpdateWithoutUserInput>
  }

  export type DonorProfileUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<DonorProfileCreateWithoutUserInput, DonorProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: DonorProfileCreateOrConnectWithoutUserInput
    upsert?: DonorProfileUpsertWithoutUserInput
    disconnect?: DonorProfileWhereInput | boolean
    delete?: DonorProfileWhereInput | boolean
    connect?: DonorProfileWhereUniqueInput
    update?: XOR<XOR<DonorProfileUpdateToOneWithWhereWithoutUserInput, DonorProfileUpdateWithoutUserInput>, DonorProfileUncheckedUpdateWithoutUserInput>
  }

  export type AuditLogUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutUserInput | AuditLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutUserInput | AuditLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutUserInput | AuditLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutNgoProfileInput = {
    create?: XOR<UserCreateWithoutNgoProfileInput, UserUncheckedCreateWithoutNgoProfileInput>
    connectOrCreate?: UserCreateOrConnectWithoutNgoProfileInput
    connect?: UserWhereUniqueInput
  }

  export type CampaignCreateNestedManyWithoutNgoInput = {
    create?: XOR<CampaignCreateWithoutNgoInput, CampaignUncheckedCreateWithoutNgoInput> | CampaignCreateWithoutNgoInput[] | CampaignUncheckedCreateWithoutNgoInput[]
    connectOrCreate?: CampaignCreateOrConnectWithoutNgoInput | CampaignCreateOrConnectWithoutNgoInput[]
    createMany?: CampaignCreateManyNgoInputEnvelope
    connect?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
  }

  export type BankDetailCreateNestedManyWithoutNgoInput = {
    create?: XOR<BankDetailCreateWithoutNgoInput, BankDetailUncheckedCreateWithoutNgoInput> | BankDetailCreateWithoutNgoInput[] | BankDetailUncheckedCreateWithoutNgoInput[]
    connectOrCreate?: BankDetailCreateOrConnectWithoutNgoInput | BankDetailCreateOrConnectWithoutNgoInput[]
    createMany?: BankDetailCreateManyNgoInputEnvelope
    connect?: BankDetailWhereUniqueInput | BankDetailWhereUniqueInput[]
  }

  export type DocumentCreateNestedManyWithoutNgoInput = {
    create?: XOR<DocumentCreateWithoutNgoInput, DocumentUncheckedCreateWithoutNgoInput> | DocumentCreateWithoutNgoInput[] | DocumentUncheckedCreateWithoutNgoInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutNgoInput | DocumentCreateOrConnectWithoutNgoInput[]
    createMany?: DocumentCreateManyNgoInputEnvelope
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
  }

  export type AddressCreateNestedManyWithoutNgoInput = {
    create?: XOR<AddressCreateWithoutNgoInput, AddressUncheckedCreateWithoutNgoInput> | AddressCreateWithoutNgoInput[] | AddressUncheckedCreateWithoutNgoInput[]
    connectOrCreate?: AddressCreateOrConnectWithoutNgoInput | AddressCreateOrConnectWithoutNgoInput[]
    createMany?: AddressCreateManyNgoInputEnvelope
    connect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
  }

  export type AuditLogCreateNestedManyWithoutNgoInput = {
    create?: XOR<AuditLogCreateWithoutNgoInput, AuditLogUncheckedCreateWithoutNgoInput> | AuditLogCreateWithoutNgoInput[] | AuditLogUncheckedCreateWithoutNgoInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutNgoInput | AuditLogCreateOrConnectWithoutNgoInput[]
    createMany?: AuditLogCreateManyNgoInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type CampaignUncheckedCreateNestedManyWithoutNgoInput = {
    create?: XOR<CampaignCreateWithoutNgoInput, CampaignUncheckedCreateWithoutNgoInput> | CampaignCreateWithoutNgoInput[] | CampaignUncheckedCreateWithoutNgoInput[]
    connectOrCreate?: CampaignCreateOrConnectWithoutNgoInput | CampaignCreateOrConnectWithoutNgoInput[]
    createMany?: CampaignCreateManyNgoInputEnvelope
    connect?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
  }

  export type BankDetailUncheckedCreateNestedManyWithoutNgoInput = {
    create?: XOR<BankDetailCreateWithoutNgoInput, BankDetailUncheckedCreateWithoutNgoInput> | BankDetailCreateWithoutNgoInput[] | BankDetailUncheckedCreateWithoutNgoInput[]
    connectOrCreate?: BankDetailCreateOrConnectWithoutNgoInput | BankDetailCreateOrConnectWithoutNgoInput[]
    createMany?: BankDetailCreateManyNgoInputEnvelope
    connect?: BankDetailWhereUniqueInput | BankDetailWhereUniqueInput[]
  }

  export type DocumentUncheckedCreateNestedManyWithoutNgoInput = {
    create?: XOR<DocumentCreateWithoutNgoInput, DocumentUncheckedCreateWithoutNgoInput> | DocumentCreateWithoutNgoInput[] | DocumentUncheckedCreateWithoutNgoInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutNgoInput | DocumentCreateOrConnectWithoutNgoInput[]
    createMany?: DocumentCreateManyNgoInputEnvelope
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
  }

  export type AddressUncheckedCreateNestedManyWithoutNgoInput = {
    create?: XOR<AddressCreateWithoutNgoInput, AddressUncheckedCreateWithoutNgoInput> | AddressCreateWithoutNgoInput[] | AddressUncheckedCreateWithoutNgoInput[]
    connectOrCreate?: AddressCreateOrConnectWithoutNgoInput | AddressCreateOrConnectWithoutNgoInput[]
    createMany?: AddressCreateManyNgoInputEnvelope
    connect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
  }

  export type AuditLogUncheckedCreateNestedManyWithoutNgoInput = {
    create?: XOR<AuditLogCreateWithoutNgoInput, AuditLogUncheckedCreateWithoutNgoInput> | AuditLogCreateWithoutNgoInput[] | AuditLogUncheckedCreateWithoutNgoInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutNgoInput | AuditLogCreateOrConnectWithoutNgoInput[]
    createMany?: AuditLogCreateManyNgoInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type EnumNGORegistrationTypeFieldUpdateOperationsInput = {
    set?: $Enums.NGORegistrationType
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserUpdateOneRequiredWithoutNgoProfileNestedInput = {
    create?: XOR<UserCreateWithoutNgoProfileInput, UserUncheckedCreateWithoutNgoProfileInput>
    connectOrCreate?: UserCreateOrConnectWithoutNgoProfileInput
    upsert?: UserUpsertWithoutNgoProfileInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutNgoProfileInput, UserUpdateWithoutNgoProfileInput>, UserUncheckedUpdateWithoutNgoProfileInput>
  }

  export type CampaignUpdateManyWithoutNgoNestedInput = {
    create?: XOR<CampaignCreateWithoutNgoInput, CampaignUncheckedCreateWithoutNgoInput> | CampaignCreateWithoutNgoInput[] | CampaignUncheckedCreateWithoutNgoInput[]
    connectOrCreate?: CampaignCreateOrConnectWithoutNgoInput | CampaignCreateOrConnectWithoutNgoInput[]
    upsert?: CampaignUpsertWithWhereUniqueWithoutNgoInput | CampaignUpsertWithWhereUniqueWithoutNgoInput[]
    createMany?: CampaignCreateManyNgoInputEnvelope
    set?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
    disconnect?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
    delete?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
    connect?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
    update?: CampaignUpdateWithWhereUniqueWithoutNgoInput | CampaignUpdateWithWhereUniqueWithoutNgoInput[]
    updateMany?: CampaignUpdateManyWithWhereWithoutNgoInput | CampaignUpdateManyWithWhereWithoutNgoInput[]
    deleteMany?: CampaignScalarWhereInput | CampaignScalarWhereInput[]
  }

  export type BankDetailUpdateManyWithoutNgoNestedInput = {
    create?: XOR<BankDetailCreateWithoutNgoInput, BankDetailUncheckedCreateWithoutNgoInput> | BankDetailCreateWithoutNgoInput[] | BankDetailUncheckedCreateWithoutNgoInput[]
    connectOrCreate?: BankDetailCreateOrConnectWithoutNgoInput | BankDetailCreateOrConnectWithoutNgoInput[]
    upsert?: BankDetailUpsertWithWhereUniqueWithoutNgoInput | BankDetailUpsertWithWhereUniqueWithoutNgoInput[]
    createMany?: BankDetailCreateManyNgoInputEnvelope
    set?: BankDetailWhereUniqueInput | BankDetailWhereUniqueInput[]
    disconnect?: BankDetailWhereUniqueInput | BankDetailWhereUniqueInput[]
    delete?: BankDetailWhereUniqueInput | BankDetailWhereUniqueInput[]
    connect?: BankDetailWhereUniqueInput | BankDetailWhereUniqueInput[]
    update?: BankDetailUpdateWithWhereUniqueWithoutNgoInput | BankDetailUpdateWithWhereUniqueWithoutNgoInput[]
    updateMany?: BankDetailUpdateManyWithWhereWithoutNgoInput | BankDetailUpdateManyWithWhereWithoutNgoInput[]
    deleteMany?: BankDetailScalarWhereInput | BankDetailScalarWhereInput[]
  }

  export type DocumentUpdateManyWithoutNgoNestedInput = {
    create?: XOR<DocumentCreateWithoutNgoInput, DocumentUncheckedCreateWithoutNgoInput> | DocumentCreateWithoutNgoInput[] | DocumentUncheckedCreateWithoutNgoInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutNgoInput | DocumentCreateOrConnectWithoutNgoInput[]
    upsert?: DocumentUpsertWithWhereUniqueWithoutNgoInput | DocumentUpsertWithWhereUniqueWithoutNgoInput[]
    createMany?: DocumentCreateManyNgoInputEnvelope
    set?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    disconnect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    delete?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    update?: DocumentUpdateWithWhereUniqueWithoutNgoInput | DocumentUpdateWithWhereUniqueWithoutNgoInput[]
    updateMany?: DocumentUpdateManyWithWhereWithoutNgoInput | DocumentUpdateManyWithWhereWithoutNgoInput[]
    deleteMany?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
  }

  export type AddressUpdateManyWithoutNgoNestedInput = {
    create?: XOR<AddressCreateWithoutNgoInput, AddressUncheckedCreateWithoutNgoInput> | AddressCreateWithoutNgoInput[] | AddressUncheckedCreateWithoutNgoInput[]
    connectOrCreate?: AddressCreateOrConnectWithoutNgoInput | AddressCreateOrConnectWithoutNgoInput[]
    upsert?: AddressUpsertWithWhereUniqueWithoutNgoInput | AddressUpsertWithWhereUniqueWithoutNgoInput[]
    createMany?: AddressCreateManyNgoInputEnvelope
    set?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    disconnect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    delete?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    connect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    update?: AddressUpdateWithWhereUniqueWithoutNgoInput | AddressUpdateWithWhereUniqueWithoutNgoInput[]
    updateMany?: AddressUpdateManyWithWhereWithoutNgoInput | AddressUpdateManyWithWhereWithoutNgoInput[]
    deleteMany?: AddressScalarWhereInput | AddressScalarWhereInput[]
  }

  export type AuditLogUpdateManyWithoutNgoNestedInput = {
    create?: XOR<AuditLogCreateWithoutNgoInput, AuditLogUncheckedCreateWithoutNgoInput> | AuditLogCreateWithoutNgoInput[] | AuditLogUncheckedCreateWithoutNgoInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutNgoInput | AuditLogCreateOrConnectWithoutNgoInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutNgoInput | AuditLogUpsertWithWhereUniqueWithoutNgoInput[]
    createMany?: AuditLogCreateManyNgoInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutNgoInput | AuditLogUpdateWithWhereUniqueWithoutNgoInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutNgoInput | AuditLogUpdateManyWithWhereWithoutNgoInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type CampaignUncheckedUpdateManyWithoutNgoNestedInput = {
    create?: XOR<CampaignCreateWithoutNgoInput, CampaignUncheckedCreateWithoutNgoInput> | CampaignCreateWithoutNgoInput[] | CampaignUncheckedCreateWithoutNgoInput[]
    connectOrCreate?: CampaignCreateOrConnectWithoutNgoInput | CampaignCreateOrConnectWithoutNgoInput[]
    upsert?: CampaignUpsertWithWhereUniqueWithoutNgoInput | CampaignUpsertWithWhereUniqueWithoutNgoInput[]
    createMany?: CampaignCreateManyNgoInputEnvelope
    set?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
    disconnect?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
    delete?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
    connect?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
    update?: CampaignUpdateWithWhereUniqueWithoutNgoInput | CampaignUpdateWithWhereUniqueWithoutNgoInput[]
    updateMany?: CampaignUpdateManyWithWhereWithoutNgoInput | CampaignUpdateManyWithWhereWithoutNgoInput[]
    deleteMany?: CampaignScalarWhereInput | CampaignScalarWhereInput[]
  }

  export type BankDetailUncheckedUpdateManyWithoutNgoNestedInput = {
    create?: XOR<BankDetailCreateWithoutNgoInput, BankDetailUncheckedCreateWithoutNgoInput> | BankDetailCreateWithoutNgoInput[] | BankDetailUncheckedCreateWithoutNgoInput[]
    connectOrCreate?: BankDetailCreateOrConnectWithoutNgoInput | BankDetailCreateOrConnectWithoutNgoInput[]
    upsert?: BankDetailUpsertWithWhereUniqueWithoutNgoInput | BankDetailUpsertWithWhereUniqueWithoutNgoInput[]
    createMany?: BankDetailCreateManyNgoInputEnvelope
    set?: BankDetailWhereUniqueInput | BankDetailWhereUniqueInput[]
    disconnect?: BankDetailWhereUniqueInput | BankDetailWhereUniqueInput[]
    delete?: BankDetailWhereUniqueInput | BankDetailWhereUniqueInput[]
    connect?: BankDetailWhereUniqueInput | BankDetailWhereUniqueInput[]
    update?: BankDetailUpdateWithWhereUniqueWithoutNgoInput | BankDetailUpdateWithWhereUniqueWithoutNgoInput[]
    updateMany?: BankDetailUpdateManyWithWhereWithoutNgoInput | BankDetailUpdateManyWithWhereWithoutNgoInput[]
    deleteMany?: BankDetailScalarWhereInput | BankDetailScalarWhereInput[]
  }

  export type DocumentUncheckedUpdateManyWithoutNgoNestedInput = {
    create?: XOR<DocumentCreateWithoutNgoInput, DocumentUncheckedCreateWithoutNgoInput> | DocumentCreateWithoutNgoInput[] | DocumentUncheckedCreateWithoutNgoInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutNgoInput | DocumentCreateOrConnectWithoutNgoInput[]
    upsert?: DocumentUpsertWithWhereUniqueWithoutNgoInput | DocumentUpsertWithWhereUniqueWithoutNgoInput[]
    createMany?: DocumentCreateManyNgoInputEnvelope
    set?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    disconnect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    delete?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    update?: DocumentUpdateWithWhereUniqueWithoutNgoInput | DocumentUpdateWithWhereUniqueWithoutNgoInput[]
    updateMany?: DocumentUpdateManyWithWhereWithoutNgoInput | DocumentUpdateManyWithWhereWithoutNgoInput[]
    deleteMany?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
  }

  export type AddressUncheckedUpdateManyWithoutNgoNestedInput = {
    create?: XOR<AddressCreateWithoutNgoInput, AddressUncheckedCreateWithoutNgoInput> | AddressCreateWithoutNgoInput[] | AddressUncheckedCreateWithoutNgoInput[]
    connectOrCreate?: AddressCreateOrConnectWithoutNgoInput | AddressCreateOrConnectWithoutNgoInput[]
    upsert?: AddressUpsertWithWhereUniqueWithoutNgoInput | AddressUpsertWithWhereUniqueWithoutNgoInput[]
    createMany?: AddressCreateManyNgoInputEnvelope
    set?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    disconnect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    delete?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    connect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    update?: AddressUpdateWithWhereUniqueWithoutNgoInput | AddressUpdateWithWhereUniqueWithoutNgoInput[]
    updateMany?: AddressUpdateManyWithWhereWithoutNgoInput | AddressUpdateManyWithWhereWithoutNgoInput[]
    deleteMany?: AddressScalarWhereInput | AddressScalarWhereInput[]
  }

  export type AuditLogUncheckedUpdateManyWithoutNgoNestedInput = {
    create?: XOR<AuditLogCreateWithoutNgoInput, AuditLogUncheckedCreateWithoutNgoInput> | AuditLogCreateWithoutNgoInput[] | AuditLogUncheckedCreateWithoutNgoInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutNgoInput | AuditLogCreateOrConnectWithoutNgoInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutNgoInput | AuditLogUpsertWithWhereUniqueWithoutNgoInput[]
    createMany?: AuditLogCreateManyNgoInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutNgoInput | AuditLogUpdateWithWhereUniqueWithoutNgoInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutNgoInput | AuditLogUpdateManyWithWhereWithoutNgoInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutCompanyProfileInput = {
    create?: XOR<UserCreateWithoutCompanyProfileInput, UserUncheckedCreateWithoutCompanyProfileInput>
    connectOrCreate?: UserCreateOrConnectWithoutCompanyProfileInput
    connect?: UserWhereUniqueInput
  }

  export type DonationCreateNestedManyWithoutCompanyInput = {
    create?: XOR<DonationCreateWithoutCompanyInput, DonationUncheckedCreateWithoutCompanyInput> | DonationCreateWithoutCompanyInput[] | DonationUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: DonationCreateOrConnectWithoutCompanyInput | DonationCreateOrConnectWithoutCompanyInput[]
    createMany?: DonationCreateManyCompanyInputEnvelope
    connect?: DonationWhereUniqueInput | DonationWhereUniqueInput[]
  }

  export type DocumentCreateNestedManyWithoutCompanyInput = {
    create?: XOR<DocumentCreateWithoutCompanyInput, DocumentUncheckedCreateWithoutCompanyInput> | DocumentCreateWithoutCompanyInput[] | DocumentUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutCompanyInput | DocumentCreateOrConnectWithoutCompanyInput[]
    createMany?: DocumentCreateManyCompanyInputEnvelope
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
  }

  export type BankDetailCreateNestedManyWithoutCompanyInput = {
    create?: XOR<BankDetailCreateWithoutCompanyInput, BankDetailUncheckedCreateWithoutCompanyInput> | BankDetailCreateWithoutCompanyInput[] | BankDetailUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: BankDetailCreateOrConnectWithoutCompanyInput | BankDetailCreateOrConnectWithoutCompanyInput[]
    createMany?: BankDetailCreateManyCompanyInputEnvelope
    connect?: BankDetailWhereUniqueInput | BankDetailWhereUniqueInput[]
  }

  export type AddressCreateNestedManyWithoutCompanyInput = {
    create?: XOR<AddressCreateWithoutCompanyInput, AddressUncheckedCreateWithoutCompanyInput> | AddressCreateWithoutCompanyInput[] | AddressUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: AddressCreateOrConnectWithoutCompanyInput | AddressCreateOrConnectWithoutCompanyInput[]
    createMany?: AddressCreateManyCompanyInputEnvelope
    connect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
  }

  export type AuditLogCreateNestedManyWithoutCompanyInput = {
    create?: XOR<AuditLogCreateWithoutCompanyInput, AuditLogUncheckedCreateWithoutCompanyInput> | AuditLogCreateWithoutCompanyInput[] | AuditLogUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutCompanyInput | AuditLogCreateOrConnectWithoutCompanyInput[]
    createMany?: AuditLogCreateManyCompanyInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type DonationUncheckedCreateNestedManyWithoutCompanyInput = {
    create?: XOR<DonationCreateWithoutCompanyInput, DonationUncheckedCreateWithoutCompanyInput> | DonationCreateWithoutCompanyInput[] | DonationUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: DonationCreateOrConnectWithoutCompanyInput | DonationCreateOrConnectWithoutCompanyInput[]
    createMany?: DonationCreateManyCompanyInputEnvelope
    connect?: DonationWhereUniqueInput | DonationWhereUniqueInput[]
  }

  export type DocumentUncheckedCreateNestedManyWithoutCompanyInput = {
    create?: XOR<DocumentCreateWithoutCompanyInput, DocumentUncheckedCreateWithoutCompanyInput> | DocumentCreateWithoutCompanyInput[] | DocumentUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutCompanyInput | DocumentCreateOrConnectWithoutCompanyInput[]
    createMany?: DocumentCreateManyCompanyInputEnvelope
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
  }

  export type BankDetailUncheckedCreateNestedManyWithoutCompanyInput = {
    create?: XOR<BankDetailCreateWithoutCompanyInput, BankDetailUncheckedCreateWithoutCompanyInput> | BankDetailCreateWithoutCompanyInput[] | BankDetailUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: BankDetailCreateOrConnectWithoutCompanyInput | BankDetailCreateOrConnectWithoutCompanyInput[]
    createMany?: BankDetailCreateManyCompanyInputEnvelope
    connect?: BankDetailWhereUniqueInput | BankDetailWhereUniqueInput[]
  }

  export type AddressUncheckedCreateNestedManyWithoutCompanyInput = {
    create?: XOR<AddressCreateWithoutCompanyInput, AddressUncheckedCreateWithoutCompanyInput> | AddressCreateWithoutCompanyInput[] | AddressUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: AddressCreateOrConnectWithoutCompanyInput | AddressCreateOrConnectWithoutCompanyInput[]
    createMany?: AddressCreateManyCompanyInputEnvelope
    connect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
  }

  export type AuditLogUncheckedCreateNestedManyWithoutCompanyInput = {
    create?: XOR<AuditLogCreateWithoutCompanyInput, AuditLogUncheckedCreateWithoutCompanyInput> | AuditLogCreateWithoutCompanyInput[] | AuditLogUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutCompanyInput | AuditLogCreateOrConnectWithoutCompanyInput[]
    createMany?: AuditLogCreateManyCompanyInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutCompanyProfileNestedInput = {
    create?: XOR<UserCreateWithoutCompanyProfileInput, UserUncheckedCreateWithoutCompanyProfileInput>
    connectOrCreate?: UserCreateOrConnectWithoutCompanyProfileInput
    upsert?: UserUpsertWithoutCompanyProfileInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCompanyProfileInput, UserUpdateWithoutCompanyProfileInput>, UserUncheckedUpdateWithoutCompanyProfileInput>
  }

  export type DonationUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<DonationCreateWithoutCompanyInput, DonationUncheckedCreateWithoutCompanyInput> | DonationCreateWithoutCompanyInput[] | DonationUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: DonationCreateOrConnectWithoutCompanyInput | DonationCreateOrConnectWithoutCompanyInput[]
    upsert?: DonationUpsertWithWhereUniqueWithoutCompanyInput | DonationUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: DonationCreateManyCompanyInputEnvelope
    set?: DonationWhereUniqueInput | DonationWhereUniqueInput[]
    disconnect?: DonationWhereUniqueInput | DonationWhereUniqueInput[]
    delete?: DonationWhereUniqueInput | DonationWhereUniqueInput[]
    connect?: DonationWhereUniqueInput | DonationWhereUniqueInput[]
    update?: DonationUpdateWithWhereUniqueWithoutCompanyInput | DonationUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: DonationUpdateManyWithWhereWithoutCompanyInput | DonationUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: DonationScalarWhereInput | DonationScalarWhereInput[]
  }

  export type DocumentUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<DocumentCreateWithoutCompanyInput, DocumentUncheckedCreateWithoutCompanyInput> | DocumentCreateWithoutCompanyInput[] | DocumentUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutCompanyInput | DocumentCreateOrConnectWithoutCompanyInput[]
    upsert?: DocumentUpsertWithWhereUniqueWithoutCompanyInput | DocumentUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: DocumentCreateManyCompanyInputEnvelope
    set?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    disconnect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    delete?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    update?: DocumentUpdateWithWhereUniqueWithoutCompanyInput | DocumentUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: DocumentUpdateManyWithWhereWithoutCompanyInput | DocumentUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
  }

  export type BankDetailUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<BankDetailCreateWithoutCompanyInput, BankDetailUncheckedCreateWithoutCompanyInput> | BankDetailCreateWithoutCompanyInput[] | BankDetailUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: BankDetailCreateOrConnectWithoutCompanyInput | BankDetailCreateOrConnectWithoutCompanyInput[]
    upsert?: BankDetailUpsertWithWhereUniqueWithoutCompanyInput | BankDetailUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: BankDetailCreateManyCompanyInputEnvelope
    set?: BankDetailWhereUniqueInput | BankDetailWhereUniqueInput[]
    disconnect?: BankDetailWhereUniqueInput | BankDetailWhereUniqueInput[]
    delete?: BankDetailWhereUniqueInput | BankDetailWhereUniqueInput[]
    connect?: BankDetailWhereUniqueInput | BankDetailWhereUniqueInput[]
    update?: BankDetailUpdateWithWhereUniqueWithoutCompanyInput | BankDetailUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: BankDetailUpdateManyWithWhereWithoutCompanyInput | BankDetailUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: BankDetailScalarWhereInput | BankDetailScalarWhereInput[]
  }

  export type AddressUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<AddressCreateWithoutCompanyInput, AddressUncheckedCreateWithoutCompanyInput> | AddressCreateWithoutCompanyInput[] | AddressUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: AddressCreateOrConnectWithoutCompanyInput | AddressCreateOrConnectWithoutCompanyInput[]
    upsert?: AddressUpsertWithWhereUniqueWithoutCompanyInput | AddressUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: AddressCreateManyCompanyInputEnvelope
    set?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    disconnect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    delete?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    connect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    update?: AddressUpdateWithWhereUniqueWithoutCompanyInput | AddressUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: AddressUpdateManyWithWhereWithoutCompanyInput | AddressUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: AddressScalarWhereInput | AddressScalarWhereInput[]
  }

  export type AuditLogUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<AuditLogCreateWithoutCompanyInput, AuditLogUncheckedCreateWithoutCompanyInput> | AuditLogCreateWithoutCompanyInput[] | AuditLogUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutCompanyInput | AuditLogCreateOrConnectWithoutCompanyInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutCompanyInput | AuditLogUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: AuditLogCreateManyCompanyInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutCompanyInput | AuditLogUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutCompanyInput | AuditLogUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type DonationUncheckedUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<DonationCreateWithoutCompanyInput, DonationUncheckedCreateWithoutCompanyInput> | DonationCreateWithoutCompanyInput[] | DonationUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: DonationCreateOrConnectWithoutCompanyInput | DonationCreateOrConnectWithoutCompanyInput[]
    upsert?: DonationUpsertWithWhereUniqueWithoutCompanyInput | DonationUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: DonationCreateManyCompanyInputEnvelope
    set?: DonationWhereUniqueInput | DonationWhereUniqueInput[]
    disconnect?: DonationWhereUniqueInput | DonationWhereUniqueInput[]
    delete?: DonationWhereUniqueInput | DonationWhereUniqueInput[]
    connect?: DonationWhereUniqueInput | DonationWhereUniqueInput[]
    update?: DonationUpdateWithWhereUniqueWithoutCompanyInput | DonationUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: DonationUpdateManyWithWhereWithoutCompanyInput | DonationUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: DonationScalarWhereInput | DonationScalarWhereInput[]
  }

  export type DocumentUncheckedUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<DocumentCreateWithoutCompanyInput, DocumentUncheckedCreateWithoutCompanyInput> | DocumentCreateWithoutCompanyInput[] | DocumentUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutCompanyInput | DocumentCreateOrConnectWithoutCompanyInput[]
    upsert?: DocumentUpsertWithWhereUniqueWithoutCompanyInput | DocumentUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: DocumentCreateManyCompanyInputEnvelope
    set?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    disconnect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    delete?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    update?: DocumentUpdateWithWhereUniqueWithoutCompanyInput | DocumentUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: DocumentUpdateManyWithWhereWithoutCompanyInput | DocumentUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
  }

  export type BankDetailUncheckedUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<BankDetailCreateWithoutCompanyInput, BankDetailUncheckedCreateWithoutCompanyInput> | BankDetailCreateWithoutCompanyInput[] | BankDetailUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: BankDetailCreateOrConnectWithoutCompanyInput | BankDetailCreateOrConnectWithoutCompanyInput[]
    upsert?: BankDetailUpsertWithWhereUniqueWithoutCompanyInput | BankDetailUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: BankDetailCreateManyCompanyInputEnvelope
    set?: BankDetailWhereUniqueInput | BankDetailWhereUniqueInput[]
    disconnect?: BankDetailWhereUniqueInput | BankDetailWhereUniqueInput[]
    delete?: BankDetailWhereUniqueInput | BankDetailWhereUniqueInput[]
    connect?: BankDetailWhereUniqueInput | BankDetailWhereUniqueInput[]
    update?: BankDetailUpdateWithWhereUniqueWithoutCompanyInput | BankDetailUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: BankDetailUpdateManyWithWhereWithoutCompanyInput | BankDetailUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: BankDetailScalarWhereInput | BankDetailScalarWhereInput[]
  }

  export type AddressUncheckedUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<AddressCreateWithoutCompanyInput, AddressUncheckedCreateWithoutCompanyInput> | AddressCreateWithoutCompanyInput[] | AddressUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: AddressCreateOrConnectWithoutCompanyInput | AddressCreateOrConnectWithoutCompanyInput[]
    upsert?: AddressUpsertWithWhereUniqueWithoutCompanyInput | AddressUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: AddressCreateManyCompanyInputEnvelope
    set?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    disconnect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    delete?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    connect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    update?: AddressUpdateWithWhereUniqueWithoutCompanyInput | AddressUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: AddressUpdateManyWithWhereWithoutCompanyInput | AddressUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: AddressScalarWhereInput | AddressScalarWhereInput[]
  }

  export type AuditLogUncheckedUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<AuditLogCreateWithoutCompanyInput, AuditLogUncheckedCreateWithoutCompanyInput> | AuditLogCreateWithoutCompanyInput[] | AuditLogUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutCompanyInput | AuditLogCreateOrConnectWithoutCompanyInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutCompanyInput | AuditLogUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: AuditLogCreateManyCompanyInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutCompanyInput | AuditLogUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutCompanyInput | AuditLogUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutDonorProfileInput = {
    create?: XOR<UserCreateWithoutDonorProfileInput, UserUncheckedCreateWithoutDonorProfileInput>
    connectOrCreate?: UserCreateOrConnectWithoutDonorProfileInput
    connect?: UserWhereUniqueInput
  }

  export type DonationCreateNestedManyWithoutDonorInput = {
    create?: XOR<DonationCreateWithoutDonorInput, DonationUncheckedCreateWithoutDonorInput> | DonationCreateWithoutDonorInput[] | DonationUncheckedCreateWithoutDonorInput[]
    connectOrCreate?: DonationCreateOrConnectWithoutDonorInput | DonationCreateOrConnectWithoutDonorInput[]
    createMany?: DonationCreateManyDonorInputEnvelope
    connect?: DonationWhereUniqueInput | DonationWhereUniqueInput[]
  }

  export type AddressCreateNestedManyWithoutDonorInput = {
    create?: XOR<AddressCreateWithoutDonorInput, AddressUncheckedCreateWithoutDonorInput> | AddressCreateWithoutDonorInput[] | AddressUncheckedCreateWithoutDonorInput[]
    connectOrCreate?: AddressCreateOrConnectWithoutDonorInput | AddressCreateOrConnectWithoutDonorInput[]
    createMany?: AddressCreateManyDonorInputEnvelope
    connect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
  }

  export type AuditLogCreateNestedManyWithoutDonorInput = {
    create?: XOR<AuditLogCreateWithoutDonorInput, AuditLogUncheckedCreateWithoutDonorInput> | AuditLogCreateWithoutDonorInput[] | AuditLogUncheckedCreateWithoutDonorInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutDonorInput | AuditLogCreateOrConnectWithoutDonorInput[]
    createMany?: AuditLogCreateManyDonorInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type DonationUncheckedCreateNestedManyWithoutDonorInput = {
    create?: XOR<DonationCreateWithoutDonorInput, DonationUncheckedCreateWithoutDonorInput> | DonationCreateWithoutDonorInput[] | DonationUncheckedCreateWithoutDonorInput[]
    connectOrCreate?: DonationCreateOrConnectWithoutDonorInput | DonationCreateOrConnectWithoutDonorInput[]
    createMany?: DonationCreateManyDonorInputEnvelope
    connect?: DonationWhereUniqueInput | DonationWhereUniqueInput[]
  }

  export type AddressUncheckedCreateNestedManyWithoutDonorInput = {
    create?: XOR<AddressCreateWithoutDonorInput, AddressUncheckedCreateWithoutDonorInput> | AddressCreateWithoutDonorInput[] | AddressUncheckedCreateWithoutDonorInput[]
    connectOrCreate?: AddressCreateOrConnectWithoutDonorInput | AddressCreateOrConnectWithoutDonorInput[]
    createMany?: AddressCreateManyDonorInputEnvelope
    connect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
  }

  export type AuditLogUncheckedCreateNestedManyWithoutDonorInput = {
    create?: XOR<AuditLogCreateWithoutDonorInput, AuditLogUncheckedCreateWithoutDonorInput> | AuditLogCreateWithoutDonorInput[] | AuditLogUncheckedCreateWithoutDonorInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutDonorInput | AuditLogCreateOrConnectWithoutDonorInput[]
    createMany?: AuditLogCreateManyDonorInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutDonorProfileNestedInput = {
    create?: XOR<UserCreateWithoutDonorProfileInput, UserUncheckedCreateWithoutDonorProfileInput>
    connectOrCreate?: UserCreateOrConnectWithoutDonorProfileInput
    upsert?: UserUpsertWithoutDonorProfileInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutDonorProfileInput, UserUpdateWithoutDonorProfileInput>, UserUncheckedUpdateWithoutDonorProfileInput>
  }

  export type DonationUpdateManyWithoutDonorNestedInput = {
    create?: XOR<DonationCreateWithoutDonorInput, DonationUncheckedCreateWithoutDonorInput> | DonationCreateWithoutDonorInput[] | DonationUncheckedCreateWithoutDonorInput[]
    connectOrCreate?: DonationCreateOrConnectWithoutDonorInput | DonationCreateOrConnectWithoutDonorInput[]
    upsert?: DonationUpsertWithWhereUniqueWithoutDonorInput | DonationUpsertWithWhereUniqueWithoutDonorInput[]
    createMany?: DonationCreateManyDonorInputEnvelope
    set?: DonationWhereUniqueInput | DonationWhereUniqueInput[]
    disconnect?: DonationWhereUniqueInput | DonationWhereUniqueInput[]
    delete?: DonationWhereUniqueInput | DonationWhereUniqueInput[]
    connect?: DonationWhereUniqueInput | DonationWhereUniqueInput[]
    update?: DonationUpdateWithWhereUniqueWithoutDonorInput | DonationUpdateWithWhereUniqueWithoutDonorInput[]
    updateMany?: DonationUpdateManyWithWhereWithoutDonorInput | DonationUpdateManyWithWhereWithoutDonorInput[]
    deleteMany?: DonationScalarWhereInput | DonationScalarWhereInput[]
  }

  export type AddressUpdateManyWithoutDonorNestedInput = {
    create?: XOR<AddressCreateWithoutDonorInput, AddressUncheckedCreateWithoutDonorInput> | AddressCreateWithoutDonorInput[] | AddressUncheckedCreateWithoutDonorInput[]
    connectOrCreate?: AddressCreateOrConnectWithoutDonorInput | AddressCreateOrConnectWithoutDonorInput[]
    upsert?: AddressUpsertWithWhereUniqueWithoutDonorInput | AddressUpsertWithWhereUniqueWithoutDonorInput[]
    createMany?: AddressCreateManyDonorInputEnvelope
    set?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    disconnect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    delete?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    connect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    update?: AddressUpdateWithWhereUniqueWithoutDonorInput | AddressUpdateWithWhereUniqueWithoutDonorInput[]
    updateMany?: AddressUpdateManyWithWhereWithoutDonorInput | AddressUpdateManyWithWhereWithoutDonorInput[]
    deleteMany?: AddressScalarWhereInput | AddressScalarWhereInput[]
  }

  export type AuditLogUpdateManyWithoutDonorNestedInput = {
    create?: XOR<AuditLogCreateWithoutDonorInput, AuditLogUncheckedCreateWithoutDonorInput> | AuditLogCreateWithoutDonorInput[] | AuditLogUncheckedCreateWithoutDonorInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutDonorInput | AuditLogCreateOrConnectWithoutDonorInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutDonorInput | AuditLogUpsertWithWhereUniqueWithoutDonorInput[]
    createMany?: AuditLogCreateManyDonorInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutDonorInput | AuditLogUpdateWithWhereUniqueWithoutDonorInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutDonorInput | AuditLogUpdateManyWithWhereWithoutDonorInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type DonationUncheckedUpdateManyWithoutDonorNestedInput = {
    create?: XOR<DonationCreateWithoutDonorInput, DonationUncheckedCreateWithoutDonorInput> | DonationCreateWithoutDonorInput[] | DonationUncheckedCreateWithoutDonorInput[]
    connectOrCreate?: DonationCreateOrConnectWithoutDonorInput | DonationCreateOrConnectWithoutDonorInput[]
    upsert?: DonationUpsertWithWhereUniqueWithoutDonorInput | DonationUpsertWithWhereUniqueWithoutDonorInput[]
    createMany?: DonationCreateManyDonorInputEnvelope
    set?: DonationWhereUniqueInput | DonationWhereUniqueInput[]
    disconnect?: DonationWhereUniqueInput | DonationWhereUniqueInput[]
    delete?: DonationWhereUniqueInput | DonationWhereUniqueInput[]
    connect?: DonationWhereUniqueInput | DonationWhereUniqueInput[]
    update?: DonationUpdateWithWhereUniqueWithoutDonorInput | DonationUpdateWithWhereUniqueWithoutDonorInput[]
    updateMany?: DonationUpdateManyWithWhereWithoutDonorInput | DonationUpdateManyWithWhereWithoutDonorInput[]
    deleteMany?: DonationScalarWhereInput | DonationScalarWhereInput[]
  }

  export type AddressUncheckedUpdateManyWithoutDonorNestedInput = {
    create?: XOR<AddressCreateWithoutDonorInput, AddressUncheckedCreateWithoutDonorInput> | AddressCreateWithoutDonorInput[] | AddressUncheckedCreateWithoutDonorInput[]
    connectOrCreate?: AddressCreateOrConnectWithoutDonorInput | AddressCreateOrConnectWithoutDonorInput[]
    upsert?: AddressUpsertWithWhereUniqueWithoutDonorInput | AddressUpsertWithWhereUniqueWithoutDonorInput[]
    createMany?: AddressCreateManyDonorInputEnvelope
    set?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    disconnect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    delete?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    connect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    update?: AddressUpdateWithWhereUniqueWithoutDonorInput | AddressUpdateWithWhereUniqueWithoutDonorInput[]
    updateMany?: AddressUpdateManyWithWhereWithoutDonorInput | AddressUpdateManyWithWhereWithoutDonorInput[]
    deleteMany?: AddressScalarWhereInput | AddressScalarWhereInput[]
  }

  export type AuditLogUncheckedUpdateManyWithoutDonorNestedInput = {
    create?: XOR<AuditLogCreateWithoutDonorInput, AuditLogUncheckedCreateWithoutDonorInput> | AuditLogCreateWithoutDonorInput[] | AuditLogUncheckedCreateWithoutDonorInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutDonorInput | AuditLogCreateOrConnectWithoutDonorInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutDonorInput | AuditLogUpsertWithWhereUniqueWithoutDonorInput[]
    createMany?: AuditLogCreateManyDonorInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutDonorInput | AuditLogUpdateWithWhereUniqueWithoutDonorInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutDonorInput | AuditLogUpdateManyWithWhereWithoutDonorInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type NGOProfileCreateNestedOneWithoutCampaignsInput = {
    create?: XOR<NGOProfileCreateWithoutCampaignsInput, NGOProfileUncheckedCreateWithoutCampaignsInput>
    connectOrCreate?: NGOProfileCreateOrConnectWithoutCampaignsInput
    connect?: NGOProfileWhereUniqueInput
  }

  export type DonationCreateNestedManyWithoutCampaignInput = {
    create?: XOR<DonationCreateWithoutCampaignInput, DonationUncheckedCreateWithoutCampaignInput> | DonationCreateWithoutCampaignInput[] | DonationUncheckedCreateWithoutCampaignInput[]
    connectOrCreate?: DonationCreateOrConnectWithoutCampaignInput | DonationCreateOrConnectWithoutCampaignInput[]
    createMany?: DonationCreateManyCampaignInputEnvelope
    connect?: DonationWhereUniqueInput | DonationWhereUniqueInput[]
  }

  export type DocumentCreateNestedManyWithoutCampaignInput = {
    create?: XOR<DocumentCreateWithoutCampaignInput, DocumentUncheckedCreateWithoutCampaignInput> | DocumentCreateWithoutCampaignInput[] | DocumentUncheckedCreateWithoutCampaignInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutCampaignInput | DocumentCreateOrConnectWithoutCampaignInput[]
    createMany?: DocumentCreateManyCampaignInputEnvelope
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
  }

  export type AuditLogCreateNestedManyWithoutCampaignInput = {
    create?: XOR<AuditLogCreateWithoutCampaignInput, AuditLogUncheckedCreateWithoutCampaignInput> | AuditLogCreateWithoutCampaignInput[] | AuditLogUncheckedCreateWithoutCampaignInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutCampaignInput | AuditLogCreateOrConnectWithoutCampaignInput[]
    createMany?: AuditLogCreateManyCampaignInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type DonationUncheckedCreateNestedManyWithoutCampaignInput = {
    create?: XOR<DonationCreateWithoutCampaignInput, DonationUncheckedCreateWithoutCampaignInput> | DonationCreateWithoutCampaignInput[] | DonationUncheckedCreateWithoutCampaignInput[]
    connectOrCreate?: DonationCreateOrConnectWithoutCampaignInput | DonationCreateOrConnectWithoutCampaignInput[]
    createMany?: DonationCreateManyCampaignInputEnvelope
    connect?: DonationWhereUniqueInput | DonationWhereUniqueInput[]
  }

  export type DocumentUncheckedCreateNestedManyWithoutCampaignInput = {
    create?: XOR<DocumentCreateWithoutCampaignInput, DocumentUncheckedCreateWithoutCampaignInput> | DocumentCreateWithoutCampaignInput[] | DocumentUncheckedCreateWithoutCampaignInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutCampaignInput | DocumentCreateOrConnectWithoutCampaignInput[]
    createMany?: DocumentCreateManyCampaignInputEnvelope
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
  }

  export type AuditLogUncheckedCreateNestedManyWithoutCampaignInput = {
    create?: XOR<AuditLogCreateWithoutCampaignInput, AuditLogUncheckedCreateWithoutCampaignInput> | AuditLogCreateWithoutCampaignInput[] | AuditLogUncheckedCreateWithoutCampaignInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutCampaignInput | AuditLogCreateOrConnectWithoutCampaignInput[]
    createMany?: AuditLogCreateManyCampaignInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type EnumCampaignCategoryFieldUpdateOperationsInput = {
    set?: $Enums.CampaignCategory
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NGOProfileUpdateOneRequiredWithoutCampaignsNestedInput = {
    create?: XOR<NGOProfileCreateWithoutCampaignsInput, NGOProfileUncheckedCreateWithoutCampaignsInput>
    connectOrCreate?: NGOProfileCreateOrConnectWithoutCampaignsInput
    upsert?: NGOProfileUpsertWithoutCampaignsInput
    connect?: NGOProfileWhereUniqueInput
    update?: XOR<XOR<NGOProfileUpdateToOneWithWhereWithoutCampaignsInput, NGOProfileUpdateWithoutCampaignsInput>, NGOProfileUncheckedUpdateWithoutCampaignsInput>
  }

  export type DonationUpdateManyWithoutCampaignNestedInput = {
    create?: XOR<DonationCreateWithoutCampaignInput, DonationUncheckedCreateWithoutCampaignInput> | DonationCreateWithoutCampaignInput[] | DonationUncheckedCreateWithoutCampaignInput[]
    connectOrCreate?: DonationCreateOrConnectWithoutCampaignInput | DonationCreateOrConnectWithoutCampaignInput[]
    upsert?: DonationUpsertWithWhereUniqueWithoutCampaignInput | DonationUpsertWithWhereUniqueWithoutCampaignInput[]
    createMany?: DonationCreateManyCampaignInputEnvelope
    set?: DonationWhereUniqueInput | DonationWhereUniqueInput[]
    disconnect?: DonationWhereUniqueInput | DonationWhereUniqueInput[]
    delete?: DonationWhereUniqueInput | DonationWhereUniqueInput[]
    connect?: DonationWhereUniqueInput | DonationWhereUniqueInput[]
    update?: DonationUpdateWithWhereUniqueWithoutCampaignInput | DonationUpdateWithWhereUniqueWithoutCampaignInput[]
    updateMany?: DonationUpdateManyWithWhereWithoutCampaignInput | DonationUpdateManyWithWhereWithoutCampaignInput[]
    deleteMany?: DonationScalarWhereInput | DonationScalarWhereInput[]
  }

  export type DocumentUpdateManyWithoutCampaignNestedInput = {
    create?: XOR<DocumentCreateWithoutCampaignInput, DocumentUncheckedCreateWithoutCampaignInput> | DocumentCreateWithoutCampaignInput[] | DocumentUncheckedCreateWithoutCampaignInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutCampaignInput | DocumentCreateOrConnectWithoutCampaignInput[]
    upsert?: DocumentUpsertWithWhereUniqueWithoutCampaignInput | DocumentUpsertWithWhereUniqueWithoutCampaignInput[]
    createMany?: DocumentCreateManyCampaignInputEnvelope
    set?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    disconnect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    delete?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    update?: DocumentUpdateWithWhereUniqueWithoutCampaignInput | DocumentUpdateWithWhereUniqueWithoutCampaignInput[]
    updateMany?: DocumentUpdateManyWithWhereWithoutCampaignInput | DocumentUpdateManyWithWhereWithoutCampaignInput[]
    deleteMany?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
  }

  export type AuditLogUpdateManyWithoutCampaignNestedInput = {
    create?: XOR<AuditLogCreateWithoutCampaignInput, AuditLogUncheckedCreateWithoutCampaignInput> | AuditLogCreateWithoutCampaignInput[] | AuditLogUncheckedCreateWithoutCampaignInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutCampaignInput | AuditLogCreateOrConnectWithoutCampaignInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutCampaignInput | AuditLogUpsertWithWhereUniqueWithoutCampaignInput[]
    createMany?: AuditLogCreateManyCampaignInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutCampaignInput | AuditLogUpdateWithWhereUniqueWithoutCampaignInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutCampaignInput | AuditLogUpdateManyWithWhereWithoutCampaignInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type DonationUncheckedUpdateManyWithoutCampaignNestedInput = {
    create?: XOR<DonationCreateWithoutCampaignInput, DonationUncheckedCreateWithoutCampaignInput> | DonationCreateWithoutCampaignInput[] | DonationUncheckedCreateWithoutCampaignInput[]
    connectOrCreate?: DonationCreateOrConnectWithoutCampaignInput | DonationCreateOrConnectWithoutCampaignInput[]
    upsert?: DonationUpsertWithWhereUniqueWithoutCampaignInput | DonationUpsertWithWhereUniqueWithoutCampaignInput[]
    createMany?: DonationCreateManyCampaignInputEnvelope
    set?: DonationWhereUniqueInput | DonationWhereUniqueInput[]
    disconnect?: DonationWhereUniqueInput | DonationWhereUniqueInput[]
    delete?: DonationWhereUniqueInput | DonationWhereUniqueInput[]
    connect?: DonationWhereUniqueInput | DonationWhereUniqueInput[]
    update?: DonationUpdateWithWhereUniqueWithoutCampaignInput | DonationUpdateWithWhereUniqueWithoutCampaignInput[]
    updateMany?: DonationUpdateManyWithWhereWithoutCampaignInput | DonationUpdateManyWithWhereWithoutCampaignInput[]
    deleteMany?: DonationScalarWhereInput | DonationScalarWhereInput[]
  }

  export type DocumentUncheckedUpdateManyWithoutCampaignNestedInput = {
    create?: XOR<DocumentCreateWithoutCampaignInput, DocumentUncheckedCreateWithoutCampaignInput> | DocumentCreateWithoutCampaignInput[] | DocumentUncheckedCreateWithoutCampaignInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutCampaignInput | DocumentCreateOrConnectWithoutCampaignInput[]
    upsert?: DocumentUpsertWithWhereUniqueWithoutCampaignInput | DocumentUpsertWithWhereUniqueWithoutCampaignInput[]
    createMany?: DocumentCreateManyCampaignInputEnvelope
    set?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    disconnect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    delete?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    update?: DocumentUpdateWithWhereUniqueWithoutCampaignInput | DocumentUpdateWithWhereUniqueWithoutCampaignInput[]
    updateMany?: DocumentUpdateManyWithWhereWithoutCampaignInput | DocumentUpdateManyWithWhereWithoutCampaignInput[]
    deleteMany?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
  }

  export type AuditLogUncheckedUpdateManyWithoutCampaignNestedInput = {
    create?: XOR<AuditLogCreateWithoutCampaignInput, AuditLogUncheckedCreateWithoutCampaignInput> | AuditLogCreateWithoutCampaignInput[] | AuditLogUncheckedCreateWithoutCampaignInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutCampaignInput | AuditLogCreateOrConnectWithoutCampaignInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutCampaignInput | AuditLogUpsertWithWhereUniqueWithoutCampaignInput[]
    createMany?: AuditLogCreateManyCampaignInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutCampaignInput | AuditLogUpdateWithWhereUniqueWithoutCampaignInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutCampaignInput | AuditLogUpdateManyWithWhereWithoutCampaignInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type DonorProfileCreateNestedOneWithoutDonationsInput = {
    create?: XOR<DonorProfileCreateWithoutDonationsInput, DonorProfileUncheckedCreateWithoutDonationsInput>
    connectOrCreate?: DonorProfileCreateOrConnectWithoutDonationsInput
    connect?: DonorProfileWhereUniqueInput
  }

  export type CompanyProfileCreateNestedOneWithoutDonationsInput = {
    create?: XOR<CompanyProfileCreateWithoutDonationsInput, CompanyProfileUncheckedCreateWithoutDonationsInput>
    connectOrCreate?: CompanyProfileCreateOrConnectWithoutDonationsInput
    connect?: CompanyProfileWhereUniqueInput
  }

  export type CampaignCreateNestedOneWithoutDonationsInput = {
    create?: XOR<CampaignCreateWithoutDonationsInput, CampaignUncheckedCreateWithoutDonationsInput>
    connectOrCreate?: CampaignCreateOrConnectWithoutDonationsInput
    connect?: CampaignWhereUniqueInput
  }

  export type AuditLogCreateNestedManyWithoutDonationInput = {
    create?: XOR<AuditLogCreateWithoutDonationInput, AuditLogUncheckedCreateWithoutDonationInput> | AuditLogCreateWithoutDonationInput[] | AuditLogUncheckedCreateWithoutDonationInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutDonationInput | AuditLogCreateOrConnectWithoutDonationInput[]
    createMany?: AuditLogCreateManyDonationInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type AuditLogUncheckedCreateNestedManyWithoutDonationInput = {
    create?: XOR<AuditLogCreateWithoutDonationInput, AuditLogUncheckedCreateWithoutDonationInput> | AuditLogCreateWithoutDonationInput[] | AuditLogUncheckedCreateWithoutDonationInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutDonationInput | AuditLogCreateOrConnectWithoutDonationInput[]
    createMany?: AuditLogCreateManyDonationInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type DonorProfileUpdateOneWithoutDonationsNestedInput = {
    create?: XOR<DonorProfileCreateWithoutDonationsInput, DonorProfileUncheckedCreateWithoutDonationsInput>
    connectOrCreate?: DonorProfileCreateOrConnectWithoutDonationsInput
    upsert?: DonorProfileUpsertWithoutDonationsInput
    disconnect?: DonorProfileWhereInput | boolean
    delete?: DonorProfileWhereInput | boolean
    connect?: DonorProfileWhereUniqueInput
    update?: XOR<XOR<DonorProfileUpdateToOneWithWhereWithoutDonationsInput, DonorProfileUpdateWithoutDonationsInput>, DonorProfileUncheckedUpdateWithoutDonationsInput>
  }

  export type CompanyProfileUpdateOneWithoutDonationsNestedInput = {
    create?: XOR<CompanyProfileCreateWithoutDonationsInput, CompanyProfileUncheckedCreateWithoutDonationsInput>
    connectOrCreate?: CompanyProfileCreateOrConnectWithoutDonationsInput
    upsert?: CompanyProfileUpsertWithoutDonationsInput
    disconnect?: CompanyProfileWhereInput | boolean
    delete?: CompanyProfileWhereInput | boolean
    connect?: CompanyProfileWhereUniqueInput
    update?: XOR<XOR<CompanyProfileUpdateToOneWithWhereWithoutDonationsInput, CompanyProfileUpdateWithoutDonationsInput>, CompanyProfileUncheckedUpdateWithoutDonationsInput>
  }

  export type CampaignUpdateOneRequiredWithoutDonationsNestedInput = {
    create?: XOR<CampaignCreateWithoutDonationsInput, CampaignUncheckedCreateWithoutDonationsInput>
    connectOrCreate?: CampaignCreateOrConnectWithoutDonationsInput
    upsert?: CampaignUpsertWithoutDonationsInput
    connect?: CampaignWhereUniqueInput
    update?: XOR<XOR<CampaignUpdateToOneWithWhereWithoutDonationsInput, CampaignUpdateWithoutDonationsInput>, CampaignUncheckedUpdateWithoutDonationsInput>
  }

  export type AuditLogUpdateManyWithoutDonationNestedInput = {
    create?: XOR<AuditLogCreateWithoutDonationInput, AuditLogUncheckedCreateWithoutDonationInput> | AuditLogCreateWithoutDonationInput[] | AuditLogUncheckedCreateWithoutDonationInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutDonationInput | AuditLogCreateOrConnectWithoutDonationInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutDonationInput | AuditLogUpsertWithWhereUniqueWithoutDonationInput[]
    createMany?: AuditLogCreateManyDonationInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutDonationInput | AuditLogUpdateWithWhereUniqueWithoutDonationInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutDonationInput | AuditLogUpdateManyWithWhereWithoutDonationInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type AuditLogUncheckedUpdateManyWithoutDonationNestedInput = {
    create?: XOR<AuditLogCreateWithoutDonationInput, AuditLogUncheckedCreateWithoutDonationInput> | AuditLogCreateWithoutDonationInput[] | AuditLogUncheckedCreateWithoutDonationInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutDonationInput | AuditLogCreateOrConnectWithoutDonationInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutDonationInput | AuditLogUpsertWithWhereUniqueWithoutDonationInput[]
    createMany?: AuditLogCreateManyDonationInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutDonationInput | AuditLogUpdateWithWhereUniqueWithoutDonationInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutDonationInput | AuditLogUpdateManyWithWhereWithoutDonationInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type NGOProfileCreateNestedOneWithoutBankDetailsInput = {
    create?: XOR<NGOProfileCreateWithoutBankDetailsInput, NGOProfileUncheckedCreateWithoutBankDetailsInput>
    connectOrCreate?: NGOProfileCreateOrConnectWithoutBankDetailsInput
    connect?: NGOProfileWhereUniqueInput
  }

  export type CompanyProfileCreateNestedOneWithoutBankDetailsInput = {
    create?: XOR<CompanyProfileCreateWithoutBankDetailsInput, CompanyProfileUncheckedCreateWithoutBankDetailsInput>
    connectOrCreate?: CompanyProfileCreateOrConnectWithoutBankDetailsInput
    connect?: CompanyProfileWhereUniqueInput
  }

  export type NGOProfileUpdateOneWithoutBankDetailsNestedInput = {
    create?: XOR<NGOProfileCreateWithoutBankDetailsInput, NGOProfileUncheckedCreateWithoutBankDetailsInput>
    connectOrCreate?: NGOProfileCreateOrConnectWithoutBankDetailsInput
    upsert?: NGOProfileUpsertWithoutBankDetailsInput
    disconnect?: NGOProfileWhereInput | boolean
    delete?: NGOProfileWhereInput | boolean
    connect?: NGOProfileWhereUniqueInput
    update?: XOR<XOR<NGOProfileUpdateToOneWithWhereWithoutBankDetailsInput, NGOProfileUpdateWithoutBankDetailsInput>, NGOProfileUncheckedUpdateWithoutBankDetailsInput>
  }

  export type CompanyProfileUpdateOneWithoutBankDetailsNestedInput = {
    create?: XOR<CompanyProfileCreateWithoutBankDetailsInput, CompanyProfileUncheckedCreateWithoutBankDetailsInput>
    connectOrCreate?: CompanyProfileCreateOrConnectWithoutBankDetailsInput
    upsert?: CompanyProfileUpsertWithoutBankDetailsInput
    disconnect?: CompanyProfileWhereInput | boolean
    delete?: CompanyProfileWhereInput | boolean
    connect?: CompanyProfileWhereUniqueInput
    update?: XOR<XOR<CompanyProfileUpdateToOneWithWhereWithoutBankDetailsInput, CompanyProfileUpdateWithoutBankDetailsInput>, CompanyProfileUncheckedUpdateWithoutBankDetailsInput>
  }

  export type NGOProfileCreateNestedOneWithoutDocumentsInput = {
    create?: XOR<NGOProfileCreateWithoutDocumentsInput, NGOProfileUncheckedCreateWithoutDocumentsInput>
    connectOrCreate?: NGOProfileCreateOrConnectWithoutDocumentsInput
    connect?: NGOProfileWhereUniqueInput
  }

  export type CompanyProfileCreateNestedOneWithoutDocumentsInput = {
    create?: XOR<CompanyProfileCreateWithoutDocumentsInput, CompanyProfileUncheckedCreateWithoutDocumentsInput>
    connectOrCreate?: CompanyProfileCreateOrConnectWithoutDocumentsInput
    connect?: CompanyProfileWhereUniqueInput
  }

  export type CampaignCreateNestedOneWithoutDocumentsInput = {
    create?: XOR<CampaignCreateWithoutDocumentsInput, CampaignUncheckedCreateWithoutDocumentsInput>
    connectOrCreate?: CampaignCreateOrConnectWithoutDocumentsInput
    connect?: CampaignWhereUniqueInput
  }

  export type EnumDocumentTypeFieldUpdateOperationsInput = {
    set?: $Enums.DocumentType
  }

  export type NGOProfileUpdateOneWithoutDocumentsNestedInput = {
    create?: XOR<NGOProfileCreateWithoutDocumentsInput, NGOProfileUncheckedCreateWithoutDocumentsInput>
    connectOrCreate?: NGOProfileCreateOrConnectWithoutDocumentsInput
    upsert?: NGOProfileUpsertWithoutDocumentsInput
    disconnect?: NGOProfileWhereInput | boolean
    delete?: NGOProfileWhereInput | boolean
    connect?: NGOProfileWhereUniqueInput
    update?: XOR<XOR<NGOProfileUpdateToOneWithWhereWithoutDocumentsInput, NGOProfileUpdateWithoutDocumentsInput>, NGOProfileUncheckedUpdateWithoutDocumentsInput>
  }

  export type CompanyProfileUpdateOneWithoutDocumentsNestedInput = {
    create?: XOR<CompanyProfileCreateWithoutDocumentsInput, CompanyProfileUncheckedCreateWithoutDocumentsInput>
    connectOrCreate?: CompanyProfileCreateOrConnectWithoutDocumentsInput
    upsert?: CompanyProfileUpsertWithoutDocumentsInput
    disconnect?: CompanyProfileWhereInput | boolean
    delete?: CompanyProfileWhereInput | boolean
    connect?: CompanyProfileWhereUniqueInput
    update?: XOR<XOR<CompanyProfileUpdateToOneWithWhereWithoutDocumentsInput, CompanyProfileUpdateWithoutDocumentsInput>, CompanyProfileUncheckedUpdateWithoutDocumentsInput>
  }

  export type CampaignUpdateOneWithoutDocumentsNestedInput = {
    create?: XOR<CampaignCreateWithoutDocumentsInput, CampaignUncheckedCreateWithoutDocumentsInput>
    connectOrCreate?: CampaignCreateOrConnectWithoutDocumentsInput
    upsert?: CampaignUpsertWithoutDocumentsInput
    disconnect?: CampaignWhereInput | boolean
    delete?: CampaignWhereInput | boolean
    connect?: CampaignWhereUniqueInput
    update?: XOR<XOR<CampaignUpdateToOneWithWhereWithoutDocumentsInput, CampaignUpdateWithoutDocumentsInput>, CampaignUncheckedUpdateWithoutDocumentsInput>
  }

  export type NGOProfileCreateNestedOneWithoutAddressesInput = {
    create?: XOR<NGOProfileCreateWithoutAddressesInput, NGOProfileUncheckedCreateWithoutAddressesInput>
    connectOrCreate?: NGOProfileCreateOrConnectWithoutAddressesInput
    connect?: NGOProfileWhereUniqueInput
  }

  export type CompanyProfileCreateNestedOneWithoutAddressesInput = {
    create?: XOR<CompanyProfileCreateWithoutAddressesInput, CompanyProfileUncheckedCreateWithoutAddressesInput>
    connectOrCreate?: CompanyProfileCreateOrConnectWithoutAddressesInput
    connect?: CompanyProfileWhereUniqueInput
  }

  export type DonorProfileCreateNestedOneWithoutAddressesInput = {
    create?: XOR<DonorProfileCreateWithoutAddressesInput, DonorProfileUncheckedCreateWithoutAddressesInput>
    connectOrCreate?: DonorProfileCreateOrConnectWithoutAddressesInput
    connect?: DonorProfileWhereUniqueInput
  }

  export type NGOProfileUpdateOneWithoutAddressesNestedInput = {
    create?: XOR<NGOProfileCreateWithoutAddressesInput, NGOProfileUncheckedCreateWithoutAddressesInput>
    connectOrCreate?: NGOProfileCreateOrConnectWithoutAddressesInput
    upsert?: NGOProfileUpsertWithoutAddressesInput
    disconnect?: NGOProfileWhereInput | boolean
    delete?: NGOProfileWhereInput | boolean
    connect?: NGOProfileWhereUniqueInput
    update?: XOR<XOR<NGOProfileUpdateToOneWithWhereWithoutAddressesInput, NGOProfileUpdateWithoutAddressesInput>, NGOProfileUncheckedUpdateWithoutAddressesInput>
  }

  export type CompanyProfileUpdateOneWithoutAddressesNestedInput = {
    create?: XOR<CompanyProfileCreateWithoutAddressesInput, CompanyProfileUncheckedCreateWithoutAddressesInput>
    connectOrCreate?: CompanyProfileCreateOrConnectWithoutAddressesInput
    upsert?: CompanyProfileUpsertWithoutAddressesInput
    disconnect?: CompanyProfileWhereInput | boolean
    delete?: CompanyProfileWhereInput | boolean
    connect?: CompanyProfileWhereUniqueInput
    update?: XOR<XOR<CompanyProfileUpdateToOneWithWhereWithoutAddressesInput, CompanyProfileUpdateWithoutAddressesInput>, CompanyProfileUncheckedUpdateWithoutAddressesInput>
  }

  export type DonorProfileUpdateOneWithoutAddressesNestedInput = {
    create?: XOR<DonorProfileCreateWithoutAddressesInput, DonorProfileUncheckedCreateWithoutAddressesInput>
    connectOrCreate?: DonorProfileCreateOrConnectWithoutAddressesInput
    upsert?: DonorProfileUpsertWithoutAddressesInput
    disconnect?: DonorProfileWhereInput | boolean
    delete?: DonorProfileWhereInput | boolean
    connect?: DonorProfileWhereUniqueInput
    update?: XOR<XOR<DonorProfileUpdateToOneWithWhereWithoutAddressesInput, DonorProfileUpdateWithoutAddressesInput>, DonorProfileUncheckedUpdateWithoutAddressesInput>
  }

  export type UserCreateNestedOneWithoutAuditLogsInput = {
    create?: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuditLogsInput
    connect?: UserWhereUniqueInput
  }

  export type NGOProfileCreateNestedOneWithoutAuditLogsInput = {
    create?: XOR<NGOProfileCreateWithoutAuditLogsInput, NGOProfileUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: NGOProfileCreateOrConnectWithoutAuditLogsInput
    connect?: NGOProfileWhereUniqueInput
  }

  export type CompanyProfileCreateNestedOneWithoutAuditLogsInput = {
    create?: XOR<CompanyProfileCreateWithoutAuditLogsInput, CompanyProfileUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: CompanyProfileCreateOrConnectWithoutAuditLogsInput
    connect?: CompanyProfileWhereUniqueInput
  }

  export type DonorProfileCreateNestedOneWithoutAuditLogsInput = {
    create?: XOR<DonorProfileCreateWithoutAuditLogsInput, DonorProfileUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: DonorProfileCreateOrConnectWithoutAuditLogsInput
    connect?: DonorProfileWhereUniqueInput
  }

  export type CampaignCreateNestedOneWithoutAuditLogsInput = {
    create?: XOR<CampaignCreateWithoutAuditLogsInput, CampaignUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: CampaignCreateOrConnectWithoutAuditLogsInput
    connect?: CampaignWhereUniqueInput
  }

  export type DonationCreateNestedOneWithoutAuditLogsInput = {
    create?: XOR<DonationCreateWithoutAuditLogsInput, DonationUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: DonationCreateOrConnectWithoutAuditLogsInput
    connect?: DonationWhereUniqueInput
  }

  export type UserUpdateOneWithoutAuditLogsNestedInput = {
    create?: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuditLogsInput
    upsert?: UserUpsertWithoutAuditLogsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAuditLogsInput, UserUpdateWithoutAuditLogsInput>, UserUncheckedUpdateWithoutAuditLogsInput>
  }

  export type NGOProfileUpdateOneWithoutAuditLogsNestedInput = {
    create?: XOR<NGOProfileCreateWithoutAuditLogsInput, NGOProfileUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: NGOProfileCreateOrConnectWithoutAuditLogsInput
    upsert?: NGOProfileUpsertWithoutAuditLogsInput
    disconnect?: NGOProfileWhereInput | boolean
    delete?: NGOProfileWhereInput | boolean
    connect?: NGOProfileWhereUniqueInput
    update?: XOR<XOR<NGOProfileUpdateToOneWithWhereWithoutAuditLogsInput, NGOProfileUpdateWithoutAuditLogsInput>, NGOProfileUncheckedUpdateWithoutAuditLogsInput>
  }

  export type CompanyProfileUpdateOneWithoutAuditLogsNestedInput = {
    create?: XOR<CompanyProfileCreateWithoutAuditLogsInput, CompanyProfileUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: CompanyProfileCreateOrConnectWithoutAuditLogsInput
    upsert?: CompanyProfileUpsertWithoutAuditLogsInput
    disconnect?: CompanyProfileWhereInput | boolean
    delete?: CompanyProfileWhereInput | boolean
    connect?: CompanyProfileWhereUniqueInput
    update?: XOR<XOR<CompanyProfileUpdateToOneWithWhereWithoutAuditLogsInput, CompanyProfileUpdateWithoutAuditLogsInput>, CompanyProfileUncheckedUpdateWithoutAuditLogsInput>
  }

  export type DonorProfileUpdateOneWithoutAuditLogsNestedInput = {
    create?: XOR<DonorProfileCreateWithoutAuditLogsInput, DonorProfileUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: DonorProfileCreateOrConnectWithoutAuditLogsInput
    upsert?: DonorProfileUpsertWithoutAuditLogsInput
    disconnect?: DonorProfileWhereInput | boolean
    delete?: DonorProfileWhereInput | boolean
    connect?: DonorProfileWhereUniqueInput
    update?: XOR<XOR<DonorProfileUpdateToOneWithWhereWithoutAuditLogsInput, DonorProfileUpdateWithoutAuditLogsInput>, DonorProfileUncheckedUpdateWithoutAuditLogsInput>
  }

  export type CampaignUpdateOneWithoutAuditLogsNestedInput = {
    create?: XOR<CampaignCreateWithoutAuditLogsInput, CampaignUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: CampaignCreateOrConnectWithoutAuditLogsInput
    upsert?: CampaignUpsertWithoutAuditLogsInput
    disconnect?: CampaignWhereInput | boolean
    delete?: CampaignWhereInput | boolean
    connect?: CampaignWhereUniqueInput
    update?: XOR<XOR<CampaignUpdateToOneWithWhereWithoutAuditLogsInput, CampaignUpdateWithoutAuditLogsInput>, CampaignUncheckedUpdateWithoutAuditLogsInput>
  }

  export type DonationUpdateOneWithoutAuditLogsNestedInput = {
    create?: XOR<DonationCreateWithoutAuditLogsInput, DonationUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: DonationCreateOrConnectWithoutAuditLogsInput
    upsert?: DonationUpsertWithoutAuditLogsInput
    disconnect?: DonationWhereInput | boolean
    delete?: DonationWhereInput | boolean
    connect?: DonationWhereUniqueInput
    update?: XOR<XOR<DonationUpdateToOneWithWhereWithoutAuditLogsInput, DonationUpdateWithoutAuditLogsInput>, DonationUncheckedUpdateWithoutAuditLogsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumNGORegistrationTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.NGORegistrationType | EnumNGORegistrationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.NGORegistrationType[] | ListEnumNGORegistrationTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.NGORegistrationType[] | ListEnumNGORegistrationTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumNGORegistrationTypeFilter<$PrismaModel> | $Enums.NGORegistrationType
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedEnumNGORegistrationTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NGORegistrationType | EnumNGORegistrationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.NGORegistrationType[] | ListEnumNGORegistrationTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.NGORegistrationType[] | ListEnumNGORegistrationTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumNGORegistrationTypeWithAggregatesFilter<$PrismaModel> | $Enums.NGORegistrationType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumNGORegistrationTypeFilter<$PrismaModel>
    _max?: NestedEnumNGORegistrationTypeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedEnumCampaignCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.CampaignCategory | EnumCampaignCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.CampaignCategory[] | ListEnumCampaignCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.CampaignCategory[] | ListEnumCampaignCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumCampaignCategoryFilter<$PrismaModel> | $Enums.CampaignCategory
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumCampaignCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CampaignCategory | EnumCampaignCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.CampaignCategory[] | ListEnumCampaignCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.CampaignCategory[] | ListEnumCampaignCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumCampaignCategoryWithAggregatesFilter<$PrismaModel> | $Enums.CampaignCategory
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCampaignCategoryFilter<$PrismaModel>
    _max?: NestedEnumCampaignCategoryFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumDocumentTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.DocumentType | EnumDocumentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.DocumentType[] | ListEnumDocumentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.DocumentType[] | ListEnumDocumentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumDocumentTypeFilter<$PrismaModel> | $Enums.DocumentType
  }

  export type NestedEnumDocumentTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DocumentType | EnumDocumentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.DocumentType[] | ListEnumDocumentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.DocumentType[] | ListEnumDocumentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumDocumentTypeWithAggregatesFilter<$PrismaModel> | $Enums.DocumentType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDocumentTypeFilter<$PrismaModel>
    _max?: NestedEnumDocumentTypeFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NGOProfileCreateWithoutUserInput = {
    id?: string
    registrationType: $Enums.NGORegistrationType
    registrationNumber: string
    founderNames: string
    yearEstablished: number
    missionStatement: string
    impactSummary?: string | null
    website?: string | null
    twelveARegistered?: boolean
    eightyGRegistered?: boolean
    csrEligibility?: boolean
    campaigns?: CampaignCreateNestedManyWithoutNgoInput
    bankDetails?: BankDetailCreateNestedManyWithoutNgoInput
    documents?: DocumentCreateNestedManyWithoutNgoInput
    addresses?: AddressCreateNestedManyWithoutNgoInput
    auditLogs?: AuditLogCreateNestedManyWithoutNgoInput
  }

  export type NGOProfileUncheckedCreateWithoutUserInput = {
    id?: string
    registrationType: $Enums.NGORegistrationType
    registrationNumber: string
    founderNames: string
    yearEstablished: number
    missionStatement: string
    impactSummary?: string | null
    website?: string | null
    twelveARegistered?: boolean
    eightyGRegistered?: boolean
    csrEligibility?: boolean
    campaigns?: CampaignUncheckedCreateNestedManyWithoutNgoInput
    bankDetails?: BankDetailUncheckedCreateNestedManyWithoutNgoInput
    documents?: DocumentUncheckedCreateNestedManyWithoutNgoInput
    addresses?: AddressUncheckedCreateNestedManyWithoutNgoInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutNgoInput
  }

  export type NGOProfileCreateOrConnectWithoutUserInput = {
    where: NGOProfileWhereUniqueInput
    create: XOR<NGOProfileCreateWithoutUserInput, NGOProfileUncheckedCreateWithoutUserInput>
  }

  export type CompanyProfileCreateWithoutUserInput = {
    id?: string
    cin: string
    csrPolicyUrl?: string | null
    industry: string
    netWorth?: number | null
    averageProfit?: number | null
    csrBudget?: number | null
    csrCommittee?: string | null
    donations?: DonationCreateNestedManyWithoutCompanyInput
    documents?: DocumentCreateNestedManyWithoutCompanyInput
    bankDetails?: BankDetailCreateNestedManyWithoutCompanyInput
    addresses?: AddressCreateNestedManyWithoutCompanyInput
    auditLogs?: AuditLogCreateNestedManyWithoutCompanyInput
  }

  export type CompanyProfileUncheckedCreateWithoutUserInput = {
    id?: string
    cin: string
    csrPolicyUrl?: string | null
    industry: string
    netWorth?: number | null
    averageProfit?: number | null
    csrBudget?: number | null
    csrCommittee?: string | null
    donations?: DonationUncheckedCreateNestedManyWithoutCompanyInput
    documents?: DocumentUncheckedCreateNestedManyWithoutCompanyInput
    bankDetails?: BankDetailUncheckedCreateNestedManyWithoutCompanyInput
    addresses?: AddressUncheckedCreateNestedManyWithoutCompanyInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompanyProfileCreateOrConnectWithoutUserInput = {
    where: CompanyProfileWhereUniqueInput
    create: XOR<CompanyProfileCreateWithoutUserInput, CompanyProfileUncheckedCreateWithoutUserInput>
  }

  export type DonorProfileCreateWithoutUserInput = {
    id?: string
    pan?: string | null
    occupation?: string | null
    interests?: string | null
    donations?: DonationCreateNestedManyWithoutDonorInput
    addresses?: AddressCreateNestedManyWithoutDonorInput
    auditLogs?: AuditLogCreateNestedManyWithoutDonorInput
  }

  export type DonorProfileUncheckedCreateWithoutUserInput = {
    id?: string
    pan?: string | null
    occupation?: string | null
    interests?: string | null
    donations?: DonationUncheckedCreateNestedManyWithoutDonorInput
    addresses?: AddressUncheckedCreateNestedManyWithoutDonorInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutDonorInput
  }

  export type DonorProfileCreateOrConnectWithoutUserInput = {
    where: DonorProfileWhereUniqueInput
    create: XOR<DonorProfileCreateWithoutUserInput, DonorProfileUncheckedCreateWithoutUserInput>
  }

  export type AuditLogCreateWithoutUserInput = {
    id?: string
    action: string
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    ngo?: NGOProfileCreateNestedOneWithoutAuditLogsInput
    company?: CompanyProfileCreateNestedOneWithoutAuditLogsInput
    donor?: DonorProfileCreateNestedOneWithoutAuditLogsInput
    campaign?: CampaignCreateNestedOneWithoutAuditLogsInput
    donation?: DonationCreateNestedOneWithoutAuditLogsInput
  }

  export type AuditLogUncheckedCreateWithoutUserInput = {
    id?: string
    ngoId?: string | null
    companyId?: string | null
    donorId?: string | null
    campaignId?: string | null
    donationId?: string | null
    action: string
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AuditLogCreateOrConnectWithoutUserInput = {
    where: AuditLogWhereUniqueInput
    create: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput>
  }

  export type AuditLogCreateManyUserInputEnvelope = {
    data: AuditLogCreateManyUserInput | AuditLogCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type NGOProfileUpsertWithoutUserInput = {
    update: XOR<NGOProfileUpdateWithoutUserInput, NGOProfileUncheckedUpdateWithoutUserInput>
    create: XOR<NGOProfileCreateWithoutUserInput, NGOProfileUncheckedCreateWithoutUserInput>
    where?: NGOProfileWhereInput
  }

  export type NGOProfileUpdateToOneWithWhereWithoutUserInput = {
    where?: NGOProfileWhereInput
    data: XOR<NGOProfileUpdateWithoutUserInput, NGOProfileUncheckedUpdateWithoutUserInput>
  }

  export type NGOProfileUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    registrationType?: EnumNGORegistrationTypeFieldUpdateOperationsInput | $Enums.NGORegistrationType
    registrationNumber?: StringFieldUpdateOperationsInput | string
    founderNames?: StringFieldUpdateOperationsInput | string
    yearEstablished?: IntFieldUpdateOperationsInput | number
    missionStatement?: StringFieldUpdateOperationsInput | string
    impactSummary?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    twelveARegistered?: BoolFieldUpdateOperationsInput | boolean
    eightyGRegistered?: BoolFieldUpdateOperationsInput | boolean
    csrEligibility?: BoolFieldUpdateOperationsInput | boolean
    campaigns?: CampaignUpdateManyWithoutNgoNestedInput
    bankDetails?: BankDetailUpdateManyWithoutNgoNestedInput
    documents?: DocumentUpdateManyWithoutNgoNestedInput
    addresses?: AddressUpdateManyWithoutNgoNestedInput
    auditLogs?: AuditLogUpdateManyWithoutNgoNestedInput
  }

  export type NGOProfileUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    registrationType?: EnumNGORegistrationTypeFieldUpdateOperationsInput | $Enums.NGORegistrationType
    registrationNumber?: StringFieldUpdateOperationsInput | string
    founderNames?: StringFieldUpdateOperationsInput | string
    yearEstablished?: IntFieldUpdateOperationsInput | number
    missionStatement?: StringFieldUpdateOperationsInput | string
    impactSummary?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    twelveARegistered?: BoolFieldUpdateOperationsInput | boolean
    eightyGRegistered?: BoolFieldUpdateOperationsInput | boolean
    csrEligibility?: BoolFieldUpdateOperationsInput | boolean
    campaigns?: CampaignUncheckedUpdateManyWithoutNgoNestedInput
    bankDetails?: BankDetailUncheckedUpdateManyWithoutNgoNestedInput
    documents?: DocumentUncheckedUpdateManyWithoutNgoNestedInput
    addresses?: AddressUncheckedUpdateManyWithoutNgoNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutNgoNestedInput
  }

  export type CompanyProfileUpsertWithoutUserInput = {
    update: XOR<CompanyProfileUpdateWithoutUserInput, CompanyProfileUncheckedUpdateWithoutUserInput>
    create: XOR<CompanyProfileCreateWithoutUserInput, CompanyProfileUncheckedCreateWithoutUserInput>
    where?: CompanyProfileWhereInput
  }

  export type CompanyProfileUpdateToOneWithWhereWithoutUserInput = {
    where?: CompanyProfileWhereInput
    data: XOR<CompanyProfileUpdateWithoutUserInput, CompanyProfileUncheckedUpdateWithoutUserInput>
  }

  export type CompanyProfileUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    cin?: StringFieldUpdateOperationsInput | string
    csrPolicyUrl?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: StringFieldUpdateOperationsInput | string
    netWorth?: NullableFloatFieldUpdateOperationsInput | number | null
    averageProfit?: NullableFloatFieldUpdateOperationsInput | number | null
    csrBudget?: NullableFloatFieldUpdateOperationsInput | number | null
    csrCommittee?: NullableStringFieldUpdateOperationsInput | string | null
    donations?: DonationUpdateManyWithoutCompanyNestedInput
    documents?: DocumentUpdateManyWithoutCompanyNestedInput
    bankDetails?: BankDetailUpdateManyWithoutCompanyNestedInput
    addresses?: AddressUpdateManyWithoutCompanyNestedInput
    auditLogs?: AuditLogUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyProfileUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    cin?: StringFieldUpdateOperationsInput | string
    csrPolicyUrl?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: StringFieldUpdateOperationsInput | string
    netWorth?: NullableFloatFieldUpdateOperationsInput | number | null
    averageProfit?: NullableFloatFieldUpdateOperationsInput | number | null
    csrBudget?: NullableFloatFieldUpdateOperationsInput | number | null
    csrCommittee?: NullableStringFieldUpdateOperationsInput | string | null
    donations?: DonationUncheckedUpdateManyWithoutCompanyNestedInput
    documents?: DocumentUncheckedUpdateManyWithoutCompanyNestedInput
    bankDetails?: BankDetailUncheckedUpdateManyWithoutCompanyNestedInput
    addresses?: AddressUncheckedUpdateManyWithoutCompanyNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type DonorProfileUpsertWithoutUserInput = {
    update: XOR<DonorProfileUpdateWithoutUserInput, DonorProfileUncheckedUpdateWithoutUserInput>
    create: XOR<DonorProfileCreateWithoutUserInput, DonorProfileUncheckedCreateWithoutUserInput>
    where?: DonorProfileWhereInput
  }

  export type DonorProfileUpdateToOneWithWhereWithoutUserInput = {
    where?: DonorProfileWhereInput
    data: XOR<DonorProfileUpdateWithoutUserInput, DonorProfileUncheckedUpdateWithoutUserInput>
  }

  export type DonorProfileUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    pan?: NullableStringFieldUpdateOperationsInput | string | null
    occupation?: NullableStringFieldUpdateOperationsInput | string | null
    interests?: NullableStringFieldUpdateOperationsInput | string | null
    donations?: DonationUpdateManyWithoutDonorNestedInput
    addresses?: AddressUpdateManyWithoutDonorNestedInput
    auditLogs?: AuditLogUpdateManyWithoutDonorNestedInput
  }

  export type DonorProfileUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    pan?: NullableStringFieldUpdateOperationsInput | string | null
    occupation?: NullableStringFieldUpdateOperationsInput | string | null
    interests?: NullableStringFieldUpdateOperationsInput | string | null
    donations?: DonationUncheckedUpdateManyWithoutDonorNestedInput
    addresses?: AddressUncheckedUpdateManyWithoutDonorNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutDonorNestedInput
  }

  export type AuditLogUpsertWithWhereUniqueWithoutUserInput = {
    where: AuditLogWhereUniqueInput
    update: XOR<AuditLogUpdateWithoutUserInput, AuditLogUncheckedUpdateWithoutUserInput>
    create: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput>
  }

  export type AuditLogUpdateWithWhereUniqueWithoutUserInput = {
    where: AuditLogWhereUniqueInput
    data: XOR<AuditLogUpdateWithoutUserInput, AuditLogUncheckedUpdateWithoutUserInput>
  }

  export type AuditLogUpdateManyWithWhereWithoutUserInput = {
    where: AuditLogScalarWhereInput
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyWithoutUserInput>
  }

  export type AuditLogScalarWhereInput = {
    AND?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
    OR?: AuditLogScalarWhereInput[]
    NOT?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
    id?: StringFilter<"AuditLog"> | string
    userId?: StringNullableFilter<"AuditLog"> | string | null
    ngoId?: StringNullableFilter<"AuditLog"> | string | null
    companyId?: StringNullableFilter<"AuditLog"> | string | null
    donorId?: StringNullableFilter<"AuditLog"> | string | null
    campaignId?: StringNullableFilter<"AuditLog"> | string | null
    donationId?: StringNullableFilter<"AuditLog"> | string | null
    action?: StringFilter<"AuditLog"> | string
    details?: JsonNullableFilter<"AuditLog">
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
  }

  export type UserCreateWithoutNgoProfileInput = {
    id?: string
    name: string
    email: string
    phone?: string | null
    password: string
    role: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    companyProfile?: CompanyProfileCreateNestedOneWithoutUserInput
    donorProfile?: DonorProfileCreateNestedOneWithoutUserInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutNgoProfileInput = {
    id?: string
    name: string
    email: string
    phone?: string | null
    password: string
    role: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    companyProfile?: CompanyProfileUncheckedCreateNestedOneWithoutUserInput
    donorProfile?: DonorProfileUncheckedCreateNestedOneWithoutUserInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutNgoProfileInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutNgoProfileInput, UserUncheckedCreateWithoutNgoProfileInput>
  }

  export type CampaignCreateWithoutNgoInput = {
    id?: string
    title: string
    description: string
    category: $Enums.CampaignCategory
    goalAmount: number
    raisedAmount?: number
    startDate: Date | string
    endDate?: Date | string | null
    status: string
    donations?: DonationCreateNestedManyWithoutCampaignInput
    documents?: DocumentCreateNestedManyWithoutCampaignInput
    auditLogs?: AuditLogCreateNestedManyWithoutCampaignInput
  }

  export type CampaignUncheckedCreateWithoutNgoInput = {
    id?: string
    title: string
    description: string
    category: $Enums.CampaignCategory
    goalAmount: number
    raisedAmount?: number
    startDate: Date | string
    endDate?: Date | string | null
    status: string
    donations?: DonationUncheckedCreateNestedManyWithoutCampaignInput
    documents?: DocumentUncheckedCreateNestedManyWithoutCampaignInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutCampaignInput
  }

  export type CampaignCreateOrConnectWithoutNgoInput = {
    where: CampaignWhereUniqueInput
    create: XOR<CampaignCreateWithoutNgoInput, CampaignUncheckedCreateWithoutNgoInput>
  }

  export type CampaignCreateManyNgoInputEnvelope = {
    data: CampaignCreateManyNgoInput | CampaignCreateManyNgoInput[]
    skipDuplicates?: boolean
  }

  export type BankDetailCreateWithoutNgoInput = {
    id?: string
    accountHolder: string
    bankName: string
    accountNumber: string
    ifsc: string
    branch?: string | null
    company?: CompanyProfileCreateNestedOneWithoutBankDetailsInput
  }

  export type BankDetailUncheckedCreateWithoutNgoInput = {
    id?: string
    companyId?: string | null
    accountHolder: string
    bankName: string
    accountNumber: string
    ifsc: string
    branch?: string | null
  }

  export type BankDetailCreateOrConnectWithoutNgoInput = {
    where: BankDetailWhereUniqueInput
    create: XOR<BankDetailCreateWithoutNgoInput, BankDetailUncheckedCreateWithoutNgoInput>
  }

  export type BankDetailCreateManyNgoInputEnvelope = {
    data: BankDetailCreateManyNgoInput | BankDetailCreateManyNgoInput[]
    skipDuplicates?: boolean
  }

  export type DocumentCreateWithoutNgoInput = {
    id?: string
    type: $Enums.DocumentType
    title: string
    url: string
    uploadedAt?: Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    company?: CompanyProfileCreateNestedOneWithoutDocumentsInput
    campaign?: CampaignCreateNestedOneWithoutDocumentsInput
  }

  export type DocumentUncheckedCreateWithoutNgoInput = {
    id?: string
    companyId?: string | null
    campaignId?: string | null
    type: $Enums.DocumentType
    title: string
    url: string
    uploadedAt?: Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type DocumentCreateOrConnectWithoutNgoInput = {
    where: DocumentWhereUniqueInput
    create: XOR<DocumentCreateWithoutNgoInput, DocumentUncheckedCreateWithoutNgoInput>
  }

  export type DocumentCreateManyNgoInputEnvelope = {
    data: DocumentCreateManyNgoInput | DocumentCreateManyNgoInput[]
    skipDuplicates?: boolean
  }

  export type AddressCreateWithoutNgoInput = {
    id?: string
    line1: string
    line2?: string | null
    city: string
    state: string
    country?: string
    postalCode: string
    addressType?: string | null
    company?: CompanyProfileCreateNestedOneWithoutAddressesInput
    donor?: DonorProfileCreateNestedOneWithoutAddressesInput
  }

  export type AddressUncheckedCreateWithoutNgoInput = {
    id?: string
    companyId?: string | null
    donorId?: string | null
    line1: string
    line2?: string | null
    city: string
    state: string
    country?: string
    postalCode: string
    addressType?: string | null
  }

  export type AddressCreateOrConnectWithoutNgoInput = {
    where: AddressWhereUniqueInput
    create: XOR<AddressCreateWithoutNgoInput, AddressUncheckedCreateWithoutNgoInput>
  }

  export type AddressCreateManyNgoInputEnvelope = {
    data: AddressCreateManyNgoInput | AddressCreateManyNgoInput[]
    skipDuplicates?: boolean
  }

  export type AuditLogCreateWithoutNgoInput = {
    id?: string
    action: string
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    user?: UserCreateNestedOneWithoutAuditLogsInput
    company?: CompanyProfileCreateNestedOneWithoutAuditLogsInput
    donor?: DonorProfileCreateNestedOneWithoutAuditLogsInput
    campaign?: CampaignCreateNestedOneWithoutAuditLogsInput
    donation?: DonationCreateNestedOneWithoutAuditLogsInput
  }

  export type AuditLogUncheckedCreateWithoutNgoInput = {
    id?: string
    userId?: string | null
    companyId?: string | null
    donorId?: string | null
    campaignId?: string | null
    donationId?: string | null
    action: string
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AuditLogCreateOrConnectWithoutNgoInput = {
    where: AuditLogWhereUniqueInput
    create: XOR<AuditLogCreateWithoutNgoInput, AuditLogUncheckedCreateWithoutNgoInput>
  }

  export type AuditLogCreateManyNgoInputEnvelope = {
    data: AuditLogCreateManyNgoInput | AuditLogCreateManyNgoInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutNgoProfileInput = {
    update: XOR<UserUpdateWithoutNgoProfileInput, UserUncheckedUpdateWithoutNgoProfileInput>
    create: XOR<UserCreateWithoutNgoProfileInput, UserUncheckedCreateWithoutNgoProfileInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutNgoProfileInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutNgoProfileInput, UserUncheckedUpdateWithoutNgoProfileInput>
  }

  export type UserUpdateWithoutNgoProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    companyProfile?: CompanyProfileUpdateOneWithoutUserNestedInput
    donorProfile?: DonorProfileUpdateOneWithoutUserNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutNgoProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    companyProfile?: CompanyProfileUncheckedUpdateOneWithoutUserNestedInput
    donorProfile?: DonorProfileUncheckedUpdateOneWithoutUserNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type CampaignUpsertWithWhereUniqueWithoutNgoInput = {
    where: CampaignWhereUniqueInput
    update: XOR<CampaignUpdateWithoutNgoInput, CampaignUncheckedUpdateWithoutNgoInput>
    create: XOR<CampaignCreateWithoutNgoInput, CampaignUncheckedCreateWithoutNgoInput>
  }

  export type CampaignUpdateWithWhereUniqueWithoutNgoInput = {
    where: CampaignWhereUniqueInput
    data: XOR<CampaignUpdateWithoutNgoInput, CampaignUncheckedUpdateWithoutNgoInput>
  }

  export type CampaignUpdateManyWithWhereWithoutNgoInput = {
    where: CampaignScalarWhereInput
    data: XOR<CampaignUpdateManyMutationInput, CampaignUncheckedUpdateManyWithoutNgoInput>
  }

  export type CampaignScalarWhereInput = {
    AND?: CampaignScalarWhereInput | CampaignScalarWhereInput[]
    OR?: CampaignScalarWhereInput[]
    NOT?: CampaignScalarWhereInput | CampaignScalarWhereInput[]
    id?: StringFilter<"Campaign"> | string
    ngoId?: StringFilter<"Campaign"> | string
    title?: StringFilter<"Campaign"> | string
    description?: StringFilter<"Campaign"> | string
    category?: EnumCampaignCategoryFilter<"Campaign"> | $Enums.CampaignCategory
    goalAmount?: FloatFilter<"Campaign"> | number
    raisedAmount?: FloatFilter<"Campaign"> | number
    startDate?: DateTimeFilter<"Campaign"> | Date | string
    endDate?: DateTimeNullableFilter<"Campaign"> | Date | string | null
    status?: StringFilter<"Campaign"> | string
  }

  export type BankDetailUpsertWithWhereUniqueWithoutNgoInput = {
    where: BankDetailWhereUniqueInput
    update: XOR<BankDetailUpdateWithoutNgoInput, BankDetailUncheckedUpdateWithoutNgoInput>
    create: XOR<BankDetailCreateWithoutNgoInput, BankDetailUncheckedCreateWithoutNgoInput>
  }

  export type BankDetailUpdateWithWhereUniqueWithoutNgoInput = {
    where: BankDetailWhereUniqueInput
    data: XOR<BankDetailUpdateWithoutNgoInput, BankDetailUncheckedUpdateWithoutNgoInput>
  }

  export type BankDetailUpdateManyWithWhereWithoutNgoInput = {
    where: BankDetailScalarWhereInput
    data: XOR<BankDetailUpdateManyMutationInput, BankDetailUncheckedUpdateManyWithoutNgoInput>
  }

  export type BankDetailScalarWhereInput = {
    AND?: BankDetailScalarWhereInput | BankDetailScalarWhereInput[]
    OR?: BankDetailScalarWhereInput[]
    NOT?: BankDetailScalarWhereInput | BankDetailScalarWhereInput[]
    id?: StringFilter<"BankDetail"> | string
    ngoId?: StringNullableFilter<"BankDetail"> | string | null
    companyId?: StringNullableFilter<"BankDetail"> | string | null
    accountHolder?: StringFilter<"BankDetail"> | string
    bankName?: StringFilter<"BankDetail"> | string
    accountNumber?: StringFilter<"BankDetail"> | string
    ifsc?: StringFilter<"BankDetail"> | string
    branch?: StringNullableFilter<"BankDetail"> | string | null
  }

  export type DocumentUpsertWithWhereUniqueWithoutNgoInput = {
    where: DocumentWhereUniqueInput
    update: XOR<DocumentUpdateWithoutNgoInput, DocumentUncheckedUpdateWithoutNgoInput>
    create: XOR<DocumentCreateWithoutNgoInput, DocumentUncheckedCreateWithoutNgoInput>
  }

  export type DocumentUpdateWithWhereUniqueWithoutNgoInput = {
    where: DocumentWhereUniqueInput
    data: XOR<DocumentUpdateWithoutNgoInput, DocumentUncheckedUpdateWithoutNgoInput>
  }

  export type DocumentUpdateManyWithWhereWithoutNgoInput = {
    where: DocumentScalarWhereInput
    data: XOR<DocumentUpdateManyMutationInput, DocumentUncheckedUpdateManyWithoutNgoInput>
  }

  export type DocumentScalarWhereInput = {
    AND?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
    OR?: DocumentScalarWhereInput[]
    NOT?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
    id?: StringFilter<"Document"> | string
    ngoId?: StringNullableFilter<"Document"> | string | null
    companyId?: StringNullableFilter<"Document"> | string | null
    campaignId?: StringNullableFilter<"Document"> | string | null
    type?: EnumDocumentTypeFilter<"Document"> | $Enums.DocumentType
    title?: StringFilter<"Document"> | string
    url?: StringFilter<"Document"> | string
    uploadedAt?: DateTimeFilter<"Document"> | Date | string
    metadata?: JsonNullableFilter<"Document">
  }

  export type AddressUpsertWithWhereUniqueWithoutNgoInput = {
    where: AddressWhereUniqueInput
    update: XOR<AddressUpdateWithoutNgoInput, AddressUncheckedUpdateWithoutNgoInput>
    create: XOR<AddressCreateWithoutNgoInput, AddressUncheckedCreateWithoutNgoInput>
  }

  export type AddressUpdateWithWhereUniqueWithoutNgoInput = {
    where: AddressWhereUniqueInput
    data: XOR<AddressUpdateWithoutNgoInput, AddressUncheckedUpdateWithoutNgoInput>
  }

  export type AddressUpdateManyWithWhereWithoutNgoInput = {
    where: AddressScalarWhereInput
    data: XOR<AddressUpdateManyMutationInput, AddressUncheckedUpdateManyWithoutNgoInput>
  }

  export type AddressScalarWhereInput = {
    AND?: AddressScalarWhereInput | AddressScalarWhereInput[]
    OR?: AddressScalarWhereInput[]
    NOT?: AddressScalarWhereInput | AddressScalarWhereInput[]
    id?: StringFilter<"Address"> | string
    ngoId?: StringNullableFilter<"Address"> | string | null
    companyId?: StringNullableFilter<"Address"> | string | null
    donorId?: StringNullableFilter<"Address"> | string | null
    line1?: StringFilter<"Address"> | string
    line2?: StringNullableFilter<"Address"> | string | null
    city?: StringFilter<"Address"> | string
    state?: StringFilter<"Address"> | string
    country?: StringFilter<"Address"> | string
    postalCode?: StringFilter<"Address"> | string
    addressType?: StringNullableFilter<"Address"> | string | null
  }

  export type AuditLogUpsertWithWhereUniqueWithoutNgoInput = {
    where: AuditLogWhereUniqueInput
    update: XOR<AuditLogUpdateWithoutNgoInput, AuditLogUncheckedUpdateWithoutNgoInput>
    create: XOR<AuditLogCreateWithoutNgoInput, AuditLogUncheckedCreateWithoutNgoInput>
  }

  export type AuditLogUpdateWithWhereUniqueWithoutNgoInput = {
    where: AuditLogWhereUniqueInput
    data: XOR<AuditLogUpdateWithoutNgoInput, AuditLogUncheckedUpdateWithoutNgoInput>
  }

  export type AuditLogUpdateManyWithWhereWithoutNgoInput = {
    where: AuditLogScalarWhereInput
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyWithoutNgoInput>
  }

  export type UserCreateWithoutCompanyProfileInput = {
    id?: string
    name: string
    email: string
    phone?: string | null
    password: string
    role: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    ngoProfile?: NGOProfileCreateNestedOneWithoutUserInput
    donorProfile?: DonorProfileCreateNestedOneWithoutUserInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCompanyProfileInput = {
    id?: string
    name: string
    email: string
    phone?: string | null
    password: string
    role: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    ngoProfile?: NGOProfileUncheckedCreateNestedOneWithoutUserInput
    donorProfile?: DonorProfileUncheckedCreateNestedOneWithoutUserInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCompanyProfileInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCompanyProfileInput, UserUncheckedCreateWithoutCompanyProfileInput>
  }

  export type DonationCreateWithoutCompanyInput = {
    id?: string
    amount: number
    donationDate?: Date | string
    paymentRef?: string | null
    paymentMode?: string | null
    donor?: DonorProfileCreateNestedOneWithoutDonationsInput
    campaign: CampaignCreateNestedOneWithoutDonationsInput
    auditLogs?: AuditLogCreateNestedManyWithoutDonationInput
  }

  export type DonationUncheckedCreateWithoutCompanyInput = {
    id?: string
    donorId?: string | null
    campaignId: string
    amount: number
    donationDate?: Date | string
    paymentRef?: string | null
    paymentMode?: string | null
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutDonationInput
  }

  export type DonationCreateOrConnectWithoutCompanyInput = {
    where: DonationWhereUniqueInput
    create: XOR<DonationCreateWithoutCompanyInput, DonationUncheckedCreateWithoutCompanyInput>
  }

  export type DonationCreateManyCompanyInputEnvelope = {
    data: DonationCreateManyCompanyInput | DonationCreateManyCompanyInput[]
    skipDuplicates?: boolean
  }

  export type DocumentCreateWithoutCompanyInput = {
    id?: string
    type: $Enums.DocumentType
    title: string
    url: string
    uploadedAt?: Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    ngo?: NGOProfileCreateNestedOneWithoutDocumentsInput
    campaign?: CampaignCreateNestedOneWithoutDocumentsInput
  }

  export type DocumentUncheckedCreateWithoutCompanyInput = {
    id?: string
    ngoId?: string | null
    campaignId?: string | null
    type: $Enums.DocumentType
    title: string
    url: string
    uploadedAt?: Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type DocumentCreateOrConnectWithoutCompanyInput = {
    where: DocumentWhereUniqueInput
    create: XOR<DocumentCreateWithoutCompanyInput, DocumentUncheckedCreateWithoutCompanyInput>
  }

  export type DocumentCreateManyCompanyInputEnvelope = {
    data: DocumentCreateManyCompanyInput | DocumentCreateManyCompanyInput[]
    skipDuplicates?: boolean
  }

  export type BankDetailCreateWithoutCompanyInput = {
    id?: string
    accountHolder: string
    bankName: string
    accountNumber: string
    ifsc: string
    branch?: string | null
    ngo?: NGOProfileCreateNestedOneWithoutBankDetailsInput
  }

  export type BankDetailUncheckedCreateWithoutCompanyInput = {
    id?: string
    ngoId?: string | null
    accountHolder: string
    bankName: string
    accountNumber: string
    ifsc: string
    branch?: string | null
  }

  export type BankDetailCreateOrConnectWithoutCompanyInput = {
    where: BankDetailWhereUniqueInput
    create: XOR<BankDetailCreateWithoutCompanyInput, BankDetailUncheckedCreateWithoutCompanyInput>
  }

  export type BankDetailCreateManyCompanyInputEnvelope = {
    data: BankDetailCreateManyCompanyInput | BankDetailCreateManyCompanyInput[]
    skipDuplicates?: boolean
  }

  export type AddressCreateWithoutCompanyInput = {
    id?: string
    line1: string
    line2?: string | null
    city: string
    state: string
    country?: string
    postalCode: string
    addressType?: string | null
    ngo?: NGOProfileCreateNestedOneWithoutAddressesInput
    donor?: DonorProfileCreateNestedOneWithoutAddressesInput
  }

  export type AddressUncheckedCreateWithoutCompanyInput = {
    id?: string
    ngoId?: string | null
    donorId?: string | null
    line1: string
    line2?: string | null
    city: string
    state: string
    country?: string
    postalCode: string
    addressType?: string | null
  }

  export type AddressCreateOrConnectWithoutCompanyInput = {
    where: AddressWhereUniqueInput
    create: XOR<AddressCreateWithoutCompanyInput, AddressUncheckedCreateWithoutCompanyInput>
  }

  export type AddressCreateManyCompanyInputEnvelope = {
    data: AddressCreateManyCompanyInput | AddressCreateManyCompanyInput[]
    skipDuplicates?: boolean
  }

  export type AuditLogCreateWithoutCompanyInput = {
    id?: string
    action: string
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    user?: UserCreateNestedOneWithoutAuditLogsInput
    ngo?: NGOProfileCreateNestedOneWithoutAuditLogsInput
    donor?: DonorProfileCreateNestedOneWithoutAuditLogsInput
    campaign?: CampaignCreateNestedOneWithoutAuditLogsInput
    donation?: DonationCreateNestedOneWithoutAuditLogsInput
  }

  export type AuditLogUncheckedCreateWithoutCompanyInput = {
    id?: string
    userId?: string | null
    ngoId?: string | null
    donorId?: string | null
    campaignId?: string | null
    donationId?: string | null
    action: string
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AuditLogCreateOrConnectWithoutCompanyInput = {
    where: AuditLogWhereUniqueInput
    create: XOR<AuditLogCreateWithoutCompanyInput, AuditLogUncheckedCreateWithoutCompanyInput>
  }

  export type AuditLogCreateManyCompanyInputEnvelope = {
    data: AuditLogCreateManyCompanyInput | AuditLogCreateManyCompanyInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutCompanyProfileInput = {
    update: XOR<UserUpdateWithoutCompanyProfileInput, UserUncheckedUpdateWithoutCompanyProfileInput>
    create: XOR<UserCreateWithoutCompanyProfileInput, UserUncheckedCreateWithoutCompanyProfileInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCompanyProfileInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCompanyProfileInput, UserUncheckedUpdateWithoutCompanyProfileInput>
  }

  export type UserUpdateWithoutCompanyProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ngoProfile?: NGOProfileUpdateOneWithoutUserNestedInput
    donorProfile?: DonorProfileUpdateOneWithoutUserNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCompanyProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ngoProfile?: NGOProfileUncheckedUpdateOneWithoutUserNestedInput
    donorProfile?: DonorProfileUncheckedUpdateOneWithoutUserNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type DonationUpsertWithWhereUniqueWithoutCompanyInput = {
    where: DonationWhereUniqueInput
    update: XOR<DonationUpdateWithoutCompanyInput, DonationUncheckedUpdateWithoutCompanyInput>
    create: XOR<DonationCreateWithoutCompanyInput, DonationUncheckedCreateWithoutCompanyInput>
  }

  export type DonationUpdateWithWhereUniqueWithoutCompanyInput = {
    where: DonationWhereUniqueInput
    data: XOR<DonationUpdateWithoutCompanyInput, DonationUncheckedUpdateWithoutCompanyInput>
  }

  export type DonationUpdateManyWithWhereWithoutCompanyInput = {
    where: DonationScalarWhereInput
    data: XOR<DonationUpdateManyMutationInput, DonationUncheckedUpdateManyWithoutCompanyInput>
  }

  export type DonationScalarWhereInput = {
    AND?: DonationScalarWhereInput | DonationScalarWhereInput[]
    OR?: DonationScalarWhereInput[]
    NOT?: DonationScalarWhereInput | DonationScalarWhereInput[]
    id?: StringFilter<"Donation"> | string
    donorId?: StringNullableFilter<"Donation"> | string | null
    companyId?: StringNullableFilter<"Donation"> | string | null
    campaignId?: StringFilter<"Donation"> | string
    amount?: FloatFilter<"Donation"> | number
    donationDate?: DateTimeFilter<"Donation"> | Date | string
    paymentRef?: StringNullableFilter<"Donation"> | string | null
    paymentMode?: StringNullableFilter<"Donation"> | string | null
  }

  export type DocumentUpsertWithWhereUniqueWithoutCompanyInput = {
    where: DocumentWhereUniqueInput
    update: XOR<DocumentUpdateWithoutCompanyInput, DocumentUncheckedUpdateWithoutCompanyInput>
    create: XOR<DocumentCreateWithoutCompanyInput, DocumentUncheckedCreateWithoutCompanyInput>
  }

  export type DocumentUpdateWithWhereUniqueWithoutCompanyInput = {
    where: DocumentWhereUniqueInput
    data: XOR<DocumentUpdateWithoutCompanyInput, DocumentUncheckedUpdateWithoutCompanyInput>
  }

  export type DocumentUpdateManyWithWhereWithoutCompanyInput = {
    where: DocumentScalarWhereInput
    data: XOR<DocumentUpdateManyMutationInput, DocumentUncheckedUpdateManyWithoutCompanyInput>
  }

  export type BankDetailUpsertWithWhereUniqueWithoutCompanyInput = {
    where: BankDetailWhereUniqueInput
    update: XOR<BankDetailUpdateWithoutCompanyInput, BankDetailUncheckedUpdateWithoutCompanyInput>
    create: XOR<BankDetailCreateWithoutCompanyInput, BankDetailUncheckedCreateWithoutCompanyInput>
  }

  export type BankDetailUpdateWithWhereUniqueWithoutCompanyInput = {
    where: BankDetailWhereUniqueInput
    data: XOR<BankDetailUpdateWithoutCompanyInput, BankDetailUncheckedUpdateWithoutCompanyInput>
  }

  export type BankDetailUpdateManyWithWhereWithoutCompanyInput = {
    where: BankDetailScalarWhereInput
    data: XOR<BankDetailUpdateManyMutationInput, BankDetailUncheckedUpdateManyWithoutCompanyInput>
  }

  export type AddressUpsertWithWhereUniqueWithoutCompanyInput = {
    where: AddressWhereUniqueInput
    update: XOR<AddressUpdateWithoutCompanyInput, AddressUncheckedUpdateWithoutCompanyInput>
    create: XOR<AddressCreateWithoutCompanyInput, AddressUncheckedCreateWithoutCompanyInput>
  }

  export type AddressUpdateWithWhereUniqueWithoutCompanyInput = {
    where: AddressWhereUniqueInput
    data: XOR<AddressUpdateWithoutCompanyInput, AddressUncheckedUpdateWithoutCompanyInput>
  }

  export type AddressUpdateManyWithWhereWithoutCompanyInput = {
    where: AddressScalarWhereInput
    data: XOR<AddressUpdateManyMutationInput, AddressUncheckedUpdateManyWithoutCompanyInput>
  }

  export type AuditLogUpsertWithWhereUniqueWithoutCompanyInput = {
    where: AuditLogWhereUniqueInput
    update: XOR<AuditLogUpdateWithoutCompanyInput, AuditLogUncheckedUpdateWithoutCompanyInput>
    create: XOR<AuditLogCreateWithoutCompanyInput, AuditLogUncheckedCreateWithoutCompanyInput>
  }

  export type AuditLogUpdateWithWhereUniqueWithoutCompanyInput = {
    where: AuditLogWhereUniqueInput
    data: XOR<AuditLogUpdateWithoutCompanyInput, AuditLogUncheckedUpdateWithoutCompanyInput>
  }

  export type AuditLogUpdateManyWithWhereWithoutCompanyInput = {
    where: AuditLogScalarWhereInput
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyWithoutCompanyInput>
  }

  export type UserCreateWithoutDonorProfileInput = {
    id?: string
    name: string
    email: string
    phone?: string | null
    password: string
    role: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    ngoProfile?: NGOProfileCreateNestedOneWithoutUserInput
    companyProfile?: CompanyProfileCreateNestedOneWithoutUserInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutDonorProfileInput = {
    id?: string
    name: string
    email: string
    phone?: string | null
    password: string
    role: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    ngoProfile?: NGOProfileUncheckedCreateNestedOneWithoutUserInput
    companyProfile?: CompanyProfileUncheckedCreateNestedOneWithoutUserInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutDonorProfileInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutDonorProfileInput, UserUncheckedCreateWithoutDonorProfileInput>
  }

  export type DonationCreateWithoutDonorInput = {
    id?: string
    amount: number
    donationDate?: Date | string
    paymentRef?: string | null
    paymentMode?: string | null
    company?: CompanyProfileCreateNestedOneWithoutDonationsInput
    campaign: CampaignCreateNestedOneWithoutDonationsInput
    auditLogs?: AuditLogCreateNestedManyWithoutDonationInput
  }

  export type DonationUncheckedCreateWithoutDonorInput = {
    id?: string
    companyId?: string | null
    campaignId: string
    amount: number
    donationDate?: Date | string
    paymentRef?: string | null
    paymentMode?: string | null
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutDonationInput
  }

  export type DonationCreateOrConnectWithoutDonorInput = {
    where: DonationWhereUniqueInput
    create: XOR<DonationCreateWithoutDonorInput, DonationUncheckedCreateWithoutDonorInput>
  }

  export type DonationCreateManyDonorInputEnvelope = {
    data: DonationCreateManyDonorInput | DonationCreateManyDonorInput[]
    skipDuplicates?: boolean
  }

  export type AddressCreateWithoutDonorInput = {
    id?: string
    line1: string
    line2?: string | null
    city: string
    state: string
    country?: string
    postalCode: string
    addressType?: string | null
    ngo?: NGOProfileCreateNestedOneWithoutAddressesInput
    company?: CompanyProfileCreateNestedOneWithoutAddressesInput
  }

  export type AddressUncheckedCreateWithoutDonorInput = {
    id?: string
    ngoId?: string | null
    companyId?: string | null
    line1: string
    line2?: string | null
    city: string
    state: string
    country?: string
    postalCode: string
    addressType?: string | null
  }

  export type AddressCreateOrConnectWithoutDonorInput = {
    where: AddressWhereUniqueInput
    create: XOR<AddressCreateWithoutDonorInput, AddressUncheckedCreateWithoutDonorInput>
  }

  export type AddressCreateManyDonorInputEnvelope = {
    data: AddressCreateManyDonorInput | AddressCreateManyDonorInput[]
    skipDuplicates?: boolean
  }

  export type AuditLogCreateWithoutDonorInput = {
    id?: string
    action: string
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    user?: UserCreateNestedOneWithoutAuditLogsInput
    ngo?: NGOProfileCreateNestedOneWithoutAuditLogsInput
    company?: CompanyProfileCreateNestedOneWithoutAuditLogsInput
    campaign?: CampaignCreateNestedOneWithoutAuditLogsInput
    donation?: DonationCreateNestedOneWithoutAuditLogsInput
  }

  export type AuditLogUncheckedCreateWithoutDonorInput = {
    id?: string
    userId?: string | null
    ngoId?: string | null
    companyId?: string | null
    campaignId?: string | null
    donationId?: string | null
    action: string
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AuditLogCreateOrConnectWithoutDonorInput = {
    where: AuditLogWhereUniqueInput
    create: XOR<AuditLogCreateWithoutDonorInput, AuditLogUncheckedCreateWithoutDonorInput>
  }

  export type AuditLogCreateManyDonorInputEnvelope = {
    data: AuditLogCreateManyDonorInput | AuditLogCreateManyDonorInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutDonorProfileInput = {
    update: XOR<UserUpdateWithoutDonorProfileInput, UserUncheckedUpdateWithoutDonorProfileInput>
    create: XOR<UserCreateWithoutDonorProfileInput, UserUncheckedCreateWithoutDonorProfileInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutDonorProfileInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutDonorProfileInput, UserUncheckedUpdateWithoutDonorProfileInput>
  }

  export type UserUpdateWithoutDonorProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ngoProfile?: NGOProfileUpdateOneWithoutUserNestedInput
    companyProfile?: CompanyProfileUpdateOneWithoutUserNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutDonorProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ngoProfile?: NGOProfileUncheckedUpdateOneWithoutUserNestedInput
    companyProfile?: CompanyProfileUncheckedUpdateOneWithoutUserNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type DonationUpsertWithWhereUniqueWithoutDonorInput = {
    where: DonationWhereUniqueInput
    update: XOR<DonationUpdateWithoutDonorInput, DonationUncheckedUpdateWithoutDonorInput>
    create: XOR<DonationCreateWithoutDonorInput, DonationUncheckedCreateWithoutDonorInput>
  }

  export type DonationUpdateWithWhereUniqueWithoutDonorInput = {
    where: DonationWhereUniqueInput
    data: XOR<DonationUpdateWithoutDonorInput, DonationUncheckedUpdateWithoutDonorInput>
  }

  export type DonationUpdateManyWithWhereWithoutDonorInput = {
    where: DonationScalarWhereInput
    data: XOR<DonationUpdateManyMutationInput, DonationUncheckedUpdateManyWithoutDonorInput>
  }

  export type AddressUpsertWithWhereUniqueWithoutDonorInput = {
    where: AddressWhereUniqueInput
    update: XOR<AddressUpdateWithoutDonorInput, AddressUncheckedUpdateWithoutDonorInput>
    create: XOR<AddressCreateWithoutDonorInput, AddressUncheckedCreateWithoutDonorInput>
  }

  export type AddressUpdateWithWhereUniqueWithoutDonorInput = {
    where: AddressWhereUniqueInput
    data: XOR<AddressUpdateWithoutDonorInput, AddressUncheckedUpdateWithoutDonorInput>
  }

  export type AddressUpdateManyWithWhereWithoutDonorInput = {
    where: AddressScalarWhereInput
    data: XOR<AddressUpdateManyMutationInput, AddressUncheckedUpdateManyWithoutDonorInput>
  }

  export type AuditLogUpsertWithWhereUniqueWithoutDonorInput = {
    where: AuditLogWhereUniqueInput
    update: XOR<AuditLogUpdateWithoutDonorInput, AuditLogUncheckedUpdateWithoutDonorInput>
    create: XOR<AuditLogCreateWithoutDonorInput, AuditLogUncheckedCreateWithoutDonorInput>
  }

  export type AuditLogUpdateWithWhereUniqueWithoutDonorInput = {
    where: AuditLogWhereUniqueInput
    data: XOR<AuditLogUpdateWithoutDonorInput, AuditLogUncheckedUpdateWithoutDonorInput>
  }

  export type AuditLogUpdateManyWithWhereWithoutDonorInput = {
    where: AuditLogScalarWhereInput
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyWithoutDonorInput>
  }

  export type NGOProfileCreateWithoutCampaignsInput = {
    id?: string
    registrationType: $Enums.NGORegistrationType
    registrationNumber: string
    founderNames: string
    yearEstablished: number
    missionStatement: string
    impactSummary?: string | null
    website?: string | null
    twelveARegistered?: boolean
    eightyGRegistered?: boolean
    csrEligibility?: boolean
    user: UserCreateNestedOneWithoutNgoProfileInput
    bankDetails?: BankDetailCreateNestedManyWithoutNgoInput
    documents?: DocumentCreateNestedManyWithoutNgoInput
    addresses?: AddressCreateNestedManyWithoutNgoInput
    auditLogs?: AuditLogCreateNestedManyWithoutNgoInput
  }

  export type NGOProfileUncheckedCreateWithoutCampaignsInput = {
    id?: string
    userId: string
    registrationType: $Enums.NGORegistrationType
    registrationNumber: string
    founderNames: string
    yearEstablished: number
    missionStatement: string
    impactSummary?: string | null
    website?: string | null
    twelveARegistered?: boolean
    eightyGRegistered?: boolean
    csrEligibility?: boolean
    bankDetails?: BankDetailUncheckedCreateNestedManyWithoutNgoInput
    documents?: DocumentUncheckedCreateNestedManyWithoutNgoInput
    addresses?: AddressUncheckedCreateNestedManyWithoutNgoInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutNgoInput
  }

  export type NGOProfileCreateOrConnectWithoutCampaignsInput = {
    where: NGOProfileWhereUniqueInput
    create: XOR<NGOProfileCreateWithoutCampaignsInput, NGOProfileUncheckedCreateWithoutCampaignsInput>
  }

  export type DonationCreateWithoutCampaignInput = {
    id?: string
    amount: number
    donationDate?: Date | string
    paymentRef?: string | null
    paymentMode?: string | null
    donor?: DonorProfileCreateNestedOneWithoutDonationsInput
    company?: CompanyProfileCreateNestedOneWithoutDonationsInput
    auditLogs?: AuditLogCreateNestedManyWithoutDonationInput
  }

  export type DonationUncheckedCreateWithoutCampaignInput = {
    id?: string
    donorId?: string | null
    companyId?: string | null
    amount: number
    donationDate?: Date | string
    paymentRef?: string | null
    paymentMode?: string | null
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutDonationInput
  }

  export type DonationCreateOrConnectWithoutCampaignInput = {
    where: DonationWhereUniqueInput
    create: XOR<DonationCreateWithoutCampaignInput, DonationUncheckedCreateWithoutCampaignInput>
  }

  export type DonationCreateManyCampaignInputEnvelope = {
    data: DonationCreateManyCampaignInput | DonationCreateManyCampaignInput[]
    skipDuplicates?: boolean
  }

  export type DocumentCreateWithoutCampaignInput = {
    id?: string
    type: $Enums.DocumentType
    title: string
    url: string
    uploadedAt?: Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    ngo?: NGOProfileCreateNestedOneWithoutDocumentsInput
    company?: CompanyProfileCreateNestedOneWithoutDocumentsInput
  }

  export type DocumentUncheckedCreateWithoutCampaignInput = {
    id?: string
    ngoId?: string | null
    companyId?: string | null
    type: $Enums.DocumentType
    title: string
    url: string
    uploadedAt?: Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type DocumentCreateOrConnectWithoutCampaignInput = {
    where: DocumentWhereUniqueInput
    create: XOR<DocumentCreateWithoutCampaignInput, DocumentUncheckedCreateWithoutCampaignInput>
  }

  export type DocumentCreateManyCampaignInputEnvelope = {
    data: DocumentCreateManyCampaignInput | DocumentCreateManyCampaignInput[]
    skipDuplicates?: boolean
  }

  export type AuditLogCreateWithoutCampaignInput = {
    id?: string
    action: string
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    user?: UserCreateNestedOneWithoutAuditLogsInput
    ngo?: NGOProfileCreateNestedOneWithoutAuditLogsInput
    company?: CompanyProfileCreateNestedOneWithoutAuditLogsInput
    donor?: DonorProfileCreateNestedOneWithoutAuditLogsInput
    donation?: DonationCreateNestedOneWithoutAuditLogsInput
  }

  export type AuditLogUncheckedCreateWithoutCampaignInput = {
    id?: string
    userId?: string | null
    ngoId?: string | null
    companyId?: string | null
    donorId?: string | null
    donationId?: string | null
    action: string
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AuditLogCreateOrConnectWithoutCampaignInput = {
    where: AuditLogWhereUniqueInput
    create: XOR<AuditLogCreateWithoutCampaignInput, AuditLogUncheckedCreateWithoutCampaignInput>
  }

  export type AuditLogCreateManyCampaignInputEnvelope = {
    data: AuditLogCreateManyCampaignInput | AuditLogCreateManyCampaignInput[]
    skipDuplicates?: boolean
  }

  export type NGOProfileUpsertWithoutCampaignsInput = {
    update: XOR<NGOProfileUpdateWithoutCampaignsInput, NGOProfileUncheckedUpdateWithoutCampaignsInput>
    create: XOR<NGOProfileCreateWithoutCampaignsInput, NGOProfileUncheckedCreateWithoutCampaignsInput>
    where?: NGOProfileWhereInput
  }

  export type NGOProfileUpdateToOneWithWhereWithoutCampaignsInput = {
    where?: NGOProfileWhereInput
    data: XOR<NGOProfileUpdateWithoutCampaignsInput, NGOProfileUncheckedUpdateWithoutCampaignsInput>
  }

  export type NGOProfileUpdateWithoutCampaignsInput = {
    id?: StringFieldUpdateOperationsInput | string
    registrationType?: EnumNGORegistrationTypeFieldUpdateOperationsInput | $Enums.NGORegistrationType
    registrationNumber?: StringFieldUpdateOperationsInput | string
    founderNames?: StringFieldUpdateOperationsInput | string
    yearEstablished?: IntFieldUpdateOperationsInput | number
    missionStatement?: StringFieldUpdateOperationsInput | string
    impactSummary?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    twelveARegistered?: BoolFieldUpdateOperationsInput | boolean
    eightyGRegistered?: BoolFieldUpdateOperationsInput | boolean
    csrEligibility?: BoolFieldUpdateOperationsInput | boolean
    user?: UserUpdateOneRequiredWithoutNgoProfileNestedInput
    bankDetails?: BankDetailUpdateManyWithoutNgoNestedInput
    documents?: DocumentUpdateManyWithoutNgoNestedInput
    addresses?: AddressUpdateManyWithoutNgoNestedInput
    auditLogs?: AuditLogUpdateManyWithoutNgoNestedInput
  }

  export type NGOProfileUncheckedUpdateWithoutCampaignsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    registrationType?: EnumNGORegistrationTypeFieldUpdateOperationsInput | $Enums.NGORegistrationType
    registrationNumber?: StringFieldUpdateOperationsInput | string
    founderNames?: StringFieldUpdateOperationsInput | string
    yearEstablished?: IntFieldUpdateOperationsInput | number
    missionStatement?: StringFieldUpdateOperationsInput | string
    impactSummary?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    twelveARegistered?: BoolFieldUpdateOperationsInput | boolean
    eightyGRegistered?: BoolFieldUpdateOperationsInput | boolean
    csrEligibility?: BoolFieldUpdateOperationsInput | boolean
    bankDetails?: BankDetailUncheckedUpdateManyWithoutNgoNestedInput
    documents?: DocumentUncheckedUpdateManyWithoutNgoNestedInput
    addresses?: AddressUncheckedUpdateManyWithoutNgoNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutNgoNestedInput
  }

  export type DonationUpsertWithWhereUniqueWithoutCampaignInput = {
    where: DonationWhereUniqueInput
    update: XOR<DonationUpdateWithoutCampaignInput, DonationUncheckedUpdateWithoutCampaignInput>
    create: XOR<DonationCreateWithoutCampaignInput, DonationUncheckedCreateWithoutCampaignInput>
  }

  export type DonationUpdateWithWhereUniqueWithoutCampaignInput = {
    where: DonationWhereUniqueInput
    data: XOR<DonationUpdateWithoutCampaignInput, DonationUncheckedUpdateWithoutCampaignInput>
  }

  export type DonationUpdateManyWithWhereWithoutCampaignInput = {
    where: DonationScalarWhereInput
    data: XOR<DonationUpdateManyMutationInput, DonationUncheckedUpdateManyWithoutCampaignInput>
  }

  export type DocumentUpsertWithWhereUniqueWithoutCampaignInput = {
    where: DocumentWhereUniqueInput
    update: XOR<DocumentUpdateWithoutCampaignInput, DocumentUncheckedUpdateWithoutCampaignInput>
    create: XOR<DocumentCreateWithoutCampaignInput, DocumentUncheckedCreateWithoutCampaignInput>
  }

  export type DocumentUpdateWithWhereUniqueWithoutCampaignInput = {
    where: DocumentWhereUniqueInput
    data: XOR<DocumentUpdateWithoutCampaignInput, DocumentUncheckedUpdateWithoutCampaignInput>
  }

  export type DocumentUpdateManyWithWhereWithoutCampaignInput = {
    where: DocumentScalarWhereInput
    data: XOR<DocumentUpdateManyMutationInput, DocumentUncheckedUpdateManyWithoutCampaignInput>
  }

  export type AuditLogUpsertWithWhereUniqueWithoutCampaignInput = {
    where: AuditLogWhereUniqueInput
    update: XOR<AuditLogUpdateWithoutCampaignInput, AuditLogUncheckedUpdateWithoutCampaignInput>
    create: XOR<AuditLogCreateWithoutCampaignInput, AuditLogUncheckedCreateWithoutCampaignInput>
  }

  export type AuditLogUpdateWithWhereUniqueWithoutCampaignInput = {
    where: AuditLogWhereUniqueInput
    data: XOR<AuditLogUpdateWithoutCampaignInput, AuditLogUncheckedUpdateWithoutCampaignInput>
  }

  export type AuditLogUpdateManyWithWhereWithoutCampaignInput = {
    where: AuditLogScalarWhereInput
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyWithoutCampaignInput>
  }

  export type DonorProfileCreateWithoutDonationsInput = {
    id?: string
    pan?: string | null
    occupation?: string | null
    interests?: string | null
    user: UserCreateNestedOneWithoutDonorProfileInput
    addresses?: AddressCreateNestedManyWithoutDonorInput
    auditLogs?: AuditLogCreateNestedManyWithoutDonorInput
  }

  export type DonorProfileUncheckedCreateWithoutDonationsInput = {
    id?: string
    userId: string
    pan?: string | null
    occupation?: string | null
    interests?: string | null
    addresses?: AddressUncheckedCreateNestedManyWithoutDonorInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutDonorInput
  }

  export type DonorProfileCreateOrConnectWithoutDonationsInput = {
    where: DonorProfileWhereUniqueInput
    create: XOR<DonorProfileCreateWithoutDonationsInput, DonorProfileUncheckedCreateWithoutDonationsInput>
  }

  export type CompanyProfileCreateWithoutDonationsInput = {
    id?: string
    cin: string
    csrPolicyUrl?: string | null
    industry: string
    netWorth?: number | null
    averageProfit?: number | null
    csrBudget?: number | null
    csrCommittee?: string | null
    user: UserCreateNestedOneWithoutCompanyProfileInput
    documents?: DocumentCreateNestedManyWithoutCompanyInput
    bankDetails?: BankDetailCreateNestedManyWithoutCompanyInput
    addresses?: AddressCreateNestedManyWithoutCompanyInput
    auditLogs?: AuditLogCreateNestedManyWithoutCompanyInput
  }

  export type CompanyProfileUncheckedCreateWithoutDonationsInput = {
    id?: string
    userId: string
    cin: string
    csrPolicyUrl?: string | null
    industry: string
    netWorth?: number | null
    averageProfit?: number | null
    csrBudget?: number | null
    csrCommittee?: string | null
    documents?: DocumentUncheckedCreateNestedManyWithoutCompanyInput
    bankDetails?: BankDetailUncheckedCreateNestedManyWithoutCompanyInput
    addresses?: AddressUncheckedCreateNestedManyWithoutCompanyInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompanyProfileCreateOrConnectWithoutDonationsInput = {
    where: CompanyProfileWhereUniqueInput
    create: XOR<CompanyProfileCreateWithoutDonationsInput, CompanyProfileUncheckedCreateWithoutDonationsInput>
  }

  export type CampaignCreateWithoutDonationsInput = {
    id?: string
    title: string
    description: string
    category: $Enums.CampaignCategory
    goalAmount: number
    raisedAmount?: number
    startDate: Date | string
    endDate?: Date | string | null
    status: string
    ngo: NGOProfileCreateNestedOneWithoutCampaignsInput
    documents?: DocumentCreateNestedManyWithoutCampaignInput
    auditLogs?: AuditLogCreateNestedManyWithoutCampaignInput
  }

  export type CampaignUncheckedCreateWithoutDonationsInput = {
    id?: string
    ngoId: string
    title: string
    description: string
    category: $Enums.CampaignCategory
    goalAmount: number
    raisedAmount?: number
    startDate: Date | string
    endDate?: Date | string | null
    status: string
    documents?: DocumentUncheckedCreateNestedManyWithoutCampaignInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutCampaignInput
  }

  export type CampaignCreateOrConnectWithoutDonationsInput = {
    where: CampaignWhereUniqueInput
    create: XOR<CampaignCreateWithoutDonationsInput, CampaignUncheckedCreateWithoutDonationsInput>
  }

  export type AuditLogCreateWithoutDonationInput = {
    id?: string
    action: string
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    user?: UserCreateNestedOneWithoutAuditLogsInput
    ngo?: NGOProfileCreateNestedOneWithoutAuditLogsInput
    company?: CompanyProfileCreateNestedOneWithoutAuditLogsInput
    donor?: DonorProfileCreateNestedOneWithoutAuditLogsInput
    campaign?: CampaignCreateNestedOneWithoutAuditLogsInput
  }

  export type AuditLogUncheckedCreateWithoutDonationInput = {
    id?: string
    userId?: string | null
    ngoId?: string | null
    companyId?: string | null
    donorId?: string | null
    campaignId?: string | null
    action: string
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AuditLogCreateOrConnectWithoutDonationInput = {
    where: AuditLogWhereUniqueInput
    create: XOR<AuditLogCreateWithoutDonationInput, AuditLogUncheckedCreateWithoutDonationInput>
  }

  export type AuditLogCreateManyDonationInputEnvelope = {
    data: AuditLogCreateManyDonationInput | AuditLogCreateManyDonationInput[]
    skipDuplicates?: boolean
  }

  export type DonorProfileUpsertWithoutDonationsInput = {
    update: XOR<DonorProfileUpdateWithoutDonationsInput, DonorProfileUncheckedUpdateWithoutDonationsInput>
    create: XOR<DonorProfileCreateWithoutDonationsInput, DonorProfileUncheckedCreateWithoutDonationsInput>
    where?: DonorProfileWhereInput
  }

  export type DonorProfileUpdateToOneWithWhereWithoutDonationsInput = {
    where?: DonorProfileWhereInput
    data: XOR<DonorProfileUpdateWithoutDonationsInput, DonorProfileUncheckedUpdateWithoutDonationsInput>
  }

  export type DonorProfileUpdateWithoutDonationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    pan?: NullableStringFieldUpdateOperationsInput | string | null
    occupation?: NullableStringFieldUpdateOperationsInput | string | null
    interests?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutDonorProfileNestedInput
    addresses?: AddressUpdateManyWithoutDonorNestedInput
    auditLogs?: AuditLogUpdateManyWithoutDonorNestedInput
  }

  export type DonorProfileUncheckedUpdateWithoutDonationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    pan?: NullableStringFieldUpdateOperationsInput | string | null
    occupation?: NullableStringFieldUpdateOperationsInput | string | null
    interests?: NullableStringFieldUpdateOperationsInput | string | null
    addresses?: AddressUncheckedUpdateManyWithoutDonorNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutDonorNestedInput
  }

  export type CompanyProfileUpsertWithoutDonationsInput = {
    update: XOR<CompanyProfileUpdateWithoutDonationsInput, CompanyProfileUncheckedUpdateWithoutDonationsInput>
    create: XOR<CompanyProfileCreateWithoutDonationsInput, CompanyProfileUncheckedCreateWithoutDonationsInput>
    where?: CompanyProfileWhereInput
  }

  export type CompanyProfileUpdateToOneWithWhereWithoutDonationsInput = {
    where?: CompanyProfileWhereInput
    data: XOR<CompanyProfileUpdateWithoutDonationsInput, CompanyProfileUncheckedUpdateWithoutDonationsInput>
  }

  export type CompanyProfileUpdateWithoutDonationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    cin?: StringFieldUpdateOperationsInput | string
    csrPolicyUrl?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: StringFieldUpdateOperationsInput | string
    netWorth?: NullableFloatFieldUpdateOperationsInput | number | null
    averageProfit?: NullableFloatFieldUpdateOperationsInput | number | null
    csrBudget?: NullableFloatFieldUpdateOperationsInput | number | null
    csrCommittee?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutCompanyProfileNestedInput
    documents?: DocumentUpdateManyWithoutCompanyNestedInput
    bankDetails?: BankDetailUpdateManyWithoutCompanyNestedInput
    addresses?: AddressUpdateManyWithoutCompanyNestedInput
    auditLogs?: AuditLogUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyProfileUncheckedUpdateWithoutDonationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    cin?: StringFieldUpdateOperationsInput | string
    csrPolicyUrl?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: StringFieldUpdateOperationsInput | string
    netWorth?: NullableFloatFieldUpdateOperationsInput | number | null
    averageProfit?: NullableFloatFieldUpdateOperationsInput | number | null
    csrBudget?: NullableFloatFieldUpdateOperationsInput | number | null
    csrCommittee?: NullableStringFieldUpdateOperationsInput | string | null
    documents?: DocumentUncheckedUpdateManyWithoutCompanyNestedInput
    bankDetails?: BankDetailUncheckedUpdateManyWithoutCompanyNestedInput
    addresses?: AddressUncheckedUpdateManyWithoutCompanyNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type CampaignUpsertWithoutDonationsInput = {
    update: XOR<CampaignUpdateWithoutDonationsInput, CampaignUncheckedUpdateWithoutDonationsInput>
    create: XOR<CampaignCreateWithoutDonationsInput, CampaignUncheckedCreateWithoutDonationsInput>
    where?: CampaignWhereInput
  }

  export type CampaignUpdateToOneWithWhereWithoutDonationsInput = {
    where?: CampaignWhereInput
    data: XOR<CampaignUpdateWithoutDonationsInput, CampaignUncheckedUpdateWithoutDonationsInput>
  }

  export type CampaignUpdateWithoutDonationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: EnumCampaignCategoryFieldUpdateOperationsInput | $Enums.CampaignCategory
    goalAmount?: FloatFieldUpdateOperationsInput | number
    raisedAmount?: FloatFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    ngo?: NGOProfileUpdateOneRequiredWithoutCampaignsNestedInput
    documents?: DocumentUpdateManyWithoutCampaignNestedInput
    auditLogs?: AuditLogUpdateManyWithoutCampaignNestedInput
  }

  export type CampaignUncheckedUpdateWithoutDonationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    ngoId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: EnumCampaignCategoryFieldUpdateOperationsInput | $Enums.CampaignCategory
    goalAmount?: FloatFieldUpdateOperationsInput | number
    raisedAmount?: FloatFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    documents?: DocumentUncheckedUpdateManyWithoutCampaignNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutCampaignNestedInput
  }

  export type AuditLogUpsertWithWhereUniqueWithoutDonationInput = {
    where: AuditLogWhereUniqueInput
    update: XOR<AuditLogUpdateWithoutDonationInput, AuditLogUncheckedUpdateWithoutDonationInput>
    create: XOR<AuditLogCreateWithoutDonationInput, AuditLogUncheckedCreateWithoutDonationInput>
  }

  export type AuditLogUpdateWithWhereUniqueWithoutDonationInput = {
    where: AuditLogWhereUniqueInput
    data: XOR<AuditLogUpdateWithoutDonationInput, AuditLogUncheckedUpdateWithoutDonationInput>
  }

  export type AuditLogUpdateManyWithWhereWithoutDonationInput = {
    where: AuditLogScalarWhereInput
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyWithoutDonationInput>
  }

  export type NGOProfileCreateWithoutBankDetailsInput = {
    id?: string
    registrationType: $Enums.NGORegistrationType
    registrationNumber: string
    founderNames: string
    yearEstablished: number
    missionStatement: string
    impactSummary?: string | null
    website?: string | null
    twelveARegistered?: boolean
    eightyGRegistered?: boolean
    csrEligibility?: boolean
    user: UserCreateNestedOneWithoutNgoProfileInput
    campaigns?: CampaignCreateNestedManyWithoutNgoInput
    documents?: DocumentCreateNestedManyWithoutNgoInput
    addresses?: AddressCreateNestedManyWithoutNgoInput
    auditLogs?: AuditLogCreateNestedManyWithoutNgoInput
  }

  export type NGOProfileUncheckedCreateWithoutBankDetailsInput = {
    id?: string
    userId: string
    registrationType: $Enums.NGORegistrationType
    registrationNumber: string
    founderNames: string
    yearEstablished: number
    missionStatement: string
    impactSummary?: string | null
    website?: string | null
    twelveARegistered?: boolean
    eightyGRegistered?: boolean
    csrEligibility?: boolean
    campaigns?: CampaignUncheckedCreateNestedManyWithoutNgoInput
    documents?: DocumentUncheckedCreateNestedManyWithoutNgoInput
    addresses?: AddressUncheckedCreateNestedManyWithoutNgoInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutNgoInput
  }

  export type NGOProfileCreateOrConnectWithoutBankDetailsInput = {
    where: NGOProfileWhereUniqueInput
    create: XOR<NGOProfileCreateWithoutBankDetailsInput, NGOProfileUncheckedCreateWithoutBankDetailsInput>
  }

  export type CompanyProfileCreateWithoutBankDetailsInput = {
    id?: string
    cin: string
    csrPolicyUrl?: string | null
    industry: string
    netWorth?: number | null
    averageProfit?: number | null
    csrBudget?: number | null
    csrCommittee?: string | null
    user: UserCreateNestedOneWithoutCompanyProfileInput
    donations?: DonationCreateNestedManyWithoutCompanyInput
    documents?: DocumentCreateNestedManyWithoutCompanyInput
    addresses?: AddressCreateNestedManyWithoutCompanyInput
    auditLogs?: AuditLogCreateNestedManyWithoutCompanyInput
  }

  export type CompanyProfileUncheckedCreateWithoutBankDetailsInput = {
    id?: string
    userId: string
    cin: string
    csrPolicyUrl?: string | null
    industry: string
    netWorth?: number | null
    averageProfit?: number | null
    csrBudget?: number | null
    csrCommittee?: string | null
    donations?: DonationUncheckedCreateNestedManyWithoutCompanyInput
    documents?: DocumentUncheckedCreateNestedManyWithoutCompanyInput
    addresses?: AddressUncheckedCreateNestedManyWithoutCompanyInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompanyProfileCreateOrConnectWithoutBankDetailsInput = {
    where: CompanyProfileWhereUniqueInput
    create: XOR<CompanyProfileCreateWithoutBankDetailsInput, CompanyProfileUncheckedCreateWithoutBankDetailsInput>
  }

  export type NGOProfileUpsertWithoutBankDetailsInput = {
    update: XOR<NGOProfileUpdateWithoutBankDetailsInput, NGOProfileUncheckedUpdateWithoutBankDetailsInput>
    create: XOR<NGOProfileCreateWithoutBankDetailsInput, NGOProfileUncheckedCreateWithoutBankDetailsInput>
    where?: NGOProfileWhereInput
  }

  export type NGOProfileUpdateToOneWithWhereWithoutBankDetailsInput = {
    where?: NGOProfileWhereInput
    data: XOR<NGOProfileUpdateWithoutBankDetailsInput, NGOProfileUncheckedUpdateWithoutBankDetailsInput>
  }

  export type NGOProfileUpdateWithoutBankDetailsInput = {
    id?: StringFieldUpdateOperationsInput | string
    registrationType?: EnumNGORegistrationTypeFieldUpdateOperationsInput | $Enums.NGORegistrationType
    registrationNumber?: StringFieldUpdateOperationsInput | string
    founderNames?: StringFieldUpdateOperationsInput | string
    yearEstablished?: IntFieldUpdateOperationsInput | number
    missionStatement?: StringFieldUpdateOperationsInput | string
    impactSummary?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    twelveARegistered?: BoolFieldUpdateOperationsInput | boolean
    eightyGRegistered?: BoolFieldUpdateOperationsInput | boolean
    csrEligibility?: BoolFieldUpdateOperationsInput | boolean
    user?: UserUpdateOneRequiredWithoutNgoProfileNestedInput
    campaigns?: CampaignUpdateManyWithoutNgoNestedInput
    documents?: DocumentUpdateManyWithoutNgoNestedInput
    addresses?: AddressUpdateManyWithoutNgoNestedInput
    auditLogs?: AuditLogUpdateManyWithoutNgoNestedInput
  }

  export type NGOProfileUncheckedUpdateWithoutBankDetailsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    registrationType?: EnumNGORegistrationTypeFieldUpdateOperationsInput | $Enums.NGORegistrationType
    registrationNumber?: StringFieldUpdateOperationsInput | string
    founderNames?: StringFieldUpdateOperationsInput | string
    yearEstablished?: IntFieldUpdateOperationsInput | number
    missionStatement?: StringFieldUpdateOperationsInput | string
    impactSummary?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    twelveARegistered?: BoolFieldUpdateOperationsInput | boolean
    eightyGRegistered?: BoolFieldUpdateOperationsInput | boolean
    csrEligibility?: BoolFieldUpdateOperationsInput | boolean
    campaigns?: CampaignUncheckedUpdateManyWithoutNgoNestedInput
    documents?: DocumentUncheckedUpdateManyWithoutNgoNestedInput
    addresses?: AddressUncheckedUpdateManyWithoutNgoNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutNgoNestedInput
  }

  export type CompanyProfileUpsertWithoutBankDetailsInput = {
    update: XOR<CompanyProfileUpdateWithoutBankDetailsInput, CompanyProfileUncheckedUpdateWithoutBankDetailsInput>
    create: XOR<CompanyProfileCreateWithoutBankDetailsInput, CompanyProfileUncheckedCreateWithoutBankDetailsInput>
    where?: CompanyProfileWhereInput
  }

  export type CompanyProfileUpdateToOneWithWhereWithoutBankDetailsInput = {
    where?: CompanyProfileWhereInput
    data: XOR<CompanyProfileUpdateWithoutBankDetailsInput, CompanyProfileUncheckedUpdateWithoutBankDetailsInput>
  }

  export type CompanyProfileUpdateWithoutBankDetailsInput = {
    id?: StringFieldUpdateOperationsInput | string
    cin?: StringFieldUpdateOperationsInput | string
    csrPolicyUrl?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: StringFieldUpdateOperationsInput | string
    netWorth?: NullableFloatFieldUpdateOperationsInput | number | null
    averageProfit?: NullableFloatFieldUpdateOperationsInput | number | null
    csrBudget?: NullableFloatFieldUpdateOperationsInput | number | null
    csrCommittee?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutCompanyProfileNestedInput
    donations?: DonationUpdateManyWithoutCompanyNestedInput
    documents?: DocumentUpdateManyWithoutCompanyNestedInput
    addresses?: AddressUpdateManyWithoutCompanyNestedInput
    auditLogs?: AuditLogUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyProfileUncheckedUpdateWithoutBankDetailsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    cin?: StringFieldUpdateOperationsInput | string
    csrPolicyUrl?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: StringFieldUpdateOperationsInput | string
    netWorth?: NullableFloatFieldUpdateOperationsInput | number | null
    averageProfit?: NullableFloatFieldUpdateOperationsInput | number | null
    csrBudget?: NullableFloatFieldUpdateOperationsInput | number | null
    csrCommittee?: NullableStringFieldUpdateOperationsInput | string | null
    donations?: DonationUncheckedUpdateManyWithoutCompanyNestedInput
    documents?: DocumentUncheckedUpdateManyWithoutCompanyNestedInput
    addresses?: AddressUncheckedUpdateManyWithoutCompanyNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type NGOProfileCreateWithoutDocumentsInput = {
    id?: string
    registrationType: $Enums.NGORegistrationType
    registrationNumber: string
    founderNames: string
    yearEstablished: number
    missionStatement: string
    impactSummary?: string | null
    website?: string | null
    twelveARegistered?: boolean
    eightyGRegistered?: boolean
    csrEligibility?: boolean
    user: UserCreateNestedOneWithoutNgoProfileInput
    campaigns?: CampaignCreateNestedManyWithoutNgoInput
    bankDetails?: BankDetailCreateNestedManyWithoutNgoInput
    addresses?: AddressCreateNestedManyWithoutNgoInput
    auditLogs?: AuditLogCreateNestedManyWithoutNgoInput
  }

  export type NGOProfileUncheckedCreateWithoutDocumentsInput = {
    id?: string
    userId: string
    registrationType: $Enums.NGORegistrationType
    registrationNumber: string
    founderNames: string
    yearEstablished: number
    missionStatement: string
    impactSummary?: string | null
    website?: string | null
    twelveARegistered?: boolean
    eightyGRegistered?: boolean
    csrEligibility?: boolean
    campaigns?: CampaignUncheckedCreateNestedManyWithoutNgoInput
    bankDetails?: BankDetailUncheckedCreateNestedManyWithoutNgoInput
    addresses?: AddressUncheckedCreateNestedManyWithoutNgoInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutNgoInput
  }

  export type NGOProfileCreateOrConnectWithoutDocumentsInput = {
    where: NGOProfileWhereUniqueInput
    create: XOR<NGOProfileCreateWithoutDocumentsInput, NGOProfileUncheckedCreateWithoutDocumentsInput>
  }

  export type CompanyProfileCreateWithoutDocumentsInput = {
    id?: string
    cin: string
    csrPolicyUrl?: string | null
    industry: string
    netWorth?: number | null
    averageProfit?: number | null
    csrBudget?: number | null
    csrCommittee?: string | null
    user: UserCreateNestedOneWithoutCompanyProfileInput
    donations?: DonationCreateNestedManyWithoutCompanyInput
    bankDetails?: BankDetailCreateNestedManyWithoutCompanyInput
    addresses?: AddressCreateNestedManyWithoutCompanyInput
    auditLogs?: AuditLogCreateNestedManyWithoutCompanyInput
  }

  export type CompanyProfileUncheckedCreateWithoutDocumentsInput = {
    id?: string
    userId: string
    cin: string
    csrPolicyUrl?: string | null
    industry: string
    netWorth?: number | null
    averageProfit?: number | null
    csrBudget?: number | null
    csrCommittee?: string | null
    donations?: DonationUncheckedCreateNestedManyWithoutCompanyInput
    bankDetails?: BankDetailUncheckedCreateNestedManyWithoutCompanyInput
    addresses?: AddressUncheckedCreateNestedManyWithoutCompanyInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompanyProfileCreateOrConnectWithoutDocumentsInput = {
    where: CompanyProfileWhereUniqueInput
    create: XOR<CompanyProfileCreateWithoutDocumentsInput, CompanyProfileUncheckedCreateWithoutDocumentsInput>
  }

  export type CampaignCreateWithoutDocumentsInput = {
    id?: string
    title: string
    description: string
    category: $Enums.CampaignCategory
    goalAmount: number
    raisedAmount?: number
    startDate: Date | string
    endDate?: Date | string | null
    status: string
    ngo: NGOProfileCreateNestedOneWithoutCampaignsInput
    donations?: DonationCreateNestedManyWithoutCampaignInput
    auditLogs?: AuditLogCreateNestedManyWithoutCampaignInput
  }

  export type CampaignUncheckedCreateWithoutDocumentsInput = {
    id?: string
    ngoId: string
    title: string
    description: string
    category: $Enums.CampaignCategory
    goalAmount: number
    raisedAmount?: number
    startDate: Date | string
    endDate?: Date | string | null
    status: string
    donations?: DonationUncheckedCreateNestedManyWithoutCampaignInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutCampaignInput
  }

  export type CampaignCreateOrConnectWithoutDocumentsInput = {
    where: CampaignWhereUniqueInput
    create: XOR<CampaignCreateWithoutDocumentsInput, CampaignUncheckedCreateWithoutDocumentsInput>
  }

  export type NGOProfileUpsertWithoutDocumentsInput = {
    update: XOR<NGOProfileUpdateWithoutDocumentsInput, NGOProfileUncheckedUpdateWithoutDocumentsInput>
    create: XOR<NGOProfileCreateWithoutDocumentsInput, NGOProfileUncheckedCreateWithoutDocumentsInput>
    where?: NGOProfileWhereInput
  }

  export type NGOProfileUpdateToOneWithWhereWithoutDocumentsInput = {
    where?: NGOProfileWhereInput
    data: XOR<NGOProfileUpdateWithoutDocumentsInput, NGOProfileUncheckedUpdateWithoutDocumentsInput>
  }

  export type NGOProfileUpdateWithoutDocumentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    registrationType?: EnumNGORegistrationTypeFieldUpdateOperationsInput | $Enums.NGORegistrationType
    registrationNumber?: StringFieldUpdateOperationsInput | string
    founderNames?: StringFieldUpdateOperationsInput | string
    yearEstablished?: IntFieldUpdateOperationsInput | number
    missionStatement?: StringFieldUpdateOperationsInput | string
    impactSummary?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    twelveARegistered?: BoolFieldUpdateOperationsInput | boolean
    eightyGRegistered?: BoolFieldUpdateOperationsInput | boolean
    csrEligibility?: BoolFieldUpdateOperationsInput | boolean
    user?: UserUpdateOneRequiredWithoutNgoProfileNestedInput
    campaigns?: CampaignUpdateManyWithoutNgoNestedInput
    bankDetails?: BankDetailUpdateManyWithoutNgoNestedInput
    addresses?: AddressUpdateManyWithoutNgoNestedInput
    auditLogs?: AuditLogUpdateManyWithoutNgoNestedInput
  }

  export type NGOProfileUncheckedUpdateWithoutDocumentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    registrationType?: EnumNGORegistrationTypeFieldUpdateOperationsInput | $Enums.NGORegistrationType
    registrationNumber?: StringFieldUpdateOperationsInput | string
    founderNames?: StringFieldUpdateOperationsInput | string
    yearEstablished?: IntFieldUpdateOperationsInput | number
    missionStatement?: StringFieldUpdateOperationsInput | string
    impactSummary?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    twelveARegistered?: BoolFieldUpdateOperationsInput | boolean
    eightyGRegistered?: BoolFieldUpdateOperationsInput | boolean
    csrEligibility?: BoolFieldUpdateOperationsInput | boolean
    campaigns?: CampaignUncheckedUpdateManyWithoutNgoNestedInput
    bankDetails?: BankDetailUncheckedUpdateManyWithoutNgoNestedInput
    addresses?: AddressUncheckedUpdateManyWithoutNgoNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutNgoNestedInput
  }

  export type CompanyProfileUpsertWithoutDocumentsInput = {
    update: XOR<CompanyProfileUpdateWithoutDocumentsInput, CompanyProfileUncheckedUpdateWithoutDocumentsInput>
    create: XOR<CompanyProfileCreateWithoutDocumentsInput, CompanyProfileUncheckedCreateWithoutDocumentsInput>
    where?: CompanyProfileWhereInput
  }

  export type CompanyProfileUpdateToOneWithWhereWithoutDocumentsInput = {
    where?: CompanyProfileWhereInput
    data: XOR<CompanyProfileUpdateWithoutDocumentsInput, CompanyProfileUncheckedUpdateWithoutDocumentsInput>
  }

  export type CompanyProfileUpdateWithoutDocumentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    cin?: StringFieldUpdateOperationsInput | string
    csrPolicyUrl?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: StringFieldUpdateOperationsInput | string
    netWorth?: NullableFloatFieldUpdateOperationsInput | number | null
    averageProfit?: NullableFloatFieldUpdateOperationsInput | number | null
    csrBudget?: NullableFloatFieldUpdateOperationsInput | number | null
    csrCommittee?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutCompanyProfileNestedInput
    donations?: DonationUpdateManyWithoutCompanyNestedInput
    bankDetails?: BankDetailUpdateManyWithoutCompanyNestedInput
    addresses?: AddressUpdateManyWithoutCompanyNestedInput
    auditLogs?: AuditLogUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyProfileUncheckedUpdateWithoutDocumentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    cin?: StringFieldUpdateOperationsInput | string
    csrPolicyUrl?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: StringFieldUpdateOperationsInput | string
    netWorth?: NullableFloatFieldUpdateOperationsInput | number | null
    averageProfit?: NullableFloatFieldUpdateOperationsInput | number | null
    csrBudget?: NullableFloatFieldUpdateOperationsInput | number | null
    csrCommittee?: NullableStringFieldUpdateOperationsInput | string | null
    donations?: DonationUncheckedUpdateManyWithoutCompanyNestedInput
    bankDetails?: BankDetailUncheckedUpdateManyWithoutCompanyNestedInput
    addresses?: AddressUncheckedUpdateManyWithoutCompanyNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type CampaignUpsertWithoutDocumentsInput = {
    update: XOR<CampaignUpdateWithoutDocumentsInput, CampaignUncheckedUpdateWithoutDocumentsInput>
    create: XOR<CampaignCreateWithoutDocumentsInput, CampaignUncheckedCreateWithoutDocumentsInput>
    where?: CampaignWhereInput
  }

  export type CampaignUpdateToOneWithWhereWithoutDocumentsInput = {
    where?: CampaignWhereInput
    data: XOR<CampaignUpdateWithoutDocumentsInput, CampaignUncheckedUpdateWithoutDocumentsInput>
  }

  export type CampaignUpdateWithoutDocumentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: EnumCampaignCategoryFieldUpdateOperationsInput | $Enums.CampaignCategory
    goalAmount?: FloatFieldUpdateOperationsInput | number
    raisedAmount?: FloatFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    ngo?: NGOProfileUpdateOneRequiredWithoutCampaignsNestedInput
    donations?: DonationUpdateManyWithoutCampaignNestedInput
    auditLogs?: AuditLogUpdateManyWithoutCampaignNestedInput
  }

  export type CampaignUncheckedUpdateWithoutDocumentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    ngoId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: EnumCampaignCategoryFieldUpdateOperationsInput | $Enums.CampaignCategory
    goalAmount?: FloatFieldUpdateOperationsInput | number
    raisedAmount?: FloatFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    donations?: DonationUncheckedUpdateManyWithoutCampaignNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutCampaignNestedInput
  }

  export type NGOProfileCreateWithoutAddressesInput = {
    id?: string
    registrationType: $Enums.NGORegistrationType
    registrationNumber: string
    founderNames: string
    yearEstablished: number
    missionStatement: string
    impactSummary?: string | null
    website?: string | null
    twelveARegistered?: boolean
    eightyGRegistered?: boolean
    csrEligibility?: boolean
    user: UserCreateNestedOneWithoutNgoProfileInput
    campaigns?: CampaignCreateNestedManyWithoutNgoInput
    bankDetails?: BankDetailCreateNestedManyWithoutNgoInput
    documents?: DocumentCreateNestedManyWithoutNgoInput
    auditLogs?: AuditLogCreateNestedManyWithoutNgoInput
  }

  export type NGOProfileUncheckedCreateWithoutAddressesInput = {
    id?: string
    userId: string
    registrationType: $Enums.NGORegistrationType
    registrationNumber: string
    founderNames: string
    yearEstablished: number
    missionStatement: string
    impactSummary?: string | null
    website?: string | null
    twelveARegistered?: boolean
    eightyGRegistered?: boolean
    csrEligibility?: boolean
    campaigns?: CampaignUncheckedCreateNestedManyWithoutNgoInput
    bankDetails?: BankDetailUncheckedCreateNestedManyWithoutNgoInput
    documents?: DocumentUncheckedCreateNestedManyWithoutNgoInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutNgoInput
  }

  export type NGOProfileCreateOrConnectWithoutAddressesInput = {
    where: NGOProfileWhereUniqueInput
    create: XOR<NGOProfileCreateWithoutAddressesInput, NGOProfileUncheckedCreateWithoutAddressesInput>
  }

  export type CompanyProfileCreateWithoutAddressesInput = {
    id?: string
    cin: string
    csrPolicyUrl?: string | null
    industry: string
    netWorth?: number | null
    averageProfit?: number | null
    csrBudget?: number | null
    csrCommittee?: string | null
    user: UserCreateNestedOneWithoutCompanyProfileInput
    donations?: DonationCreateNestedManyWithoutCompanyInput
    documents?: DocumentCreateNestedManyWithoutCompanyInput
    bankDetails?: BankDetailCreateNestedManyWithoutCompanyInput
    auditLogs?: AuditLogCreateNestedManyWithoutCompanyInput
  }

  export type CompanyProfileUncheckedCreateWithoutAddressesInput = {
    id?: string
    userId: string
    cin: string
    csrPolicyUrl?: string | null
    industry: string
    netWorth?: number | null
    averageProfit?: number | null
    csrBudget?: number | null
    csrCommittee?: string | null
    donations?: DonationUncheckedCreateNestedManyWithoutCompanyInput
    documents?: DocumentUncheckedCreateNestedManyWithoutCompanyInput
    bankDetails?: BankDetailUncheckedCreateNestedManyWithoutCompanyInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompanyProfileCreateOrConnectWithoutAddressesInput = {
    where: CompanyProfileWhereUniqueInput
    create: XOR<CompanyProfileCreateWithoutAddressesInput, CompanyProfileUncheckedCreateWithoutAddressesInput>
  }

  export type DonorProfileCreateWithoutAddressesInput = {
    id?: string
    pan?: string | null
    occupation?: string | null
    interests?: string | null
    user: UserCreateNestedOneWithoutDonorProfileInput
    donations?: DonationCreateNestedManyWithoutDonorInput
    auditLogs?: AuditLogCreateNestedManyWithoutDonorInput
  }

  export type DonorProfileUncheckedCreateWithoutAddressesInput = {
    id?: string
    userId: string
    pan?: string | null
    occupation?: string | null
    interests?: string | null
    donations?: DonationUncheckedCreateNestedManyWithoutDonorInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutDonorInput
  }

  export type DonorProfileCreateOrConnectWithoutAddressesInput = {
    where: DonorProfileWhereUniqueInput
    create: XOR<DonorProfileCreateWithoutAddressesInput, DonorProfileUncheckedCreateWithoutAddressesInput>
  }

  export type NGOProfileUpsertWithoutAddressesInput = {
    update: XOR<NGOProfileUpdateWithoutAddressesInput, NGOProfileUncheckedUpdateWithoutAddressesInput>
    create: XOR<NGOProfileCreateWithoutAddressesInput, NGOProfileUncheckedCreateWithoutAddressesInput>
    where?: NGOProfileWhereInput
  }

  export type NGOProfileUpdateToOneWithWhereWithoutAddressesInput = {
    where?: NGOProfileWhereInput
    data: XOR<NGOProfileUpdateWithoutAddressesInput, NGOProfileUncheckedUpdateWithoutAddressesInput>
  }

  export type NGOProfileUpdateWithoutAddressesInput = {
    id?: StringFieldUpdateOperationsInput | string
    registrationType?: EnumNGORegistrationTypeFieldUpdateOperationsInput | $Enums.NGORegistrationType
    registrationNumber?: StringFieldUpdateOperationsInput | string
    founderNames?: StringFieldUpdateOperationsInput | string
    yearEstablished?: IntFieldUpdateOperationsInput | number
    missionStatement?: StringFieldUpdateOperationsInput | string
    impactSummary?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    twelveARegistered?: BoolFieldUpdateOperationsInput | boolean
    eightyGRegistered?: BoolFieldUpdateOperationsInput | boolean
    csrEligibility?: BoolFieldUpdateOperationsInput | boolean
    user?: UserUpdateOneRequiredWithoutNgoProfileNestedInput
    campaigns?: CampaignUpdateManyWithoutNgoNestedInput
    bankDetails?: BankDetailUpdateManyWithoutNgoNestedInput
    documents?: DocumentUpdateManyWithoutNgoNestedInput
    auditLogs?: AuditLogUpdateManyWithoutNgoNestedInput
  }

  export type NGOProfileUncheckedUpdateWithoutAddressesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    registrationType?: EnumNGORegistrationTypeFieldUpdateOperationsInput | $Enums.NGORegistrationType
    registrationNumber?: StringFieldUpdateOperationsInput | string
    founderNames?: StringFieldUpdateOperationsInput | string
    yearEstablished?: IntFieldUpdateOperationsInput | number
    missionStatement?: StringFieldUpdateOperationsInput | string
    impactSummary?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    twelveARegistered?: BoolFieldUpdateOperationsInput | boolean
    eightyGRegistered?: BoolFieldUpdateOperationsInput | boolean
    csrEligibility?: BoolFieldUpdateOperationsInput | boolean
    campaigns?: CampaignUncheckedUpdateManyWithoutNgoNestedInput
    bankDetails?: BankDetailUncheckedUpdateManyWithoutNgoNestedInput
    documents?: DocumentUncheckedUpdateManyWithoutNgoNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutNgoNestedInput
  }

  export type CompanyProfileUpsertWithoutAddressesInput = {
    update: XOR<CompanyProfileUpdateWithoutAddressesInput, CompanyProfileUncheckedUpdateWithoutAddressesInput>
    create: XOR<CompanyProfileCreateWithoutAddressesInput, CompanyProfileUncheckedCreateWithoutAddressesInput>
    where?: CompanyProfileWhereInput
  }

  export type CompanyProfileUpdateToOneWithWhereWithoutAddressesInput = {
    where?: CompanyProfileWhereInput
    data: XOR<CompanyProfileUpdateWithoutAddressesInput, CompanyProfileUncheckedUpdateWithoutAddressesInput>
  }

  export type CompanyProfileUpdateWithoutAddressesInput = {
    id?: StringFieldUpdateOperationsInput | string
    cin?: StringFieldUpdateOperationsInput | string
    csrPolicyUrl?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: StringFieldUpdateOperationsInput | string
    netWorth?: NullableFloatFieldUpdateOperationsInput | number | null
    averageProfit?: NullableFloatFieldUpdateOperationsInput | number | null
    csrBudget?: NullableFloatFieldUpdateOperationsInput | number | null
    csrCommittee?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutCompanyProfileNestedInput
    donations?: DonationUpdateManyWithoutCompanyNestedInput
    documents?: DocumentUpdateManyWithoutCompanyNestedInput
    bankDetails?: BankDetailUpdateManyWithoutCompanyNestedInput
    auditLogs?: AuditLogUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyProfileUncheckedUpdateWithoutAddressesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    cin?: StringFieldUpdateOperationsInput | string
    csrPolicyUrl?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: StringFieldUpdateOperationsInput | string
    netWorth?: NullableFloatFieldUpdateOperationsInput | number | null
    averageProfit?: NullableFloatFieldUpdateOperationsInput | number | null
    csrBudget?: NullableFloatFieldUpdateOperationsInput | number | null
    csrCommittee?: NullableStringFieldUpdateOperationsInput | string | null
    donations?: DonationUncheckedUpdateManyWithoutCompanyNestedInput
    documents?: DocumentUncheckedUpdateManyWithoutCompanyNestedInput
    bankDetails?: BankDetailUncheckedUpdateManyWithoutCompanyNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type DonorProfileUpsertWithoutAddressesInput = {
    update: XOR<DonorProfileUpdateWithoutAddressesInput, DonorProfileUncheckedUpdateWithoutAddressesInput>
    create: XOR<DonorProfileCreateWithoutAddressesInput, DonorProfileUncheckedCreateWithoutAddressesInput>
    where?: DonorProfileWhereInput
  }

  export type DonorProfileUpdateToOneWithWhereWithoutAddressesInput = {
    where?: DonorProfileWhereInput
    data: XOR<DonorProfileUpdateWithoutAddressesInput, DonorProfileUncheckedUpdateWithoutAddressesInput>
  }

  export type DonorProfileUpdateWithoutAddressesInput = {
    id?: StringFieldUpdateOperationsInput | string
    pan?: NullableStringFieldUpdateOperationsInput | string | null
    occupation?: NullableStringFieldUpdateOperationsInput | string | null
    interests?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutDonorProfileNestedInput
    donations?: DonationUpdateManyWithoutDonorNestedInput
    auditLogs?: AuditLogUpdateManyWithoutDonorNestedInput
  }

  export type DonorProfileUncheckedUpdateWithoutAddressesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    pan?: NullableStringFieldUpdateOperationsInput | string | null
    occupation?: NullableStringFieldUpdateOperationsInput | string | null
    interests?: NullableStringFieldUpdateOperationsInput | string | null
    donations?: DonationUncheckedUpdateManyWithoutDonorNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutDonorNestedInput
  }

  export type UserCreateWithoutAuditLogsInput = {
    id?: string
    name: string
    email: string
    phone?: string | null
    password: string
    role: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    ngoProfile?: NGOProfileCreateNestedOneWithoutUserInput
    companyProfile?: CompanyProfileCreateNestedOneWithoutUserInput
    donorProfile?: DonorProfileCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAuditLogsInput = {
    id?: string
    name: string
    email: string
    phone?: string | null
    password: string
    role: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    ngoProfile?: NGOProfileUncheckedCreateNestedOneWithoutUserInput
    companyProfile?: CompanyProfileUncheckedCreateNestedOneWithoutUserInput
    donorProfile?: DonorProfileUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAuditLogsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
  }

  export type NGOProfileCreateWithoutAuditLogsInput = {
    id?: string
    registrationType: $Enums.NGORegistrationType
    registrationNumber: string
    founderNames: string
    yearEstablished: number
    missionStatement: string
    impactSummary?: string | null
    website?: string | null
    twelveARegistered?: boolean
    eightyGRegistered?: boolean
    csrEligibility?: boolean
    user: UserCreateNestedOneWithoutNgoProfileInput
    campaigns?: CampaignCreateNestedManyWithoutNgoInput
    bankDetails?: BankDetailCreateNestedManyWithoutNgoInput
    documents?: DocumentCreateNestedManyWithoutNgoInput
    addresses?: AddressCreateNestedManyWithoutNgoInput
  }

  export type NGOProfileUncheckedCreateWithoutAuditLogsInput = {
    id?: string
    userId: string
    registrationType: $Enums.NGORegistrationType
    registrationNumber: string
    founderNames: string
    yearEstablished: number
    missionStatement: string
    impactSummary?: string | null
    website?: string | null
    twelveARegistered?: boolean
    eightyGRegistered?: boolean
    csrEligibility?: boolean
    campaigns?: CampaignUncheckedCreateNestedManyWithoutNgoInput
    bankDetails?: BankDetailUncheckedCreateNestedManyWithoutNgoInput
    documents?: DocumentUncheckedCreateNestedManyWithoutNgoInput
    addresses?: AddressUncheckedCreateNestedManyWithoutNgoInput
  }

  export type NGOProfileCreateOrConnectWithoutAuditLogsInput = {
    where: NGOProfileWhereUniqueInput
    create: XOR<NGOProfileCreateWithoutAuditLogsInput, NGOProfileUncheckedCreateWithoutAuditLogsInput>
  }

  export type CompanyProfileCreateWithoutAuditLogsInput = {
    id?: string
    cin: string
    csrPolicyUrl?: string | null
    industry: string
    netWorth?: number | null
    averageProfit?: number | null
    csrBudget?: number | null
    csrCommittee?: string | null
    user: UserCreateNestedOneWithoutCompanyProfileInput
    donations?: DonationCreateNestedManyWithoutCompanyInput
    documents?: DocumentCreateNestedManyWithoutCompanyInput
    bankDetails?: BankDetailCreateNestedManyWithoutCompanyInput
    addresses?: AddressCreateNestedManyWithoutCompanyInput
  }

  export type CompanyProfileUncheckedCreateWithoutAuditLogsInput = {
    id?: string
    userId: string
    cin: string
    csrPolicyUrl?: string | null
    industry: string
    netWorth?: number | null
    averageProfit?: number | null
    csrBudget?: number | null
    csrCommittee?: string | null
    donations?: DonationUncheckedCreateNestedManyWithoutCompanyInput
    documents?: DocumentUncheckedCreateNestedManyWithoutCompanyInput
    bankDetails?: BankDetailUncheckedCreateNestedManyWithoutCompanyInput
    addresses?: AddressUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompanyProfileCreateOrConnectWithoutAuditLogsInput = {
    where: CompanyProfileWhereUniqueInput
    create: XOR<CompanyProfileCreateWithoutAuditLogsInput, CompanyProfileUncheckedCreateWithoutAuditLogsInput>
  }

  export type DonorProfileCreateWithoutAuditLogsInput = {
    id?: string
    pan?: string | null
    occupation?: string | null
    interests?: string | null
    user: UserCreateNestedOneWithoutDonorProfileInput
    donations?: DonationCreateNestedManyWithoutDonorInput
    addresses?: AddressCreateNestedManyWithoutDonorInput
  }

  export type DonorProfileUncheckedCreateWithoutAuditLogsInput = {
    id?: string
    userId: string
    pan?: string | null
    occupation?: string | null
    interests?: string | null
    donations?: DonationUncheckedCreateNestedManyWithoutDonorInput
    addresses?: AddressUncheckedCreateNestedManyWithoutDonorInput
  }

  export type DonorProfileCreateOrConnectWithoutAuditLogsInput = {
    where: DonorProfileWhereUniqueInput
    create: XOR<DonorProfileCreateWithoutAuditLogsInput, DonorProfileUncheckedCreateWithoutAuditLogsInput>
  }

  export type CampaignCreateWithoutAuditLogsInput = {
    id?: string
    title: string
    description: string
    category: $Enums.CampaignCategory
    goalAmount: number
    raisedAmount?: number
    startDate: Date | string
    endDate?: Date | string | null
    status: string
    ngo: NGOProfileCreateNestedOneWithoutCampaignsInput
    donations?: DonationCreateNestedManyWithoutCampaignInput
    documents?: DocumentCreateNestedManyWithoutCampaignInput
  }

  export type CampaignUncheckedCreateWithoutAuditLogsInput = {
    id?: string
    ngoId: string
    title: string
    description: string
    category: $Enums.CampaignCategory
    goalAmount: number
    raisedAmount?: number
    startDate: Date | string
    endDate?: Date | string | null
    status: string
    donations?: DonationUncheckedCreateNestedManyWithoutCampaignInput
    documents?: DocumentUncheckedCreateNestedManyWithoutCampaignInput
  }

  export type CampaignCreateOrConnectWithoutAuditLogsInput = {
    where: CampaignWhereUniqueInput
    create: XOR<CampaignCreateWithoutAuditLogsInput, CampaignUncheckedCreateWithoutAuditLogsInput>
  }

  export type DonationCreateWithoutAuditLogsInput = {
    id?: string
    amount: number
    donationDate?: Date | string
    paymentRef?: string | null
    paymentMode?: string | null
    donor?: DonorProfileCreateNestedOneWithoutDonationsInput
    company?: CompanyProfileCreateNestedOneWithoutDonationsInput
    campaign: CampaignCreateNestedOneWithoutDonationsInput
  }

  export type DonationUncheckedCreateWithoutAuditLogsInput = {
    id?: string
    donorId?: string | null
    companyId?: string | null
    campaignId: string
    amount: number
    donationDate?: Date | string
    paymentRef?: string | null
    paymentMode?: string | null
  }

  export type DonationCreateOrConnectWithoutAuditLogsInput = {
    where: DonationWhereUniqueInput
    create: XOR<DonationCreateWithoutAuditLogsInput, DonationUncheckedCreateWithoutAuditLogsInput>
  }

  export type UserUpsertWithoutAuditLogsInput = {
    update: XOR<UserUpdateWithoutAuditLogsInput, UserUncheckedUpdateWithoutAuditLogsInput>
    create: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAuditLogsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAuditLogsInput, UserUncheckedUpdateWithoutAuditLogsInput>
  }

  export type UserUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ngoProfile?: NGOProfileUpdateOneWithoutUserNestedInput
    companyProfile?: CompanyProfileUpdateOneWithoutUserNestedInput
    donorProfile?: DonorProfileUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ngoProfile?: NGOProfileUncheckedUpdateOneWithoutUserNestedInput
    companyProfile?: CompanyProfileUncheckedUpdateOneWithoutUserNestedInput
    donorProfile?: DonorProfileUncheckedUpdateOneWithoutUserNestedInput
  }

  export type NGOProfileUpsertWithoutAuditLogsInput = {
    update: XOR<NGOProfileUpdateWithoutAuditLogsInput, NGOProfileUncheckedUpdateWithoutAuditLogsInput>
    create: XOR<NGOProfileCreateWithoutAuditLogsInput, NGOProfileUncheckedCreateWithoutAuditLogsInput>
    where?: NGOProfileWhereInput
  }

  export type NGOProfileUpdateToOneWithWhereWithoutAuditLogsInput = {
    where?: NGOProfileWhereInput
    data: XOR<NGOProfileUpdateWithoutAuditLogsInput, NGOProfileUncheckedUpdateWithoutAuditLogsInput>
  }

  export type NGOProfileUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    registrationType?: EnumNGORegistrationTypeFieldUpdateOperationsInput | $Enums.NGORegistrationType
    registrationNumber?: StringFieldUpdateOperationsInput | string
    founderNames?: StringFieldUpdateOperationsInput | string
    yearEstablished?: IntFieldUpdateOperationsInput | number
    missionStatement?: StringFieldUpdateOperationsInput | string
    impactSummary?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    twelveARegistered?: BoolFieldUpdateOperationsInput | boolean
    eightyGRegistered?: BoolFieldUpdateOperationsInput | boolean
    csrEligibility?: BoolFieldUpdateOperationsInput | boolean
    user?: UserUpdateOneRequiredWithoutNgoProfileNestedInput
    campaigns?: CampaignUpdateManyWithoutNgoNestedInput
    bankDetails?: BankDetailUpdateManyWithoutNgoNestedInput
    documents?: DocumentUpdateManyWithoutNgoNestedInput
    addresses?: AddressUpdateManyWithoutNgoNestedInput
  }

  export type NGOProfileUncheckedUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    registrationType?: EnumNGORegistrationTypeFieldUpdateOperationsInput | $Enums.NGORegistrationType
    registrationNumber?: StringFieldUpdateOperationsInput | string
    founderNames?: StringFieldUpdateOperationsInput | string
    yearEstablished?: IntFieldUpdateOperationsInput | number
    missionStatement?: StringFieldUpdateOperationsInput | string
    impactSummary?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    twelveARegistered?: BoolFieldUpdateOperationsInput | boolean
    eightyGRegistered?: BoolFieldUpdateOperationsInput | boolean
    csrEligibility?: BoolFieldUpdateOperationsInput | boolean
    campaigns?: CampaignUncheckedUpdateManyWithoutNgoNestedInput
    bankDetails?: BankDetailUncheckedUpdateManyWithoutNgoNestedInput
    documents?: DocumentUncheckedUpdateManyWithoutNgoNestedInput
    addresses?: AddressUncheckedUpdateManyWithoutNgoNestedInput
  }

  export type CompanyProfileUpsertWithoutAuditLogsInput = {
    update: XOR<CompanyProfileUpdateWithoutAuditLogsInput, CompanyProfileUncheckedUpdateWithoutAuditLogsInput>
    create: XOR<CompanyProfileCreateWithoutAuditLogsInput, CompanyProfileUncheckedCreateWithoutAuditLogsInput>
    where?: CompanyProfileWhereInput
  }

  export type CompanyProfileUpdateToOneWithWhereWithoutAuditLogsInput = {
    where?: CompanyProfileWhereInput
    data: XOR<CompanyProfileUpdateWithoutAuditLogsInput, CompanyProfileUncheckedUpdateWithoutAuditLogsInput>
  }

  export type CompanyProfileUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    cin?: StringFieldUpdateOperationsInput | string
    csrPolicyUrl?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: StringFieldUpdateOperationsInput | string
    netWorth?: NullableFloatFieldUpdateOperationsInput | number | null
    averageProfit?: NullableFloatFieldUpdateOperationsInput | number | null
    csrBudget?: NullableFloatFieldUpdateOperationsInput | number | null
    csrCommittee?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutCompanyProfileNestedInput
    donations?: DonationUpdateManyWithoutCompanyNestedInput
    documents?: DocumentUpdateManyWithoutCompanyNestedInput
    bankDetails?: BankDetailUpdateManyWithoutCompanyNestedInput
    addresses?: AddressUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyProfileUncheckedUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    cin?: StringFieldUpdateOperationsInput | string
    csrPolicyUrl?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: StringFieldUpdateOperationsInput | string
    netWorth?: NullableFloatFieldUpdateOperationsInput | number | null
    averageProfit?: NullableFloatFieldUpdateOperationsInput | number | null
    csrBudget?: NullableFloatFieldUpdateOperationsInput | number | null
    csrCommittee?: NullableStringFieldUpdateOperationsInput | string | null
    donations?: DonationUncheckedUpdateManyWithoutCompanyNestedInput
    documents?: DocumentUncheckedUpdateManyWithoutCompanyNestedInput
    bankDetails?: BankDetailUncheckedUpdateManyWithoutCompanyNestedInput
    addresses?: AddressUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type DonorProfileUpsertWithoutAuditLogsInput = {
    update: XOR<DonorProfileUpdateWithoutAuditLogsInput, DonorProfileUncheckedUpdateWithoutAuditLogsInput>
    create: XOR<DonorProfileCreateWithoutAuditLogsInput, DonorProfileUncheckedCreateWithoutAuditLogsInput>
    where?: DonorProfileWhereInput
  }

  export type DonorProfileUpdateToOneWithWhereWithoutAuditLogsInput = {
    where?: DonorProfileWhereInput
    data: XOR<DonorProfileUpdateWithoutAuditLogsInput, DonorProfileUncheckedUpdateWithoutAuditLogsInput>
  }

  export type DonorProfileUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    pan?: NullableStringFieldUpdateOperationsInput | string | null
    occupation?: NullableStringFieldUpdateOperationsInput | string | null
    interests?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutDonorProfileNestedInput
    donations?: DonationUpdateManyWithoutDonorNestedInput
    addresses?: AddressUpdateManyWithoutDonorNestedInput
  }

  export type DonorProfileUncheckedUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    pan?: NullableStringFieldUpdateOperationsInput | string | null
    occupation?: NullableStringFieldUpdateOperationsInput | string | null
    interests?: NullableStringFieldUpdateOperationsInput | string | null
    donations?: DonationUncheckedUpdateManyWithoutDonorNestedInput
    addresses?: AddressUncheckedUpdateManyWithoutDonorNestedInput
  }

  export type CampaignUpsertWithoutAuditLogsInput = {
    update: XOR<CampaignUpdateWithoutAuditLogsInput, CampaignUncheckedUpdateWithoutAuditLogsInput>
    create: XOR<CampaignCreateWithoutAuditLogsInput, CampaignUncheckedCreateWithoutAuditLogsInput>
    where?: CampaignWhereInput
  }

  export type CampaignUpdateToOneWithWhereWithoutAuditLogsInput = {
    where?: CampaignWhereInput
    data: XOR<CampaignUpdateWithoutAuditLogsInput, CampaignUncheckedUpdateWithoutAuditLogsInput>
  }

  export type CampaignUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: EnumCampaignCategoryFieldUpdateOperationsInput | $Enums.CampaignCategory
    goalAmount?: FloatFieldUpdateOperationsInput | number
    raisedAmount?: FloatFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    ngo?: NGOProfileUpdateOneRequiredWithoutCampaignsNestedInput
    donations?: DonationUpdateManyWithoutCampaignNestedInput
    documents?: DocumentUpdateManyWithoutCampaignNestedInput
  }

  export type CampaignUncheckedUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    ngoId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: EnumCampaignCategoryFieldUpdateOperationsInput | $Enums.CampaignCategory
    goalAmount?: FloatFieldUpdateOperationsInput | number
    raisedAmount?: FloatFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    donations?: DonationUncheckedUpdateManyWithoutCampaignNestedInput
    documents?: DocumentUncheckedUpdateManyWithoutCampaignNestedInput
  }

  export type DonationUpsertWithoutAuditLogsInput = {
    update: XOR<DonationUpdateWithoutAuditLogsInput, DonationUncheckedUpdateWithoutAuditLogsInput>
    create: XOR<DonationCreateWithoutAuditLogsInput, DonationUncheckedCreateWithoutAuditLogsInput>
    where?: DonationWhereInput
  }

  export type DonationUpdateToOneWithWhereWithoutAuditLogsInput = {
    where?: DonationWhereInput
    data: XOR<DonationUpdateWithoutAuditLogsInput, DonationUncheckedUpdateWithoutAuditLogsInput>
  }

  export type DonationUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    donationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentRef?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMode?: NullableStringFieldUpdateOperationsInput | string | null
    donor?: DonorProfileUpdateOneWithoutDonationsNestedInput
    company?: CompanyProfileUpdateOneWithoutDonationsNestedInput
    campaign?: CampaignUpdateOneRequiredWithoutDonationsNestedInput
  }

  export type DonationUncheckedUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    donorId?: NullableStringFieldUpdateOperationsInput | string | null
    companyId?: NullableStringFieldUpdateOperationsInput | string | null
    campaignId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    donationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentRef?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMode?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AuditLogCreateManyUserInput = {
    id?: string
    ngoId?: string | null
    companyId?: string | null
    donorId?: string | null
    campaignId?: string | null
    donationId?: string | null
    action: string
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AuditLogUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ngo?: NGOProfileUpdateOneWithoutAuditLogsNestedInput
    company?: CompanyProfileUpdateOneWithoutAuditLogsNestedInput
    donor?: DonorProfileUpdateOneWithoutAuditLogsNestedInput
    campaign?: CampaignUpdateOneWithoutAuditLogsNestedInput
    donation?: DonationUpdateOneWithoutAuditLogsNestedInput
  }

  export type AuditLogUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    ngoId?: NullableStringFieldUpdateOperationsInput | string | null
    companyId?: NullableStringFieldUpdateOperationsInput | string | null
    donorId?: NullableStringFieldUpdateOperationsInput | string | null
    campaignId?: NullableStringFieldUpdateOperationsInput | string | null
    donationId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    ngoId?: NullableStringFieldUpdateOperationsInput | string | null
    companyId?: NullableStringFieldUpdateOperationsInput | string | null
    donorId?: NullableStringFieldUpdateOperationsInput | string | null
    campaignId?: NullableStringFieldUpdateOperationsInput | string | null
    donationId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CampaignCreateManyNgoInput = {
    id?: string
    title: string
    description: string
    category: $Enums.CampaignCategory
    goalAmount: number
    raisedAmount?: number
    startDate: Date | string
    endDate?: Date | string | null
    status: string
  }

  export type BankDetailCreateManyNgoInput = {
    id?: string
    companyId?: string | null
    accountHolder: string
    bankName: string
    accountNumber: string
    ifsc: string
    branch?: string | null
  }

  export type DocumentCreateManyNgoInput = {
    id?: string
    companyId?: string | null
    campaignId?: string | null
    type: $Enums.DocumentType
    title: string
    url: string
    uploadedAt?: Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type AddressCreateManyNgoInput = {
    id?: string
    companyId?: string | null
    donorId?: string | null
    line1: string
    line2?: string | null
    city: string
    state: string
    country?: string
    postalCode: string
    addressType?: string | null
  }

  export type AuditLogCreateManyNgoInput = {
    id?: string
    userId?: string | null
    companyId?: string | null
    donorId?: string | null
    campaignId?: string | null
    donationId?: string | null
    action: string
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type CampaignUpdateWithoutNgoInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: EnumCampaignCategoryFieldUpdateOperationsInput | $Enums.CampaignCategory
    goalAmount?: FloatFieldUpdateOperationsInput | number
    raisedAmount?: FloatFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    donations?: DonationUpdateManyWithoutCampaignNestedInput
    documents?: DocumentUpdateManyWithoutCampaignNestedInput
    auditLogs?: AuditLogUpdateManyWithoutCampaignNestedInput
  }

  export type CampaignUncheckedUpdateWithoutNgoInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: EnumCampaignCategoryFieldUpdateOperationsInput | $Enums.CampaignCategory
    goalAmount?: FloatFieldUpdateOperationsInput | number
    raisedAmount?: FloatFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    donations?: DonationUncheckedUpdateManyWithoutCampaignNestedInput
    documents?: DocumentUncheckedUpdateManyWithoutCampaignNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutCampaignNestedInput
  }

  export type CampaignUncheckedUpdateManyWithoutNgoInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: EnumCampaignCategoryFieldUpdateOperationsInput | $Enums.CampaignCategory
    goalAmount?: FloatFieldUpdateOperationsInput | number
    raisedAmount?: FloatFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
  }

  export type BankDetailUpdateWithoutNgoInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountHolder?: StringFieldUpdateOperationsInput | string
    bankName?: StringFieldUpdateOperationsInput | string
    accountNumber?: StringFieldUpdateOperationsInput | string
    ifsc?: StringFieldUpdateOperationsInput | string
    branch?: NullableStringFieldUpdateOperationsInput | string | null
    company?: CompanyProfileUpdateOneWithoutBankDetailsNestedInput
  }

  export type BankDetailUncheckedUpdateWithoutNgoInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: NullableStringFieldUpdateOperationsInput | string | null
    accountHolder?: StringFieldUpdateOperationsInput | string
    bankName?: StringFieldUpdateOperationsInput | string
    accountNumber?: StringFieldUpdateOperationsInput | string
    ifsc?: StringFieldUpdateOperationsInput | string
    branch?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type BankDetailUncheckedUpdateManyWithoutNgoInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: NullableStringFieldUpdateOperationsInput | string | null
    accountHolder?: StringFieldUpdateOperationsInput | string
    bankName?: StringFieldUpdateOperationsInput | string
    accountNumber?: StringFieldUpdateOperationsInput | string
    ifsc?: StringFieldUpdateOperationsInput | string
    branch?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DocumentUpdateWithoutNgoInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumDocumentTypeFieldUpdateOperationsInput | $Enums.DocumentType
    title?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    company?: CompanyProfileUpdateOneWithoutDocumentsNestedInput
    campaign?: CampaignUpdateOneWithoutDocumentsNestedInput
  }

  export type DocumentUncheckedUpdateWithoutNgoInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: NullableStringFieldUpdateOperationsInput | string | null
    campaignId?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumDocumentTypeFieldUpdateOperationsInput | $Enums.DocumentType
    title?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type DocumentUncheckedUpdateManyWithoutNgoInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: NullableStringFieldUpdateOperationsInput | string | null
    campaignId?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumDocumentTypeFieldUpdateOperationsInput | $Enums.DocumentType
    title?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type AddressUpdateWithoutNgoInput = {
    id?: StringFieldUpdateOperationsInput | string
    line1?: StringFieldUpdateOperationsInput | string
    line2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    postalCode?: StringFieldUpdateOperationsInput | string
    addressType?: NullableStringFieldUpdateOperationsInput | string | null
    company?: CompanyProfileUpdateOneWithoutAddressesNestedInput
    donor?: DonorProfileUpdateOneWithoutAddressesNestedInput
  }

  export type AddressUncheckedUpdateWithoutNgoInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: NullableStringFieldUpdateOperationsInput | string | null
    donorId?: NullableStringFieldUpdateOperationsInput | string | null
    line1?: StringFieldUpdateOperationsInput | string
    line2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    postalCode?: StringFieldUpdateOperationsInput | string
    addressType?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AddressUncheckedUpdateManyWithoutNgoInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: NullableStringFieldUpdateOperationsInput | string | null
    donorId?: NullableStringFieldUpdateOperationsInput | string | null
    line1?: StringFieldUpdateOperationsInput | string
    line2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    postalCode?: StringFieldUpdateOperationsInput | string
    addressType?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AuditLogUpdateWithoutNgoInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutAuditLogsNestedInput
    company?: CompanyProfileUpdateOneWithoutAuditLogsNestedInput
    donor?: DonorProfileUpdateOneWithoutAuditLogsNestedInput
    campaign?: CampaignUpdateOneWithoutAuditLogsNestedInput
    donation?: DonationUpdateOneWithoutAuditLogsNestedInput
  }

  export type AuditLogUncheckedUpdateWithoutNgoInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    companyId?: NullableStringFieldUpdateOperationsInput | string | null
    donorId?: NullableStringFieldUpdateOperationsInput | string | null
    campaignId?: NullableStringFieldUpdateOperationsInput | string | null
    donationId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyWithoutNgoInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    companyId?: NullableStringFieldUpdateOperationsInput | string | null
    donorId?: NullableStringFieldUpdateOperationsInput | string | null
    campaignId?: NullableStringFieldUpdateOperationsInput | string | null
    donationId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DonationCreateManyCompanyInput = {
    id?: string
    donorId?: string | null
    campaignId: string
    amount: number
    donationDate?: Date | string
    paymentRef?: string | null
    paymentMode?: string | null
  }

  export type DocumentCreateManyCompanyInput = {
    id?: string
    ngoId?: string | null
    campaignId?: string | null
    type: $Enums.DocumentType
    title: string
    url: string
    uploadedAt?: Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type BankDetailCreateManyCompanyInput = {
    id?: string
    ngoId?: string | null
    accountHolder: string
    bankName: string
    accountNumber: string
    ifsc: string
    branch?: string | null
  }

  export type AddressCreateManyCompanyInput = {
    id?: string
    ngoId?: string | null
    donorId?: string | null
    line1: string
    line2?: string | null
    city: string
    state: string
    country?: string
    postalCode: string
    addressType?: string | null
  }

  export type AuditLogCreateManyCompanyInput = {
    id?: string
    userId?: string | null
    ngoId?: string | null
    donorId?: string | null
    campaignId?: string | null
    donationId?: string | null
    action: string
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type DonationUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    donationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentRef?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMode?: NullableStringFieldUpdateOperationsInput | string | null
    donor?: DonorProfileUpdateOneWithoutDonationsNestedInput
    campaign?: CampaignUpdateOneRequiredWithoutDonationsNestedInput
    auditLogs?: AuditLogUpdateManyWithoutDonationNestedInput
  }

  export type DonationUncheckedUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    donorId?: NullableStringFieldUpdateOperationsInput | string | null
    campaignId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    donationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentRef?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMode?: NullableStringFieldUpdateOperationsInput | string | null
    auditLogs?: AuditLogUncheckedUpdateManyWithoutDonationNestedInput
  }

  export type DonationUncheckedUpdateManyWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    donorId?: NullableStringFieldUpdateOperationsInput | string | null
    campaignId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    donationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentRef?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMode?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DocumentUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumDocumentTypeFieldUpdateOperationsInput | $Enums.DocumentType
    title?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    ngo?: NGOProfileUpdateOneWithoutDocumentsNestedInput
    campaign?: CampaignUpdateOneWithoutDocumentsNestedInput
  }

  export type DocumentUncheckedUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    ngoId?: NullableStringFieldUpdateOperationsInput | string | null
    campaignId?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumDocumentTypeFieldUpdateOperationsInput | $Enums.DocumentType
    title?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type DocumentUncheckedUpdateManyWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    ngoId?: NullableStringFieldUpdateOperationsInput | string | null
    campaignId?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumDocumentTypeFieldUpdateOperationsInput | $Enums.DocumentType
    title?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type BankDetailUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountHolder?: StringFieldUpdateOperationsInput | string
    bankName?: StringFieldUpdateOperationsInput | string
    accountNumber?: StringFieldUpdateOperationsInput | string
    ifsc?: StringFieldUpdateOperationsInput | string
    branch?: NullableStringFieldUpdateOperationsInput | string | null
    ngo?: NGOProfileUpdateOneWithoutBankDetailsNestedInput
  }

  export type BankDetailUncheckedUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    ngoId?: NullableStringFieldUpdateOperationsInput | string | null
    accountHolder?: StringFieldUpdateOperationsInput | string
    bankName?: StringFieldUpdateOperationsInput | string
    accountNumber?: StringFieldUpdateOperationsInput | string
    ifsc?: StringFieldUpdateOperationsInput | string
    branch?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type BankDetailUncheckedUpdateManyWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    ngoId?: NullableStringFieldUpdateOperationsInput | string | null
    accountHolder?: StringFieldUpdateOperationsInput | string
    bankName?: StringFieldUpdateOperationsInput | string
    accountNumber?: StringFieldUpdateOperationsInput | string
    ifsc?: StringFieldUpdateOperationsInput | string
    branch?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AddressUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    line1?: StringFieldUpdateOperationsInput | string
    line2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    postalCode?: StringFieldUpdateOperationsInput | string
    addressType?: NullableStringFieldUpdateOperationsInput | string | null
    ngo?: NGOProfileUpdateOneWithoutAddressesNestedInput
    donor?: DonorProfileUpdateOneWithoutAddressesNestedInput
  }

  export type AddressUncheckedUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    ngoId?: NullableStringFieldUpdateOperationsInput | string | null
    donorId?: NullableStringFieldUpdateOperationsInput | string | null
    line1?: StringFieldUpdateOperationsInput | string
    line2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    postalCode?: StringFieldUpdateOperationsInput | string
    addressType?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AddressUncheckedUpdateManyWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    ngoId?: NullableStringFieldUpdateOperationsInput | string | null
    donorId?: NullableStringFieldUpdateOperationsInput | string | null
    line1?: StringFieldUpdateOperationsInput | string
    line2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    postalCode?: StringFieldUpdateOperationsInput | string
    addressType?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AuditLogUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutAuditLogsNestedInput
    ngo?: NGOProfileUpdateOneWithoutAuditLogsNestedInput
    donor?: DonorProfileUpdateOneWithoutAuditLogsNestedInput
    campaign?: CampaignUpdateOneWithoutAuditLogsNestedInput
    donation?: DonationUpdateOneWithoutAuditLogsNestedInput
  }

  export type AuditLogUncheckedUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    ngoId?: NullableStringFieldUpdateOperationsInput | string | null
    donorId?: NullableStringFieldUpdateOperationsInput | string | null
    campaignId?: NullableStringFieldUpdateOperationsInput | string | null
    donationId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    ngoId?: NullableStringFieldUpdateOperationsInput | string | null
    donorId?: NullableStringFieldUpdateOperationsInput | string | null
    campaignId?: NullableStringFieldUpdateOperationsInput | string | null
    donationId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DonationCreateManyDonorInput = {
    id?: string
    companyId?: string | null
    campaignId: string
    amount: number
    donationDate?: Date | string
    paymentRef?: string | null
    paymentMode?: string | null
  }

  export type AddressCreateManyDonorInput = {
    id?: string
    ngoId?: string | null
    companyId?: string | null
    line1: string
    line2?: string | null
    city: string
    state: string
    country?: string
    postalCode: string
    addressType?: string | null
  }

  export type AuditLogCreateManyDonorInput = {
    id?: string
    userId?: string | null
    ngoId?: string | null
    companyId?: string | null
    campaignId?: string | null
    donationId?: string | null
    action: string
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type DonationUpdateWithoutDonorInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    donationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentRef?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMode?: NullableStringFieldUpdateOperationsInput | string | null
    company?: CompanyProfileUpdateOneWithoutDonationsNestedInput
    campaign?: CampaignUpdateOneRequiredWithoutDonationsNestedInput
    auditLogs?: AuditLogUpdateManyWithoutDonationNestedInput
  }

  export type DonationUncheckedUpdateWithoutDonorInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: NullableStringFieldUpdateOperationsInput | string | null
    campaignId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    donationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentRef?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMode?: NullableStringFieldUpdateOperationsInput | string | null
    auditLogs?: AuditLogUncheckedUpdateManyWithoutDonationNestedInput
  }

  export type DonationUncheckedUpdateManyWithoutDonorInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: NullableStringFieldUpdateOperationsInput | string | null
    campaignId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    donationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentRef?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMode?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AddressUpdateWithoutDonorInput = {
    id?: StringFieldUpdateOperationsInput | string
    line1?: StringFieldUpdateOperationsInput | string
    line2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    postalCode?: StringFieldUpdateOperationsInput | string
    addressType?: NullableStringFieldUpdateOperationsInput | string | null
    ngo?: NGOProfileUpdateOneWithoutAddressesNestedInput
    company?: CompanyProfileUpdateOneWithoutAddressesNestedInput
  }

  export type AddressUncheckedUpdateWithoutDonorInput = {
    id?: StringFieldUpdateOperationsInput | string
    ngoId?: NullableStringFieldUpdateOperationsInput | string | null
    companyId?: NullableStringFieldUpdateOperationsInput | string | null
    line1?: StringFieldUpdateOperationsInput | string
    line2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    postalCode?: StringFieldUpdateOperationsInput | string
    addressType?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AddressUncheckedUpdateManyWithoutDonorInput = {
    id?: StringFieldUpdateOperationsInput | string
    ngoId?: NullableStringFieldUpdateOperationsInput | string | null
    companyId?: NullableStringFieldUpdateOperationsInput | string | null
    line1?: StringFieldUpdateOperationsInput | string
    line2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    postalCode?: StringFieldUpdateOperationsInput | string
    addressType?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AuditLogUpdateWithoutDonorInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutAuditLogsNestedInput
    ngo?: NGOProfileUpdateOneWithoutAuditLogsNestedInput
    company?: CompanyProfileUpdateOneWithoutAuditLogsNestedInput
    campaign?: CampaignUpdateOneWithoutAuditLogsNestedInput
    donation?: DonationUpdateOneWithoutAuditLogsNestedInput
  }

  export type AuditLogUncheckedUpdateWithoutDonorInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    ngoId?: NullableStringFieldUpdateOperationsInput | string | null
    companyId?: NullableStringFieldUpdateOperationsInput | string | null
    campaignId?: NullableStringFieldUpdateOperationsInput | string | null
    donationId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyWithoutDonorInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    ngoId?: NullableStringFieldUpdateOperationsInput | string | null
    companyId?: NullableStringFieldUpdateOperationsInput | string | null
    campaignId?: NullableStringFieldUpdateOperationsInput | string | null
    donationId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DonationCreateManyCampaignInput = {
    id?: string
    donorId?: string | null
    companyId?: string | null
    amount: number
    donationDate?: Date | string
    paymentRef?: string | null
    paymentMode?: string | null
  }

  export type DocumentCreateManyCampaignInput = {
    id?: string
    ngoId?: string | null
    companyId?: string | null
    type: $Enums.DocumentType
    title: string
    url: string
    uploadedAt?: Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type AuditLogCreateManyCampaignInput = {
    id?: string
    userId?: string | null
    ngoId?: string | null
    companyId?: string | null
    donorId?: string | null
    donationId?: string | null
    action: string
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type DonationUpdateWithoutCampaignInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    donationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentRef?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMode?: NullableStringFieldUpdateOperationsInput | string | null
    donor?: DonorProfileUpdateOneWithoutDonationsNestedInput
    company?: CompanyProfileUpdateOneWithoutDonationsNestedInput
    auditLogs?: AuditLogUpdateManyWithoutDonationNestedInput
  }

  export type DonationUncheckedUpdateWithoutCampaignInput = {
    id?: StringFieldUpdateOperationsInput | string
    donorId?: NullableStringFieldUpdateOperationsInput | string | null
    companyId?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    donationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentRef?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMode?: NullableStringFieldUpdateOperationsInput | string | null
    auditLogs?: AuditLogUncheckedUpdateManyWithoutDonationNestedInput
  }

  export type DonationUncheckedUpdateManyWithoutCampaignInput = {
    id?: StringFieldUpdateOperationsInput | string
    donorId?: NullableStringFieldUpdateOperationsInput | string | null
    companyId?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    donationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentRef?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMode?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DocumentUpdateWithoutCampaignInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumDocumentTypeFieldUpdateOperationsInput | $Enums.DocumentType
    title?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    ngo?: NGOProfileUpdateOneWithoutDocumentsNestedInput
    company?: CompanyProfileUpdateOneWithoutDocumentsNestedInput
  }

  export type DocumentUncheckedUpdateWithoutCampaignInput = {
    id?: StringFieldUpdateOperationsInput | string
    ngoId?: NullableStringFieldUpdateOperationsInput | string | null
    companyId?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumDocumentTypeFieldUpdateOperationsInput | $Enums.DocumentType
    title?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type DocumentUncheckedUpdateManyWithoutCampaignInput = {
    id?: StringFieldUpdateOperationsInput | string
    ngoId?: NullableStringFieldUpdateOperationsInput | string | null
    companyId?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumDocumentTypeFieldUpdateOperationsInput | $Enums.DocumentType
    title?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type AuditLogUpdateWithoutCampaignInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutAuditLogsNestedInput
    ngo?: NGOProfileUpdateOneWithoutAuditLogsNestedInput
    company?: CompanyProfileUpdateOneWithoutAuditLogsNestedInput
    donor?: DonorProfileUpdateOneWithoutAuditLogsNestedInput
    donation?: DonationUpdateOneWithoutAuditLogsNestedInput
  }

  export type AuditLogUncheckedUpdateWithoutCampaignInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    ngoId?: NullableStringFieldUpdateOperationsInput | string | null
    companyId?: NullableStringFieldUpdateOperationsInput | string | null
    donorId?: NullableStringFieldUpdateOperationsInput | string | null
    donationId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyWithoutCampaignInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    ngoId?: NullableStringFieldUpdateOperationsInput | string | null
    companyId?: NullableStringFieldUpdateOperationsInput | string | null
    donorId?: NullableStringFieldUpdateOperationsInput | string | null
    donationId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateManyDonationInput = {
    id?: string
    userId?: string | null
    ngoId?: string | null
    companyId?: string | null
    donorId?: string | null
    campaignId?: string | null
    action: string
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AuditLogUpdateWithoutDonationInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutAuditLogsNestedInput
    ngo?: NGOProfileUpdateOneWithoutAuditLogsNestedInput
    company?: CompanyProfileUpdateOneWithoutAuditLogsNestedInput
    donor?: DonorProfileUpdateOneWithoutAuditLogsNestedInput
    campaign?: CampaignUpdateOneWithoutAuditLogsNestedInput
  }

  export type AuditLogUncheckedUpdateWithoutDonationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    ngoId?: NullableStringFieldUpdateOperationsInput | string | null
    companyId?: NullableStringFieldUpdateOperationsInput | string | null
    donorId?: NullableStringFieldUpdateOperationsInput | string | null
    campaignId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyWithoutDonationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    ngoId?: NullableStringFieldUpdateOperationsInput | string | null
    companyId?: NullableStringFieldUpdateOperationsInput | string | null
    donorId?: NullableStringFieldUpdateOperationsInput | string | null
    campaignId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}