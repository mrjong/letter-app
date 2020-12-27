import React, { Component } from 'react'
import { Modal, Toast } from 'antd-mobile'
import { connect } from 'react-redux'
import { handleModalHide } from '../../redux/common.redux'
import { logoutApp } from '../../redux/login.redux'
import { lettersSave, lettersDelete, wxPay } from '../../redux/mail.redux'
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
    wxPay,
    logoutApp
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
    const { handleModalHide, lettersSave, lettersDelete, wxPay, logoutApp, mail = {}, common = {} } = prevProps
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
                window.ReactRouterHistory.go(-2)
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
              text: '不保存',
              onPress: () => {
                handleModalHide()
                  lettersDelete(mail.letterId, () => {
                      window.ReactRouterHistory.replace('/home')
                  })
              }
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
                    <span className="post__confirm--price">限时: ¥19.8</span>
                    <del className="post__confirm--oldprice">原价: ¥29.8</del>
                  </span>
                  <span
                    className="post__confirm--button"
                    onClick={() => {
                      wxPay((data) => {
                          function onBridgeReady() {
                              window.WeixinJSBridge && window.WeixinJSBridge.invoke(
                                  'getBrandWCPayRequest', {
                                      appId: data.appid,
                                      timeStamp: data.timeStamp,
                                      nonceStr: data.nonce_str,
                                      package: data.packageStr,
                                      signType: data.signType,
                                      paySign: data.sign
                                  },
                                  function(res){
                                      if (res.err_msg === "get_brand_wcpay_request:ok" ) {
                                          // 使用以上方式判断前端返回,微信团队郑重提示：
                                          //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                                          Toast.info('支付成功', 2, () => {
                                              handleModalHide()
                                              //寄出跳转发件箱
                                              window.ReactRouterHistory.replace('/outbox')
                                          })
                                      }
                                  })
                          }
                          if (typeof WeixinJSBridge == "undefined"){
                              if( document.addEventListener ){
                                  document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                              }else if (document.attachEvent){
                                  document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                                  document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                              }
                          }else{
                              onBridgeReady();
                          }
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
        <div className="modal-content-wrap">{content}</div>
      </Modal>
    )
  }
}

export default AppModal
