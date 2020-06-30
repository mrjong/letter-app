import React, { Component } from 'react'
import { TabBar } from 'antd-mobile'
import { Modal } from '@/components'
import { connect } from 'react-redux'
import './style.less'

const tabConf = [
  {
    title: '首页',
    path: '/home',
    badge: 0,
    dot: false,
    icon: require('../../assets/images/common/tabbar_home.png'),
    selectedIcon: require('../../assets/images/common/tabbar_home_active.png')
  },
  {
    title: '阁中信',
    path: '/mails',
    badge: 0,
    dot: false,
    icon: require('../../assets/images/common/tabbar_mails.png'),
    selectedIcon: require('../../assets/images/common/tabbar_mails_active.png')
  },
  {
    title: '阁中友',
    path: '/friends',
    badge: 0,
    dot: false,
    icon: require('../../assets/images/common/tabbar_friends.png'),
    selectedIcon: require('../../assets/images/common/tabbar_friends_active.png')
  },
  {
    title: '阁中你',
    path: '/user',
    badge: 0,
    dot: false,
    icon: require('../../assets/images/common/tabbar_user.png'),
    selectedIcon: require('../../assets/images/common/tabbar_user_active.png')
  }
]

const renderIcon = (iconUrl) => {
  return (
    <div
      style={{
        width: '.4rem',
        height: '.4rem',
        background: `url(${iconUrl}) center center /  .4rem .4rem no-repeat`
      }}
    />
  )
}

const mainNavs = ['/home', '/mails', '/friends', '/user']

@connect((state) => state.common, {})
class AppLayout extends Component {
  state = {
    selectedTab: window.location.pathname
  }
  render() {
    const { children } = this.props
    return (
      <div className="app__layout-container">
        <div className="app__layout-content">{children}</div>
        <div className="app__layout-footer">
          <TabBar
            unselectedTintColor="#CCCCCC"
            tintColor="#595E4A"
            barTintColor="white"
            tabBarPosition="bottom"
            noRenderContent={true}
            hidden={!mainNavs.includes(this.props.history.location.pathname)}
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
        </div>
        <Modal {...this.props.common} />
      </div>
    )
  }
}

export default AppLayout
