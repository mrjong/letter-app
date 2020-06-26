import React, { Component, Suspense } from 'react'
import { withRouter } from 'react-router-dom'
import { Toast } from 'antd-mobile'
import { Loading } from '@/components'
import { connect } from 'react-redux'
import { renderRoutes } from '../../routers'

@withRouter
@connect()
class RouterGuard extends Component {
  componentWillMount() {
    let {
      route,
      history: { location }
    } = this.props
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
      } else if (!tokenId) {
        Toast.info('请先登录', 2, () => {
          this.props.history.replace('/login')
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
          <route.component route={route}>{renderChildRoutes}</route.component>
        </Suspense>
      )
    }
    return renderChildRoutes
  }
}

export default RouterGuard
