/**
 * 
 */


(function () {
	
	var page = document.getElementById("page-text-input"),
		inputChannel = page.querySelector("input[name=\"channel\"]"),
		saveButton = page.querySelector(".ui-btn"),
		inputChannelWidget;

	function init() {
		inputChannelWidget = tau.widget.TextInput(inputChannelWidget);
		saveButton.addEventListener("vclick", saveData);
		inputChannel.value = window.sessionStorage.getItem("channel");
		
		var lastChannels = localStorage.getItem("lastChannels"),
			lastChannels = JSON.parse(lastChannels),
			prev = document.getElementById("prev");
			
		
		for (var channel in lastChannels) {
			channelButton = document.createElement("button");
			channelButton.classList.add("ui-btn");
			channelButton.setAttribute("data-channel", lastChannels[channel])
			channelButton.innerHTML = lastChannels[channel];
			prev.appendChild(channelButton);
			channelButton.addEventListener("vclick", openPrevChannel);
		}
	}
	
	
	function openPrevChannel() {
		var channels = localStorage.getItem("lastChannels"),
			channels = JSON.parse(channels),
			channel = this.getAttribute("data-channel");
		
		addToPrevChannel(channel);
		window.sessionStorage.setItem("channel", channel);
		window.open("chat.html", "_self");
	}
	
	
	function addToPrevChannel(channel) {
		
		var lastChannels = localStorage.getItem("lastChannels"),
			lastChannels = JSON.parse(lastChannels);
		
		if (lastChannels && lastChannels.length >= 3) {
			if (lastChannels[0] !== channel) {
				lastChannels.pop();
				lastChannels.unshift(channel);
			}
			
		} else if (lastChannels === null) {
			lastChannels = [channel];
		} else if (lastChannels.length < 3) {
			if (lastChannels[0] !== channel) {
				lastChannels.unshift(channel);
			}
		}
		localStorage.setItem("lastChannels", JSON.stringify(lastChannels));
	}
	

	function saveData() {
		window.sessionStorage.setItem("channel", inputChannel.value);
		addToPrevChannel(inputChannel.value);
		window.open("chat.html", "_self");
	}

	function destroy() {
		inputChannelWidget.destroy();
		saveButton.removeEventListener("vclick", saveData);
	}

	page.addEventListener("pagebeforeshow", init);
	page.addEventListener("pagehide", destroy);
	
}());
