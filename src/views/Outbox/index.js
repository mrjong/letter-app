import React, { Component } from 'react'
import { connect } from 'react-redux'
import { MailCard } from '@/components'
import { queryOutboxList, lettersDelete, queryPostAddress, readLetter } from '../../redux/mail.redux'
import { handleModalShow } from '../../redux/common.redux'
import './style.less'
import redux from '../../redux'

@connect((state) => state.mail, {
  queryOutboxList,
  lettersDelete,
  queryPostAddress,
  handleModalShow,
  readLetter
})
class OutBox extends Component {
  componentDidMount() {
    this.props.queryOutboxList()
  }

  onWriteLetterButton = (id) => {
    this.props.queryPostAddress(id, 'letter')
  }

  onMailCardClick = (item) => {
    this.props.readLetter(item.letterId)
  }

  render() {
    const { outboxList = [] } = this.props
    return (
      <div>
        {outboxList.length > 0 ? (
          <ul className="outbox__list">
            {outboxList.map((item, index) => {
              return (
                <li className="outbox__list--item" key={item.letterId}>
                  <MailCard
                    {...item}
                    renderContent={
                      <div className="outbox__list--item-content">
                        <p style={{ color: '#ff000094', fontWeight: 'bold', fontSize: '.3rem' }}>
                          {item.letterType}·{item.letterDistributeSts}
                        </p>
                        <p>{item.msg}</p>
                      </div>
                    }
                    buttons={[
                      <button
                        className="operate-button"
                        onClick={(e) => {
                          e.stopPropagation()
                          this.onWriteLetterButton(item.letterId)
                        }}
                        key="0"
                      >
                        再写一封
                      </button>,
                      <button
                        className="operate-button"
                        onClick={(e) => {
                          e.stopPropagation()
                          this.props.handleModalShow({
                            type: 'delete',
                            onConfirm: () => {
                              this.props.lettersDelete(item.letterId, () => {
                                this.props.queryOutboxList()
                              })
                            }
                          })
                        }}
                        key="1"
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

export default OutBox
