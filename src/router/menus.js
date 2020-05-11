/**
 * @ Author: Jone Chen
 * @ Create Time: 2019-06-19 16:58:23
 * @ Modified by: Jone Chen
 * @ Modified time: 2019-07-18 16:09:41
 * @ Description:权限控制，permission 1==超级管理员，其它为普通用户
 */

export const menus = [
	{
		path: '/dashboard',
		title: '首页',
		icon: 'home'
	},{
		path: '/table/basic',
		title: '用户管理',
		icon: 'form',
	},
	{
		path: '/form',
		title: '网页管理',
		icon: 'form',
		children: [
			{
				path: '/form/basic',
				title: '网页审核'
			}
		]
	},
	{
		path: '/form/editor',
		title: '发送通知',
		icon: 'bell'
	},
	{
		path: '/news',
		title: '通知列表',
		icon: 'bell'
	},
	{
		path: '/error',
		title: '错误页面',
		icon: 'switcher',
		children: [
			{
				path: '/error/404',
				title: '404'
			},
			{
				path: '/error/500',
				title: '500'
			}
		]
	},
	{
		path: '/about',
		title: '关于',
		icon: 'copyright'
	}
];
