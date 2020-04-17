const CORE = require("./core");

module.exports.MISSING_REQUIRED_PARAMS = function (message, detailedMessage, responseData = {}) {
  var array = {
    status: false,
    code: 400,
    message: message,
    detailedMessage: detailedMessage,
    data: responseData
  };
  return array;
}

module.exports.UNAUTHORIZED_ACCESS = function (message, detailedMessage, responseData = {}) {
  var array = {
    status: false,
    code: 401,
    message: message,
    detailedMessage: detailedMessage,
    data: responseData
  };
  return array;
}

module.exports.FORBIDDEN = function (message, detailedMessage, responseData = {}) {
  var array = {
    status: false,
    code: 403,
    message: message,
    detailedMessage: detailedMessage,
    data: responseData
  };
  return array;
}

module.exports.RECORD_NOT_FOUND = function (message, detailedMessage, responseData = {}) {
  var array = {
    status: false,
    code: 404,
    message: message,
    detailedMessage: detailedMessage,
    data: responseData
  };
  return array;
}

module.exports.INVALID_DATA = function (message, detailedMessage, responseData = {}) {
  var array = {
    status: false,
    code: 422,
    message: message,
    detailedMessage: detailedMessage,
    data: responseData
  };
  return array;
}

module.exports.SERVER_ERROR = function (message, detailedMessage, responseData = {}) {
  var array = {
    status: false,
    code: 500,
    message: message,
    detailedMessage: detailedMessage,
    data: responseData
  };
  return array;
}
/**
 * @param message
 * @param detailedMessage
 * @param responseData
 */
module.exports.SUCCESS = function (message, detailedMessage, responseData = {}, myStatus = true) {
  var array = {
    status: myStatus,
    code: 200,
    message: message,
    detailedMessage: detailedMessage,
    data: responseData
  };
  return array;
}

module.exports.EMPTY_RECORD = function (message, detailedMessage, responseData = {}) {
  var array = {
    status: true,
    code: 204,
    message: message,
    detailedMessage: detailedMessage,
    data: responseData
  };
  return array;
}

module.exports.status = {
  MISSING_REQUIRED_PARAMS: 400,
  UNAUTHORIZED_ACCESS: 401,
  FORBIDDEN: 403,
  RECORD_NOT_FOUND: 404,
  INVALID_DATA: 422,
  SERVER_ERROR: 500,
  SUCCESS: 200,
  EMPTY_RECORD: 204
}