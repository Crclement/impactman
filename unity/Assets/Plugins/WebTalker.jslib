mergeInto(LibraryManager.library, {
  SendWebMessage: function (message) {
    let data = UTF8ToString(message)

    if (typeof window.OnWebMessage === 'function') {
      window.OnWebMessage(data)
    } else {
      console.log('Unity message (no handler):', data)
    }
  }
});