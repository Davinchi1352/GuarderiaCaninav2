# 🐕 Formulario de Evaluación - Guardería Canina

Un sistema completo de formulario web profesional para evaluar guarderías caninas y generar análisis para consultorías empresariales.

![Formulario](https://img.shields.io/badge/Status-Active-brightgreen)
![Version](https://img.shields.io/badge/Version-1.0-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

## 🎯 Descripción

Este formulario profesional está diseñado para recopilar información detallada sobre guarderías caninas con fines de consultoría empresarial. La información se almacena automáticamente en Google Sheets y envía notificaciones por email.

## ✨ Características

- **📱 Responsive Design**: Funciona perfectamente en móviles, tablets y escritorio
- **🎨 Diseño Profesional**: Interfaz moderna con gradientes y animaciones suaves
- **📊 Integración Automática**: Los datos se guardan automáticamente en Google Sheets
- **📧 Notificaciones**: Envío automático de emails cuando se recibe una respuesta
- **✅ Validación**: Validación en tiempo real de campos requeridos
- **🔒 Seguro**: Manejo seguro de datos y configuración

## 🚀 Demo en Vivo

**Accede al formulario aquí:** [https://tu-usuario.github.io/formulario-guarderia-canina/](https://tu-usuario.github.io/formulario-guarderia-canina/)

## 📋 Secciones del Formulario

El formulario está organizado en 10 secciones principales:

1. **Información General del Negocio**
2. **Situación Legal y Administrativa**
3. **Servicios y Operaciones**
4. **Clientes y Mercado**
5. **Precios y Finanzas**
6. **Marketing y Comunicación**
7. **Desafíos y Oportunidades**
8. **Infraestructura y Recursos**
9. **Estacionalidad y Tendencias**
10. **Expectativas de la Consultoría**

## 🛠️ Tecnologías Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Google Apps Script
- **Base de Datos**: Google Sheets
- **Hosting**: GitHub Pages
- **Notificaciones**: Gmail API (a través de Google Apps Script)

## ⚙️ Configuración

### Prerrequisitos

- Cuenta de Google (para Google Sheets y Apps Script)
- Cuenta de GitHub (para hosting)

### Instalación

1. **Clona este repositorio**
   ```bash
   git clone https://github.com/tu-usuario/formulario-guarderia-canina.git
   cd formulario-guarderia-canina
   ```

2. **Crea tu archivo de configuración**
   ```bash
   cp .env.example .env
   ```

3. **Configura tus variables de entorno en `.env`**
   ```
   GOOGLE_SHEET_ID=tu_sheet_id_aqui
   GOOGLE_SCRIPT_URL=tu_script_url_aqui
   EMAIL_NOTIFICACION=tu-email@gmail.com
   ```

4. **Sigue las instrucciones detalladas** en el archivo `SETUP.md`

## 📁 Estructura del Proyecto

```
formulario-guarderia-canina/
│
├── index.html              # Formulario principal
├── README.md              # Este archivo
├── .gitignore            # Archivos excluidos del repositorio
├── .env.example          # Ejemplo de configuración
└── docs/
    └── SETUP.md          # Instrucciones detalladas de configuración
```

## 🔧 Personalización

### Cambiar Colores y Estilos

Puedes personalizar los colores editando las variables CSS en la sección `<style>`:

```css
/* Colores principales */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
border-color: #3498db;
```

### Agregar Tu Logo

Reemplaza el emoji 🐕 en los títulos de sección con tu logo:

```css
.section-title::before {
    content: url('tu-logo.png');
    /* o content: "🏢"; para otro emoji */
}
```

## 📊 Análisis de Datos

Los datos recopilados incluyen:

- **Información empresarial**: Registro legal, permisos, contabilidad
- **Datos financieros**: Ingresos, gastos, tarifas, rentabilidad
- **Análisis de mercado**: Clientes, competencia, diferenciación
- **Estrategia digital**: Marketing, redes sociales, presencia online
- **Oportunidades de mejora**: Problemas actuales, metas, inversión

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para cambios importantes:

1. Abre un issue para discutir los cambios
2. Fork el proyecto
3. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
4. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
5. Push a la rama (`git push origin feature/AmazingFeature`)
6. Abre un Pull Request

## 📞 Soporte

Si tienes problemas o preguntas:

- 📧 **Email**: [tu-email@dominio.com](mailto:tu-email@dominio.com)
- 💬 **Issues**: [GitHub Issues](https://github.com/tu-usuario/formulario-guarderia-canina/issues)
- 📱 **WhatsApp**: [Tu número](https://wa.me/tu-numero)

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ve el archivo [LICENSE](LICENSE) para más detalles.

## 🙏 Agradecimientos

- **Google Apps Script** por la integración backend
- **GitHub Pages** por el hosting gratuito
- **CSS Grid y Flexbox** por el diseño responsive
- **Comunidad de desarrolladores** por las mejores práticas

## 📈 Versiones

- **v1.0** (2024) - Lanzamiento inicial
  - Formulario completo con 10 secciones
  - Integración con Google Sheets
  - Diseño responsive y profesional
  - Notificaciones por email

## 🔐 Seguridad

- ✅ No se almacenan datos sensibles en el frontend
- ✅ Comunicación segura HTTPS
- ✅ Variables de entorno para configuración sensible
- ✅ Validación de datos en el servidor

---

**Desarrollado con ❤️ para consultorías empresariales especializadas en negocios de servicios para mascotas.**

## 📊 Estadísticas del Proyecto

![GitHub stars](https://img.shields.io/github/stars/tu-usuario/formulario-guarderia-canina?style=social)
![GitHub forks](https://img.shields.io/github/forks/tu-usuario/formulario-guarderia-canina?style=social)
![GitHub issues](https://img.shields.io/github/issues/tu-usuario/formulario-guarderia-canina)
![GitHub last commit](https://img.shields.io/github/last-commit/tu-usuario/formulario-guarderia-canina)

---

> **Nota**: Este formulario está optimizado para negocios de guarderías caninas, pero puede ser fácilmente adaptado para otros tipos de negocios de servicios.