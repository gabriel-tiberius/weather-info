        const apiKey = "c5d377e01ae6200f5e3a23618f5e2a00"; // Insira aqui a sua Key da API
        const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
        const searchBox = document.querySelector("#navbar-searchbar");
        const searchBtn = document.querySelector("#navbar-searchbar-button");
        const apiMessage = document.querySelector(".api-message");
    
        
        if (!apiKey) {
            apiMessage.textContent = "Por favor, insira uma Key no script.js para realizar a busca.";
            searchBtn.disabled = true;
        }
    
        async function checkWeather(cidade) {
            if (!apiKey) {
                return;
            }
    
            try {
                const response = await fetch(apiURL + cidade + `&appid=${apiKey}`);
                if (!response.ok) throw new Error("Erro ao buscar dados.");
    
                var data = await response.json();
                console.log(data);
    
                document.querySelector(".cidade").innerHTML = data.name;
                document.querySelector(".temperatura").innerHTML = Math.round(data.main.temp) + "ºC";
    
                switch (data.weather[0].main) {
                    case "Clouds":
                        document.querySelector(".condicao-geral").innerHTML = "Nublado";
                        document.querySelector(".background-video source").src = "videos/cloudy-day-1-comp.mp4";
                        break;
                    case "Clear":
                        document.querySelector(".condicao-geral").innerHTML = "Céu Limpo";
                        document.querySelector(".background-video source").src = "videos/sunny-day-2.mp4";
                        break;
                    case "Rain":
                        document.querySelector(".condicao-geral").innerHTML = "Chovendo";
                        document.querySelector(".background-video source").src = "videos/rainy-day-1-comp.mp4";
                        break;
                    case "Drizzle":
                        document.querySelector(".condicao-geral").innerHTML = "Chuviscando";
                        document.querySelector(".background-video source").src = "videos/rainy-day-1-comp.mp4";
                        break;
                    case "Mist":
                        document.querySelector(".condicao-geral").innerHTML = "Névoa";
                        document.querySelector(".background-video source").src = "videos/cloudy-day-1-comp.mp4";
                        break;
                }
                document.querySelector(".background-video").load();
            } catch (error) {
                console.error(error);
                apiMessage.textContent = "Erro ao obter dados da API. Verifique a API Key e tente novamente.";
            }
        }
    
        searchBtn.addEventListener("click", (event) => {
            event.preventDefault();
            checkWeather(searchBox.value);
        });