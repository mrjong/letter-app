import React from 'react'
import './style.less'
export default function PostForm(props) {
  const { onPostMan, onPostPhone, onPostAddress, postMan, postPhone, postAddress, disabled, hide } = props
  return (
    <div className="post__form">
      <div className="post__form--item">
        <label className="post__form--item-label">收信人</label>
        <div>
          <input
            type="text"
            className="post__form--item-input"
            onChange={(e) => {
              onPostMan(e.target.value)
            }}
            value={postMan}
            disabled={disabled}
          />
        </div>
      </div>
      <div className="post__form--item">
        <label className="post__form--item-label">收信人电话</label>
        <div>
          <input
            type="number"
            className="post__form--item-input"
            onChange={(e) => {
              onPostPhone(e.target.value)
            }}
            value={postPhone}
            disabled={disabled}
          />
        </div>
      </div>
      {!hide && (
        <div className="post__form--item">
          <label className="post__form--item-label">收信地址</label>
          <div>
            <input
              type="text"
              className="post__form--item-input"
              onChange={(e) => {
                onPostAddress(e.target.value)
              }}
              value={postAddress}
              disabled={disabled}
            />
          </div>
        </div>
      )}
    </div>
  )
}
