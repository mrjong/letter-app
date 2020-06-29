import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Toast } from 'antd-mobile'
import { setUserInfo, queryLetterPapers } from '../../redux/user.redux'
import LetterTemplate from './LetterTemplate'
import './style.less'

@connect(
  (state) => ({
    mail: state.mail,
    user: state.user
  }),
  {
    // setUserInfo,
    queryLetterPapers
  }
)
class WriteLetter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mailContent: '你好:\n我是某  某某\n你好吗\n',
      selectedPaper: {},
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
    this.props.queryLetterPapers()
  }
  handleMailContent = (e) => {
    this.setState({
      mailContent: e.target.value
    })
  }
  handleSubmitMail = () => {
    // this.props.setUserInfo(this.state.mailContent)
    console.log(this.state.mailContent)
  }
  togglePaper = (item) => {
    this.setState({
      selectedPaper: item
    })
  }
  toggleTemplateShow = () => {
    this.setState({
      templateShow: !this.state.templateShow
    })
  }
  render() {
    const { letterPapers = [] } = this.props.user
    const { mailContent, selectedPaper, templateShow } = this.state
    return (
      <div className="writeLetter">
        {letterPapers && letterPapers.length > 0 && (
          <div
            className="mail__content--background"
            style={{ backgroundImage: `url(${selectedPaper.letterPaperUrl || letterPapers[0].letterPaperUrl})` }}
          >
            <div className="mail__underline--layout">
              {[1, 2, 3].map((item, index) => {
                return <div className="mail__underline--item" key={index}></div>
              })}
            </div>
            <textarea
              name=""
              id=""
              className="mail__textarea"
              value={mailContent}
              onChange={this.handleMailContent}
            ></textarea>
            <div style={{ whiteSpace: 'pre-wrap' }}>{mailContent}</div>
          </div>
        )}
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
