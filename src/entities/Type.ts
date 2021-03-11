import { Collection, Entity, OneToMany, Property, Unique } from '@mikro-orm/core';
import { Base, Tune } from '.';

@Entity()
export class Type extends Base<Type> {
  @Property()
  @Unique()
  type: string;

  @OneToMany('Tune', 'type')
  tunes = new Collection<Tune>(this);

  constructor(type: string) {
    super();
    this.type = type;
  }
}
