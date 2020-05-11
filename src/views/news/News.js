import React, { Component } from 'react';
import { Tabs, List, Button } from 'antd';
import '@/assets/css/news';
import axios from "axios"
const { TabPane } = Tabs;
export default class News extends Component {
	state = { loading: false, dataSource: [] };
	componentDidMount() {
		this.setState({ loading: true });
		axios.get('http://localhost:4000/api/getAllNotice').then(
			data => {
				setTimeout(() => {
					this.setState({ loading: false, dataSource: data.data.data.list});
				}, 500);
		});

	}
	render() {
		const { loading, dataSource } = this.state;
		return (
			<div className="shadow-radius">
				<Tabs defaultActiveKey="1" >
					<TabPane tab="消息列表" key="1">
						<List
							loading={loading}
							className="list-news"
							dataSource={dataSource}
							renderItem={item => (
								<List.Item key={item.id}>
									<div className="list-title">
										<span style={{ color: '#1890ff', cursor: 'pointer' }}>{item.title}</span>
									</div>
									<div className="list-time">{item.creat_date}</div>
								</List.Item>
							)}
						/>
					</TabPane>
				</Tabs>
			</div>
		);
	}
}
