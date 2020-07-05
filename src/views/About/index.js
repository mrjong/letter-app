import React, { Component } from 'react'
import './style.less'
const questionList = [
  {
    question: '如何写信给新朋友?',
    answer: '首页的左上角有写信图标,点击即可写信'
  },
  {
    question: '草稿箱在哪里?',
    answer: '草稿箱就是原本写信的地方'
  }
]

class About extends Component {
  render() {
    return (
      <div className="about">
        <h2 className="title">信件问题</h2>
        {questionList.map((item, index) => {
          return (
            <div key={index} className="question-item">
              <h3 className="question-title">{item.question}</h3>
              <p className="question-answer">{item.answer}</p>
            </div>
          )
        })}
      </div>
    )
  }
}

export default About
