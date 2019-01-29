var helpers = {}

helpers.createRandomString = function(strLength) {
  var strLength = typeof(strLength) == 'number' && strLength > 0 ? strLength : false
  if(strLength) {
    var possibleCharactors = 'abcdefghijklmnopqrstuvwxyz0123456789'
    // empty string
    var str = ''
    for(var i = 1; i<=strLength; i++) {
      // Get a random charactor from possible charactors
      var randomCharactor = possibleCharactors.charAt(Math.floor(Math.random()*possibleCharactors.length))
      // append that charactor to string
      str += randomCharactor
    }

    // returning random string
    return str

  } else {
    return false
  }
}

module.exports = helpers