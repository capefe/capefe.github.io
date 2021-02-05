import { defineConfig } from 'dumi';

export default defineConfig({
    title: 'capefe',
    favicon:
        'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
    logo:
        'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
    outputPath: 'docs-dist',
    mode: 'site',
    description: 'Baidu AI FE',
    // more config: https://d.umijs.org/config,
    navs: [
        null, // null 值代表保留约定式生成的导航，只做增量配置
        {
            title: 'GitHub',
            path: 'https://github.com/capefe',
        },
        {
            title: '我有二级导航',
            path: '链接是可选的',
            // 可通过如下形式嵌套二级导航菜单，目前暂不支持更多层级嵌套：
            children: [
                { title: '第一项', path: 'https://d.umijs.org' },
                { title: '第二项', path: '/guide' },
            ],
        },
    ],
});
