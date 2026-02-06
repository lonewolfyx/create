import type { ITemplates } from '@/types.ts'
import { select } from '@clack/prompts'

const defaultTemplates: ITemplates[] = [
    {
        name: 'Cli use cac',
        tar: 'https://codeload.github.com/lonewolfyx-template/cli-template/tar.gz/refs/heads/main',
        description: 'TypeScript template for building command-line interface (CLI) tools',
    },
    {
        name: 'Cli use citty',
        tar: 'https://codeload.github.com/lonewolfyx-template/citty-cli-template/tar.gz/refs/heads/master',
        description: 'TypeScript template for building command-line interface (CLI) tools',
    },
    {
        name: 'Library',
        tar: 'https://codeload.github.com/lonewolfyx-template/ts-lib-template/tar.gz/refs/heads/main',
        description: 'Standard TypeScript library template with module bundling and type declaration support',
    },
    {
        name: 'Monorepo',
        tar: 'https://codeload.github.com/lonewolfyx-template/monorepo-template/tar.gz/refs/heads/master',
        description: 'Monorepo management template based on pnpm workspaces',
    },
    {
        name: 'Nuxt',
        tar: 'https://codeload.github.com/lonewolfyx-template/nuxt-template/tar.gz/refs/heads/master',
        description: 'Ready-to-use Nuxt project template with TypeScript and Tailwind CSS',
    },
    {
        name: 'Nuxt Monorepo',
        tar: 'https://codeload.github.com/lonewolfyx-template/nuxt-monorepo-template/tar.gz/refs/heads/master',
        description: 'Template combining Nuxt 3 and Monorepo',
    },
    {
        name: 'Npm Package Base Grab',
        tar: 'https://codeload.github.com/lonewolfyx-template/npm-base/tar.gz/refs/heads/master',
        description: 'Minimal npm package base template with basic build and publish setup',
    },
    {
        name: 'Vue Components',
        tar: 'https://codeload.github.com/lonewolfyx-template/vue-components-starter/tar.gz/refs/heads/master',
        description: 'A starter for Vue components',
    },
]

export const choicesTemplate = async (): Promise<string> => {
    return await select({
        message: 'Pick a template',
        options: defaultTemplates.map(({ name, tar, description }) => ({
            label: name,
            value: tar,
            hint: description,
        })),
    }) as string
}
