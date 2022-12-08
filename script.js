import http from 'k6/http';
import { sleep } from 'k6';
export let options = {
  vus: 1000, //stimulate how many virtual users
  duration: "2m", //how long you want it to run
};

//Below randomize the endpoints
export default function () {
  let random = Math.floor(Math.random() * (1000000 - 1 + 1)) + 1
  //GET Questions
  //http.get(`http://localhost:8080/qa/questions/${random}`);
  //GET Answers
  //http.get(`http://localhost:8080/qa/questions/${random}/answers`)
  //POST Question
  //http.post(`http://localhost:8080/qa/questions?product_id=${random}`)
  //POST Answer
  //http.post(`http://localhost:8080/qa/questions/${random}/answers?question_id=${random}`)
  //PUT question helpful
  //http.put(`http://localhost:8080/qa/questions/${random}/helpful`)
  //PUT question report
  //http.put(`http://localhost:8080/qa/questions/${random}/report`)
  //PUT answer helpful
  //http.put(`http://localhost:8080/qa/answers/${random}/helpful`)
  //PUT answer report
  http.put(`http://localhost:8080/qa/questions/${random}/report`)
}
