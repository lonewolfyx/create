import type { Context } from '@/types.ts'
import { log } from '@clack/prompts'
import { x } from 'tinyexec'

export const git = async (ctx: Context): Promise<void> => {
    await x('git', ['init'], {
        nodeOptions: {
            stdio: ['ignore', 'ignore', 'inherit'],
            cwd: ctx.projectPath,
        },
    })
    log.step('Git initialized.')
}

export const getGitUserName = async (): Promise<string> => {
    const { stdout } = await x('git', ['config', '--get', 'user.name'])
    return stdout
}
