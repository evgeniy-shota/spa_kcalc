function throttle(callee, timeout) {
  let timer = null

  return function perform(...args) {
    if (timer) return 0

    timer = setTimeout(() => {
      callee(...args)
      clearTimeout(timer)
      timer = null
    }, timeout)
  }
}

export { throttle }
