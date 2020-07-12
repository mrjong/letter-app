/*rc-form 获取第一个错误 */
export const getFirstError = (error) => {
  if (error) {
    const firstErr = error[Object.keys(error)[0]].errors
    return firstErr[0].message
  }
  return ''
}

export const validators = {
  number: (val) => /^[0-9]*$/.test(val),
  bankCreditCardNumber: (val) => /^\d{14,20}$/.test(val), // 银行卡号 val.replace(/\s+/g, "")
  bankCardNumber: (val) => /^\d{16}|\d{24}$/.test(val), // 银行卡号 val.replace(/\s+/g, "")
  phone: (val) => /^1\d{10}$/.test(val), // 手机为以1开头的11位数字
  iDCardNumber: (val) => /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(val), // 身份证 中国的身份证号，一代身份证号是15位的数字，二代身份证都是18位的，最后一位校验位除了可能是数字还可能是‘X‘或‘x‘，所以有四种可能性：a.15位数字 b.18位数字 c.17位数字，第十八位是‘X‘ d.17位数字，第十八位是‘x‘
  enLength: (val, min, max) => {
    // 英文字符长度校验
    if (val.replace(/(^\s*)|(\s*$)/g, '') === '') {
      // /^(?!(\s+$))/
      return false
    } else if (min) {
      if (val.length < min) {
        return false
      } else if (max) {
        if (val.length > max) {
          return false
        }
        return true
      }
      return true
    }
  },
  name: (val) => /^([\u4e00-\u9fa5]){2,20}$/.test(val),
  chLength: (val, min, max) => {
    // 中文字符长度校验121
    let minNum = min || 1
    let maxNum = max || 100000
    let chReg = new RegExp(`^(([\u4e00-\u9fa5])|(\\.)|(\\·)){${minNum},${maxNum}}$`)
    return chReg.test(val)
  }
}

export const validatePhone = (rule, value, callback) => {
  if (!value || value.length === 0) {
    callback(new Error('请输入手机号码'))
  } else if (validators.phone(value.trim())) {
    callback()
  } else {
    callback(new Error('手机号码不合法'))
  }
}

export const validateSmsCode = (rule, value, callback) => {
  if (!value || value.length === 0) {
    callback(new Error('请输入验证码'))
  } else if (value.length !== 4) {
    callback(new Error('验证码不合法'))
  } else {
    callback()
  }
}
