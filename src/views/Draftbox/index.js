import React, { Component } from 'react'
import { connect } from 'react-redux'
import { MailCard } from '@/components'
import { queryDraftboxList, lettersDelete, updateLetterId, saveWriteLetterContent } from '../../redux/mail.redux'
import { handleModalShow } from '../../redux/common.redux'
import './style.less'

@connect((state) => state.mail, {
  queryDraftboxList,
  lettersDelete,
  updateLetterId,
  saveWriteLetterContent,
  handleModalShow
})
class DraftBox extends Component {
  componentDidMount() {
    this.props.queryDraftboxList()
  }

  onMailCardClick = (item) => {
    //接着去写信
    let postType
    if (item.letterType === '00' || item.letterType === '22') {
      postType = 'online'
    } else if (item.letterType === '11' || item.letterType === '33') {
      postType = 'offline'
    }
    this.props.updateLetterId(item.letterId)
    this.props.saveWriteLetterContent(item.content)
    this.props.history.push(`/write_letter?postType=${postType}`)
  }

  render() {
    const { draftboxList = [] } = this.props
    return (
      <div className="draftbox">
        {draftboxList.length > 0 ? (
          <ul className="draftbox__list">
            {draftboxList.map((item, index) => {
              return (
                <li className="draftbox__list--item" key={item.letterId}>
                  <MailCard
                    {...item}
                    label={item.letterTypeName}
                    renderContent={item.content}
                    buttons={[
                      <button
                        className="operate-button"
                        onClick={(e) => {
                          e.stopPropagation()
                          this.props.handleModalShow({
                            type: 'delete',
                            onConfirm: () => {
                              this.props.lettersDelete(item.letterId, () => {
                                this.props.queryDraftboxList()
                              })
                            }
                          })
                        }}
                        key="0"
                      >
                        删除
                      </button>
                    ]}
                    onMailCardClick={() => {
                      this.onMailCardClick(item)
                    }}
                  ></MailCard>
                </li>
              )
            })}
          </ul>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
            <p>暂没有相关数据喔</p>
          </div>
        )}
      </div>
    )
  }
}

export default DraftBox
