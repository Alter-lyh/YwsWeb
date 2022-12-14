const path = require('path');

module.exports = ({ file }) => {
    const designWidth = file.dirname.includes(path.join('node_modules', 'vant')) ? 375 : 750;

    return {
        plugins: {
            autoprefixer: {
                overrideBrowserslist:['> 1%', 'last 2 versions', 'Firefox ESR'], // 重要配置 详见下面
            },
            "postcss-px-to-viewport": {
                unitToConvert: "px",
                viewportWidth: designWidth,
                unitPrecision: 6,
                propList: ["*"],
                viewportUnit: "vw",
                fontViewportUnit: "vw",
                selectorBlackList: [],
                minPixelValue: 1,
                mediaQuery: true,
                exclude: [],
                landscape: false
            }
        }
    }

}