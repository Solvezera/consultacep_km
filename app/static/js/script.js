function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";

    // Limpar o conteúdo do resultado específico dentro da aba
    if (tabName === 'cep-form') {
        document.getElementById("result-cep-info").innerHTML = "";
    } else if (tabName === 'km-form') {
        document.getElementById("result-quilometragem-info").innerHTML = "";
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const forms = {
        'cep-form': {
            form: document.getElementById("form-cep"),
            result: document.getElementById("result-cep-info"),
            endpoint: '/cep',
            fields: ['cep', 'logradouro', 'bairro', 'localidade', 'uf']
        },
        'km-form': {
            form: document.getElementById("form-quilometragem"),
            result: document.getElementById("result-quilometragem-info"),
            endpoint: '/quilometragem',
            fields: ['origem', 'destino', 'distance', 'duration']
        }
    };

    Object.values(forms).forEach(({ form, result, endpoint, fields }) => {
        form.addEventListener("submit", function(event) {
            event.preventDefault(); 
            const formData = new FormData(this);
            fetch(endpoint, {
                method: "POST",
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                result.innerHTML = generateHTML(formData, data, fields);
                result.style.display = "block";
            })
            .catch(error => console.error("Erro:", error));
        });
    });

    function generateHTML(formData, data, fields) {
        return fields.map(field => {
            if (field === 'origem') return `<p><strong>Origem:</strong> ${formData.get('origem') || formData.get('logradouro')}</p>`;
            if (field === 'destino') return `<p><strong>Destino:</strong> ${formData.get('destino') || formData.get('logradouro')}</p>`;
            return `<p><strong>${field.charAt(0).toUpperCase() + field.slice(1)}:</strong> ${field === 'distance' || field === 'duration' ? data.rows[0].elements[0][field].text : data[field]}</p>`;
        }).join('');
    }
});
