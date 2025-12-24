import type { IConfig } from '@/types.ts'
import { resolve } from 'node:path'
import process from 'node:process'

export const getConfig = (pkgName: string, ...args: any[]): IConfig => {
    const cwd = process.cwd()
    return {
        cwd,
        name: pkgName,
        projectPath: resolve(cwd, pkgName),
        ...{
            ...args,
        },
    }
}
