const {Tickets} = require('../../../models');

async function getTickets() {
	return Tickets.find({});
}

async function getTicketById(id) {
	return Tickets.find({'userInfo.userId': id});
}

async function updateTicket(id, updateData) {
	return Tickets.findByIdAndUpdate(id, updateData, {new: true});
}

async function deleteTicket(id) {
	return Tickets.findByIdAndDelete(id);
}

async function findTicketsbyId(id) {
	return Tickets.find(id);
}

// need action
async function cancelTicket(id) {
	return Tickets.findByIdAndUpdate(id, {status: 'cancelled'}, {new: true});
}

async function getTicketByOrderId(orderId) {
	return Tickets.findOne({
		'orderInfo.orderId': orderId,
	});
}

module.exports = {
	getTickets,
	getTicketById,
	updateTicket,
	deleteTicket,
	getTickets,
	getTicketById,
	updateTicket,
	deleteTicket,
	cancelTicket,
	findTicketsbyId,
	getTicketByOrderId,
};
