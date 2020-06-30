import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ListView } from 'antd-mobile'
import { AvatarUserInfo } from '@/components'
import './style.less'
import { queryMails } from '../../redux/mail.redux'

let pageIndex = 1

@connect((state) => state.mail, {
  queryMails
})
class Mails extends Component {
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
    // you can scroll to the specified position
    // setTimeout(() => this.lv.scrollTo(0, 120), 800);
    this.props.queryMails(pageIndex, () => {
      this.rData = [...this.props.mails]
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
    this.props.queryMails(++pageIndex, () => {
      this.rData = [...this.rData, ...this.props.mails]
      if (this.props.mails.length <= 0) {
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
        <div className="mails__list--item" key={rowID}>
          <div className="mails__list--item-top">
            <div className="mails__list--item-avatar">
              <AvatarUserInfo headImgPath={obj.headImgPath} penName={obj.penName} address={obj.address} />
            </div>
            <button className="mails__list--item-button">写信</button>
          </div>
          <div className="mails__list--item-center">
            <div className="mails__list--item-cover">
              <span className="mails__list--item-label">{obj.createDay}</span>
              <img src={obj.contentImgPath} alt="cover" />
            </div>
            <p className="mails__list--item-content">{obj.content}</p>
          </div>
          <div className="mails__list--item-bottom">
            <span className="mails__list--item-views">{obj.readCount}</span>
            <span className="mails__list--item-likes">{obj.goodCount}</span>
          </div>
        </div>
      )
    }
    return (
      <div className="mails__list">
        <ListView
          ref={(el) => (this.lv = el)}
          dataSource={this.state.dataSource}
          renderFooter={() => (
            <div style={{ padding: 20, textAlign: 'center' }}>
              {this.state.isLoading ? '加载中...' : '我是有底线的'}
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

export default Mails
