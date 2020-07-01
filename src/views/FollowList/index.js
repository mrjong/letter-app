import React, { Component } from 'react'
import { AvatarUserInfo } from '@/components'
import { connect } from 'react-redux'
import { queryFansUserList } from '../../redux/user.redux'
import './style.less'

@connect((state) => state.user, { queryFansUserList })
class FollowList extends Component {
  componentDidMount() {
    this.props.queryFansUserList()
  }
  render() {
    const { fansUserList = [] } = this.props
    console.log(this.props)
    return (
      <div className="follow__list">
        {fansUserList.map((item, index) => {
          return (
            <div className="follow__list--item" key={item.userId}>
              <div className="follow__list--item-left">
                <AvatarUserInfo {...item} avatar={item.headImg} />
              </div>
              <button className="follow__list--item-button">写信</button>
            </div>
          )
        })}
      </div>
    )
  }
}

export default FollowList
