import type { Context } from '@/types.ts'
import { cancel, intro, isCancel, text } from '@clack/prompts'
import cac from 'cac'
import { bgBlue, white } from 'picocolors'
import { getConfig } from '@/config.ts'
import { create } from '@/create.ts'
import { choicesTemplate } from '@/template.ts'
import { name, version } from '../package.json'

const cli = cac(name)

const cancelMessage = 'Operation cancelled'

cli.command('[pkgName]', 'create a project')
    .option('sss', '')
    .action(async (pkgName: string = '', options: any) => {
        intro(bgBlue(white(` @lonewolfyx/create v${version} `)))

        if (!pkgName) {
            pkgName = await text({
                message: 'Project name',
                placeholder: 'my-project',
                defaultValue: '',
            }) as string

            if (isCancel(pkgName)) {
                cancel(cancelMessage)
                return process.exit(0)
            }
        }

        const config = getConfig(pkgName, options)

        const template = await choicesTemplate()

        if (isCancel(template)) {
            cancel(cancelMessage)
            return process.exit(0)
        }

        const description = await text({
            message: 'Description',
            placeholder: '',
            defaultValue: '',
        }) as string

        if (isCancel(description)) {
            cancel(cancelMessage)
            return process.exit(0)
        }

        const ctx: Context = {
            template,
            description,
            ...config,
        }

        await create(ctx)
    })

cli.help()
cli.version(version)
cli.parse()
