import React, { Component } from 'react'
import { Tabs } from 'antd-mobile'
import './style.less'

const perPageChar = 300

class Preview extends Component {
  state = {
    content: '',
    lineNum: 14,
    renderGrid: false,
    tabs: [],
    allPages: [],
    currentPage: 1
  }
  componentDidMount() {
    const doc = document.documentElement || document.body
    const gridItemHeight = Math.floor((doc.clientHeight - 20) / this.state.lineNum)
    const content = this.props.history.location.state.content

    const totalPage = Math.ceil(content.length / perPageChar)

    const arr = []
    for (let i = 0; i < totalPage; i++) {
      arr.push(content.slice(i * perPageChar, i + perPageChar * (i + 1)))
    }

    this.setState({
      renderGrid: true,
      gridItemHeight,
      tabs: Array.from({ length: totalPage }, () => 1),
      allPages: arr
    })
  }

  render() {
    const { lineNum, renderGrid, gridItemHeight, allPages, tabs, currentPage } = this.state
    return (
      <div className="preview__letter">
        <img src={this.props.history.location.state.letterPaperUrlPath} alt="" className="mail__content--background" />

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
                  className="preview__letter--content"
                  style={{ lineHeight: gridItemHeight / 50 + 'rem' }}
                >
                  {value}
                </div>
              )
            })}
        </Tabs>
        <span className="page-number">
          {currentPage} / {allPages.length}
        </span>
      </div>
    )
  }
}

export default Preview
