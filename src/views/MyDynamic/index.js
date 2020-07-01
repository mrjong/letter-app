import React, { Component } from 'react'
import { connect } from 'react-redux'
import { queryFriendDetail } from '../../redux/user.redux'
import './style.less'

@connect((state) => state.user, {
  queryFriendDetail
})
class MyDynamic extends Component {
  componentDidMount() {
    const userId = this.props.userInfo.userId
    this.props.queryFriendDetail(userId)
  }

  lookDynamicDetail = (id) => {
    this.props.history.push(`/dynamic_detail/${id}`)
  }

  onDelete = () => {}

  render() {
    const { friendDetail = {} } = this.props
    const { contentList = [] } = friendDetail
    return (
      <div className="my__dynamic--list">
        <p className="my__dynamic--list-title">我的动态</p>
        {contentList.map((item, index) => {
          return (
            <div
              className="my__dynamic--item"
              key={item.id}
              onClick={() => {
                this.lookDynamicDetail(item.contentId)
              }}
            >
              <div className="my__dynamic--item-center">
                <div className="my__dynamic--item-cover">
                  <span className="my__dynamic--item-label">{item.createDay}</span>
                  <img src={item.contentImgPath} alt="cover" />
                </div>
                <p className="my__dynamic--item-content">{item.content}</p>
              </div>
              <div className="my__dynamic--item-bottom">
                <span className="my__dynamic--item-views">{item.readCount}</span>
                <span className="my__dynamic--item-likes">{item.goodCount}</span>
                <span className="my__dynamic--item-delete" onClick={this.onDelete}>
                  删除
                </span>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}

export default MyDynamic
