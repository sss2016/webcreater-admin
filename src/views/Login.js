import React, { Component } from 'react';
import Particles from 'react-particles-js';
import { Form, Icon, Input, Button } from 'antd';
import { connect } from 'react-redux';
import { setUserInfo } from '@/redux/actions/userInfo';
import '@/assets/css/login';
import axios from "axios"
import cookie from 'react-cookies'

const FormItem = Form.Item;
class Login extends Component {
	state = { clientHeight: document.documentElement.clientHeight || document.body.clientHeight };
	constructor(props) {
		super(props);
		this.onResize = this.onResize.bind(this);
	}
	login = e => {//adminlogin
		const expires = new Date()
		let self = this
   		expires.setDate(Date.now() + 1000 * 60 * 60 * 24 * 14)
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				axios.post('http://localhost:4000/api/adminlogin',values).then(
				data => {
					console.log(data)
					if(data.data.code==200){
						cookie.save('admin',data.data.data.admin,{expires})
						cookie.save('adminid',data.data.data.adminid,{expires})
						cookie.save('adminname',data.data.data.adminname,{expires})
						localStorage.setItem('isLogin', '1');
						self.props.setUserInfo(Object.assign({}, values, { role: { type: 1, name: '超级管理员' } }));
						localStorage.setItem('userInfo', JSON.stringify(Object.assign({}, values, { role: { type: 1, name: '超级管理员' } })));

						self.props.history.push('/dashboard');
					}
				});
				// // 模拟生成一些数据
				// this.props.setUserInfo(Object.assign({}, values, { role: { type: 1, name: '超级管理员' } }));
				this.props.history.push('/dashboard');
			} else {
				console.log(err);
			}
		});
	};
	componentDidMount() {
		window.addEventListener('resize', this.onResize);
	}
	componentWillUnmount() {
		window.addEventListener('resize', this.onResize);
		// componentWillMount进行异步操作时且在callback中进行了setState操作时，需要在组件卸载时清除state
		this.setState = () => {
			return;
		};
	}
	onResize() {
		this.setState({ clientHeight: document.documentElement.clientHeight || document.body.clientHeight });
	}
	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<div className="container">
				<Particles
					height={this.state.clientHeight - 5 + 'px'}
					params={{
						number: { value: 50 },
						ize: { value: 3 },
						interactivity: {
							events: {
								onhover: { enable: true, mode: 'repulse' }
							}
						}
					}}
				/>
				<div className="content">
					<div className="title">后台管理系统</div>
					<Form className="login-form">
						<FormItem>
							{getFieldDecorator('username', {
								rules: [{ required: true, message: '请填写用户名！' }]
							})(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />)}
						</FormItem>
						<FormItem>
							{getFieldDecorator('password', {
								rules: [{ required: true, message: '请填写密码！' }]
							})(<Input.Password prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="密码" />)}
						</FormItem>
						<FormItem>
							<Button type="primary" htmlType="submit" block onClick={this.login}>
								登录
							</Button>
							<div style={{ color: '#999',paddingTop:'10px',textAlign:'center' }}>Tips : 保护好自己的密码安全</div>
						</FormItem>
					</Form>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
	setUserInfo: data => {
		dispatch(setUserInfo(data));
	}
});
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Form.create()(Login));
