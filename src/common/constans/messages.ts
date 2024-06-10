export const MESSAGES = {
  CONNECTION_ERROR:
    'Lo sentimos, no se pudo establecer una conexión con la base de datos. Por favor, inténtalo de nuevo más tarde.',

  QUERY_ERROR:
    'Ha ocurrido un error al realizar la consulta. Por favor, verifica los datos ingresados y vuelve a intentarlo.',

  CREATION_ERROR:
    'No se pudo crear el registro. Asegúrate de proporcionar todos los datos requeridos y vuelve a intentarlo.',

  CREATION_MANY_ERROR:
    'Ha ocurrido un error al intentar crear los registros. Asegúrate de proporcionar todos los datos requeridos y vuelve a intentarlo.',

  DUPLICATED_ERROR:
    'Ya existe un registro con los datos proporcionados. Por favor, verifica los datos ingresados y vuelve a intentarlo.',

  READ_ERROR:
    'No se pueden recuperar los datos solicitados en este momento. Por favor, intenta nuevamente más tarde.',

  UPDATE_ERROR:
    'No se pudo actualizar el registro. Verifica los datos ingresados y asegúrate de que el registro exista.',

  DELETION_ERROR:
    'No se pudo eliminar el registro. Asegúrate de proporcionar el ID correcto y vuelve a intentarlo.',

  VALIDATION_ERROR:
    'Los datos proporcionados no son válidos. Por favor, revisa los campos obligatorios y asegúrate de que cumplan con los criterios establecidos.',

  AUTHORIZATION_ERROR:
    'No tienes los permisos necesarios para realizar esta acción. Por favor, contacta al administrador del sistema para obtener acceso.',

  SERVER_ERROR:
    'Ha ocurrido un error en el servidor. Por favor, intenta nuevamente más tarde o comunícate con el soporte técnico.',

  INVALID_CREDENTIALS_ERROR:
    'Usuario o contraseña incorrecta. Por favor, verifica los datos ingresados y vuelve a intentarlo.',

  BULK_WRITE_ERROR:
    'Ha ocurrido un error al intentar realizar la operación de actualización en masa. Por favor, verifica los datos proporcionados y vuelve a intentarlo.',

  USER_NOT_FOUND: 'El usuario no existe o no está activo',

  PASSWORD_CHANGED:
    'La contraseña ya fue cambiada o la contraseña temporal es incorrecta',

  PASSWORD_UPDATED: 'La contraseña ha sido cambiada exitosamente',

  UPDATE_FAILED:
    'La actualización no se pudo realizar. Por favor, verifica los datos proporcionados y vuelve a intentarlo.',

  ELEMENT_NOT_FOUND: (element: string) =>
    `${element} con el ID proporcionado no se encontró. Asegúrate de que el ID sea válido y exista en el sistema.`,

  APPLICATION_ALREADY_ASSOCIATED:
    'La aplicación ya está asociada a una comunidad.',

  INVALID_OR_MISSING_MODULE:
    'Al menos uno de los módulos no es válido o no existe.',

  APP_ID_NOT_FOUND:
    'Al menos uno de los aplicativos no es válido o no existe en el sistema.',

  PROFILE_ID_NOT_FOUND:
    'Al menos uno de los perfiles no es válido o no existe en el sistema.',

  DELETE_USER_OR_PERSON_ERROR:
    'Error al intentar eliminar el usuario o la persona.',
};
