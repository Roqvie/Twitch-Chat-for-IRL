/**
 * 
 */

var TWITCH_EMOTES = [];
var BTTV_EMOTES = [];
var GLOBAL_BTTV_EMOTES = [];
var FFZ_EMOTES = [];
var user_id;

const MOD_BADGES = [
    "https://static-cdn.jtvnw.net/badges/v1/3267646d-33f0-4b17-b3df-f923a41db1d0/1",
    "https://static-cdn.jtvnw.net/badges/v1/3267646d-33f0-4b17-b3df-f923a41db1d0/2",
    "https://static-cdn.jtvnw.net/badges/v1/3267646d-33f0-4b17-b3df-f923a41db1d0/3"
];

const BROADCASTER_BADGES = [
	"https://static-cdn.jtvnw.net/badges/v1/5527c58c-fb7d-422d-b71b-f309dcb85cc1/1",
	"https://static-cdn.jtvnw.net/badges/v1/5527c58c-fb7d-422d-b71b-f309dcb85cc1/2",
	"https://static-cdn.jtvnw.net/badges/v1/5527c58c-fb7d-422d-b71b-f309dcb85cc1/3"
];

const VERIFIED_BADGES = [
	"https://static-cdn.jtvnw.net/badges/v1/d12a2e27-16f6-41d0-ab77-b780518f00a3/1",
	"https://static-cdn.jtvnw.net/badges/v1/d12a2e27-16f6-41d0-ab77-b780518f00a3/2",
	"https://static-cdn.jtvnw.net/badges/v1/d12a2e27-16f6-41d0-ab77-b780518f00a3/3"
];

const VIP_BADGES = [
 	"https://static-cdn.jtvnw.net/badges/v1/b817aba4-fad8-49e2-b88a-7cc744dfa6ec/1",
 	"https://static-cdn.jtvnw.net/badges/v1/b817aba4-fad8-49e2-b88a-7cc744dfa6ec/2",
 	"https://static-cdn.jtvnw.net/badges/v1/b817aba4-fad8-49e2-b88a-7cc744dfa6ec/3"
 ];

const TURBO_BADGES = [
  	"https://static-cdn.jtvnw.net/badges/v1/bd444ec6-8f34-4bf9-91f4-af1e3428d80f/1",
  	"https://static-cdn.jtvnw.net/badges/v1/bd444ec6-8f34-4bf9-91f4-af1e3428d80f/2",
  	"https://static-cdn.jtvnw.net/badges/v1/bd444ec6-8f34-4bf9-91f4-af1e3428d80f/3"
 ];

const PRIME_BADGES = [
	"https://static-cdn.jtvnw.net/badges/v1/a1dd5073-19c3-4911-8cb4-c464a7bc1510/1",
	"https://static-cdn.jtvnw.net/badges/v1/a1dd5073-19c3-4911-8cb4-c464a7bc1510/2",
	"https://static-cdn.jtvnw.net/badges/v1/a1dd5073-19c3-4911-8cb4-c464a7bc1510/3"
];

const TWITCH_SUBS_BADGES = [];


function getHTMLMessage(message, tags) {
	
	// Getting emotes from message
	getTwitchEmotesFromMessage(tags, message.text);

	//	Render message
	var renderedMessage = _renderMessage(message.text);
	//	Render user
	var renderedUser = _renderUser(tags);
	
	return renderedUser + ": " + renderedMessage;
	
}


function _renderUser(tags) {
	//	Function for generating HTML for user with information about him:
	//	Chat nickname color
	//	Mod, VIP, Prime, Sub and etc badges
	
	
	var username = tags['display-name'],
		color = tags['color'],
		_user = '';
	
	// Moderator
	if (tags['mod']) {
		_user += `<img src="${MOD_BADGES[0]}" 
				srcset="${MOD_BADGES[0]} 1x, ${MOD_BADGES[1]} 2x" 
				height="32"
				class="tw_badge">`;
	}
	// Turbo sub
	else if (tags['turbo']) {
		_user += `<img src="${TURBO_BADGES[0]}" 
			srcset="${TURBO_BADGES[0]} 1x, ${TURBO_BADGES[1]} 2x" 
			height="32"
			class="tw_badge">`;
	}
	
	if (tags['badges']) {
		// Broadcaster
		if (!(tags['badges']['broadcaster'] === undefined)) {
			_user += `<img src="${BROADCASTER_BADGES[0]}" 
				srcset="${BROADCASTER_BADGES[0]} 1x, ${BROADCASTER_BADGES[1]} 2x" 
				height="32"
				class="tw_badge">`;
		}
		// Prime sub
		if (!(tags['badges']['premium'] === undefined)) {
			_user += `<img src="${PRIME_BADGES[0]}" 
				srcset="${PRIME_BADGES[0]} 1x, ${PRIME_BADGES[1]} 2x" 
				height="32"
				class="tw_badge">`;
		}
		// VIP user
		if (!(tags['badges']['vip'] === undefined)) {
			_user += `<img src="${VIP_BADGES[0]}" 
				srcset="${VIP_BADGES[0]} 1x, ${VIP_BADGES[1]} 2x" 
				height="32"
				class="tw_badge">`;
		}
		// Channel subscriber
		if (!(tags['badges']['subscriber'] === undefined)) {
			_user += `<img src="${TWITCH_SUBS_BADGES[tags['badges']['subscriber']][0]}" 
				srcset="${TWITCH_SUBS_BADGES[tags['badges']['subscriber']][0]} 1x, ${TWITCH_SUBS_BADGES[tags['badges']['subscriber']][1]} 2x" 
				height="32"
				class="tw_badge">`;
		}
		
	}
	
	color = color ? color : "#f00";
	_user += `<font color="${color}"> ${username}</font>`;
	_user = '<span>' + _user + '</span>'
	
	return _user;
}


function _renderMessage(message) {
	//	Function for generating HTML for message with emotes:
	//	Twitch emotes
	//	FFZ and BTTV emotes
	
	var words = message.split(' '),
		_message = '';
	
	// Search for emotes
	for (var word in words) {
		// Twitch
		if (words[word] in TWITCH_EMOTES) {
			_message += `<span class="tw_emote"><img src="${TWITCH_EMOTES[words[word]][0]}" 
				srcset="${TWITCH_EMOTES[words[word]][0]} 1x, ${TWITCH_EMOTES[words[word]][1]} 2x" 
				height="32"></span>`;
		}
		// Global BTTV
		else if (words[word] in GLOBAL_BTTV_EMOTES) {
			_message += `<span class="tw_emote"><img src="${GLOBAL_BTTV_EMOTES[words[word]][0]}" 
				srcset="${GLOBAL_BTTV_EMOTES[words[word]][0]} 1x, ${GLOBAL_BTTV_EMOTES[words[word]][1]} 2x" 
				height="32"></span>`;
		}
		// Channel BTTV
		else if (words[word] in BTTV_EMOTES) {
			_message += `<span class="tw_emote"><img src="${BTTV_EMOTES[words[word]][0]}" 
				srcset="${BTTV_EMOTES[words[word]][0]} 1x, ${BTTV_EMOTES[words[word]][1]} 2x" 
				height="32"></span>`;
		}
		// Channel FFZ
		else if (words[word] in FFZ_EMOTES) {
			_message += `<span class="tw_emote"><img src="${FFZ_EMOTES[words[word]][0]}" 
				srcset="${FFZ_EMOTES[words[word]][0]} 1x, ${FFZ_EMOTES[words[word]][1]} 2x" 
				height="32"></span>`;
		} else {
			_message += ` ${words[word]}`;
		}
	}
	
	return _message;
}



function getTwitchEmotesFromMessage(tags, message) {
	// Function for saving twitch emotes URLs appearing in new messages
	
	var twitch_emotes = tags['emotes'];
	if (!twitch_emotes) {
		return;
	}
	
	for (var emote in twitch_emotes) {
		var joins = `${twitch_emotes[emote]}`,
			joins = joins.split('-');
		
		var emote_name = message.slice(parseInt(joins[0]), parseInt(joins[1])+1);
		
		if (!(emote_name in TWITCH_EMOTES)) {
			TWITCH_EMOTES[emote_name] = [
			 	"https://static-cdn.jtvnw.net/emoticons/v1/" + emote + "/1.0",
			 	"https://static-cdn.jtvnw.net/emoticons/v1/" + emote + "/2.0",
			 	"https://static-cdn.jtvnw.net/emoticons/v1/" + emote + "/3.0"
			 ]
		}
	}
}


function getBTTVEmotes(channel_id) {
	//  Functtion for saving BTTV channel and shared emotes
	
	fetch(`https://api.betterttv.net/3/cached/users/twitch/${channel_id}`)
		.then(response => response.json())
		.then(result => {
		    var shared_emotes = result['sharedEmotes'],
			  	channel_emotes = result['channelEmotes'];
		  
		    for (var emote in shared_emotes) {
			    var emote_name = shared_emotes[emote].code,
			    	emote_uid = shared_emotes[emote].id;
			    
			    BTTV_EMOTES[`${emote_name}`] = [
			        `https://cdn.betterttv.net/emote/${emote_uid}/1x`,
			        `https://cdn.betterttv.net/emote/${emote_uid}/2x`,
			        `https://cdn.betterttv.net/emote/${emote_uid}/3x`
                ];
		    }
		  
		    for (var emote in channel_emotes) {
		    	var emote_name = channel_emotes[emote].code,
			    	emote_uid = channel_emotes[emote].id;
		    	
			    BTTV_EMOTES[`${emote_name}`] = [
			        `https://cdn.betterttv.net/emote/${emote_uid}/1x`,
			        `https://cdn.betterttv.net/emote/${emote_uid}/2x`,
			        `https://cdn.betterttv.net/emote/${emote_uid}/3x`
                ];
		    }
	  });
}


function getFFZEmotes(channel_id) {
	// Function for saving FFZ channel emotes
	
	fetch(`https://api.betterttv.net/3/cached/frankerfacez/users/twitch/${channel_id}`)
		.then(response => response.json())
		.then(result => {
			
		    for (var emote in result) {
			    var emote_name = result[emote]["code"],
			    	images = result[emote]["images"],
			    	_images = [];
			    
			    for (var image_scale in images) {
			    	_images.push(images[image_scale]);
			    }
			    FFZ_EMOTES[`${emote_name}`] = _images;
		    }
	  });
}


function getTwitchSubsBadges(channel_id) {
	// Function for saving all available subs badges
	
	fetch(`https://badges.twitch.tv/v1/badges/channels/${channel_id}/display`)
	.then(response => response.json())
	.then(result => {
		var badges = result['badge_sets']['subscriber']['versions'];
		
	    for (var badge in badges) {
		    TWITCH_SUBS_BADGES[`${badge}`] = [
		        badges[badge]['image_url_1x'],
		        badges[badge]['image_url_2x'],
		        badges[badge]['image_url_4x']
            ];
	    }
	});
}


function getGlobalBTTVEmotes() {
	//	Function for saving global BTTV emotes
	
	fetch("https://api.betterttv.net/3/cached/emotes/global")
		.then(response => response.json())
		.then(result => {
		    for (var emote in result) {
			    var emote_name = result[emote].code,
			    	emote_uid = result[emote].id;
			    
			    GLOBAL_BTTV_EMOTES[`${emote_name}`] = [
			        `https://cdn.betterttv.net/emote/${emote_uid}/1x`,
			        `https://cdn.betterttv.net/emote/${emote_uid}/2x`,
			        `https://cdn.betterttv.net/emote/${emote_uid}/3x`
	            ];
		    }
	  });
}



function addMessage(chatNode, message, type, tags) {
	//	Function for adding generated HTML message element to chat node
	
	var _message = document.createElement("div");
	_message.classList.add("message");
	if (type === "user") {
		_message.innerHTML = getHTMLMessage(message, tags);
	}
	chatNode.insertBefore(_message, chatNode.firstChild);
}


(function () {
	
	var page = document.getElementById("chat");

	function init() {
		
		var chat = document.getElementById("fast-scroll-page"),
			channel = window.sessionStorage.getItem("channel");
		
		// Connecting to chat
		const client = new tmi.Client({
			channels: [channel]
		});
		client.connect();
		
		// Events handling
		client.on('message', (channel, tags, message, self) => {
			addMessage(chat, {user: tags['display-name'], text: `${message}`}, "user", tags);
			var messages = chat.childElementCount;
			if (messages > 100) {
				chat.removeChild(chat.lastChild);
			}
		});
		
		// Getting the twitch channel id for more information, like
		// emotes, subs badges
		client.api({
		    url: `https://api.twitch.tv/helix/users?login=${channel}`,
		    headers: {
		        "Authorization": "Bearer ec7zjiwozscewy0uercf91iothrlss",
		        "Client-id": "gp762nuuoqcoxypju8c569th9wz7q5"
		    }
		}, (err, res, body) => {
		    user_id = body['data'][0]['id'];
		    console.log(user_id);
		    getGlobalBTTVEmotes();
		    getBTTVEmotes(user_id);
		    getFFZEmotes(user_id);
		    getTwitchSubsBadges(user_id);
		});
		
	}
	
	page.addEventListener("pagebeforecreate", init);
	
}());