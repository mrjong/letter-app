import React, { Component } from 'react'
import { connect } from 'react-redux'
import { queryFriendDetail } from '../../redux/user.redux'
import { publishDynamic, giveAgree } from '../../redux/mail.redux'
import { handleModalShow, handleModalHide } from '../../redux/common.redux'
import './style.less'

let userId
@connect((state) => state.user, {
  queryFriendDetail,
  publishDynamic,
  handleModalShow,
  handleModalHide,
  giveAgree
})
class MyDynamic extends Component {
  componentDidMount() {
    userId = this.props.userInfo.userId
    this.props.queryFriendDetail(userId)
  }

  lookDynamicDetail = (id) => {
    this.props.history.push(`/dynamic_detail/${id}`)
  }

  onDeleteDynamic = (e, item) => {
    e.stopPropagation()
    this.props.handleModalShow({
      type: 'delete',
      onConfirm: () => {
        this.props.publishDynamic(
          {
            contentId: item.contentId,
            content: item.content,
            status: '22'
          },
          () => {
            this.props.handleModalHide()
            this.props.queryFriendDetail(userId)
          }
        )
      }
    })
  }

  onLikesClick = (e, id) => {
    e.stopPropagation()
    this.props.giveAgree(id, () => {
      this.props.queryFriendDetail(userId)
    })
  }

  render() {
    const { friendDetail = {} } = this.props
    const { contentList = [] } = friendDetail
    return (
      <div className="my__dynamic--list">
        <p className="my__dynamic--list-title">我的动态</p>
        {contentList.length > 0 ? (
          <div>
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
                    <span
                      className="my__dynamic--item-likes"
                      onClick={(e) => {
                        this.onLikesClick(e, item.contentId)
                      }}
                    >
                      {item.goodCount}
                    </span>
                    <span
                      className="my__dynamic--item-delete"
                      onClick={(e) => {
                        this.onDeleteDynamic(e, item)
                      }}
                    >
                      删除
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div
            style={{
              fontSize: '.28rem'
            }}
          >
            您还没有发表动态哦~
          </div>
        )}
      </div>
    )
  }
}

export default MyDynamic
