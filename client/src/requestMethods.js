import axios from "axios";

const BASE_URL = "http://localhost:7000/api/";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MjhhYjg3OWJhN2U1OTlkZTk0ZDg2ZSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcxNzA2NDY3NCwiZXhwIjoxNzE3MzIzODc0fQ.ykxlzeeR7pBB4zTRa-ntQnW8i8uDErhZ66CKMiqWxHQ";


export const publicRequest = axios.create({
    base_url: BASE_URL,
})


export const userRequest = axios.create({
    base_url: BASE_URL,
    header:{token:`Bearer ${TOKEN}`}
});