import { intro, text } from '@clack/prompts'
import cac from 'cac'
import { bgBlue, white } from 'picocolors'
import { getConfig } from '@/config.ts'
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
    })

cli.help()
cli.version(version)
cli.parse()
