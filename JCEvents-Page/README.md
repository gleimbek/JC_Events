# JC Events – Sitio Web Oficial

Sitio web para **JC Events**, empresa de organización de eventos: bodas, quinceañeras, graduaciones, baby showers y catering.

## 🚀 Cómo subir a GitHub Pages

### Paso 1: Crear repositorio
```bash
git init
git add .
git commit -m "Initial commit – JC Events website"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/jc-events.git
git push -u origin main
```

### Paso 2: Activar GitHub Pages
1. Ve a tu repositorio en GitHub
2. Click en **Settings** → **Pages**
3. En *Source* selecciona **main** y carpeta **/ (root)**
4. Click **Save**
5. Tu sitio estará en: `https://TU_USUARIO.github.io/jc-events`

## 📁 Estructura del proyecto

```
jc-events/
├── index.html          ← Página principal (todo en una sola página)
├── css/
│   └── style.css       ← Estilos (negro y oro)
├── js/
│   └── main.js         ← Interacciones y animaciones
└── README.md
```

## ✨ Características

- **100% responsivo** – funciona en móviles, tablets y desktop
- **Menú de navegación** con scroll suave y hamburger para móvil
- **Hero slideshow** con 3 imágenes rotativas
- **Sección About** con contador animado de estadísticas
- **5 tarjetas de servicios** (bodas, quinceañeras, graduaciones, baby showers, catering)
- **Galería con filtros** por categoría + lightbox
- **Slider de testimonios**
- **Formulario de contacto** con validación
- **Botón flotante de WhatsApp**
- **Colores** negro & oro (#c9a84c)
- **Fuentes**: Cormorant Garamond + Montserrat

## 🛠️ Personalización futura

- **Cambiar número de WhatsApp**: busca `15551234567` en `index.html` y `main.js`
- **Cambiar email/teléfono**: sección `#contact` en `index.html`
- **Agregar fotos reales**: reemplazar URLs de Unsplash en `index.html`
- **Cambiar colores**: editar variables `--gold` y `--black` en `css/style.css`

## 📸 Imágenes

Las imágenes provienen de [Unsplash](https://unsplash.com) (licencia libre para uso comercial). Para reemplazarlas con fotos propias, sustituye las URLs en `index.html`.
