import { AuthenticatedRequest } from "@/middlewares";
import ticketsService from "@/services/tickets-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getTicketsTypes(req: AuthenticatedRequest, res: Response) {

  try {
    const ticketsTypes = await ticketsService.getTicketType();

    return res.status(httpStatus.OK).send(ticketsTypes);
  } catch (error) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}

export async function getTickets(req: AuthenticatedRequest, res: Response) {

  const { userId } = req;

  try {
    const tickets = await ticketsService.getTicket(userId);

    return res.status(httpStatus.OK).send(tickets);
  } catch (err) {
    if (err.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
  }
}

export async function postTickets(req: AuthenticatedRequest, res: Response) {

  const { ticketTypeId } = req.body;
  const { userId } = req;

  try {
    const ticket = await ticketsService.postTicket(userId, ticketTypeId);

    res.status(httpStatus.CREATED).send(ticket);
  } catch (err) {
    if (err.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    } else if (err.name === "BadRequestError") {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
  } 
}
