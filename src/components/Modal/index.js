import React, { Component } from 'react'
import { Modal } from 'antd-mobile'
import { connect } from 'react-redux'
import { handleModalShow, handleModalHide } from '../../redux/common.redux'
import { logoutApp } from '../../redux/login.redux'

const modalConfig = {
  logout: {
    title: '确定要退出吗?',
    content: '',
    button: [
      { text: '取消', onPress: () => handleModalHide(), style: 'default' },
      { text: '退出', onPress: () => logoutApp() }
    ]
  },
  editSave: {
    title: '是否保存?',
    content: <img src={'https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg'} alt="头像" />,
    button: [
      { text: '取消', onPress: () => console.log('cancel'), style: 'default' },
      { text: '保存', onPress: () => console.log('ok') }
    ]
  }
}

const alert = Modal.alert
let alertInstance = null

const showAlert = (params) => {
  alertInstance = alert(params.title, params.content, params.button)
}

@connect((state) => state.common, {
  handleModalShow
})
class AppModal extends Component {
  componentWillReceiveProps(){
    console.log('fuck')
  }
  componentDidUpdate(prevProps) {
    const { modalShow, modalType } = this.props
    console.log(modalShow, 999)

    if (modalShow) {
      showAlert(modalConfig[modalType])
    }
  }
  render() {
    return null
  }
}

export default AppModal
