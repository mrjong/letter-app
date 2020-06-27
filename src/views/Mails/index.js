import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { setUserInfo } from '../../redux/user.redux'
import './style.less'

const imgList = [
  {
    name: 'bg1',
    src: require('../../assets/images/bg1.png')
  },
  {
    name: 'bg2',
    src: require('../../assets/images/bg2.png')
  },
  {
    name: 'bg3',
    src: require('../../assets/images/bg3.png')
  }
]
@connect(
  (state) => ({
    userInfo: state.userInfo
  }),
  {
    // setUserInfo
  }
)
class Mail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mailContent: '你好:\n我是某  某某\n你好吗\n',
      selectCoverImg: imgList[0].src
    }
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
  selectCover = (index) => {
    this.setState({
      selectCoverImg: imgList[index].src
    })
  }
  render() {
    const { mailContent, selectCoverImg } = this.state
    return (
      <div className="mail__content--background" style={{ backgroundImage: `url(${selectCoverImg})` }}>
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
        <ul className="mail__cover--wrap">
          {imgList.map((item, index) => {
            return (
              <li
                key={index}
                className="mail__cover--item"
                onClick={() => {
                  this.selectCover(index)
                }}
              >
                <img src={item.src} alt="" />
              </li>
            )
          })}
        </ul>
        <button onClick={this.handleSubmitMail} style={{ marginTop: '700px' }}>
          提交
        </button>
      </div>
    )
  }
}

export default Mail
