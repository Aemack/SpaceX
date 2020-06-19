function clear_ouput(){
    outputList = document.getElementById("output").querySelectorAll(".output")
    outputList.forEach((elem) => {
        elem.remove();
    })
}

function clear_options() {
    outputList = document.getElementById("subMenu").querySelectorAll(".optionButton")
    outputList.forEach((elem) => {
        elem.remove();
        console.log("hi")
    })
}

function clear_page(){
    clear_options();
    clear_ouput();
}

function capsules_clicked() {
    clear_page();
    get_capsule_data();
}

function rockets_clicked() {
    clear_page();
    get_rocket_data();
}

function latest_launch_clicked(){
    clear_ouput()
    launchData = get_latest_launch_data()
    

}

function upcoming_launch_clicked(){
    clear_ouput()
    get_upcoming_launch_data()
    

}
function past_launch_clicked(){
    clear_ouput();
    get_past_launch_data();

}

function get_capsule_data(){
    fetch(`https://api.spacexdata.com/v4/capsules`)  
    .then(function(resp) { return resp.json() }) // Convert data to json
    .then(function(data) {
        data.forEach(data => {
            display_capsule_data(data);
        })
    })    
    .catch(function() {
        // catch any errors
      });
}

function get_rocket_data(){
    fetch(`https://api.spacexdata.com/v4/rockets`)  
    .then(function(resp) { return resp.json() }) // Convert data to json
    .then(function(data) {
        data.forEach(data => {
            display_rocket_data(data);
        })
    })    
    .catch(function() {
        // catch any errors
      });
}

function get_latest_launch_data(){
    fetch(`https://api.spacexdata.com/v4/launches/latest`)  
    .then(function(resp) { return resp.json() }) // Convert data to json
    .then(function(data) {
    display_launch_data(data)
    })    
    .catch(function() {
        // catch any errors
      });
}

function get_upcoming_launch_data(){
    fetch(`https://api.spacexdata.com/v4/launches/upcoming`)  
    .then(function(resp) { return resp.json() }) // Convert data to json
    .then(function(data) {
    display_launch_data(data[0])
    display_launch_data(data[1])
    
    })    
    .catch(function() {
        // catch any errors
      });
}

function get_past_launch_data(){
    fetch(`https://api.spacexdata.com/v4/launches/past`)  
    .then(function(resp) { return resp.json() }) // Convert data to json
    .then(function(data) {
        data.forEach(data => {
            display_launch_data(data)
        })
    
    })    
    .catch(function() {
        // catch any errors
      });
}

function display_launch_data(data){
    outputElement = document.getElementById("output");
    nameCode=data.name.split(" ").join("_")
    nameCode=nameCode.split("&").join("_")
    nameCode=nameCode.split("-").join("_")
    nameCode=nameCode.split("(").join("_")
    nameCode=nameCode.split(")").join("_")
    console.log(nameCode)

    launchTitle = document.createElement("h4");
    launchTitle.setAttribute("id","launchTitle");
    launchTitle.setAttribute("class","output");
    launchTitle.setAttribute("data-toggle", "collapse")
    launchTitle.setAttribute("data-target", `#${nameCode}`)
    launchTitle.innerHTML = data.name;
    outputElement.appendChild(launchTitle);

    newDiv = document.createElement("div")
    newDiv.setAttribute("class", "collapse")
    newDiv.setAttribute("id",nameCode)
    outputElement.appendChild(newDiv)

    launchDate = document.createElement("h5");
    date = data.date_local.split("T")[0];

    launchDate.innerHTML = date;
    launchDate.setAttribute("class","output")
    launchDate.setAttribute("id","launch_date")

    launchDescription = document.createElement("p");
    launchDescription.setAttribute("id","launch_description");
    launchDescription.setAttribute("class","output") 
    launchDescription.innerHTML = data.details;

    if (data.links.youtube_id){
        launchVideo = document.createElement("iframe")
        launchVideo.setAttribute("src",`https://www.youtube.com/embed/${data.links.youtube_id}`)
        launchVideo.setAttribute("class","output")
        newDiv.appendChild(launchVideo)
    }

    newDiv.appendChild(launchDate);
    newDiv.appendChild(launchDescription);
    }

function display_rocket_data(data){
    
    outputTitle = document.getElementById("output");
    nameCode= data.name.split(" ").join("_")

    nameElement = document.createElement("h3");
    nameElement.setAttribute("id", "rocketTitle")
    nameElement.setAttribute("class", "output")
    nameElement.setAttribute("data-toggle", "collapse")
    nameElement.setAttribute("data-target", `#${nameCode}`)
    nameElement.innerHTML = data.name;
    outputTitle.appendChild(nameElement)

    newDiv = document.createElement("div")
    newDiv.setAttribute("class", "collapse")
    newDiv.setAttribute("id",nameCode)
    outputTitle.appendChild(newDiv)

    

    firstFlightElement =document.createElement("h5");
    firstFlightElement.setAttribute("id","rocketfirstFlight");
    firstFlightElement.setAttribute("class","output");
    firstFlightElement.innerHTML = `First Flight: ${data.first_flight}`;

    descriptionElement = document.createElement("p");
    descriptionElement.setAttribute("id","rocketDescription");
    descriptionElement.setAttribute("class","output");
    descriptionElement.innerHTML = data.description;

    

    console.log(data)
    newDiv.appendChild(firstFlightElement)
    newDiv.appendChild(descriptionElement)

}

function display_capsule_data(data){
    outputList = document.getElementById("output");

    nameElement = document.createElement("h3");
    nameElement.setAttribute("id", "rocketTitle")
    nameElement.setAttribute("class", "output")
    nameElement.innerHTML = "Serial: "+data.serial;

    firstFlightElement =document.createElement("h5");
    firstFlightElement.setAttribute("id","rocketfirstFlight");
    firstFlightElement.setAttribute("class","output");
    firstFlightElement.innerHTML = `Status: ${data.status}`;

    descriptionElement = document.createElement("p");
    descriptionElement.setAttribute("id","rocketDescription");
    descriptionElement.setAttribute("class","output");
    descriptionElement.innerHTML = data.last_update;



    console.log(data)
    outputList.appendChild(nameElement)
    outputList.appendChild(firstFlightElement)
    outputList.appendChild(descriptionElement)


}

function launches_clicked(){
    clear_page()
    subList = document.getElementById("subMenu")

    latestElement = document.createElement("button")
    latestElement.setAttribute("onclick","latest_launch_clicked()")
    latestElement.setAttribute("class","optionButton")
    latestElement.innerHTML = "Latest"

    upcomingElement = document.createElement("button")
    upcomingElement.setAttribute("onclick","upcoming_launch_clicked()")
    upcomingElement.setAttribute("class","optionButton")
    upcomingElement.innerHTML = "Upcoming"

    pastElement = document.createElement("button")
    pastElement.setAttribute("onclick","past_launch_clicked()")
    pastElement.setAttribute("class","optionButton")
    pastElement.innerHTML = "Past Launches"
    
    subList.appendChild(latestElement)
    subList.appendChild(upcomingElement)
    subList.appendChild(pastElement)
}

window.onload = function() {
    outputElement = document.getElementById("output")
    console.log("helo")
    welcome = document.createElement("iframe")
    welcome.setAttribute("src","https://www.youtube.com/embed/mhrkdHshb3E")
    welcome.setAttribute("class","output")
    outputElement.appendChild(welcome);
};