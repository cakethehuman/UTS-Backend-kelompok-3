const { errorResponder, errorTypes } = require('../core/errors');

const { Orders } = require('../models')

async function checkOwnership(request, response, next) {
  try {
    const { orderId } = request.body; // take orderId from the request
    const userId = request.user.id; // take user id from user that is verified from verifyLogin


    // verifi
    const order = await Orders.findOne({
      _id: orderId,
      userId: userId
    });

    if (!order) {
      throw errorResponder(
        errorTypes.VALIDATION,
        "Order not found"
      );
    }

    request.order = order;

    next(); // go to next process (next middleware)
  } catch (error) {
    next(error);
  }
}

module.exports = checkOwnership;