document.addEventListener('DOMContentLoaded', function() {
    
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    
    // Cuando se intenta enviar el formulario
    form.addEventListener('submit', function(event) {
        // Detenemos el envío automático - como pausar una cinta transportadora para inspeccionar
        event.preventDefault();
        
        // Limpiamos mensajes de error anteriores
        clearErrors();
        
        // Validamos cada campo - como revisar cada casilla de un checklist
        let isValid = true;
        
        // Validar Nombre (campo obligatorio)
        const name = document.getElementById('name');
        if (name.value.trim() === '') {
            showError(name, 'El nombre es obligatorio');
            isValid = false;
        }
        
        // Validar Email (obligatorio y formato correcto)
        const email = document.getElementById('email');
        if (email.value.trim() === '') {
            showError(email, 'El email es obligatorio');
            isValid = false;
        } else if (!isValidEmail(email.value)) {
            showError(email, 'Ingresa un email válido (ejemplo: usuario@correo.com)');
            isValid = false;
        }
        
        // Validar Teléfono (obligatorio)
        const phone = document.getElementById('phone');
        if (phone.value.trim() === '') {
            showError(phone, 'El teléfono es obligatorio');
            isValid = false;
        }
        
        // Validar Asunto (obligatorio)
        const subject = document.getElementById('subject');
        if (subject.value.trim() === '') {
            showError(subject, 'El asunto es obligatorio');
            isValid = false;
        }
        
        // Validar Mensaje (obligatorio y mínimo 10 caracteres)
        const message = document.getElementById('message');
        if (message.value.trim() === '') {
            showError(message, 'El mensaje es obligatorio');
            isValid = false;
        } else if (message.value.trim().length < 10) {
            showError(message, 'El mensaje debe tener al menos 10 caracteres');
            isValid = false;
        }
        
        // Validar Compañía (obligatorio)
        const company = document.getElementById('company');
        if (company.value.trim() === '') {
            showError(company, 'La compañía es obligatoria');
            isValid = false;
        }
        
        // Validar Sitio Web (opcional, pero si hay valor debe ser URL válida)
        const website = document.getElementById('website');
        if (website.value.trim() !== '' && !isValidURL(website.value)) {
            showError(website, 'Ingresa una URL válida (ejemplo: https://www.ejemplo.com)');
            isValid = false;
        }
        
        // Validar Presupuesto (obligatorio y debe ser número positivo)
        const budget = document.getElementById('budget');
        if (budget.value.trim() === '') {
            showError(budget, 'El presupuesto es obligatorio');
            isValid = false;
        } else if (budget.value <= 0) {
            showError(budget, 'El presupuesto debe ser mayor a 0');
            isValid = false;
        }
        
        // Si todo está correcto - como cuando todas las piezas pasan inspección
        if (isValid) {
            // Mostramos mensaje de éxito
            successMessage.style.display = 'block';
            
            // Limpiamos el formulario
            form.reset();
            
            // Ocultamos el mensaje después de 5 segundos
            setTimeout(function() {
                successMessage.style.display = 'none';
            }, 5000);
            
            // Aquí podrías enviar los datos a un servidor
            console.log('Formulario enviado exitosamente');
        } else {
            // Si hay errores, hacemos scroll al primer error
            const firstError = document.querySelector('.error-message');
            if (firstError) {
                firstError.parentElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });
    
    // Función para mostrar mensajes de error - como poner una etiqueta roja en un producto defectuoso
    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        formGroup.appendChild(errorDiv);
        input.classList.add('error');
    }
    
    // Función para limpiar errores previos - como limpiar la mesa antes de la siguiente inspección
    function clearErrors() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(function(error) {
            error.remove();
        });
        
        const errorInputs = document.querySelectorAll('.error');
        errorInputs.forEach(function(input) {
            input.classList.remove('error');
        });
    }
    
    // Función para validar formato de email - como verificar que un código de barras tenga el patrón correcto
    function isValidEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }
    
    // Función para validar formato de URL
    function isValidURL(url) {
        try {
            new URL(url);
            return true;
        } catch (error) {
            return false;
        }
    }
});
