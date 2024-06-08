# Task3_Front

Una API para una base de datos usando Python y Flask.

## Instalación

1. Clona este repositorio:
    bash
    git clone https://github.com/tu-usuario/task3_front.git
    cd task3_front
    
2. Instala las dependencias:
    bash
    pip install -r requirements.txt
    

## Configurar la Base de Datos

1. Asegúrate de tener PostgreSQL instalado.
2. Crea una base de datos llamada nombre_basedatos.
3. Crea la tabla ejecutando este script SQL:

    sql
    CREATE TABLE public.televisores (
        serie varchar NOT NULL,
        marca varchar NULL,
        nombre_cliente varchar NULL,
        apellido_cliente varchar NULL,
        numero_cedula varchar NULL,
        CONSTRAINT televisores_pk PRIMARY KEY (serie)
    );
    

4. Importa los datos desde el archivo televisores.sql:
    bash
    psql -U usuario -d nombre_basedatos -f path/to/televisores.sql
    
    Reemplaza usuario, nombre_basedatos, y path/to/televisores.sql con la información correcta.

## Configurar las Variables de Conexión

1. Crea un archivo config.py en el directorio del proyecto con estas líneas:

    python
    DB_HOST = 'localhost'
    DB_DATABASE = 'nombre_basedatos'
    DB_USER = 'usuario'
    DB_PASSWORD = 'contraseña'
    DB_PORT = 5432
    

2. Asegúrate de que config.py esté en tu .gitignore para que no se suba al repositorio:

    plaintext
    /config.py
    

## Uso

Ejecuta la aplicación Flask con:

```bash
python app.py