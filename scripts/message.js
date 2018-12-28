chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.info === 'message') {
        console.log('收到background的指令发消息')
        chrome.runtime.sendMessage({ success: true })
    } else if (request.info === 'refresh') {
        if (request.url.indexOf('baidu.com') > -1) {
            window.location.reload()
        }
        // console.log('refresh', request, sender)
    }
    return true
})