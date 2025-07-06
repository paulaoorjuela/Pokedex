# 🧩 Pokédex Angular App 

Aplicación desarrollada con **Angular** que consume la [PokéAPI](https://pokeapi.co/) para mostrar una lista de Pokémon con opciones de búsqueda, filtrado por tipo y navegación a detalle de cada Pokémon.

---

## 🚀 Funcionalidades principales

- ✅ Listado de Pokémon con paginación.
- 🔍 Búsqueda por nombre.
- 🧪 Filtro por tipo de Pokémon.
- ℹ️ Vista de detalles con información como altura, peso, tipos y habilidades.
- 🎨 Diseño responsive y limpio.

---

## 📁 Estructura del proyecto

El proyecto está organizado por carpetas de responsabilidad para mantener el código modular y claro:

```bash
src/
├── app/
│   ├── pages/              # Páginas principales
│   │   ├── main-page/      # Página de inicio (lista y filtro de Pokémon)
│   │   └── pokemon-detail/ # Página de detalle por Pokémon
│   ├── components/         # Componentes reutilizables
│   │   ├── navbar/
│   │   └── footer/
│   ├── models/             # Interfaces y modelos de datos
│   │   └── pokemon.model.ts
│   └── services/           # Servicios de consumo de APIs
│       └── pokemon.service.ts
```

---

## 📄 Descripción técnica

### `main-page`
- Es la página principal.
- Muestra una lista de Pokémon con imagen y nombre.
- Permite buscar por nombre y filtrar por tipo usando los datos de la PokéAPI.
- Implementa paginación para navegar entre diferentes grupos de resultados.

### `pokemon-detail`
- Muestra la información detallada de un Pokémon.
- Utiliza el parámetro de la URL (`/pokemon/:name`) para obtener los datos desde la API.

### `pokemon.service.ts`
- Contiene métodos para:
  - Obtener Pokémon por nombre.
  - Obtener Pokémon paginados.
  - Obtener detalles desde una lista de URLs.
  - Obtener todos los tipos existentes.

### `pokemon.model.ts`
- Modelo de datos para los Pokémon que se muestran en la lista.
- Facilita el tipado y control de datos en el código.

---

## ▶️ Cómo ejecutar el proyecto

1. Clona este repositorio:

```bash
git clone https://github.com/paulaoorjuela/Pokedex.git
```

2. Instala las dependencias:

```bash
npm install
```

3. Ejecuta la aplicación en modo desarrollo:

```bash
ng serve
```

Abre tu navegador en [http://localhost:4200](http://localhost:4200).

---

## 🛠️ Tecnologías utilizadas

- Angular  
- TypeScript  
- HTML + CSS  
- PokéAPI  

---

## 📌 Notas adicionales

- El código está comentado en inglés.  
- Se utilizan componentes standalone de Angular.  
- La lógica de negocio está separada en servicios.  
