import { Cascade, Entity, ManyToOne, Property } from '@mikro-orm/core';
import { Base, Tune } from '.';

@Entity()
export class Abc_melody extends Base<Abc_melody> {
  @Property()
  melody: string;

  @Property()
  key: string;

  @ManyToOne(() => Tune, { cascade: [Cascade.PERSIST] })
  tune: Tune;

  constructor(melody: string, key: string, tune: Tune) {
    super();
    this.melody = melody;
    this.key = key;
    this.tune = tune;
  }
}
