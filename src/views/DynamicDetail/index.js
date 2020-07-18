import React, { Component } from 'react'
import { Modal, Icon } from 'antd-mobile'
import { connect } from 'react-redux'
import { queryDynamicDetail, commentDynamic, giveAgree } from '../../redux/mail.redux'
import './style.less'

let dynamicId
@connect((state) => state.mail, {
  queryDynamicDetail,
  commentDynamic,
  giveAgree
})
class DynamicDetail extends Component {
  state = {
    replyContent: '',
    showCommentModal: false
  }
  componentDidMount() {
    dynamicId = this.props.match.params.dynamicId
    this.props.queryDynamicDetail(dynamicId)
  }

  onReply = () => {
    if (!this.state.replyContent) return
    this.props.commentDynamic(dynamicId, this.state.replyContent, () => {
      this.setState({
        replyContent: ''
      })
      this.props.queryDynamicDetail(dynamicId)
    })
  }

  onInputChange = (e) => {
    this.setState({
      replyContent: e.target.value
    })
  }

  onLikesClick = (e, id) => {
    e.stopPropagation()
    this.props.giveAgree(id, () => {
      this.props.queryDynamicDetail(dynamicId)
    })
  }

  toggleCommentModal = () => {
    this.setState({
      showCommentModal: !this.state.showCommentModal
    })
  }

  render() {
    const { replyContent, showCommentModal } = this.state
    const { dynamicDetail = {} } = this.props
    const {
      penName,
      content,
      createTime,
      headImgPath,
      goodCount,
      readCount,
      contentImgPath,
      commentList = [],
      contentId
    } = dynamicDetail
    return (
      <div className="dynamic-detail">
        <img src={contentImgPath} alt="" className="dynamic-detail__cover" />
        <div className="dynamic-detail__pannel">
          <div className="avatar-wrap">
            <img src={headImgPath} alt="" className="user-avatar" />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span className="name">{penName}</span>
              <span className="date">{createTime}</span>
            </div>
          </div>
          <p className="dynamic-detail__pannel--content">{content}</p>
          <div className="dynamic-detail__pannel--operate">
            <span className="views">{readCount}</span>
            <span
              className="likes"
              onClick={(e) => {
                this.onLikesClick(e, contentId)
              }}
            >
              {goodCount}
            </span>
            <span onClick={this.toggleCommentModal}>
              <Icon type="ellipsis" className="comment" size="xxs" />
              评论
            </span>
          </div>
        </div>

        <Modal
          popup
          visible={showCommentModal}
          className="comment-modal"
          onClose={this.toggleCommentModal}
          animationType="slide-up"
        >
          <div className="dynamic-detail__pannel--comment">
            <p className="dynamic-detail__pannel--commentTitle">{commentList.length}条评论</p>
            <Icon type="cross" className="comment-close-icon" onClick={this.toggleCommentModal} />
            {commentList.length > 0 ? (
              <ul className="dynamic-detail__pannel--commentList">
                {commentList.map((item, index) => {
                  return (
                    <li key={index} className="comment-item">
                      <img src={item.headImgPath} alt="" className="avatar" />
                      <div className="comment-wrap">
                        <span className="name">{item.penName}</span>
                        <span className="comment">{item.commentContent}</span>
                      </div>
                    </li>
                  )
                })}
              </ul>
            ) : (
              <p className="empty-comment">暂无评论</p>
            )}
          </div>
          <div className="reply-wrap">
            <input
              type="text"
              className="input"
              value={replyContent}
              onChange={this.onInputChange}
              placeholder="说点什么..."
            />
            <button className="button" onClick={this.onReply}>
              回复
            </button>
          </div>
        </Modal>
      </div>
    )
  }
}

export default DynamicDetail
