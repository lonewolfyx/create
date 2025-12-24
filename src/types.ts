export type KnownKeys<T> = {
    [K in keyof T]: string extends K ? never : number extends K ? never : K
} extends { [_ in keyof T]: infer U } ? U : never

export type StrictRequire<T> = Required<Pick<T, KnownKeys<T>>> & {
    [K in Exclude<keyof T, KnownKeys<T>>]: T[K]
}

export interface IConfig {
    cwd: string
    name: string
    projectPath: string
    description?: string
    template?: string

    [key: string]: any
}

export type Context = StrictRequire<IConfig>

export interface ITemplates {
    name: string
    tar: string
}
