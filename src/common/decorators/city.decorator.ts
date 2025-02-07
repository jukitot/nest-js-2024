import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsCityAllow(validationOptions?: ValidationOptions) {
  return (Object: any, propertyName: string) => {
    registerDecorator({
      target: Object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: {
        validate(value: any): Promise<boolean> | boolean {
          return validationOptions.groups.includes(value);
        },
      },
    });
  };
}
