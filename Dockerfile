FROM --platform=linux/amd64 node:18-alpine

WORKDIR /rpp2205-Chelsea-QuestionsAndAnswers

EXPOSE 8001

COPY package.json /rpp2205-Chelsea-QuestionsAndAnswers/package.json

RUN npm install

COPY . /rpp2205-Chelsea-QuestionsAndAnswers

CMD ["npm", "start"]