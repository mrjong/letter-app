import React, { Component } from 'react'
import { TabBar } from 'antd-mobile'
import { AppModal } from '@/components'
import './style.less'

const tabConf = [
  {
    title: '首页',
    path: '/home',
    badge: 0,
    dot: true,
    icon: 'https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg',
    selectedIcon: 'https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg'
  },
  {
    title: '阁中信',
    path: '/mails',
    badge: 1,
    dot: false,
    icon: 'https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg',
    selectedIcon: 'https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg'
  },
  {
    title: '阁中友',
    path: '/friends',
    badge: 10,
    dot: false,
    icon: 'https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg',
    selectedIcon: 'https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg'
  },
  {
    title: '阁中你',
    path: '/user',
    badge: 1,
    dot: false,
    icon: 'https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg',
    selectedIcon: 'https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg'
  }
]

const renderIcon = (iconUrl) => {
  return (
    <div
      style={{
        width: '22px',
        height: '22px',
        background: `url(${iconUrl}) center center /  21px 21px no-repeat`
      }}
    />
  )
}

class AppLayout extends Component {
  state = {
    selectedTab: window.location.pathname
  }
  render() {
    const { children } = this.props
    return (
      <div className="app__layout-container">
        <div className="app__layout-content">{children}</div>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
          tabBarPosition="bottom"
          noRenderContent={true}
        >
          {tabConf.map((item) => (
            <TabBar.Item
              title={item.title}
              key={item.title}
              icon={renderIcon(item.icon)}
              selectedIcon={renderIcon(item.selectedIcon)}
              selected={this.state.selectedTab === item.path}
              badge={item.badge}
              dot={item.dot}
              onPress={() => {
                this.props.history.replace(item.path)
                this.setState({
                  selectedTab: item.path
                })
              }}
            ></TabBar.Item>
          ))}
        </TabBar>
        <AppModal />
      </div>
    )
  }
}

export default AppLayout
