document.addEventListener('DOMContentLoaded', function(){

    const email = {
        email: '',
        asunto: '',
        mensaje: ''
    }

    // Seleccionar los elementos
    const inputEmail = document.querySelector('#email')
    const inputAsunto = document.querySelector('#asunto')
    const inputMensaje = document.querySelector('#mensaje')
    const form = document.querySelector('#formulario')
    const btnSubmit = document.querySelector('#formulario button[type="submit"]')
    const btnReset = document.querySelector('#formulario button[type="reset"]')
    const spinner = document.querySelector('#spinner')
    const extraEmail = document.querySelector('#cc')
    
    // Asignar eventos
    inputEmail.addEventListener('input', validar)
    inputMensaje.addEventListener('input', validar)
    inputAsunto.addEventListener('input', validar)
    form.addEventListener('submit', enviarEmail)

    btnReset.addEventListener('click', e => {
        e.preventDefault()

        resetForm()
    })

    extraEmail.addEventListener('input', e => {
        if(e.target.value === ''){
            limpiarAlerta(e.target.parentElement)
            return
        }

        if(e.target.id === 'cc' && !validarEmail(e.target.value)){
            mostrarAlerta('El email no es valido', e.target.parentElement)
            return
        }

        limpiarAlerta(e.target.parentElement)
    })

    function enviarEmail(e){
        e.preventDefault()

        spinner.classList.add('flex')
        spinner.classList.remove('hidden')

        setTimeout(() => {
            spinner.classList.remove('flex')
            spinner.classList.add('hidden')

            resetForm()

            // Crear alerta
            const alertaExito = document.createElement('P')
            alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase')
            alertaExito.textContent = 'Mensaje enviado correctamente!'

            form.appendChild(alertaExito)

            setTimeout(() => {
                alertaExito.remove()
            }, 3000)
        }, 3000)
    }

    function validar(e){
        if(e.target.value.trim() === ''){
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement)
            email[e.target.name] = ''
            comprobarEmail()
            return
        }

        if(e.target.id === 'email' && !validarEmail(e.target.value)){
            mostrarAlerta('El email no es valido', e.target.parentElement)
            email[e.target.name] = ''
            comprobarEmail()
            return
        }

        limpiarAlerta(e.target.parentElement)

        // Asignar valores
        email[e.target.name] = e.target.value.trim().toLowerCase()
        
        // Comprobar el objeto
        comprobarEmail()
    }

    function mostrarAlerta(mensaje, referencia){
        limpiarAlerta(referencia)
        
        // Generar alerta en HTML
        const error = document.createElement('P')
        error.textContent = mensaje
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center')

        // Agregar el error al form
        referencia.appendChild(error)
    }

    function limpiarAlerta(referencia){
        // Comprobar si ya existe la alerta
        const alerta = referencia.querySelector('.bg-red-600')
        if(alerta){
            alerta.remove()
        }
    }

    function validarEmail(email){
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ 
        const resultado = regex.test(email)
        return resultado
    }

    function comprobarEmail(){
        if(Object.values(email).includes('')){
            btnSubmit.classList.add('opacity-50')
            btnSubmit.disabled = true
            return
        }
        btnSubmit.classList.remove('opacity-50')
        btnSubmit.disabled = false
    }

    function resetForm(){
        // reiniciar el form
        email.email = ''
        email.asunto = ''
        email.mensaje = ''

        form.reset()
        comprobarEmail()
    }
})
