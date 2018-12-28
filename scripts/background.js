

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    console.log(message)
    if (message.success) {
        console.log('background发送后台指令')
        broadcastTabs({ info: 'refresh' })
    }
});

function broadcastTabs(m = {}) {
    chrome.tabs.query({}, function (tabs) {
        tabs.forEach(function (item) {
            chrome.tabs.sendMessage(item.id, Object.assign(m, item))
        })
    })
}


chrome.contextMenus.create({
    'type': 'normal',
    'title': '发消息',
    'id': 'message',
    'onclick': message
})

function message() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { info: "message" }, function (r) {
            console.log('reviever', r)
        });
    });
}
