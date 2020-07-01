import React, { Component } from 'react'
import { Modal } from 'antd-mobile'
import { connect } from 'react-redux'
import { handleModalHide } from '../../redux/common.redux'
import { logoutApp } from '../../redux/login.redux'
import { lettersSave, lettersDelete, letterSendOut } from '../../redux/mail.redux'

@connect(
  (state) => ({
    mail: state.mail,
    common: state.common
  }),
  {
    handleModalHide,
    lettersSave,
    lettersDelete,
    letterSendOut
  }
)
class AppModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalConfig: {
        logout: {
          title: '',
          content: '确定要退出吗?',
          button: [
            { text: '取消', onPress: () => props.handleModalHide() },
            { text: '退出', onPress: () => logoutApp() }
          ]
        },
        editSave: {
          title: '',
          content: '是否保存为草稿箱?',
          button: [
            {
              text: '删除',
              onPress: () =>
                props.lettersDelete(props.mail.letterId, () => {
                  props.history.replace('/home')
                })
            },
            {
              text: '保存',
              onPress: () =>
                props.lettersSave(() => {
                  props.history.replace('/home')
                })
            }
          ]
        },
        postConfirm: {
          title: '',
          content: '寄出确认',
          button: [
            {
              text: '取消',
              onPress: () => props.handleModalHide()
            },
            {
              text: '寄出',
              onPress: () =>
                props.letterSendOut(() => {
                  props.handleModalHide()
                  //寄出跳转发件箱
                  props.history.replace('/outbox')
                })
            }
          ]
        }
      }
    }
  }

  componentWillReceiveProps(prevProps) {
    this.setState({
      modal: this.state.modalConfig[prevProps.common.modalType],
      visible: prevProps.common.modalShow
    })
  }
  render() {
    const { visible } = this.state
    const { title = '', button = [], content = '' } = this.state.modal || {}
    return (
      <Modal
        visible={visible}
        transparent
        maskClosable={false}
        // onClose={this.onClose('modal1')}
        title={title}
        footer={button}
      >
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '.4rem' }}>
          {content}
        </div>
      </Modal>
    )
  }
}

export default AppModal
