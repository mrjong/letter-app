import React, { Component } from 'react'
import { ImagePicker } from 'antd-mobile'

class ImproveProfile extends Component {
  state = {
    files: []
  }
  onChange = (files, type, index) => {
    console.log(files, type, index)
    this.setState({
      files
    })
  }
  render() {
    const { files } = this.state
    return (
      <div>
        <ImagePicker
          files={files}
          onChange={this.onChange}
          selectable={files.length < 1}
          accept="image/gif,image/jpeg,image/jpg,image/png"
          disableDelete
        />
      </div>
    )
  }
}

export default ImproveProfile
