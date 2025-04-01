# Personal Budget Manager 📊💰

## Descripción del Proyecto
Este proyecto es una aplicación web de gestión de presupuesto personal que implementa el método de "envelope budgeting" (presupuesto por sobres). Permite a los usuarios crear, editar y eliminar sobres de presupuesto, así como transferir dinero entre ellos.


## ✨ Características
✅ Gestión de Sobres: Crear, ver, editar y eliminar sobres de presupuesto
💸 Transferencias: Mover dinero entre diferentes sobres
🔄 Actualizaciones en Tiempo Real: Interfaz reactiva que muestra cambios inmediatamente
📱 Diseño Responsivo: Interfaz adaptable a diferentes dispositivos
🛡️ Validación de Datos: Previene transferencias inválidas y entradas incorrectas


## 🛠️ Tecnologías Utilizadas

### Frontend:
- React 19
- React Router 7
- Tailwind CSS 4
- Vite 6

### Backend:
- Express.js 5
- Node.js


## 🚀 Instalación y Uso

Clonar el repositorio:

```sh
Run
git clone https://github.com/Junlovin/personal_budget.git
cd personal_budget
```

Instalar dependencias:

```sh
npm install
```

Iniciar el servidor backend:

```sh
node server.js
```

Iniciar el servidor de desarrollo frontend:

```sh
npm run dev
```

Acceder a la aplicación: Abre tu navegador y visita `http://localhost:5173`

## 📋 Estructura del Proyecto

```md
budget_project/
├── src/
│   ├── components/       # Componentes reutilizables
│   ├── pages/            # Páginas principales
│   ├── database/         # Lógica de base de datos
│   ├── routes/           # Rutas de la API
│   ├── App.jsx           # Componente principal
│   ├── main.jsx          # Punto de entrada
│   └── routes.jsx        # Configuración de rutas
├── server.js             # Servidor Express
└── package.json          # Dependencias y scripts
```

## 📝 Funcionalidades Principales

1. Gestión de Sobres de Presupuesto
Crear nuevos sobres con nombre y cantidad
Ver todos los sobres existentes
Editar detalles de sobres existentes
Eliminar sobres que ya no se necesitan
2. Transferencia de Fondos
Transferir dinero entre diferentes sobres
Validación para evitar transferencias con fondos insuficientes
Actualización inmediata de los balances

## 🌟 Proyecto de Codecademy
Este proyecto fue desarrollado como parte del plan de estudios de Codecademy. Si estás interesado en crear tu propia versión, puedes encontrar más información en la plataforma de Codecademy.

## 🤝 Contribuciones
Las contribuciones son bienvenidas. Si deseas mejorar este proyecto:

- Haz un fork del repositorio
- Crea una nueva rama (`git checkout -b feature/amazing-feature`)
- Realiza tus cambios
- Haz commit de tus cambios (`git commit -m 'Add some amazing feature'`)
- Haz push a la rama (`git push origin feature/amazing-feature`)
- Abre un Pull Request


### 👨‍💻 Autor
Desarrollado con ♥️ y ☕ por JunLovin