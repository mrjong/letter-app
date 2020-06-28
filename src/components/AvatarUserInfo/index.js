import React from 'react'
import './style.less'
import nan from '../../assets/images/common/nan.png'
import nv from '../../assets/images/common/nv.png'

export default function (props) {
  const { headImgPath: avatar, penName, sex: gender, address, autograph } = props
  return (
    <div className="avatar__userinfo">
      <div className="avatar__userinfo--left">
        <img src={avatar} alt="头像" className="avatar__userinfo--left-img" />
      </div>
      <div className="avatar__userinfo--right">
        <p className="avatar__userinfo--right-name">{penName}</p>
        <div className="avatar__userinfo--right-genderWrap">
          <img src={gender === '0' ? nv : nan} alt="gender" className="avatar__userinfo--right-gender" />
          <span className="avatar__userinfo--right-address">{address}</span>
        </div>
        <p className="avatar__userinfo--right-autograph">{autograph}</p>
      </div>
    </div>
  )
}
