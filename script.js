//Data Storage Section
const weatherData = {
    city: "",
    country: "",
    API_KEY: "da06626c6f1be4e9ba970d4b2656c7b8",
    async getWeather(){
        const response= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.city},${this.country}&units=metric&appid=${this.API_KEY}`);
        const data= await response.json();
        console.log(data);
    }

}

//UI section
const UI = {
    //Selector
    localSelector(){
        const cityElm = document.querySelector('#city')
        const cityInfoElm = document.querySelector('#w-city')
        const iconElm = document.querySelector('#w-icon')
        const temperatureElm = document.querySelector('#w-temp')
        const pressureElm = document.querySelector('#w-pressure')
        const humidityElm = document.querySelector('#w-humidity')
        const feelElm = document.querySelector('#w-feel')
        const formElm = document.querySelector('#form')
        const countryElm = document.querySelector('#country')
        const messageElm = document.querySelector('#messageWrapper')
        return {
            cityInfoElm,
            cityElm,
            countryElm,
            iconElm,
            temperatureElm,
            pressureElm,
            feelElm,
            humidityElm,
            formElm,
            messageElm,
        }
    },

    //hide message
    hideMessage(){
        const msgDiv=document.querySelector("#message");
        setTimeout(()=>{
            msgDiv.remove();
        }, 3000)
    },

    //show message
    showMessage(msg){
       const {messageElm} = this.localSelector();
       const element=`<div class="alert alert-warning" id="message">${msg}</div>`;
       messageElm.insertAdjacentHTML("afterbegin", element);
        //messageElm.textContent=msg;
        this.hideMessage();
    },

    //input validation
    validateInput(country, city){
        if(country===""||city===""){
            this.showMessage("Please provide correct information...");
            return true;
        }
        else{
            return false;
        }
    },

    //Get Input
    getInputValues(){
       const {countryElm, cityElm} = this.localSelector();
       const isInvalid=this.validateInput(countryElm.value, cityElm.value);
       if (isInvalid) return
       //console.log(isInvalid);
       return {
            country: countryElm.value,
            city: cityElm.value,
       }

    },

    //reset input
    resetInputs(){
        const {countryElm, cityElm} = this.localSelector();
        countryElm.value="";
        cityElm.value="";
    },

    //Handle Remote Data
    handleRemoteData(){
        weatherData.getWeather()
    },

    //initialization - add data
    init(){
        const {formElm}=this.localSelector();
        formElm.addEventListener("submit", e=>{
            e.preventDefault();
            //get input values
            const {country, city} = this.getInputValues();
            //setting or sending data to data storage
            weatherData.city=city;
            weatherData.country=country;
            // console.log(country, city);
            //reset input
            this.resetInputs();

            this.handleRemoteData();

            
        })
    }

}
//function call
UI.init();

//LocalStorage Section
const storage = {}

