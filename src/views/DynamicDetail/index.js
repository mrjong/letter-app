import React, { Component } from 'react'
import { connect } from 'react-redux'
import { queryDynamicDetail, commentDynamic } from '../../redux/mail.redux'
import './style.less'

let dynamicId
@connect((state) => state.mail, {
  queryDynamicDetail,
  commentDynamic
})
class DynamicDetail extends Component {
  state = {
    replyContent: ''
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

  render() {
    const { replyContent } = this.state
    const { dynamicDetail = {} } = this.props
    const {
      penName,
      content,
      createTime,
      headImgPath,
      goodCount,
      readCount,
      contentImgPath,
      commentList = []
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
            <span className="likes">{goodCount}</span>
          </div>
          {commentList.length > 0 ? (
            <div className="dynamic-detail__pannel--comment">
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
            </div>
          ) : (
            <p className="empty-comment">暂无评论</p>
          )}

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
        </div>
      </div>
    )
  }
}

export default DynamicDetail
