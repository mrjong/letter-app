import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Toast } from 'antd-mobile'
import qs from 'qs'
import {
  saveWriteLetterContent,
  saveSelectedPaper,
  queryLetterPapers,
  lettersSave,
  letterSendOut
} from '../../redux/mail.redux'
import { handleModalShow, handleModalHide } from '../../redux/common.redux'
import LetterTemplate from './LetterTemplate'
import './style.less'

@connect(
  (state) => ({
    mail: state.mail,
    user: state.user
  }),
  {
    queryLetterPapers,
    saveWriteLetterContent,
    saveSelectedPaper,
    lettersSave,
    handleModalShow,
    letterSendOut,
    handleModalHide
  }
)
class WriteLetter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      content: '',
      templateShow: false
    }
    if (!props.mail.letterId) {
      Toast.info('未创建信件', 2, () => {
        props.history.replace('/home')
      })
      return
    }
  }

  componentDidMount() {
    const urlParam = qs.parse(window.location.search, { ignoreQueryPrefix: true });
    if (urlParam.code) {
      // 如果拿到微信授权重定向后的code存入本地
      localStorage.setItem('wxPayCode', urlParam.code)
    }
    if (!localStorage.getItem('wxPayCode')) {
      window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx3576204e0d02bf51&redirect_uri=${location.origin}${location.pathname}&response_type=code&scope=snsapi_base&state=#wechat_redirect`
    }
    this.props.queryLetterPapers()
  }

  componentWillUnmount() {
    this.props.saveWriteLetterContent('')
  }

  onContentChange = (e) => {
    this.setState({
      content: e.target.value
    })
    //前端暂存写信内容
    this.props.saveWriteLetterContent(e.target.value)
  }

  handleSubmitMail = () => {
    if (this.state.content || this.props.mail.writeLetterContent) {
      this.props.lettersSave(() => {
        const query = qs.parse(window.location.search, { ignoreQueryPrefix: true })
        if (query.postType === 'offline') {
          //线下寄信
          this.props.handleModalShow({
            type: 'postConfirm'
          })
        } else {
          this.props.letterSendOut(() => {
            //寄出跳转发件箱
            this.props.history.replace('/outbox')
          })
        }
      })
    } else {
      Toast.info('您还未书写内容哦')
    }
  }

  togglePaper = (item) => {
    //让组件完全受控(props)
    this.props.saveSelectedPaper(item)
  }

  toggleTemplateShow = () => {
    this.setState({
      templateShow: !this.state.templateShow
    })
  }

  render() {
    const { letterPapers = [], selectedPaper = {}, writeLetterContent } = this.props.mail
    const { templateShow, content } = this.state
    return (
      <div className="writeLetter">
        <img src={selectedPaper.letterPaperUrl} alt="" className="mail__content--background" />
        <div>
          <textarea
            ref={(el) => (this.container = el)}
            className="mail__textarea"
            value={writeLetterContent || content}
            onChange={this.onContentChange}
            placeholder="温馨提示:用心的书写才会得到优质的回复，不如尝试分享一些美好的事物"
            maxLength={1000}
          ></textarea>
        </div>

        <button className="letter__postout_button" onClick={this.handleSubmitMail}>
          寄出
        </button>
        <button className={`letter__template--button ${templateShow && 'animation'}`} onClick={this.toggleTemplateShow}>
          信纸选择
        </button>
        <LetterTemplate
          letterPapers={letterPapers}
          onClick={this.togglePaper}
          onHide={this.toggleTemplateShow}
          selectedPaper={selectedPaper}
          templateShow={templateShow}
        />
      </div>
    )
  }
}

export default WriteLetter
