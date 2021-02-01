import { Movie } from './movie.model';
import { Ticket } from './ticket.model';

export class Order {
  date: string;
  id: string;
  movie: Movie;
  tickets: Ticket[];
  userId?: string;
}
