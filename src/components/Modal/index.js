import React, { Component } from 'react'
import { Modal } from 'antd-mobile'
import { connect } from 'react-redux'
import { handleModalHide } from '../../redux/common.redux'
import { logoutApp } from '../../redux/login.redux'
import { lettersSave, lettersDelete } from '../../redux/mail.redux'

@connect((state) => state.common, {
  handleModalHide,
  lettersSave,
  lettersDelete
})
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
            { text: '删除', onPress: () => props.lettersDelete() },
            {
              text: '保存',
              onPress: () => props.lettersSave()
            }
          ]
        }
      }
    }
  }

  componentWillReceiveProps(prevProps) {
    this.setState({
      modal: this.state.modalConfig[prevProps.modalType],
      visible: prevProps.modalShow
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
