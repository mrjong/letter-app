import React, { Component } from 'react'
import { ImagePicker, Toast, Modal, List } from 'antd-mobile'
import { connect } from 'react-redux'
import { uploadAvatar, initQueryAreaList, userRegister, queryCityList, selectCity } from '../../redux/user.redux'
import './style.less'
import avatarDefault from '../../assets/images/common/avatar_default.jpeg'

@connect((state) => state.user, {
  uploadAvatar,
  initQueryAreaList,
  userRegister,
  queryCityList,
  selectCity
})
class ImproveProfile extends Component {
  state = {
    files: [],
    gender: '',
    showPikerModal: false
  }
  onFileChange = (files, type, index) => {
    const mobileNo = localStorage.getItem('mobileNo')
    let formData = new FormData()
    formData.append('headImg', files[0].file)
    formData.append('mobileNo', mobileNo)

    this.setState({
      files
    })
    this.props.uploadAvatar(formData)
  }
  componentDidMount() {
    this.props.initQueryAreaList({
      parentId: '-1'
    })
  }

  onProvinceChange = (item) => {
    this.props.queryCityList(item)
  }

  onCityChange = (item) => {
    this.props.selectCity(item)
    this.onClosePikerModal()
  }

  onUserRegister = () => {
    const { nickname, gender } = this.state
    if (this.validateForm()) {
      this.props.userRegister({
        nickname,
        gender
      })
    }
  }

  onSelectSex = (index) => {
    this.setState({
      gender: index
    })
  }

  onClosePikerModal = () => {
    this.setState({
      showPikerModal: !this.state.showPikerModal
    })
  }

  onNameChange = (e) => {
    this.setState({
      nickname: e.target.value
    })
  }

  validateForm = () => {
    const { nickname, gender } = this.state
    const { selectedArea } = this.props
    if (!nickname) {
      Toast.info('请填写昵称哦~')
      return false
    } else if (nickname.length > 7) {
      Toast.info('笔名仅支持7个字哦~')
      return false
    } else if (!gender) {
      Toast.info('请选择性别哦~')
      return false
    } else if (!selectedArea || selectedArea.length !== 2) {
      Toast.info('请完善地址哦~')
      return false
    }
    return true
  }

  render() {
    const { files, gender, showPikerModal, nickname } = this.state
    const { avatar, provinces, citys, selectedArea } = this.props
    return (
      <div>
        <div className="improve__form">
          <div className="improve__form--item">
            <label className="improve__form--item-label">上传头像</label>
            <div className="improve__form--item-avatar">
              {avatar ? (
                <img src={avatar || avatarDefault} alt="" />
              ) : (
                <ImagePicker
                  files={files}
                  onChange={this.onFileChange}
                  selectable={files.length < 1}
                  accept="image/gif,image/jpeg,image/jpg,image/png"
                  disableDelete
                />
              )}
            </div>
          </div>
          <div className="improve__form--item">
            <label className="improve__form--item-label">*性别</label>
            <div className="improve__form--item-gender">
              <span
                className={`improve__form--item-gender-item ${gender === '1' && 'active'}`}
                onClick={() => {
                  this.onSelectSex('1')
                }}
              >
                男
              </span>
              <span
                className={`improve__form--item-gender-item ${gender === '0' && 'active'}`}
                onClick={() => {
                  this.onSelectSex('0')
                }}
              >
                女
              </span>
            </div>
            <p className="improve__form--item-tip">后续不可更改</p>
          </div>
          <div className="improve__form--item">
            <label className="improve__form--item-label">*笔名</label>
            <input
              className="improve__form--item-input"
              type="text"
              placeholder="想个能让信友印象深刻的吧～"
              value={nickname || ''}
              onChange={this.onNameChange}
            />
            <p className="improve__form--item-tip">后续将作为唯一身份标识。不可更改喔</p>
          </div>
          <div className="improve__form--item">
            <label className="improve__form--item-label">*你的省市</label>
            <div className="improve__form--item-city" onClick={this.onClosePikerModal}>
              <span className="improve__form--item-city-item">{selectedArea[0] || '请选择'}</span>
              <span className="improve__form--item-city-item">{selectedArea[1] || '请选择'}</span>
            </div>
            <p className="improve__form--item-tip">将成为你推荐信友的重要指标</p>
          </div>
        </div>
        <button onClick={this.onUserRegister} className="improve__form--button">
          完成
        </button>
        <Modal popup visible={showPikerModal} onClose={this.onClosePikerModal} animationType="slide-up">
          <div className="picker__modal--wrap">
            <List className="popup-list">
              {provinces.map((item, index) => (
                <List.Item
                  key={item.areaId}
                  onClick={() => {
                    this.onProvinceChange(item)
                  }}
                >
                  {item.areaName}
                </List.Item>
              ))}
            </List>
            <List className="popup-list">
              {citys.map((item, index) => (
                <List.Item
                  key={item.areaId}
                  onClick={() => {
                    this.onCityChange(item)
                  }}
                >
                  {item.areaName}
                </List.Item>
              ))}
            </List>
          </div>
        </Modal>
      </div>
    )
  }
}

export default ImproveProfile
