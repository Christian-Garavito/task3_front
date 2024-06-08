import psycopg2
from config import *

host = DB_HOST
database = DB_DATABASE
user = DB_USER
password = DB_PASSWORD
port = DB_PORT

def connect():
    return psycopg2.connect(dbname=database, user=user, password=password, host=host, port=port)

def create_televisor(serie, marca, nombre_cliente, apellido_cliente, numero_cedula):
    conn = connect()
    cursor = conn.cursor()
    try:
        sql = "INSERT INTO public.televisores (serie, marca, nombre_cliente, apellido_cliente, numero_cedula) VALUES (%s, %s, %s, %s, %s)"
        cursor.execute(sql, (serie, marca, nombre_cliente, apellido_cliente, numero_cedula))
        conn.commit()
        print("New television record inserted successfully.")
    except psycopg2.Error as e:
        print("Error:", e)
    finally:
        cursor.close()
        conn.close()

def read_televisores():
    conn = connect()
    cursor = conn.cursor()
    try:
        cursor.execute("SELECT * FROM public.televisores")
        rows = cursor.fetchall()
        return rows
    except psycopg2.Error as e:
        print("Error:", e)
    finally:
        cursor.close()
        conn.close()

def find_televisor_by_serie(serie):
    conn = connect()
    cursor = conn.cursor()
    try:
        cursor.execute("SELECT * FROM public.televisores WHERE serie = %s", (serie,))
        result = cursor.fetchone()
        if result:
            return {
            "serie": result[0],
            "marca": result[1],
            "nombre_cliente": result[2],
            "apellido_cliente": result[3],
            "numero_cedula": result[4]
            }
        else:
            print("Television not found.")
    except psycopg2.Error as e:
        print("Error:", e)
    finally:
        cursor.close()
        conn.close()

def update_televisor(serie, marca, nombre_cliente, apellido_cliente, numero_cedula):
    conn = connect()
    cursor = conn.cursor()
    try:
        sql = "UPDATE public.televisores SET marca = %s, nombre_cliente = %s, apellido_cliente = %s, numero_cedula = %s WHERE serie = %s"
        cursor.execute(sql, (marca, nombre_cliente, apellido_cliente, numero_cedula, serie))
        conn.commit()
        print("Television record updated successfully.")
    except psycopg2.Error as e:
        print("Error:", e)
    finally:
        cursor.close()
        conn.close()

def delete_televisor(serie):
    conn = connect()
    cursor = conn.cursor()
    try:
        sql = "DELETE FROM public.televisores WHERE serie = %s"
        cursor.execute(sql, (serie,))
        conn.commit()
        print("Television record deleted successfully.")
    except psycopg2.Error as e:
        print("Error:", e)
    finally:
        cursor.close()
        conn.close()