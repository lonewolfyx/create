import { intro } from '@clack/prompts'
import cac from 'cac'
import { bgBlue, white } from 'picocolors'
import { name, version } from '../package.json'

const cli = cac(name)

cli.command('[pkgName]', 'create a project')
    .option('sss', '')
    .action(async (pkgName: string = '', options: any) => {
        intro(bgBlue(white(` @lonewolfyx/create v${version} `)))
    })

cli.help()
cli.version(version)
cli.parse()
