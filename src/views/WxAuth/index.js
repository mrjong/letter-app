import React, { Component } from 'react'
import { updateUserAppId } from '../../redux/user.redux'
import qs from "qs";
import { connect } from 'react-redux'

@connect((state) => state.user, {
    updateUserAppId
})
class WxAuth extends Component {
    componentDidMount() {
        const urlParam = qs.parse(window.location.search, {ignoreQueryPrefix: true});
        if (urlParam.code) {
            this.props.updateUserAppId(urlParam.code)
        }
    }

    render() {
        return null;
    }
}

export default WxAuth