import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ListView } from 'antd-mobile'
import { AvatarUserInfo } from '@/components'
import { queryFriends } from '../../redux/user.redux'
import './style.less'

let pageIndex = 1
@connect((state) => state.user, {
  queryFriends
})
class Friends extends Component {
  constructor(props) {
    super(props)
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    })

    this.state = {
      dataSource,
      isLoading: true,
      hasMore: true
    }
  }
  rData = []
  componentDidMount() {
    pageIndex = 1
    this.props.queryFriends(pageIndex, () => {
      this.rData = [...this.props.friends]
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.rData),
        isLoading: false
      })
    })
  }

  onEndReached = (event) => {
    if (this.state.isLoading || !this.state.hasMore) {
      return
    }
    this.setState({ isLoading: true })
    this.props.queryFriends(++pageIndex, () => {
      this.rData = [...this.rData, ...this.props.friends]
      if (this.props.friends.length <= 0) {
        this.setState({
          isLoading: false,
          hasMore: false
        })
        return
      }

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.rData),
        isLoading: false
      })
    })
  }

  render() {
    let index = this.rData.length - 1
    const row = (rowData, sectionID, rowID) => {
      if (index < 0) {
        index = this.rData.length - 1
      }
      const obj = this.rData[index--]
      return (
        <div className="friends__list--item" key={rowID}>
          <div className="friends__list--item-left">
            <AvatarUserInfo {...obj} headImgPath={obj.headImg} />
          </div>
          <button className="friends__list--item-button">写信</button>
        </div>
      )
    }

    return (
      <div className="friends__list">
        <ListView
          ref={(el) => (this.lv = el)}
          dataSource={this.state.dataSource}
          renderFooter={() => (
            <div style={{ padding: 30, textAlign: 'center' }}>
              {this.state.isLoading ? '加载中...' : '我是有底线的~'}
            </div>
          )}
          renderRow={row}
          style={{
            height: this.state.height,
            overflow: 'auto'
          }}
          pageSize={4}
          useBodyScroll
          scrollRenderAheadDistance={500}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={10}
        />
      </div>
    )
  }
}

export default Friends
