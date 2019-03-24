export const menu = [
  {
    name: '主页',
    path: '/home'
  },
  {
    name: '详情',
    path: '/detail',
    items: [
      {
        name: '昨日',
        path: '/detail/yesterday',
        items: [
          {
            name: '内容1',
            path: '/detail/yesterday/1'
          },
          {
            name: '内容2',
            path: '/detail/yesterday/2'
          }
        ]
      },
      {
        name: '今日',
        path: '/detail/today',
        items: [
          {
            name: '内容3',
            path: '/detail/today/3'
          }
        ]
      }
    ]
  },
  {
    name: '关于',
    path: '/about'
  }
];
