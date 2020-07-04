import React, { Component } from 'react'
import { connect } from 'react-redux'
import { queryFriendDetail, followUser, cancelFollowUser } from '../../redux/user.redux'
import { queryPostAddress, giveAgree } from '../../redux/mail.redux'
import './style.less'

let userId

@connect((state) => state.user, { queryFriendDetail, followUser, cancelFollowUser, queryPostAddress, giveAgree })
class FriendDetail extends Component {
  componentDidMount() {
    userId = this.props.match.params.userId
    this.props.queryFriendDetail(userId)
  }

  onFollowUser = () => {
    if (this.props.friendDetail.isFans === 'Y') {
      //取消关注
      this.props.cancelFollowUser(userId, () => {
        this.props.queryFriendDetail(userId)
      })
    } else {
      this.props.followUser(userId, () => {
        this.props.queryFriendDetail(userId)
      })
    }
  }

  lookDynamicDetail = (id) => {
    this.props.history.push(`/dynamic_detail/${id}`)
  }

  onWriteLetterButton = () => {
    this.props.queryPostAddress(this.props.friendDetail.userId)
  }

  onLikesClick = (e, id) => {
    e.stopPropagation()
    this.props.giveAgree(id, () => {
      this.props.queryFriendDetail(userId)
    })
  }

  render() {
    const { friendDetail = {} } = this.props
    const {
      address,
      autograph,
      birthday,
      contentList = [],
      fansCount,
      headImgPath,
      penName,
      receiveCount,
      sendCount,
      isFans,
      sex
    } = friendDetail
    return (
      <div className="friend__detail">
        <div className="friend__detail--brief">
          <div>
            <div className="avatar-wrap">
              <img
                src={headImgPath || require('../../assets/images/common/avatar_default.jpeg')}
                className="avatar"
                alt="头像"
              />
              <div>
                <span className="name">{penName}</span>
                <div>
                  <span className={`age ${sex === 1 ? 'nan' : 'nv'}`}>{birthday}</span>
                  <span className="city">{address}</span>
                </div>
              </div>
            </div>
            <p className="total">
              粉丝 {fansCount} 丨 收信 {sendCount} 丨 写信 {receiveCount}
            </p>
            <p className="nickname">{autograph}</p>
          </div>
          <div className="button-wrap">
            <button className="operate-button" onClick={this.onWriteLetterButton}>
              写信
            </button>
            <button className="operate-button" onClick={this.onFollowUser}>
              {isFans === 'Y' ? '取消关注' : '关注'}
            </button>
          </div>
        </div>
        <div className="friend__detail--list">
          <p className="friend__detail--list-title">动态</p>
          {contentList.length > 0 ? (
            <div>
              {contentList.map((item, index) => {
                return (
                  <div
                    className="friend__detail--item"
                    key={item.id}
                    onClick={() => {
                      this.lookDynamicDetail(item.contentId)
                    }}
                  >
                    <div className="friend__detail--item-center">
                      <div className="friend__detail--item-cover">
                        <span className="friend__detail--item-label">{item.createDay}</span>
                        <img src={item.contentImgPath} alt="cover" />
                      </div>
                      <p className="friend__detail--item-content">{item.content}</p>
                    </div>
                    <div className="friend__detail--item-bottom">
                      <span className="friend__detail--item-views">{item.readCount}</span>
                      <span
                        className="friend__detail--item-likes"
                        onClick={(e) => {
                          this.onLikesClick(e, item.contentId)
                        }}
                      >
                        {item.goodCount}
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
              该用户比较懒~
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default FriendDetail
