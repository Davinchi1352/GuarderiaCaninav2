function doPost(e) {
    try {
        // CONFIGURACIÓN INICIAL - YA CONFIGURADO CON TUS VALORES
        const SHEET_ID = '1S7VX7essRAMnReGMtcFExhM7HuL5e5jvsNpurhhaEPY';
        const EMAIL_NOTIFICACION = 'ca1352@gmail.com';

        // Verificar si hay datos del formulario
        if (!e || !e.postData || !e.postData.contents) {
            throw new Error('No hay datos del formulario. Este script debe ser llamado desde el formulario HTML.');
        }

        // Obtener los datos del formulario
        const data = JSON.parse(e.postData.contents);
        const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();

        // Verificar si es la primera vez y crear headers
        if (sheet.getLastRow() === 0) {
            const headers = [
                'Fecha de Envío',
                'Nombre del Negocio',
                'Propietarios',
                'Email',
                'Teléfono',
                'Fecha Inicio',
                'Ubicación',
                'Origen de la Idea',
                'Descripción del Espacio',
                'Tipo de Local',
                'Costo Arriendo',
                'Registro Legal',
                'Razón No Registro',
                'Permisos',
                'Tipos de Permisos',
                'Contabilidad',
                'Control Financiero',
                'Seguros',
                'Detalles Seguros',
                'Servicios',
                'Otros Servicios',
                'Capacidad Diaria',
                'Capacidad Hospedaje',
                'Promedio Diario',
                'Promedio Mensual',
                'Horarios',
                'Número Propietarios',
                'Número Empleados',
                'Clientes Regulares',
                'Edad Promedio',
                'Nivel Socioeconómico',
                'Zona Residencia',
                'Fuentes de Clientes',
                'Otras Fuentes Clientes',
                'Conoce Competencia',
                'Detalles Competencia',
                'Diferenciación',
                'Tarifa Guardería',
                'Tarifa Hospedaje',
                'Tarifa Baño',
                'Último Ajuste Precios',
                'Otras Tarifas',
                'Ingresos Mensuales',
                'Gasto Comida',
                'Gasto Servicios',
                'Gasto Empleados',
                'Gasto Arriendo',
                'Otros Gastos',
                'Capital de Trabajo',
                'Monto Capital',
                'Redes Sociales Uso',
                'Otras Redes',
                'Frecuencia Publicación',
                'Publicidad Pagada',
                'Detalles Publicidad',
                'Página Web',
                'Promociones',
                'Tipos Promociones',
                'Principales Problemas',
                'Frustraciones',
                'Intentos Cambios',
                'Metas',
                'Dispuesto Invertir',
                'Explica Inversión',
                'Estado Instalaciones',
                'Equipos Herramientas',
                'Falta Infraestructura',
                'Vehículo',
                'Alta Demanda',
                'Baja Demanda',
                'Cambios Mercado',
                'Impacto Pandemia',
                'Expectativas Consultoría',
                'Información Adicional',
                'Horas Disponibles',
                'Días Disponibles'
            ];

            sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

            // Formatear headers
            const headerRange = sheet.getRange(1, 1, 1, headers.length);
            headerRange.setBackground('#2c3e50');
            headerRange.setFontColor('white');
            headerRange.setFontWeight('bold');
        }

        // Preparar la fila de datos
        const rowData = [
            data.fechaEnvio || '',
            data.nombreNegocio || '',
            data.propietarios || '',
            data.email || '',
            data.telefono || '',
            data.fechaInicio || '',
            data.ubicacion || '',
            data.origenIdea || '',
            data.descripcionEspacio || '',
            data.tipoLocal || '',
            data.costoArriendo || '',
            data.registroLegal || '',
            data.razonNoRegistro || '',
            data.permisos || '',
            data.tiposPermisos || '',
            data.contabilidad || '',
            data.controlFinanciero || '',
            data.seguros || '',
            data.detallesSeguros || '',
            data.servicios || '',
            data.otrosServicios || '',
            data.capacidadDiaria || '',
            data.capacidadHospedaje || '',
            data.promedioDiario || '',
            data.promedioMensual || '',
            data.horarios || '',
            data.numeroPropietarios || '',
            data.numeroEmpleados || '',
            data.clientesRegulares || '',
            data.edadPromedio || '',
            data.nivelSocioeconomico || '',
            data.zonaResidencia || '',
            data.fuentesClientes || '',
            data.otrosFuentesClientes || '',
            data.conoceCompetencia || '',
            data.detallesCompetencia || '',
            data.diferenciacion || '',
            data.tarifaGuarderia || '',
            data.tarifaHospedaje || '',
            data.tarifaBano || '',
            data.ultimoAjustePrecios || '',
            data.otrosTarifas || '',
            data.ingresosMensuales || '',
            data.gastoComida || '',
            data.gastoServicios || '',
            data.gastoEmpleados || '',
            data.gastoArriendo || '',
            data.otrosGastos || '',
            data.capitalTrabajo || '',
            data.montoCapital || '',
            data.redesSocialesUso || '',
            data.otrasRedes || '',
            data.frecuenciaPublicacion || '',
            data.publicidadPagada || '',
            data.detallesPublicidad || '',
            data.paginaWeb || '',
            data.promociones || '',
            data.tiposPromociones || '',
            data.principalesProblemas || '',
            data.frustraciones || '',
            data.intentosCambios || '',
            data.metas || '',
            data.dispuestoInvertir || '',
            data.explicaInversion || '',
            data.estadoInstalaciones || '',
            data.equiposHerramientas || '',
            data.faltaInfraestructura || '',
            data.vehiculo || '',
            data.altaDemanda || '',
            data.bajaDemanda || '',
            data.cambiosMercado || '',
            data.impactoPandemia || '',
            data.expectativasConsultoria || '',
            data.informacionAdicional || '',
            data.horasDisponibles || '',
            data.diasDisponibles || ''
        ];

        // Agregar la fila
        sheet.appendRow(rowData);

        // Formatear la nueva fila
        const lastRow = sheet.getLastRow();
        const dataRange = sheet.getRange(lastRow, 1, 1, rowData.length);

        // Alternar colores de fila
        if (lastRow % 2 === 0) {
            dataRange.setBackground('#f8f9fa');
        }

        // Ajustar ancho de columnas automáticamente
        sheet.autoResizeColumns(1, rowData.length);

        // Enviar email de notificación
        const emailNotification = true; // Cambiar a false si no quieres emails

        if (emailNotification) {
            const subject = `Nueva Evaluación: ${data.nombreNegocio || 'Sin nombre'}`;
            const body = `
Se ha recibido una nueva evaluación de guardería canina:

Negocio: ${data.nombreNegocio || 'No especificado'}
Propietarios: ${data.propietarios || 'No especificado'}
Email: ${data.email || 'No especificado'}
Teléfono: ${data.telefono || 'No especificado'}

Expectativas de la consultoría:
${data.expectativasConsultoria || 'No especificado'}

Puedes ver todos los detalles en la hoja de cálculo:
https://docs.google.com/spreadsheets/d/${SHEET_ID}

Enviado el: ${data.fechaEnvio}
      `;

            try {
                MailApp.sendEmail({
                    to: EMAIL_NOTIFICACION,
                    subject: subject,
                    body: body
                });
            } catch (emailError) {
                console.log('Error enviando email:', emailError);
            }
        }

        // Respuesta exitosa (CORS manejado automáticamente por Google Apps Script)
        return ContentService
            .createTextOutput(JSON.stringify({
                success: true,
                message: 'Datos guardados correctamente',
                timestamp: new Date().toISOString()
            }))
            .setMimeType(ContentService.MimeType.JSON);

    } catch (error) {
        console.error('Error:', error);

        // Respuesta de error
        return ContentService
            .createTextOutput(JSON.stringify({
                success: false,
                message: 'Error al procesar los datos: ' + error.toString(),
                timestamp: new Date().toISOString()
            }))
            .setMimeType(ContentService.MimeType.JSON);
    }
}

// Función GET para verificar que el webhook funciona
function doGet(e) {
    return ContentService
        .createTextOutput(JSON.stringify({
            status: 'Webhook funcionando correctamente',
            timestamp: new Date().toISOString(),
            method: 'GET',
            message: 'El sistema está listo para recibir datos del formulario'
        }))
        .setMimeType(ContentService.MimeType.JSON);
}

// FUNCIÓN DE PRUEBA - Ejecuta esta para verificar que todo funciona
function pruebaConexion() {
    try {
        // CONFIGURACIÓN CON TUS VALORES REALES
        const SHEET_ID = '1S7VX7essRAMnReGMtcFExhM7HuL5e5jvsNpurhhaEPY';
        const EMAIL_NOTIFICACION = 'ca1352@gmail.com';

        console.log('🔍 Iniciando prueba de conexión...');

        // Verificar conexión con Google Sheets
        const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
        console.log('✅ Conexión con Google Sheets: OK');
        console.log('📊 Nombre de la hoja:', sheet.getName());
        console.log('📈 Número de filas actuales:', sheet.getLastRow());

        // Agregar fila de prueba
        const datoPrueba = [
            new Date().toLocaleString('es-CO'),
            'PRUEBA - Guardería Test',
            'Juan y María Prueba',
            'prueba@email.com',
            '555-1234',
            '-- ESTO ES UNA PRUEBA DEL SISTEMA --'
        ];

        sheet.appendRow(datoPrueba);
        console.log('✅ Fila de prueba agregada exitosamente');

        // Probar envío de email
        try {
            MailApp.sendEmail({
                to: EMAIL_NOTIFICACION,
                subject: '🧪 Prueba de Sistema - Guardería Canina',
                body: `¡Hola!

Esta es una prueba automatizada del sistema de formularios.

✅ Google Apps Script: Funcionando
✅ Google Sheets: Funcionando  
✅ Envío de emails: Funcionando

El sistema está listo para recibir formularios reales.

Sheet ID: ${SHEET_ID}
Email: ${EMAIL_NOTIFICACION}
Enviado: ${new Date().toLocaleString('es-CO')}

¡Todo funciona correctamente! 🎉
        `
            });
            console.log('✅ Email de prueba enviado exitosamente');
        } catch (emailError) {
            console.log('⚠️ Error enviando email:', emailError.toString());
        }

        console.log('🎉 ¡Prueba completada exitosamente!');
        console.log('📝 Revisa tu Google Sheet y tu email');
        console.log('🚀 El sistema está listo para desplegar');

        return 'Prueba completada exitosamente - Sistema funcionando';

    } catch (error) {
        console.error('❌ Error en la prueba:', error.toString());

        // Mostrar información útil para debug
        console.log('🔍 Información de debug:');
        console.log('SHEET_ID:', '1S7VX7essRAMnReGMtcFExhM7HuL5e5jvsNpurhhaEPY');
        console.log('EMAIL:', 'ca1352@gmail.com');

        throw new Error('Error en la prueba: ' + error.toString());
    }
}

// Función adicional para limpiar datos de prueba (opcional)
function limpiarDatosPrueba() {
    try {
        const SHEET_ID = '1S7VX7essRAMnReGMtcFExhM7HuL5e5jvsNpurhhaEPY';
        const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();

        console.log('🧹 Limpiando datos de prueba...');

        // Obtener todos los datos
        const data = sheet.getDataRange().getValues();
        const headers = data[0];

        // Filtrar filas que NO contengan "PRUEBA"
        const filteredData = data.filter((row, index) => {
            if (index === 0) return true; // Mantener headers
            return !row.some(cell => String(cell).includes('PRUEBA'));
        });

        // Limpiar hoja
        sheet.clear();

        // Volver a escribir datos sin pruebas
        if (filteredData.length > 0) {
            sheet.getRange(1, 1, filteredData.length, filteredData[0].length).setValues(filteredData);

            // Re-formatear headers
            const headerRange = sheet.getRange(1, 1, 1, headers.length);
            headerRange.setBackground('#2c3e50');
            headerRange.setFontColor('white');
            headerRange.setFontWeight('bold');
        }

        console.log('✅ Datos de prueba eliminados');
        console.log(`📊 Filas restantes: ${filteredData.length - 1}`);

        return `Limpieza completada. Filas restantes: ${filteredData.length - 1}`;

    } catch (error) {
        console.error('❌ Error limpiando datos:', error.toString());
        throw new Error('Error en limpieza: ' + error.toString());
    }
}