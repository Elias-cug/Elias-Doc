function getJavascriptSidebar() {
  const sidebar = {
    title: '基础',
    collapsable: false,
    children: [
      '基础'
    ]
  }

  return sidebar
}
function getCssSidebar() {
  const sidebar = {
    title: '基础',
    collapsable: false,
    children: [
      '基础'
    ]
  }

  return sidebar
}

const Sidebar = {
  '/javascript/基础': getJavascriptSidebar(),
  '/css': getCssSidebar()
}

module.exports = {
  Sidebar
}