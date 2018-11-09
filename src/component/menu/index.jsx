import React from 'react';
import { Menu, Icon } from 'antd';

const SubMenu = Menu.SubMenu;

export default class _Menu extends React.Component {
	render() {
		return (
			<Menu>
				<SubMenu title="one">
					<Menu.Item key="1">Option 1</Menu.Item>
					<Menu.Item key="2">Option 2</Menu.Item>
				</SubMenu>
			</Menu>
		);
	}
}