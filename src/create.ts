import type { Context } from '@/types.ts'
import { relative } from 'node:path'
import { spinner } from '@clack/prompts'
import consola from 'consola'
import { downloadTemplate } from 'giget'
import { green } from 'picocolors'
import { replaceInFile } from 'replace-in-file'
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

    const results = await replaceInFile({
        files: [
            `${config.projectPath}/package.json`,
            `${config.projectPath}/README.md`,
            `${config.projectPath}/**/*/package.json`,
            `${config.projectPath}/**/*/README.md`,
        ],
        from: [
            /pkg-placeholder/g,
            /_description_/g,
        ],
        to: [config.name, config.description],
        countMatches: true,
        glob: {
            cwd: config.projectPath,
            absolute: true,
        },
    })

    for (const result of results) {
        if (!result.hasChanged)
            continue
        consola.success(`${green(relative(config.projectPath, result.file))} was replaced in ${green(result.numReplacements)} place(s)`)
    }

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
