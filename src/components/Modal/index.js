import React, { Component } from 'react'
import { Modal } from 'antd-mobile'
import { connect } from 'react-redux'
import { handleModalHide } from '../../redux/common.redux'
import { logoutApp } from '../../redux/login.redux'
import { lettersSave, lettersDelete, letterSendOut } from '../../redux/mail.redux'
import mail_img from '../../assets/images/mails/xiexin_2.png'
import './style.less'

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
  state = {
    visible: false,
    modal: null
  }
  componentWillReceiveProps(prevProps) {
    this.setState({
      modal: this.renderModal(prevProps),
      visible: prevProps.common.modalShow
    })
  }

  renderModal = (prevProps) => {
    const { handleModalHide, lettersDelete, lettersSave, letterSendOut, mail = {}, common = {} } = prevProps
    switch (common.modalType) {
      case 'logout':
        return {
          title: '',
          content: '确定要退出吗?',
          button: [
            { text: '取消', onPress: () => handleModalHide() },
            { text: '退出', onPress: () => logoutApp() }
          ]
        }
      case 'delete':
        return {
          title: '',
          content: '确定要删除吗?',
          button: [
            { text: '取消', onPress: () => handleModalHide() },
            { text: '确定', onPress: () => common.modalConfirmCallback() }
          ]
        }
      case 'tip':
        return {
          title: '',
          content: '返回后内容将不会保存',
          button: [
            { text: '取消', onPress: () => handleModalHide() },
            {
              text: '确定',
              onPress: () => {
                handleModalHide()
                window.ReactRouterHistory.goBack()
              }
            }
          ]
        }
      case 'editSave':
        return {
          title: '',
          content: '是否保存为草稿箱?',
          button: [
            {
              text: '删除',
              onPress: () =>
                lettersDelete(mail.letterId, () => {
                  window.ReactRouterHistory.replace('/home')
                })
            },
            {
              text: '保存',
              onPress: () =>
                lettersSave(() => {
                  window.ReactRouterHistory.replace('/home')
                })
            }
          ]
        }
      case 'postConfirm':
        return {
          title: (
            <div>
              <p className="post__confirm--title">收信人信息:</p>
              <p className="post__confirm--desc">
                {mail.receiveAddress.penName} {mail.receiveAddress.mobileHid}
              </p>
              <p className="post__confirm--desc">{mail.receiveAddress.receiveUserAddress}</p>
            </div>
          ),
          content: <img src={mail_img} alt="" className="dynamic-detail__cover" />,
          button: [
            {
              text: (
                <div className="post__confirm--footer">
                  <span>
                    <span className="post__confirm--price">限时: ¥9.8</span>
                    <del className="post__confirm--oldprice">原价: ¥19.8</del>
                  </span>
                  <span
                    className="post__confirm--button"
                    onClick={() => {
                      letterSendOut(() => {
                        //寄出跳转发件箱
                        window.ReactRouterHistory.replace('/outbox')
                      })
                    }}
                  >
                    去支付
                  </span>
                </div>
              )
            }
          ]
        }
      default:
        break
    }
  }

  render() {
    const { visible } = this.state
    const { title = '', button = [], content = '' } = this.state.modal || {}
    return (
      <Modal
        visible={visible}
        transparent
        maskClosable={false}
        onClose={() => {
          this.props.handleModalHide()
        }}
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
