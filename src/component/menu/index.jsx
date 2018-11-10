import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from "react-router-dom";

const SubMenu = Menu.SubMenu;

export default class _Menu extends React.Component {
	render() {
		return (
			<Menu mode="inline">
				<SubMenu title="HOME">
					<Menu.Item key="1">
						<Link to="/">Home001</Link>
					</Menu.Item>
					<Menu.Item key="2">
						<Link to="/view/home">Home002</Link>
					</Menu.Item>
				</SubMenu>
			</Menu>
		);
	}
}