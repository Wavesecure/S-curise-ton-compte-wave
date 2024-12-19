
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('inscriptionForm');
    const dropZone = document.getElementById('dropZone');
    const photoInput = document.getElementById('photo');
    const previewContainer = document.getElementById('previewContainer');
    const manualButton = document.getElementById('manualButton');
    const submitButton = document.getElementById('submitButton');
    const errorMessage = document.getElementById('errorMessage');

    // Gestion du drag & drop et de la prévisualisation
    dropZone.addEventListener('click', () => photoInput.click());
    
    photoInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                previewContainer.innerHTML = `
                    <img src="${e.target.result}" alt="Preview" class="mx-auto h-32 w-32 object-cover rounded-md">
                `;
            }
            reader.readAsDataURL(file);
        }
    });

    // Gestionnaire pour le bouton d'envoi manuel
    manualButton.addEventListener('click', () => {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        handleManualEmail(name, email);
    });

    // Gestion de la soumission du formulaire
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const photo = photoInput.files[0];

        if (!name || !email || !photo) {
            alert('Veuillez remplir tous les champs et sélectionner une photo');
            return;
        }

        submitButton.disabled = true;
        submitButton.textContent = 'Envoi en cours...';

        try {
            const formData = new FormData();
            formData.append('access_key', '9c8d5df0-f6c4-44a5-b80c-11463131f300');
            formData.append('email', email);
            formData.append('name', name);
            formData.append('photo', photo);

            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (response.ok && data.success) {
                alert('Vos informations ont été envoyées avec succès');
                setTimeout(() => {
                    window.location.href = 'appli.html';
                }, 2000);
            } else {
                throw new Error(data.message || 'Échec de l\'envoi du formulaire');
            }
        } catch (error) {
            console.error('Erreur lors de l\'envoi:', error);
            errorMessage.classList.remove('hidden');
            submitButton.disabled = false;
            submitButton.textContent = 'Envoyer';
            handleManualEmail(name, email);
        }
    });
});