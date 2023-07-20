## Project-B
Это full-stack приложение

## Front
Next.js, redux, redux-toolkit, scss, MUI

## Back
Node.js, express.js, postgreSQL, sequilize

## Start
Запуск клиентской части, из папки `client`: `npm run dev`
Для корректной работы, в файле `.env.local` указать путь до сервера с актуальным портом, например: `NEXT_PUBLIC_API_URL='http://localhost:5000/'` если порт сервера 5000

Запуск серверной части, из папки `server`: `npm run dev`
В проекте используется postgreSQL, для корректной работы, необходимо создать файл `.env` и указать необходимые данные:

`PORT=5000 или ваш порт`
`DB_NAME=example`
`DB_USER=postgres`
`DB_PASSWORD=123456`
`DB_HOST=localhost`
`DB_PORT=5432`
`SECRET_KEY=some_secret_key`

