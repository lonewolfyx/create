import type { Context } from '@/types.ts'
import { intro, text } from '@clack/prompts'
import cac from 'cac'
import { bgBlue, white } from 'picocolors'
import { getConfig } from '@/config.ts'
import { create } from '@/create.ts'
import { choicesTemplate } from '@/template.ts'
import { name, version } from '../package.json'

const cli = cac(name)

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
        }

        const config = getConfig(pkgName, options)

        const template = await choicesTemplate()

        const description = await text({
            message: 'Description',
            placeholder: '',
            defaultValue: '',
        }) as string

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
