import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { ImagePicker, Button, Toast } from 'antd-mobile'
import { connect } from 'react-redux'
import { createForm } from 'rc-form'
import {
  handleUploadAvatar,
  handleInitQueryAreaList,
  handleUserRegister,
  handleQueryCityList,
  handleSelectCity
} from '../../redux/user.redux'
import './index.less'

@withRouter
@createForm()
@connect((state) => state.user, {
  handleUploadAvatar,
  handleInitQueryAreaList,
  handleUserRegister,
  handleQueryCityList,
  handleSelectCity
})
class ImproveProfile extends Component {
  state = {
    files: []
  }
  onChange = (files, type, index) => {
    console.log(files, type, index)
    const mobileNo = localStorage.getItem('mobileNo')
    let formData = new FormData()
    formData.append('headImg', files[0].file)
    formData.append('mobileNo', mobileNo)

    this.setState({
      files
    })
    this.props.handleUploadAvatar(formData)
  }
  componentDidMount() {
    this.props.handleInitQueryAreaList({
      parentId: '-1'
    })
  }

  onProvinceChange = (item) => {
    this.props.handleQueryCityList(item)
  }

  onCityChange = (item) => {
    this.props.handleSelectCity(item)
  }

  onUserRegister = () => {
    if (!this.validateForm()) {
      this.props.handleUserRegister({
        nickname: '你好',
        gender: '1',
        history: this.props.history
      })
    }
  }
  validateForm = () => {
    const { nickname, gender, selectedArea } = this.props
    if (!nickname) {
      Toast.info('请填写昵称哦~')
      return false
    } else if (!gender) {
      Toast.info('请选择性别哦~')
      return false
    } else if (selectedArea.length !== 2) {
      Toast.info('请完善地址哦~')
      return false
    }
    return true
  }

  render() {
    const { files } = this.state
    const {
      avatar,
      provinces,
      citys,
      selectedArea,
      form: { getFieldProps }
    } = this.props
    return (
      <div>
        {avatar ? (
          <img src={avatar} alt="头像" />
        ) : (
          <ImagePicker
            files={files}
            onChange={this.onChange}
            selectable={files.length < 1}
            accept="image/gif,image/jpeg,image/jpg,image/png"
            disableDelete
          />
        )}
        {`已经选择${selectedArea.join('|')}`}
        <div className="picker__wrap">
          <ul>
            {provinces.length > 0 &&
              provinces.map((item, index) => {
                return (
                  <li
                    onClick={() => {
                      this.onProvinceChange(item)
                    }}
                    key={item.areaId}
                  >
                    {item.areaName}
                  </li>
                )
              })}
          </ul>
          <ul>
            {citys.length > 0 &&
              citys.map((item, index) => {
                return (
                  <li
                    key={item.areaId}
                    onClick={() => {
                      this.onCityChange(item)
                    }}
                  >
                    {item.areaName}
                  </li>
                )
              })}
          </ul>
        </div>
        <Button type="primary" onClick={this.onUserRegister}>
          注册
        </Button>
      </div>
    )
  }
}

export default ImproveProfile
