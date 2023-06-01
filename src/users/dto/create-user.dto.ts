import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  when: string;
}

export class PaginationDto {
  @ApiProperty()
  page: number;

  @ApiProperty()
  limit: number;
}
