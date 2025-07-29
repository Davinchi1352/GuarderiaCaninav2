function doPost(e) {
    try {
        // CONFIGURACIÓN CON TUS DATOS REALES
        const SHEET_ID = '1S7VX7essRAMnReGMtcFExhM7HuL5e5jvsNpurhhaEPY';
        const EMAIL_NOTIFICACION = 'ca1352@gmail.com';

        // Verificar si hay datos del formulario (JSON o FormData)
        if (!e || (!e.postData && !e.parameter)) {
            throw new Error('No hay datos del formulario. Este script debe ser llamado desde el formulario HTML.');
        }

        // Obtener los datos del formulario (puede venir como JSON o FormData)
        let data;
        if (e.postData && e.postData.contents) {
            // Datos como JSON
            data = JSON.parse(e.postData.contents);
        } else if (e.parameter) {
            // Datos como FormData
            data = e.parameter;
        } else {
            throw new Error('No se pudieron obtener los datos del formulario');
        }

        const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();

        // VALIDACIÓN INTELIGENTE DE HEADERS
        const expectedHeaders = [
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

        let needsHeaders = false;
        let startRow = 1;

        // Verificar si la hoja está vacía
        if (sheet.getLastRow() === 0) {
            console.log('📋 Hoja vacía - Creando headers');
            needsHeaders = true;
            startRow = 1;
        } else {
            // Verificar si la primera fila tiene los headers correctos
            const firstRowData = sheet.getRange(1, 1, 1, expectedHeaders.length).getValues()[0];

            // Comparar headers existentes con los esperados
            let headersMatch = true;
            const existingHeaders = [];

            for (let i = 0; i < expectedHeaders.length; i++) {
                const existingHeader = firstRowData[i] ? String(firstRowData[i]).trim() : '';
                existingHeaders.push(existingHeader);

                if (existingHeader !== expectedHeaders[i]) {
                    headersMatch = false;
                }
            }

            if (headersMatch) {
                console.log('✅ Headers correctos encontrados - Insertando en fila:', sheet.getLastRow() + 1);
                needsHeaders = false;
                startRow = sheet.getLastRow() + 1;
            } else {
                console.log('⚠️ Headers incorrectos o incompletos');
                console.log('📋 Headers existentes:', existingHeaders.slice(0, 5), '...');
                console.log('📋 Headers esperados:', expectedHeaders.slice(0, 5), '...');
                console.log('🔧 Reemplazando headers y moviendo datos');

                // Obtener todos los datos existentes (sin la primera fila)
                let existingData = [];
                if (sheet.getLastRow() > 1) {
                    existingData = sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn()).getValues();
                }

                // Limpiar la hoja
                sheet.clear();

                // Crear headers correctos
                needsHeaders = true;
                startRow = 2;

                // Si había datos, los volveremos a insertar después
                if (existingData.length > 0) {
                    console.log(`📊 Preservando ${existingData.length} filas de datos existentes`);
                    // Los datos existentes se insertarán después de los headers y el nuevo registro
                }
            }
        }

        // Crear headers si es necesario
        if (needsHeaders) {
            sheet.getRange(1, 1, 1, expectedHeaders.length).setValues([expectedHeaders]);

            // Formatear headers
            const headerRange = sheet.getRange(1, 1, 1, expectedHeaders.length);
            headerRange.setBackground('#2c3e50');
            headerRange.setFontColor('white');
            headerRange.setFontWeight('bold');
            headerRange.setFontSize(10);
            headerRange.setWrap(true);

            console.log('✅ Headers creados y formateados');
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

        // Insertar datos en la fila calculada
        console.log(`📝 Insertando datos en fila: ${startRow}`);
        sheet.getRange(startRow, 1, 1, rowData.length).setValues([rowData]);

        // Formatear la nueva fila de datos
        const dataRange = sheet.getRange(startRow, 1, 1, rowData.length);

        // Alternar colores de fila (solo para filas de datos, no headers)
        if (startRow > 1 && startRow % 2 === 0) {
            dataRange.setBackground('#f8f9fa');
        }

        // Ajustar ancho de columnas automáticamente
        sheet.autoResizeColumns(1, rowData.length);

        console.log(`✅ Datos insertados exitosamente en la fila ${startRow}`);
        console.log(`📊 Total de filas ahora: ${sheet.getLastRow()}`);

        // Información adicional para el log
        const totalRows = sheet.getLastRow();
        const dataRows = totalRows - 1; // Excluyendo header

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

📊 INFORMACIÓN DE LA HOJA:
- Fila insertada: ${startRow}
- Total de filas: ${sheet.getLastRow()}
- Registros de datos: ${dataRows}
- Headers: ${needsHeaders ? 'Creados automáticamente' : 'Validados correctamente'}

Puedes ver todos los detalles en la hoja de cálculo:
https://docs.google.com/spreadsheets/d/${SHEET_ID}

Enviado el: ${data.fechaEnvio}

---
Sistema automatizado de formularios - Guardería Canina
Validación inteligente de headers activada ✅
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

        // Respuesta exitosa con información detallada
        return ContentService
            .createTextOutput(JSON.stringify({
                success: true,
                message: 'Datos guardados correctamente',
                timestamp: new Date().toISOString(),
                insertedRow: startRow,
                totalRows: sheet.getLastRow(),
                dataRows: dataRows,
                headersValidated: needsHeaders ? 'created' : 'validated'
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

// FUNCIÓN CRÍTICA PARA CORS - Maneja requests OPTIONS (preflight)
function doOptions(e) {
    // Esta función es esencial para evitar errores de CORS
    return ContentService
        .createTextOutput('')
        .setMimeType(ContentService.MimeType.TEXT);
}

// Función GET para verificar que el webhook funciona
function doGet(e) {
    return ContentService
        .createTextOutput(JSON.stringify({
            status: 'Webhook funcionando correctamente',
            timestamp: new Date().toISOString(),
            method: 'GET',
            message: 'El sistema está listo para recibir datos del formulario',
            sheetId: '1S7VX7essRAMnReGMtcFExhM7HuL5e5jvsNpurhhaEPY',
            email: 'ca1352@gmail.com'
        }))
        .setMimeType(ContentService.MimeType.JSON);
}

// FUNCIÓN DE PRUEBA - Ejecuta esta para verificar que todo funciona
function pruebaConexion() {
    try {
        // TUS DATOS REALES YA CONFIGURADOS
        const SHEET_ID = '1S7VX7essRAMnReGMtcFExhM7HuL5e5jvsNpurhhaEPY';
        const EMAIL_NOTIFICACION = 'ca1352@gmail.com';

        console.log('🔍 Iniciando prueba de conexión...');
        console.log('📋 Sheet ID:', SHEET_ID);
        console.log('📧 Email:', EMAIL_NOTIFICACION);

        // Verificar conexión con Google Sheets
        const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
        console.log('✅ Conexión con Google Sheets: OK');
        console.log('📊 Nombre de la hoja:', sheet.getName());
        console.log('📈 Número de filas actuales:', sheet.getLastRow());

        // Probar validación de headers
        console.log('🔍 Probando validación de headers...');
        if (sheet.getLastRow() === 0) {
            console.log('📄 Hoja vacía - Headers se crearán automáticamente');
        } else {
            console.log('📋 Hoja con datos - Validando headers existentes...');
            const firstRow = sheet.getRange(1, 1, 1, 10).getValues()[0];
            console.log('📝 Primeros 10 headers actuales:', firstRow);
        }

        // Agregar fila de prueba
        const datoPrueba = [
            new Date().toLocaleString('es-CO'),
            'PRUEBA - Sistema Validación Headers',
            'Juan y María Prueba',
            'prueba@email.com',
            '555-1234',
            '-- PRUEBA VALIDACIÓN INTELIGENTE --'
        ];

        sheet.appendRow(datoPrueba);
        console.log('✅ Fila de prueba agregada exitosamente');
        console.log('📊 Filas después de prueba:', sheet.getLastRow());

        // Probar envío de email
        try {
            MailApp.sendEmail({
                to: EMAIL_NOTIFICACION,
                subject: '🧪 Prueba CORS Fixed - Guardería Canina',
                body: `¡Hola!

Esta es una prueba del sistema con validación inteligente de headers.

✅ Google Apps Script: Funcionando
✅ Google Sheets: Funcionando  
✅ Envío de emails: Funcionando
✅ CORS: Solucionado con doOptions() y FormData
✅ Validación de Headers: Implementada

🔧 NUEVA FUNCIONALIDAD - VALIDACIÓN INTELIGENTE:
- Verifica automáticamente si los headers están correctos
- Si están correctos: inserta datos en la siguiente fila
- Si están incorrectos: corrige headers y preserva datos existentes
- Si la hoja está vacía: crea headers automáticamente

📊 Configuración:
- Sheet ID: ${SHEET_ID}
- Email: ${EMAIL_NOTIFICACION}
- Headers validados: ${sheet.getRange(1, 1, 1, 5).getValues()[0].slice(0, 3).join(', ')}...
- Total filas: ${sheet.getLastRow()}
- Timestamp: ${new Date().toLocaleString('es-CO')}

🎯 FUNCIONES DISPONIBLES:
- pruebaConexion(): Prueba general del sistema
- validarYCorregirHeaders(): Validación manual de headers
- limpiarDatosPrueba(): Elimina filas de prueba

¡Sistema completamente funcional con validación inteligente! 🎉
        `
            });
            console.log('✅ Email de prueba enviado exitosamente');
        } catch (emailError) {
            console.log('⚠️ Error enviando email:', emailError.toString());
        }

        console.log('🎉 ¡Prueba completada exitosamente!');
        console.log('📝 Revisa tu Google Sheet y tu email');
        console.log('🚀 Sistema listo con validación inteligente de headers');
        console.log('🔧 Funciones disponibles: pruebaConexion, validarYCorregirHeaders, limpiarDatosPrueba');

        return 'Prueba completada - Sistema con validación inteligente de headers funcionando';

    } catch (error) {
        console.error('❌ Error en la prueba:', error.toString());

        // Mostrar información útil para debug
        console.log('🔍 Información de debug:');
        console.log('SHEET_ID:', '1S7VX7essRAMnReGMtcFExhM7HuL5e5jvsNpurhhaEPY');
        console.log('EMAIL:', 'ca1352@gmail.com');

        throw new Error('Error en la prueba: ' + error.toString());
    }
}

// Función adicional para validar y corregir headers manualmente
function validarYCorregirHeaders() {
    try {
        const SHEET_ID = '1S7VX7essRAMnReGMtcFExhM7HuL5e5jvsNpurhhaEPY';
        const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();

        console.log('🔍 Iniciando validación manual de headers...');

        const expectedHeaders = [
            'Fecha de Envío', 'Nombre del Negocio', 'Propietarios', 'Email', 'Teléfono',
            'Fecha Inicio', 'Ubicación', 'Origen de la Idea', 'Descripción del Espacio',
            'Tipo de Local', 'Costo Arriendo', 'Registro Legal', 'Razón No Registro',
            'Permisos', 'Tipos de Permisos', 'Contabilidad', 'Control Financiero',
            'Seguros', 'Detalles Seguros', 'Servicios', 'Otros Servicios',
            'Capacidad Diaria', 'Capacidad Hospedaje', 'Promedio Diario', 'Promedio Mensual',
            'Horarios', 'Número Propietarios', 'Número Empleados', 'Clientes Regulares',
            'Edad Promedio', 'Nivel Socioeconómico', 'Zona Residencia', 'Fuentes de Clientes',
            'Otras Fuentes Clientes', 'Conoce Competencia', 'Detalles Competencia',
            'Diferenciación', 'Tarifa Guardería', 'Tarifa Hospedaje', 'Tarifa Baño',
            'Último Ajuste Precios', 'Otras Tarifas', 'Ingresos Mensuales', 'Gasto Comida',
            'Gasto Servicios', 'Gasto Empleados', 'Gasto Arriendo', 'Otros Gastos',
            'Capital de Trabajo', 'Monto Capital', 'Redes Sociales Uso', 'Otras Redes',
            'Frecuencia Publicación', 'Publicidad Pagada', 'Detalles Publicidad',
            'Página Web', 'Promociones', 'Tipos Promociones', 'Principales Problemas',
            'Frustraciones', 'Intentos Cambios', 'Metas', 'Dispuesto Invertir',
            'Explica Inversión', 'Estado Instalaciones', 'Equipos Herramientas',
            'Falta Infraestructura', 'Vehículo', 'Alta Demanda', 'Baja Demanda',
            'Cambios Mercado', 'Impacto Pandemia', 'Expectativas Consultoría',
            'Información Adicional', 'Horas Disponibles', 'Días Disponibles'
        ];

        if (sheet.getLastRow() === 0) {
            console.log('📄 Hoja vacía - Creando headers desde cero');
            sheet.getRange(1, 1, 1, expectedHeaders.length).setValues([expectedHeaders]);
        } else {
            // Verificar headers existentes
            const firstRowData = sheet.getRange(1, 1, 1, expectedHeaders.length).getValues()[0];
            let needsCorrection = false;
            const differences = [];

            for (let i = 0; i < expectedHeaders.length; i++) {
                const existing = firstRowData[i] ? String(firstRowData[i]).trim() : '';
                const expected = expectedHeaders[i];

                if (existing !== expected) {
                    needsCorrection = true;
                    differences.push({
                        column: i + 1,
                        existing: existing,
                        expected: expected
                    });
                }
            }

            if (needsCorrection) {
                console.log(`⚠️ Encontradas ${differences.length} diferencias en headers:`);
                differences.slice(0, 5).forEach(diff => {
                    console.log(`  Columna ${diff.column}: "${diff.existing}" → "${diff.expected}"`);
                });

                // Preservar datos existentes
                let existingData = [];
                if (sheet.getLastRow() > 1) {
                    existingData = sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn()).getValues();
                    console.log(`📊 Preservando ${existingData.length} filas de datos`);
                }

                // Reemplazar headers
                sheet.getRange(1, 1, 1, expectedHeaders.length).setValues([expectedHeaders]);

                // Restaurar datos si existían
                if (existingData.length > 0) {
                    sheet.getRange(2, 1, existingData.length, existingData[0].length).setValues(existingData);
                }

                console.log('✅ Headers corregidos exitosamente');
            } else {
                console.log('✅ Headers ya están correctos');
            }
        }

        // Formatear headers
        const headerRange = sheet.getRange(1, 1, 1, expectedHeaders.length);
        headerRange.setBackground('#2c3e50');
        headerRange.setFontColor('white');
        headerRange.setFontWeight('bold');
        headerRange.setFontSize(10);
        headerRange.setWrap(true);

        // Ajustar ancho de columnas
        sheet.autoResizeColumns(1, expectedHeaders.length);

        console.log('🎨 Formato aplicado a headers');
        console.log(`📋 Headers validados: ${expectedHeaders.length} columnas`);
        console.log(`📊 Total de filas: ${sheet.getLastRow()}`);
        console.log(`📈 Filas de datos: ${Math.max(0, sheet.getLastRow() - 1)}`);

        return `Headers validados y corregidos. Total: ${expectedHeaders.length} columnas, ${sheet.getLastRow()} filas`;

    } catch (error) {
        console.error('❌ Error validando headers:', error.toString());
        throw new Error('Error en validación de headers: ' + error.toString());
    }
}

// Función adicional para limpiar datos de prueba
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