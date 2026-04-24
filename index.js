let clienteWeb = null
const clienteId = "Esp32GR"
clienteWeb = new Paho.MQTT.Client(
    'broker.hivemq.com',
    8884,
    clienteId

)



clienteWeb.connect({
    useSSL: true,
    onSuccess: function() {
        alert('Conexão ok')
    },
    onFailure: function() {
        alert('conexão falhou')

    }

})





function ligarLampadaSala1() {

    document.getElementById("lp-sala").classList.add('acesa')

    const msg = new Paho.MQTT.Message('')
    msg.destinationName = 'senai510/lampada/sala/ligar'
    clienteWeb.send(msg)

}



function desligarLampadaSala1() {

    document.getElementById("lp-sala").classList.remove('acesa')

    const msg = new Paho.MQTT.Message('')
    msg.destinationName = 'senai510/lampada/sala/desligar'
    clienteWeb.send(msg)

}



function ligarLampadaSala2() {

    document.getElementById("lp-cozinha").classList.add('acesa')

    const msg = new Paho.MQTT.Message('')
    msg.destinationName = 'senai510/lampada/cozinha/ligar'
    clienteWeb.send(msg)

}



function desligarLampadaSala2() {

    document.getElementById("lp-cozinha").classList.remove('acesa')

    const msg = new Paho.MQTT.Message('')
    msg.destinationName = 'senai510/lampada/cozinha/desligar'
    clienteWeb.send(msg)

}




function ligarLampadaSala3() {

    document.getElementById("lp-quarto1").classList.add('acesa')

    const msg = new Paho.MQTT.Message('')
    msg.destinationName = 'senai510/lampada/quarto1/ligar'
    clienteWeb.send(msg)

}



function desligarLampadaSala3() {
    document.getElementById("lp-quarto1").classList.remove('acesa')

    const msg = new Paho.MQTT.Message('')
    msg.destinationName = 'senai510/lampada/quarto1/desligar'
    clienteWeb.send(msg)

}


function ligarLampadaSala4() {

    document.getElementById("lp-quarto2").classList.add('acesa')

    const msg = new Paho.MQTT.Message('')
    msg.destinationName = 'senai510/lampada/quarto2/ligar'
    clienteWeb.send(msg)

}



function desligarLampadaSala4() {
    document.getElementById("lp-quarto2").classList.remove('acesa')

    const msg = new Paho.MQTT.Message('')
    msg.destinationName = 'senai510/lampada/quarto2/desligar'
    clienteWeb.send(msg)

}





function ligarTudo() {

    document.getElementById("lp-sala").classList.add('acesa')
    document.getElementById("lp-cozinha").classList.add('acesa')
    document.getElementById("lp-quarto1").classList.add('acesa')
    document.getElementById("lp-quarto2").classList.add('acesa')

  
    const msg = new Paho.MQTT.Message('')
    msg.destinationName = 'senai510/lampada/ligar'
    clienteWeb.send(msg)
}

function desligarTudo() {

    document.getElementById("lp-sala").classList.remove('acesa')
    document.getElementById("lp-cozinha").classList.remove('acesa')
    document.getElementById("lp-quarto1").classList.remove('acesa')
    document.getElementById("lp-quarto2").classList.remove('acesa')

 
    const msg = new Paho.MQTT.Message('')
    msg.destinationName = 'senai510/lampada/desligar'
    clienteWeb.send(msg)
}



let alarmeAtivo = false

function alarmePiscando() {

    if (alarmeAtivo) return
    alarmeAtivo = true

    const lampadas = ["lp-sala", "lp-cozinha", "lp-quarto1", "lp-quarto2"]

    let ligado = false

    const intervalo = setInterval(() => {

        ligado = !ligado

        // Atualiza interface
        lampadas.forEach(id => {
            const el = document.getElementById(id)
            if (el) {
                el.classList.toggle('acesa', ligado)
            }
        })

        // 🔥 ENVIA MQTT
        const msg = new Paho.MQTT.Message('')
        msg.destinationName = ligado 
            ? 'senai510/lampada/ligar'
            : 'senai510/lampada/desligar'

        clienteWeb.send(msg)

    }, 400)

    setTimeout(() => {
        clearInterval(intervalo)
        alarmeAtivo = false

        // Desliga tudo no final
        lampadas.forEach(id => {
            const el = document.getElementById(id)
            if (el) el.classList.remove('acesa')
        })

        // 🔥 garante que ESP32 também desliga
        const msg = new Paho.MQTT.Message('')
        msg.destinationName = 'senai510/lampada/desligar'
        clienteWeb.send(msg)

    }, 5000)
}


document.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", () => {
        if ("vibrate" in navigator) {
            navigator.vibrate(100)
        }
    })
})