import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ImagePicker, Toast } from 'antd-mobile'
import { uploadContentImg, publishDynamic, clearUploadContentImg } from '../../redux/mail.redux'
import avatarDefault from '../../assets/images/common/avatar_default.jpeg'
import './style.less'

@connect((state) => state.mail, {
  uploadContentImg,
  publishDynamic,
  clearUploadContentImg
})
class DynamicEdit extends Component {
  state = {
    files: [],
    dynamicContent: ''
  }
  onFileChange = (files, type, index) => {
    let formData = new FormData()
    formData.append('contentImg', files[0].file)
    formData.append('contentId', this.props.dynamicShareId)
    this.props.uploadContentImg(formData)
  }

  onContentChange = (e) => {
    this.setState({
      dynamicContent: e.target.value
    })
  }

  onSubmit = () => {
    if (!this.state.dynamicContent) {
      Toast.info('您还未编辑内容')
      return
    }
    this.props.publishDynamic(
      {
        contentId: this.props.dynamicShareId,
        content: this.state.dynamicContent,
        status: '11'
      },
      () => {
        Toast.info('发布成功')
        let timer = setTimeout(() => {
          this.props.history.replace('/home')
          this.props.clearUploadContentImg()
          clearTimeout(timer)
        }, 1000)
      }
    )
  }

  render() {
    const { files, dynamicContent } = this.state
    const { dynamicShareImg } = this.props
    return (
      <div>
        <div className="dynamic__edit">
          <div className="upload-wrap">
            {!dynamicShareImg && <p className="upload-tip">上传一张背景图吧</p>}
            {dynamicShareImg ? (
              <img src={dynamicShareImg || avatarDefault} alt="" className="preview-img" />
            ) : (
              <ImagePicker
                // files={files}
                onChange={this.onFileChange}
                selectable={files.length < 1}
                accept="image/gif,image/jpeg,image/jpg,image/png"
                multiple={false}
                disableDelete
              />
            )}
          </div>
          <div className="textarea-wrap">
            <textarea
              onChange={this.onContentChange}
              className="textarea"
              value={dynamicContent}
              placeholder="乐观阳光的分享会更容易得到信友们的赞同喔"
            ></textarea>
            <button className="submit-button" onClick={this.onSubmit}>
              发表
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default DynamicEdit
