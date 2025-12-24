import type { Context } from '@/types.ts'
import consola from 'consola'
import { x } from 'tinyexec'

export const git = async (ctx: Context): Promise<void> => {
    await x('git', ['init'], {
        nodeOptions: {
            stdio: ['ignore', 'ignore', 'inherit'],
            cwd: ctx.projectPath,
        },
    })
    consola.success('Git initialized.')
}

export const getGitUserName = async (): Promise<string> => {
    const { stdout } = await x('git', ['config', '--get', 'user.name'])
    return stdout
}
