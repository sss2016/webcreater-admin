import React from 'react';
import { Table, Divider, Tag, Button } from 'antd';

import axios from "axios"
const { Column } = Table;
const BaseURL= 'http://localhost:4000'
class BasicForm extends React.Component {
// webvalidate
	constructor(props){
		super(props)
		this.state={
			data:[]
		}
	}
	updateValidateState(state,id){
		var self = this
		axios.get(BaseURL+'/api/designstate',{params:{id:id,state:state}})
		.then(function(resp){
			console.log(resp)
			self.getDatas()
		})
	}
	deleteDesign(id){
		var self = this
		axios.get(BaseURL+'/api/deleteDesign',{params:{id:id}})
		.then(function(resp){
			console.log(resp)
			self.getDatas()

		})
	}
	getDatas(){
		var self = this
		axios.get(BaseURL+'/api/getAllDesign')
		.then(function(resp){
			console.log(resp)
			self.setState({
				data:resp.data.data.list
			}) 
		})
	}
	componentDidMount(){
		this.getDatas()
	}
	render() {


		return (
			<div className="shadow-radius">
				<div className="public-title">
					<h1>网页审核</h1>
				</div>
				<Table  dataSource={this.state.data}>
					<Column title="用户名" dataIndex="author" key="author" />
					<Column title="标题" dataIndex="d_name" key="d_name" />
					<Column title="创建时间" dataIndex="creat_date" key="creat_date" />
					<Column title="状态" dataIndex="state" key="state" 
					render={tags => (
						<span>
						{tags===0&&<Tag color="red" key={tags}>拒绝</Tag>}
						{tags===1&&<Tag color="green" key={tags}>通过</Tag>}
						{tags===-1&&<Tag color="blue" key={tags}>待审核</Tag>}
						</span>
					)} />
					<Column
						title="Action"
						key="action"
						render={(text, record) => {
							return(
								<span>
								{
								record.state===-1?(
								<>
								<a onClick={this.updateValidateState.bind(this,1,record._id)}>通过</a>
								<Divider type="vertical" />
								<a onClick={this.updateValidateState.bind(this,0,record._id)}>拒绝</a>
								<Divider type="vertical" />
								</>
								):null}
								<a onClick={this.deleteDesign.bind(this,record._id)}>删除</a>
								<Divider type="vertical" />
								<a target="_blank" href={"http://localhost:4000/show/"+record.author+"/"+record.timestamp}>预览</a>
								</span>
							)
						}}
   					 />
				</Table>
			</div>
		);
	}
}
export default BasicForm;
