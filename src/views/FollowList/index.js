import React, { Component } from 'react'
import { AvatarUserInfo } from '@/components'
import { connect } from 'react-redux'
import { queryFansUserList } from '../../redux/user.redux'
import { queryPostAddress } from '../../redux/mail.redux'
import './style.less'

@connect((state) => state.user, { queryFansUserList, queryPostAddress })
class FollowList extends Component {
  componentDidMount() {
    this.props.queryFansUserList()
  }

  onWriteLetterButton = (id) => {
    this.props.queryPostAddress(id)
  }
  render() {
    const { fansUserList = [] } = this.props
    return (
      <div className="follow__list">
        {fansUserList.length > 0 ? (
          <div>
            {fansUserList.map((item, index) => {
              return (
                <div className="follow__list--item" key={item.userId}>
                  <div className="follow__list--item-left">
                    <AvatarUserInfo {...item} avatar={item.headImg} address={item.addressCity} />
                  </div>
                  <button
                    className="follow__list--item-button"
                    onClick={() => {
                      this.onWriteLetterButton(item.userId)
                    }}
                  >
                    写信
                  </button>
                </div>
              )
            })}
          </div>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
            <p>暂没有相关数据喔</p>
          </div>
        )}
      </div>
    )
  }
}

export default FollowList
