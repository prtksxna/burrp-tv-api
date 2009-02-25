var apiControl = new BurrpTV;
$(document).observe('dom:loaded',function(event){
	$("channel_name").observe('change',function(event){
		getData();
	});
	$("till_hours").observe('change',function(event){
		getData();
	});
	$("submit").observe('click',function(event){
		getData();
	});
});

function getData(){
	$("show-canvas").update("");
	$("show-canvas").insert(new Element('img',{src:'img/ajax-loader.gif'}));
	var eT = apiControl.getEndTime($F("till_hours"));
	var sT = apiControl.currentTime();
	var cH = $F("channel_name");
	apiControl.getSchedule(sT,eT,cH,"showSchedule");
}
function showSchedule(data){
	$("show-canvas").update("");
	console.log(data);
	var channelName = data.channels.first().channelName;
	$("show-canvas").insert(new Element('h2',{}).update(channelName));
	var list = $H(data.schedule);
	list = list.get(channelName);
	$("show-canvas").insert(new Element('ul',{id:'schedule-list'}));
	list.each(function(el){
		var url = apiControl.getURLForEpisode(el);
		var show = "<a href="+url+">"+el.seriesName+"<\/a>";
		$("schedule-list").insert(new Element('li',{}).update(show));
	})
}