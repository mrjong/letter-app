import React from 'react'
import { Toast } from 'antd-mobile'
import './style.less'

export default function LetterTemplate(props) {
  const { letterPapers, onClick, selectedPaper, templateShow, onHide } = props
  return (
    <div className={`letter__template ${templateShow && 'animation'}`}>
      <div className="letter__template--title">
        <span className="title">信纸选择</span>
        <span className="button" onClick={onHide}>
          收起
        </span>
      </div>
      <div className="letter__template--list">
        <ul className="letter__template--list-wrap">
          {letterPapers.map((item, index) => {
            return (
              <li
                key={item.letterPaperId}
                className={`letter__template--list-item ${
                  selectedPaper.letterPaperId === item.letterPaperId && 'active'
                }`}
                onClick={() => {
                  if (item.status === 1) {
                    Toast.info('请先购买')
                    return
                  }
                  onClick(item)
                }}
              >
                <img src={item.letterPaperUrl} alt="" className="img" />
                <span className={`date ${item.status === 1 && 'disabled'}`}>
                  {item.status === 0 ? '可使用' : '未购买'}
                </span>
                <span className="title">{item.letterPaperTitle}</span>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
