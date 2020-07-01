import React from 'react'
import './style.less'
import nan from '../../assets/images/common/nan.png'
import nv from '../../assets/images/common/nv.png'

export default function (props) {
  const { avatar, penName, sex, address, autograph, userId } = props
  return (
    <div className="avatar__userinfo">
      <div
        className="avatar__userinfo--left"
        onClick={() => {
          //查看好友详情
          window.ReactRouterHistory.push(`/friend_detail/${userId}`)
        }}
      >
        <img src={avatar} alt="头像" className="avatar__userinfo--left-img" />
      </div>
      <div className="avatar__userinfo--right">
        {penName && <p className="avatar__userinfo--right-name">{penName}</p>}
        {(address || String(sex)) && (
          <div className="avatar__userinfo--right-genderWrap">
            <img src={sex === '0' ? nv : nan} alt="gender" className="avatar__userinfo--right-gender" />
            <span className="avatar__userinfo--right-address">{address}</span>
          </div>
        )}
        {autograph && <p className="avatar__userinfo--right-autograph">{autograph}</p>}
      </div>
    </div>
  )
}
