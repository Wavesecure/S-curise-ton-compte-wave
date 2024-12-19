
function createEmailBody(name, email) {
    return `Salut wave ,

Voici mes informations pour la procédure anti-piratage :
Nom: ${name}
Email: ${email}

Note: Je vais joindre ma photo à cet email.

Cordialement,
${name}`;
}

function handleManualEmail(name, email) {
    if (!name || !email) {
        alert('Veuillez remplir votre nom et email avant d\'envoyer manuellement');
        return;
    }

    const subject = "Informations utilisateur - Photo à joindre";
    const body = createEmailBody(name, email);
    const copyMessage = document.getElementById('copyMessage');

    // Copier dans le presse-papiers
    navigator.clipboard.writeText(body)
        .then(() => {
            copyMessage.classList.remove('hidden');
            setTimeout(() => {
                copyMessage.classList.add('hidden');
            }, 3000);
        })
        .catch(err => {
            console.error('Erreur de copie : ', err);
            alert('Impossible de copier le texte. Veuillez le copier manuellement.');
        });

    // Ouvrir le client email dans un nouvel onglet
    window.open(`mailto:wavesecuriter@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
}

window.handleManualEmail = handleManualEmail;
