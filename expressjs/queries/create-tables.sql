CREATE TABLE "groups" (
                          "id" int PRIMARY KEY,
                          "name" varchar
);

CREATE TABLE "colors" (
                          "id" int PRIMARY KEY,
                          "code" varchar,
                          "group_id" int
);

CREATE INDEX ON "colors" ("id");

CREATE INDEX ON "groups" ("id");

ALTER TABLE "colors" ADD FOREIGN KEY ("group_id") REFERENCES "groups" ("id");