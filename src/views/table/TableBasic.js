import React, { Component } from 'react';
import { Table,Tag } from 'antd';
import axios from "axios"
const { Column } = Table;

class TableBasic extends Component {
	state = {
		data: [],
		pagination: {},
		loading: false,
		selectedRowKeys: [],
	};

	componentWillMount() {
		this.fetch();
	}

	componentWillUnmount() {
		// componentWillMount进行异步操作时且在callback中进行了setState操作时，需要在组件卸载时清除state
		this.setState = () => {
			return;
		};
	}

	handleTableChange = (pagination, filters, sorter) => {
		const pager = { ...this.state.pagination };
		pager.current = pagination.current;
		this.setState({
			pagination: pager
		});
		this.fetch({
			results: pagination.pageSize,
			page: pagination.current,
			sortField: sorter.field,
			sortOrder: sorter.order,
			...filters
		});
	};
	fetch = () => {
		this.setState({ loading: true });
		axios.get('http://localhost:4000/api/getAlluser').then(
			data => {
			const pagination = { ...this.state.pagination };
			// Read total count from server
			// pagination.total = data.totalCount
			pagination.total = 200;
			this.setState({
				loading: false,
				data: data.data.data.list,
				pagination
			});
		});
	};
	serUserState(id,state){
		axios.post('http://localhost:4000/api/setuserstate',{
			id,
			state

		}).then(
			data => {
				this.fetch()
			console.log(data)
		});
	}
	liveUser(){

	}
	render() {
		return (
			<div className="shadow-radius">
				<Table
					dataSource={this.state.data}
					loading={this.state.loading}
				>
					<Column title="用户名" dataIndex="username" key="username" />
					<Column title="邮箱" dataIndex="email" key="email" />
					<Column title="创建时间" dataIndex="creat_date" key="creat_date" />
					<Column title="状态" dataIndex="state" key="state" render={(text,record)=>{
						return(record.state !== 0?<Tag color="green">正常</Tag>:<Tag color="red">已禁用</Tag>)
					}} >

					</Column>
					<Column title="操作" dataIndex="action" key="action" render={(text,record)=>{
						let comp = record.state === 0?<a onClick={this.serUserState.bind(this,record._id,1)}>激活</a>:<a onClick={this.serUserState.bind(this,record._id,0)}>禁用</a>
						return(
								<span>
								{comp}
								</span>)
					}} >

					</Column>
				</Table>
			</div>
		);
	}
}

export default TableBasic;
