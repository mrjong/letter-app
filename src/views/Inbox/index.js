import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Steps } from 'antd-mobile'
import { MailCard } from '@/components'
import { queryInboxList, lettersDelete, queryPostAddress, readLetter } from '../../redux/mail.redux'
import { handleModalShow } from '../../redux/common.redux'
import successIcon from '../../assets/images/mails/success.png'
import waitIcon from '../../assets/images/mails/wait.png'
import './style.less'

const Step = Steps.Step

@connect((state) => state.mail, {
  queryInboxList,
  lettersDelete,
  queryPostAddress,
  handleModalShow,
  readLetter
})
class InBox extends Component {
  componentDidMount() {
    this.props.queryInboxList()
  }

  onMailCardClick = (item) => {
    this.props.readLetter(item.letterId)
  }

  onWriteLetterButton = (id) => {
    this.props.queryPostAddress(id)
  }

  renderContent = (item) => {
    if (item.process === 'Y') {
      return item.content
    } else {
      return (
        <Steps direction="horizontal" size="small">
          <Step status="finish" title="制作信件" icon={<img className="process-icon" src={successIcon} alt="icon" />} />
          <Step
            status={`${item.letterDistributeSts === '02' || item.letterDistributeSts === '03' ? 'finish' : 'wait'}`}
            title="寄送信件"
            icon={
              <img
                className="process-icon"
                src={item.letterDistributeSts === '02' || item.letterDistributeSts === '03' ? successIcon : waitIcon}
                alt="icon"
              />
            }
          />
          <Step
            status={`${item.letterDistributeSts === '03' ? 'finish' : 'wait'}`}
            title="读取信件"
            icon={
              <img
                className="process-icon"
                src={item.letterDistributeSts === '03' ? successIcon : waitIcon}
                alt="icon"
              />
            }
          />
        </Steps>
      )
    }
  }

  render() {
    const { inboxList = [] } = this.props
    return (
      <div>
        {inboxList.length > 0 ? (
          <ul className="inbox__list">
            {inboxList.map((item, index) => {
              return (
                <li className="inbox__list--item" key={item.letterId}>
                  <MailCard
                    {...item}
                    label={`${item.addressCity}·${item.letterName}`}
                    renderContent={this.renderContent(item)}
                    buttons={[
                      <button
                        className="operate-button"
                        onClick={(e) => {
                          e.stopPropagation()
                          this.onWriteLetterButton(item.sendUserId)
                        }}
                        key="0"
                      >
                        回信
                      </button>,
                      <button
                        className="operate-button"
                        onClick={(e) => {
                          e.stopPropagation()
                          this.props.handleModalShow({
                            type: 'delete',
                            onConfirm: () => {
                              this.props.lettersDelete(item.letterId, () => {
                                this.props.queryInboxList()
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

export default InBox
