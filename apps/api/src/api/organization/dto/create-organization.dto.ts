import {
  StringField,
  StringFieldOptional,
} from '@/decorators/field.decorators';

export class CreateOrganizationDto {
  @StringField({ minLength: 1, maxLength: 255 })
  name: string;

  @StringFieldOptional({ maxLength: 1000 })
  description?: string;
}
