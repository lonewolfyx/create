import type { ITemplates } from '@/types.ts'
import { select } from '@clack/prompts'

const defaultTemplates: ITemplates[] = [
    {
        name: 'Cli',
        tar: 'https://codeload.github.com/lonewolfyx-template/cli-template/tar.gz/refs/heads/main',
    },
    {
        name: 'Library',
        tar: 'https://codeload.github.com/lonewolfyx-template/ts-lib-template/tar.gz/refs/heads/main',
    },
    {
        name: 'Monorepo',
        tar: 'https://codeload.github.com/lonewolfyx-template/monorepo-template/tar.gz/refs/heads/master',
    },
    {
        name: 'Nuxt',
        tar: 'https://codeload.github.com/lonewolfyx-template/nuxt-template/tar.gz/refs/heads/master',
    },
]

export const choicesTemplate = async (): Promise<string> => {
    return await select({
        message: 'Pick a template',
        options: defaultTemplates.map(({ name, tar }) => ({
            label: name,
            value: tar,
        })),
    }) as string
}
