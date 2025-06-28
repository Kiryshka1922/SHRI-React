# CSV Analytics 

### Архитектура

``` bash 
Homework
├── node_modules/               # Зависимости проекта
├── public/                     # Статические файлы ( изображения ) 
├── src/                        # Исходный код проекта
│   ├── api/                    # Работа с API и LocalStorage
│   ├── components/             # UI компоненты
│   ├── shared/                 # Общие компоненты и утилиты
│       ├── States/             # Логика стейтов
│   ├── types/                  # Типы данных (TypeScript)
│   ├── App.tsx                 # Главный компонент приложения
│   ├── index.tsx               # Точка входа в приложение
│   └── vite.config.ts          # Конфигурация Vite
├── .gitignore                  # Файлы, игнорируемые системой контроля версий
├── eslint.config.js            # Конфигурация ESLint
├── package.json                # Зависимости и скрипты проекта
├── tsconfig.json               # Конфигурация TypeScript
└── vite.config.ts              # Конфигурация Vite для сборки


```bash
# 1. Клонируйте репозиторий
git clone https://github.com/Kiryshka1922/SHRI-React.git
cd Homework

# 2. Установите зависимости
npm install

# 3. Запустите приложение
npm run dev
