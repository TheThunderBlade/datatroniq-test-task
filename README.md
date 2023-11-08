## Моя конфігурація:
    1. NodeJS: v18.17.1
    2. Я використовував для фронтенду Vite з міркувань зручності та швидкості

## nvm:
    1. Для контролю версій NodeJS використовува nvm.
    2. Якщо версія NodeJS відрізняється, то можна встановити за допомогою => nvm install 18.17.1
    3. Перейти на версію можна за допомогою команди => nvm use 18.17.1

## Кроки для запуску програми:
    1. .env файл я залишив в репозиторії для зручності(Можливо потірбно буде підправити конфігурацію для БД, якщо вона відрізняється)
    2. Встановити всі пакети для бекенду та фронтенду у відповідних папках => npm install
    3. Створити базу даних під назвою datatroniq-test-task в Postgresql Desktop
    4. Таблиці підтягнуться автоматично з моделей
    5. Запустити фронтенд та бекенд в різних терміналах. Перейти у відповідні папки та виконати => npm run dev

## Технології та фреймворки:
    1. Для фронтенду використосував бібліотеку ReactJS з використанням TypeScript
    2. Сервер написаний на NodeJS+Express з використанням TypeScript
    3. Як стейт менеджер використав Redux Toolkit 
    4. Запроси на сервер виконуються за допомогою бібліотеки axios
    5. Для бекенду були налаштовані Eslint, Husky та Prettier
    6. Для фронтенду був налаштований Eslint 