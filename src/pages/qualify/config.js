const sketch_src = {
  营业执照: 'zz1.png' || 'zz11.jpg',
  法人委托书: 'zz3.png',
  '法人委托书(提货、收货)': 'zz3.png',
  质量保证协议: 'zz2.png',
  上一年度企业年度报告公示: 'zz10.jpg',
  '开户许可证/开票信息': 'zz4.png',
  开户许可证: 'zz4.png',
  '药品经营许可证/药品生产许可证': 'zz7.png',
  印章印模: 'zz8.png',
  器械经营许可证: 'zz5.png',
  '食品流通/经营许可证/登记证': 'zz6.png',
  第二类医疗器械经营备案凭证: 'zz9.png',
};

const zzArr = [
  '营业执照',
  '开户许可证',
  '开户许可证/开票信息',
  '身份证',
  '质量保证协议',
  '上一年度企业年度报告公示',
  '电子签章持有人身份证',
];

const zzConfig = {
  '营业执照': {
    len: 1,
    isJpg: true,
    compressionSize: 300,
    url: '/sypt/api/b2b/certificate/uploadBusiLicense',
  },
  '开户许可证': {
    len: 1,
    isJpg: true,
    compressionSize: 300,
    url: '/sypt/api/b2b/certificate/uploadBusiLicense',
  },
  '开户许可证/开票信息': {
    len: 1,
    isJpg: true,
    compressionSize: 300,
    url: '/sypt/api/b2b/certificate/uploadBusiLicense',
  },
  '身份证': {
    len: 2,
    isJpg: false,
    compressionSize: 500,
    url: '/sypt/api/b2b/certificate/uploadImg',
  },
  '电子签章持有人身份证': {
    len: 2,
    isJpg: false,
    compressionSize: 500,
    url: '/sypt/api/b2b/certificate/uploadImg',
  },
  '质量保证协议': {
    len: 3,
    isJpg: false,
    compressionSize: 500,
    url: '/sypt/api/b2b/certificate/uploadImg',
  },
  '上一年度企业年度报告公示': {
    len: 5,
    isJpg: false,
    compressionSize: 500,
    url: '/sypt/api/b2b/certificate/uploadImg',
  },
  defaultZZ: {
    len: 2,
    isJpg: false,
    compressionSize: 500,
    url: '/sypt/api/b2b/certificate/uploadImg',
  },
};

const preImageUrl = 'https://images.expowh.com';

export default { sketch_src, zzArr, zzConfig, preImageUrl };
