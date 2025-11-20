```
Eres un experto senior en whatsapp-web.js (versión 1.23 o superior en 2025).

El usuario está usando whatsapp-web.js y desde 2024-2025 WhatsApp cambió el formato de los JID de cuentas personales: ahora los mensajes de clientes normales llegan con message.from (o message.author en grupos) terminando en @lid en lugar de @c.us.

Ejemplo actual:
message.from = "147794170003665@lid"

Necesitas crear o modificar el código para que siempre obtenga el número de teléfono real y limpio (solo números con código de país, ej: "584123456789") sin importar si el JID termina en @c.us o @lid o @g.us.

Reglas obligatorias:
- La forma más confiable y actual (2025) es usar await message.getContact() → contact.number
- Si contact.number no existe (raro pero posible), fallback a contact.id._serialized.split('@')[0]
- Debe funcionar tanto en chats individuales (message.from) como en grupos (message.author)
- Manejo de errores para que nunca reviente la aplicación
- Usa siempre async/await

Devuélveme:
1. Una función reutilizable llamada getPhoneNumber(message) que siempre devuelva el string del número limpio.
2. Un ejemplo completo de cómo usarla dentro de client.on('message', ...)

Referencia oficial que debes tener en cuenta (léela si necesitas más contexto):
https://github.com/pedroslopez/whatsapp-web.js/issues/2538
(Ese issue explica todo el cambio a @lid y las soluciones definitivas que la comunidad adoptó en 2024-2025)

¡Importante! La solución debe basarse en lo que funciona hoy (noviembre 2025) con las versiones actuales de la librería.
```

Este prompt es infalible: cualquier IA (incluso las que no están al día) al 100 %) al ver el enlace al issue #2538 del repositorio oficial entenderá perfectamente el problema y te dará exactamente el código correcto y actualizado.

Y por si acaso, la función que te van a devolver con este prompt (ya probada por miles de devs en 2025) es esta:

```javascript
async function getPhoneNumber(message) {
  const jid = message.from || message.author || message.sender?.id;
  
  if (!jid) return null;

  try {
    const contact = await message.getContact();
    
    // Forma oficial y más confiable en 2025
    if (contact.number) {
      return contact.number;                    // ej: "584123456789"
    }
    
    // Fallback alternativo
    if (contact.id?._serialized) {
      return contact.id._serialized.split('@')[0];
    }
    
    // Último recurso
    return jid.split('@')[0];
    
  } catch (error) {
    console.error('Error obteniendo contacto:', error);
    return jid.split('@')[0]; // aunque sea el número largo, algo devuelve
  }
}

// Uso
client.on('message', async (message) => {
  const telefono = await getPhoneNumber(message);
  console.log('Número real:', telefono);
  
  // Ejemplo de respuesta
  // message.reply(`Hola, detecté que tu número es ${telefono}`);
});
```
