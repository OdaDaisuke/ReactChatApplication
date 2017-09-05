const funcs = {
  generateUUID: () => {
    const UUID_LENGTH = 40
    let character = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefghijklmnopqrstuvwxyz';
    let uuid = '';

    for(let i = 0; i < UUID_LENGTH; i++) {
      let r = parseInt(Math.random() * character.length - 1, 10)
      uuid += character[r]
    }

    return uuid

  }
}

export default funcs
