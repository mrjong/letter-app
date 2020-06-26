import React, { Component } from 'react'
import { PickerView } from 'antd-mobile'

class UserInfo extends Component {
  state = {
    seasons: [
      {
        label: '北京',
        value: '01'
        // children: [
        //   {
        //     label: '东城区',
        //     value: '01-1',
        //   },
        //   {
        //     label: '西城区',
        //     value: '01-2',
        //   },
        //   {
        //     label: '崇文区',
        //     value: '01-3',
        //   },
        //   {
        //     label: '宣武区',
        //     value: '01-4',
        //   },
        // ],
      },
      {
        label: '春',
        value: '春'
      },
      {
        label: '夏',
        value: '夏'
      }
    ]
  }
  onChange = (val) => {
    console.log(val)
    const { seasons } = this.state

    const arr = seasons.map((item, index) => {
      if (val[0] === item.label) {
        return {
          ...item,
          children: [
            {
              label: '东城区',
              value: '01-1'
            },
            {
              label: '西城区',
              value: '01-2'
            }
          ]
        }
      }else{
        return item
      }
    })

    console.log(arr)
    this.setState({
      seasons: arr
    })
  }
  render() {
    return (
      <div>
        个人信息
        <PickerView
          onChange={this.onChange}
          onScrollChange={this.onScrollChange}
          value={this.state.value}
          data={this.state.seasons}
          // cascade={false}
        />
      </div>
    )
  }
}

export default UserInfo
