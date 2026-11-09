
const coleccion = document.getElementById('coleccion');
const formulario = document.getElementById('formulario');
const campos = document.getElementById('campos');
const tablaDatos = document.getElementById('tablaDatos');
const cabecera = document.getElementById('cabecera');
const mensaje = document.getElementById('mensaje');
const loginForm = document.getElementById('loginForm');
const loginPanel = document.getElementById('loginPanel');
const loginMessage = document.getElementById('loginMessage');
const appContent = document.getElementById('appContent');
const sessionCountdown = document.getElementById('sessionCountdown');
const tokenKey = 'authToken';
let countdownInterval;

function setAuthenticated(authenticated) {
    loginPanel.hidden = authenticated;
    appContent.hidden = !authenticated;
}

function authHeaders(headers = {}) {
    const token = sessionStorage.getItem(tokenKey);
    return token ? { ...headers, Authorization: `Bearer ${token}` } : headers;
}

function startSessionCountdown(token) {
    clearInterval(countdownInterval);

    try {
        const payloadPart = token.split('.')[1];
        const base64 = payloadPart.replace(/-/g, '+').replace(/_/g, '/');
        const payload = JSON.parse(atob(base64));
        const expiresAt = payload.exp * 1000;

        const updateCountdown = () => {
            const remainingMs = Math.max(0, expiresAt - Date.now());
            sessionCountdown.textContent = `La sesión se cierra en ${(remainingMs / 1000).toFixed(1)} s (${Math.ceil(remainingMs)} ms)`;

            if (remainingMs <= 0) {
                clearInterval(countdownInterval);
                sessionStorage.removeItem(tokenKey);
                setAuthenticated(false);
                navigateToLogin();
                loginMessage.textContent = 'La sesión expiró. Inicia sesión nuevamente.';
                loginMessage.style.color = 'red';
            }
        };

        updateCountdown();
        countdownInterval = setInterval(updateCountdown, 50);
    } catch (error) {
        sessionStorage.removeItem(tokenKey);
        setAuthenticated(false);
    }
}

async function validateToken(token) {
    const response = await fetch('/dashboard/verify', {
        headers: { Authorization: `Bearer ${token}` }
    });
    if (!response.ok) throw new Error('La sesión expiró. Inicia sesión nuevamente.');
}

function navigateToDashboard() {
    if (window.location.pathname !== '/dashboard') {
        window.history.pushState({}, '', '/dashboard');
    }
}

function navigateToLogin() {
    if (window.location.pathname !== '/') {
        window.history.replaceState({}, '', '/');
    }
}

async function syncBrowserRoute() {
    const token = sessionStorage.getItem(tokenKey);

    if (!token) {
        setAuthenticated(false);
        navigateToLogin();
        return;
    }

    try {
        await validateToken(token);
        setAuthenticated(true);
        navigateToDashboard();
        startSessionCountdown(token);
        await cargarDatos();
    } catch (error) {
        clearInterval(countdownInterval);
        sessionStorage.removeItem(tokenKey);
        setAuthenticated(false);
        navigateToLogin();
        loginMessage.textContent = 'La sesión expiró. Inicia sesión nuevamente.';
        loginMessage.style.color = 'red';
    }
}

window.addEventListener('popstate', syncBrowserRoute);

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    loginMessage.textContent = '';
    const credentials = Object.fromEntries(new FormData(loginForm));

    try {
        const response = await fetch('/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || result.mensaje || 'No se pudo iniciar sesión');

        sessionStorage.setItem(tokenKey, result.token);
        await validateToken(result.token);
        setAuthenticated(true);
        navigateToDashboard();
        startSessionCountdown(result.token);
        await cargarDatos();
    } catch (error) {
        sessionStorage.removeItem(tokenKey);
        loginMessage.textContent = error.message;
        loginMessage.style.color = 'red';
        setAuthenticated(false);
    }
});

document.getElementById('logoutButton').addEventListener('click', () => {
    clearInterval(countdownInterval);
    sessionStorage.removeItem(tokenKey);
    setAuthenticated(false);
    navigateToLogin();
});

const configuraciones = {
    estudiantes: {
        titulo: 'estudiante',
        campos: [
            { nombre: 'nombre', tipo: 'text' },
            { nombre: 'apellido', tipo: 'text' },
            { nombre: 'edad', tipo: 'number' },
            { nombre: 'promedio', tipo: 'number', step: 'any' },
            { nombre: 'matriculado', tipo: 'boolean' }
        ]
    },

    productos: {
        titulo: 'producto',
        campos: [
            { nombre: 'nombre', tipo: 'text' },
            { nombre: 'precio', tipo: 'number', step: 'any' },
            { nombre: 'stock', tipo: 'number' },
            { nombre: 'disponible', tipo: 'boolean' }
        ]
    },

    empleados: {
        titulo: 'empleado',
        campos: [
            { nombre: 'nombre', tipo: 'text' },
            { nombre: 'cargo', tipo: 'text' },
            { nombre: 'edad', tipo: 'number' },
            { nombre: 'sueldo', tipo: 'number', step: 'any' },
            { nombre: 'activo', tipo: 'boolean' }
        ]
    },

    cursos: {
        titulo: 'curso',
        campos: [
            { nombre: 'nombre', tipo: 'text' },
            { nombre: 'descripcion', tipo: 'text' },
            { nombre: 'horas', tipo: 'number' },
            { nombre: 'costo', tipo: 'number', step: 'any' },
            { nombre: 'certificado', tipo: 'boolean' }
        ]
    }
};

// Crear los campos del formulario
function mostrarFormulario() {
    const seleccion = coleccion.value;
    const configuracion = configuraciones[seleccion];

    campos.replaceChildren();

    document.getElementById('tituloFormulario').textContent =
        'Registrar ' + configuracion.titulo;

    document.getElementById('tituloTabla').textContent =
        'Lista de ' + seleccion;

    configuracion.campos.forEach(campo => {
        const contenedor = document.createElement('div');
        contenedor.className = 'field';

        const label = document.createElement('label');
        label.textContent = campo.nombre;
        label.htmlFor = campo.nombre;

        let input;

        if (campo.tipo === 'boolean') {
            input = document.createElement('select');

            const opciones = [
                { valor: 'true', texto: 'Sí' },
                { valor: 'false', texto: 'No' }
            ];

            opciones.forEach(opcion => {
                const option = document.createElement('option');
                option.value = opcion.valor;
                option.textContent = opcion.texto;
                input.appendChild(option);
            });

        } else {
            input = document.createElement('input');
            input.type = campo.tipo;

            if (campo.step) {
                input.step = campo.step;
            }

            if (campo.tipo === 'number') {
                input.min = '0';
            }
        }

        input.id = campo.nombre;
        input.name = campo.nombre;
        input.required = true;

        contenedor.appendChild(label);
        contenedor.appendChild(input);
        campos.appendChild(contenedor);
    });
}

// Consultar registros
async function cargarDatos() {
    const seleccion = coleccion.value;
    const configuracion = configuraciones[seleccion];

    try {
        const respuesta = await fetch('/' + seleccion, {
            headers: authHeaders()
        });

        if (!respuesta.ok) {
            throw new Error('No se pudieron consultar los datos');
        }

        const datos = await respuesta.json();

        // Crear encabezados
        cabecera.replaceChildren();

        const filaCabecera = document.createElement('tr');

        configuracion.campos.forEach(campo => {
            const th = document.createElement('th');
            th.textContent = campo.nombre;
            filaCabecera.appendChild(th);
        });

        cabecera.appendChild(filaCabecera);

        // Crear filas
        tablaDatos.replaceChildren();

        if (datos.length === 0) {
            const fila = document.createElement('tr');
            const celda = document.createElement('td');

            celda.colSpan = configuracion.campos.length;
            celda.textContent = 'No hay registros disponibles';

            fila.appendChild(celda);
            tablaDatos.appendChild(fila);
            return;
        }

        datos.forEach(registro => {
            const fila = document.createElement('tr');

            configuracion.campos.forEach(campo => {
                const celda = document.createElement('td');
                let valor = registro[campo.nombre];

                if (valor && typeof valor === 'object' &&
                    valor.$numberDecimal !== undefined) {
                    valor = valor.$numberDecimal;
                }

                if (typeof valor === 'boolean') {
                    valor = valor ? 'Sí' : 'No';
                }

                celda.textContent = valor ?? '';
                fila.appendChild(celda);
            });

            tablaDatos.appendChild(fila);
        });

    } catch (error) {
        mensaje.textContent = error.message;
    }
}

// Guardar registros
formulario.addEventListener('submit', async (evento) => {
    evento.preventDefault();

    const seleccion = coleccion.value;
    const configuracion = configuraciones[seleccion];
    const datos = {};

    configuracion.campos.forEach(campo => {
        const valor = formulario.elements[campo.nombre].value;

        if (campo.tipo === 'number') {
            datos[campo.nombre] = Number(valor);
        } else if (campo.tipo === 'boolean') {
            datos[campo.nombre] = valor === 'true';
        } else {
            datos[campo.nombre] = valor;
        }
    });

    try {
        const respuesta = await fetch('/' + seleccion, {
            method: 'POST',
            headers: authHeaders({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(datos)
        });

        const resultado = await respuesta.json();

        if (!respuesta.ok) {
            throw new Error(resultado.mensaje || 'Error al guardar');
        }

        mensaje.textContent = 'Registro guardado correctamente.';
        mensaje.style.color = 'green';

        formulario.reset();

        await cargarDatos();

    } catch (error) {
        mensaje.textContent = error.message;
        mensaje.style.color = 'red';
    }
});

// Eventos
coleccion.addEventListener('change', () => {
    mostrarFormulario();
    cargarDatos();
});

document.getElementById('btnActualizar').addEventListener('click', cargarDatos);

// Carga inicial
mostrarFormulario();

syncBrowserRoute();
