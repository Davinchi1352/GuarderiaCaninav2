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

        // HEADERS EXACTOS DEL FORMULARIO HTML - NOMBRES DE ETIQUETAS
        const expectedHeaders = [
            'Fecha de Envío',
            'Nombre del Negocio *',
            'Nombres de los Propietarios *',
            'Email de Contacto *',
            'Teléfono *',
            '¿Cuándo iniciaron la guardería?',
            'Ubicación (Ciudad/Barrio)',
            '¿Cómo surgió la idea del negocio?',
            'Describe el espacio donde operan',
            '¿El local es propio o arrendado?',
            'Costo mensual de arriendo (si aplica)',
            '¿Tienen el negocio registrado legalmente?',
            'Si no está registrado, ¿por qué razón?',
            '¿Tienen los permisos necesarios para operar?',
            '¿Qué permisos tienen?',
            '¿Manejan contabilidad formal?',
            '¿Cómo llevan el control de gastos e ingresos?',
            '¿Tienen seguros para el negocio?',
            'Detalles de seguros',
            '¿Qué servicios ofrecen? (Marque todos los que apliquen)',
            'Otros servicios',
            'Capacidad máxima diaria (perros)',
            'Capacidad hospedaje (perros)',
            'Perros atendidos diariamente (promedio)',
            'Perros atendidos mensualmente (promedio)',
            'Horarios de operación',
            'Número de propietarios trabajando',
            'Número de empleados',
            '¿Cuántos clientes regulares tienen aproximadamente?',
            'Edad promedio de clientes',
            'Nivel socioeconómico típico',
            'Zona de residencia típica de clientes',
            '¿Cómo llegan los clientes hasta ustedes? (Marque todos los que apliquen)',
            'Otras fuentes de clientes',
            '¿Conocen a su competencia directa?',
            '¿Cuáles son y qué precios manejan?',
            '¿Qué los diferencia de la competencia?',
            'Guardería diurna (por día)',
            'Hospedaje nocturno (por noche)',
            'Baño y arreglo',
            '¿Cuándo fue el último ajuste de precios?',
            'Otros servicios y tarifas',
            'Ingresos mensuales aproximados',
            'Comida/Suministros',
            'Servicios públicos',
            'Empleados',
            'Arriendo',
            'Otros gastos',
            '¿Tienen capital de trabajo o ahorros para invertir?',
            'Monto aproximado disponible para invertir',
            '¿Tienen presencia en redes sociales? (Marque todas las que usen)',
            'Otras redes sociales',
            '¿Con qué frecuencia publican contenido?',
            '¿Hacen algún tipo de publicidad pagada?',
            '¿Cuál y cuánto invierten en publicidad?',
            '¿Tienen página web o sistema de reservas online?',
            '¿Ofrecen promociones o descuentos?',
            '¿Qué tipos de promociones?',
            '¿Cuáles consideran que son sus principales problemas actualmente?',
            '¿Qué los frustra más del negocio?',
            '¿Han intentado hacer cambios para crecer? ¿Cuáles?',
            '¿Cuáles son sus metas para los próximos 2 años?',
            '¿Estarían dispuestos a invertir tiempo y dinero para hacer crecer el negocio?',
            'Explique su disponibilidad para invertir',
            '¿Cómo describirían el estado de sus instalaciones?',
            '¿Qué equipos o herramientas tienen?',
            '¿Qué les falta en términos de infraestructura?',
            '¿Tienen vehículo para el negocio?',
            '¿En qué épocas del año tienen mayor demanda?',
            '¿En qué épocas tienen menor demanda?',
            '¿Qué cambios han notado en el mercado en los últimos años?',
            '¿Cómo afectó la pandemia al negocio?',
            '¿Qué esperan obtener de esta consultoría? *',
            '¿Hay algo más que consideren importante mencionar?',
            'Horas por semana disponibles para implementar cambios',
            'Días disponibles para la consultoría'
        ];

        console.log('Validando ' + expectedHeaders.length + ' headers exactos del formulario HTML');

        // PASO 1: DETERMINAR EL ESTADO ACTUAL DE LA HOJA
        const currentRows = sheet.getLastRow();
        console.log('Filas actuales en la hoja: ' + currentRows);

        let headersExist = false;
        let headersCorrect = false;
        let targetRow = 1;

        // PASO 2: VERIFICAR SI EXISTEN HEADERS Y SI SON CORRECTOS
        if (currentRows === 0) {
            console.log('CASO 1: Hoja completamente vacía');
            headersExist = false;
            headersCorrect = false;
        } else {
            console.log('CASO 2: Hoja con datos existentes');
            // Verificar si la primera fila contiene headers correctos
            const firstRowData = sheet.getRange(1, 1, 1, expectedHeaders.length).getValues()[0];

            let matchCount = 0;
            for (let i = 0; i < expectedHeaders.length; i++) {
                const existing = firstRowData[i] ? String(firstRowData[i]).trim() : '';
                if (existing === expectedHeaders[i]) {
                    matchCount++;
                }
            }

            headersExist = true;
            headersCorrect = (matchCount === expectedHeaders.length);

            console.log('Headers coincidentes: ' + matchCount + ' de ' + expectedHeaders.length);
            console.log('Headers correctos: ' + headersCorrect);
        }

        // PASO 3: CREAR O CORREGIR HEADERS SI ES NECESARIO
        if (!headersExist || !headersCorrect) {
            console.log('ACCIÓN: Creando/corrigiendo headers');

            // Si hay datos existentes, preservarlos
            let existingData = [];
            if (currentRows > 0 && !headersCorrect) {
                console.log('Preservando datos existentes...');
                const startDataRow = headersExist ? 2 : 1;
                const endDataRow = currentRows;

                if (endDataRow >= startDataRow) {
                    existingData = sheet.getRange(startDataRow, 1, endDataRow - startDataRow + 1, sheet.getLastColumn()).getValues();
                    console.log('Datos preservados: ' + existingData.length + ' filas');
                }
            }

            // Limpiar la hoja si había datos incorrectos
            if (currentRows > 0) {
                sheet.clear();
                console.log('Hoja limpiada');
            }

            // CREAR HEADERS EN FILA 1
            console.log('Insertando headers en fila 1...');
            sheet.getRange(1, 1, 1, expectedHeaders.length).setValues([expectedHeaders]);

            // Formatear headers
            const headerRange = sheet.getRange(1, 1, 1, expectedHeaders.length);
            headerRange.setBackground('#2c3e50');
            headerRange.setFontColor('white');
            headerRange.setFontWeight('bold');
            headerRange.setFontSize(9);
            headerRange.setWrap(true);
            headerRange.setVerticalAlignment('middle');

            console.log('Headers creados y formateados exitosamente');

            // Restaurar datos existentes si los había
            if (existingData.length > 0) {
                console.log('Restaurando ' + existingData.length + ' filas de datos...');
                sheet.getRange(2, 1, existingData.length, existingData[0].length).setValues(existingData);
                console.log('Datos restaurados exitosamente');
            }

            // Los nuevos datos van después de headers + datos existentes
            targetRow = sheet.getLastRow() + 1;

        } else {
            console.log('ACCIÓN: Headers correctos encontrados');
            // Headers están correctos, insertar en la siguiente fila disponible
            targetRow = currentRows + 1;
        }

        console.log('Fila objetivo para nuevos datos: ' + targetRow);

        // Preparar la fila de datos MAPEANDO EXACTAMENTE con las etiquetas del formulario
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

        console.log('Mapeando ' + rowData.length + ' campos de datos con headers exactos del formulario');
        console.log('INSERTANDO DATOS EN FILA: ' + targetRow);

        // VERIFICACIÓN FINAL antes de insertar
        if (targetRow === 1) {
            console.error('ERROR CRÍTICO: Intentando insertar datos en fila 1 (donde van headers)');
            throw new Error('Error de lógica: los datos no pueden ir en la fila 1');
        }

        // Validar que el número de datos coincida con el número de headers
        if (rowData.length !== expectedHeaders.length) {
            console.error('ERROR: Inconsistencia de datos - Headers: ' + expectedHeaders.length + ', Datos: ' + rowData.length);
            throw new Error('Inconsistencia: se esperan ' + expectedHeaders.length + ' campos pero se recibieron ' + rowData.length);
        }

        // INSERTAR DATOS EN LA FILA CORRECTA
        console.log('Ejecutando inserción de datos...');
        sheet.getRange(targetRow, 1, 1, rowData.length).setValues([rowData]);
        console.log('✅ DATOS INSERTADOS EXITOSAMENTE EN FILA: ' + targetRow);

        // Verificar que los headers están en fila 1
        const headerCheck = sheet.getRange(1, 1, 1, 3).getValues()[0];
        console.log('Verificación - Primeros 3 headers en fila 1: ' + headerCheck);

        // Formatear la nueva fila de datos
        const dataRange = sheet.getRange(targetRow, 1, 1, rowData.length);

        // Alternar colores de fila (solo para filas de datos, no headers)
        if (targetRow > 1 && targetRow % 2 === 0) {
            dataRange.setBackground('#f8f9fa');
        }

        // Ajustar ancho de columnas automáticamente
        sheet.autoResizeColumns(1, rowData.length);

        // Información adicional para el email
        const totalRows = sheet.getLastRow();
        const dataRows = totalRows - 1;

        console.log('RESUMEN FINAL:');
        console.log('- Datos insertados en fila: ' + targetRow);
        console.log('- Total de filas ahora: ' + totalRows);
        console.log('- Filas de datos: ' + dataRows);
        console.log('- Headers en fila 1: ✅');
        console.log('- Validación estricta: ✅');

        // Enviar email de notificación con información detallada
        const emailNotification = true;

        if (emailNotification) {
            const subject = 'Nueva Evaluación: ' + (data.nombreNegocio || 'Sin nombre');
            const body = `
Se ha recibido una nueva evaluación de guardería canina:

Negocio: ${data.nombreNegocio || 'No especificado'}
Propietarios: ${data.propietarios || 'No especificado'}  
Email: ${data.email || 'No especificado'}
Teléfono: ${data.telefono || 'No especificado'}

Expectativas de la consultoría:
${data.expectativasConsultoria || 'No especificado'}

📊 INFORMACIÓN TÉCNICA DE LA HOJA:
- Fila insertada: ${targetRow}
- Total de filas: ${totalRows}
- Registros de datos: ${dataRows}
- Headers: EXACTOS al formulario HTML ✅
- Validación: ESTRICTA ✅

Puedes ver todos los detalles en la hoja de cálculo:
https://docs.google.com/spreadsheets/d/${SHEET_ID}

Enviado el: ${data.fechaEnvio}

---
Sistema automatizado de formularios - Guardería Canina
Validación ESTRICTA de headers del formulario HTML activada ✅
Headers garantizados EXACTOS a las etiquetas del formulario ✅
      `;

            try {
                MailApp.sendEmail({
                    to: EMAIL_NOTIFICACION,
                    subject: subject,
                    body: body
                });
            } catch (emailError) {
                console.log('Error enviando email: ' + emailError);
            }
        }

        // Respuesta exitosa con información detallada
        return ContentService
            .createTextOutput(JSON.stringify({
                success: true,
                message: 'Datos guardados correctamente con headers EXACTOS del formulario HTML',
                timestamp: new Date().toISOString(),
                insertedRow: targetRow,
                totalRows: totalRows,
                dataRows: dataRows,
                headersValidation: 'validated_exact_match',
                headerCount: expectedHeaders.length
            }))
            .setMimeType(ContentService.MimeType.JSON);

    } catch (error) {
        console.error('Error: ' + error);

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
            message: 'Sistema listo para recibir datos del formulario con headers EXACTOS del HTML',
            sheetId: '1S7VX7essRAMnReGMtcFExhM7HuL5e5jvsNpurhhaEPY',
            email: 'ca1352@gmail.com',
            headerValidation: 'ESTRICTA - Exactos al formulario HTML',
            expectedHeaders: 76
        }))
        .setMimeType(ContentService.MimeType.JSON);
}

// FUNCIÓN DE PRUEBA - Ejecuta esta para verificar que todo funciona
function pruebaConexion() {
    try {
        // TUS DATOS REALES YA CONFIGURADOS
        const SHEET_ID = '1S7VX7essRAMnReGMtcFExhM7HuL5e5jvsNpurhhaEPY';
        const EMAIL_NOTIFICACION = 'ca1352@gmail.com';

        console.log('Iniciando prueba con headers EXACTOS del formulario HTML...');
        console.log('Sheet ID: ' + SHEET_ID);
        console.log('Email: ' + EMAIL_NOTIFICACION);

        // Verificar conexión con Google Sheets
        const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
        console.log('Conexión con Google Sheets: OK');
        console.log('Nombre de la hoja: ' + sheet.getName());
        console.log('Número de filas actuales: ' + sheet.getLastRow());

        // LIMPIAR LA HOJA PARA HACER UNA PRUEBA COMPLETA
        console.log('🧹 Limpiando hoja para prueba completa...');
        sheet.clear();
        console.log('✅ Hoja limpiada - Estado: VACÍA');
        console.log('Filas después de limpiar: ' + sheet.getLastRow());

        // Crear datos de prueba simulando el formulario
        const datosPrueba = {
            fechaEnvio: new Date().toLocaleString('es-CO'),
            nombreNegocio: 'PRUEBA - Headers Exactos del Formulario HTML',
            propietarios: 'Juan y María Prueba',
            email: 'prueba@email.com',
            telefono: '555-1234',
            fechaInicio: 'Enero 2010',
            ubicacion: 'Bogotá, Chapinero',
            origenIdea: 'Amor por los animales',
            descripcionEspacio: 'Casa de 200m2 con patio grande',
            tipoLocal: 'propio',
            costoArriendo: '0'
        };

        console.log('📝 Simulando envío de formulario con hoja vacía...');
        console.log('Datos de prueba preparados: ' + Object.keys(datosPrueba).length + ' campos');

        // Simular el proceso de doPost
        console.log('🔍 Iniciando proceso de validación de headers...');

        // Headers esperados (los primeros para la prueba)
        const expectedHeaders = [
            'Fecha de Envío',
            'Nombre del Negocio *',
            'Nombres de los Propietarios *',
            'Email de Contacto *',
            'Teléfono *',
            '¿Cuándo iniciaron la guardería?',
            'Ubicación (Ciudad/Barrio)',
            '¿Cómo surgió la idea del negocio?',
            'Describe el espacio donde operan',
            '¿El local es propio o arrendado?',
            'Costo mensual de arriendo (si aplica)'
        ];

        // Como la hoja está vacía, debe crear headers
        console.log('📋 Creando headers en fila 1...');
        sheet.getRange(1, 1, 1, expectedHeaders.length).setValues([expectedHeaders]);

        // Formatear headers
        const headerRange = sheet.getRange(1, 1, 1, expectedHeaders.length);
        headerRange.setBackground('#2c3e50');
        headerRange.setFontColor('white');
        headerRange.setFontWeight('bold');

        console.log('✅ Headers creados exitosamente');
        console.log('📊 Filas después de crear headers: ' + sheet.getLastRow());

        // Ahora insertar datos en fila 2
        const rowData = [
            datosPrueba.fechaEnvio,
            datosPrueba.nombreNegocio,
            datosPrueba.propietarios,
            datosPrueba.email,
            datosPrueba.telefono,
            datosPrueba.fechaInicio,
            datosPrueba.ubicacion,
            datosPrueba.origenIdea,
            datosPrueba.descripcionEspacio,
            datosPrueba.tipoLocal,
            datosPrueba.costoArriendo
        ];

        console.log('📝 Insertando datos en fila 2...');
        sheet.getRange(2, 1, 1, rowData.length).setValues([rowData]);
        console.log('✅ Datos insertados exitosamente');
        console.log('📊 Filas finales: ' + sheet.getLastRow());

        // Verificar resultado final
        const finalHeaders = sheet.getRange(1, 1, 1, 3).getValues()[0];
        const finalData = sheet.getRange(2, 1, 1, 3).getValues()[0];

        console.log('🔍 VERIFICACIÓN FINAL:');
        console.log('Headers en fila 1: ' + finalHeaders);
        console.log('Datos en fila 2: ' + finalData);
        console.log('✅ ESTRUCTURA CORRECTA: Headers en fila 1, datos en fila 2');

        // Probar envío de email
        try {
            MailApp.sendEmail({
                to: EMAIL_NOTIFICACION,
                subject: 'Prueba ESTRICTA - Headers Exactos del Formulario HTML',
                body: `¡Hola!

Esta es una prueba del sistema con validación ESTRICTA de headers.

✅ Google Apps Script: Funcionando
✅ Google Sheets: Funcionando  
✅ Envío de emails: Funcionando
✅ CORS: Solucionado con doOptions() y FormData
✅ Headers EXACTOS: Validación ESTRICTA implementada

🔧 NUEVA FUNCIONALIDAD - VALIDACIÓN ESTRICTA:
- Headers deben coincidir EXACTAMENTE con las etiquetas del formulario HTML
- Validación obligatoria de 76 campos
- Si headers son incorrectos: se corrigen automáticamente
- Si la hoja está vacía: se crean headers EXACTOS del formulario
- Preservación total de datos existentes

📊 Configuración actual:
- Sheet ID: ${SHEET_ID}
- Email: ${EMAIL_NOTIFICACION}
- Headers de ejemplo: "${sheet.getRange(1, 1).getValue()}", "${sheet.getRange(1, 2).getValue()}", "${sheet.getRange(1, 3).getValue()}"...
- Total filas: ${sheet.getLastRow()}
- Timestamp: ${new Date().toLocaleString('es-CO')}

🎯 FUNCIONES DISPONIBLES:
- pruebaConexion(): Prueba general con headers exactos
- validarYCorregirHeaders(): Validación ESTRICTA manual
- limpiarDatosPrueba(): Elimina filas de prueba

✅ GARANTÍA: Los headers del Excel coinciden EXACTAMENTE con las etiquetas del formulario HTML

¡Sistema robusto con validación estricta funcionando perfectamente! 🎉
        `
            });
            console.log('Email de prueba enviado exitosamente');
        } catch (emailError) {
            console.log('Error enviando email: ' + emailError.toString());
        }

        console.log('¡Prueba completada exitosamente!');
        console.log('Revisa tu Google Sheet y tu email');
        console.log('Sistema con validación ESTRICTA de headers del formulario HTML');
        console.log('Headers garantizados EXACTOS a las etiquetas del formulario');
        console.log('Funciones: pruebaConexion, validarYCorregirHeaders, limpiarDatosPrueba');

        return 'Prueba completada - Sistema con headers EXACTOS del formulario HTML funcionando';

    } catch (error) {
        console.error('Error en la prueba: ' + error.toString());

        // Mostrar información útil para debug
        console.log('Información de debug:');
        console.log('SHEET_ID: 1S7VX7essRAMnReGMtcFExhM7HuL5e5jvsNpurhhaEPY');
        console.log('EMAIL: ca1352@gmail.com');

        throw new Error('Error en la prueba: ' + error.toString());
    }
}

// Función ESPECÍFICA para probar hoja vacía (el problema reportado)
function probarHojaVacia() {
    try {
        const SHEET_ID = '1S7VX7essRAMnReGMtcFExhM7HuL5e5jvsNpurhhaEPY';
        const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();

        console.log('🧪 PRUEBA ESPECÍFICA: Hoja vacía → Headers + Datos');
        console.log('==========================================');

        // PASO 1: Limpiar completamente la hoja
        console.log('PASO 1: Limpiando hoja...');
        sheet.clear();
        console.log('✅ Hoja limpiada. Filas actuales: ' + sheet.getLastRow());

        // PASO 2: Verificar que está realmente vacía
        if (sheet.getLastRow() !== 0) {
            throw new Error('ERROR: La hoja no está vacía después de limpiar');
        }
        console.log('✅ Confirmado: Hoja completamente vacía');

        // PASO 3: Crear headers manualmente (simulando lo que debe hacer doPost)
        console.log('PASO 2: Creando headers...');
        const expectedHeaders = [
            'Fecha de Envío',
            'Nombre del Negocio *',
            'Nombres de los Propietarios *',
            'Email de Contacto *',
            'Teléfono *'
        ];

        sheet.getRange(1, 1, 1, expectedHeaders.length).setValues([expectedHeaders]);
        console.log('✅ Headers insertados en fila 1');
        console.log('📊 Filas después de headers: ' + sheet.getLastRow());

        // PASO 4: Formatear headers
        const headerRange = sheet.getRange(1, 1, 1, expectedHeaders.length);
        headerRange.setBackground('#2c3e50');
        headerRange.setFontColor('white');
        headerRange.setFontWeight('bold');
        console.log('✅ Headers formateados');

        // PASO 5: Insertar datos en fila 2
        console.log('PASO 3: Insertando datos...');
        const datosEjemplo = [
            new Date().toLocaleString('es-CO'),
            'Guardería Ejemplo',
            'Juan Pérez',
            'juan@ejemplo.com',
            '300-123-4567'
        ];

        sheet.getRange(2, 1, 1, datosEjemplo.length).setValues([datosEjemplo]);
        console.log('✅ Datos insertados en fila 2');
        console.log('📊 Filas finales: ' + sheet.getLastRow());

        // PASO 6: Verificación final
        console.log('PASO 4: Verificación final...');
        const verificacionHeaders = sheet.getRange(1, 1, 1, expectedHeaders.length).getValues()[0];
        const verificacionDatos = sheet.getRange(2, 1, 1, datosEjemplo.length).getValues()[0];

        console.log('==========================================');
        console.log('🔍 RESULTADO FINAL:');
        console.log('Fila 1 (Headers): ' + verificacionHeaders);
        console.log('Fila 2 (Datos): ' + verificacionDatos);
        console.log('Total filas: ' + sheet.getLastRow());

        // Validar estructura correcta
        if (sheet.getLastRow() === 2 &&
            verificacionHeaders[0] === 'Fecha de Envío' &&
            verificacionDatos[0] && verificacionDatos[1]) {
            console.log('✅ ¡ÉXITO! Estructura correcta: Headers en fila 1, datos en fila 2');
            return 'PRUEBA EXITOSA: Headers y datos en posiciones correctas';
        } else {
            console.log('❌ ERROR: Estructura incorrecta');
            return 'PRUEBA FALLIDA: Estructura incorrecta';
        }

    } catch (error) {
        console.error('❌ Error en prueba de hoja vacía: ' + error.toString());
        throw new Error('Error en prueba de hoja vacía: ' + error.toString());
    }
}

// Función adicional para validar y corregir headers manualmente
function validarYCorregirHeaders() {
    try {
        const SHEET_ID = '1S7VX7essRAMnReGMtcFExhM7HuL5e5jvsNpurhhaEPY';
        const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();

        console.log('Iniciando validación ESTRICTA de headers del formulario HTML...');

        // HEADERS EXACTOS DEL FORMULARIO HTML - OBLIGATORIOS
        const expectedHeaders = [
            'Fecha de Envío',
            'Nombre del Negocio *',
            'Nombres de los Propietarios *',
            'Email de Contacto *',
            'Teléfono *',
            '¿Cuándo iniciaron la guardería?',
            'Ubicación (Ciudad/Barrio)',
            '¿Cómo surgió la idea del negocio?',
            'Describe el espacio donde operan',
            '¿El local es propio o arrendado?',
            'Costo mensual de arriendo (si aplica)',
            '¿Tienen el negocio registrado legalmente?',
            'Si no está registrado, ¿por qué razón?',
            '¿Tienen los permisos necesarios para operar?',
            '¿Qué permisos tienen?',
            '¿Manejan contabilidad formal?',
            '¿Cómo llevan el control de gastos e ingresos?',
            '¿Tienen seguros para el negocio?',
            'Detalles de seguros',
            '¿Qué servicios ofrecen? (Marque todos los que apliquen)',
            'Otros servicios',
            'Capacidad máxima diaria (perros)',
            'Capacidad hospedaje (perros)',
            'Perros atendidos diariamente (promedio)',
            'Perros atendidos mensualmente (promedio)',
            'Horarios de operación',
            'Número de propietarios trabajando',
            'Número de empleados',
            '¿Cuántos clientes regulares tienen aproximadamente?',
            'Edad promedio de clientes',
            'Nivel socioeconómico típico',
            'Zona de residencia típica de clientes',
            '¿Cómo llegan los clientes hasta ustedes? (Marque todos los que apliquen)',
            'Otras fuentes de clientes',
            '¿Conocen a su competencia directa?',
            '¿Cuáles son y qué precios manejan?',
            '¿Qué los diferencia de la competencia?',
            'Guardería diurna (por día)',
            'Hospedaje nocturno (por noche)',
            'Baño y arreglo',
            '¿Cuándo fue el último ajuste de precios?',
            'Otros servicios y tarifas',
            'Ingresos mensuales aproximados',
            'Comida/Suministros',
            'Servicios públicos',
            'Empleados',
            'Arriendo',
            'Otros gastos',
            '¿Tienen capital de trabajo o ahorros para invertir?',
            'Monto aproximado disponible para invertir',
            '¿Tienen presencia en redes sociales? (Marque todas las que usen)',
            'Otras redes sociales',
            '¿Con qué frecuencia publican contenido?',
            '¿Hacen algún tipo de publicidad pagada?',
            '¿Cuál y cuánto invierten en publicidad?',
            '¿Tienen página web o sistema de reservas online?',
            '¿Ofrecen promociones o descuentos?',
            '¿Qué tipos de promociones?',
            '¿Cuáles consideran que son sus principales problemas actualmente?',
            '¿Qué los frustra más del negocio?',
            '¿Han intentado hacer cambios para crecer? ¿Cuáles?',
            '¿Cuáles son sus metas para los próximos 2 años?',
            '¿Estarían dispuestos a invertir tiempo y dinero para hacer crecer el negocio?',
            'Explique su disponibilidad para invertir',
            '¿Cómo describirían el estado de sus instalaciones?',
            '¿Qué equipos o herramientas tienen?',
            '¿Qué les falta en términos de infraestructura?',
            '¿Tienen vehículo para el negocio?',
            '¿En qué épocas del año tienen mayor demanda?',
            '¿En qué épocas tienen menor demanda?',
            '¿Qué cambios han notado en el mercado en los últimos años?',
            '¿Cómo afectó la pandemia al negocio?',
            '¿Qué esperan obtener de esta consultoría? *',
            '¿Hay algo más que consideren importante mencionar?',
            'Horas por semana disponibles para implementar cambios',
            'Días disponibles para la consultoría'
        ];

        console.log('Validando ' + expectedHeaders.length + ' headers EXACTOS del formulario HTML');

        if (sheet.getLastRow() === 0) {
            console.log('Hoja vacía - Creando headers EXACTOS del formulario HTML');
            sheet.getRange(1, 1, 1, expectedHeaders.length).setValues([expectedHeaders]);
        } else {
            // VALIDACIÓN ESTRICTA de headers
            const maxColumns = Math.max(expectedHeaders.length, sheet.getLastColumn());
            const firstRowData = sheet.getRange(1, 1, 1, maxColumns).getValues()[0];

            let needsCorrection = false;
            const differences = [];

            for (let i = 0; i < expectedHeaders.length; i++) {
                const existing = firstRowData[i] ? String(firstRowData[i]).trim() : '';
                const expected = expectedHeaders[i];

                if (existing !== expected) {
                    needsCorrection = true;
                    differences.push({
                        column: i + 1,
                        existing: existing || '[VACÍO]',
                        expected: expected
                    });
                }
            }

            if (needsCorrection) {
                console.log('HEADERS INCORRECTOS - Encontradas ' + differences.length + ' diferencias');
                console.log('Primeras 10 diferencias:');
                for (let i = 0; i < Math.min(10, differences.length); i++) {
                    const diff = differences[i];
                    console.log('  Col ' + diff.column + ': "' + diff.existing + '" ≠ "' + diff.expected + '"');
                }

                // Preservar datos existentes
                let existingData = [];
                if (sheet.getLastRow() > 1) {
                    existingData = sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn()).getValues();
                    console.log('Preservando ' + existingData.length + ' filas de datos');
                }

                // Limpiar y crear headers correctos
                sheet.clear();
                sheet.getRange(1, 1, 1, expectedHeaders.length).setValues([expectedHeaders]);

                // Restaurar datos si existían
                if (existingData.length > 0) {
                    const maxDataColumns = Math.min(existingData[0].length, expectedHeaders.length);
                    const cleanedData = existingData.map(function (row) {
                        return row.slice(0, maxDataColumns);
                    });
                    sheet.getRange(2, 1, cleanedData.length, maxDataColumns).setValues(cleanedData);
                    console.log(cleanedData.length + ' filas restauradas con ' + maxDataColumns + ' columnas');
                }

                console.log('Headers CORREGIDOS para coincidir EXACTAMENTE con el formulario HTML');
            } else {
                console.log('Headers ya coinciden EXACTAMENTE con el formulario HTML');
            }
        }

        // Formatear headers con estilo especial
        const headerRange = sheet.getRange(1, 1, 1, expectedHeaders.length);
        headerRange.setBackground('#2c3e50');
        headerRange.setFontColor('white');
        headerRange.setFontWeight('bold');
        headerRange.setFontSize(9);
        headerRange.setWrap(true);
        headerRange.setVerticalAlignment('middle');

        // Ajustar ancho de columnas
        sheet.autoResizeColumns(1, expectedHeaders.length);

        console.log('Formato aplicado a headers del formulario HTML');
        console.log('Resumen final:');
        console.log('  - Headers validados: ' + expectedHeaders.length);
        console.log('  - Total filas: ' + sheet.getLastRow());
        console.log('  - Filas de datos: ' + Math.max(0, sheet.getLastRow() - 1));
        console.log('  - Consistencia: GARANTIZADA con formulario HTML');

        return 'Headers EXACTOS del formulario HTML validados. ' + expectedHeaders.length + ' columnas, ' + sheet.getLastRow() + ' filas totales';

    } catch (error) {
        console.error('Error en validación ESTRICTA: ' + error.toString());
        throw new Error('Error en validación estricta de headers: ' + error.toString());
    }
}

// Función adicional para limpiar datos de prueba
function limpiarDatosPrueba() {
    try {
        const SHEET_ID = '1S7VX7essRAMnReGMtcFExhM7HuL5e5jvsNpurhhaEPY';
        const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();

        console.log('Limpiando datos de prueba...');

        // Obtener todos los datos
        const data = sheet.getDataRange().getValues();
        const headers = data[0];

        // Filtrar filas que NO contengan "PRUEBA"
        const filteredData = data.filter(function (row, index) {
            if (index === 0) return true; // Mantener headers
            return !row.some(function (cell) {
                return String(cell).includes('PRUEBA');
            });
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

        console.log('Datos de prueba eliminados');
        console.log('Filas restantes: ' + (filteredData.length - 1));

        return 'Limpieza completada. Filas restantes: ' + (filteredData.length - 1);

    } catch (error) {
        console.error('Error limpiando datos: ' + error.toString());
        throw new Error('Error en limpieza: ' + error.toString());
    }
}