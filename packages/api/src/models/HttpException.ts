export default class HttpException {
  public status: number;
  public message: string;

  constructor(status = 500, message?: string) {
    this.status = status;
    this.message = message || this.generateDefaultMessage();
  }

  private generateDefaultMessage(): string {
    switch (this.status) {
      case 404:
        return 'Not found';
      case 422:
        return 'Unprocessable entity';
      default:
        return 'Internal server error';
    }
  }
}
