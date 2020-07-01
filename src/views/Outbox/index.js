import React, { Component } from 'react'
import { connect } from 'react-redux'
import { MailCard } from '@/components'
import { queryOutboxList, lettersDelete } from '../../redux/mail.redux'
import './style.less'

@connect((state) => state.mail, {
  queryOutboxList,
  lettersDelete
})
class OutBox extends Component {
  componentDidMount() {
    this.props.queryOutboxList()
  }
  render() {
    const { outboxList = [] } = this.props
    return (
      <div>
        <ul className="outbox__list">
          {outboxList.map((item, index) => {
            return (
              <li className="outbox__list--item" key={item.letterId}>
                <MailCard
                  {...item}
                  label={item.letterType}
                  renderContent={
                    <div className="outbox__list--item-content">
                      <p>
                        {item.letterType}·{item.letterDistributeSts}
                      </p>
                      <p>{item.msg}</p>
                    </div>
                  }
                  buttons={[
                    <button
                      className="operate-button"
                      onClick={() => {
                        this.props.history.push('/post_confirm')
                      }}
                      key="0"
                    >
                      再写一封
                    </button>,
                    <button
                      className="operate-button"
                      onClick={() => {
                        this.props.lettersDelete(item.letterId, () => {
                          this.props.queryOutboxList()
                        })
                      }}
                      key="1"
                    >
                      删除
                    </button>
                  ]}
                ></MailCard>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default OutBox
