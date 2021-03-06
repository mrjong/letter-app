import React, { Component } from 'react'
import { Tabs } from 'antd-mobile'
import { connect } from 'react-redux'
import { storePreviewContent } from '../../redux/mail.redux'
import './style.less'

let doc = null
let contentSlice = []
let index = 1
let gridItemHeight = 0

@connect((state) => state.mail, {
  storePreviewContent
})
class Preview extends Component {
  state = {
    content: '',
    lineNum: 14,
    renderGrid: false,
    tabs: [],
    allPages: [],
    currentPage: 1,
    sliceRenderEnd: false //切片是否渲染结束
  }
  componentDidMount() {
    doc = document.documentElement || document.body
    gridItemHeight = Math.floor((doc.clientHeight - 20) / (doc.clientHeight > 667 ? 15 : 14))
    const { state = {} } = this.props.history.location
    const content = state.content || ''

    this.setState({
      gridItemHeight
    })
    if (Array.isArray(content)) {
      //如果已经查看过信件,直接展示无须分片
      this.setState({
        renderGrid: true,
        textHeight: doc.clientHeight > 667 ? 48 : gridItemHeight,
        allPages: content,
        tabs: Array.from({ length: content.length }, () => 1),
        sliceRenderEnd: true
      })
    } else {
      this.handleContentSlice(content)
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer)
    contentSlice = []
  }

  /**
   * 自适应文字内容切片分屏
   * @param {content} content
   */
  handleContentSlice = (content) => {
    if (!content || content.length === 1) {
      this.setState(
        {
          sliceRenderEnd: true
        },
        () => {
          if (this.state.sliceRenderEnd) {
            const { state = {} } = this.props.history.location
            this.props.storePreviewContent(state.letterId, contentSlice)
            this.setState({
              renderGrid: true,
              textHeight: doc.clientHeight > 667 ? 48 : gridItemHeight,
              allPages: contentSlice,
              tabs: Array.from({ length: contentSlice.length }, () => 1)
            })
          }
        }
      )
      return
    }
    this.timer = setInterval(() => {
      if (content.slice(index) && doc.clientHeight - this.tempRef.offsetHeight >= 0) {
        index++
        this.setState({
          testValue: content.slice(0, index)
        })
      } else {
        clearInterval(this.timer)
        contentSlice.push(content.slice(0, index))
        this.setState({
          testValue: ''
        })
        this.handleContentSlice(content.slice(index - 1))
        index = 0
      }
    }, 100)
  }

  render() {
    const { lineNum, renderGrid, gridItemHeight, textHeight, allPages, tabs, currentPage, sliceRenderEnd } = this.state
    const { state = {} } = this.props.history.location
    return (
      <div className="preview__letter">
        <img src={state.letterPaperUrlPath} alt="" className="mail__content--background" />
        {renderGrid && (
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
        )}
        {sliceRenderEnd ? (
          <Tabs
            tabs={tabs}
            initialPage={0}
            onChange={(tab, index) => {
              this.setState({
                currentPage: index + 1
              })
            }}
          >
            {allPages.length > 0 &&
              allPages.map((value, index) => {
                return (
                  <div
                    key={index}
                    style={{
                      height: '100vh',
                      overflow: 'hidden'
                    }}
                  >
                    <div
                      ref={(el) => (this.contentRef = el)}
                      className="preview__letter--content"
                      style={{ lineHeight: textHeight / 50 + 'rem' }}
                    >
                      {value}
                    </div>
                  </div>
                )
              })}
          </Tabs>
        ) : (
          <div
            ref={(el) => (this.tempRef = el)}
            className="preview__letter--content"
            style={{ lineHeight: gridItemHeight / 50 + 'rem' }}
          >
            {this.state.testValue}
          </div>
        )}

        {sliceRenderEnd && (
          <span className="page-number">
            {currentPage}/{allPages.length}
          </span>
        )}
      </div>
    )
  }
}

export default Preview
