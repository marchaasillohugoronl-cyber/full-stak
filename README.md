esta es una practica, para usrar next
//para probar el puerto
cd D:\full-hugo\full-stak
///para cosultar el puerto
curl.exe http://localhost:3000/

//para consultar los usuarios

curl.exe -i http://localhost:3000/user
//Consultar usuarios:
curl.exe http://localhost:3000/user
//Consultar el usuario 18:
curl.exe http://localhost:3000/user/18
//Crear usuario:
$json = '{"nombre":"Hugo","apellido":"Machaca","email":"hugo@gmail.com","telefono":"987654321"}'
curl.exe -X POST "http://localhost:3000/user" -H "Content-Type: application/json" -d $json
//Actualizar usuario 18:
$json = '{"nombre":"Hugo","apellido":"Machaca","email":"hugo@gmail.com","telefono":"987654321"}'
curl.exe -X PUT "http://localhost:3000/user/18" -H "Content-Type: application/json" -d $json
//Eliminar usuario 18:
curl.exe -X DELETE "http://localhost:3000/user/18"