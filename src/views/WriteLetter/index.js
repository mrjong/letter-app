import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Toast, Tabs } from 'antd-mobile'
import { saveWriteLetterContent, saveSelectedPaper, queryLetterPapers } from '../../redux/mail.redux'
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
    saveSelectedPaper
  }
)
class WriteLetter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      content: '',
      templateShow: false,
      lineNum: 14,
      renderGrid: false,
      tabs: [''],
      allPages: [
        {
          content: ''
        }
      ],
      pageIndex: 0
    }
    // if (!props.mail.letterId) {
    //   Toast.info('未创建信件', 2, () => {
    //     props.history.replace('/home')
    //   })
    //   return
    // }
  }

  componentDidMount() {
    this.props.queryLetterPapers()
    const doc = document.documentElement || document.body
    const gridItemHeight = Math.floor(doc.clientHeight / this.state.lineNum)

    this.setState({
      renderGrid: true,
      gridItemHeight
    })
  }

  onContentChange = (e) => {
    this.setState({
      content: e.target.value
    })
    //前端暂存写信内容
    this.props.saveWriteLetterContent(e.target.value)
  }

  handleSubmitMail = () => {}

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
    const { letterPapers = [], selectedPaper = {} } = this.props.mail
    const { templateShow, lineNum, renderGrid, gridItemHeight, content } = this.state

    return (
      <div className="writeLetter">
        <div className="mail__content--background" style={{ backgroundImage: `url(${selectedPaper.letterPaperUrl})` }}>
          {/* {renderGrid && (
              <div className="mail__underline--layout">
                {Array.from({ length: lineNum }).map((item, index) => {
                  return (
                    <div
                      style={{ height: gridItemHeight / 50 + 'rem' }}
                      className="mail__underline--item"
                      key={index}
                    ></div>
                  )
                })}
              </div>
            )} */}
          <textarea
            ref={(el) => (this.container = el)}
            className="mail__textarea"
            value={content}
            onChange={this.onContentChange}
          ></textarea>
        </div>

        {/* <Tabs
          tabs={this.state.tabs}
          initialPage={0}
          // page={this.state.pageIndex}
          onChange={(tab, index) => {
            this.setState({
              postType: index === 0 ? 'offline' : 'online'
            })
          }}
        >
          {this.state.allPages.length > 0 &&
            this.state.allPages.map((item, index) => {
              return (
                <textarea
                  ref={(el) => (this.container = el)}
                  key={index}
                  className="mail__textarea"
                  value={item.content}
                  style={{
                    lineHeight: gridItemHeight / 50 + 'rem'
                  }}
                  onChange={(e) => {
                    this.onContentChange(item, index, e)
                  }}
                ></textarea>
              )
            })}
        </Tabs> */}
        <button className="letter__postout_button">寄出</button>
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
