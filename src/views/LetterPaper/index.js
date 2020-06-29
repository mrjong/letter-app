import React, { Component } from 'react'
import { Carousel } from 'antd-mobile'
import { connect } from 'react-redux'
import { queryLetterPapers, letterPaperPurchase } from '../../redux/user.redux'
import './style.less'

@connect((state) => state.user, {
  queryLetterPapers,
  letterPaperPurchase
})
class LetterPaper extends Component {
  state = {
    slideIndex: 0
  }
  componentDidMount() {
    this.props.queryLetterPapers()
  }

  letterPaperPurchase = (letterPaperId) => {
    this.props.letterPaperPurchase(letterPaperId)
  }

  render() {
    const { letterPapers } = this.props
    const { slideIndex } = this.state
    return (
      <div className="letterPapper">
        {letterPapers && letterPapers.length > 0 && (
          <Carousel
            className="space-carousel"
            frameOverflow="visible"
            cellSpacing={40}
            slideWidth={0.6}
            dots={false}
            infinite
            beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
            afterChange={(index) => this.setState({ slideIndex: index })}
          >
            {letterPapers.map((item, index) => (
              <span className={`paper-item-wrap ${slideIndex === index && 'paper-animation'}`} key={item.letterPaperId}>
                <img
                  src={item.letterPaperUrl}
                  alt="信纸"
                  style={{ width: '100%', verticalAlign: 'top' }}
                  onLoad={() => {
                    window.dispatchEvent(new Event('resize'))
                    this.setState({ imgHeight: 'auto' })
                  }}
                />
              </span>
            ))}
          </Carousel>
        )}
        <ul className="bottom-tip">
          <li className="bottom-tip-item">温馨提示:</li>
          <li className="bottom-tip-item">1.信纸均可用于线上信件及线下信件.</li>
          <li className="bottom-tip-item">2.线下信件-平台将会在用户选择的信纸上进行内容书写.</li>
          <li className="bottom-tip-item">3.线上信件-收信人查看信件时，信纸为写信时选择的信纸.</li>
          <li className="bottom-tip-item">4.每位用户最多同时可拥有三张信纸.(包含默认信纸).</li>
        </ul>
        {letterPapers && letterPapers[slideIndex] && (
          <div
            className={`bottom-fixed-button ${letterPapers[slideIndex].status === 0 && 'button-disabled'}`}
            onClick={() => {
              this.letterPaperPurchase(letterPapers[slideIndex].letterPaperId)
            }}
          >
            <span>
              {letterPapers[slideIndex].status === 0 ? (
                '已拥有'
              ) : (
                <span>
                  <del>¥ {letterPapers[slideIndex].originalPrice}</del>
                  <span className="presentPrice-wrap">
                    ¥ <strong className="presentPrice">{letterPapers[slideIndex].presentPrice}</strong> /
                    {letterPapers[slideIndex].date}
                  </span>
                </span>
              )}
            </span>
          </div>
        )}
      </div>
    )
  }
}

export default LetterPaper
