let OSS = require('ali-oss')

// 阿里云配置
export const client = new OSS({
  region: 'oss-cn-guangzhou',
  accessKeyId: 'LTAI9Sj6DurstxmM',
  accessKeySecret: 'cOdG12D9Nt9YDseEqaw5SB6zYhaDgT',
  bucket: 'achatnet'
})