import React, { Component } from 'react'
import { connect } from 'react-redux'
import { MailCard } from '@/components'
import { queryDraftboxList, lettersDelete } from '../../redux/mail.redux'
import './style.less'

@connect((state) => state.mail, {
  queryDraftboxList,
  lettersDelete
})
class DraftBox extends Component {
  componentDidMount() {
    this.props.queryDraftboxList()
  }
  render() {
    const { draftboxList = [] } = this.props
    return (
      <div className="draftbox">
        <ul className="draftbox__list">
          {draftboxList.map((item, index) => {
            return (
              <li className="draftbox__list--item" key={item.letterId}>
                <MailCard
                  {...item}
                  label={item.letterType}
                  renderContent={item.content}
                  buttons={[
                    <button
                      className="operate-button"
                      onClick={() => {
                        this.props.lettersDelete(item.letterId, () => {
                          this.props.queryDraftboxList()
                        })
                      }}
                      key="0"
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

export default DraftBox
