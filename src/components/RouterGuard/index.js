import React, { Component, Suspense } from 'react'
import { Toast } from 'antd-mobile'
import { Loading } from '@/components'
import { connect } from 'react-redux'
import { renderRoutes } from '../../routers'
import { changeHistoryState } from '../../utils/back'

@connect()
class RouterGuard extends Component {
  componentWillMount() {
    let {
      route,
      history: { location }
    } = this.props
    window.ReactRouterHistory = this.props.history
    changeHistoryState()
    const isImproveProfile = location.pathname === '/improve_profile'
    const mobileNo = localStorage.getItem('mobileNo')
    const tokenId = localStorage.getItem('tokenId')
    if (route.auth) {
      if (isImproveProfile) {
        if (tokenId) {
          this.props.history.replace('/home')
        } else if (!mobileNo) {
          Toast.info('请先登录', 2, () => {
            this.props.history.replace('/login')
          })
        }
      } else if (mobileNo && !tokenId) {
        Toast.info('请先完善信息', 2, () => {
          this.props.history.replace('/improve_profile')
        })
      }
    }
  }
  render() {
    let { route } = this.props
    const renderChildRoutes = renderRoutes(route.childRoutes)
    if (route.component) {
      return (
        <Suspense fallback={<Loading />}>
          <route.component {...this.props}>{renderChildRoutes}</route.component>
        </Suspense>
      )
    }
    return renderChildRoutes
  }
}

export default RouterGuard
