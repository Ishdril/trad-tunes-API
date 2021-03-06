import { Migration } from '@mikro-orm/migrations';

export class Migration20210306200614 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "country" ("id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "country" varchar(255) not null);');
    this.addSql('alter table "country" add constraint "country_pkey" primary key ("id");');
    this.addSql('alter table "country" add constraint "country_country_unique" unique ("country");');
  }

}
