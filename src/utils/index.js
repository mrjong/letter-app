/*rc-form 获取第一个错误 */
export const getFirstError = (error) => {
  if (error) {
    const firstErr = error[Object.keys(error)[0]].errors
    return firstErr[0].message
  }
  return ''
}
