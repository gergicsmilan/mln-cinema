export class Movie {
  constructor(
    public id: string,
    public name: string,
    public playingUntil: Date,
    public imdb: string,
    public time: string,
    public smallImgUrl: string,
    public categories: [string]
  ) {}
}
