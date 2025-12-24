import type { Context } from '@/types.ts'
import { spinner } from '@clack/prompts'
import consola from 'consola'
import { downloadTemplate } from 'giget'
import { green } from 'picocolors'
import { x } from 'tinyexec'
import { git } from '@/git.ts'

export const create = async (config: Context): Promise<void> => {
    // start creating
    consola.info(`Creating project in ${config.projectPath}...`)

    const s = spinner()
    s.start('Template download...')
    await downloadTemplate(config.template, {
        dir: config.projectPath,
        force: true,
    })
    s.stop('Template download done.')

    await git(config)

    // TODO 获取项目目录文件所有文件内容含有的关键词进行替换
    // TODO 安装依赖

    consola.info('Installation in progress... ☕')
    await x('npx', ['-y', '@antfu/ni'], {
        nodeOptions: {
            cwd: config.projectPath,
            stdio: 'inherit',
            shell: true,
        },
    })

    consola.success(`🚀  Successfully created project ${green(config.name)}\n`)
    // TODO 检测是否有可升级的依赖包，若有 拼写相关可升级的依赖包 npm outdated && pnpm i
}
