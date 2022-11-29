CREATE TABLE "questions"(
    "id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "body" TEXT NOT NULL,
    "date_written" DATE NOT NULL,
    "asker_name" TEXT NOT NULL,
    "asker_email" TEXT NOT NULL,
    "reported" INTEGER NOT NULL,
    "helpful" INTEGER NOT NULL
);
ALTER TABLE
    "questions" ADD PRIMARY KEY("id");
CREATE TABLE "answers"(
    "id" INTEGER NOT NULL,
    "question_id" INTEGER NOT NULL,
    "body" TEXT NOT NULL,
    "date_written" DATE NOT NULL,
    "answerer_name" TEXT NOT NULL,
    "answerer_email" TEXT NOT NULL,
    "reported" BOOLEAN NOT NULL,
    "helpful" INTEGER NOT NULL
);
ALTER TABLE
    "answers" ADD PRIMARY KEY("id");
CREATE TABLE "answers_photos"(
    "id" INTEGER NOT NULL,
    "answer_id" INTEGER NOT NULL,
    "url" TEXT NOT NULL
);
ALTER TABLE
    "answers_photos" ADD PRIMARY KEY("id");
ALTER TABLE
    "answers_photos" ADD CONSTRAINT "answers_photos_answer_id_foreign" FOREIGN KEY("answer_id") REFERENCES "answers"("id");
ALTER TABLE
    "answers" ADD CONSTRAINT "answers_question_id_foreign" FOREIGN KEY("question_id") REFERENCES "questions"("id");