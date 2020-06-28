import React, { Component } from 'react'
import { AvatarUserInfo } from '@/components'
import './style.less'

const friends = [
  {
    penName: '舒湛',
    sex: '1',
    address: '北京·昌平',
    autograph: '念萤火之森泡沫之夏',
    headImgPath:
      'https://xinyouge-1302445846.cos.ap-beijing.myqcloud.com//head-img/2CDAF5821A672242C69D73F07E851203.png'
  },
  {
    penName: '舒湛',
    sex: '1',
    address: '北京·昌平',
    autograph: '念萤火之森泡沫之夏',
    headImgPath:
      'https://xinyouge-1302445846.cos.ap-beijing.myqcloud.com//head-img/2CDAF5821A672242C69D73F07E851203.png'
  },
  {
    penName: '舒湛',
    sex: '1',
    address: '北京·昌平',
    autograph: '念萤火之森泡沫之夏',
    headImgPath:
      'https://xinyouge-1302445846.cos.ap-beijing.myqcloud.com//head-img/2CDAF5821A672242C69D73F07E851203.png'
  },
  {
    penName: '舒湛',
    sex: '1',
    address: '北京·昌平',
    autograph: '念萤火之森泡沫之夏',
    headImgPath:
      'https://xinyouge-1302445846.cos.ap-beijing.myqcloud.com//head-img/2CDAF5821A672242C69D73F07E851203.png'
  },
  {
    penName: '舒湛',
    sex: '1',
    address: '北京·昌平',
    autograph: '念萤火之森泡沫之夏',
    headImgPath:
      'https://xinyouge-1302445846.cos.ap-beijing.myqcloud.com//head-img/2CDAF5821A672242C69D73F07E851203.png'
  },
  {
    penName: '舒湛',
    sex: '1',
    address: '北京·昌平',
    autograph: '念萤火之森泡沫之夏',
    headImgPath:
      'https://xinyouge-1302445846.cos.ap-beijing.myqcloud.com//head-img/2CDAF5821A672242C69D73F07E851203.png'
  }
]

class Friends extends Component {
  render() {
    return (
      <div className="friends__list">
        {friends.map((item, index) => {
          return (
            <div className="friends__list--item" key={index}>
              <div className="friends__list--item-left">
                <AvatarUserInfo {...item} />
              </div>
              <button className="friends__list--item-button">写信</button>
            </div>
          )
        })}
      </div>
    )
  }
}

export default Friends
