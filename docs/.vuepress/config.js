const {
	genSidebar
} = require('./utils')

const configMap = [
	{
		name: '数学',
		path: '/Math',
	},
	{
		name: '计算机基础',
		path: '/Computer-Base',
	},
	{
		name: '数据库',
		path: '/Database',
	},
	{
		name: '前端基础',
		path: '/Front-End-Base',
	},
	{
		name: '前端框架',
		path: '/Front-End-Library',
	},
	{
		name: '机器学习',
		path: '/Machine-Learning'
	},
	{
		name: '常见问题',
		path: '/Problems-in-Work',
	},
	{
		name: '工具',
		path: '/Tools',
	},
	{
		name: 'NodeJS',
		path: '/NodeJS',
	},
	{
		name: 'Linux',
		path: '/Linux',
	},
	{
		name: '编程语言',
		path: '/language',
	},
	{
		name: '更多知识',
		path: '/Knowledge-More',
	},
]

function getAllSideBar(configMap) {
	const res = []
	configMap.map(item => {
		res.push(genSidebar(item.name, '/docs' + item.path, item.collapsable || true))
	})
	return res;
}

console.log(JSON.stringify(getAllSideBar(configMap)))
console.log(getAllSideBar(configMap))

module.exports = {
	"title": "Coding-everyday",
	"description": "Coding-everyday",
	"dest": "dist",
	"serviceWorker": false,
	"head": [
		// ["script", { "src": "/assets/js/tj.js" }]
	],
	"configureWebpack": {
		"resolve": {
			"alias": {}
		}
	},
	"markdown": {},
	"themeConfig": {
		"repo": "novlan1/coding-everyday",
		"repoLabel": "点亮⭐不迷路",
		"editLinks": false,
		"docsDir": "docs",
		"editLinkText": "为该章节纠错",
		// "lastUpdated": "上次更新",
		"sidebarDepth": 0,
		"nav": [
			{
				"text": "🙋‍♂️ 一起学习",
				"link": "https://uwayfly.com",
				target:'_self'
			},
			{
				"text": "🔥 热爱生活",
				"link": "https://uwayfly.com/image",
				target:'_self'
			}
		],
		"sidebar": [
			[
				"/",
				"前言"
			],
			...getAllSideBar(configMap),
		]
	},
	"base": "/coding-everyday/"
}
