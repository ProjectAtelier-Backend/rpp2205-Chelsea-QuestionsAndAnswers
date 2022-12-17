FROM --platform=linux/amd64 node:18-alpine

RUN npm install --global nodemon

WORKDIR /rpp2205-Chelsea-QuestionsAndAnswers

EXPOSE 3000

COPY package.json /rpp2205-Chelsea-QuestionsAndAnswers/package.json

RUN npm install

COPY . /rpp2205-Chelsea-QuestionsAndAnswers

CMD ["npm", "start"]