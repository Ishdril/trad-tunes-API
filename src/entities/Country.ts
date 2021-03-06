import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Country {
  @PrimaryKey()
  id!: number;

  @Property()
  country!: string;
}
