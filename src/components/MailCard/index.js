import React from 'react'
import AvatarUserInfo from '../AvatarUserInfo'
import './style.less'

export default function MailCard(props) {
  const { headImg: avatar, label, penName, renderContent, buttons, onMailCardClick, userId } = props
  return (
    <div className="mail-card" onClick={onMailCardClick}>
      <div className="mail-card__top">
        <div className="mail-card__top--avatar">
          <AvatarUserInfo avatar={avatar} penName={penName} userId={userId} />
        </div>
        <span className="mail-card__top--type">{label}</span>
      </div>
      <div className="mail-card__center">{renderContent}</div>
      <div className="mail-card__bottom">{buttons.map((btn) => btn)}</div>
    </div>
  )
}
