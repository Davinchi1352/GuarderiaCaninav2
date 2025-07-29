# 📋 Instrucciones Completas - Sistema de Formulario con Google Sheets

## 🎯 Resumen del Sistema
Tendrás un formulario profesional en línea que automáticamente guarda las respuestas en Google Sheets y te envía notificaciones por email.

---

## 📝 PASO 1: Crear Google Sheet

1. **Ir a Google Sheets**
   - Abre [sheets.google.com](https://sheets.google.com)
   - Crea una nueva hoja de cálculo
   - Nómbrala: **"Evaluaciones Guardería Canina"**

2. **Obtener el ID del Sheet**
   - Copia la URL de tu hoja, se ve así:
   ```
   https://docs.google.com/spreadsheets/d/1ABC123def456GHI789jkl/edit#gid=0
   ```
   - El ID es la parte entre `/d/` y `/edit`: `1ABC123def456GHI789jkl`
   - **Guarda este ID, lo necesitarás más adelante**

3. **Configurar permisos (Importante)**
   - Click en "Compartir" (botón azul arriba a la derecha)
   - En "Obtener enlace" → Click en "Cambiar a cualquier usuario con el enlace"
   - Selecciona "Editor" para que el script pueda escribir
   - Copia el enlace para verificar después

---

## ⚡ PASO 2: Configurar Google Apps Script

1. **Crear el Script**
   - Ve a [script.google.com](https://script.google.com)
   - Click en "Nuevo proyecto"
   - Nómbralo: **"Webhook Guardería Canina"**

2. **Configurar el código**
   - Borra todo el código que aparece por defecto
   - Copia y pega el código del **Google Apps Script** que te proporcioné
   - **IMPORTANTE**: Al inicio del código, reemplaza estos valores:
     ```javascript
     const SHEET_ID = 'TU_SHEET_ID_AQUI'; // ← Poner el ID de tu Sheet
     const EMAIL_NOTIFICACION = 'tu-email@gmail.com'; // ← Poner tu email
     ```

3. **Guardar y probar la conexión**
   - Click en "Guardar" (Ctrl+S)
   - En el dropdown donde dice "doPost", selecciona **"pruebaConexion"**
   - Click en "Ejecutar" → Te pedirá permisos
   - Click en "Revisar permisos" → "Permitir"
   - **Si aparece error sobre SHEET_ID**: Es normal, aún no has puesto tu ID
   - **Si dice "Prueba completada exitosamente"**: ¡Todo funciona! 🎉

4. **Desplegar como Web App**
   - Click en "Implementar" → "Nueva implementación"
   - En "Tipo" selecciona "Aplicación web"
   - Configuración:
     - **Descripción**: "Webhook Guardería"
     - **Ejecutar como**: "Yo"
     - **Quién puede acceder**: "Cualquier usuario"
   - Click en "Implementar"
   - **Copia la URL que aparece** (se ve así: `https://script.google.com/macros/s/ABC123.../exec`)

---

## 🌐 PASO 3: Configurar el Formulario HTML

1. **Editar el formulario**
   - En el archivo HTML que te proporcioné
   - Busca la línea:
     ```javascript
     const GOOGLE_SCRIPT_URL = 'TU_URL_DE_GOOGLE_APPS_SCRIPT_AQUI';
     ```
   - Reemplaza `TU_URL_DE_GOOGLE_APPS_SCRIPT_AQUI` con la URL que copiaste del paso anterior

2. **Personalizar (Opcional)**
   - Puedes cambiar colores, textos, o agregar tu logo
   - El formulario ya está responsive y profesional

---

## 🚀 PASO 4: Subir a GitHub Pages

1. **Crear repositorio en GitHub**
   - Ve a [github.com](https://github.com)
   - Click en "New repository"
   - Nombre: `formulario-guarderia-canina`
   - Marcar "Public"
   - Marcar "Add a README file"
   - Click "Create repository"

2. **Subir el archivo HTML**
   - En tu repositorio, click "Add file" → "Create new file"
   - Nombre del archivo: `index.html`
   - Copia y pega todo el código HTML
   - Scroll abajo, escribe en "Commit message": "Agregar formulario inicial"
   - Click "Commit new file"

3. **Activar GitHub Pages**
   - En tu repositorio, ve a "Settings"
   - Scroll hasta "Pages" (en el menú izquierdo)
   - En "Source" selecciona "Deploy from a branch"
   - Branch: "main"
   - Folder: "/ (root)"
   - Click "Save"

4. **Obtener tu URL**
   - Espera 1-2 minutos
   - Tu formulario estará disponible en:
     ```
     https://tu-usuario.github.io/formulario-guarderia-canina/
     ```

---

## ✅ PASO 5: Probar el Sistema

1. **Prueba básica**
   - Ve a tu URL de GitHub Pages
   - Llena algunos campos del formulario
   - Envía una prueba

2. **Verificar que funciona**
   - Revisa tu Google Sheet → Debe aparecer la respuesta
   - Revisa tu email → Debe llegar notificación
   - Si funciona: ¡Listo! 🎉

---

## 🔧 Solución de Problemas Comunes

### ❌ Error "Cannot read properties of undefined (reading 'postData')"
- **Causa**: Estás ejecutando `doPost` manualmente (esto es normal)
- **Solución**: 
  1. Cambia el dropdown a **"pruebaConexion"**
  2. Ejecuta esa función en su lugar
  3. `doPost` solo funciona cuando llaman desde el formulario HTML

### ❌ Error "Failed to fetch"
- **Causa**: URL del Google Apps Script incorrecta
- **Solución**: Verifica que copiaste la URL completa del paso 2.4

### ❌ No llegan los datos a Google Sheets
- **Causa**: Permisos del Sheet o ID incorrecto
- **Solución**: 
  - Verifica el ID del Sheet
  - Asegúrate que el Sheet tiene permisos de "Editor"

### ❌ No llegan emails de notificación
- **Causa**: Email incorrecto en el script
- **Solución**: Verifica la variable `EMAIL_NOTIFICACION` en el Google Apps Script

### ❌ Formulario no se ve bien en móvil
- **Causa**: Caché del navegador
- **Solución**: Borrar caché o probar en navegador privado

---

## 📊 Funcionalidades del Sistema

### ✨ Lo que hace automáticamente:
- ✅ Guarda todas las respuestas en Google Sheets
- ✅ Organiza los datos en columnas ordenadas
- ✅ Envía notificación por email cuando llega una respuesta
- ✅ Funciona en móviles, tablets y computadores
- ✅ Diseño profesional y moderno
- ✅ Validación de campos requeridos
- ✅ Mensajes de confirmación y error

### 📈 Ventajas para tu consultoría:
- **Profesional**: Imagen seria y confiable
- **Organizado**: Todos los datos estructurados
- **Automático**: Sin trabajo manual
- **Accesible**: Funciona 24/7 desde cualquier dispositivo
- **Gratuito**: Sin costos mensuales

---

## 💡 Consejos Adicionales

### 🎨 Personalización
- Puedes cambiar colores editando los valores CSS
- Agregar tu logo reemplazando el emoji 🐕 en los títulos
- Modificar textos para que coincidan con tu marca

### 📧 Email del formulario
- Cuando envíes el link, incluye una nota explicando el propósito
- Sugiere un tiempo estimado (15-20 minutos para completar)
- Menciona que la información es confidencial

### 📱 Compartir el formulario
- El link funciona perfectamente en WhatsApp
- Puedes crear un QR code para el link
- Es compatible con todas las redes sociales

---

## 🆘 Soporte

Si tienes problemas:

1. **Revisa cada paso** cuidadosamente
2. **Verifica las URLs** y IDs copiados
3. **Prueba en navegador privado** para descartar caché
4. **Revisa los permisos** de Google Sheets y Google Apps Script

**¡El sistema está diseñado para ser robusto y profesional!**

---

## 🎯 Resultado Final

Tendrás:
- ✅ Formulario profesional en línea
- ✅ Respuestas organizadas en Google Sheets
- ✅ Notificaciones automáticas por email
- ✅ Sistema 100% gratuito y confiable
- ✅ Perfecto para tu consultoría profesional

**¡Tiempo total de configuración: 15-30 minutos!**