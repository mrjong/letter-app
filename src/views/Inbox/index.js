import React, { Component } from 'react'
import { connect } from 'react-redux'
import { MailCard } from '@/components'
import { queryInboxList } from '../../redux/mail.redux'
import './style.less'

@connect((state) => state.mail, {
  queryInboxList
})
class InBox extends Component {
  componentDidMount() {
    this.props.queryInboxList()
  }
  render() {
    const { inboxList = [] } = this.props
    return (
      <div>
        <ul className="inbox__list">
          {inboxList.map((item, index) => {
            return (
              <li className="inbox__list--item" key={item.letterId}>
                <MailCard
                  {...item}
                  label={`${item.addressCity}·${item.letterName}`}
                  renderContent={item.content}
                  buttons={[
                    <button
                      className="operate-button"
                      onClick={() => {
                        this.props.history.push('/post_confirm')
                      }}
                      key="0"
                    >
                      回信
                    </button>,
                    <button
                      className="operate-button"
                      onClick={() => {
                        this.props.lettersDelete(item.letterId, () => {
                          this.props.queryInboxList()
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

export default InBox
