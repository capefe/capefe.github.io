import { defineConfig } from 'dumi';

export default defineConfig({
    title: 'CAPE-FE',
    favicon:
        'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
    logo:
        'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
    outputPath: 'docs-dist',
    mode: 'site',
    description: 'Baidu AI FE',
    // more config: https://d.umijs.org/config,
    navs: [
        {
            title: 'GitHub',
            path: 'https://github.com/capefe',
        },
        {
            title: ' Blog',
            path: '/blog',
        },
    ],
});
