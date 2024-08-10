const iconType = [
  {
    key: '工资',
    val: 'cat',
  },
  {
    key: '出差报销',
    val: 'car',
  },
  {
    key: '补贴',
    val: 'cat',
  },
  {
    key: '宠物',
    val: 'cat',
  },
  { key: '交通出行', val: 'car' },
  { key: '充值缴费', val: 'shopping2' },
  { key: '医疗健康', val: '' },
  { key: '商业服务', val: '' },
  { key: '家居家装', val: 'house' },
  { key: '数码电器', val: 'shopping2' },
  { key: '文化休闲', val: 'coffee' },
  { key: '日用百货', val: 'shopping2' },
  { key: '服饰装扮', val: '' },
  { key: '爱车养车', val: 'car' },
  { key: '生活服务', val: 'coffee' },
  { key: '美容美发', val: '' },
  { key: '转账红包', val: '' },
  { key: '酒店旅游', val: 'house' },
  { key: '餐饮美食', val: 'eat' },
]

// 转换icon (%s )
export function getIconClass(typeName) {
  var iconStr = ''
  iconType.forEach((v) => {
    if (v.key == typeName) {
      iconStr = v.val
    }
  })
  if (iconStr === '' || iconStr.length === 0) {
    iconStr = 'shopping2'
  }
  // console.debug("getIconClass2", iconStr);
  return iconStr
}

export function getIconTyeList() {
  return iconType
}