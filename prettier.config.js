module.exports = {
    printWidth: 160, // 超过最大值换行
    proseWrap: 'preserve', // 代码超出是否要换行 preserve保留
    tabWidth: 4,// tab缩进大小,默认为2
    useTabs: true,// 使用tab缩进，默认false
    semi: true,// 使用分号, 默认true
    endOfLine: "auto",// 结尾是 \n \r \n\r auto
    singleQuote: true,// 使用单引号, 默认false(在jsx中配置无效, 默认都是双引号)
    trailingComma: 'none',// 行尾逗号,默认none,可选 none|es5|all es5 包括es5中的数组、对象all 包括函数对象等所有可选
    // htmlWhitespaceSensitivity: "ignore",
    bracketSpacing: true,// 在对象，数组括号与文字之间加空格 "{ foo: bar }"
    jsxBracketSameLine: true,// JSX标签闭合位置 默认false
    arrowParens: 'avoid' // 箭头函数参数括号 默认avoid 可选 avoid| always avoid 能省略括号的时候就省略 always 总是有括号
};
